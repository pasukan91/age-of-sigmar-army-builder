import alliances from "../data/alliances";
import factions from "../data/factions";
import regimentsOfRenown from "../data/regimentsOfRenown";
import {
  ghb2026Battleplans,
  ghb2026BattleTactics,
  ghb2026BattleTacticsCards,
} from "../data/ghb2026";
import {
  limitBattleLogEntries,
  truncateBattleLogText,
} from "../utils/battleLogLimits";
import { normalizeBattleUnitStates } from "../utils/battleUnitState";

const STORAGE_KEY = "storm-forge.army-lists.v1";
const RECOVERY_STORAGE_KEY = "storm-forge.army-lists.recovery";
const STORAGE_VERSION = 1;
let recoveryGuardActive = false;

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

function getSelectableFactions() {
  return factions;
}

function restoreOption(savedOption, canonicalOptions) {
  if (!savedOption || typeof savedOption !== "object") {
    return null;
  }

  return findById(canonicalOptions, savedOption.id);
}

function restoreBattleTacticsCards(savedValue) {
  const savedItems = Array.isArray(savedValue)
    ? savedValue
    : savedValue
      ? [savedValue]
      : [];

  const cards = savedItems
    .map((item) => {
      if (Array.isArray(item?.tactics)) {
        return restoreOption(item, ghb2026BattleTacticsCards);
      }

      const tactic = restoreOption(item, ghb2026BattleTactics);
      return ghb2026BattleTacticsCards.find(
        (card) => card.number === tactic?.cardNumber
      ) ?? null;
    })
    .filter(Boolean);

  return cards
    .filter((card, index) => cards.findIndex((item) => item.id === card.id) === index)
    .slice(0, 2);
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
    mortisanRefinement:
      unit.mortisanRefinement ?? null,
    originOfTerrifyingFolkTale:
      unit.originOfTerrifyingFolkTale ?? null,
    visionOfFate:
      unit.visionOfFate ?? null,
    specialKnickKnack:
      unit.specialKnickKnack ?? null,
    plaguefathersPox:
      unit.plaguefathersPox ?? null,
    decorationForValour:
      unit.decorationForValour ?? null,
    ironweldInnovation:
      unit.ironweldInnovation ?? null,
    accursedDevice:
      unit.accursedDevice ?? null,
    brazenMutation:
      unit.brazenMutation ?? null,
    brandOfDarkGod:
      unit.brandOfDarkGod ?? null,
    ensorcelledBanner:
      unit.ensorcelledBanner ?? null,
    boonOfShadow:
      unit.boonOfShadow ?? null,
    aqshyEnhancement:
      unit.aqshyEnhancement ?? null,
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
    mortisanRefinement: restoreOption(
      savedUnit.mortisanRefinement,
      faction?.mortisanRefinements
    ),
    originOfTerrifyingFolkTale: restoreOption(
      savedUnit.originOfTerrifyingFolkTale,
      faction?.originsOfTerrifyingFolkTales
    ),
    visionOfFate: restoreOption(
      savedUnit.visionOfFate,
      faction?.visionsOfFate
    ),
    specialKnickKnack: restoreOption(
      savedUnit.specialKnickKnack,
      faction?.specialKnickKnacks
    ),
    plaguefathersPox: restoreOption(
      savedUnit.plaguefathersPox,
      faction?.plaguefathersPoxes
    ),
    decorationForValour: restoreOption(
      savedUnit.decorationForValour,
      faction?.decorationsForValour
    ),
    ironweldInnovation: restoreOption(
      savedUnit.ironweldInnovation,
      faction?.ironweldInnovations
    ),
    accursedDevice: restoreOption(
      savedUnit.accursedDevice,
      faction?.accursedDevices
    ),
    brazenMutation: restoreOption(
      savedUnit.brazenMutation,
      faction?.brazenMutations
    ),
    brandOfDarkGod: restoreOption(
      savedUnit.brandOfDarkGod,
      faction?.brandsOfTheDarkGods
    ),
    ensorcelledBanner: restoreOption(
      savedUnit.ensorcelledBanner,
      faction?.ensorcelledBanners
    ),
    boonOfShadow: restoreOption(
      savedUnit.boonOfShadow,
      faction?.boonsOfShadow
    ),
    aqshyEnhancement: restoreOption(
      savedUnit.aqshyEnhancement,
      faction?.aqshyEnhancements
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
    furyPoints: Math.min(7, Math.max(0, Number(list.furyPoints) || 0)),
    battleFormation: list.battleFormation ?? null,
    battleplan: list.battleplan ?? null,
    spellLore: list.spellLore ?? null,
    prayerLore: list.prayerLore ?? null,
    manifestationLore: list.manifestationLore ?? null,
    battleTactics: (Array.isArray(list.battleTactics)
      ? list.battleTactics
      : list.battleTactics
        ? [list.battleTactics]
        : []).slice(0, 2),
    completedBattleMissions: (Array.isArray(list.completedBattleMissions)
      ? list.completedBattleMissions
      : []).filter((missionId) => typeof missionId === "string"),
    battleRound: Math.min(5, Math.max(1, Number(list.battleRound) || 1)),
    battleTurnActor: list.battleTurnActor === "opponent" ? "opponent" : "self",
    battleLog: serializeBattleLog(list.battleLog),
    battleUnitStates: normalizeBattleUnitStates(list.battleUnitStates),
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
    preset: list.preset ?? null,
  };
}

function restoreList(savedList) {
  const savedFactionId = savedList?.factionId === "orruks"
    ? "kruleboyz"
    : savedList?.factionId;
  const faction = getSelectableFactions().find(
    (item) => item.id === savedFactionId
  );

  if (!savedList?.id || !faction) {
    return null;
  }

  const armyOfRenown = restoreOption(
    savedList.armyOfRenown,
    faction.armiesOfRenown
  );
  const effectiveFaction = armyOfRenown?.rules
    ? { ...faction, ...armyOfRenown.rules }
    : faction;

  const alliance = alliances.find(
    (item) => item.id === savedList.allianceId
  ) ?? {
    id: savedList.allianceId ?? faction.alliance,
    name: savedList.allianceId ?? faction.alliance,
  };

  const restoredRegiments = (savedList.regiments ?? [])
    .map((regiment) => {
      const hero = restoreUnit(regiment.hero, effectiveFaction);

      if (!hero) {
        return null;
      }

      return {
        id: regiment.id,
        hero,
        units: (regiment.units ?? [])
          .map((unit) => restoreUnit(unit, effectiveFaction))
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
    armyOfRenown,
    pointsLimit: Number(savedList.pointsLimit) || 2000,
    commandPoints: Number.isFinite(Number(savedList.commandPoints))
      ? Math.max(0, Number(savedList.commandPoints))
      : 4,
    furyPoints: Number.isFinite(Number(savedList.furyPoints))
      ? Math.min(7, Math.max(0, Number(savedList.furyPoints)))
      : 0,
    battleFormation: restoreOption(
      savedList.battleFormation,
      effectiveFaction.battleFormations
    ),
    battleplan: restoreOption(
      savedList.battleplan,
      ghb2026Battleplans
    ),
    spellLore: restoreOption(
      savedList.spellLore,
      effectiveFaction.spellLores
    ),
    prayerLore: restoreOption(
      savedList.prayerLore,
      effectiveFaction.prayerLores
    ),
    manifestationLore: restoreOption(
      savedList.manifestationLore,
      effectiveFaction.manifestationLores
    ),
    battleTactics: restoreBattleTacticsCards(savedList.battleTactics),
    completedBattleMissions: (Array.isArray(savedList.completedBattleMissions)
      ? savedList.completedBattleMissions
      : []).filter((missionId) => typeof missionId === "string"),
    battleRound: Math.min(5, Math.max(1, Number(savedList.battleRound) || 1)),
    battleTurnActor: savedList.battleTurnActor === "opponent" ? "opponent" : "self",
    battleLog: restoreBattleLog(savedList.battleLog),
    battleUnitStates: normalizeBattleUnitStates(savedList.battleUnitStates),
    terrain: restoreOption(
      savedList.terrain,
      effectiveFaction.terrain
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
      .map((unit) => restoreUnit(unit, effectiveFaction))
      .filter(Boolean),
    createdAt: savedList.createdAt ?? Date.now(),
    updatedAt: savedList.updatedAt ?? savedList.createdAt ?? Date.now(),
    preset: savedList.preset ?? null,
  };
}

function serializeBattleLog(value) {
  return limitBattleLogEntries(value)
    .map(normalizeBattleLogEntry)
    .filter(Boolean);
}

function restoreBattleLog(value) {
  return serializeBattleLog(value);
}

function normalizeBattleLogEntry(entry) {
  if (!entry || typeof entry !== "object" || !entry.id || !entry.label) {
    return null;
  }

  return {
    id: String(entry.id),
    actionId: entry.actionId ? truncateBattleLogText(entry.actionId) : "",
    actor: entry.actor === "opponent" ? "opponent" : "self",
    label: truncateBattleLogText(entry.label),
    result: truncateBattleLogText(entry.result),
    note: truncateBattleLogText(entry.note),
    values: normalizeBattleLogValues(entry.values),
    round: Math.min(5, Math.max(1, Number(entry.round) || 1)),
    createdAt: Number(entry.createdAt) || Date.now(),
  };
}

function normalizeBattleLogValues(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value)
      .filter(([, item]) => typeof item === "string" || typeof item === "number")
  );
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

function hasInvalidListShape(savedList) {
  if (!savedList || typeof savedList !== "object" || Array.isArray(savedList)) {
    return true;
  }

  const arrayFields = [
    "regiments",
    "regimentsOfRenown",
    "auxiliaries",
    "battleLog",
    "completedBattleMissions",
  ];

  if (arrayFields.some(
    (field) => savedList[field] != null && !Array.isArray(savedList[field])
  )) {
    return true;
  }

  return (savedList.regiments ?? []).some(
    (regiment) => !regiment ||
      typeof regiment !== "object" ||
      Array.isArray(regiment) ||
      (regiment.units != null && !Array.isArray(regiment.units))
  );
}

function countRestoredUnits(list) {
  return (list?.regiments ?? []).reduce(
    (total, regiment) => total + 1 + (regiment.units ?? []).length,
    (list?.auxiliaries ?? []).length
  );
}

function countSavedUnits(list) {
  return (list?.regiments ?? []).reduce(
    (total, regiment) => total + (regiment?.hero ? 1 : 0) + (regiment?.units ?? []).length,
    (list?.auxiliaries ?? []).length
  );
}

function preserveRecoveryPayload(rawValue) {
  try {
    window.localStorage.setItem(RECOVERY_STORAGE_KEY, rawValue);
    return true;
  } catch (error) {
    console.error("No se pudo crear la copia de recuperación de las listas.", error);
    return false;
  }
}

function failedLoadResult(rawValue, error, status = "error") {
  const backupCreated = rawValue ? preserveRecoveryPayload(rawValue) : false;
  recoveryGuardActive = Boolean(rawValue) && !backupCreated;

  if (error) {
    console.error("No se pudieron cargar todas las listas guardadas.", error);
  }

  return {
    lists: [],
    status,
    recoveredCount: 0,
    rejectedCount: 0,
    backupCreated,
  };
}

export function loadArmyListsResult() {
  if (typeof window === "undefined") {
    return {
      lists: [],
      status: "empty",
      recoveredCount: 0,
      rejectedCount: 0,
      backupCreated: false,
    };
  }

  recoveryGuardActive = false;
  let rawValue = "";

  try {
    rawValue = window.localStorage.getItem(STORAGE_KEY);

    if (!rawValue) {
      return {
        lists: [],
        status: "empty",
        recoveredCount: 0,
        rejectedCount: 0,
        backupCreated: false,
      };
    }

    const payload = JSON.parse(rawValue);

    if (payload?.version !== STORAGE_VERSION || !Array.isArray(payload.lists)) {
      return failedLoadResult(
        rawValue,
        new Error(`Formato de almacenamiento no compatible: ${String(payload?.version)}`),
        "unsupported"
      );
    }

    const lists = [];
    let rejectedCount = 0;
    let repairedCount = 0;

    payload.lists.forEach((savedList) => {
      try {
        if (hasInvalidListShape(savedList)) {
          throw new TypeError("La lista guardada no tiene una estructura válida.");
        }

        const restored = restoreList(savedList);
        if (!restored) {
          throw new Error("La facción o el identificador de la lista ya no existe.");
        }

        if (
          countRestoredUnits(restored) !== countSavedUnits(savedList) ||
          restored.regimentsOfRenown.length !== (savedList.regimentsOfRenown ?? []).length
        ) {
          repairedCount += 1;
        }

        lists.push(restored);
      } catch (error) {
        rejectedCount += 1;
        console.error("Se ha aislado una lista guardada que no se pudo recuperar.", error);
      }
    });

    lists.sort(
      (left, right) => Number(right.updatedAt) - Number(left.updatedAt)
    );

    const recovered = rejectedCount > 0 || repairedCount > 0;
    const backupCreated = recovered ? preserveRecoveryPayload(rawValue) : false;
    recoveryGuardActive = recovered && !backupCreated;

    return {
      lists,
      status: recovered ? "recovered" : "loaded",
      recoveredCount: lists.length,
      rejectedCount,
      backupCreated,
    };
  } catch (error) {
    return failedLoadResult(rawValue, error);
  }
}

export function loadArmyLists() {
  return loadArmyListsResult().lists;
}

export function saveArmyLists(lists) {
  if (typeof window === "undefined") {
    return false;
  }

  if (recoveryGuardActive) {
    console.error(
      "Guardado bloqueado: no se pudo proteger la copia original de las listas."
    );
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

export { RECOVERY_STORAGE_KEY, STORAGE_KEY };
