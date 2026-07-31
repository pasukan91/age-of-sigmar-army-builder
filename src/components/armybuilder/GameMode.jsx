import { normalizeRuleItem } from "../../utils/ruleReferences";
import { getUniqueListUnits } from "../../utils/listWarscrolls";
import UnitArtwork from "../UnitArtwork";
import ArmyRulesReference from "./ArmyRulesReference";
import SelectedRulesLibrary from "./SelectedRulesLibrary";

function GameMode({ list, battleTraits, battleFormation, onViewUnit, onViewRule }) {
  const units = getUniqueListUnits(list);
  const manifestations = getManifestations(list);
  const warscrollCount = units.length + manifestations.length;

  return (
    <section className="aos-game-mode" aria-labelledby="game-mode-title">
      <header className="aos-game-mode__hero">
        <span className="aos-eyebrow">Mesa de juego</span>
        <h2 id="game-mode-title">Modo partida</h2>
        <p>Consulta rápidamente los warscrolls y manifestaciones que forman parte de esta lista.</p>
      </header>

      <nav className="aos-game-mode__anchors" aria-label="Apartados del modo partida">
        <a href="#game-warscrolls">Warscrolls</a>
        <a href="#game-rules">Reglas</a>
        <a href="#game-battle-setup">Battleplan y tácticas</a>
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

      <section id="game-battle-setup" className="aos-game-section aos-game-battle-setup" aria-labelledby="game-battle-setup-title">
        <div className="aos-game-mode__section-title">
          <h3 id="game-battle-setup-title">Battleplan y battle tactics</h3>
          <span>Partida seleccionada</span>
        </div>

        <div className="aos-game-battle-setup__grid">
          <BattleplanCard battleplan={list?.battleplan} />
          <BattleTacticsCard card={list?.battleTactics} />
        </div>
      </section>
    </section>
  );
}

function BattleplanCard({ battleplan }) {
  if (!battleplan) {
    return <EmptyBattleCard title="Battleplan" message="Selecciona un battleplan en la pestaña Lista." />;
  }

  return (
    <article className="aos-game-battle-card aos-game-battle-card--map">
      <header className="aos-game-battle-card__header">
        <small>Battle Plan {battleplan.number} · Table {battleplan.table}</small>
        <h4>{battleplan.name}</h4>
      </header>
      {battleplan.image && <img src={battleplan.image} alt={`${battleplan.name} battleplan map`} />}
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

        <section className="aos-game-rule-panel aos-game-rule-panel--scoring">
          <div className="aos-game-rule-panel__label">
            <span>Victory points</span>
          </div>
          <p>Each player scores victory points at the end of each of their turns as follows:</p>
          <ul>
            {(battleplan.scoring ?? []).map((condition) => <li key={condition}>{condition}</li>)}
          </ul>
        </section>
      </div>
    </article>
  );
}

function BattleTacticsCard({ card }) {
  if (!card) {
    return <EmptyBattleCard title="Battle tactics" message="Selecciona una carta de battle tactics en la pestaña Lista." />;
  }

  return (
    <article className="aos-game-battle-card">
      <header className="aos-game-battle-card__header">
        <small>Battle Tactics Card {card.number}</small>
        <h4>{card.name}</h4>
        {card.introduction && <p>{card.introduction}</p>}
      </header>
      {card.setup && (
        <section className="aos-game-rule-panel">
          <div className="aos-game-rule-panel__label"><span>Battle setup</span></div>
          <p>{card.setup}</p>
        </section>
      )}
      {(card.tactics ?? []).map((tactic) => (
        <div className="aos-game-battle-card__tactic" key={`${tactic.type}-${tactic.name}`}>
          <div className="aos-game-battle-card__tactic-heading">
            <span>{tactic.type}</span>
            <b>{tactic.points} VP</b>
          </div>
          <strong>{tactic.name}</strong>
          {tactic.flavour && <em>{tactic.flavour}</em>}
          <p>{tactic.condition}</p>
        </div>
      ))}
      {!card.tactics?.length && <p>{card.description}</p>}
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

export default GameMode;
