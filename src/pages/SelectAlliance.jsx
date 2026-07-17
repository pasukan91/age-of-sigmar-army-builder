import alliances from "../data/alliances";
import AllianceCard from "../components/AllianceCard";

function SelectAlliance({ onSelect }) {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Selecciona una Gran Alianza</h1>

      {alliances.map((alliance) => (
        <AllianceCard
          key={alliance.id}
          alliance={alliance}
          onClick={() => onSelect(alliance)}
        />
      ))}
    </div>
  );
}

export default SelectAlliance;