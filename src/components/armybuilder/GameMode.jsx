import { normalizeRuleItem } from "../../utils/ruleReferences";
import { getUniqueListUnits } from "../../utils/listWarscrolls";
import UnitArtwork from "../UnitArtwork";

function GameMode({ list, onViewUnit, onViewRule, onGoToUnits, onGoToArmy }) {
  const units = getUniqueListUnits(list);
  const manifestations = getManifestations(list);
  const terrain = list?.terrain ? normalizeRuleItem(list.terrain) : null;
  const warscrollCount = units.length + manifestations.length;

  return (
    <section className="aos-game-mode" aria-labelledby="game-mode-title">
      <header className="aos-game-mode__hero">
        <span className="aos-eyebrow">Mesa de juego</span>
        <h2 id="game-mode-title">Modo partida</h2>
        <p>Ten a mano los warscrolls, manifestaciones y terreno que consultarás durante la partida.</p>
      </header>

      <nav className="aos-game-mode__anchors" aria-label="Apartados del modo partida">
        <a href="#game-warscrolls">Warscrolls</a>
        <a href="#game-terrain">Terreno</a>
      </nav>

      <section id="game-warscrolls" className="aos-game-section aos-game-roster" aria-labelledby="game-roster-title">
        <div className="aos-game-mode__section-title">
          <h3 id="game-roster-title">Warscrolls del ejército</h3>
          <span>{warscrollCount} {warscrollCount === 1 ? "ficha" : "fichas"}</span>
        </div>

        <div className="aos-game-roster__grid">
          {units.map((unit) => (
            <WarscrollCard
              key={unit.instanceId ?? unit.id}
              artwork={<UnitArtwork unit={unit} />}
              type="Unidad"
              name={unit.name}
              summary={`${unit.points ?? 0} pts`}
              details={`${unit.profile?.health ?? "-"} salud · ${unit.profile?.save ?? "-"} salvación`}
              onClick={() => onViewUnit?.(unit)}
            />
          ))}

          {manifestations.map((manifestation) => (
            <WarscrollCard
              key={`manifestation-${manifestation.id}`}
              image={manifestation.image}
              type="Manifestación"
              name={manifestation.name}
              summary={`Invocación ${manifestation.castingValue ?? "-"}+`}
              details={`${manifestation.profile?.health ?? "-"} salud · Destierro ${manifestation.profile?.banishment ?? "-"}`}
              fallback="✦"
              onClick={() => onViewRule?.({
                kind: "manifestation",
                item: manifestation,
                sourceName: list?.manifestationLore?.name,
              })}
            />
          ))}

          {warscrollCount === 0 && (
            <div className="aos-empty-message aos-empty-message--actionable">
              <p>Añade unidades o manifestaciones para consultarlas durante la partida.</p>
              <button type="button" onClick={onGoToUnits}>Añadir unidades</button>
            </div>
          )}
        </div>
      </section>

      <section id="game-terrain" className="aos-game-section aos-game-terrain" aria-labelledby="game-terrain-title">
        <div className="aos-game-mode__section-title">
          <h3 id="game-terrain-title">Terreno de facción</h3>
          <span>{terrain ? "Seleccionado" : "Sin seleccionar"}</span>
        </div>

        <div className="aos-game-roster__grid">
          {terrain ? (
            <WarscrollCard
              image={terrain.image}
              type="Terreno de facción"
              name={terrain.name}
              summary={`${terrain.profile?.health ?? "-"} salud`}
              details={`${terrain.profile?.save ?? "-"} salvación · ${terrain.profile?.control ?? "-"} control`}
              fallback="◆"
              onClick={() => onViewRule?.({
                kind: "terrain",
                item: terrain,
                sourceName: list?.faction?.name,
              })}
            />
          ) : (
            <div className="aos-empty-message aos-empty-message--actionable">
              <p>Selecciona el terreno de tu facción para tener su ficha disponible durante la partida.</p>
              <button type="button" onClick={onGoToArmy}>Elegir terreno</button>
            </div>
          )}
        </div>
      </section>

    </section>
  );
}

function BattleMission({ list, onToggleMission, onGoToArmy }) {
  const battleTactics = getBattleTactics(list);
  const completedMissions = new Set(list?.completedBattleMissions ?? []);

  return (
    <section className="aos-game-mode aos-mission-mode" aria-labelledby="mission-mode-title">
      <header className="aos-game-mode__hero">
        <span className="aos-eyebrow">Objetivos de batalla</span>
        <h2 id="mission-mode-title">Misión</h2>
        <p>Consulta el plan de batalla, la puntuación y las tácticas elegidas sin mezclarlas con las fichas del ejército.</p>
      </header>

      <section id="game-battle-setup" className="aos-game-section aos-game-battle-setup" aria-labelledby="game-battle-setup-title">
        <div className="aos-game-mode__section-title">
          <h3 id="game-battle-setup-title">Plan y tácticas de batalla</h3>
          <span>Consulta rápida</span>
        </div>

        <div className="aos-game-tactics-reference">
          <div className="aos-game-reference-heading">
            <span>Mis tácticas de batalla</span>
            <strong>{battleTactics.length}/2</strong>
          </div>
          <div className="aos-game-tactics-reference__grid">
            {battleTactics.map((card) => (
              <BattleTacticsCard
                key={card.id}
                card={card}
                completedMissions={completedMissions}
                onToggleMission={onToggleMission}
              />
            ))}
            {battleTactics.length === 0 && (
              <BattleTacticsCard card={null} onGoToArmy={onGoToArmy} />
            )}
          </div>
        </div>

        <BattleplanCard battleplan={list?.battleplan} onGoToArmy={onGoToArmy} />
      </section>
    </section>
  );
}

function BattleplanCard({ battleplan, onGoToArmy }) {
  if (!battleplan) {
    return <EmptyBattleCard title="Plan de batalla" message="Esta lista no tiene un plan de batalla asociado." action="Elegir plan de batalla" onAction={onGoToArmy} />;
  }

  return (
    <article className="aos-game-battle-card aos-game-battleplan-reference">
      <header className="aos-game-battle-card__header">
        <small>Plan de batalla {battleplan.number} · Tabla {battleplan.table}</small>
        <h4>{battleplan.name}</h4>
      </header>

      <section className="aos-game-scoring-reference" aria-labelledby="game-scoring-title">
        <div className="aos-game-reference-heading">
          <span id="game-scoring-title">Puntuación al final de tu turno</span>
          <strong>PV</strong>
        </div>
        <ul>
          {(battleplan.scoring ?? []).map((condition) => (
            <li key={condition}>
              <b>{getVictoryPoints(condition)} PV</b>
              <span>{condition}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="aos-game-battleplan-reference__body">
        <div className="aos-game-battle-card__content">
        {(battleplan.sections ?? []).map((item, index) => (
          <section className="aos-game-rule-panel" key={`${item.label}-${item.title ?? index}`}>
            <div className="aos-game-rule-panel__label">
              <span>{item.label}</span>
              {item.timing && <em>{item.timing}</em>}
            </div>
            {item.title && <h5>{item.title}</h5>}
            <p>{item.text}</p>
          </section>
        ))}
        </div>

        {battleplan.image && (
          <details className={`aos-game-battleplan-map${battleplan.number === 6 ? " is-photo" : ""}`}>
            <summary>Ver mapa del despliegue</summary>
            <img src={battleplan.image} alt={`Mapa de despliegue de ${battleplan.name}`} />
          </details>
        )}
      </div>
    </article>
  );
}

function BattleTacticsCard({ card, completedMissions = new Set(), onToggleMission, onGoToArmy }) {
  if (!card) {
    return <EmptyBattleCard title="Tácticas de batalla" message="Esta lista no tiene cartas de táctica asociadas." action="Elegir tácticas" onAction={onGoToArmy} />;
  }

  return (
    <article className="aos-game-battle-card aos-game-tactic-reference">
      <header className="aos-game-battle-card__header">
        <small>Carta de táctica {card.number}</small>
        <h4>{card.name}</h4>
        {card.introduction && <p>{card.introduction}</p>}
      </header>

      {card.setup && (
        <section className="aos-game-rule-panel">
          <div className="aos-game-rule-panel__label">
            <span>Preparación de batalla</span>
          </div>
          <p>{card.setup}</p>
        </section>
      )}

      <div className="aos-game-tactic-reference__missions">
        <strong>Misiones de la carta</strong>
        {(card.tactics ?? []).map((tactic) => {
          const missionId = `${card.id}:${tactic.id}`;
          const completed = completedMissions.has(missionId);

          return (
          <label className={`aos-game-battle-card__tactic${completed ? " is-completed" : ""}`} key={tactic.id}>
            <input
              type="checkbox"
              checked={completed}
              onChange={(event) => onToggleMission?.(missionId, event.target.checked)}
              aria-label={`Marcar ${tactic.name} como completada`}
            />
            <span className="aos-game-mission-check" aria-hidden="true">✓</span>
            <div className="aos-game-battle-card__tactic-content">
              <div className="aos-game-battle-card__tactic-heading">
                <span>{tactic.type}</span>
                <b>{tactic.points} PV</b>
              </div>
              <strong>{tactic.name}</strong>
              {tactic.flavour && <em>{tactic.flavour}</em>}
              <p>{tactic.condition}</p>
            </div>
          </label>
          );
        })}
      </div>
    </article>
  );
}

function EmptyBattleCard({ title, message, action, onAction }) {
  return (
    <article className="aos-game-battle-card is-empty">
      <small>{title}</small>
      <p>{message}</p>
      {action && <button type="button" onClick={onAction}>{action}</button>}
    </article>
  );
}

function WarscrollCard({ artwork, image, type, name, summary, details, fallback = "⚔", onClick }) {
  return (
    <button type="button" onClick={onClick}>
      <span className="aos-game-roster__artwork">
        {artwork ?? (image ? <img src={image} alt="" loading="lazy" /> : <i aria-hidden="true">{fallback}</i>)}
      </span>
      <span className="aos-game-roster__body">
        <small className="aos-game-roster__type">{type}</small>
        <strong>{name}</strong>
        <span className="aos-game-roster__summary">{summary}</span>
        <small>{details}</small>
      </span>
    </button>
  );
}

function getManifestations(list) {
  return (list?.manifestationLore?.manifestations ?? [])
    .map(normalizeRuleItem)
    .filter((manifestation) => manifestation?.name);
}

function getBattleTactics(list) {
  return Array.isArray(list?.battleTactics)
    ? list.battleTactics
    : list?.battleTactics
      ? [list.battleTactics]
      : [];
}

function getVictoryPoints(condition) {
  return condition.match(/obtienes (\d+) puntos? de victoria/i)?.[1] ?? "–";
}

export { BattleMission };
export default GameMode;
