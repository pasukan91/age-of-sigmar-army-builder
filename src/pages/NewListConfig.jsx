import { createArmyList } from "../models/ArmyList";


function NewListConfig({ army, setArmy }) {


  function handleCreateList() {

    const newList = createArmyList({
      name: army.name || "Nueva Lista",
      faction: army.faction,
      alliance: army.alliance,
      pointsLimit: army.points,
    });

    setLists((previous) => [...previous, newList]);

    setCurrentList(newList);

    setPage("builder");
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>{army.faction.name}</h1>

      <br />

      <input
        type="text"
        placeholder="Nombre de la lista"
        value={army.name}
        onChange={(e) =>
          setArmy({
            ...army,
            name: e.target.value,
          })
        }
      />

      <br />
      <br />

      <select
        value={army.points}
        onChange={(e) =>
          setArmy({
            ...army,
            points: Number(e.target.value),
          })
        }
      >
        <option value={1000}>1000</option>
        <option value={1500}>1500</option>
        <option value={2000}>2000</option>
        <option value={2500}>2500</option>
        <option value={3000}>3000</option>
      </select>

      <br />
      <br />

      <button onClick={handleCreateList}>
        Crear Lista
      </button>
    </div>
  );
}

export default NewListConfig;