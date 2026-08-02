import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const [cataloguePath, outputPath] = process.argv.slice(2);
if (!cataloguePath || !outputPath) {
  throw new Error("Usage: node scripts/generate-battletome-factions-from-catalogue.mjs <catalogue.json> <output.json>");
}

const TARGETS = [
  { id: "stormcast", alliance: "order", name: "Stormcast Eternals", publication: "Order Battletome: Stormcast Eternals" },
  { id: "idoneth", alliance: "order", name: "Idoneth Deepkin", publication: "Order Battletome: Idoneth Deepkin" },
  { id: "kharadron", alliance: "order", name: "Kharadron Overlords", publication: "Order Battletome: Kharadron Overlords" },
  { id: "nighthaunt", alliance: "death", name: "Nighthaunt", publication: "Death Battletome: Nighthaunt" },
  { id: "flesheater", alliance: "death", name: "Flesh-eater Courts", publication: "Death Battletome: Flesh-eater Courts" },
];

const catalogue = JSON.parse(readFileSync(cataloguePath, "utf8"));
const data = catalogue.datasets;

function slug(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[‘’‛`´]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function cleanMarkdown(value) {
  return String(value ?? "").replace(/\*\*/g, "").trim();
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

const factionByName = new Map(data.faction_keyword.map((row) => [row.name, row]));
const keywordById = new Map(data.keyword.map((row) => [row.id, row.name]));
const warscrollById = new Map(data.warscroll.map((row) => [row.id, row]));
const weaponsByWarscroll = indexBy(data.warscroll_weapon, "warscrollId");
const abilitiesByWarscroll = indexBy(data.warscroll_ability, "warscrollId");
const keywordsByWarscroll = indexBy(data.warscroll_keyword, "warscrollId");
const factionLinksByFaction = indexBy(data.warscroll_faction_keyword, "factionKeywordId");
const abilityKeywordsByAbility = indexBy(data.warscroll_ability_keyword, "warscrollAbilityId");
const weaponAbilityById = new Map(data.weapon_ability.map((row) => [row.id, row]));
const weaponAbilitiesByWeapon = indexBy(data.warscroll_weapon_weapon_ability, "warscrollWeaponId");
const regimentOptionsByWarscroll = indexBy(data.warscroll_regiment_option, "warscrollId");
const abilityGroupPublications = indexBy(data.ability_group_publication, "publicationId");
const abilitiesByGroup = indexBy(data.ability, "abilityGroupId");
const formationRulesByFormation = indexBy(data.battle_formation_rule, "battleFormationId");
const loreAbilitiesByLore = indexBy(data.lore_ability, "loreId");
const loreKeywordsByAbility = indexBy(data.lore_ability_keyword, "loreAbilityId");
const linkedWarscrollsByLoreAbility = indexBy(data.lore_ability_linked_warscroll, "loreAbilityId");
const requiredKeywordsByGroup = indexBy(data.ability_group_required_keyword, "abilityGroupId");
const excludedKeywordsByGroup = indexBy(data.ability_group_excluded_keyword, "abilityGroupId");

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

function joinedKeywords(index, id) {
  return (index.get(id) ?? [])
    .sort((left, right) => (left.displayOrder ?? 0) - (right.displayOrder ?? 0))
    .map((link) => keywordById.get(link.keywordId))
    .filter(Boolean);
}

function description(ability) {
  const sections = [];
  if (ability.usedBy) sections.push(`Used By: ${ability.usedBy}`);
  if (ability.declare) sections.push(`Declare: ${ability.declare}`);
  if (ability.effect) sections.push(`Effect: ${ability.effect}`);
  if (ability.additionalRulesText) sections.push(ability.additionalRulesText);
  return sections.join("\n\n") || ability.lore || "Sin descripción.";
}

function abilityType(keywords) {
  if (keywords.some((keyword) => keyword.toLowerCase() === "spell")) return "Spell";
  if (keywords.some((keyword) => keyword.toLowerCase() === "prayer")) return "Prayer";
  return "Ability";
}

function makeAbility(ability, keywordIndex = abilityKeywordsByAbility) {
  const keywords = joinedKeywords(keywordIndex, ability.id);
  const type = abilityType(keywords);
  return {
    id: slug(ability.name),
    name: ability.name,
    phase: ability.phaseDetails || "Passive",
    type,
    description: description(ability),
    keywords,
    castingValue: type === "Prayer" ? null : ability.castingValue ?? null,
    chantingValue: type === "Prayer" ? ability.castingValue ?? null : null,
    commandPoints: ability.cpCost ?? null,
    points: ability.points ?? 0,
    lore: ability.lore ?? null,
  };
}

function makeWeapon(weapon) {
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

function keywordLevel(warscroll, keyword) {
  return Number(String(warscroll.referenceKeywords ?? "").match(new RegExp(`${keyword} \\((\\d+)\\)`, "i"))?.[1] ?? 0);
}

function makeWarscroll(warscroll, factionId, { manifestation = false } = {}) {
  const keywords = sourceKeywords(warscroll);
  const regimentOptions = (regimentOptionsByWarscroll.get(warscroll.id) ?? [])
    .sort((left, right) => (left.displayOrder ?? 0) - (right.displayOrder ?? 0))
    .map((option) => cleanMarkdown(option.optionText))
    .filter(Boolean);
  const isHero = keywords.includes("Hero");
  return {
    id: slug(warscroll.name),
    sourceId: warscroll.id,
    name: warscroll.name,
    image: warscroll.rowImage || warscroll.bannerImage || `/images/factions/${factionId}.webp`,
    points: manifestation ? 0 : warscroll.points,
    profile: {
      move: warscroll.move,
      health: Number.isFinite(Number(warscroll.health)) ? Number(warscroll.health) : warscroll.health,
      control: warscroll.control,
      save: warscroll.save,
      ward: warscroll.wardSave,
    },
    weapons: (weaponsByWarscroll.get(warscroll.id) ?? []).map(makeWeapon),
    abilities: (abilitiesByWarscroll.get(warscroll.id) ?? []).map((ability) => makeAbility(ability)),
    details: {
      models: warscroll.modelCount,
      baseSize: warscroll.baseSize,
      regimentOptions,
      canJoinRegimentAs: isHero ? keywords : [],
      notes: warscroll.notes,
    },
    keywords,
    rules: {
      hero: isHero,
      unique: keywords.includes("Unique"),
      monster: keywords.includes("Monster"),
      wizard: keywordLevel(warscroll, "Wizard"),
      priest: keywordLevel(warscroll, "Priest"),
      ward: warscroll.wardSave,
      warmaster: keywords.includes("Warmaster"),
      companion: (weaponsByWarscroll.get(warscroll.id) ?? []).some((weapon) => makeWeapon(weapon).abilities.includes("Companion")),
      canBeReinforced: !warscroll.cannotBeReinforced,
      canLeadRegiment: isHero ? regimentOptions.length > 0 : false,
    },
    lore: warscroll.lore,
    catalogueSource: {
      id: warscroll.id,
      dataVersion: catalogue.dataVersion,
      databaseUpdated: "2026-07-08",
    },
  };
}

function makeLoreAbility(ability) {
  return makeAbility(ability, loreKeywordsByAbility);
}

function makeLores(faction, factionWarscrollIds) {
  const lores = data.lore.filter((lore) => lore.factionId === faction.id);
  const spellLores = [];
  const prayerLores = [];
  const manifestations = [];
  const manifestationLores = [];

  for (const lore of lores) {
    const abilities = loreAbilitiesByLore.get(lore.id) ?? [];
    const linkedIds = abilities.flatMap((ability) =>
      (linkedWarscrollsByLoreAbility.get(ability.id) ?? []).map((link) => link.warscrollId)
    );
    if (linkedIds.length) {
      const loreManifestations = [];
      for (const ability of abilities) {
        for (const link of linkedWarscrollsByLoreAbility.get(ability.id) ?? []) {
          const warscroll = warscrollById.get(link.warscrollId);
          if (!warscroll || warscroll.isLegends || warscroll.isSpearhead) continue;
          const item = makeWarscroll(warscroll, slug(faction.name), { manifestation: true });
          const summon = makeLoreAbility(ability);
          item.castingValue = summon.castingValue ?? summon.chantingValue;
          item.summonSpell = {
            ...summon,
            name: ability.name,
            keywords: [...new Set([...summon.keywords, "Summon"])],
          };
          loreManifestations.push(item);
          factionWarscrollIds.add(warscroll.id);
        }
      }
      const uniqueLoreManifestations = [...new Map(
        loreManifestations.map((item) => [item.sourceId, item])
      ).values()];
      manifestations.push(...uniqueLoreManifestations);
      manifestationLores.push({
        id: slug(lore.name),
        name: lore.name,
        description: lore.restrictionText ?? "",
        manifestations: uniqueLoreManifestations,
      });
      continue;
    }

    const converted = abilities.map(makeLoreAbility);
    const isPrayer = converted.some((ability) => ability.type === "Prayer");
    if (isPrayer) {
      prayerLores.push({ id: slug(lore.name), name: lore.name, prayers: converted });
    } else {
      spellLores.push({ id: slug(lore.name), name: lore.name, spells: converted });
    }
  }
  return {
    spellLores,
    prayerLores,
    manifestations: [...new Map(manifestations.map((item) => [item.sourceId, item])).values()],
    manifestationLores,
  };
}

function makeEnhancementGroups(publicationId, groupType, source = "Battletome") {
  const linkedGroupIds = new Set((abilityGroupPublications.get(publicationId) ?? []).map((link) => link.abilityGroupId));
  return data.ability_group
    .filter((group) => linkedGroupIds.has(group.id) && group.abilityGroupType === groupType && !group.isLegends)
    .flatMap((group) => {
      const requiredKeywords = (requiredKeywordsByGroup.get(group.id) ?? [])
        .map((link) => keywordById.get(link.keywordId))
        .filter(Boolean);
      const excludedKeywords = (excludedKeywordsByGroup.get(group.id) ?? [])
        .map((link) => keywordById.get(link.keywordId))
        .filter(Boolean);
      return (abilitiesByGroup.get(group.id) ?? []).map((ability) => ({
        ...makeAbility(ability),
        source,
        groupName: group.name,
        restrictionText: group.restrictionText,
        requiredKeywords,
        excludedKeywords,
        requireAnyKeyword: requiredKeywords.length > 1 && /\bor\b/i.test(group.restrictionText ?? ""),
        rosterLevelLimit: group.rosterLevelLimit,
        unitLevelLimit: group.unitLevelLimit,
      }));
    });
}

function makeFaction(config) {
  const faction = factionByName.get(config.name);
  const publication = data.publication.find((item) => item.name === config.publication);
  const aqshyPublication = data.publication.find((item) => item.name === `Scourge of Aqshy: ${config.name}`);
  if (!faction || !publication) throw new Error(`Missing faction or battletome publication for ${config.name}`);

  const factionWarscrollIds = new Set((factionLinksByFaction.get(faction.id) ?? []).map((link) => link.warscrollId));
  const lores = makeLores(faction, factionWarscrollIds);
  const units = data.warscroll
    .filter((warscroll) =>
      factionWarscrollIds.has(warscroll.id) &&
      warscroll.points != null &&
      !warscroll.isSpearhead &&
      !warscroll.isLegends &&
      !warscroll.hiddenFromStormForge &&
      !warscroll.hiddenFromBattleProfiles &&
      !sourceKeywords(warscroll).includes("Faction Terrain") &&
      !sourceKeywords(warscroll).includes("Manifestation")
    )
    .map((warscroll) => makeWarscroll(warscroll, config.id));

  const manifestationIds = new Set(lores.manifestations.map((item) => item.sourceId));
  const terrain = data.warscroll
    .filter((warscroll) =>
      factionWarscrollIds.has(warscroll.id) &&
      !manifestationIds.has(warscroll.id) &&
      !warscroll.isSpearhead &&
      !warscroll.isLegends &&
      !warscroll.hiddenFromReference &&
      sourceKeywords(warscroll).includes("Faction Terrain")
    )
    .map((warscroll) => makeWarscroll(warscroll, config.id));

  const battleFormations = data.battle_formation
    .filter((formation) => formation.factionId === faction.id && formation.publicationId === publication.id && !formation.isLegends)
    .map((formation) => {
      const rules = formationRulesByFormation.get(formation.id) ?? [];
      return {
        id: slug(formation.name),
        name: formation.name,
        ability: rules.length === 1 ? makeAbility(rules[0]) : undefined,
        abilities: rules.map((rule) => makeAbility(rule)),
      };
    });

  const aqshyHeroicTraits = aqshyPublication
    ? makeEnhancementGroups(aqshyPublication.id, "heroicTraits", "Aqshy")
    : [];
  const aqshyArtefacts = aqshyPublication
    ? makeEnhancementGroups(aqshyPublication.id, "artefactsOfPower", "Aqshy")
    : [];
  const aqshyEnhancements = aqshyPublication
    ? makeEnhancementGroups(aqshyPublication.id, "otherEnhancements", "Aqshy")
    : [];

  return {
    id: config.id,
    alliance: config.alliance,
    name: config.name,
    image: faction.selectFactionImage || faction.factionHeaderImage,
    sourcePublication: config.publication,
    battleTraits: makeEnhancementGroups(publication.id, "battleTraits"),
    battleFormations,
    heroicTraits: [
      ...makeEnhancementGroups(publication.id, "heroicTraits"),
      ...aqshyHeroicTraits,
    ],
    artefacts: makeEnhancementGroups(publication.id, "artefactsOfPower"),
    aqshyArtefacts,
    aqshyEnhancements,
    spellLores: lores.spellLores,
    prayerLores: lores.prayerLores,
    manifestations: lores.manifestations,
    manifestationLores: lores.manifestationLores,
    terrain,
    units,
  };
}

const output = {
  metadata: {
    source: catalogue.source,
    dataVersion: catalogue.dataVersion,
    databaseUpdated: "2026-07-08",
    generatedAt: new Date().toISOString(),
  },
  factions: TARGETS.map(makeFaction),
};

mkdirSync(dirname(resolve(outputPath)), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(output.factions.map((faction) => ({
  faction: faction.name,
  units: faction.units.length,
  manifestations: faction.manifestations.length,
  terrain: faction.terrain.length,
  battleTraits: faction.battleTraits.length,
  battleFormations: faction.battleFormations.length,
  heroicTraits: faction.heroicTraits.length,
  artefacts: faction.artefacts.length,
  spellLores: faction.spellLores.length,
  prayerLores: faction.prayerLores.length,
})));
