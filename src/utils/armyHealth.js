const unitIndexes = new WeakMap();

export function getUnitHealth(unit) {
  if (!unit) return 0;

  const healthPerModel = Number(unit.profile?.health ?? unit.health);
  const models = Number(unit.details?.models ?? unit.models) || 1;
  const reinforcementMultiplier = unit.reinforced ? 2 : 1;

  if (!Number.isFinite(healthPerModel) || healthPerModel < 0) return 0;

  return healthPerModel * models * reinforcementMultiplier;
}

export function calculateArmyHealth(list, factionCatalogue = []) {
  if (!list) return 0;

  const regimentHealth = (list.regiments ?? []).reduce((armyTotal, regiment) => {
    const units = [regiment?.hero, ...(regiment?.units ?? [])];
    return armyTotal + units.reduce((total, unit) => total + getUnitHealth(unit), 0);
  }, 0);

  const unitsById = getUnitIndex(factionCatalogue);
  const renownHealth = (list.regimentsOfRenown ?? []).reduce(
    (armyTotal, regiment) => armyTotal + getRenownUnits(regiment, unitsById)
      .reduce((total, unit) => total + getUnitHealth(unit), 0),
    0
  );

  return regimentHealth + renownHealth;
}

function createUnitIndex(factionCatalogue) {
  return new Map(
    (factionCatalogue ?? []).flatMap((faction) => faction?.units ?? [])
      .filter((unit) => unit?.id)
      .map((unit) => [unit.id, unit])
  );
}

function getUnitIndex(factionCatalogue) {
  if (!Array.isArray(factionCatalogue)) return new Map();

  if (!unitIndexes.has(factionCatalogue)) {
    unitIndexes.set(factionCatalogue, createUnitIndex(factionCatalogue));
  }

  return unitIndexes.get(factionCatalogue);
}

function getRenownUnits(regiment, unitsById) {
  if (Array.isArray(regiment?.resolvedUnits)) return regiment.resolvedUnits;

  if (Array.isArray(regiment?.units) && regiment.units.every((unit) => typeof unit === "object")) {
    return regiment.units;
  }

  return (regiment?.unitIds ?? [])
    .map((unitId) => unitsById.get(unitId))
    .filter(Boolean);
}
