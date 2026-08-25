export const POSITIVE_UNIT_MODIFIERS = [
  { id: "hit-plus-1", label: "+1 a impactar", shortLabel: "+1 Impactar" },
  { id: "wound-plus-1", label: "+1 a herir", shortLabel: "+1 Herir" },
  { id: "save-plus-1", label: "+1 a salvación", shortLabel: "+1 Salvación" },
  { id: "rend-plus-1", label: "+1 a perforar", shortLabel: "+1 Perforar" },
  { id: "crit-mortal-5", label: "Crítico mortal con 5+", shortLabel: "Mortal 5+" },
];

const modifierIds = new Set(POSITIVE_UNIT_MODIFIERS.map((modifier) => modifier.id));
const MAX_TRACKED_UNIT_STATES = 128;

export function getUnitStartingModels(unit) {
  const configuredModels = Number(unit?.configuredModels);
  if (Number.isFinite(configuredModels) && configuredModels > 0) {
    return Math.floor(configuredModels);
  }

  const baseModels = Number(unit?.details?.models ?? unit?.models);
  const models = Number.isFinite(baseModels) && baseModels > 0 ? Math.floor(baseModels) : 1;
  return models * (unit?.reinforced ? 2 : 1);
}

export function getBattleUnitState(value, unit) {
  const startingModels = getUnitStartingModels(unit);
  const remainingValue = Number(value?.remainingModels);
  const remainingModels = Number.isFinite(remainingValue)
    ? Math.min(startingModels, Math.max(0, Math.floor(remainingValue)))
    : startingModels;

  return {
    remainingModels,
    modifiers: normalizeModifiers(value?.modifiers),
  };
}

export function normalizeBattleUnitStates(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  return Object.fromEntries(
    Object.entries(value)
      .filter(([key, state]) => key && state && typeof state === "object" && !Array.isArray(state))
      .slice(0, MAX_TRACKED_UNIT_STATES)
      .map(([key, state]) => [String(key).slice(0, 160), {
        remainingModels: Math.min(999, Math.max(0, Math.floor(Number(state.remainingModels) || 0))),
        modifiers: normalizeModifiers(state.modifiers),
      }]),
  );
}

function normalizeModifiers(value) {
  return [...new Set(
    (Array.isArray(value) ? value : [])
      .filter((modifierId) => modifierIds.has(modifierId)),
  )];
}
