import { useEffect, useRef, useState } from "react";

import Home from "./pages/Home";
import MyLists from "./pages/MyLists";
import SelectAlliance from "./pages/SelectAlliance";
import SelectFaction from "./pages/SelectFaction";
import NewListConfig from "./pages/NewListConfig";
import ArmyBuilder from "./pages/ArmyBuilder";
import OptionSelector from "./pages/OptionSelector";
import UnitWarscroll from "./pages/unitWarscroll";
import UnitConfig from "./pages/unitConfig";
import RuleWarscroll from "./pages/RuleWarscroll";
import Settings from "./pages/Settings";
import PredefinedLists from "./pages/PredefinedLists";
import ReferenceOverlay from "./components/ReferenceOverlay";

import {
  calculateArmyPoints,
  hasExceededPointsLimit,
} from "./utils/armyPoints";
import {
  canUnitJoinRegiment,
  countsTowardRegimentLimit,
  isUnitUniqueInArmy,
} from "./utils/regimentRules";
import {
  loadArmyListsResult,
  saveArmyLists,
} from "./storage/armyListStorage";
import { isUniqueUnit } from "./utils/unitIdentity";
import createId from "./utils/createId";
import {
  limitBattleLogEntries,
  truncateBattleLogText,
} from "./utils/battleLogLimits";
import { clearBattleUnitModifiers } from "./utils/battleUnitState";

const EMPTY_SELECTOR = {
  title: "",
  options: [],
  property: "",
  regimentId: null,
  ui: {},
};

const INITIAL_ARMY = {
  alliance: null,
  faction: null,
  armyOfRenown: null,
  points: 2000,
  name: "",
};

const PAGE_TITLES = {
  home: "Inicio",
  lists: "Mis listas",
  predefined: "Listas predefinidas",
  settings: "Ayuda y datos",
  alliance: "Elige alianza",
  faction: "Elige facción",
  config: "Nueva lista",
  builder: "Constructor",
  selector: "Seleccionar opción",
  warscroll: "Ficha de unidad",
  unitConfig: "Configurar unidad",
  ruleWarscroll: "Referencia de reglas",
};

function appendBattleLogEntry(list, event) {
  return limitBattleLogEntries([
    ...(list?.battleLog ?? []),
    {
      id: createId("battle-event"),
      actionId: truncateBattleLogText(event?.actionId ?? "note"),
      actor: event?.actor === "opponent" ? "opponent" : "self",
      label: truncateBattleLogText(event?.label ?? "Evento"),
      result: truncateBattleLogText(event?.result).trim(),
      note: truncateBattleLogText(event?.note).trim(),
      values: event?.values && typeof event.values === "object"
        ? { ...event.values }
        : {},
      round: Math.min(
        5,
        Math.max(1, Number(event?.round ?? list?.battleRound) || 1)
      ),
      createdAt: Date.now(),
    },
  ]);
}

function App() {
  const [initialRoute] = useState(() =>
    getInitialRoute(window.location.pathname)
  );
  const [initialEntryKey] = useState(() => createId("nav"));

  const [initialStorageLoad] = useState(() => loadArmyListsResult());
  const [lists, setLists] = useState(() => initialStorageLoad.lists);
  const skipInitialSave = useRef(
    !["empty", "loaded"].includes(initialStorageLoad.status)
  );

  const [navigation, setNavigation] =
    useState(() => ({
      page: initialRoute.page,
      history: [],
      entryKey: initialEntryKey,
    }));

  const { page, history, entryKey } = navigation;
  const scrollPositions = useRef(new Map());

  const [storageStatus, setStorageStatus] = useState(() => {
    if (initialStorageLoad.status === "recovered") return "recovered";
    if (["error", "unsupported"].includes(initialStorageLoad.status)) return "error";
    return "saved";
  });

  useEffect(() => {
    if (skipInitialSave.current) {
      skipInitialSave.current = false;
      return undefined;
    }

    const saveTimer = window.setTimeout(() => {
      const saved = saveArmyLists(lists);

      setStorageStatus(saved ? "saved" : "error");
    }, 0);

    return () => window.clearTimeout(saveTimer);
  }, [lists]);

  const [currentList, setCurrentList] =
    useState(() =>
      initialRoute.listId
        ? lists.find((list) => list.id === initialRoute.listId) ?? null
        : null
    );

  const [builderSection, setBuilderSection] =
    useState("units");

  const [deletedList, setDeletedList] =
    useState(null);

  useEffect(() => {
    window.history.replaceState(
      {
        page: initialRoute.page,
        depth: 0,
        listId: initialRoute.listId ?? null,
        entryKey: initialEntryKey,
      },
      "",
      getPagePath(initialRoute.page, initialRoute.listId)
    );
  }, [initialEntryKey, initialRoute]);

  useEffect(() => {
    const handlePopState = (event) => {
      const nextPage = event.state?.page ?? getInitialRoute(window.location.pathname).page;
      const nextDepth = Math.max(0, Number(event.state?.depth) || 0);
      const listId = event.state?.listId ?? getListIdFromPath(window.location.pathname);
      const nextEntryKey = event.state?.entryKey ?? `${nextPage}-${nextDepth}-${listId ?? "root"}`;

      if (listId) {
        const routedList = lists.find((list) => list.id === listId);
        if (routedList) setCurrentList(routedList);
      }

      setNavigation((previous) => ({
        page: nextPage,
        history: previous.history.slice(0, nextDepth),
        entryKey: nextEntryKey,
      }));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [lists]);

  useEffect(() => {
    document.title = `${PAGE_TITLES[page] ?? "Storm Forge"} · Storm Forge`;

    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({
        top: scrollPositions.current.get(entryKey) ?? 0,
        left: 0,
        behavior: "auto",
      });

      const pageHeading = document.querySelector("main h1");
      if (pageHeading instanceof HTMLElement) {
        pageHeading.tabIndex = -1;
        pageHeading.focus({ preventScroll: true });
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [entryKey, page]);

  const [selectedUnit, setSelectedUnit] =
    useState(null);

  const [builderReference, setBuilderReference] =
    useState(null);

  useEffect(() => {
    if (!builderReference) return undefined;

    const closeOverlayOnBack = () => setBuilderReference(null);
    window.addEventListener("popstate", closeOverlayOnBack);
    return () => window.removeEventListener("popstate", closeOverlayOnBack);
  }, [builderReference]);

  /*
   * Información sobre una unidad que ya
   * pertenece a un regimiento.
   *
   * {
   *   regimentId,
   *   unitInstanceId,
   *   isLeader
   * }
   */
  const [unitEditor, setUnitEditor] =
    useState(null);

  const [army, setArmy] =
    useState(INITIAL_ARMY);

  const [selector, setSelector] =
    useState(EMPTY_SELECTOR);

  /*
   * =====================================================
   * NAVEGACIÓN
   * =====================================================
   */

  function navigate(nextPage, options = {}) {
    if (!nextPage) {
      return;
    }

    const replace = options.replace === true;
    const listId = Object.prototype.hasOwnProperty.call(options, "listId")
      ? options.listId
      : currentList?.id ?? null;

    if (options.resetToLists === true) {
      const listsEntryKey = createId("nav");
      const nextEntryKey = createId("nav");
      window.history.replaceState(
        { page: "lists", depth: 0, listId: null, entryKey: listsEntryKey },
        "",
        "/listas"
      );
      window.history.pushState(
        { page: nextPage, depth: 1, listId, entryKey: nextEntryKey },
        "",
        getPagePath(nextPage, listId)
      );
      setNavigation({ page: nextPage, history: ["lists"], entryKey: nextEntryKey });
      return;
    }

    if (nextPage === page && !replace) {
      return;
    }

    scrollPositions.current.set(entryKey, window.scrollY);

    const nextHistory = replace
      ? history
      : [...history, page];
    const browserState = {
      page: nextPage,
      depth: nextHistory.length,
      listId,
      entryKey: createId("nav"),
    };
    const path = getPagePath(nextPage, listId);

    if (replace) {
      window.history.replaceState(browserState, "", path);
    } else {
      window.history.pushState(browserState, "", path);
    }

    setNavigation({
      page: nextPage,
      history: nextHistory,
      entryKey: browserState.entryKey,
    });
  }

  function goBack() {
    scrollPositions.current.set(entryKey, window.scrollY);

    if (history.length === 0) {
      navigate("home", { replace: true });
      return;
    }

    window.history.back();
  }

  /*
   * Regresa al builder después de guardar
   * una acción y elimina del historial las
   * pantallas intermedias de selector,
   * warscroll y configuración.
   */
  function returnToBuilder() {
    setSelectedUnit(null);
    setUnitEditor(null);
    resetSelector();

    const builderIndex = history.lastIndexOf("builder");

    if (builderIndex === -1) {
      navigate("builder", { replace: true });
      return;
    }

    const stepsBack = history.length - builderIndex;
    window.history.go(-stepsBack);
  }

  function handleSelectorBack() {
    resetSelector();
    goBack();
  }

  function handleWarscrollBack() {
    const previousPage =
      history[
        history.length - 1
      ];

    /*
     * Al volver al selector o al builder
     * ya no necesitamos la selección
     * temporal del warscroll.
     */
    if (
      previousPage === "selector" ||
      previousPage === "builder"
    ) {
      setSelectedUnit(null);
    }

    if (
      previousPage === "builder"
    ) {
      setUnitEditor(null);
    }

    goBack();
  }

  function handleConfigurationBack() {
    const previousPage =
      history[
        history.length - 1
      ];

    /*
     * Si volvemos al builder desde una
     * edición directa, limpiamos el editor.
     *
     * Si volvemos al warscroll, conservamos
     * selectedUnit y unitEditor.
     */
    if (
      previousPage === "builder"
    ) {
      setSelectedUnit(null);
      setUnitEditor(null);
    }

    goBack();
  }

  /*
   * =====================================================
   * UTILIDADES
   * =====================================================
   */

  function createInstanceId(prefix) {
    if (
      typeof crypto !== "undefined" &&
      typeof crypto.randomUUID ===
        "function"
    ) {
      return (
        `${prefix}-` +
        crypto.randomUUID()
      );
    }

    return (
      `${prefix}-${Date.now()}-` +
      Math.random()
        .toString(36)
        .slice(2, 9)
    );
  }

  function resetSelector() {
    setSelector(EMPTY_SELECTOR);
  }

  function resetNewArmy() {
    setArmy(INITIAL_ARMY);
    setCurrentList(null);
    setSelectedUnit(null);
    setUnitEditor(null);
    resetSelector();
  }

  function saveUpdatedList(
    updatedList
  ) {
    if (!updatedList) {
      return;
    }

    const listWithUpdateDate = {
      ...updatedList,
      updatedAt: Date.now(),
    };

    const totalPoints =
      calculateArmyPoints(
        listWithUpdateDate
      );

    setCurrentList(
      listWithUpdateDate
    );

    setLists((previousLists) => {
      const listExists =
        previousLists.some(
          (list) =>
            list.id ===
            listWithUpdateDate.id
        );

      if (!listExists) {
        return [
          ...previousLists,
          listWithUpdateDate,
        ];
      }

      return previousLists.map(
        (list) =>
          list.id ===
          listWithUpdateDate.id
            ? listWithUpdateDate
            : list
      );
    });

    if (
      hasExceededPointsLimit(
        listWithUpdateDate
      )
    ) {
      const pointsLimit =
        Number(
          listWithUpdateDate
            .pointsLimit ??
            listWithUpdateDate.points
        ) || 0;

      window.alert(
        "Has superado el límite de puntos.\n\n" +
          `Puntos actuales: ${totalPoints}\n` +
          `Límite: ${pointsLimit}`
      );
    }
  }

  function handleDeleteList(listId) {
    if (!listId) {
      return;
    }

    const removedList = lists.find((list) => list.id === listId);
    if (removedList) setDeletedList(removedList);

    setLists((previousLists) =>
      previousLists.filter((list) => list.id !== listId)
    );

    if (currentList?.id === listId) {
      setCurrentList(null);
    }
  }

  function restoreDeletedList() {
    if (!deletedList) return;

    setLists((previousLists) => [deletedList, ...previousLists]);
    setDeletedList(null);
  }

  /*
   * =====================================================
   * CREACIÓN DE LISTA
   * =====================================================
   */

  function handleSelectAlliance(
    selectedAlliance
  ) {
    if (!selectedAlliance) {
      return;
    }

    setArmy((previousArmy) => ({
      ...previousArmy,
      alliance:
        selectedAlliance,
      faction: null,
      armyOfRenown: null,
    }));

    navigate("faction");
  }

  function handleSelectFaction(
    selectedFaction,
    armyOfRenown = null
  ) {
    if (!selectedFaction) {
      return;
    }

    setArmy((previousArmy) => ({
      ...previousArmy,
      faction:
        selectedFaction,
      armyOfRenown,
    }));

    navigate("config");
  }

  /*
   * =====================================================
   * OPCIONES GENERALES DEL EJÉRCITO
   * =====================================================
   */

  function saveArmyOption(option) {
    if (
      !currentList ||
      !selector?.property
    ) {
      return;
    }

    const updatedList = {
      ...currentList,
      [selector.property]: option,
    };

    saveUpdatedList(updatedList);
    returnToBuilder();
  }

  function toggleArmyOption(option) {
    if (!currentList || !selector?.property || !option) {
      return;
    }

    const maxSelections = Math.max(1, Number(selector.ui?.maxSelections) || 1);
    const currentValue = currentList[selector.property];
    const selected = Array.isArray(currentValue)
      ? currentValue
      : currentValue
        ? [currentValue]
        : [];
    const alreadySelected = selected.some((item) => item.id === option.id);
    const nextSelection = alreadySelected
      ? selected.filter((item) => item.id !== option.id)
      : selected.length < maxSelections
        ? [...selected, option]
        : selected;

    saveUpdatedList({
      ...currentList,
      [selector.property]: nextSelection,
    });
  }

  function handleCommandPointsChange(nextValue) {
    if (!currentList) {
      return;
    }

    const commandPoints = Math.min(
      99,
      Math.max(0, Number(nextValue) || 0)
    );

    const previousCommandPoints = Math.max(
      0,
      Number(currentList.commandPoints ?? 4) || 0
    );

    saveUpdatedList({
      ...currentList,
      commandPoints,
      battleLog: commandPoints === previousCommandPoints
        ? currentList.battleLog ?? []
        : appendBattleLogEntry(currentList, {
            actionId: "command-points",
            actor: "self",
            label: "Puntos de mando",
            result: `${previousCommandPoints} → ${commandPoints}`,
            note: commandPoints < previousCommandPoints ? "Gastado" : "Añadido",
            values: commandPoints < previousCommandPoints
              ? { spent: previousCommandPoints - commandPoints }
              : { gained: commandPoints - previousCommandPoints },
          }),
    });
  }

  function handleFuryPointsChange(nextValue) {
    if (!currentList) {
      return;
    }

    const furyPoints = Math.min(
      7,
      Math.max(0, Number(nextValue) || 0)
    );

    const previousFuryPoints = Math.min(
      7,
      Math.max(0, Number(currentList.furyPoints ?? 0) || 0)
    );

    saveUpdatedList({
      ...currentList,
      furyPoints,
      battleLog: furyPoints === previousFuryPoints
        ? currentList.battleLog ?? []
        : appendBattleLogEntry(currentList, {
            actionId: "fury",
            actor: "self",
            label: "Furia",
            result: `${previousFuryPoints} → ${furyPoints}`,
            values: furyPoints < previousFuryPoints
              ? { spent: previousFuryPoints - furyPoints }
              : { gained: furyPoints - previousFuryPoints },
          }),
    });
  }

  function handleBattleMissionToggle(missionId, completed) {
    if (!currentList || !missionId) {
      return;
    }

    const completedMissions = new Set(currentList.completedBattleMissions ?? []);
    if (completed) completedMissions.add(missionId);
    else completedMissions.delete(missionId);

    const tacticId = missionId.split(":").at(-1);
    const tacticCards = Array.isArray(currentList.battleTactics)
      ? currentList.battleTactics
      : currentList.battleTactics
        ? [currentList.battleTactics]
        : [];
    const tactic = tacticCards
      .flatMap((card) => card.tactics ?? [])
      .find((item) => item.id === tacticId);

    saveUpdatedList({
      ...currentList,
      completedBattleMissions: [...completedMissions],
      battleLog: appendBattleLogEntry(currentList, {
        actionId: "battle-tactic",
        actor: "self",
        label: "Táctica de batalla",
        result: completed ? "Completada" : "Desmarcada",
        note: tactic?.name ?? "",
        values: { status: completed ? "completed" : "failed" },
      }),
    });
  }

  function handleBattleRoundChange(nextRound) {
    if (!currentList) {
      return;
    }

    const battleRound = Math.min(5, Math.max(1, Number(nextRound) || 1));
    if (battleRound === Number(currentList.battleRound ?? 1)) {
      return;
    }

    saveUpdatedList({
      ...currentList,
      battleRound,
      battleUnitStates: clearBattleUnitModifiers(currentList.battleUnitStates),
      battleLog: appendBattleLogEntry(currentList, {
        actionId: "round-change",
        actor: "self",
        label: "Cambio de ronda",
        result: String(battleRound),
        round: battleRound,
      }),
    });
  }

  function handleBattleTurnChange(nextActor) {
    if (!currentList) return;
    const battleTurnActor = nextActor === "opponent" ? "opponent" : "self";
    if (battleTurnActor === (currentList.battleTurnActor ?? "self")) return;

    saveUpdatedList({
      ...currentList,
      battleTurnActor,
      battleLog: appendBattleLogEntry(currentList, {
        actionId: "turn-start",
        actor: battleTurnActor,
        label: "Inicio de turno",
        result: battleTurnActor === "self" ? "Mi turno" : "Turno rival",
      }),
    });
  }

  function handleBattleInitiativeResolve({ winner, selfRoll, opponentRoll }) {
    if (!currentList || Number(currentList.battleRound ?? 1) >= 5) return;
    const winnerActor = winner === "opponent" ? "opponent" : "self";
    const previousActor = currentList.battleTurnActor === "opponent" ? "opponent" : "self";
    const nextRound = Math.min(5, Number(currentList.battleRound ?? 1) + 1);
    const isDoubleTurn = winnerActor === previousActor;
    const ownRoll = Math.min(6, Math.max(1, Number(selfRoll) || 1));
    const rivalRoll = Math.min(6, Math.max(1, Number(opponentRoll) || 1));

    saveUpdatedList({
      ...currentList,
      battleRound: nextRound,
      battleTurnActor: winnerActor,
      battleUnitStates: clearBattleUnitModifiers(currentList.battleUnitStates),
      battleLog: appendBattleLogEntry(currentList, {
        actionId: "priority",
        actor: winnerActor,
        label: "Tirada de iniciativa",
        result: `${ownRoll} - ${rivalRoll}`,
        note: isDoubleTurn ? "Doble turno" : "Turno alterno",
        round: nextRound,
        values: {
          selfRoll: ownRoll,
          opponentRoll: rivalRoll,
          doubleTurn: isDoubleTurn ? "yes" : "no",
        },
      }),
    });
  }

  function handleBattleLogAdd(event) {
    if (!currentList || !event?.label) {
      return;
    }

    saveUpdatedList({
      ...currentList,
      battleLog: appendBattleLogEntry(currentList, event),
    });
  }

  function handleBattleLogRemove(eventId) {
    if (!currentList || !eventId) {
      return;
    }

    saveUpdatedList({
      ...currentList,
      battleLog: (currentList.battleLog ?? []).filter((event) => event.id !== eventId),
    });
  }

  function handleBattleUnitStateChange(instanceKey, nextState) {
    if (!currentList || !instanceKey || !nextState) {
      return;
    }

    saveUpdatedList({
      ...currentList,
      battleUnitStates: {
        ...(currentList.battleUnitStates ?? {}),
        [instanceKey]: nextState,
      },
    });
  }

  /*
   * =====================================================
   * SELECTOR, WARSCROLL Y CONFIGURACIÓN
   * =====================================================
   */

  function openNewUnitWarscroll(
    option
  ) {
    if (!option) {
      return;
    }

    setSelectedUnit(option);
    setUnitEditor(null);

    navigate("warscroll");
  }

  function openBuilderUnitReference(payload) {
    const unit = payload?.unit ?? payload;

    if (!unit) {
      return;
    }

    openBuilderReference({
      type: "unit",
      unit,
      editor: payload?.unit
        ? {
            regimentId: payload.regimentId,
            unitInstanceId: unit.instanceId ?? null,
            isLeader: payload.isLeader ?? false,
          }
        : null,
    });
  }

  function openBuilderRuleReference(reference) {
    if (!reference?.item) {
      return;
    }

    openBuilderReference({ type: "rule", reference });
  }

  function openBuilderReference(reference) {
    if (!window.history.state?.builderOverlay) {
      window.history.pushState(
        { ...(window.history.state ?? {}), builderOverlay: true },
        "",
        window.location.href
      );
    }

    setBuilderReference(reference);
  }

  function closeBuilderReference() {
    if (window.history.state?.builderOverlay) {
      window.history.back();
      return;
    }

    setBuilderReference(null);
  }

  function clearBuilderReferenceHistory() {
    if (window.history.state?.builderOverlay) {
      const nextState = { ...(window.history.state ?? {}) };
      delete nextState.builderOverlay;
      window.history.replaceState(nextState, "", window.location.href);
    }

    setBuilderReference(null);
  }

  function openNewUnitConfiguration(
    option
  ) {
    if (!option) {
      return;
    }

    setSelectedUnit(option);
    setUnitEditor(null);

    navigate("unitConfig");
  }

  function handleConfigureAddedUnit({
    unit,
    regimentId,
    isLeader = false,
  }) {
    if (!unit || !regimentId || isUniqueUnit(unit)) {
      return;
    }

    setSelectedUnit(unit);

    setUnitEditor({
      regimentId,

      unitInstanceId:
        unit.instanceId ?? null,

      isLeader,
    });

    navigate("unitConfig");
  }

  /*
   * Estos nombres son los callbacks que
   * recibe ArmyBuilder.
   */
  function handleConfigureUnit(
    editorData
  ) {
    handleConfigureAddedUnit(
      editorData
    );
  }

  function handleConfigureSelectedUnit() {
    if (!selectedUnit || isUniqueUnit(selectedUnit)) {
      return;
    }

    navigate("unitConfig");
  }

  /*
   * =====================================================
   * LÍMITE DE MEJORAS POR EJÉRCITO
   * =====================================================
   */

  function getArmyUnits() {
    if (!currentList) {
      return [];
    }

    return (
      currentList.regiments ?? []
    ).flatMap((regiment) => [
      {
        unit: regiment.hero,
        regimentId:
          regiment.id,
        isLeader: true,
      },

      ...(regiment.units ?? []).map(
        (unit) => ({
          unit,
          regimentId:
            regiment.id,
          isLeader: false,
        })
      ),
    ]);
  }

  function isCurrentlyEditedUnit({
    unit,
    regimentId,
    isLeader,
  }) {
    if (!unitEditor) {
      return false;
    }

    if (
      regimentId !==
      unitEditor.regimentId
    ) {
      return false;
    }

    if (
      Boolean(isLeader) !==
      Boolean(
        unitEditor.isLeader
      )
    ) {
      return false;
    }

    /*
     * Solo existe un líder por regimiento.
     */
    if (isLeader) {
      return true;
    }

    return (
      unit.instanceId ===
      unitEditor.unitInstanceId
    );
  }

  function findEnhancementOwner(
    property,
    enhancementId = null
  ) {
    return getArmyUnits().find(
      ({
        unit,
        regimentId,
        isLeader,
      }) => {
        if (
          isCurrentlyEditedUnit({
            unit,
            regimentId,
            isLeader,
          })
        ) {
          return false;
        }

        const enhancement = unit?.[property];

        return Boolean(enhancement) &&
          (!enhancementId || enhancement.id === enhancementId);
      }
    );
  }

  function validateArmyEnhancements(
    configuredUnit
  ) {
    const conflicts = [];

    if (configuredUnit.artefact) {
      const owner =
        findEnhancementOwner(
          "artefact"
        );

      if (owner) {
        conflicts.push({
          type:
            "Artefacto de poder",

          selected:
            configuredUnit
              .artefact.name,

          owner:
            owner.unit.name,

          existing:
            owner.unit.artefact
              ?.name,
        });
      }
    }

    if (
      configuredUnit.heroicTrait
    ) {
      const owner =
        findEnhancementOwner(
          "heroicTrait"
        );

      if (owner) {
        conflicts.push({
          type: "Rasgo heroico",

          selected:
            configuredUnit
              .heroicTrait.name,

          owner:
            owner.unit.name,

          existing:
            owner.unit
              .heroicTrait?.name,
        });
      }
    }

    if (
      configuredUnit
        .monstrousTrait
    ) {
      const owner =
        findEnhancementOwner(
          "monstrousTrait"
        );

      if (owner) {
        conflicts.push({
          type:
            "Rasgo monstruoso",

          selected:
            configuredUnit
              .monstrousTrait
              .name,

          owner:
            owner.unit.name,

          existing:
            owner.unit
              .monstrousTrait
              ?.name,
        });
      }
    }

    if (configuredUnit.allConsumingObsession) {
      const owner = findEnhancementOwner(
        "allConsumingObsession",
        configuredUnit.allConsumingObsession.id
      );

      if (owner) {
        conflicts.push({
          type: "Obsesión devoradora",
          selected: configuredUnit.allConsumingObsession.name,
          owner: owner.unit.name,
          existing: owner.unit.allConsumingObsession?.name,
        });
      }
    }

    if (configuredUnit.moulderMutation) {
      const owner = findEnhancementOwner(
        "moulderMutation",
        configuredUnit.moulderMutation.id
      );

      if (owner) {
        conflicts.push({
          type: "Mutación Moulder",
          selected: configuredUnit.moulderMutation.name,
          owner: owner.unit.name,
          existing: owner.unit.moulderMutation?.name,
        });
      }
    }

    if (configuredUnit.mortisanRefinement) {
      const owner = findEnhancementOwner(
        "mortisanRefinement",
        configuredUnit.mortisanRefinement.id
      );

      if (owner) {
        conflicts.push({
          type: "Refinamiento Mortisan",
          selected: configuredUnit.mortisanRefinement.name,
          owner: owner.unit.name,
          existing: owner.unit.mortisanRefinement?.name,
        });
      }
    }

    if (configuredUnit.originOfTerrifyingFolkTale) {
      const owner = findEnhancementOwner(
        "originOfTerrifyingFolkTale",
        configuredUnit.originOfTerrifyingFolkTale.id
      );

      if (owner) {
        conflicts.push({
          type: "Origen de relato terrorífico",
          selected: configuredUnit.originOfTerrifyingFolkTale.name,
          owner: owner.unit.name,
          existing: owner.unit.originOfTerrifyingFolkTale?.name,
        });
      }
    }

    if (configuredUnit.visionOfFate) {
      const owner = findEnhancementOwner(
        "visionOfFate",
        configuredUnit.visionOfFate.id
      );

      if (owner) {
        conflicts.push({
          type: "Visión de destino",
          selected: configuredUnit.visionOfFate.name,
          owner: owner.unit.name,
          existing: owner.unit.visionOfFate?.name,
        });
      }
    }

    if (configuredUnit.specialKnickKnack) {
      const owner = findEnhancementOwner(
        "specialKnickKnack",
        configuredUnit.specialKnickKnack.id
      );

      if (owner) {
        conflicts.push({
          type: "Special Knick-Knack",
          selected: configuredUnit.specialKnickKnack.name,
          owner: owner.unit.name,
          existing: owner.unit.specialKnickKnack?.name,
        });
      }
    }

    if (configuredUnit.flawlessManoeuvre) {
      const owner = findEnhancementOwner(
        "flawlessManoeuvre",
        configuredUnit.flawlessManoeuvre.id
      );

      if (owner) {
        conflicts.push({
          type: "Flawless Manoeuvre",
          selected: configuredUnit.flawlessManoeuvre.name,
          owner: owner.unit.name,
          existing: owner.unit.flawlessManoeuvre?.name,
        });
      }
    }

    if (configuredUnit.decorationForValour) {
      const owner = findEnhancementOwner(
        "decorationForValour",
        configuredUnit.decorationForValour.id
      );

      if (owner) {
        conflicts.push({
          type: "Decoration for Valour",
          selected: configuredUnit.decorationForValour.name,
          owner: owner.unit.name,
          existing: owner.unit.decorationForValour?.name,
        });
      }
    }

    if (configuredUnit.ironweldInnovation) {
      const owner = findEnhancementOwner(
        "ironweldInnovation",
        configuredUnit.ironweldInnovation.id
      );

      if (owner) {
        conflicts.push({
          type: "Ironweld Innovation",
          selected: configuredUnit.ironweldInnovation.name,
          owner: owner.unit.name,
          existing: owner.unit.ironweldInnovation?.name,
        });
      }
    }

    if (configuredUnit.accursedDevice) {
      const owner = findEnhancementOwner(
        "accursedDevice",
        configuredUnit.accursedDevice.id
      );

      if (owner) {
        conflicts.push({
          type: "Dispositivo maldito",
          selected: configuredUnit.accursedDevice.name,
          owner: owner.unit.name,
          existing: owner.unit.accursedDevice?.name,
        });
      }
    }

    if (configuredUnit.brazenMutation) {
      const owner = findEnhancementOwner(
        "brazenMutation",
        configuredUnit.brazenMutation.id
      );

      if (owner) {
        conflicts.push({
          type: "Mutación de bronce",
          selected: configuredUnit.brazenMutation.name,
          owner: owner.unit.name,
          existing: owner.unit.brazenMutation?.name,
        });
      }
    }

    if (configuredUnit.brandOfDarkGod) {
      const owner = findEnhancementOwner(
        "brandOfDarkGod",
        configuredUnit.brandOfDarkGod.id
      );

      if (owner) {
        conflicts.push({
          type: "Brand of the Dark Gods",
          selected: configuredUnit.brandOfDarkGod.name,
          owner: owner.unit.name,
          existing: owner.unit.brandOfDarkGod?.name,
        });
      }
    }

    if (configuredUnit.ensorcelledBanner) {
      const owner = findEnhancementOwner(
        "ensorcelledBanner",
        configuredUnit.ensorcelledBanner.id
      );

      if (owner) {
        conflicts.push({
          type: "Ensorcelled Banner",
          selected: configuredUnit.ensorcelledBanner.name,
          owner: owner.unit.name,
          existing: owner.unit.ensorcelledBanner?.name,
        });
      }
    }

    if (configuredUnit.boonOfShadow) {
      const owner = findEnhancementOwner(
        "boonOfShadow",
        configuredUnit.boonOfShadow.id
      );

      if (owner) {
        conflicts.push({
          type: "Boon of Shadow",
          selected: configuredUnit.boonOfShadow.name,
          owner: owner.unit.name,
          existing: owner.unit.boonOfShadow?.name,
        });
      }
    }

    if (configuredUnit.aqshyEnhancement) {
      const owner = findEnhancementOwner(
        "aqshyEnhancement",
        configuredUnit.aqshyEnhancement.id
      );

      if (owner) {
        conflicts.push({
          type: configuredUnit.aqshyEnhancement.groupName ?? "Mejora de Aqshy",
          selected: configuredUnit.aqshyEnhancement.name,
          owner: owner.unit.name,
          existing: owner.unit.aqshyEnhancement?.name,
        });
      }
    }

    if (
      conflicts.length === 0
    ) {
      return true;
    }

    const conflictText =
      conflicts
        .map(
          ({
            type,
            selected,
            owner,
            existing,
          }) =>
            `${type}: ${selected}\n` +
            `Ya hay uno asignado a ${owner}` +
            `${
              existing
                ? ` (${existing})`
                : ""
            }.`
        )
        .join("\n\n");

    window.alert(
      "No se puede guardar esta configuración.\n\n" +
        "Solo puede haber un artefacto, un rasgo heroico y un rasgo monstruoso por ejército; cada mejora de unidad única solo puede elegirse una vez.\n\n" +
        conflictText
    );

    return false;
  }

  function handleConfirmUnitConfiguration(
    configuredUnit
  ) {
    if (!configuredUnit) {
      return;
    }

    const enhancementsAreValid =
      validateArmyEnhancements(
        configuredUnit
      );

    if (!enhancementsAreValid) {
      return;
    }

    if (unitEditor) {
      handleUpdateConfiguredUnit(
        configuredUnit
      );

      return;
    }

    if (
      selector?.property ===
      "newRegiment"
    ) {
      handleCreateRegiment(
        configuredUnit
      );

      return;
    }

    if (
      selector?.property ===
      "newUnit"
    ) {
      handleAddUnitToRegiment(
        configuredUnit
      );

      return;
    }

    console.error(
      "No se ha podido determinar la acción de configuración.",
      {
        selector,
        configuredUnit,
      }
    );
  }

  /*
   * =====================================================
   * CREAR REGIMIENTOS
   * =====================================================
   */

  function handleCreateRegiment(
    configuredHero
  ) {
    if (
      !currentList ||
      !configuredHero
    ) {
      return;
    }

    const isHero =
      configuredHero.rules
        ?.hero === true ||
      configuredHero.keywords
        ?.some(
          (keyword) =>
            String(keyword)
              .trim()
              .toLowerCase() ===
            "hero"
        );

    if (!isHero) {
      window.alert(
        "El líder de un regimiento debe ser un héroe."
      );

      return;
    }

    if (
      isUnitUniqueInArmy(
        currentList,
        configuredHero
      )
    ) {
      window.alert(
        "Esta unidad es Única y ya está incluida en el ejército."
      );

      return;
    }

    const heroInstance = {
      ...configuredHero,

      instanceId:
        configuredHero
          .instanceId ??
        createInstanceId("hero"),
    };

    const newRegiment = {
      id:
        createInstanceId(
          "regiment"
        ),

      hero: heroInstance,

      units: [],
    };

    const updatedList = {
      ...currentList,

      regiments: [
        ...(currentList.regiments ??
          []),

        newRegiment,
      ],
    };

    saveUpdatedList(updatedList);
    returnToBuilder();
  }

  /*
   * =====================================================
   * AÑADIR UNIDADES
   * =====================================================
   */

  function handleAddUnitToRegiment(
    configuredUnit
  ) {
    if (
      !currentList ||
      !configuredUnit
    ) {
      return;
    }

    const regimentId =
      selector?.regimentId;

    if (!regimentId) {
      window.alert(
        "No se ha encontrado el regimiento de destino."
      );

      return;
    }

    const regiments =
      currentList.regiments ??
      [];

    const regimentIndex =
      regiments.findIndex(
        (regiment) =>
          regiment.id ===
          regimentId
      );

    if (regimentIndex === -1) {
      window.alert(
        "El regimiento seleccionado ya no existe."
      );

      returnToBuilder();
      return;
    }

    const selectedRegiment =
      regiments[
        regimentIndex
      ];

    const unitsInRegiment =
      selectedRegiment.units ??
      [];

    /*
     * Regimiento 1: cuatro unidades.
     * Resto: tres unidades.
     */
    const regimentLimit =
      regimentIndex === 0
        ? 4
        : 3;

    if (
      unitsInRegiment.filter(countsTowardRegimentLimit).length >=
      regimentLimit &&
      countsTowardRegimentLimit(configuredUnit)
    ) {
      window.alert(
        `Este regimiento ya contiene el máximo de ${regimentLimit} unidades.`
      );

      return;
    }

    if (
      !canUnitJoinRegiment({
        list: currentList,
        regiment: selectedRegiment,
        unit: configuredUnit,
      })
    ) {
      window.alert(
        "Esta unidad no puede formar parte de este regimiento según las opciones de su líder."
      );

      return;
    }

    const unitInstance = {
      ...configuredUnit,

      instanceId:
        configuredUnit
          .instanceId ??
        createInstanceId("unit"),
    };

    const updatedList = {
      ...currentList,

      regiments:
        regiments.map(
          (regiment) => {
            if (
              regiment.id !==
              regimentId
            ) {
              return regiment;
            }

            return {
              ...regiment,

              units: [
                ...(regiment.units ??
                  []),

                unitInstance,
              ],
            };
          }
        ),
    };

    saveUpdatedList(updatedList);
    returnToBuilder();
  }

  /*
   * =====================================================
   * EDITAR UNIDADES
   * =====================================================
   */

  function handleUpdateConfiguredUnit(
    configuredUnit
  ) {
    if (
      !currentList ||
      !unitEditor ||
      !configuredUnit
    ) {
      return;
    }

    let unitWasFound = false;

    const updatedRegiments = (
      currentList.regiments ?? []
    ).map((regiment) => {
      if (
        regiment.id !==
        unitEditor.regimentId
      ) {
        return regiment;
      }

      /*
       * Editar líder.
       */
      if (
        unitEditor.isLeader
      ) {
        unitWasFound = true;

        return {
          ...regiment,

          hero: {
            ...configuredUnit,

            instanceId:
              regiment.hero
                ?.instanceId ??
              configuredUnit
                .instanceId ??
              createInstanceId(
                "hero"
              ),
          },
        };
      }

      /*
       * Editar unidad subordinada.
       */
      const updatedUnits = (
        regiment.units ?? []
      ).map((unit) => {
        if (
          unit.instanceId !==
          unitEditor
            .unitInstanceId
        ) {
          return unit;
        }

        unitWasFound = true;

        return {
          ...configuredUnit,
          instanceId:
            unit.instanceId,
        };
      });

      return {
        ...regiment,
        units: updatedUnits,
      };
    });

    if (!unitWasFound) {
      window.alert(
        "No se ha encontrado la unidad que intentabas editar."
      );

      returnToBuilder();
      return;
    }

    const updatedList = {
      ...currentList,
      regiments:
        updatedRegiments,
    };

    saveUpdatedList(updatedList);
    returnToBuilder();
  }

  /*
   * =====================================================
   * ELIMINAR UNIDADES Y REGIMIENTOS
   * =====================================================
   */

  function handleRemoveUnit({
    regimentId,
    unitInstanceId,
  }) {
    if (
      !currentList ||
      !regimentId ||
      !unitInstanceId
    ) {
      return;
    }

    const updatedList = {
      ...currentList,

      regiments: (
        currentList.regiments ??
        []
      ).map((regiment) => {
        if (
          regiment.id !==
          regimentId
        ) {
          return regiment;
        }

        return {
          ...regiment,

          units: (
            regiment.units ??
            []
          ).filter(
            (unit) =>
              unit.instanceId !==
              unitInstanceId
          ),
        };
      }),
    };

    saveUpdatedList(updatedList);
  }

  function handleDuplicateUnit({
    regimentId,
    unitInstanceId,
  }) {
    if (
      !currentList ||
      !regimentId ||
      !unitInstanceId
    ) {
      return;
    }

    const regiments = currentList.regiments ?? [];
    const regimentIndex = regiments.findIndex(
      (regiment) => regiment.id === regimentId
    );

    if (regimentIndex === -1) {
      return;
    }

    const regiment = regiments[regimentIndex];
    const sourceUnit = (regiment.units ?? []).find(
      (unit) => unit.instanceId === unitInstanceId
    );

    const isUnique = sourceUnit?.rules?.unique === true ||
      (sourceUnit?.keywords ?? []).some(
        (keyword) => String(keyword).trim().toLowerCase() === "unique"
      );

    if (!sourceUnit || isUnique) {
      return;
    }

    const regimentLimit = regimentIndex === 0 ? 4 : 3;

    if (
      (regiment.units ?? []).filter(countsTowardRegimentLimit).length >=
      regimentLimit &&
      countsTowardRegimentLimit(sourceUnit)
    ) {
      window.alert(
        `Este regimiento ya contiene el máximo de ${regimentLimit} unidades.`
      );
      return;
    }

    if (
      !canUnitJoinRegiment({
        list: currentList,
        regiment,
        unit: sourceUnit,
      })
    ) {
      window.alert(
        "Esta unidad no se puede duplicar en este regimiento por sus restricciones actuales."
      );
      return;
    }

    const clonedUnit = typeof structuredClone === "function"
      ? structuredClone(sourceUnit)
      : JSON.parse(JSON.stringify(sourceUnit));

    const duplicatedUnit = {
      ...clonedUnit,
      instanceId: createInstanceId("unit"),

      // Las mejoras limitadas al ejército no se copian para evitar
      // crear artefactos, rasgos u objetos únicos duplicados.
      artefact: null,
      heroicTrait: null,
      monstrousTrait: null,
      allConsumingObsession: null,
      moulderMutation: null,
      mortisanRefinement: null,
      originOfTerrifyingFolkTale: null,
      visionOfFate: null,
      specialKnickKnack: null,
      flawlessManoeuvre: null,
      plaguefathersPox: null,
      decorationForValour: null,
      ironweldInnovation: null,
      accursedDevice: null,
      brazenMutation: null,
      brandOfDarkGod: null,
      ensorcelledBanner: null,
      boonOfShadow: null,
      aqshyEnhancement: null,
    };

    saveUpdatedList({
      ...currentList,
      regiments: regiments.map((item) =>
        item.id === regimentId
          ? {
              ...item,
              units: [
                ...(item.units ?? []),
                duplicatedUnit,
              ],
            }
          : item
      ),
    });
  }

  function handleRemoveRegiment(
    regimentId
  ) {
    if (
      !currentList ||
      !regimentId
    ) {
      return;
    }

    const selectedRegiment = (currentList.regiments ?? []).find(
      (regiment) => regiment.id === regimentId
    );

    if (
      selectedRegiment?.requiredByArmyOfRenown ||
      (currentList.armyOfRenown?.requiredUnits ?? []).includes(
        selectedRegiment?.hero?.id
      ) ||
      (currentList.armyOfRenown?.requiredUnitGroups ?? [])
        .flat()
        .includes(selectedRegiment?.hero?.id)
    ) {
      window.alert(
        `${selectedRegiment.hero.name} es obligatorio en ${currentList.armyOfRenown.name} y su regimiento no se puede eliminar.`
      );

      return;
    }

    const updatedList = {
      ...currentList,

      regiments: (
        currentList.regiments ??
        []
      ).filter(
        (regiment) =>
          regiment.id !==
          regimentId
      ),
    };

    saveUpdatedList(updatedList);
  }

  function handleAddRegimentOfRenown(regiment) {
    if (!currentList || !regiment) {
      return;
    }

    const selectedRegiments = currentList.regimentsOfRenown ?? [];
    const alreadyIncluded = selectedRegiments.some(
      (item) => item.id === regiment.id
    );

    if (alreadyIncluded || selectedRegiments.length >= 1) {
      return;
    }

    saveUpdatedList({
      ...currentList,
      regimentsOfRenown: [
        ...(currentList.regimentsOfRenown ?? []),
        { ...regiment, instanceId: createInstanceId("renown") },
      ],
    });
  }

  function handleRemoveRegimentOfRenown(instanceId) {
    if (!currentList || !instanceId) {
      return;
    }

    saveUpdatedList({
      ...currentList,
      regimentsOfRenown: (currentList.regimentsOfRenown ?? []).filter(
        (regiment) => regiment.instanceId !== instanceId
      ),
    });
  }

  function startNewList() {
    resetNewArmy();
    navigate("alliance", { listId: null });
  }

  function openLists() {
    navigate("lists", { listId: null });
  }

  function openSettings() {
    navigate("settings", { listId: null });
  }

  function openPredefinedLists() {
    navigate("predefined", { listId: null });
  }

  function handleCreatePredefinedList(newList) {
    if (!newList) return;

    setLists((previousLists) => [...previousLists, newList]);
    setCurrentList(newList);
    setSelectedUnit(null);
    setUnitEditor(null);
    resetSelector();
    setBuilderSection("army");
    navigate("builder", { listId: newList.id, resetToLists: true });
  }

  /*
   * =====================================================
   * PÁGINAS
   * =====================================================
   */

  switch (page) {
    case "predefined":
      return (
        <PredefinedLists
          onBack={goBack}
          onCreate={handleCreatePredefinedList}
        />
      );

    case "lists":
      return (
        <MyLists
          lists={lists}
          storageStatus={storageStatus}
          onOpenList={(list) => {
            setCurrentList(list);
            setBuilderSection("army");
            setSelectedUnit(null);
            setUnitEditor(null);
            resetSelector();

            navigate("builder", { listId: list.id });
          }}
          onDeleteList={handleDeleteList}
          deletedList={deletedList}
          onUndoDelete={restoreDeletedList}
          goBack={goBack}
          onLists={openLists}
          onCreate={startNewList}
          onCreatePredefined={openPredefinedLists}
          onSettings={openSettings}
        />
      );

    case "settings":
      return (
        <Settings
          onBack={goBack}
          onLists={openLists}
          onCreate={startNewList}
          onSettings={openSettings}
        />
      );

    case "alliance":
      return (
        <SelectAlliance
          onSelect={
            handleSelectAlliance
          }
          onBack={goBack}
        />
      );

    case "faction":
      return (
        <SelectFaction
          alliance={army.alliance}
          initialFaction={army.faction}
          onSelect={
            handleSelectFaction
          }
          onBack={goBack}
        />
      );

    case "config":
      return (
        <NewListConfig
          army={army}
          setArmy={setArmy}
          setLists={setLists}
          setCurrentList={
            setCurrentList
          }
          onListCreated={() => setBuilderSection("units")}
          onBack={goBack}

          /*
           * NewListConfig ya espera una
           * propiedad llamada setPage.
           * Le pasamos navigate para que
           * sus cambios queden registrados.
           */
          setPage={navigate}
        />
      );

    case "builder":
      if (!currentList) {
        return (
          <RouteRecovery
            title="No encontramos esta lista"
            description="Puede haberse eliminado o no estar disponible en este dispositivo."
            primaryLabel="Ir a Mis listas"
            onPrimary={openLists}
            secondaryLabel="Crear lista predefinida"
            onSecondary={openPredefinedLists}
          />
        );
      }

      return (
        <>
        <ArmyBuilder
          list={currentList}
          storageStatus={storageStatus}
          setSelector={setSelector}
          navigate={navigate}
          onBack={goBack}
          onViewWarscroll={
            openBuilderUnitReference
          }
          onConfigureUnit={
            handleConfigureUnit
          }
          onRemoveUnit={
            handleRemoveUnit
          }
          onDuplicateUnit={
            handleDuplicateUnit
          }
          onRemoveRegiment={
            handleRemoveRegiment
          }
          onAddRegimentOfRenown={handleAddRegimentOfRenown}
          onRemoveRegimentOfRenown={handleRemoveRegimentOfRenown}
          onCommandPointsChange={handleCommandPointsChange}
          onFuryPointsChange={handleFuryPointsChange}
          onBattleMissionToggle={handleBattleMissionToggle}
          onBattleRoundChange={handleBattleRoundChange}
          onBattleTurnChange={handleBattleTurnChange}
          onBattleInitiativeResolve={handleBattleInitiativeResolve}
          onBattleLogAdd={handleBattleLogAdd}
          onBattleLogRemove={handleBattleLogRemove}
          onBattleUnitStateChange={handleBattleUnitStateChange}
          onViewRule={openBuilderRuleReference}
          onBrowseUnit={openBuilderUnitReference}
          section={builderSection}
          onSectionChange={setBuilderSection}
        />
        {builderReference && (
          <ReferenceOverlay
            title={builderReference.type === "unit"
              ? "Ficha de unidad"
              : builderReference.reference?.kind === "regimentOfRenown"
                ? "Regimiento de renombre"
                : "Referencia de regla"}
            onClose={closeBuilderReference}
          >
            {builderReference.type === "unit" ? (
              <UnitWarscroll
                unit={builderReference.unit}
                list={currentList}
                onBack={closeBuilderReference}
                onConfigure={builderReference.editor && !isUniqueUnit(builderReference.unit)
                  ? () => {
                      const editor = builderReference.editor;
                      const unit = builderReference.unit;
                      clearBuilderReferenceHistory();
                      handleConfigureAddedUnit({ unit, ...editor });
                    }
                  : undefined}
              />
            ) : (
              <RuleWarscroll
                reference={builderReference.reference}
                onBack={closeBuilderReference}
              />
            )}
          </ReferenceOverlay>
        )}
        </>
      );

    case "selector":
      return (
        <OptionSelector
          title={
            selector?.title ??
            ""
          }
          options={
            selector?.options ??
            []
          }
          selectedOptions={
            selector?.ui?.maxSelections > 1
              ? (Array.isArray(currentList?.[selector.property])
                  ? currentList[selector.property]
                  : currentList?.[selector.property]
                    ? [currentList[selector.property]]
                    : [])
              : []
          }
          maxSelections={selector?.ui?.maxSelections ?? 1}
          variant={selector?.ui?.variant}
          onToggle={toggleArmyOption}
          goBack={
            handleSelectorBack
          }
          onView={(option) => {
            if (
              selector?.property ===
                "newRegiment" ||
              selector?.property ===
                "newUnit"
            ) {
              openNewUnitWarscroll(
                option
              );

              return;
            }

            saveArmyOption(option);
          }}
          onConfigure={(
            option
          ) => {
            if (
              selector?.property ===
                "newRegiment" ||
              selector?.property ===
                "newUnit"
            ) {
              openNewUnitConfiguration(
                option
              );

              return;
            }

            saveArmyOption(option);
          }}
        />
      );

    case "warscroll":
      if (!selectedUnit) {
        return (
          <RouteRecovery
            title="Esta unidad ya no está disponible"
            description="Vuelve al constructor y selecciona otra unidad."
            primaryLabel="Volver a la lista"
            onPrimary={goBack}
            secondaryLabel="Ir a Mis listas"
            onSecondary={openLists}
          />
        );
      }

      return (
        <UnitWarscroll
          unit={selectedUnit}
          list={currentList}
          onBack={
            handleWarscrollBack
          }
          onConfigure={
            unitEditor ||
            selector?.property === "newRegiment" ||
            selector?.property === "newUnit"
              ? handleConfigureSelectedUnit
              : undefined
          }
        />
      );

    case "unitConfig":
      if (!selectedUnit) {
        return (
          <RouteRecovery
            title="No hay una unidad para configurar"
            description="La selección anterior ya no está disponible."
            primaryLabel="Volver a la lista"
            onPrimary={goBack}
            secondaryLabel="Ir a Mis listas"
            onSecondary={openLists}
          />
        );
      }

      return (
        <UnitConfig
          unit={selectedUnit}
          enhancementOwners={{
            artefact: findEnhancementOwner("artefact"),
            heroicTrait: findEnhancementOwner("heroicTrait"),
            monstrousTrait: findEnhancementOwner("monstrousTrait"),
            accursedDevice: findEnhancementOwner("accursedDevice"),
            brazenMutation: findEnhancementOwner("brazenMutation"),
            brandOfDarkGod: findEnhancementOwner("brandOfDarkGod"),
            ensorcelledBanner: findEnhancementOwner("ensorcelledBanner"),
            boonOfShadow: findEnhancementOwner("boonOfShadow"),
            aqshyEnhancement: findEnhancementOwner("aqshyEnhancement"),
          }}
          faction={
            {
              ...currentList?.faction,
              ...(currentList?.armyOfRenown?.rules ?? {}),
            }
          }
          mode={
            unitEditor
              ? "editUnit"
              : selector?.property
          }
          goBack={
            handleConfigurationBack
          }
          onConfirm={
            handleConfirmUnitConfiguration
          }
        />
      );

    case "home":
    default:
      return (
        <Home
          onPredefinedLists={openPredefinedLists}
          onNewList={startNewList}
          onMyLists={openLists}
          onSettings={openSettings}
        />
      );
  }
}

function RouteRecovery({
  title,
  description,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
}) {
  return (
    <main className="aos-shell aos-route-recovery">
      <section className="aos-empty-message aos-empty-message--actionable">
        <span className="aos-route-recovery__icon" aria-hidden="true">!</span>
        <h1>{title}</h1>
        <p>{description}</p>
        <button type="button" className="aos-primary-action" onClick={onPrimary}>
          {primaryLabel}
        </button>
        <button type="button" className="aos-secondary-action" onClick={onSecondary}>
          {secondaryLabel}
        </button>
      </section>
    </main>
  );
}

function getListIdFromPath(pathname) {
  const match = String(pathname ?? "").match(/^\/listas\/([^/]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function getInitialRoute(pathname) {
  const listId = getListIdFromPath(pathname);

  if (listId) return { page: "builder", listId };
  if (pathname === "/listas") return { page: "lists", listId: null };
  if (pathname === "/ajustes") return { page: "settings", listId: null };
  if (pathname === "/predefinidas") return { page: "predefined", listId: null };
  if (pathname === "/nueva/alianza") return { page: "alliance", listId: null };
  if (pathname === "/nueva/faccion") return { page: "faction", listId: null };
  if (pathname === "/nueva/configuracion") return { page: "config", listId: null };

  return { page: "home", listId: null };
}

function getPagePath(page, listId = null) {
  const encodedListId = listId ? encodeURIComponent(listId) : null;
  const listBase = encodedListId ? `/listas/${encodedListId}` : "/listas";

  return {
    home: "/",
    lists: "/listas",
    settings: "/ajustes",
    predefined: "/predefinidas",
    alliance: "/nueva/alianza",
    faction: "/nueva/faccion",
    config: "/nueva/configuracion",
    builder: listBase,
    selector: `${listBase}/selector`,
    warscroll: `${listBase}/unidad`,
    unitConfig: `${listBase}/unidad/configurar`,
  }[page] ?? "/";
}

export default App;
