import { useMemo, useState } from "react";
import factions from "../data/factions";
import OfficialIcon from "../components/OfficialIcon";
import AbilityCard from "../components/AbilityCard";
import { getFactionArtwork, getFactionArtworkPosition } from "../utils/factionArtwork";

const ALLIANCE_ORDER = ["order", "chaos", "death", "destruction"];
const ALLIANCE_LABELS = {
  order: "Grand Alliance Order",
  chaos: "Grand Alliance Chaos",
  death: "Grand Alliance Death",
  destruction: "Grand Alliance Destruction",
};
const SELECTOR_ARTWORK = {
  fyreslayers: "/images/factions/khazalite-holds-cover.jpg",
  stormcast: "/images/factions/stormcast.webp",
  nighthaunt: "/images/factions/nighthaunt.webp",
  flesheater: "/images/factions/flesheater.webp",
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
                style={{ "--creation-art-image": `url("/images/alliances/${allianceId}.webp")` }}
                aria-expanded={open}
                onClick={() => {
                  setExpandedAlliance(open ? null : allianceId);
                  if (open || allianceId !== "destruction") setOrrukOpen(false);
                }}
              >
                <strong>{ALLIANCE_LABELS[allianceId]}</strong>
                <ChoiceControl expanded={open} />
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
                        style={choiceArtwork(orrukFactions[0])}
                        aria-expanded={orrukOpen}
                        onClick={() => setOrrukOpen((value) => !value)}
                      >
                        <strong>Orruk Warclans</strong>
                        <ChoiceControl expanded={orrukOpen} />
                      </button>
                      {orrukOpen && (
                        <div className="aos-create-orruk-group__children">
                          {getOrrukChoices(orrukFactions).map((choice) => (
                            <FactionLeaf key={choice.key} faction={choice.faction} army={choice.armyOfRenown} nested onSelect={onSelect} />
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
      <FactionLeaf faction={faction} onSelect={onSelect} />
    );
  }

  return (
    <section className="aos-create-faction-group">
      <button type="button" className="aos-create-faction-row" style={choiceArtwork(faction)} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <strong>{faction.name}</strong>
        <ChoiceControl expanded={open} />
      </button>
      {open && (
        <div className="aos-create-faction-group__children">
          <FactionLeaf faction={faction} nested onSelect={onSelect} />
          {armies.map((army) => (
            <FactionLeaf key={`${faction.id}-${army.id}`} faction={faction} army={army} nested onSelect={onSelect} />
          ))}
        </div>
      )}
    </section>
  );
}

function FactionLeaf({ faction, army = null, nested = false, onSelect }) {
  const [infoOpen, setInfoOpen] = useState(false);
  const choice = army ?? faction;
  const rules = army?.rules ?? faction;
  return <>
    <div className={`aos-create-faction-row aos-create-faction-leaf${nested ? " aos-create-faction-row--nested" : ""}`} style={choiceArtwork(choice, faction)}>
      <button type="button" className="aos-create-faction-select" onClick={() => onSelect(faction, army)}><span><strong>{choice.name}</strong>{army && <small>Army of Renown</small>}</span></button>
      <button type="button" className="aos-create-card-control" aria-label={`Información de ${choice.name}`} onClick={() => setInfoOpen(true)}><span className="aos-create-card-info">i</span></button>
    </div>
    {infoOpen && <div className="aos-dialog-backdrop" onClick={() => setInfoOpen(false)}><section className="aos-action-dialog aos-faction-info" role="dialog" aria-modal="true" aria-label={choice.name} onClick={(event) => event.stopPropagation()}>
      <header><h2>{choice.name}</h2><button type="button" aria-label="Cerrar" onClick={() => setInfoOpen(false)}>×</button></header>
      {choice.description && <p>{choice.description}</p>}
      <p>{army ? "Army of Renown" : "Ejército"} · {faction.name}</p>
      {(rules.battleTraits ?? []).map((ability, index) => <AbilityCard key={ability.id ?? index} ability={ability} variant="reference" />)}
      <button type="button" onClick={() => onSelect(faction, army)}>Elegir {choice.name}</button>
    </section></div>}
  </>;
}

function choiceArtwork(choice, fallback) {
  const artwork = SELECTOR_ARTWORK[choice?.id] ?? getFactionArtwork(choice) ?? SELECTOR_ARTWORK[fallback?.id] ?? getFactionArtwork(fallback);
  return {
    "--creation-art-image": artwork ? `url("${artwork}")` : "none",
    "--creation-art-position": choice?.id === "fyreslayers" ? "50% 42%" : getFactionArtworkPosition(choice, "card") ?? getFactionArtworkPosition(fallback, "card") ?? "center",
    "--creation-art-size": choice?.id === "fyreslayers" ? "145% auto" : "cover",
  };
}

function ChoiceControl({ expanded }) {
  return <span className="aos-create-card-control" aria-hidden="true">
    {expanded === undefined
      ? <span className="aos-create-card-info">i</span>
      : <OfficialIcon name="chevronDown" size={19} strokeWidth={2.8} className={expanded ? "is-expanded" : ""} />}
  </span>;
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
