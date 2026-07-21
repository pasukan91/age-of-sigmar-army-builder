import { useEffect, useState } from "react";

import Home from "./pages/Home";
import MyLists from "./pages/MyLists";
import SelectAlliance from "./pages/SelectAlliance";
import SelectFaction from "./pages/SelectFaction";
import NewListConfig from "./pages/NewListConfig";
import ArmyBuilder from "./pages/Armybuilder";
import OptionSelector from "./pages/OptionSelector";
import UnitWarscroll from "./pages/unitWarscroll";
import UnitConfig from "./pages/unitConfig";
import RuleWarscroll from "./pages/RuleWarscroll";

import {
  calculateArmyPoints,
  hasExceededPointsLimit,
} from "./utils/armyPoints";
import {
  canUnitJoinRegiment,
  isUnitUniqueInArmy,
} from "./utils/regimentRules";
import {
  loadArmyLists,
  saveArmyLists,
} from "./storage/armyListStorage";

const EMPTY_SELECTOR = {
  title: "",
  options: [],
  property: "",
  regimentId: null,
};

const INITIAL_ARMY = {
  alliance: null,
  faction: null,
  armyOfRenown: null,
  points: 2000,
  name: "",
};

function App() {
  const [navigation, setNavigation] =
    useState({
      page: "home",
      history: [],
    });

  const { page, history } = navigation;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [page]);

  const [lists, setLists] =
    useState(() => loadArmyLists());

  const [storageStatus, setStorageStatus] =
    useState("saved");

  useEffect(() => {
    const saveTimer = window.setTimeout(() => {
      const saved = saveArmyLists(lists);

      setStorageStatus(saved ? "saved" : "error");
    }, 0);

    return () => window.clearTimeout(saveTimer);
  }, [lists]);

  const [currentList, setCurrentList] =
    useState(null);

  const [selectedUnit, setSelectedUnit] =
    useState(null);

  const [selectedRuleReference, setSelectedRuleReference] =
    useState(null);

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

  function navigate(nextPage) {
    if (!nextPage) {
      return;
    }

    setNavigation((previous) => {
      if (
        nextPage === previous.page
      ) {
        return previous;
      }

      return {
        page: nextPage,
        history: [
          ...previous.history,
          previous.page,
        ],
      };
    });
  }

  function goBack() {
    setNavigation((previous) => {
      if (
        previous.history.length === 0
      ) {
        return previous;
      }

      const previousPage =
        previous.history[
          previous.history.length - 1
        ];

      return {
        page: previousPage,
        history:
          previous.history.slice(
            0,
            -1
          ),
      };
    });
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

    setNavigation((previous) => {
      const builderIndex =
        previous.history.lastIndexOf(
          "builder"
        );

      if (builderIndex === -1) {
        return {
          ...previous,
          page: "builder",
        };
      }

      return {
        page: "builder",
        history:
          previous.history.slice(
            0,
            builderIndex
          ),
      };
    });
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

    setLists((previousLists) =>
      previousLists.filter((list) => list.id !== listId)
    );

    if (currentList?.id === listId) {
      setCurrentList(null);
    }
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

  function handleCommandPointsChange(nextValue) {
    if (!currentList) {
      return;
    }

    const commandPoints = Math.min(
      99,
      Math.max(0, Number(nextValue) || 0)
    );

    saveUpdatedList({
      ...currentList,
      commandPoints,
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

  function openRuleWarscroll(reference) {
    if (!reference?.item) {
      return;
    }

    setSelectedRuleReference(reference);
    navigate("ruleWarscroll");
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

  function handleViewAddedUnit({
    unit,
    regimentId,
    isLeader = false,
  }) {
    if (!unit || !regimentId) {
      return;
    }

    setSelectedUnit(unit);

    setUnitEditor({
      regimentId,

      unitInstanceId:
        unit.instanceId ?? null,

      isLeader,
    });

    navigate("warscroll");
  }

  function handleConfigureAddedUnit({
    unit,
    regimentId,
    isLeader = false,
  }) {
    if (!unit || !regimentId) {
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
  function handleViewWarscroll(
    editorData
  ) {
    handleViewAddedUnit(
      editorData
    );
  }

  function handleConfigureUnit(
    editorData
  ) {
    handleConfigureAddedUnit(
      editorData
    );
  }

  function handleConfigureSelectedUnit() {
    if (!selectedUnit) {
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
      unitsInRegiment.length >=
      regimentLimit
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
      )
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

    const alreadyIncluded = (currentList.regimentsOfRenown ?? []).some(
      (item) => item.id === regiment.id
    );

    if (alreadyIncluded) {
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

  /*
   * =====================================================
   * PÁGINAS
   * =====================================================
   */

  switch (page) {
    case "lists":
      return (
        <MyLists
          lists={lists}
          storageStatus={storageStatus}
          onOpenList={(list) => {
            setCurrentList(list);
            setSelectedUnit(null);
            setUnitEditor(null);
            resetSelector();

            navigate("builder");
          }}
          onDeleteList={handleDeleteList}
          goBack={goBack}
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
          <main
            style={
              styles.emptyPage
            }
          >
            <p>
              No hay ninguna lista
              abierta.
            </p>

            <button
              type="button"
              onClick={goBack}
            >
              Volver
            </button>
          </main>
        );
      }

      return (
        <ArmyBuilder
          list={currentList}
          storageStatus={storageStatus}
          setSelector={setSelector}
          navigate={navigate}
          onBack={goBack}
          onViewWarscroll={
            handleViewWarscroll
          }
          onConfigureUnit={
            handleConfigureUnit
          }
          onRemoveUnit={
            handleRemoveUnit
          }
          onRemoveRegiment={
            handleRemoveRegiment
          }
          onAddRegimentOfRenown={handleAddRegimentOfRenown}
          onRemoveRegimentOfRenown={handleRemoveRegimentOfRenown}
          onCommandPointsChange={handleCommandPointsChange}
          onViewRule={openRuleWarscroll}
        />
      );

    case "ruleWarscroll":
      return (
        <RuleWarscroll
          reference={selectedRuleReference}
          onBack={goBack}
        />
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
          <main
            style={
              styles.emptyPage
            }
          >
            <p>
              No hay ninguna unidad
              seleccionada.
            </p>

            <button
              type="button"
              onClick={goBack}
            >
              Volver
            </button>
          </main>
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
            handleConfigureSelectedUnit
          }
        />
      );

    case "unitConfig":
      if (!selectedUnit) {
        return (
          <main
            style={
              styles.emptyPage
            }
          >
            <p>
              No hay ninguna unidad
              seleccionada.
            </p>

            <button
              type="button"
              onClick={goBack}
            >
              Volver
            </button>
          </main>
        );
      }

      return (
        <UnitConfig
          unit={selectedUnit}
          enhancementOwners={{
            artefact: findEnhancementOwner("artefact"),
            heroicTrait: findEnhancementOwner("heroicTrait"),
            monstrousTrait: findEnhancementOwner("monstrousTrait"),
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
          onNewList={() => {
            resetNewArmy();
            navigate("alliance");
          }}
          onMyLists={() =>
            navigate("lists")
          }
        />
      );
  }
}

const styles = {
  emptyPage: {
    minHeight: "100vh",
    padding: 20,
    backgroundColor:
      "#eeeeee",
    color: "#111111",
  },
};

export default App;
