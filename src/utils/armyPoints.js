function getNumericPoints(item) {
  const points = Number(item?.points);

  return Number.isFinite(points) ? points : 0;
}

function getEnhancementPoints(unit) {
  if (!unit) {
    return 0;
  }

  return (
    getNumericPoints(unit.heroicTrait) +
    getNumericPoints(unit.monstrousTrait) +
    getNumericPoints(unit.artefact)
  );
}

function getUnitPoints(unit) {
  if (!unit) {
    return 0;
  }

  const basePoints = getNumericPoints(unit);
  const multiplier = unit.reinforced ? 2 : 1;

  return (
    basePoints * multiplier +
    getEnhancementPoints(unit)
  );
}

function getRegimentPoints(regiment) {
  if (!regiment) {
    return 0;
  }

  const heroPoints =
    getUnitPoints(regiment.hero);

  const unitsPoints = Array.isArray(regiment.units)
    ? regiment.units.reduce(
        (total, unit) => total + getUnitPoints(unit),
        0
      )
    : 0;

  return heroPoints + unitsPoints;
}

export function calculateArmyPoints(list) {
  if (!list) {
    return 0;
  }

  const regimentsPoints = Array.isArray(list.regiments)
    ? list.regiments.reduce(
        (total, regiment) =>
          total + getRegimentPoints(regiment),
        0
      )
    : 0;

  const armyOptionsPoints =
    getNumericPoints(list.battleFormation) +
    getNumericPoints(list.spellLore) +
    getNumericPoints(list.prayerLore) +
    getNumericPoints(list.manifestationLore) +
    getNumericPoints(list.terrain);

  const renownPoints = Array.isArray(list.regimentsOfRenown)
    ? list.regimentsOfRenown.reduce(
        (total, regiment) => total + getNumericPoints(regiment),
        0
      )
    : 0;

  return regimentsPoints + armyOptionsPoints + renownPoints;
}

export function hasExceededPointsLimit(list) {
  if (!list) {
    return false;
  }

  const limit = Number(list.pointsLimit);

  if (!Number.isFinite(limit) || limit <= 0) {
    return false;
  }

  return calculateArmyPoints(list) > limit;
}
