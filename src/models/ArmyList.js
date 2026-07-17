export function createArmyList({
  name,
  faction,
  alliance,
  pointsLimit,
}) {
  const now = Date.now();

  return {
    id: crypto.randomUUID(),

    name,

    alliance,

    faction,

    pointsLimit,

    battleFormation: null,

    spellLore: null,

    prayerLore: null,

    manifestationLore: null,

    battleTactics: null,

    terrain: null,

    regiments: [],

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