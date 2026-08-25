import { useState } from "react";
import { MAX_BATTLE_LOG_TEXT_LENGTH } from "../../utils/battleLogLimits";

import { normalizeRuleItem } from "../../utils/ruleReferences";
import { getListUnitInstances } from "../../utils/listWarscrolls";
import {
  getBattleUnitState,
  getUnitStartingModels,
  MAX_CUSTOM_MODIFIER_LENGTH,
  MAX_CUSTOM_MODIFIERS,
  POSITIVE_UNIT_MODIFIERS,
} from "../../utils/battleUnitState";
import {
  BATTLE_ACTORS,
  BATTLE_EVENT_DEFINITIONS,
  BATTLE_STAT_GROUPS,
  getBattleRateMetrics,
  getBattleEventDefinition,
  summarizeBattleLog,
} from "../../utils/battleStatistics";
import {
  formatBattleStatisticsCsv,
  getBattleStatisticsFilename,
} from "../../utils/battleStatisticsExport";
import UnitArtwork from "../UnitArtwork";

function GameMode({
  list,
  onViewUnit,
  onViewRule,
  onGoToUnits,
  onGoToArmy,
  onRoundChange,
  onTurnChange,
  onInitiativeResolve,
  onLogAdd,
  onLogRemove,
  onUnitStateChange,
}) {
  const unitInstances = getListUnitInstances(list);
  const manifestations = getManifestations(list);
  const terrain = list?.terrain ? normalizeRuleItem(list.terrain) : null;
  const warscrollCount = unitInstances.length + manifestations.length;

  return (
    <section className="aos-game-mode" aria-labelledby="game-mode-title">
      <header className="aos-game-mode__hero">
        <span className="aos-eyebrow">Mesa de juego</span>
        <h2 id="game-mode-title">Modo partida</h2>
        <p>Controla cada unidad por separado: abre su warscroll, anota bajas y aplica bonificadores durante la partida.</p>
      </header>

      <nav className="aos-game-mode__anchors" aria-label="Apartados del modo partida">
        <a href="#game-warscrolls">Warscrolls</a>
        <a href="#game-terrain">Terreno</a>
        <a href="#game-battle-log">Registro</a>
      </nav>

      <div className="aos-game-round-change">
        <div>
          <small>Ronda actual</small>
          <strong>{list?.battleRound ?? 1} de 5</strong>
          <span>Conserva las bajas y elimina todos los modificadores temporales.</span>
        </div>
        <button
          type="button"
          onClick={() => onRoundChange?.(Math.min(5, Number(list?.battleRound ?? 1) + 1))}
          disabled={Number(list?.battleRound ?? 1) >= 5}
        >
          <span aria-hidden="true">↻</span>
          Cambio de ronda
        </button>
      </div>

      <section id="game-warscrolls" className="aos-game-section aos-game-roster" aria-labelledby="game-roster-title">
        <div className="aos-game-mode__section-title">
          <h3 id="game-roster-title">Warscrolls del ejército</h3>
          <span>{warscrollCount} {warscrollCount === 1 ? "ficha" : "fichas"}</span>
        </div>

        <div className="aos-game-roster__grid">
          {unitInstances.map((instance) => (
            <GameUnitCard
              key={instance.key}
              instance={instance}
              value={list?.battleUnitStates?.[instance.key]}
              onView={() => onViewUnit?.(instance.unit)}
              onChange={(nextState) => onUnitStateChange?.(instance.key, nextState)}
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

      <BattleLog
        entries={list?.battleLog ?? []}
        listName={list?.name}
        round={list?.battleRound ?? 1}
        turnActor={list?.battleTurnActor ?? "self"}
        onRoundChange={onRoundChange}
        onTurnChange={onTurnChange}
        onInitiativeResolve={onInitiativeResolve}
        onAdd={onLogAdd}
        onRemove={onLogRemove}
      />

    </section>
  );
}

function GameUnitCard({ instance, value, onView, onChange }) {
  const [modifiersOpen, setModifiersOpen] = useState(false);
  const [customModifier, setCustomModifier] = useState("");
  const { unit, groupLabel, roleLabel, copyIndex, copyCount } = instance;
  const startingModels = getUnitStartingModels(unit);
  const state = getBattleUnitState(value, unit);
  const activeModifiers = POSITIVE_UNIT_MODIFIERS.filter((modifier) =>
    state.modifiers.includes(modifier.id)
  );
  const activeModifierCount = activeModifiers.length + state.customModifiers.length;

  function setRemainingModels(nextValue) {
    const remainingModels = Math.min(
      startingModels,
      Math.max(0, Math.floor(Number(nextValue) || 0)),
    );
    onChange?.({ ...state, remainingModels });
  }

  function toggleModifier(modifierId) {
    const modifiers = state.modifiers.includes(modifierId)
      ? state.modifiers.filter((id) => id !== modifierId)
      : [...state.modifiers, modifierId];
    onChange?.({ ...state, modifiers });
  }

  function addCustomModifier(event) {
    event.preventDefault();
    const label = customModifier.replace(/\s+/g, " ").trim();
    if (!label || state.customModifiers.length >= MAX_CUSTOM_MODIFIERS || state.customModifiers.some(
      (modifier) => modifier.toLocaleLowerCase("es") === label.toLocaleLowerCase("es")
    )) return;

    onChange?.({
      ...state,
      customModifiers: [...state.customModifiers, label],
    });
    setCustomModifier("");
  }

  function removeCustomModifier(label) {
    onChange?.({
      ...state,
      customModifiers: state.customModifiers.filter((modifier) => modifier !== label),
    });
  }

  function toggleCombat() {
    onChange?.({ ...state, inCombat: !state.inCombat });
  }

  function handleCardClick(event) {
    if (event.target.closest("button, input, form, label")) return;
    toggleCombat();
  }

  const copyLabel = copyCount > 1 ? ` · Copia ${copyIndex} de ${copyCount}` : "";

  return (
    <article
      className={`aos-game-unit-card${state.remainingModels === 0 ? " is-destroyed" : ""}${state.inCombat ? " is-in-combat" : ""}`}
      onClick={handleCardClick}
      data-combat-state={state.inCombat ? "active" : "inactive"}
    >
      <button
        type="button"
        className="aos-game-unit-card__warscroll"
        onClick={onView}
        aria-label={`Abrir warscroll de ${unit.name}, ${groupLabel}${copyLabel}`}
      >
        <UnitArtwork unit={unit} />
        <span>Ver warscroll</span>
      </button>

      <div className="aos-game-unit-card__content">
        <div className="aos-game-unit-card__heading">
          <div className="aos-game-unit-card__heading-row">
            <small>{groupLabel} · {roleLabel}{copyLabel}</small>
            <button
              type="button"
              className="aos-game-unit-card__combat-toggle"
              onClick={toggleCombat}
              aria-pressed={state.inCombat}
              aria-label={`${state.inCombat ? "Quitar de combate" : "Marcar en combate"}: ${unit.name}`}
            >
              <span aria-hidden="true">⚔</span>
              {state.inCombat ? "En combate" : "Marcar combate"}
            </button>
          </div>
          <strong>{unit.name}</strong>
          <span>{unit.points ?? 0} pts · {unit.profile?.health ?? "-"} salud · {unit.profile?.save ?? "-"} salvación</span>
        </div>

        <div className="aos-game-unit-card__models">
          <label htmlFor={`remaining-models-${instance.key}`}>Miniaturas restantes</label>
          <div className="aos-game-unit-card__counter">
            <button
              type="button"
              onClick={() => setRemainingModels(state.remainingModels - 1)}
              disabled={state.remainingModels === 0}
              aria-label={`Restar una miniatura a ${unit.name}`}
            >−</button>
            <input
              id={`remaining-models-${instance.key}`}
              type="number"
              inputMode="numeric"
              min="0"
              max={startingModels}
              value={state.remainingModels}
              onChange={(event) => setRemainingModels(event.target.value)}
              aria-describedby={`starting-models-${instance.key}`}
            />
            <span id={`starting-models-${instance.key}`}>/ {startingModels}</span>
            <button
              type="button"
              onClick={() => setRemainingModels(state.remainingModels + 1)}
              disabled={state.remainingModels === startingModels}
              aria-label={`Añadir una miniatura a ${unit.name}`}
            >+</button>
          </div>
        </div>

        {activeModifierCount > 0 && (
          <div className="aos-game-unit-card__active" aria-label="Modificadores activos">
            {activeModifiers.map((modifier) => (
              <button
                type="button"
                key={modifier.id}
                onClick={() => toggleModifier(modifier.id)}
                aria-label={`Desactivar ${modifier.label}`}
              >
                {modifier.shortLabel} <span aria-hidden="true">×</span>
              </button>
            ))}
            {state.customModifiers.map((modifier) => (
              <button
                type="button"
                key={modifier}
                onClick={() => removeCustomModifier(modifier)}
                aria-label={`Desactivar ${modifier}`}
              >
                {modifier} <span aria-hidden="true">×</span>
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          className="aos-game-unit-card__modifier-toggle"
          onClick={() => setModifiersOpen((current) => !current)}
          aria-expanded={modifiersOpen}
        >
          <span aria-hidden="true">＋</span>
          {activeModifierCount > 0
            ? `Modificadores (${activeModifierCount})`
            : "Añadir modificadores"}
        </button>

        {modifiersOpen && (
          <div className="aos-game-unit-card__modifiers">
            <p>Bonificadores activos para esta copia:</p>
            <div className="aos-game-unit-card__quick-modifiers">
              {POSITIVE_UNIT_MODIFIERS.map((modifier) => {
                const active = state.modifiers.includes(modifier.id);
                return (
                  <button
                    type="button"
                    key={modifier.id}
                    className={active ? "is-active" : ""}
                    aria-pressed={active}
                    onClick={() => toggleModifier(modifier.id)}
                  >
                    <span aria-hidden="true">{active ? "✓" : "+"}</span>
                    {modifier.label}
                  </button>
                );
              })}
            </div>
            <form className="aos-game-unit-card__custom-modifier" onSubmit={addCustomModifier}>
              <label htmlFor={`custom-modifier-${instance.key}`}>Modificador personalizado</label>
              <div>
                <input
                  id={`custom-modifier-${instance.key}`}
                  type="text"
                  value={customModifier}
                  maxLength={MAX_CUSTOM_MODIFIER_LENGTH}
                  placeholder="Ej.: Ataca primero"
                  onChange={(event) => setCustomModifier(event.target.value)}
                />
                <button
                  type="submit"
                  disabled={!customModifier.trim() || state.customModifiers.length >= MAX_CUSTOM_MODIFIERS}
                >Añadir</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </article>
  );
}

function BattleLog({ entries, listName, round, turnActor, onRoundChange, onTurnChange, onInitiativeResolve, onAdd, onRemove }) {
  const [actionId, setActionId] = useState("redeploy");
  const [values, setValues] = useState(() => defaultBattleValues(getBattleEventDefinition("redeploy")));
  const [note, setNote] = useState("");
  const [statisticsRound, setStatisticsRound] = useState("all");
  const action = getBattleEventDefinition(actionId);
  const actor = turnActor;

  function selectTurnActor(nextActor) {
    onTurnChange?.(nextActor);
  }

  function addEntry(nextValues = values) {
    const cleanValues = Object.fromEntries(
      Object.entries(nextValues).filter(([, value]) => String(value ?? "").trim() !== "")
    );
    const cleanNote = note.trim();
    if (action.id === "note" && !cleanNote) return;
    if (action.fields.length > 0 && Object.keys(cleanValues).length === 0 && !cleanNote) return;

    onAdd?.({
      actionId: action.id,
      actor,
      label: action.label,
      result: formatBattleEventResult(action, cleanValues),
      note: cleanNote,
      values: cleanValues,
      round,
    });
    setValues(defaultBattleValues(action));
    setNote("");
  }

  function selectAction(nextActionId) {
    setActionId(nextActionId);
    setValues(defaultBattleValues(getBattleEventDefinition(nextActionId)));
  }

  function changeValue(fieldId, value) {
    setValues((current) => ({ ...current, [fieldId]: value }));
  }

  return (
    <section id="game-battle-log" className="aos-game-section aos-battle-log" aria-labelledby="game-battle-log-title">
      <div className="aos-game-mode__section-title aos-battle-log__heading">
        <div>
          <h3 id="game-battle-log-title">Registro de batalla</h3>
          <p>Anota tiradas y momentos clave sin salir de la partida.</p>
        </div>
        <div className="aos-battle-log__round" aria-label={`Ronda de batalla ${round}`}>
          <button type="button" onClick={() => onRoundChange?.(round - 1)} disabled={round <= 1} aria-label="Ronda anterior">−</button>
          <span><small>Ronda de batalla</small><strong>{round}</strong></span>
          <button type="button" onClick={() => onRoundChange?.(round + 1)} disabled={round >= 5} aria-label="Ronda siguiente">+</button>
        </div>
      </div>

      <div className="aos-battle-log__composer">
        <span className="aos-battle-log__turn-label">Turno activo</span>
        <div className="aos-battle-log__actors" role="group" aria-label="Turno activo">
          {BATTLE_ACTORS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === actor ? "is-active" : ""}
              onClick={() => selectTurnActor(item.id)}
              aria-pressed={item.id === actor}
            >
              {item.label}
            </button>
          ))}
        </div>

        <label className="aos-battle-log__event-picker">
          <span>¿Qué ha pasado?</span>
          <select value={actionId} onChange={(event) => selectAction(event.target.value)}>
            {groupBattleEvents().map(([group, actions]) => (
              <optgroup key={group} label={group}>
                {actions.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
              </optgroup>
            ))}
          </select>
        </label>

        {action.quickDice && (
          <div className="aos-battle-log__dice" aria-label="Resultado de la tirada">
            {Array.from({ length: action.quickDice }, (_, index) => index + 1).map((value) => (
              <button key={value} type="button" onClick={() => addEntry({ ...values, roll: value })} aria-label={`Registrar ${action.label}: ${value}`}>
                {value}
              </button>
            ))}
          </div>
        )}

        <form
          className="aos-battle-log__form"
          onSubmit={(event) => {
            event.preventDefault();
            addEntry();
          }}
        >
          {action.fields.length > 0 && !action.quickDice && (
            <div className="aos-battle-log__fields">
              {action.fields.map((field) => (
                <label key={field.id}>
                  <span>{field.label}</span>
                  {field.type === "choice" ? (
                    <select value={values[field.id] ?? ""} onChange={(event) => changeValue(field.id, event.target.value)}>
                      {field.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                  ) : (
                    <input
                      inputMode="numeric"
                      type="number"
                      min="0"
                      value={values[field.id] ?? ""}
                      onChange={(event) => changeValue(field.id, event.target.value)}
                      placeholder="0"
                    />
                  )}
                </label>
              ))}
            </div>
          )}
          <label className="aos-battle-log__note">
            <span>{action.id === "note" ? "Qué ha pasado" : "Unidad o detalle opcional"}</span>
            <input
              value={note}
              maxLength={MAX_BATTLE_LOG_TEXT_LENGTH}
              onChange={(event) => setNote(event.target.value)}
              placeholder={action.id === "redeploy" ? "Ej.: Ardboys tras la ruina" : "Añadir contexto…"}
            />
          </label>
          <button type="submit" className="aos-battle-log__save">Guardar</button>
        </form>
      </div>

      <InitiativePanel
        round={round}
        lastTurnActor={turnActor}
        onResolve={onInitiativeResolve}
      />

      {entries.length > 0 && (
        <BattleStatistics
          entries={entries}
          listName={listName}
          selectedRound={statisticsRound}
          onRoundChange={setStatisticsRound}
        />
      )}

      <ol className="aos-battle-log__timeline" aria-live="polite">
        {entries.length === 0 && (
          <li className="is-empty">Todavía no has registrado ningún evento.</li>
        )}
        {entries.map((entry) => (
          <li key={entry.id}>
            <span className="aos-battle-log__marker" aria-hidden="true" />
            <article>
              <header>
                <span><b className={`aos-battle-log__actor ${entry.actor === "opponent" ? "is-opponent" : ""}`}>{entry.actor === "opponent" ? "Rival" : "Yo"}</b> · Ronda {entry.round ?? 1}</span>
                <time dateTime={new Date(entry.createdAt).toISOString()}>{formatBattleLogTime(entry.createdAt)}</time>
              </header>
              <div className="aos-battle-log__event">
                <strong>{entry.label}</strong>
                {entry.result && <b>{entry.result}</b>}
              </div>
              {entry.note && <p>{entry.note}</p>}
            </article>
            <button type="button" className="aos-battle-log__delete" onClick={() => onRemove?.(entry.id)} aria-label={`Eliminar ${entry.label}`} title="Eliminar">🗑</button>
          </li>
        ))}
      </ol>
    </section>
  );
}

function InitiativePanel({ round, lastTurnActor, onResolve }) {
  const [selfRoll, setSelfRoll] = useState("");
  const [opponentRoll, setOpponentRoll] = useState("");
  const own = Number(selfRoll);
  const rival = Number(opponentRoll);
  const automaticWinner = selfRoll && opponentRoll && own !== rival
    ? own > rival ? "self" : "opponent"
    : "";
  const [tieWinner, setTieWinner] = useState("self");
  const winner = automaticWinner || tieWinner;
  const isDoubleTurn = winner === lastTurnActor;

  function resolve() {
    if (!selfRoll || !opponentRoll || round >= 5) return;
    onResolve?.({ winner, selfRoll: own, opponentRoll: rival });
    setSelfRoll("");
    setOpponentRoll("");
  }

  return (
    <section className="aos-initiative" aria-labelledby="initiative-title">
      <header>
        <div>
          <h4 id="initiative-title">Iniciativa</h4>
          <p>Al terminar la ronda, decide quién comienza la siguiente.</p>
        </div>
        <b>R{round} → R{Math.min(5, round + 1)}</b>
      </header>
      <div className="aos-initiative__rolls">
        <label><span>Mi dado</span><input type="number" min="1" max="6" inputMode="numeric" value={selfRoll} onChange={(event) => setSelfRoll(event.target.value)} placeholder="D6" /></label>
        <label><span>Dado rival</span><input type="number" min="1" max="6" inputMode="numeric" value={opponentRoll} onChange={(event) => setOpponentRoll(event.target.value)} placeholder="D6" /></label>
      </div>
      {selfRoll && opponentRoll && own === rival && (
        <div className="aos-initiative__tie">
          <span>Empate: indica quién gana el desempate</span>
          <div role="group" aria-label="Ganador del desempate">
            {BATTLE_ACTORS.map((item) => <button key={item.id} type="button" className={tieWinner === item.id ? "is-active" : ""} onClick={() => setTieWinner(item.id)}>{item.label}</button>)}
          </div>
        </div>
      )}
      <div className="aos-initiative__result" aria-live="polite">
        {selfRoll && opponentRoll ? (
          <span>Empieza <strong>{winner === "self" ? "Yo" : "Rival"}</strong>{isDoubleTurn && <b>Doble turno</b>}</span>
        ) : <span>Introduce ambas tiradas</span>}
        <button type="button" onClick={resolve} disabled={!selfRoll || !opponentRoll || round >= 5}>Empezar siguiente ronda</button>
      </div>
    </section>
  );
}

function BattleStatistics({ entries, listName, selectedRound, onRoundChange }) {
  const [exportStatus, setExportStatus] = useState("");
  const summary = summarizeBattleLog(entries, selectedRound);
  const headlineMetrics = [
    ["victoryPoints", "PV"],
    ["damage", "Daño"],
    ["mortalDamage", "Daño mortal"],
    ["battleTacticsCompleted", "Tácticas"],
  ];

  function downloadStatistics() {
    const csv = formatBattleStatisticsCsv(entries, { listName });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = getBattleStatisticsFilename(listName);
    link.click();
    URL.revokeObjectURL(url);
    setExportStatus("Informe descargado: resumen, rondas y cronología");
  }

  return (
    <section className="aos-battle-stats" aria-labelledby="battle-stats-title">
      <header>
        <div>
          <h4 id="battle-stats-title">Estadísticas de la partida</h4>
          <p>Comparativa automática a partir del registro.</p>
        </div>
        <div className="aos-battle-stats__selector">
          <div className="aos-battle-stats__selector-heading">
            <span>Periodo analizado</span>
            <small>{selectedRound === "all" ? "Partida completa" : `Ronda de batalla ${selectedRound}`}</small>
          </div>
          <div className="aos-battle-stats__rounds" role="group" aria-label="Ronda de las estadísticas">
            {["all", 1, 2, 3, 4, 5].map((value) => {
              const isActive = String(selectedRound) === String(value);
              return (
                <button
                  key={value}
                  type="button"
                  className={isActive ? "is-active" : ""}
                  onClick={() => onRoundChange(value)}
                  aria-label={value === "all" ? "Estadísticas de toda la partida" : `Estadísticas de la ronda ${value}`}
                  aria-pressed={isActive}
                >
                  <b>{value === "all" ? "Σ" : value}</b>
                  <span>{value === "all" ? "Total" : "Ronda"}</span>
                </button>
              );
            })}
          </div>
        </div>
        <button type="button" className="aos-battle-stats__export" onClick={downloadStatistics}>
          <span aria-hidden="true">⇩</span> Exportar informe
        </button>
        {exportStatus && <p className="aos-battle-stats__export-status" role="status">{exportStatus}</p>}
      </header>

      <div className="aos-battle-stats__matrix aos-battle-stats__matrix--headline">
        <StatHeader />
        {headlineMetrics.map(([key, label]) => <StatRow key={key} label={label} own={summary.self[key]} opponent={summary.opponent[key]} />)}
      </div>

      <details className="aos-battle-stats__details">
        <summary>Ver todos los parámetros</summary>
        <div className="aos-battle-stats__matrix">
          <StatHeader />
          {BATTLE_STAT_GROUPS.map((group) => (
            <div key={group.id} className="aos-battle-stats__group">
              <h5>{group.label}</h5>
              {group.metrics.map(([key, label]) => <StatRow key={key} label={label} own={summary.self[key]} opponent={summary.opponent[key]} />)}
            </div>
          ))}
          <div className="aos-battle-stats__group">
            <h5>Porcentajes</h5>
            {getBattleRateMetrics(summary).map(([label, own, opponent]) => <StatRow key={label} label={label} own={own} opponent={opponent} />)}
          </div>
        </div>
      </details>
    </section>
  );
}

function StatHeader() {
  return <div className="aos-battle-stats__row is-header"><span>Parámetro</span><b>Yo</b><b>Rival</b></div>;
}

function StatRow({ label, own, opponent }) {
  return <div className="aos-battle-stats__row"><span>{label}</span><b>{own}</b><b>{opponent}</b></div>;
}

function groupBattleEvents() {
  const groups = new Map();
  BATTLE_EVENT_DEFINITIONS.forEach((event) => groups.set(event.group, [...(groups.get(event.group) ?? []), event]));
  return [...groups.entries()];
}

function defaultBattleValues(action) {
  return Object.fromEntries(
    (action?.fields ?? [])
      .filter((field) => field.type === "choice")
      .map((field) => [field.id, field.options[0]?.value ?? ""])
  );
}

function formatBattleEventResult(action, values) {
  return (action?.fields ?? [])
    .filter((field) => String(values[field.id] ?? "").trim() !== "")
    .map((field) => {
      const option = field.options?.find((item) => item.value === values[field.id]);
      return `${field.label}: ${option?.label ?? values[field.id]}`;
    })
    .join(" · ");
}

function formatBattleLogTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
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
