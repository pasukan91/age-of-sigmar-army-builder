export const HEROIC_TRAITS = "Heroic Traits";
export const ARTEFACTS_OF_POWER = "Artefacts of Power";

export function hasAuthoritativeEnhancementEligibility(unit) {
  return Array.isArray(unit?.details?.enhancementCategories);
}

export function canUnitTakeEnhancementCategory(unit, category) {
  return (unit?.details?.enhancementCategories ?? []).includes(category);
}

export function getSpecialEnhancementGroups(unit, faction) {
  if (!hasAuthoritativeEnhancementEligibility(unit)) return [];
  const eligible = new Set(unit.details.enhancementCategories);
  const groups = new Map();

  for (const option of faction?.aqshyEnhancements ?? []) {
    const category = option.enhancementCategory ?? option.groupName;
    if (!category || !eligible.has(category)) continue;
    const entries = groups.get(category) ?? [];
    entries.push(option);
    groups.set(category, entries);
  }

  return [...groups].map(([category, options]) => ({ category, options }));
}

export function getSpecialEnhancementEntries(unit) {
  return Object.entries(unit?.specialEnhancements ?? {})
    .filter(([, enhancement]) => Boolean(enhancement?.id));
}
