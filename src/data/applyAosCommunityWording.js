import catalogue from "./aosCommunityWording.generated.json";

const RULE_COLLECTIONS = [
  "monsterTraits",
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
  "aqshyEnhancements",
];

export function applyAosCommunityWording(faction) {
  if (faction?.catalogueWordingVersion === catalogue.metadata.dataVersion) return faction;
  const sourceName = faction?.catalogueFactionName ?? faction?.name;
  const source = catalogue.factions?.[sourceName];
  if (!source) return faction;

  return applyRules(faction, source, Boolean(faction.catalogueDataVersion));
}

function applyRules(rules, source, hasAuthoritativeCollections = false) {
  // The full catalogue already selects the publication and carries its exact
  // wording. The wording index also contains Spearhead and older seasons;
  // rebuilding collections from that index would reintroduce unrelated rules.
  if (hasAuthoritativeCollections) {
    const result = { ...rules, catalogueWordingVersion: catalogue.metadata.dataVersion };
    for (const field of RULE_COLLECTIONS) {
      if (field !== "aqshyEnhancements") {
        result[field] = mergeExistingCollection(rules[field], source.rules);
      }
    }
    result.armiesOfRenown = (rules.armiesOfRenown ?? []).map((army) => {
      const armySource = source.armiesOfRenown?.[normalizedName(army.name)];
      return armySource && army.rules
        ? { ...army, rules: applyRules(army.rules, armySource, true) }
        : army;
    });
    return result;
  }
  const result = {
    ...rules,
    catalogueWordingVersion: catalogue.metadata.dataVersion,
    battleTraits: mergeCompleteCollection(
      rules.battleTraits,
      collectionItems(source, "battleTraits"),
      source.rules
    ),
    battleFormations: mergeFormations(rules.battleFormations, source.formations),
    heroicTraits: mergeCompleteCollection(
      rules.heroicTraits,
      collectionItems(source, "heroicTraits"),
      source.rules
    ),
    artefacts: mergeCompleteCollection(
      rules.artefacts,
      seasonalItems(collectionItems(source, "artefactsOfPower"), false),
      source.rules
    ),
    aqshyArtefacts: mergeCompleteCollection(
      rules.aqshyArtefacts,
      seasonalItems(collectionItems(source, "artefactsOfPower"), true),
      source.rules
    ),
    spellLores: mergeLores(rules.spellLores, source),
    prayerLores: mergeLores(rules.prayerLores, source),
    manifestationLores: mergeLores(rules.manifestationLores, source),
  };

  for (const field of RULE_COLLECTIONS) {
    result[field] = mergeExistingCollection(rules[field], source.rules);
  }

  result.armiesOfRenown = (rules.armiesOfRenown ?? []).map((army) => {
    const armySource = source.armiesOfRenown?.[normalizedName(army.name)];
    if (!armySource || !army.rules) return army;
    return { ...army, rules: applyRules(army.rules, armySource) };
  });

  return result;
}

function mergeCompleteCollection(current = [], authoritative = [], rulesByName = {}) {
  if (!authoritative?.length) return mergeExistingCollection(current, rulesByName);
  const currentByName = new Map(current.map((item) => [normalizedName(item.name), item]));
  return authoritative.map((item) => mergeRule(currentByName.get(normalizedName(item.name)), item));
}

function mergeExistingCollection(items = [], rulesByName = {}) {
  return (items ?? []).map((item) => {
    const source = pickRule(item, rulesByName);
    return source ? mergeRule(item, source) : item;
  });
}

function mergeFormations(current = [], authoritative = []) {
  if (!authoritative?.length) return current ?? [];
  const currentByName = new Map((current ?? []).map((item) => [normalizedName(item.name), item]));

  return authoritative.map((formation) => {
    const existing = currentByName.get(normalizedName(formation.name));
    return {
      ...existing,
      ...formation,
      id: existing?.id ?? formation.id,
      ability: formation.ability,
      abilities: formation.abilities,
      catalogueSource: {
        id: formation.sourceId,
        dataVersion: catalogue.metadata.dataVersion,
      },
    };
  });
}

function mergeLores(lores = [], source) {
  return (lores ?? []).map((lore) => {
    const authoritativeLore = source.lores?.find(
      (item) => normalizedName(item.name) === normalizedName(lore.name)
    );
    const loreRules = authoritativeLore
      ? resolveRuleIds(authoritativeLore.abilities, source)
      : [];
    const ruleIndex = authoritativeLore
      ? Object.fromEntries(loreRules.map((item) => [normalizedName(item.name), [item]]))
      : source.rules;

    return {
      ...lore,
      name: authoritativeLore?.name ?? lore.name,
      restrictionText: authoritativeLore?.restrictionText ?? lore.restrictionText,
      spells: mergeExistingCollection(lore.spells, ruleIndex),
      prayers: mergeExistingCollection(lore.prayers, ruleIndex),
      manifestations: (lore.manifestations ?? []).map((manifestation) => ({
        ...manifestation,
        summonSpell: manifestation.summonSpell
          ? mergeRule(
              manifestation.summonSpell,
              pickRule(manifestation.summonSpell, ruleIndex)
            )
          : manifestation.summonSpell,
      })),
    };
  });
}

function mergeRule(existing = {}, authoritative) {
  if (!authoritative) return existing;
  return {
    ...existing,
    ...authoritative,
    id: existing?.id ?? authoritative.id,
    synergy: existing?.synergy,
    catalogueSource: {
      id: authoritative.sourceId,
      dataVersion: catalogue.metadata.dataVersion,
    },
  };
}

function pickRule(item, rulesByName = {}) {
  const candidates = rulesByName?.[normalizedName(item?.name)] ?? [];
  if (candidates.length <= 1) return candidates[0] ?? null;

  const sourceId = item.sourceId ?? item.catalogueSource?.id;
  const exact = candidates.find((candidate) => candidate.sourceId === sourceId);
  if (exact) return exact;
  const matching = candidates.filter((candidate) =>
    item.groupName && normalizedName(candidate.groupName) === normalizedName(item.groupName)
  );
  if (matching.length === 1) return matching[0];
  // Timing alone cannot identify a rule across game modes or publications.
  return candidates.find((candidate) => candidate.description === item.description) ?? null;
}

function seasonalItems(items = [], seasonal) {
  return items.filter((item) => {
    const isSeasonal = item.sourcePublications?.some((name) => /^Scourge of /i.test(name));
    return isSeasonal === seasonal;
  });
}

function collectionItems(source, collection) {
  return resolveRuleIds(source.collections?.[collection], source);
}

function resolveRuleIds(ids = [], source) {
  const wanted = new Set(ids);
  return Object.values(source.rules ?? {}).flat().filter((item) => wanted.has(item.sourceId));
}

function normalizedName(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[‘’‛`´]/g, "'")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function getAosCommunityWordingMetadata() {
  return catalogue.metadata;
}
