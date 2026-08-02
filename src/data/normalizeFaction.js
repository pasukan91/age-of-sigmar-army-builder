import { withEnhancementTiming } from "../utils/enhancementTiming";
import { applyAosCommunityCatalogue } from "./applyAosCommunityCatalogue";

const ARRAY_FIELDS = [
  "battleTraits",
  "battleFormations",
  "heroicTraits",
  "monsterTraits",
  "artefacts",
  "accursedDevices",
  "brazenMutations",
  "brandsOfTheDarkGods",
  "ensorcelledBanners",
  "aqshyArtefacts",
  "aqshyPrayerLores",
  "spellLores",
  "prayerLores",
  "manifestations",
  "manifestationLores",
  "terrain",
  "units",
  "armiesOfRenown",
  "regimentsOfRenown",
  "allConsumingObsessions",
  "moulderMutations",
  "mortisanRefinements",
  "originsOfTerrifyingFolkTales",
  "aqshyHeroicTraits",
  "specialKnickKnacks",
  "flawlessManoeuvres",
  "decorationsForValour",
  "ironweldInnovations",
  "visionsOfFate",
  "plaguefathersPoxes",
  "boonsOfShadow",
];

const ENHANCEMENT_FIELDS = [
  "heroicTraits",
  "monsterTraits",
  "artefacts",
  "aqshyArtefacts",
  "aqshyHeroicTraits",
  "allConsumingObsessions",
  "moulderMutations",
  "mortisanRefinements",
  "originsOfTerrifyingFolkTales",
  "visionsOfFate",
  "specialKnickKnacks",
  "flawlessManoeuvres",
  "plaguefathersPoxes",
  "decorationsForValour",
  "ironweldInnovations",
  "accursedDevices",
  "brazenMutations",
  "brandsOfTheDarkGods",
  "ensorcelledBanners",
  "boonsOfShadow",
];

export function normalizeFaction(faction) {
  const normalized = Object.fromEntries(
    ARRAY_FIELDS.map((field) => [field, asArray(faction?.[field])])
  );

  ENHANCEMENT_FIELDS.forEach((field) => {
    normalized[field] = normalized[field].map(withEnhancementTiming);
  });

  normalized.spellLores = normalized.spellLores.map(normalizeSpellLore);
  normalized.prayerLores = normalized.prayerLores.map(normalizePrayerLore);
  normalized.units = normalized.units.map((unit) =>
    normalizeUnit(
      applyAosCommunityCatalogue(
        unit,
        faction.catalogueFactionName ?? faction.name
      )
    )
  );
  normalized.manifestations = normalized.manifestations.map(normalizeManifestation);
  normalized.manifestationLores = normalizeManifestationLores({
    faction,
    lores: normalized.manifestationLores,
    manifestations: normalized.manifestations,
  });
  normalized.armiesOfRenown = normalized.armiesOfRenown.map((army) => ({
    ...army,
    rules: army.rules
      ? normalizeArmyRules(army.rules, normalized.manifestations, faction.name)
      : undefined,
  }));

  return {
    ...faction,
    ...normalized,
  };
}

function normalizeUnit(unit) {
  return {
    ...unit,
    weapons: asArray(unit?.weapons),
    abilities: asArray(unit?.abilities).map(normalizeAbility),
    keywords: unique(asArray(unit?.keywords)),
    details: {
      ...unit?.details,
      regimentOptions: asArray(unit?.details?.regimentOptions),
      canJoinRegimentAs: asArray(unit?.details?.canJoinRegimentAs),
    },
  };
}

function normalizeAbility(ability) {
  const description = String(ability?.description ?? "");
  const keywords = unique(asArray(ability?.keywords));
  const type = String(ability?.type ?? "Ability");
  const isSpell = type.toLowerCase() === "spell" ||
    keywords.some((keyword) => String(keyword).toLowerCase() === "spell");
  const isPrayer = type.toLowerCase() === "prayer" ||
    keywords.some((keyword) => String(keyword).toLowerCase() === "prayer");

  return {
    ...ability,
    keywords,
    castingValue: ability?.castingValue ??
      (isSpell ? inferAbilityValue(description, "Spell", "casting") : null),
    chantingValue: ability?.chantingValue ??
      (isPrayer ? inferAbilityValue(description, "Prayer", "chanting") : null),
  };
}

function inferAbilityValue(description, label, rollName) {
  const patterns = [
    new RegExp(`${label}\\s*\\(\\s*(\\d+)\\s*\\)`, "i"),
    new RegExp(`${rollName} value(?: of)?\\s*(\\d+)`, "i"),
  ];

  for (const pattern of patterns) {
    const match = description.match(pattern);
    if (match) {
      return Number(match[1]);
    }
  }

  return null;
}

function normalizeArmyRules(rules, baseManifestations, catalogueFactionName) {
  const normalized = normalizeFaction({
    id: "army-of-renown",
    ...rules,
    catalogueFactionName,
    manifestations: rules.manifestations ?? baseManifestations,
    armiesOfRenown: [],
  });

  delete normalized.id;
  delete normalized.catalogueFactionName;
  return normalized;
}

function normalizeSpellLore(lore) {
  return {
    ...lore,
    spells: asArray(lore?.spells).map((spell) => ({
      type: "Spell",
      phase: "Your Hero Phase",
      ...spell,
      keywords: unique(["Spell", ...asArray(spell?.keywords)]),
    })),
  };
}

function normalizePrayerLore(lore) {
  return {
    ...lore,
    prayers: asArray(lore?.prayers).map((prayer) => ({
      type: "Prayer",
      phase: "Your Hero Phase",
      ...prayer,
      keywords: unique(["Prayer", ...asArray(prayer?.keywords)]),
    })),
  };
}

function normalizeManifestation(manifestation) {
  if (typeof manifestation === "string") {
    return createPendingManifestation(manifestation);
  }

  const castingValue =
    manifestation.castingValue ??
    manifestation.summonSpell?.castingValue ??
    manifestation.summonSpell?.chantingValue ??
    null;
  const fallbackSummonSpell = {
    name: `Summon ${manifestation.name}`,
    type: "Spell",
    phase: manifestation.phase ?? "Your Hero Phase",
    keywords: ["Spell", "Summon"],
    description: manifestation.description ?? "",
  };
  const summonSpell = normalizeSummonSpell(
    manifestation,
    manifestation.summonSpell ?? fallbackSummonSpell
  );

  return {
    weapons: [],
    abilities: [],
    ...manifestation,
    castingValue,
    profile: {
      move: "-",
      health: null,
      control: "-",
      save: null,
      ...manifestation.profile,
    },
    summonSpell,
    keywords: unique(["Manifestation", ...asArray(manifestation.keywords)]),
  };
}

function normalizeSummonSpell(manifestation, summonSpell) {
  const description = String(summonSpell?.description ?? "").trim();
  if (/Declare:/i.test(description) && /Effect:/i.test(description)) {
    return summonSpell;
  }

  const invocation = String(summonSpell?.type ?? "").toLowerCase() === "prayer" ||
    asArray(summonSpell?.keywords).some(
      (keyword) => String(keyword).toLowerCase() === "prayer"
    );
  const summoner = invocation ? "PRIEST" : "WIZARD";
  const action = invocation ? "chant this prayer" : "cast this spell";
  const roll = invocation ? "chanting" : "casting";
  const declare =
    `Declare: If there is not a friendly ${manifestation.name} on the battlefield, ` +
    `pick an eligible friendly ${summoner} to ${action}, then make a ${roll} roll of 2D6.`;
  const effect = description
    ? `\n\nEffect: ${description.replace(/^Effect:\s*/i, "")}`
    : "";

  return {
    ...summonSpell,
    description: declare + effect,
  };
}

function normalizeManifestationLores({ faction, lores, manifestations }) {
  const sourceLores = lores.length > 0
    ? lores
    : manifestations.length > 0
      ? [{
          id: `${faction.id}-manifestation-lore`,
          name: faction.manifestationLoreName ?? "Manifestation Lore",
          description: `Incluye ${formatNames(manifestations)}.`,
          manifestations,
        }]
      : [];

  return sourceLores.map((lore) => {
    const listedManifestations = asArray(lore.manifestations);
    const resolved = listedManifestations.length > 0
      ? listedManifestations.map((item) =>
          resolveManifestation(item, manifestations)
        )
      : resolveLoreByName(lore, manifestations);

    return {
      ...lore,
      manifestations: resolved.length > 0
        ? resolved
        : [createPendingManifestation(slugify(lore.name), lore.name)],
    };
  });
}

function resolveManifestation(item, manifestations) {
  if (typeof item !== "string") {
    return normalizeManifestation(item);
  }

  return manifestations.find((manifestation) => manifestation.id === item) ??
    createPendingManifestation(item);
}

function resolveLoreByName(lore, manifestations) {
  const loreId = slugify(lore.name);
  const match = manifestations.find((manifestation) =>
    manifestation.id === loreId ||
    slugify(manifestation.name) === loreId
  );

  return match ? [match] : [];
}

function createPendingManifestation(id, explicitName) {
  return {
    id,
    name: explicitName ?? titleFromId(id),
    dataPending: true,
    weapons: [],
    abilities: [],
    keywords: ["Manifestation"],
    profile: {},
  };
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function formatNames(items) {
  return items.map((item) => item.name).join(", ");
}

function slugify(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function titleFromId(id = "") {
  return String(id)
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getFactionValidationErrors(faction) {
  const errors = [];

  if (!faction?.id || !faction?.name || !faction?.alliance) {
    errors.push("faltan id, name o alliance");
  }

  ARRAY_FIELDS.forEach((field) => {
    if (!Array.isArray(faction?.[field])) {
      errors.push(`${field} is not an array`);
    }
  });

  faction?.boonsOfShadow?.forEach((boon) => {
    if (!Number.isFinite(boon?.points) || boon.points <= 0) {
      errors.push(`boon of shadow missing points: ${boon?.id ?? "missing id"}`);
    }
  });

  const unitIds = new Set();
  faction?.units?.forEach((unit) => {
    const label = unit?.id ?? "missing id";

    if (!unit?.id || !unit?.name) {
      errors.push(`unit missing id or name: ${label}`);
    }
    if (unitIds.has(unit?.id)) {
      errors.push(`duplicate unit id: ${unit.id}`);
    }
    unitIds.add(unit?.id);

    if (!Number.isFinite(unit?.points) || unit.points < 0) {
      errors.push(`unit has invalid points: ${label}`);
    }
    if (!unit?.image) {
      errors.push(`unit missing image: ${label}`);
    }
    if (
      unit?.profile?.move == null ||
      !Number.isFinite(unit?.profile?.health) ||
      unit?.profile?.control == null ||
      unit?.profile?.save == null
    ) {
      errors.push(`unit missing profile: ${label}`);
    }
    if (
      !Number.isFinite(unit?.details?.models) ||
      !unit?.details?.baseSize ||
      !Array.isArray(unit?.details?.regimentOptions) ||
      !Array.isArray(unit?.details?.canJoinRegimentAs)
    ) {
      errors.push(`unit missing composition details: ${label}`);
    }
    if (
      !Array.isArray(unit?.weapons) ||
      !Array.isArray(unit?.abilities) ||
      !Array.isArray(unit?.keywords)
    ) {
      errors.push(`unit collections are invalid: ${label}`);
      return;
    }

    unit.weapons.forEach((weapon) => {
      if (
        !weapon?.name ||
        !weapon?.type ||
        weapon?.attacks == null ||
        weapon?.hit == null ||
        weapon?.wound == null ||
        weapon?.rend == null ||
        weapon?.damage == null ||
        !Array.isArray(weapon?.abilities)
      ) {
        errors.push(`invalid weapon on ${label}: ${weapon?.name ?? "unnamed"}`);
      }
    });

    unit.abilities.forEach((ability) => {
      if (!ability?.name || !ability?.type || !ability?.description) {
        errors.push(`invalid ability on ${label}: ${ability?.name ?? "unnamed"}`);
      }

      const isSpell = String(ability?.type).toLowerCase() === "spell" ||
        ability?.keywords?.some(
          (keyword) => String(keyword).toLowerCase() === "spell"
        );
      if (isSpell && !Number.isFinite(ability?.castingValue)) {
        errors.push(`spell missing casting value on ${label}: ${ability.name}`);
      }
    });
  });

  faction?.spellLores?.forEach((lore) => {
    if (!lore.id || !lore.name || !Array.isArray(lore.spells)) {
      errors.push(`invalid spell lore: ${lore?.id ?? "missing id"}`);
    }
  });

  faction?.manifestationLores?.forEach((lore) => {
    if (!lore.id || !lore.name || !Array.isArray(lore.manifestations)) {
      errors.push(`invalid manifestation lore: ${lore?.id ?? "missing id"}`);
      return;
    }

    lore.manifestations.forEach((manifestation) => {
      if (manifestation?.dataPending) {
        errors.push(
          `unresolved manifestation in ${lore.id}: ${manifestation.id}`
        );
      }
    });
  });

  faction?.manifestations?.forEach((manifestation) => {
    const summonSpell = manifestation?.summonSpell;
    const summonValue =
      summonSpell?.chantingValue ??
      summonSpell?.castingValue ??
      manifestation?.chantingValue ??
      manifestation?.castingValue;
    const summonText = String(summonSpell?.description ?? "");

    if (!manifestation?.id || !manifestation?.name) {
      errors.push("manifestation missing id or name");
    }
    if (!summonSpell || !summonValue) {
      errors.push(`manifestation missing summon rule: ${manifestation?.id}`);
    }
    if (!manifestation?.profile?.health) {
      errors.push(`manifestation missing profile: ${manifestation?.id}`);
    }
    if (!/Declare:/i.test(summonText) || !/Effect:/i.test(summonText)) {
      errors.push(`manifestation missing Declare or Effect: ${manifestation?.id}`);
    }
    if (!/within\s+[^.]*\b(caster|chanter)\b/i.test(summonText)) {
      errors.push(`manifestation missing summoning distance: ${manifestation?.id}`);
    }
  });

  return errors;
}
