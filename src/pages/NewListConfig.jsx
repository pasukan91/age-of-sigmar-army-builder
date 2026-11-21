import { useEffect, useMemo, useState } from "react";
import AbilityCard from "../components/AbilityCard";
import OfficialIcon from "../components/OfficialIcon";
import { createArmyList } from "../models/ArmyList";
import { getFactionArtwork, getFactionArtworkPosition } from "../utils/factionArtwork";

const BATTLEPACKS = [
  { id: "ghb-2026-27", name: "General's Handbook 2026-27", description: "War spreads across the Great Parch of Aqshy like an unstoppable inferno. Build an army for the current matched play season." },
  { id: "ghb-2025-26", name: "General's Handbook 2025-26", description: "Across the densely wooded isle of Neos, potent nexuses of life magic pulse." },
  { id: "ghb-2024-25", name: "General's Handbook 2024-25", description: "The Mortal Realms have been wounded. Use the battlepack from the previous matched play season." },
];
const POINT_LIMITS = [1000, 1500, 2000, 2500, 3000];

function NewListConfig({ army, setArmy, setLists, setCurrentList, setPage, onListCreated, onBack, onCancel }) {
  const [step, setStep] = useState("battlepack");
  const effectiveFaction = useMemo(
    () => ({ ...(army.faction ?? {}), ...(army.armyOfRenown?.rules ?? {}) }),
    [army.armyOfRenown, army.faction]
  );
  const formations = useMemo(
    () => [...(effectiveFaction.battleFormations ?? [])].sort((left, right) => left.name.localeCompare(right.name)),
    [effectiveFaction.battleFormations]
  );
  const artwork = getFactionArtwork(army.faction);

  useEffect(() => {
    const currentState = window.history.state ?? {};
    if (!currentState.creationStep) {
      window.history.replaceState({ ...currentState, creationStep: "battlepack" }, "", window.location.href);
    }
    const handlePopState = (event) => setStep(event.state?.creationStep ?? "battlepack");
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function update(patch) {
    setArmy((previous) => ({ ...previous, ...patch }));
  }

  function handleBack() {
    if (step === "battlepack") return onBack();
    window.history.back();
  }

  function goToStep(nextStep) {
    window.history.pushState(
      { ...(window.history.state ?? {}), creationStep: nextStep },
      "",
      window.location.href
    );
    setStep(nextStep);
  }

  function chooseBattlepack(battlepack) {
    update({ battlepack });
    goToStep("points");
  }

  function choosePoints(points) {
    update({ points });
    goToStep(formations.length ? "formation" : "summary");
  }

  function chooseFormation(battleFormation) {
    update({ battleFormation });
    goToStep("summary");
  }

  function handleCreateList() {
    if (!army.faction || !army.battlepack || (formations.length > 0 && !army.battleFormation)) return;
    const newList = createArmyList({
      name: army.name.trim() || "Unnamed Army",
      faction: army.faction,
      alliance: army.alliance,
      pointsLimit: army.points,
      armyOfRenown: army.armyOfRenown,
      battlepack: army.battlepack,
      battleFormation: army.battleFormation,
    });
    setLists((previousLists) => [...previousLists, newList]);
    setCurrentList(newList);
    onListCreated?.();
    setPage("builder", { listId: newList.id, resetToLists: true });
  }

  const title = { battlepack: "CHOOSE BATTLEPACK", points: "CHOOSE POINTS LIMIT", formation: "CHOOSE BATTLE FORMATION", summary: "STORM FORGE" }[step];

  return (
    <main
      className={`aos-official-page aos-create-config-page aos-creation-flow aos-create-step--${step}`}
      style={["summary", "formation"].includes(step) && artwork ? {
        "--official-faction-art": `url("${artwork}")`,
        "--official-faction-position": getFactionArtworkPosition(army.faction, "builder") ?? "center",
      } : undefined}
    >
      <header className="aos-official-header">
        <button type="button" onClick={handleBack} aria-label="Back"><OfficialIcon name="back" size={25} strokeWidth={2.5} /></button>
        <h1>{title}</h1>
        <button type="button" onClick={onCancel} aria-label="Cancel army creation" className="aos-create-close">×</button>
      </header>

      {step === "battlepack" && (
        <section className="aos-create-choice-page">
          <p className="aos-create-help">Battlepacks provide a framework for your battles and contain additional rules, scenarios and ways to build your army.</p>
          <div className="aos-create-choice-list">
            {BATTLEPACKS.map((battlepack) => (
              <button type="button" key={battlepack.id} onClick={() => chooseBattlepack(battlepack)}>
                <strong>{battlepack.name}</strong><span>{battlepack.description}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {step === "points" && <ChoiceList values={POINT_LIMITS} format={(points) => `${points.toLocaleString("es-ES", { useGrouping: "always" })} Points`} onChoose={choosePoints} />}
      {step === "formation" && <section className="aos-create-choice-page"><div className="aos-formation-choices">
        {formations.map((formation) => <FormationChoice key={formation.id} formation={formation} onChoose={chooseFormation} />)}
      </div></section>}

      {step === "summary" && (
        <section className="aos-create-summary-page">
          <label className="aos-create-summary-name">
            <span>NAME</span>
            <input type="text" maxLength={80} value={army.name} placeholder="Unnamed Army" onChange={(event) => update({ name: event.target.value })} />
          </label>
          <section className="aos-create-summary-army">
            <h2>ARMY</h2>
            <div className="aos-create-summary-faction"><strong>{army.armyOfRenown?.name ?? army.faction?.name}</strong></div>
            <button type="button" onClick={() => goToStep("battlepack")}>{army.battlepack?.name}</button>
            <button type="button" onClick={() => goToStep("points")}>{Number(army.points).toLocaleString("es-ES", { useGrouping: "always" })} Points</button>
            {army.battleFormation && <button type="button" onClick={() => goToStep("formation")}>{army.battleFormation.name}</button>}
          </section>
          <button type="button" className="aos-create-submit" onClick={handleCreateList}>CREATE ARMY</button>
        </section>
      )}
    </main>
  );
}

function ChoiceList({ values, format, onChoose }) {
  return (
    <section className="aos-create-choice-page">
      <div className="aos-create-choice-list aos-create-choice-list--compact">
        {values.map((value) => (
          <button type="button" key={value.id ?? value} onClick={() => onChoose(value)}><strong>{format(value)}</strong></button>
        ))}
      </div>
    </section>
  );
}

function FormationChoice({ formation, onChoose }) {
  const [open, setOpen] = useState(false);
  const abilities = formation.abilities?.length ? formation.abilities : formation.ability ? [formation.ability] : [formation];
  return <article>
    <header>
      <button type="button" aria-label={`Reglas de ${formation.name}`} aria-expanded={open} onClick={() => setOpen((value) => !value)}><OfficialIcon name={open ? "chevronUp" : "chevronDown"} size={20} /></button>
      <button type="button" onClick={() => onChoose(formation)}><strong>{formation.name}</strong></button>
    </header>
    {open && <div>{abilities.map((ability, index) => <AbilityCard key={ability.id ?? index} ability={ability} variant="reference" defaultOpen />)}</div>}
  </article>;
}

export default NewListConfig;
