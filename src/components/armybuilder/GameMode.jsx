import { useMemo, useState } from "react";
import {
  universalAbilities,
  universalCommands,
} from "../../data/universalRules";

const PHASES = [
  ["all", "Todas"],
  ["start", "Inicio"],
  ["hero", "Héroe"],
  ["movement", "Movimiento"],
  ["shooting", "Disparo"],
  ["charge", "Carga"],
  ["combat", "Combate"],
  ["end", "Final"],
  ["passive", "Pasivas"],
];

function GameMode({ list, onViewUnit, onViewRule }) {
  const [phase, setPhase] = useState("all");
  const references = useMemo(() => buildGameReferences(list), [list]);
  const visible = phase === "all"
    ? references
    : references.filter((item) => getPhaseKey(item.phase) === phase);

  return (
    <section className="aos-game-mode" aria-labelledby="game-mode-title">
      <header className="aos-game-mode__hero">
        <span className="aos-eyebrow">Mesa de juego</span>
        <h2 id="game-mode-title">Modo partida</h2>
        <p>Solo las miniaturas, mejoras y reglas que forman parte de esta lista.</p>
      </header>

      <section className="aos-game-roster" aria-labelledby="game-roster-title">
        <div className="aos-game-mode__section-title">
          <h3 id="game-roster-title">Warscrolls del ejército</h3>
          <span>{getListUnits(list).length} unidades</span>
        </div>
        <div className="aos-game-roster__grid">
          {getListUnits(list).map((unit) => (
            <button type="button" key={unit.instanceId ?? unit.id} onClick={() => onViewUnit?.(unit)}>
              <strong>{unit.name}</strong>
              <span>{unit.points ?? 0} pts</span>
              <small>{unit.profile?.health ?? "-"} salud · {unit.profile?.save ?? "-"} salvación</small>
            </button>
          ))}
        </div>
      </section>

      <div className="aos-game-mode__section-title">
        <h3>Referencia por fase</h3>
        <span>{visible.length} reglas</span>
      </div>

      <div className="aos-game-mode__phases" aria-label="Filtrar por fase">
        {PHASES.map(([id, label]) => (
          <button type="button" key={id} className={phase === id ? "is-active" : ""} onClick={() => setPhase(id)}>
            {label}
          </button>
        ))}
      </div>

      <div className="aos-game-mode__rules">
        {visible.map((reference) => (
          <button type="button" key={reference.id} onClick={() => onViewRule?.(reference)}>
            <span>
              <small>{reference.phase || "Pasiva"} · {reference.sourceName}</small>
              <strong>{reference.item.name}</strong>
              <p>{reference.item.description}</p>
            </span>
            <i aria-hidden="true">›</i>
          </button>
        ))}
        {visible.length === 0 && <p className="aos-empty-message">No hay reglas para esta fase.</p>}
      </div>
    </section>
  );
}

function getListUnits(list) {
  return (list?.regiments ?? []).flatMap((regiment) => [
    regiment.hero,
    ...(regiment.units ?? []),
  ]).filter(Boolean);
}

function buildGameReferences(list) {
  const faction = { ...(list?.faction ?? {}), ...(list?.armyOfRenown?.rules ?? {}) };
  const references = [];
  const add = (item, kind, sourceName) => {
    if (!item?.name || !item?.description) return;
    references.push({
      id: `${kind}:${item.id ?? item.name}:${sourceName}`,
      kind,
      item,
      phase: item.phase ?? null,
      sourceName,
    });
  };

  (faction.battleTraits ?? []).forEach((item) => add(item, "battleTrait", "Ejército"));
  if (list?.battleFormation) add(list.battleFormation.ability ?? list.battleFormation, "formation", list.battleFormation.name);
  (list?.spellLore?.spells ?? []).forEach((item) => add(item, "spell", list.spellLore.name));
  (list?.prayerLore?.prayers ?? []).forEach((item) => add(item, "prayer", list.prayerLore.name));
  (list?.manifestationLore?.manifestations ?? []).forEach((item) => add(item.summonSpell ?? item, "manifestation", list.manifestationLore.name));
  (list?.terrain?.abilities ?? []).forEach((item) => add(item, "terrain", list.terrain.name));

  getListUnits(list).forEach((unit) => {
    (unit.abilities ?? []).forEach((item) => add(item, "ability", unit.name));
    ["heroicTrait", "monstrousTrait", "artefact", "allConsumingObsession", "moulderMutation", "mortisanRefinement", "originOfTerrifyingFolkTale", "visionOfFate", "specialKnickKnack", "flawlessManoeuvre", "plaguefathersPox", "decorationForValour", "ironweldInnovation", "accursedDevice", "brazenMutation", "brandOfDarkGod", "ensorcelledBanner"].forEach((field) => {
      if (unit[field]) add(unit[field], "enhancement", unit.name);
    });
  });

  universalAbilities.forEach((item) => add(item, "universal", "Universal"));
  universalCommands.forEach((item) => add(item, "universal", "Comando universal"));

  return references.sort((left, right) => phaseOrder(left.phase) - phaseOrder(right.phase));
}

function getPhaseKey(value) {
  const phase = String(value ?? "").toLowerCase();
  if (!phase || phase.includes("passive")) return "passive";
  if (phase.includes("start")) return "start";
  if (phase.includes("hero")) return "hero";
  if (phase.includes("movement")) return "movement";
  if (phase.includes("shoot")) return "shooting";
  if (phase.includes("charge")) return "charge";
  if (phase.includes("combat")) return "combat";
  if (phase.includes("end")) return "end";
  return "passive";
}

function phaseOrder(value) {
  return PHASES.findIndex(([id]) => id === getPhaseKey(value));
}

export default GameMode;

