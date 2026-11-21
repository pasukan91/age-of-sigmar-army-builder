export const MAX_REGIMENTS_PER_ARMY = 5;
export const MAX_REGIMENTS_OF_RENOWN = 1;
export const GENERAL_REGIMENT_UNIT_LIMIT = 4;
export const OTHER_REGIMENT_UNIT_LIMIT = 3;

export function getGeneralRegimentId(list) {
  if (Object.prototype.hasOwnProperty.call(list ?? {}, "generalRegimentId")) return list.generalRegimentId;
  const declared = list?.regiments?.find((regiment) => regiment.hero?.isGeneral === true);
  if (declared) return declared.id;
  // Lists saved before explicit general selection used the first regiment.
  return list?.regiments?.[0]?.hero?.isGeneral === false ? null : list?.regiments?.[0]?.id ?? null;
}

export function getRegimentUnitLimit(regimentIndex, list) {
  return (list ? getGeneralRegimentId(list) === list.regiments?.[regimentIndex]?.id : regimentIndex === 0)
    ? GENERAL_REGIMENT_UNIT_LIMIT
    : OTHER_REGIMENT_UNIT_LIMIT;
}

export function canAddRegiment(list) {
  return (list?.regiments ?? []).length < MAX_REGIMENTS_PER_ARMY;
}

export function canAddRegimentOfRenown(list) {
  return (list?.regimentsOfRenown ?? []).length < MAX_REGIMENTS_OF_RENOWN;
}

export function getRegimentOfRenownAddError(list, regiment) {
  if (!list || !regiment) return "Selecciona un ejército y un regimiento.";
  if (list.armyOfRenown?.excludesRegimentsOfRenown) return "Este Army of Renown no permite regimientos de renombre.";
  const factionId = list.faction?.id;
  const eligible = Array.isArray(regiment.eligibleFactionIds)
    ? regiment.eligibleFactionIds.includes(factionId)
    : regiment.sourceFaction === factionId;
  if (!eligible) return "Este regimiento no está disponible para tu facción.";
  if ((list.regimentsOfRenown ?? []).some((item) => item.id === regiment.id)) return "Este regimiento ya está incluido.";
  if (!canAddRegimentOfRenown(list)) return "Solo puedes incluir un regimiento de renombre.";
  return null;
}
