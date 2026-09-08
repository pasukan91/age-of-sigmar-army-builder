export function ensureManifestationLoreCoverage({ faction, lores, manifestations }) {
  const coveredManifestationIds = new Set(
    lores.flatMap((lore) =>
      lore.manifestations.map((manifestation) => manifestation.id)
    )
  );
  const uncoveredManifestations = manifestations.filter(
    (manifestation) => !coveredManifestationIds.has(manifestation.id)
  );

  if (uncoveredManifestations.length === 0) {
    return lores;
  }

  return [
    {
      id: `${faction.id}-manifestation-lore`,
      name: faction.manifestationLoreName ?? "Manifestaciones de facción",
      description: `Incluye ${uncoveredManifestations.map((item) => item.name).join(", ")}.`,
      manifestations: uncoveredManifestations,
    },
    ...lores,
  ];
}
