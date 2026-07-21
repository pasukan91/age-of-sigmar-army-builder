import alliances from "../data/alliances";
import factions from "../data/factions";
import regimentsOfRenown from "../data/regimentsOfRenown";

const STORAGE_KEY = "storm-forge.army-lists.v1";
const STORAGE_VERSION = 1;

function asArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (value && typeof value === "object") {
    return Object.values(value).flatMap(asArray);
  }

  return [];
}

function findById(collection, id) {
  if (!id) {
    return null;
  }

  return asArray(collection).find(
    (item) => item?.id === id
  ) ?? null;
}

function restoreOption(savedOption, canonicalOptions) {
  if (!savedOption) {
    return null;
  }

  return (
    findById(canonicalOptions, savedOption.id) ??
    savedOption
  );
}

function serializeUnit(unit) {
  if (!unit?.id) {
    return null;
  }

  return {
    id: unit.id,
    instanceId: unit.instanceId ?? null,
    reinforced: Boolean(unit.reinforced),
    configuredModels: unit.configuredModels ?? null,
    artefact: unit.artefact ?? null,
    heroicTrait: unit.heroicTrait ?? null,
    monstrousTrait: unit.monstrousTrait ?? null,
    allConsumingObsession:
      unit.allConsumingObsession ?? null,
    moulderMutation:
      unit.moulderMutation ?? null,
  };
}

function restoreUnit(savedUnit, faction) {
  if (!savedUnit?.id) {
    return null;
  }

  const canonicalUnit = findById(
    faction?.units,
    savedUnit.id
  );

  if (!canonicalUnit) {
    return null;
  }

  const artefacts = [
    ...asArray(faction?.artefacts),
    ...asArray(faction?.aqshyArtefacts),
  ];

  return {
    ...canonicalUnit,
    instanceId: savedUnit.instanceId ?? null,
    reinforced: Boolean(savedUnit.reinforced),
    configuredModels:
      savedUnit.configuredModels ?? null,
    artefact: restoreOption(
      savedUnit.artefact,
      artefacts
    ),
    heroicTrait: restoreOption(
      savedUnit.heroicTrait,
      faction?.heroicTraits
    ),
    monstrousTrait: restoreOption(
      savedUnit.monstrousTrait,
      faction?.monsterTraits
    ),
    allConsumingObsession: restoreOption(
      savedUnit.allConsumingObsession,
      faction?.allConsumingObsessions
    ),
    moulderMutation: restoreOption(
      savedUnit.moulderMutation,
      faction?.moulderMutations
    ),
  };
}

function serializeList(list) {
  return {
    id: list.id,
    name: list.name,
    allianceId: list.alliance?.id ?? list.allianceId ?? null,
    factionId: list.faction?.id ?? list.factionId ?? null,
    armyOfRenown: list.armyOfRenown ?? null,
    pointsLimit: list.pointsLimit,
    commandPoints: Math.max(0, Number(list.commandPoints) || 0),
    battleFormation: list.battleFormation ?? null,
    spellLore: list.spellLore ?? null,
    prayerLore: list.prayerLore ?? null,
    manifestationLore: list.manifestationLore ?? null,
    battleTactics: list.battleTactics ?? null,
    terrain: list.terrain ?? null,
    regiments: (list.regiments ?? []).map((regiment) => ({
      id: regiment.id,
      requiredByArmyOfRenown:
        Boolean(regiment.requiredByArmyOfRenown),
      hero: serializeUnit(regiment.hero),
      units: (regiment.units ?? [])
        .map(serializeUnit)
        .filter(Boolean),
    })),
    regimentsOfRenown: (list.regimentsOfRenown ?? []).map(
      (regiment) => ({
        id: regiment.id,
        instanceId: regiment.instanceId ?? null,
      })
    ),
    auxiliaries: (list.auxiliaries ?? [])
      .map(serializeUnit)
      .filter(Boolean),
    createdAt: list.createdAt,
    updatedAt: list.updatedAt,
  };
}

function restoreList(savedList) {
  const faction = factions.find(
    (item) => item.id === savedList?.factionId
  );

  if (!savedList?.id || !faction) {
    return null;
  }

  const alliance = alliances.find(
    (item) => item.id === savedList.allianceId
  ) ?? {
    id: savedList.allianceId ?? faction.alliance,
    name: savedList.allianceId ?? faction.alliance,
  };

  const restoredRegiments = (savedList.regiments ?? [])
    .map((regiment) => {
      const hero = restoreUnit(regiment.hero, faction);

      if (!hero) {
        return null;
      }

      return {
        id: regiment.id,
        hero,
        units: (regiment.units ?? [])
          .map((unit) => restoreUnit(unit, faction))
          .filter(Boolean),
        requiredByArmyOfRenown:
          Boolean(regiment.requiredByArmyOfRenown),
      };
    })
    .filter(Boolean);

  const regiments = enforceSingleArmyTraits(restoredRegiments);

  return {
    id: savedList.id,
    name: savedList.name || "Lista sin nombre",
    alliance,
    faction,
    armyOfRenown: restoreOption(
      savedList.armyOfRenown,
      faction.armiesOfRenown
    ),
    pointsLimit: Number(savedList.pointsLimit) || 2000,
    commandPoints: Number.isFinite(Number(savedList.commandPoints))
      ? Math.max(0, Number(savedList.commandPoints))
      : 4,
    battleFormation: restoreOption(
      savedList.battleFormation,
      faction.battleFormations
    ),
    spellLore: restoreOption(
      savedList.spellLore,
      faction.spellLores
    ),
    prayerLore: restoreOption(
      savedList.prayerLore,
      faction.prayerLores
    ),
    manifestationLore: restoreOption(
      savedList.manifestationLore,
      faction.manifestationLores
    ),
    battleTactics: savedList.battleTactics ?? null,
    terrain: restoreOption(
      savedList.terrain,
      faction.terrain
    ),
    regiments,
    regimentsOfRenown: (savedList.regimentsOfRenown ?? [])
      .map((savedRegiment) => {
        const regiment = findById(
          regimentsOfRenown,
          savedRegiment.id
        );

        return regiment
          ? {
              ...regiment,
              instanceId: savedRegiment.instanceId,
            }
          : null;
      })
      .filter(Boolean),
    auxiliaries: (savedList.auxiliaries ?? [])
      .map((unit) => restoreUnit(unit, faction))
      .filter(Boolean),
    createdAt: savedList.createdAt ?? Date.now(),
    updatedAt: savedList.updatedAt ?? savedList.createdAt ?? Date.now(),
  };
}

function enforceSingleArmyTraits(regiments) {
  const claimedTraits = {
    heroicTrait: false,
    monstrousTrait: false,
  };

  function normalizeUnitTraits(unit) {
    if (!unit) {
      return unit;
    }

    let normalizedUnit = unit;

    Object.keys(claimedTraits).forEach((property) => {
      if (!unit[property]) {
        return;
      }

      if (claimedTraits[property]) {
        normalizedUnit = {
          ...normalizedUnit,
          [property]: null,
        };
        return;
      }

      claimedTraits[property] = true;
    });

    return normalizedUnit;
  }

  return regiments.map((regiment) => ({
    ...regiment,
    hero: normalizeUnitTraits(regiment.hero),
    units: (regiment.units ?? []).map(normalizeUnitTraits),
  }));
}

export function loadArmyLists() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);

    if (!rawValue) {
      return [];
    }

    const payload = JSON.parse(rawValue);

    if (
      payload?.version !== STORAGE_VERSION ||
      !Array.isArray(payload.lists)
    ) {
      return [];
    }

    return payload.lists
      .map(restoreList)
      .filter(Boolean)
      .sort(
        (left, right) =>
          Number(right.updatedAt) - Number(left.updatedAt)
      );
  } catch (error) {
    console.error("No se pudieron cargar las listas guardadas.", error);
    return [];
  }
}

export function saveArmyLists(lists) {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const payload = {
      version: STORAGE_VERSION,
      savedAt: Date.now(),
      lists: (lists ?? []).map(serializeList),
    };

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(payload)
    );

    return true;
  } catch (error) {
    console.error("No se pudieron guardar las listas.", error);
    return false;
  }
}

export { STORAGE_KEY };
