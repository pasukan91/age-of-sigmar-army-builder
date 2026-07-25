const MANIFESTATION_IMAGES = {
  "dreadful-visage": "/images/manifestations/dreadful-visage.webp",
  "mesmerising-mirror": "/images/manifestations/mesmerising-mirror.webp",
  "wheels-of-excruciation": "/images/manifestations/wheels-of-excruciation.webp",
  vermintide: "/images/manifestations/skaven-manifestations.webp",
  "warp-lightning-vortex": "/images/manifestations/warp-lightning-vortex.webp",
  "bell-of-doom": "/images/manifestations/skaven-manifestations.webp",
};

export function normalizeRuleItem(item) {
  if (typeof item !== "string") {
    return {
      ...item,
      image: resolveManifestationImage(item.id, item.image),
    };
  }

  return {
    id: item,
    name: titleFromId(item),
    image: resolveManifestationImage(item),
    dataPending: true,
  };
}

export function getRuleArtwork(item, kind) {
  return kind === "manifestation"
    ? resolveManifestationImage(item.id, item.image)
    : item.image;
}

function resolveManifestationImage(id, fallback) {
  return MANIFESTATION_IMAGES[id] ?? fallback;
}

function titleFromId(id) {
  return String(id)
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
