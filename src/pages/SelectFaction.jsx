import factions from "../data/factions";

function SelectFaction({ alliance, onSelect }) {

  const factionList = factions.filter(
    (faction) => faction.alliance === alliance.id
  );

  return (
    <div style={{ textAlign: "center" }}>
      <h1>{alliance.name}</h1>

      <h2>Selecciona una facción</h2>

      {factionList.map((faction) => (
        <button
          key={faction.id}
          onClick={() => onSelect(faction)}
          style={{
            display: "block",
            margin: "10px auto",
            width: "300px",
            padding: "15px",
          }}
        >
          {faction.name}
        </button>
      ))}
    </div>
  );
}

export default SelectFaction;