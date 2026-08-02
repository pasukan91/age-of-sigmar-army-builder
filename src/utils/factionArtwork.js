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

// Each use crops the artwork to a different aspect ratio. Keeping separate
// focal points prevents the main character from being lost behind the crop.
// Hedonites is intentionally omitted so it keeps its existing framing.
const factionArtworkPositions = {
  cities: { card: "78% 50%", page: "70% 50%", list: "78% 50%" },
  daughters: { card: "65% 36%", page: "62% 40%", list: "65% 38%" },
  flesheater: { card: "52% 50%", page: "52% 50%", list: "52% 50%" },
  gloomspite: { card: "57% 38%", page: "57% 42%", list: "57% 40%" },
  hashut: { card: "70% 42%", page: "66% 44%", list: "70% 42%" },
  idoneth: { card: "52% 34%", page: "52% 40%", list: "52% 37%" },
  ironjawz: { card: "74% 44%", page: "67% 45%", list: "74% 44%" },
  kharadron: { card: "48% 43%", page: "48% 45%", list: "48% 43%" },
  khorne: { card: "55% 36%", page: "55% 42%", list: "55% 39%" },
  kruleboyz: { card: "57% 38%", page: "55% 40%", list: "57% 40%" },
  lumineth: { card: "57% 43%", page: "55% 45%", list: "57% 43%" },
  nighthaunt: { card: "54% 50%", page: "54% 50%", list: "54% 50%" },
  nurgle: { card: "54% 48%", page: "54% 45%", list: "54% 48%" },
  ogors: { card: "52% 36%", page: "52% 38%", list: "52% 38%" },
  ossiarch: { card: "69% 43%", page: "65% 45%", list: "69% 43%" },
  skaven: { card: "68% 50%", page: "62% 48%", list: "68% 50%" },
  soulblight: { card: "54% 36%", page: "54% 39%", list: "54% 38%" },
  stormcast: { card: "58% 50%", page: "58% 50%", list: "58% 50%" },
  std: { card: "52% 38%", page: "52% 42%", list: "52% 40%" },
  sylvaneth: { card: "68% 48%", page: "62% 48%", list: "68% 48%" },
  tzeentch: { card: "58% 54%", page: "56% 50%", list: "58% 54%" },
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

export function getFactionArtworkPosition(faction, context = "card") {
  if (!faction?.id || faction.id === "hedonites") {
    return null;
  }

  return factionArtworkPositions[faction.id]?.[context] ?? faction.imagePosition ?? null;
}

export default factionArtwork;
