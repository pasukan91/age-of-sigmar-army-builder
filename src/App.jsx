import { useState } from "react";

import Home from "./pages/Home";
import MyLists from "./pages/MyLists";
import SelectAlliance from "./pages/SelectAlliance";
import SelectFaction from "./pages/SelectFaction";
import NewListConfig from "./pages/NewListConfig";
import ArmyBuilder from "./pages/ArmyBuilder";
import OptionSelector from "./pages/OptionSelector";
import UnitWarscroll from "./pages/UnitWarscroll";
import UnitConfig from "./pages/UnitConfig";

import {
  calculateArmyPoints,
  hasExceededPointsLimit,
} from "./utils/armyPoints";

function App() {
  const [page, setPage] = useState("home");

  const [lists, setLists] = useState([]);

  const [currentList, setCurrentList] =
    useState(null);

  const [selectedUnit, setSelectedUnit] =
    useState(null);

  const [army, setArmy] = useState({
    alliance: null,
    faction: null,
    points: 2000,
    name: "",
  });

  const [selector, setSelector] = useState({
    title: "",
    options: [],
    property: "",
    regimentId: null,
  });

  function saveUpdatedList(updatedList) {
    const totalPoints =
      calculateArmyPoints(updatedList);

    setCurrentList(updatedList);

    setLists((previous) =>
      previous.map((list) =>
        list.id === updatedList.id
          ? updatedList
          : list
      )
    );

    if (hasExceededPointsLimit(updatedList)) {
      window.alert(
        `Has superado el límite de puntos.\n\n` +
          `Puntos actuales: ${totalPoints}\n` +
          `Límite: ${updatedList.pointsLimit}`
      );
    }
  }

  function saveArmyOption(option) {
    if (!currentList || !selector.property) {
      return;
    }

    const updatedList = {
      ...currentList,

      [selector.property]: option,

      updatedAt: Date.now(),
    };

    saveUpdatedList(updatedList);
    setPage("builder");
  }

  function openUnitConfiguration(option) {
    setSelectedUnit(option);
    setPage("unitConfig");
  }

  function addConfiguredUnit(configuredUnit) {
    if (!currentList) {
      return;
    }

    if (selector.property === "newRegiment") {
      const updatedList = {
        ...currentList,

        regiments: [
          ...currentList.regiments,

          {
            id: crypto.randomUUID(),

            hero: {
              ...configuredUnit,
            },

            units: [],
          },
        ],

        updatedAt: Date.now(),
      };

      saveUpdatedList(updatedList);
      setSelectedUnit(null);
      setPage("builder");
      return;
    }

    if (selector.property === "newUnit") {
      const regimentIndex =
        currentList.regiments.findIndex(
          (regiment) =>
            regiment.id === selector.regimentId
        );

      if (regimentIndex === -1) {
        setSelectedUnit(null);
        setPage("builder");
        return;
      }

      const selectedRegiment =
        currentList.regiments[regimentIndex];

      const regimentLimit =
        regimentIndex === 0 ? 4 : 3;

      const isWarmaster =
        configuredUnit.rules?.warmaster === true ||
        configuredUnit.keywords?.includes(
          "Warmaster"
        );

      if (isWarmaster) {
        window.alert(
          "Una unidad con la clave Warmaster no puede añadirse dentro de otro regimiento."
        );

        setSelectedUnit(null);
        setPage("builder");
        return;
      }

      if (
        selectedRegiment.units.length >=
        regimentLimit
      ) {
        window.alert(
          `Este regimiento ya tiene el máximo de ${regimentLimit} unidades.`
        );

        setSelectedUnit(null);
        setPage("builder");
        return;
      }

      const updatedList = {
        ...currentList,

        regiments: currentList.regiments.map(
          (regiment) => {
            if (
              regiment.id !== selector.regimentId
            ) {
              return regiment;
            }

            return {
              ...regiment,

              units: [
                ...regiment.units,

                {
                  ...configuredUnit,

                  instanceId:
                    crypto.randomUUID(),
                },
              ],
            };
          }
        ),

        updatedAt: Date.now(),
      };

      saveUpdatedList(updatedList);
      setSelectedUnit(null);
      setPage("builder");
    }
  }

  switch (page) {
    case "lists":
      return (
        <MyLists
          lists={lists}
          onOpenList={(list) => {
            setCurrentList(list);
            setPage("builder");
          }}
          goBack={() => setPage("home")}
        />
      );

    case "alliance":
      return (
        <SelectAlliance
          onSelect={(alliance) => {
            setArmy({
              ...army,
              alliance,
            });

            setPage("faction");
          }}
        />
      );

    case "faction":
      return (
        <SelectFaction
          alliance={army.alliance}
          onSelect={(faction) => {
            setArmy({
              ...army,
              faction,
            });

            setPage("config");
          }}
        />
      );

    case "config":
      return (
        <NewListConfig
          army={army}
          setArmy={setArmy}
          setLists={setLists}
          setCurrentList={setCurrentList}
          setPage={setPage}
        />
      );

    case "builder":
      if (!currentList) {
        return (
          <div style={{ padding: 20 }}>
            <p>
              No hay ninguna lista abierta.
            </p>

            <button
              type="button"
              onClick={() => setPage("home")}
            >
              Volver al inicio
            </button>
          </div>
        );
      }

      return (
        <ArmyBuilder
          list={currentList}
          setSelector={setSelector}
          setPage={setPage}
        />
      );

    case "selector":
      return (
        <OptionSelector
          title={selector.title}
          options={selector.options}
          goBack={() => setPage("builder")}
          onView={(option) => {
            setSelectedUnit(option);
            setPage("warscroll");
          }}
          onConfigure={(option) => {
            if (
              selector.property ===
                "newRegiment" ||
              selector.property === "newUnit"
            ) {
              openUnitConfiguration(option);
              return;
            }

            saveArmyOption(option);
          }}
        />
      );

    case "warscroll":
      return (
        <UnitWarscroll
          unit={selectedUnit}
          goBack={() => setPage("selector")}
          onConfigure={(unit) => {
            setSelectedUnit(unit);
            setPage("unitConfig");
          }}
        />
      );

    case "unitConfig":
      return (
        <UnitConfig
          unit={selectedUnit}
          faction={currentList?.faction}
          mode={selector.property}
          goBack={() => setPage("selector")}
          onConfirm={addConfiguredUnit}
        />
      );

    default:
      return (
        <Home
          onNewList={() => {
            setArmy({
              alliance: null,
              faction: null,
              points: 2000,
              name: "",
            });

            setCurrentList(null);
            setSelectedUnit(null);

            setSelector({
              title: "",
              options: [],
              property: "",
              regimentId: null,
            });

            setPage("alliance");
          }}
          onMyLists={() => setPage("lists")}
        />
      );
  }
}

export default App;