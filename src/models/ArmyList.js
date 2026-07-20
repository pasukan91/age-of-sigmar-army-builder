export function createArmyList({
  name,
  faction,
  alliance,
  pointsLimit,
  armyOfRenown = null,
}) {
  const now = Date.now();
  const requiredRegiments = (armyOfRenown?.requiredUnits ?? [])
    .map((unitId) => faction?.units?.find((unit) => unit.id === unitId))
    .filter(Boolean)
    .map((hero) => ({
      id: crypto.randomUUID(),
      hero: {
        ...hero,
        instanceId: crypto.randomUUID(),
      },
      units: [],
      requiredByArmyOfRenown: true,
    }));

  return {
    id: crypto.randomUUID(),

    name,

    alliance,

    faction,

    pointsLimit,

    armyOfRenown,

    battleFormation: null,

    spellLore: null,

    prayerLore: null,

    manifestationLore: null,

    battleTactics: null,

    terrain: null,

    regiments: requiredRegiments,

    regimentsOfRenown: [],

    auxiliaries: [],

    createdAt: now,

    updatedAt: now,
  };
}

export function addRegiment(list, hero) {

    return {

        ...list,

        regiments: [

            ...list.regiments,

            {
                id: crypto.randomUUID(),

                hero,

                units: []
            }

        ],

        updatedAt: Date.now()

    };

}
