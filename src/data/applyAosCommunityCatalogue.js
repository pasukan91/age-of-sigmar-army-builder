import catalogue from "./aosCommunityCatalogue.generated.json";

function normalizedName(value) {
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

export function applyAosCommunityCatalogue(unit, factionName) {
  const source = catalogue.factions?.[factionName]?.[normalizedName(unit?.name)];
  if (!source) return unit;

  return {
    ...unit,
    points: source.points ?? unit.points,
    profile: {
      ...unit.profile,
      ...source.profile,
    },
    details: {
      ...unit.details,
      ...source.details,
    },
    keywords: [...new Set([...(unit.keywords ?? []), ...source.keywords])],
    weapons: source.weapons,
    abilities: source.abilities,
    catalogueSource: {
      id: source.sourceId,
      dataVersion: catalogue.metadata.dataVersion,
      databaseUpdated: catalogue.metadata.databaseUpdated,
    },
  };
}

export function getAosCommunityCatalogueMetadata() {
  return catalogue.metadata;
}
