export const MAX_REGIMENTS_PER_ARMY = 5;
export const MAX_REGIMENTS_OF_RENOWN = 1;
export const GENERAL_REGIMENT_UNIT_LIMIT = 4;
export const OTHER_REGIMENT_UNIT_LIMIT = 3;

export function getRegimentUnitLimit(regimentIndex) {
  return regimentIndex === 0
    ? GENERAL_REGIMENT_UNIT_LIMIT
    : OTHER_REGIMENT_UNIT_LIMIT;
}

export function canAddRegiment(list) {
  return (list?.regiments ?? []).length < MAX_REGIMENTS_PER_ARMY;
}

export function canAddRegimentOfRenown(list) {
  return (list?.regimentsOfRenown ?? []).length < MAX_REGIMENTS_OF_RENOWN;
}
