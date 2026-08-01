const FACTION_ARTWORK_VERSION = "20260801";

const factionArtwork = {
  cities: "/images/factions/citiesofsigmar.webp",
  daughters: "/images/factions/dok.webp",
  gloomspite: "/images/factions/gloomspite.webp",
  hedonites: "/images/factions/hedonites.webp",
  ironjawz: "/images/factions/ironjawz-army.webp",
  kruleboyz: "/images/factions/kruleboyz.webp",
  lumineth: "/images/factions/lumineth.webp",
  ogors: "/images/factions/ogormawtribes.webp",
  skaven: "/images/factions/skaven.webp",
  sylvaneth: "/images/factions/sylvaneth.webp",
  std: "/images/factions/slaves.webp",
};

export function getFactionArtwork(faction) {
  const canonicalArtwork = factionArtwork[faction?.id];
  const artwork = canonicalArtwork ?? faction?.image;

  if (typeof artwork !== "string" || !artwork) {
    return null;
  }

  const separator = artwork.includes("?") ? "&" : "?";
  return `${artwork}${separator}v=${FACTION_ARTWORK_VERSION}`;
}

export default factionArtwork;
