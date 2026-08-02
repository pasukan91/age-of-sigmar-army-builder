import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createServer } from "vite";

const referenceDirectory = process.argv[2];

if (!referenceDirectory) {
  throw new Error("Usage: node scripts/audit-warscroll-characteristics.mjs <catalogue-directory>");
}

function decodeXml(value) {
  return String(value ?? "")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function normalizeName(value) {
  return decodeXml(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[‘’`]/g, "'")
    .replace(/[^a-z0-9]+/gi, " ")
    .trim()
    .toLowerCase();
}

function normalizeStat(value) {
  return decodeXml(value)
    .replaceAll("−", "-")
    .replace(/\s+/g, "")
    .toUpperCase();
}

function normalizeRend(value) {
  const normalized = normalizeStat(value);
  return normalized === "" || normalized === "-" || normalized === "0" ? "0" : normalized;
}

function normalizeRulesText(value) {
  return decodeXml(value)
    .replace(/\*\*|\^\^/g, "")
    .replace(/\u00a0|Â/g, " ")
    .replace(/[â€˜â€™]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function profileAttribute(attributes, name) {
  return attributes.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1] ?? "";
}

function parseProfiles(entryXml) {
  return [...entryXml.matchAll(/<profile\b([^>]*)>([\s\S]*?)<\/profile>/g)].map(
    ([, attributes, body]) => ({
      name: decodeXml(profileAttribute(attributes, "name")),
      type: decodeXml(profileAttribute(attributes, "typeName")),
      characteristics: parseCharacteristics(body),
    })
  );
}

function tokenize(value) {
  return new Set(normalizeName(normalizeRulesText(value)).split(" ").filter((word) => word.length > 2));
}

function textSimilarity(left, right) {
  const leftTokens = tokenize(left);
  const rightTokens = tokenize(right);
  if (leftTokens.size === 0 && rightTokens.size === 0) return 1;
  const intersection = [...leftTokens].filter((token) => rightTokens.has(token)).length;
  const union = new Set([...leftTokens, ...rightTokens]).size;
  return union === 0 ? 0 : intersection / union;
}

function editDistance(left, right) {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    const current = [leftIndex];
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      current[rightIndex] = Math.min(
        current[rightIndex - 1] + 1,
        previous[rightIndex] + 1,
        previous[rightIndex - 1] + (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1),
      );
    }
    previous.splice(0, previous.length, ...current);
  }
  return previous[right.length];
}

function nameSimilarity(left, right) {
  const normalizedLeft = normalizeName(left).replace(/\b(the|of|and|or)\b/g, "").replace(/\s+/g, "");
  const normalizedRight = normalizeName(right).replace(/\b(the|of|and|or)\b/g, "").replace(/\s+/g, "");
  if (normalizedLeft === normalizedRight) return 1;
  const longest = Math.max(normalizedLeft.length, normalizedRight.length);
  return longest === 0 ? 1 : 1 - editDistance(normalizedLeft, normalizedRight) / longest;
}

function pairNamedItems(localItems, referenceItems, threshold, scoreAdjustment = () => 0) {
  const candidates = [];
  localItems.forEach((local, localIndex) => {
    referenceItems.forEach((reference, referenceIndex) => {
      candidates.push({
        local,
        reference,
        localIndex,
        referenceIndex,
        score: nameSimilarity(local.name, reference.name) + scoreAdjustment(local, reference),
      });
    });
  });

  candidates.sort((left, right) => right.score - left.score);
  const usedLocal = new Set();
  const usedReference = new Set();
  const pairs = [];

  for (const candidate of candidates) {
    if (candidate.score < threshold) break;
    if (usedLocal.has(candidate.localIndex) || usedReference.has(candidate.referenceIndex)) continue;
    usedLocal.add(candidate.localIndex);
    usedReference.add(candidate.referenceIndex);
    pairs.push(candidate);
  }

  return {
    pairs,
    missingLocal: referenceItems.filter((_, index) => !usedReference.has(index)),
    missingReference: localItems.filter((_, index) => !usedLocal.has(index)),
  };
}

function timingSignature(value) {
  const normalized = normalizeName(value);
  const timingOnly = normalized
    .replace(/\b(passive|rampage|spell|prayer|ability|command)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!timingOnly) return "passive";
  const signatures = [
    /once per battle round army/,
    /once per battle army/,
    /once per battle round/,
    /once per battle/,
    /once per turn army/,
    /once per turn/,
    /reaction/,
    /deployment phase/,
    /start of (the )?battle round/,
    /end of (the )?battle round/,
    /start of (your|enemy|any) turn/,
    /end of (your|enemy|any) turn/,
    /(your|enemy|any) hero phase/,
    /(your|enemy|any) movement phase/,
    /(your|enemy|any) shooting phase/,
    /(your|enemy|any) charge phase/,
    /(your|enemy|any) combat phase/,
  ];

  return signatures
    .map((pattern) => timingOnly.match(pattern)?.[0])
    .filter(Boolean)
    .join("|") || timingOnly;
}

function groupByFaction(items) {
  return Object.entries(Object.groupBy(items, (item) => item.faction))
    .sort(([left], [right]) => left.localeCompare(right));
}

function markdownListByFaction(items, formatter) {
  if (items.length === 0) return "Sin incidencias.\n";
  return groupByFaction(items)
    .map(([faction, factionItems]) => [
      `### ${faction}`,
      "",
      ...factionItems.map((item) => `- ${formatter(item)}`),
    ].join("\n"))
    .join("\n\n");
}

function createMarkdownReport(report) {
  const weaponUnmatched = [
    ...report.weapons.missingLocal.map((item) => ({ ...item, side: "falta en la app" })),
    ...report.weapons.missingReference.map((item) => ({ ...item, side: "solo aparece en la app" })),
  ];
  const abilityUnmatched = [
    ...report.abilities.missingLocal.map((item) => ({ ...item, side: "falta en la app" })),
    ...report.abilities.missingReference.map((item) => ({ ...item, side: "solo aparece en la app" })),
  ];
  const semanticUnits = [...new Map(report.abilities.textReview.map((item) => [
    `${item.faction}|${item.unit}`,
    { faction: item.faction, unit: item.unit },
  ])).values()];

  return [
    "# Auditoría de armas y habilidades de warscrolls",
    "",
    `Fecha: ${new Date().toISOString().slice(0, 10)}`,
    "",
    "Referencia de contraste: catálogo público actualizado BSData para Age of Sigmar 4. La comparación cubre las 487 fichas implementadas en la aplicación.",
    "",
    "## Resumen",
    "",
    "| Comprobación | Resultado |",
    "| --- | ---: |",
    `| Perfiles de arma emparejados | ${report.weapons.compared} |`,
    `| Diferencias exactas en estadísticas de arma | ${report.weapons.mismatches.length} |`,
    `| Nombres de arma probablemente renombrados | ${report.weapons.nameMismatches.length} |`,
    `| Armas sin correspondencia inequívoca | ${weaponUnmatched.length} |`,
    `| Habilidades emparejadas | ${report.abilities.compared} |`,
    `| Nombres de habilidad probablemente renombrados | ${report.abilities.nameMismatches.length} |`,
    `| Habilidades sin correspondencia inequívoca | ${abilityUnmatched.length} |`,
    `| Diferencias de timing estructurales | ${report.abilities.timingMismatches.length} |`,
    `| Habilidades que requieren revisión semántica | ${report.abilities.textReview.length} en ${semanticUnits.length} unidades |`,
    "",
    "## Diferencias exactas en perfiles de arma",
    "",
    "Estas diferencias son comparaciones campo a campo entre armas con el mismo nombre o un nombre casi idéntico.",
    "",
    markdownListByFaction(report.weapons.mismatches, (item) =>
      `**${item.unit} — ${item.weapon}:** ${item.stat}: app \`${item.local}\` → referencia \`${item.reference}\`.`),
    "",
    "## Armas sin correspondencia inequívoca",
    "",
    "Estas entradas pueden ser armas añadidas, retiradas, combinadas o renombradas de forma sustancial y deben comprobarse manualmente.",
    "",
    markdownListByFaction(weaponUnmatched, (item) => `**${item.unit}:** ${item.weapon} (${item.side}).`),
    "",
    "## Posibles renombrados de armas",
    "",
    markdownListByFaction(report.weapons.nameMismatches, (item) =>
      `**${item.unit}:** ${item.local} → ${item.reference} (similitud ${item.similarity}).`),
    "",
    "## Habilidades sin correspondencia inequívoca",
    "",
    "Son posibles habilidades añadidas, retiradas o renombradas. No se consideran automáticamente errores hasta verificar el warscroll oficial.",
    "",
    markdownListByFaction(abilityUnmatched, (item) => `**${item.unit}:** ${item.ability} (${item.side}).`),
    "",
    "## Posibles renombrados de habilidades",
    "",
    markdownListByFaction(report.abilities.nameMismatches, (item) =>
      `**${item.unit}:** ${item.local} → ${item.reference} (similitud ${item.similarity}).`),
    "",
    "## Diferencias de timing",
    "",
    markdownListByFaction(report.abilities.timingMismatches, (item) =>
      `**${item.unit} — ${item.ability}:** app \`${item.local || "Pasiva"}\` → referencia \`${item.reference || "Pasiva"}\`.`),
    "",
    "## Unidades cuyas habilidades requieren revisión semántica",
    "",
    "La app resume los pasos Declare/Effect, por lo que una diferencia textual no demuestra por sí sola que la regla sea incorrecta. Estas unidades contienen al menos una habilidad con baja similitud textual y necesitan comprobación humana del significado.",
    "",
    markdownListByFaction(semanticUnits, (item) => `**${item.unit}**.`),
    "",
  ].join("\n");
}

const referenceAliases = new Map([
  ["Morga the Mighty", "Morga the Mighty, Overtyrant"],
  ["Ogor Gluttons", "Gluttons"],
  ["Redd the Maw", "Redd the Maw, High Slaughtermaster"],
  ["Infernal Enrapturess", "Infernal Enrapturess, Herald of Slaanesh"],
  ["Kurnoth Hunters with Greatbows", "Kurnoth Hunters with Kurnoth Greatbows"],
  ["Kurnoth Hunters with Greatswords", "Kurnoth Hunters with Kurnoth Greatswords"],
  ["Kurnoth Hunters with Greatscythes", "Kurnoth Hunters with Kurnoth Scythes"],
  ["The Blades of the Hollow King", "Blades of the Hollow King"],
  ["Pusgoyle Blightlords (1 model)", "Pusgoyle Blightlords"],
]);

function referenceNameForLocal(name) {
  const scourgePrefix = "Scourge of Aqshy ";
  if (name.startsWith(scourgePrefix)) {
    const baseName = name.slice(scourgePrefix.length);
    const aliasedName = referenceAliases.get(baseName) ?? baseName;
    return `${aliasedName} (Scourge of Aqshy)`;
  }

  return referenceAliases.get(name) ?? name;
}

function parseCharacteristics(profileXml) {
  return Object.fromEntries(
    [...profileXml.matchAll(/<characteristic name="([^"]+)"[^>]*?(?:\/>|>([\s\S]*?)<\/characteristic>)/g)]
      .map(([, name, value]) => [name, decodeXml(value ?? "").trim()])
  );
}

function loadReferenceUnits(directory) {
  const units = new Map();
  const libraryFiles = readdirSync(directory).filter((name) => name.endsWith(".cat"));

  for (const fileName of libraryFiles) {
    const xml = readFileSync(path.join(directory, fileName), "utf8");
    const entries = xml.matchAll(/^    <selectionEntry type="unit"[^>]*name="([^"]+)"[\s\S]*?^    <\/selectionEntry>/gm);

    for (const [entryXml, entryName] of entries) {
      const profiles = parseProfiles(entryXml);
      const unitProfile = profiles.find((profile) => profile.type === "Unit");
      if (!unitProfile) continue;

      const weapons = profiles
        .filter((profile) => profile.type.endsWith("Weapon"))
        .map((profile) => ({
          name: profile.name,
          type: profile.type.startsWith("Ranged") ? "Ranged" : "Melee",
          ...profile.characteristics,
        }));
      const abilities = profiles
        .filter((profile) => profile.type.startsWith("Ability"))
        .map((profile) => ({
          name: profile.name,
          type: profile.type,
          timing: profile.characteristics.Timing ?? "",
          text: [profile.characteristics.Declare, profile.characteristics.Effect]
            .filter(Boolean)
            .map(normalizeRulesText)
            .join(" "),
          keywords: profile.characteristics.Keywords ?? "",
        }));

      const unit = {
        name: decodeXml(entryName),
        source: fileName,
        ...unitProfile.characteristics,
        weapons,
        abilities,
      };
      const key = normalizeName(unit.name);
      const matches = units.get(key) ?? [];
      matches.push(unit);
      units.set(key, matches);
    }
  }

  return units;
}

const server = await createServer({
  logLevel: "silent",
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const { default: factions } = await server.ssrLoadModule("/src/data/factions.js");
  const references = loadReferenceUnits(referenceDirectory);
  const report = {
    compared: 0,
    missing: [],
    ambiguous: [],
    mismatches: [],
    weapons: { compared: 0, missingLocal: [], missingReference: [], nameMismatches: [], mismatches: [] },
    abilities: {
      compared: 0,
      missingLocal: [],
      missingReference: [],
      nameMismatches: [],
      timingMismatches: [],
      textReview: [],
    },
  };

  for (const faction of factions.filter((item) => item.units.length > 0)) {
    for (const unit of faction.units) {
      const matches = references.get(normalizeName(referenceNameForLocal(unit.name))) ?? [];
      if (matches.length === 0) {
        report.missing.push(`${faction.name}: ${unit.name}`);
        continue;
      }

      const distinctProfiles = [...new Map(matches.map((match) => [
        [match.Move, match.Health, match.Save, match.Control].map(normalizeStat).join("|"),
        match,
      ])).values()];

      if (distinctProfiles.length !== 1) {
        report.ambiguous.push({ faction: faction.name, unit: unit.name, matches: distinctProfiles });
        continue;
      }

      report.compared += 1;
      const reference = distinctProfiles[0];
      const localStats = {
        Move: unit.profile?.move,
        Health: unit.profile?.health,
        Save: unit.profile?.save,
        Control: unit.profile?.control,
      };

      for (const [stat, localValue] of Object.entries(localStats)) {
        if (normalizeStat(localValue) !== normalizeStat(reference[stat])) {
          report.mismatches.push({
            faction: faction.name,
            unit: unit.name,
            stat,
            local: localValue ?? null,
            reference: reference[stat] ?? null,
            source: reference.source,
          });
        }
      }

      const pairedWeapons = pairNamedItems(
        unit.weapons ?? [],
        reference.weapons,
        0.58,
        (local, referenceWeapon) => local.type === referenceWeapon.type ? 0.2 : -0.4,
      );
      pairedWeapons.missingLocal.forEach((weapon) => {
        report.weapons.missingLocal.push({ faction: faction.name, unit: unit.name, weapon: weapon.name });
      });
      pairedWeapons.missingReference.forEach((weapon) => {
        report.weapons.missingReference.push({ faction: faction.name, unit: unit.name, weapon: weapon.name });
      });

      for (const { local: localWeapon, reference: referenceWeapon, score } of pairedWeapons.pairs) {
        report.weapons.compared += 1;
        if (normalizeName(localWeapon.name) !== normalizeName(referenceWeapon.name)) {
          report.weapons.nameMismatches.push({
            faction: faction.name,
            unit: unit.name,
            local: localWeapon.name,
            reference: referenceWeapon.name,
            similarity: Number(score.toFixed(3)),
          });
        }
        const weaponStats = [
          ["Type", localWeapon.type, referenceWeapon.type, normalizeStat],
          ["Range", localWeapon.range ?? "", referenceWeapon.Rng ?? "", normalizeStat],
          ["Attacks", localWeapon.attacks, referenceWeapon.Atk, normalizeStat],
          ["Hit", localWeapon.hit, referenceWeapon.Hit, normalizeStat],
          ["Wound", localWeapon.wound, referenceWeapon.Wnd, normalizeStat],
          ["Rend", localWeapon.rend, referenceWeapon.Rnd, normalizeRend],
          ["Damage", localWeapon.damage, referenceWeapon.Dmg, normalizeStat],
        ];

        for (const [stat, localValue, referenceValue, normalizer] of weaponStats) {
          if (normalizer(localValue) !== normalizer(referenceValue)) {
            report.weapons.mismatches.push({
              faction: faction.name,
              unit: unit.name,
              weapon: referenceWeapon.name,
              stat,
              local: localValue ?? null,
              reference: referenceValue ?? null,
            });
          }
        }
      }

      const pairedAbilities = pairNamedItems(unit.abilities ?? [], reference.abilities, 0.7);
      pairedAbilities.missingLocal.forEach((ability) => {
        report.abilities.missingLocal.push({ faction: faction.name, unit: unit.name, ability: ability.name });
      });
      pairedAbilities.missingReference.forEach((ability) => {
        report.abilities.missingReference.push({ faction: faction.name, unit: unit.name, ability: ability.name });
      });

      for (const { local: localAbility, reference: referenceAbility, score } of pairedAbilities.pairs) {
        report.abilities.compared += 1;
        if (normalizeName(localAbility.name) !== normalizeName(referenceAbility.name)) {
          report.abilities.nameMismatches.push({
            faction: faction.name,
            unit: unit.name,
            local: localAbility.name,
            reference: referenceAbility.name,
            similarity: Number(score.toFixed(3)),
          });
        }
        const localTiming = [localAbility.type, localAbility.phase]
          .filter((value) => value && value !== "Ability")
          .join(", ");
        if (timingSignature(localTiming) !== timingSignature(referenceAbility.timing)) {
          report.abilities.timingMismatches.push({
            faction: faction.name,
            unit: unit.name,
            ability: referenceAbility.name,
            local: localTiming,
            reference: referenceAbility.timing,
          });
        }

        const similarity = textSimilarity(localAbility.description, referenceAbility.text);
        if (similarity < 0.4) {
          report.abilities.textReview.push({
            faction: faction.name,
            unit: unit.name,
            ability: referenceAbility.name,
            similarity: Number(similarity.toFixed(3)),
            local: normalizeRulesText(localAbility.description),
            reference: referenceAbility.text,
          });
        }
      }

    }
  }

  const output = process.argv.includes("--markdown")
    ? createMarkdownReport(report)
    : JSON.stringify(report, null, 2);
  const outputArgument = process.argv.find((argument) => argument.startsWith("--output="));
  if (outputArgument) {
    writeFileSync(outputArgument.slice("--output=".length), `${output}\n`, "utf8");
  } else {
    console.log(output);
  }
} finally {
  await server.close();
}
