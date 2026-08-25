import createId from "../utils/createId";
import { canAddRegiment } from "../utils/armyComposition";

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
      id: createId("regiment"),
      hero: {
        ...hero,
        instanceId: createId("hero"),
      },
      units: [],
      requiredByArmyOfRenown: true,
    }));

  return {
    id: createId("list"),

    name,

    alliance,

    faction,

    pointsLimit,

    commandPoints: 4,

    furyPoints: 0,

    armyOfRenown,

    battleFormation: null,

    battleplan: null,

    spellLore: null,

    prayerLore: null,

    manifestationLore: null,

    battleTactics: [],

    battleRound: 1,

    battleTurnActor: "self",

    battleLog: [],

    battleUnitStates: {},

    terrain: null,

    regiments: requiredRegiments,

    regimentsOfRenown: [],

    auxiliaries: [],

    createdAt: now,

    updatedAt: now,
  };
}

export function addRegiment(list, hero) {

    if (!canAddRegiment(list)) {
        return list;
    }

    return {

        ...list,

        regiments: [

            ...list.regiments,

            {
                id: createId("regiment"),

                hero,

                units: []
            }

        ],

        updatedAt: Date.now()

    };

}
