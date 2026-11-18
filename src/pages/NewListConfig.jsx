import OfficialIcon from "../components/OfficialIcon";
import { createArmyList } from "../models/ArmyList";

function NewListConfig({
  army,
  setArmy,
  setLists,
  setCurrentList,
  setPage,
  onListCreated,
  onBack,
}) {
  const suggestedName = army.faction?.name ?? "New Army";

  function handleCreateList() {
    if (!army.faction) return;
    const newList = createArmyList({
      name: army.name.trim() || suggestedName,
      faction: army.faction,
      alliance: army.alliance,
      pointsLimit: army.points,
      armyOfRenown: army.armyOfRenown,
    });
    setLists((previousLists) => [...previousLists, newList]);
    setCurrentList(newList);
    onListCreated?.();
    setPage("builder", { listId: newList.id, resetToLists: true });
  }

  return (
    <main className="aos-official-page aos-create-config-page">
      <header className="aos-official-header">
        <button type="button" onClick={onBack} aria-label="Back">
          <OfficialIcon name="back" size={25} strokeWidth={2.5} />
        </button>
        <h1>CREATE ARMY</h1>
        <span aria-hidden="true" />
      </header>

      <section className="aos-create-config-content">
        <h2>ARMY DETAILS</h2>

        <div className="aos-create-summary">
          <span>Faction</span>
          <strong>{army.faction?.name}</strong>
        </div>

        <label className="aos-create-field">
          <span>Army Name</span>
          <input
            autoFocus
            type="text"
            maxLength={80}
            value={army.name}
            placeholder={suggestedName}
            onChange={(event) => setArmy((previous) => ({ ...previous, name: event.target.value }))}
          />
        </label>

        <label className="aos-create-field">
          <span>Points Limit</span>
          <select
            value={army.points}
            onChange={(event) => setArmy((previous) => ({ ...previous, points: Number(event.target.value) }))}
          >
            {[1000, 1500, 2000, 2500, 3000].map((points) => (
              <option key={points} value={points}>{points.toLocaleString("en-GB")} Points</option>
            ))}
          </select>
        </label>

        <button type="button" className="aos-create-submit" onClick={handleCreateList}>
          CREATE ARMY
        </button>
      </section>
    </main>
  );
}

export default NewListConfig;
