import factions from "../data/factions";
import OfficialIcon from "../components/OfficialIcon";
import { getFactionArtwork, getFactionArtworkPosition } from "../utils/factionArtwork";

function SelectFaction({ onSelect, onBack }) {
  const factionList = factions
    .filter((faction) => (faction.units?.length ?? 0) > 0)
    .sort((left, right) => left.name.localeCompare(right.name));

  return (
    <main className="aos-official-page aos-create-army-page">
      <header className="aos-official-header">
        <button type="button" onClick={onBack} aria-label="Back">
          <OfficialIcon name="back" size={25} strokeWidth={2.5} />
        </button>
        <h1>CREATE ARMY</h1>
        <span aria-hidden="true" />
      </header>

      <section className="aos-create-army-content">
        <h2>CHOOSE A FACTION</h2>
        <div className="aos-create-faction-list">
          {factionList.map((faction) => {
            const artwork = getFactionArtwork(faction);
            return (
              <button
                key={faction.id}
                type="button"
                onClick={() => onSelect(faction, null)}
                style={{
                  "--official-faction-art": artwork ? `url("${artwork}")` : "none",
                  "--official-faction-position": getFactionArtworkPosition(faction, "card") ?? "center",
                }}
              >
                <strong>{faction.name}</strong>
                <OfficialIcon name="chevronRight" size={22} strokeWidth={3} />
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default SelectFaction;
