import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const [cataloguePath, appPath, reportPath, generatedPath] = process.argv.slice(2);

if (!cataloguePath || !appPath || !reportPath || !generatedPath) {
  throw new Error(
    "Usage: node scripts/audit-aos-community-catalogue.mjs " +
    "<catalogue.json> <app-warscrolls.json> <report.md> <generated.json>",
  );
}

const catalogue = JSON.parse(readFileSync(cataloguePath, "utf8"));
const appFactions = JSON.parse(readFileSync(appPath, "utf8"));
const data = catalogue.datasets;

function normalized(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[‘’‛`´]/g, "'")
    .replace(/[‐‑‒–—−]/g, "-")
    .replace(/\s*&\s*/g, " and ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function comparable(value) {
  return normalized(value).replace(/\bmelee\b|\branged\b/g, "").trim();
}

function baseComparable(value) {
  return String(value ?? "").toLowerCase().replace(/[×x]/g, "x").replace(/\s+/g, "");
}

function indexBy(rows, key) {
  const result = new Map();
  for (const row of rows ?? []) {
    const value = row[key];
    if (!result.has(value)) result.set(value, []);
    result.get(value).push(row);
  }
  return result;
}

const factionById = new Map(data.faction_keyword.map((row) => [row.id, row]));
const factionByName = new Map(data.faction_keyword.map((row) => [normalized(row.name), row]));
const warscrollById = new Map(data.warscroll.map((row) => [row.id, row]));
const factionLinksByWarscroll = indexBy(data.warscroll_faction_keyword, "warscrollId");
const abilitiesByWarscroll = indexBy(data.warscroll_ability, "warscrollId");
const weaponsByWarscroll = indexBy(data.warscroll_weapon, "warscrollId");
const keywordById = new Map(data.keyword.map((row) => [row.id, row.name]));
const keywordsByWarscroll = indexBy(data.warscroll_keyword, "warscrollId");
const abilityKeywordsByAbility = indexBy(data.warscroll_ability_keyword, "warscrollAbilityId");
const weaponAbilityById = new Map(data.weapon_ability.map((row) => [row.id, row]));
const weaponAbilitiesByWeapon = indexBy(data.warscroll_weapon_weapon_ability, "warscrollWeaponId");

const activeWarscrolls = data.warscroll.filter((warscroll) =>
  !warscroll.isSpearhead &&
  !warscroll.isLegends &&
  !warscroll.hiddenFromStormForge &&
  !warscroll.hiddenFromBattleProfiles
);
const activeByName = indexBy(activeWarscrolls, "name");
const activeByNormalizedName = new Map();
for (const warscroll of activeWarscrolls) {
  const key = normalized(warscroll.name);
  if (!activeByNormalizedName.has(key)) activeByNormalizedName.set(key, []);
  activeByNormalizedName.get(key).push(warscroll);
}

function warscrollFactionNames(warscrollId) {
  return (factionLinksByWarscroll.get(warscrollId) ?? [])
    .map((link) => factionById.get(link.factionKeywordId)?.name)
    .filter(Boolean);
}

function sourceCandidates(unitName, factionName) {
  const all = activeByNormalizedName.get(normalized(unitName)) ?? [];
  const sameFaction = all.filter((warscroll) =>
    warscrollFactionNames(warscroll.id).some((name) => normalized(name) === normalized(factionName)) ||
    normalized(warscroll.referenceKeywords).includes(normalized(factionName))
  );
  const candidates = sameFaction.length ? sameFaction : all;
  return [...new Map(candidates.map((item) => [item.id, item])).values()];
}

function sourceKeywords(warscroll) {
  const linked = (keywordsByWarscroll.get(warscroll.id) ?? [])
    .sort((left, right) => (left.displayOrder ?? 0) - (right.displayOrder ?? 0))
    .map((link) => keywordById.get(link.keywordId))
    .filter(Boolean);
  const reference = String(warscroll.referenceKeywords ?? "")
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);
  return [...new Set([...linked, ...reference])];
}

function abilityKeywords(abilityId) {
  return (abilityKeywordsByAbility.get(abilityId) ?? [])
    .sort((left, right) => (left.displayOrder ?? 0) - (right.displayOrder ?? 0))
    .map((link) => keywordById.get(link.keywordId))
    .filter(Boolean);
}

function abilityDescription(ability) {
  const sections = [];
  if (ability.usedBy) sections.push(`Used By: ${ability.usedBy}`);
  if (ability.declare) sections.push(`Declare: ${ability.declare}`);
  if (ability.effect) sections.push(`Effect: ${ability.effect}`);
  return sections.join("\n\n") || ability.lore || "Sin descripción.";
}

function generatedAbility(ability) {
  const keywords = abilityKeywords(ability.id);
  const isSpell = keywords.some((keyword) => normalized(keyword) === "spell");
  const isPrayer = keywords.some((keyword) => normalized(keyword) === "prayer");
  return {
    name: ability.name,
    phase: ability.phaseDetails || "Passive",
    type: isSpell ? "Spell" : isPrayer ? "Prayer" : "Ability",
    description: abilityDescription(ability),
    keywords,
    castingValue: isPrayer ? null : ability.castingValue,
    chantingValue: isPrayer ? ability.castingValue : null,
    commandPoints: ability.cpCost,
    lore: ability.lore,
  };
}

function generatedWeapon(weapon) {
  return {
    name: weapon.name,
    type: weapon.type === "ranged" ? "Ranged" : "Melee",
    ...(weapon.range ? { range: weapon.range } : {}),
    attacks: weapon.attacks,
    hit: weapon.hit,
    wound: weapon.wound,
    rend: weapon.rend,
    damage: weapon.damage,
    abilities: (weaponAbilitiesByWeapon.get(weapon.id) ?? [])
      .sort((left, right) => (left.displayOrder ?? 0) - (right.displayOrder ?? 0))
      .map((link) => weaponAbilityById.get(link.weaponAbilityId)?.name)
      .filter(Boolean),
  };
}

function generatedUnit(warscroll) {
  return {
    sourceId: warscroll.id,
    points: warscroll.points,
    profile: {
      move: warscroll.move,
      health: Number(warscroll.health),
      control: warscroll.control,
      save: warscroll.save,
      ward: warscroll.wardSave,
    },
    details: {
      models: warscroll.modelCount,
      baseSize: warscroll.baseSize,
    },
    keywords: sourceKeywords(warscroll),
    weapons: (weaponsByWarscroll.get(warscroll.id) ?? []).map(generatedWeapon),
    abilities: (abilitiesByWarscroll.get(warscroll.id) ?? []).map(generatedAbility),
  };
}

function diffUnit(appUnit, source) {
  const differences = [];
  const checks = [
    ["points", appUnit.points, source.points],
    ["move", appUnit.profile.move, source.move],
    ["health", appUnit.profile.health, source.health],
    ["control", appUnit.profile.control, source.control],
    ["save", appUnit.profile.save, source.save],
    ["ward", appUnit.profile.ward, source.wardSave],
    ["models", appUnit.details.models, source.modelCount],
  ];
  for (const [field, appValue, sourceValue] of checks) {
    if (comparable(appValue) !== comparable(sourceValue)) {
      differences.push(`${field}: app=${JSON.stringify(appValue)}, catálogo=${JSON.stringify(sourceValue)}`);
    }
  }
  if (baseComparable(appUnit.details.baseSize) !== baseComparable(source.baseSize)) {
    differences.push(`baseSize: app=${JSON.stringify(appUnit.details.baseSize)}, catálogo=${JSON.stringify(source.baseSize)}`);
  }

  const sourceWeapons = weaponsByWarscroll.get(source.id) ?? [];
  const appWeaponKeys = appUnit.weapons.map((weapon) => `${normalized(weapon.name)}|${normalized(weapon.type)}`);
  const sourceWeaponKeys = sourceWeapons.map((weapon) => `${normalized(weapon.name)}|${normalized(weapon.type)}`);
  if (appWeaponKeys.sort().join(";") !== sourceWeaponKeys.sort().join(";")) {
    differences.push(
      `armas: app=[${appUnit.weapons.map((weapon) => weapon.name).join(", ")}], ` +
      `catálogo=[${sourceWeapons.map((weapon) => weapon.name).join(", ")}]`,
    );
  }
  for (const appWeapon of appUnit.weapons) {
    const sourceWeapon = sourceWeapons.find((weapon) =>
      normalized(weapon.name) === normalized(appWeapon.name) &&
      normalized(weapon.type) === normalized(appWeapon.type)
    );
    if (!sourceWeapon) continue;
    for (const field of ["range", "attacks", "hit", "wound", "rend", "damage"]) {
      if (comparable(appWeapon[field]) !== comparable(sourceWeapon[field])) {
        differences.push(
          `${appWeapon.name} ${field}: app=${JSON.stringify(appWeapon[field] ?? null)}, ` +
          `catálogo=${JSON.stringify(sourceWeapon[field] ?? null)}`,
        );
      }
    }
    const sourceAbilities = generatedWeapon(sourceWeapon).abilities.map(normalized).sort();
    const appAbilities = (appWeapon.abilities ?? []).map(normalized).sort();
    if (sourceAbilities.join(";") !== appAbilities.join(";")) {
      differences.push(
        `${appWeapon.name} habilidades de arma: app=[${appWeapon.abilities.join(", ")}], ` +
        `catálogo=[${generatedWeapon(sourceWeapon).abilities.join(", ")}]`,
      );
    }
  }

  const sourceAbilities = abilitiesByWarscroll.get(source.id) ?? [];
  const appAbilityNames = appUnit.abilities.map((ability) => normalized(ability.name)).sort();
  const sourceAbilityNames = sourceAbilities.map((ability) => normalized(ability.name)).sort();
  if (appAbilityNames.join(";") !== sourceAbilityNames.join(";")) {
    differences.push(
      `habilidades: app=[${appUnit.abilities.map((ability) => ability.name).join(", ")}], ` +
      `catálogo=[${sourceAbilities.map((ability) => ability.name).join(", ")}]`,
    );
  }
  for (const appAbility of appUnit.abilities) {
    const sourceAbility = sourceAbilities.find((ability) => normalized(ability.name) === normalized(appAbility.name));
    if (!sourceAbility) continue;
    const current = normalized(appAbility.description);
    const authoritative = normalized(abilityDescription(sourceAbility));
    if (current !== authoritative) differences.push(`${appAbility.name}: texto de habilidad distinto`);
  }
  return differences;
}

const generated = {
  metadata: {
    source: catalogue.source,
    dataVersion: catalogue.dataVersion,
    databaseUpdated: "2026-07-08",
    generatedAt: new Date().toISOString(),
  },
  factions: {},
};
const unmatched = [];
const ambiguous = [];
const differences = [];
let matched = 0;

for (const faction of appFactions) {
  generated.factions[faction.faction] = {};
  const knownFaction = factionByName.get(normalized(faction.faction));
  if (!knownFaction) {
    unmatched.push(`${faction.faction}: no existe la facción en el catálogo`);
  }
  for (const unit of faction.units) {
    const candidates = sourceCandidates(unit.name, faction.faction);
    if (candidates.length === 0) {
      unmatched.push(`${faction.faction} — ${unit.name}`);
      continue;
    }
    if (candidates.length > 1) {
      ambiguous.push(
        `${faction.faction} — ${unit.name}: ` +
        candidates.map((item) => `${item.id} (${warscrollFactionNames(item.id).join("/") || "sin facción"})`).join(", "),
      );
      continue;
    }
    const source = candidates[0];
    matched += 1;
    generated.factions[faction.faction][normalized(unit.name)] = generatedUnit(source);
    const unitDifferences = diffUnit(unit, source);
    if (unitDifferences.length) {
      differences.push({ faction: faction.faction, unit: unit.name, fields: unitDifferences });
    }
  }
}

const total = appFactions.reduce((sum, faction) => sum + faction.units.length, 0);
const report = [
  "# Auditoría contra AoS Community Bot",
  "",
  `- Catálogo extraído: versión ${catalogue.dataVersion}; base indicada como actualizada el 08/07/2026.`,
  `- Entradas de la app: ${total}.`,
  `- Coincidencias inequívocas: ${matched}.`,
  `- Sin coincidencia: ${unmatched.length}.`,
  `- Coincidencias ambiguas: ${ambiguous.length}.`,
  `- Warscrolls coincidentes con alguna diferencia: ${differences.length}.`,
  "",
  "## Dudas: sin coincidencia",
  "",
  ...(unmatched.length ? unmatched.map((item) => `- ${item}`) : ["- Ninguna."]),
  "",
  "## Dudas: coincidencias ambiguas",
  "",
  ...(ambiguous.length ? ambiguous.map((item) => `- ${item}`) : ["- Ninguna."]),
  "",
  "## Diferencias detectadas",
  "",
  ...differences.flatMap((item) => [
    `### ${item.faction} — ${item.unit}`,
    "",
    ...item.fields.map((field) => `- ${field}`),
    "",
  ]),
].join("\n");

for (const outputPath of [reportPath, generatedPath]) {
  mkdirSync(dirname(resolve(outputPath)), { recursive: true });
}
writeFileSync(reportPath, `${report}\n`);
writeFileSync(generatedPath, `${JSON.stringify(generated, null, 2)}\n`);
console.log(JSON.stringify({ total, matched, unmatched: unmatched.length, ambiguous: ambiguous.length, differences: differences.length }, null, 2));
