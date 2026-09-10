import catalogue from "./aosCommunityAllFactions.generated.json" with { type: "json" };

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

  return {
    ...result,
    name: source.name,
    sourcePublication: source.sourcePublication,
    image: localImage(faction.image) ?? localizeImage(source.image),
    catalogueDataVersion: catalogue.metadata.dataVersion,
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
            details: { ...source.details, canJoinRegimentAs: [] },
          }
        : source;
    }

    const merged = {
      ...existing,
      ...source,
      id: existing.id ?? source.id,
      image: localImage(existing.image) ?? source.image,
      synergy: existing.synergy,
    };

    if (source.details) {
      merged.details = {
        ...existing.details,
        ...source.details,
        canJoinRegimentAs:
          existing.details?.canJoinRegimentAs ?? source.details.canJoinRegimentAs,
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
