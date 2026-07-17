import { useState } from "react";

import Home from "./pages/Home";
import MyLists from "./pages/MyLists";
import SelectAlliance from "./pages/SelectAlliance";
import SelectFaction from "./pages/SelectFaction";
import NewListConfig from "./pages/NewListConfig";
import ArmyBuilder from "./pages/ArmyBuilder";
import OptionSelector from "./pages/OptionSelector";

function App() {
  const [page, setPage] = useState("home");

  // Todas las listas guardadas
  const [lists, setLists] = useState([]);

  // Lista que se está editando actualmente
  const [currentList, setCurrentList] = useState(null);

  // Datos temporales mientras se crea una lista nueva
  const [army, setArmy] = useState({
    alliance: null,
    faction: null,
    points: 2000,
    name: "",
  });

  const [selector, setSelector] = useState({
    title: "",
    options: [],
    property: ""
  });

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
      return (
        <ArmyBuilder
          list={currentList}
          setCurrentList={setCurrentList}
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
          onSelect={(option) => {

            let updatedList;

            if (selector.property === "newRegiment") {

              updatedList = {
                ...currentList,
                regiments: [
                  ...currentList.regiments,
                  {
                    id: crypto.randomUUID(),
                    hero: option,
                    units: [],
                  },
                ],
              };

            } else {

              updatedList = {
                ...currentList,
                [selector.property]: option,
              };

            }

            setCurrentList(updatedList);

            setLists((previous) =>
              previous.map((list) =>
                list.id === updatedList.id ? updatedList : list
              )
            );

            setPage("builder");
          }}
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

            setPage("alliance");
          }}
          onMyLists={() => setPage("lists")}
        />
      );


  }
}

export default App;