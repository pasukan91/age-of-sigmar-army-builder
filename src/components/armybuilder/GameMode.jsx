import { normalizeRuleItem } from "../../utils/ruleReferences";
import { getUniqueListUnits } from "../../utils/listWarscrolls";
import UnitArtwork from "../UnitArtwork";
import ArmyRulesReference from "./ArmyRulesReference";
import SelectedRulesLibrary from "./SelectedRulesLibrary";

function GameMode({ list, battleTraits, battleFormation, onViewUnit, onViewRule }) {
  const units = getUniqueListUnits(list);
  const manifestations = getManifestations(list);
  const battleTactics = getBattleTactics(list);
  const warscrollCount = units.length + manifestations.length;

  return (
    <section className="aos-game-mode" aria-labelledby="game-mode-title">
      <header className="aos-game-mode__hero">
        <span className="aos-eyebrow">Mesa de juego</span>
        <h2 id="game-mode-title">Modo partida</h2>
        <p>Ten a mano la misión, tus tácticas, los warscrolls y las reglas que consultarás durante la partida.</p>
      </header>

      <nav className="aos-game-mode__anchors" aria-label="Apartados del modo partida">
        <a href="#game-battle-setup">Misión</a>
        <a href="#game-warscrolls">Warscrolls</a>
        <a href="#game-rules">Reglas</a>
      </nav>

      <section id="game-battle-setup" className="aos-game-section aos-game-battle-setup" aria-labelledby="game-battle-setup-title">
        <div className="aos-game-mode__section-title">
          <h3 id="game-battle-setup-title">Referencia de misión</h3>
          <span>Consulta rápida</span>
        </div>

        <div className="aos-game-tactics-reference">
          <div className="aos-game-reference-heading">
            <span>Mis tácticas de batalla</span>
            <strong>{battleTactics.length}/2</strong>
          </div>
          <div className="aos-game-tactics-reference__grid">
            {battleTactics.map((tactic) => (
              <BattleTacticCard key={tactic.id} tactic={tactic} />
            ))}
            {battleTactics.length === 0 && (
              <BattleTacticCard tactic={null} />
            )}
          </div>
        </div>

        <BattleplanCard battleplan={list?.battleplan} />
      </section>

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
            <p className="aos-empty-message">Añade unidades o manifestaciones para consultarlas durante la partida.</p>
          )}
        </div>
      </section>

      <section id="game-rules" className="aos-game-section aos-game-rules" aria-labelledby="game-rules-title">
        <div className="aos-game-mode__section-title">
          <h3 id="game-rules-title">Reglas</h3>
          <span>Referencia de batalla</span>
        </div>

        <ArmyRulesReference
          battleTraits={battleTraits}
          battleFormation={battleFormation}
        />

        <SelectedRulesLibrary
          list={list}
          onViewRule={onViewRule}
        />
      </section>

    </section>
  );
}

function BattleplanCard({ battleplan }) {
  if (!battleplan) {
    return <EmptyBattleCard title="Battleplan" message="Selecciona un battleplan en la pestaña Lista." />;
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

function BattleTacticCard({ tactic }) {
  if (!tactic) {
    return <EmptyBattleCard title="Battle tactics" message="Selecciona hasta 2 battle tactics en la pestaña Lista." />;
  }

  return (
    <article className="aos-game-battle-card aos-game-tactic-reference">
      <header className="aos-game-battle-card__header">
        <div className="aos-game-battle-card__tactic-heading">
          <small>Carta {tactic.cardNumber} · {tactic.type}</small>
          <b>{tactic.points} PV</b>
        </div>
        <h4>{tactic.name}</h4>
        {tactic.flavour && <p>{tactic.flavour}</p>}
      </header>
      <div className="aos-game-tactic-reference__condition">
        <strong>Cómo completarla</strong>
        <p>{tactic.condition}</p>
      </div>
    </article>
  );
}

function EmptyBattleCard({ title, message }) {
  return (
    <article className="aos-game-battle-card is-empty">
      <small>{title}</small>
      <p>{message}</p>
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

export default GameMode;
