import { useMemo, useState } from "react";
import factions from "../data/factions";
import OfficialIcon from "../components/OfficialIcon";

const ALLIANCE_ORDER = ["order", "chaos", "death", "destruction"];
const ALLIANCE_LABELS = {
  order: "Grand Alliance Order",
  chaos: "Grand Alliance Chaos",
  death: "Grand Alliance Death",
  destruction: "Grand Alliance Destruction",
};

function SelectFaction({ onSelect, onBack }) {
  const [expandedAlliance, setExpandedAlliance] = useState(null);
  const [orrukOpen, setOrrukOpen] = useState(false);
  const availableFactions = useMemo(
    () => factions
      .filter((faction) => (faction.units?.length ?? 0) > 0)
      .sort((left, right) => left.name.localeCompare(right.name)),
    []
  );
  const orrukFactions = availableFactions.filter((faction) =>
    ["ironjawz", "kruleboyz"].includes(faction.id)
  );

  return (
    <main className="aos-official-page aos-create-army-page aos-creation-flow">
      <header className="aos-official-header">
        <span aria-hidden="true" />
        <h1>CHOOSE FACTION</h1>
        <button type="button" onClick={onBack} aria-label="Cancel army creation" className="aos-create-close">×</button>
      </header>

      <section className="aos-create-faction-list" aria-label="Factions">
        {ALLIANCE_ORDER.map((allianceId) => {
          const open = expandedAlliance === allianceId;
          const allianceFactions = availableFactions.filter((faction) =>
            faction.alliance === allianceId &&
            !["ironjawz", "kruleboyz"].includes(faction.id)
          );

          return (
            <section className="aos-create-alliance" key={allianceId}>
              <button
                type="button"
                className="aos-create-alliance__toggle"
                aria-expanded={open}
                onClick={() => {
                  setExpandedAlliance(open ? null : allianceId);
                  if (open || allianceId !== "destruction") setOrrukOpen(false);
                }}
              >
                <strong>{ALLIANCE_LABELS[allianceId]}</strong>
                <OfficialIcon name={open ? "chevronDown" : "plus"} size={27} strokeWidth={2.8} />
              </button>

              {open && (
                <div className="aos-create-alliance__children">
                  {allianceFactions
                    .filter((faction) => allianceId !== "destruction" || faction.name.localeCompare("Orruk Warclans") < 0)
                    .map((faction) => (
                    <FactionChoice key={faction.id} faction={faction} onSelect={onSelect} />
                    ))}

                  {allianceId === "destruction" && orrukFactions.length > 0 && (
                    <section className="aos-create-orruk-group">
                      <button
                        type="button"
                        className="aos-create-faction-row"
                        aria-expanded={orrukOpen}
                        onClick={() => setOrrukOpen((value) => !value)}
                      >
                        <strong>Orruk Warclans</strong>
                        <OfficialIcon name={orrukOpen ? "chevronDown" : "plus"} size={25} strokeWidth={2.8} />
                      </button>
                      {orrukOpen && (
                        <div className="aos-create-orruk-group__children">
                          {getOrrukChoices(orrukFactions).map((choice) => (
                            <button
                              type="button"
                              className="aos-create-faction-row aos-create-faction-row--nested"
                              key={choice.key}
                              onClick={() => onSelect(choice.faction, choice.armyOfRenown)}
                            >
                              <span>
                                <strong>{choice.name}</strong>
                                {choice.armyOfRenown && <small>Army of Renown</small>}
                              </span>
                              <OfficialIcon name="chevronRight" size={22} strokeWidth={3} />
                            </button>
                          ))}
                        </div>
                      )}
                    </section>
                  )}
                  {allianceId === "destruction" && allianceFactions
                    .filter((faction) => faction.name.localeCompare("Orruk Warclans") >= 0)
                    .map((faction) => (
                      <FactionChoice key={faction.id} faction={faction} onSelect={onSelect} />
                    ))}
                </div>
              )}
            </section>
          );
        })}
      </section>
    </main>
  );
}

function FactionChoice({ faction, onSelect }) {
  const [open, setOpen] = useState(false);
  const armies = faction.armiesOfRenown ?? [];

  if (armies.length === 0) {
    return (
      <button type="button" className="aos-create-faction-row" onClick={() => onSelect(faction, null)}>
        <strong>{faction.name}</strong>
        <OfficialIcon name="chevronRight" size={22} strokeWidth={3} />
      </button>
    );
  }

  return (
    <section className="aos-create-faction-group">
      <button type="button" className="aos-create-faction-row" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <strong>{faction.name}</strong>
        <OfficialIcon name={open ? "chevronDown" : "plus"} size={24} strokeWidth={3} />
      </button>
      {open && (
        <div className="aos-create-faction-group__children">
          <button type="button" className="aos-create-faction-row aos-create-faction-row--nested" onClick={() => onSelect(faction, null)}>
            <strong>{faction.name}</strong>
            <OfficialIcon name="chevronRight" size={22} strokeWidth={3} />
          </button>
          {armies.map((army) => (
            <button
              type="button"
              className="aos-create-faction-row aos-create-faction-row--nested"
              key={`${faction.id}-${army.id}`}
              onClick={() => onSelect(faction, army)}
            >
              <span><strong>{army.name}</strong><small>Army of Renown</small></span>
              <OfficialIcon name="chevronRight" size={22} strokeWidth={3} />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

function getOrrukChoices(orrukFactions) {
  const choices = [];
  const seenArmies = new Set();

  orrukFactions.forEach((faction) => {
    (faction.armiesOfRenown ?? []).forEach((army) => {
      const key = String(army.name ?? army.id).toLowerCase();
      if (seenArmies.has(key)) return;
      seenArmies.add(key);
      choices.push({ key: `renown-${key}`, name: army.name, faction, armyOfRenown: army });
    });
  });

  orrukFactions.forEach((faction) => {
    choices.push({ key: faction.id, name: faction.name, faction, armyOfRenown: null });
  });

  return choices.sort((left, right) => {
    if (left.name === "Big Waaagh!") return -1;
    if (right.name === "Big Waaagh!") return 1;
    return left.name.localeCompare(right.name);
  });
}

export default SelectFaction;
