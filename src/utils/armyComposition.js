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
