export function getManifestationLoreContents(option) {
  return (option?.manifestations ?? [])
    .map((manifestation) => manifestation?.name)
    .filter(Boolean);
}

export function getRegimentAbilityNames(regiment) {
  return (regiment?.abilities ?? [])
    .map((ability) => ability?.name)
    .filter(Boolean);
}
