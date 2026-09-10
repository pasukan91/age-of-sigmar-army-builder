import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const [cataloguePath, outputPath, reportPath] = process.argv.slice(2);
if (!cataloguePath || !outputPath || !reportPath) {
  throw new Error(
    "Usage: node scripts/generate-authoritative-wording.mjs <catalogue.json> <output.json> <report.md>"
  );
}

const FACTIONS = [
  "Kruleboyz",
  "Ironjawz",
  "Hedonites of Slaanesh",
  "Skaven",
  "Ogor Mawtribes",
  "Sylvaneth",
  "Gloomspite Gitz",
  "Cities of Sigmar",
  "Disciples of Tzeentch",
  "Ossiarch Bonereapers",
  "Soulblight Gravelords",
  "Helsmiths of Hashut",
  "Blades of Khorne",
  "Slaves to Darkness",
  "Maggotkin of Nurgle",
  "Lumineth Realm-lords",
  "Daughters of Khaine",
  "Stormcast Eternals",
  "Idoneth Deepkin",
  "Kharadron Overlords",
  "Nighthaunt",
  "Flesh-eater Courts",
];

const catalogue = JSON.parse(readFileSync(cataloguePath, "utf8"));
const data = catalogue.datasets;

function slug(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[‘’‛`´]/g, "'")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalized(value = "") {
  return slug(value).replace(/-/g, " ");
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

const keywordById = new Map(data.keyword.map((item) => [item.id, item.name]));
const publicationById = new Map(data.publication.map((item) => [item.id, item]));
const groupPublications = indexBy(data.ability_group_publication, "abilityGroupId");
const abilitiesByGroup = indexBy(data.ability, "abilityGroupId");
const formationRules = indexBy(data.battle_formation_rule, "battleFormationId");
const loreAbilities = indexBy(data.lore_ability, "loreId");
const abilityKeywords = indexBy(data.ability_keyword, "abilityId");
const formationKeywords = indexBy(data.battle_formation_rule_keyword, "battleFormationRuleId");
const loreKeywords = indexBy(data.lore_ability_keyword, "loreAbilityId");

function linkedKeywords(index, id) {
  return (index.get(id) ?? [])
    .sort((left, right) => (left.displayOrder ?? 0) - (right.displayOrder ?? 0))
    .map((link) => keywordById.get(link.keywordId))
    .filter(Boolean);
}

function makeDescription(ability) {
  const sections = [];
  if (ability.usedBy) sections.push(`Used By: ${ability.usedBy}`);
  if (ability.declare) sections.push(`Declare: ${ability.declare}`);
  if (ability.effect) sections.push(`Effect: ${ability.effect}`);
  if (ability.additionalRulesText) sections.push(ability.additionalRulesText);
  return sections.join("\n\n") || ability.lore || "";
}

function makeAbility(ability, keywordIndex, extra = {}) {
  const keywords = linkedKeywords(keywordIndex, ability.id);
  const isSpell = keywords.some((keyword) => normalized(keyword) === "spell");
  const isPrayer = keywords.some((keyword) => normalized(keyword) === "prayer");
  return {
    id: slug(ability.name),
    sourceId: ability.id,
    name: ability.name,
    phase: ability.phaseDetails || "Passive",
    type: isSpell ? "Spell" : isPrayer ? "Prayer" : "Ability",
    description: makeDescription(ability),
    keywords,
    castingValue: isPrayer ? null : ability.castingValue ?? null,
    chantingValue: isPrayer ? ability.castingValue ?? null : null,
    commandPoints: ability.cpCost ?? null,
    points: ability.points ?? 0,
    lore: ability.lore ?? null,
    ...extra,
  };
}

function addRule(target, rule) {
  const key = normalized(rule.name);
  if (!target[key]) target[key] = [];
  if (!target[key].some((item) => item.sourceId === rule.sourceId)) target[key].push(rule);
}

function sourceForFaction(faction) {
  const rules = {};
  const collections = {
    battleTraits: [],
    heroicTraits: [],
    artefactsOfPower: [],
    otherEnhancements: [],
  };

  for (const group of data.ability_group.filter((item) =>
    item.factionId === faction.id &&
    !item.isLegends &&
    Object.hasOwn(collections, item.abilityGroupType)
  )) {
    const publications = (groupPublications.get(group.id) ?? [])
      .map((link) => publicationById.get(link.publicationId)?.name)
      .filter(Boolean);
    for (const ability of abilitiesByGroup.get(group.id) ?? []) {
      const converted = makeAbility(ability, abilityKeywords, {
        groupName: group.name,
        restrictionText: group.restrictionText,
        sourcePublications: publications,
      });
      collections[group.abilityGroupType].push(converted.sourceId);
      addRule(rules, converted);
    }
  }

  const lores = data.lore
    .filter((lore) => lore.factionId === faction.id)
    .map((lore) => {
      const abilities = (loreAbilities.get(lore.id) ?? []).map((ability) => {
        const converted = makeAbility(ability, loreKeywords);
        addRule(rules, converted);
        return converted.sourceId;
      });
      return {
        id: slug(lore.name),
        sourceId: lore.id,
        name: lore.name,
        restrictionText: lore.restrictionText,
        points: lore.points ?? 0,
        abilities,
      };
    });

  const formations = data.battle_formation
    .filter((formation) => formation.factionId === faction.id && !formation.isLegends)
    .map((formation) => {
      const abilities = (formationRules.get(formation.id) ?? []).map((ability) =>
        makeAbility(ability, formationKeywords)
      );
      const publication = publicationById.get(formation.publicationId)?.name ?? null;
      return {
        id: slug(formation.name),
        sourceId: formation.id,
        name: formation.name,
        description: abilities.map((ability) => ability.description).filter(Boolean).join("\n\n"),
        ability: abilities.length === 1 ? abilities[0] : undefined,
        abilities,
        points: formation.points ?? 0,
        sourcePublication: publication,
      };
    });

  const armiesOfRenown = Object.fromEntries(
    data.faction_keyword
      .filter((item) => item.parentFactionKeywordId === faction.id && item.armyOfRenown && !item.isLegends)
      .map((item) => [normalized(item.name), sourceForFaction(item)])
  );

  return { rules, collections, formations, lores, armiesOfRenown };
}

const factionsByName = new Map(data.faction_keyword.map((item) => [item.name, item]));
const output = {
  metadata: {
    source: catalogue.source,
    dataVersion: catalogue.dataVersion,
    generatedAt: new Date().toISOString(),
  },
  factions: {},
};
const missing = [];

for (const name of FACTIONS) {
  const faction = factionsByName.get(name);
  if (!faction) {
    missing.push(name);
    continue;
  }
  output.factions[name] = sourceForFaction(faction);
}

const totals = Object.values(output.factions).reduce((result, faction) => ({
  rules: result.rules + Object.values(faction.rules).flat().length,
  formations: result.formations + faction.formations.length,
  lores: result.lores + faction.lores.length,
  armiesOfRenown: result.armiesOfRenown + Object.keys(faction.armiesOfRenown).length,
}), { rules: 0, formations: 0, lores: 0, armiesOfRenown: 0 });

const report = [
  "# Wording autoritativo de AoS Community Bot",
  "",
  `- Versión de datos: ${catalogue.dataVersion}.`,
  `- Ejércitos: ${Object.keys(output.factions).length}.`,
  `- Reglas y habilidades: ${totals.rules}.`,
  `- Formaciones: ${totals.formations}.`,
  `- Lores: ${totals.lores}.`,
  `- Ejércitos de renombre: ${totals.armiesOfRenown}.`,
  `- Facciones no encontradas: ${missing.length ? missing.join(", ") : "ninguna"}.`,
  "",
  "El texto conserva literalmente los marcadores Markdown de negrita y cursiva del bot.",
].join("\n");

for (const path of [outputPath, reportPath]) mkdirSync(dirname(resolve(path)), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
writeFileSync(reportPath, `${report}\n`);
console.log(JSON.stringify({ ...totals, factions: Object.keys(output.factions).length, missing }, null, 2));
