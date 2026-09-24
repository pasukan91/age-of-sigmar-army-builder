import catalogue from "./sigdexAllFactions.generated.json" with { type: "json" };

const AUTHORITATIVE_FIELDS = [
  "battleTraits",
  "battleFormations",
  "heroicTraits",
  "artefacts",
  "aqshyArtefacts",
  "aqshyHeroicTraits",
  "aqshyEnhancements",
  "spellLores",
  "prayerLores",
  "manifestations",
  "manifestationLores",
  "terrain",
  "units",
  "armiesOfRenown",
];

// These local collections predate the bot's unified aqshyEnhancements field.
// Keeping both makes the same enhancement appear twice under different UI
// sections (for example Gloomspite Special Knick-knacks).
const LEGACY_ENHANCEMENT_FIELDS = [
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
  "aqshyPrayerLores",
];

const factionsByName = new Map(
  catalogue.factions.map((faction) => [normalizedName(faction.name), faction])
);

export function applyAosCommunityFactionData(faction) {
  const sourceName = faction?.catalogueFactionName ?? faction?.name;
  const source = factionsByName.get(normalizedName(sourceName));
  if (!source) return faction;

  const result = { ...faction };
  for (const field of AUTHORITATIVE_FIELDS) {
    result[field] = mergeCollection(
      faction[field],
      localizeCatalogueImages(source[field])
    );
  }
  for (const field of LEGACY_ENHANCEMENT_FIELDS) result[field] = [];

  return {
    ...result,
    name: source.name,
    sourcePublication: source.sourcePublication,
    balancePublicationDate: source.balancePublicationDate,
    image: localImage(faction.image) ?? localizeImage(source.image),
    catalogueDataVersion:
      catalogue.metadata.battleProfilesVersion ?? catalogue.metadata.bsdataVersion,
  };
}

function mergeCollection(current = [], authoritative = []) {
  const currentByName = new Map(
    (current ?? []).map((item) => [normalizedName(item?.name), item])
  );
  return (authoritative ?? []).map((source) => {
    const existing = currentByName.get(normalizedName(source?.name));
    if (!existing) {
      return source.details
        ? {
            ...source,
            details: { ...source.details },
          }
        : source;
    }

    const merged = {
      ...existing,
      ...source,
      id: existing.id ?? source.id,
      image: (String(existing.image ?? "").startsWith("/images/factions/")
        ? source.image ?? existing.image
        : localImage(existing.image) ?? source.image),
      synergy: existing.synergy,
    };

    if (source.details) {
      merged.details = {
        ...existing.details,
        ...source.details,
        canJoinRegimentAs: source.details.canJoinRegimentAs,
      };
    }

    if (source.rules) {
      merged.rules = mergeRules(existing.rules, source.rules);
    }
    return merged;
  });
}

function mergeRules(current = {}, authoritative = {}) {
  const result = { ...current, ...authoritative };
  for (const field of AUTHORITATIVE_FIELDS) {
    if (field in authoritative) {
      result[field] = mergeCollection(current?.[field], authoritative[field]);
    }
  }
  const isArmyRuleSet = AUTHORITATIVE_FIELDS.some((field) => field in authoritative) ||
    LEGACY_ENHANCEMENT_FIELDS.some((field) => field in current);
  if (isArmyRuleSet) {
    for (const field of LEGACY_ENHANCEMENT_FIELDS) result[field] = [];
  }
  return result;
}

function localImage(image) {
  return String(image ?? "").startsWith("/images/") ? image : null;
}

function localizeCatalogueImages(value) {
  if (Array.isArray(value)) return value.map(localizeCatalogueImages);
  if (!value || typeof value !== "object") return value;

  const result = Object.fromEntries(
    Object.entries(value).map(([key, nested]) => [
      key,
      localizeCatalogueImages(nested),
    ])
  );
  if ("image" in result) result.image = localizeImage(result.image);
  return result;
}

function localizeImage(image) {
  const match = String(image ?? "").match(
    /^https?:\/\/dhss9aar8ocw\.cloudfront\.net\/([a-z0-9-]+)$/i
  );
  return match ? `/images/catalogue/${match[1]}.webp` : image;
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

export function getAosCommunityFactionMetadata() {
  return catalogue.metadata;
}
