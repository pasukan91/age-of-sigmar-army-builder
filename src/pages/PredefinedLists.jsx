import { useEffect, useMemo, useState } from "react";
import BackButton from "../components/BackButton";
import ChevronIcon from "../components/ChevronIcon";
import ContextNote from "../components/ContextNote";
import StepProgress from "../components/StepProgress";
import factions from "../data/factions";
import {
  getPredefinedListSummary,
  PREDEFINED_LIST_TYPES,
} from "../data/predefinedLists";
import {
  getFactionArtwork,
  getFactionArtworkPosition,
} from "../utils/factionArtwork";
import { formatArmyListText } from "../utils/armyExport";

const playableFactions = factions.filter((faction) => (faction.units?.length ?? 0) > 0);

function PredefinedLists({ onBack, onCreate }) {
  const [selectedFaction, setSelectedFaction] = useState(null);
  const [typeFilter, setTypeFilter] = useState("all");
  const [factionQuery, setFactionQuery] = useState("");
  const [allianceFilter, setAllianceFilter] = useState("all");
  const summaries = useMemo(() => {
    if (!selectedFaction) return [];
    return PREDEFINED_LIST_TYPES
      .filter((type) => typeFilter === "all" || type.id === typeFilter)
      .map((type) => ({ type, summary: getPredefinedListSummary(selectedFaction, type.id) }))
      .filter((item) => item.summary);
  }, [selectedFaction, typeFilter]);
  const visibleFactions = useMemo(() => playableFactions.filter((faction) => {
    const matchesAlliance = allianceFilter === "all" || faction.alliance === allianceFilter;
    const query = normalizeSearch(factionQuery);
    return matchesAlliance && (!query || normalizeSearch(faction.name).includes(query));
  }), [allianceFilter, factionQuery]);

  useEffect(() => {
    function handlePopState(event) {
      if (event.state?.predefinedStep !== "styles") {
        setSelectedFaction(null);
        return;
      }

      setSelectedFaction(
        playableFactions.find((faction) => faction.id === event.state?.predefinedFactionId) ?? null
      );
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function chooseFaction(faction) {
    setSelectedFaction(faction);
    setTypeFilter("all");
    window.history.pushState(
      {
        ...window.history.state,
        predefinedStep: "styles",
        predefinedFactionId: faction.id,
      },
      "",
      window.location.href
    );
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
  }

  function returnToFactions() {
    if (window.history.state?.predefinedStep === "styles") {
      window.history.back();
      return;
    }
    setSelectedFaction(null);
  }

  function clearFactionFilters() {
    setFactionQuery("");
    setAllianceFilter("all");
  }

  return (
    <main className="aos-shell aos-presets-page">
      <header className="aos-screen-header">
        <BackButton onClick={selectedFaction ? returnToFactions : onBack} light compact />
        <h1 className="aos-screen-header__title">Listas predefinidas</h1>
        <span aria-hidden="true" />
      </header>

      <div className="aos-screen-content aos-presets-content">
        {!selectedFaction ? (
          <>
            <header className="aos-form-intro">
              <StepProgress steps={["Facción", "Estilo"]} current={1} />
              <p className="aos-kicker">Plantillas competitivas 2026–27</p>
              <h2 className="aos-heading">Elige tu facción</h2>
              <p className="aos-presets-intro">
                Cada plantilla se completa con formación, tácticas, saberes,
                terreno, mejoras y regimientos listos para editar.
              </p>
            </header>
            <section className="aos-selector-tools aos-preset-faction-tools" aria-label="Buscar y filtrar facciones">
              <label className="aos-selector-search">
                <span className="aos-visually-hidden">Buscar facción</span>
                <span aria-hidden="true">⌕</span>
                <input
                  type="search"
                  value={factionQuery}
                  onChange={(event) => setFactionQuery(event.target.value)}
                  placeholder="Buscar facción…"
                />
                {factionQuery && (
                  <button type="button" onClick={() => setFactionQuery("")} aria-label="Borrar búsqueda">×</button>
                )}
              </label>
              <div className="aos-selector-filters" role="group" aria-label="Gran Alianza">
                {[
                  ["all", "Todas"],
                  ["order", "Orden"],
                  ["chaos", "Caos"],
                  ["death", "Muerte"],
                  ["destruction", "Destrucción"],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    className={allianceFilter === id ? "is-active" : ""}
                    onClick={() => setAllianceFilter(id)}
                    aria-pressed={allianceFilter === id}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p className="aos-selector-result-count" role="status">
                {visibleFactions.length} {visibleFactions.length === 1 ? "facción" : "facciones"}
              </p>
            </section>
            <section className="aos-preset-factions" aria-label="Facciones disponibles">
              {visibleFactions.length === 0 && (
                <div className="aos-empty-message aos-empty-message--actionable">
                  <strong>No encontramos esa facción</strong>
                  <p>Prueba otro nombre o restablece los filtros de Gran Alianza.</p>
                  <button type="button" className="aos-secondary-action" onClick={clearFactionFilters}>
                    Limpiar filtros
                  </button>
                </div>
              )}
              {visibleFactions.map((faction) => {
                const image = getFactionArtwork(faction) ?? `/images/factions/${faction.id}.webp`;
                return (
                  <button
                    key={faction.id}
                    type="button"
                    className="aos-preset-faction"
                    onClick={() => chooseFaction(faction)}
                    style={{
                      "--aos-card-image": `url("${image}")`,
                      "--aos-card-position": getFactionArtworkPosition(faction, "card") ?? "center right",
                    }}
                  >
                    <span><small>{formatAlliance(faction.alliance)}</small><strong>{faction.name}</strong></span>
                    <span className="aos-round-action" aria-hidden="true">
                      <ChevronIcon direction="right" size={11} thickness={3} />
                    </span>
                  </button>
                );
              })}
            </section>
          </>
        ) : (
          <>
            <header className="aos-preset-heading">
              <StepProgress steps={["Facción", "Estilo"]} current={2} />
              <p className="aos-kicker">{selectedFaction.name}</p>
              <h2 className="aos-heading">Elige un estilo</h2>
              <p className="aos-presets-intro">
                Son puntos de partida competitivos: puedes cambiar cualquier
                unidad o regla en el constructor después de crearla.
              </p>
            </header>
            <ContextNote title="Todo incluido" tone="success">
              Al crearla recibirás una lista editable con regimientos, unidades,
              formación, cartas de tácticas, saberes, terreno y mejoras compatibles.
            </ContextNote>
            <div className="aos-preset-filters" role="group" aria-label="Filtrar estilos">
              <button type="button" className={typeFilter === "all" ? "is-active" : ""} onClick={() => setTypeFilter("all")} aria-pressed={typeFilter === "all"}>Todas</button>
              {PREDEFINED_LIST_TYPES.map((type) => (
                <button key={type.id} type="button" className={typeFilter === type.id ? "is-active" : ""} onClick={() => setTypeFilter(type.id)} aria-pressed={typeFilter === type.id}>
                  {type.shortName}
                </button>
              ))}
            </div>
            <section className="aos-preset-grid" aria-live="polite">
              {summaries.map(({ type, summary }) => (
                <article key={type.id} className="aos-preset-card">
                  <div className="aos-preset-card__title-row">
                    <span className="aos-preset-card__icon" aria-hidden="true">{type.icon}</span>
                    <div><p>Plantilla {summary.list.preset.season}</p><h3>{type.name}</h3></div>
                  </div>
                  <p className="aos-preset-card__description">{type.description}</p>
                  {summary.list.preset.doctrine && (
                    <p className="aos-preset-card__doctrine">
                      <strong>Plan de juego:</strong> {summary.list.preset.doctrine}
                    </p>
                  )}
                  <dl className="aos-preset-card__stats">
                    <div><dt>Puntos</dt><dd>{summary.points}/2000</dd></div>
                    <div><dt>Regimientos</dt><dd>{summary.regiments}</dd></div>
                    <div><dt>Unidades</dt><dd>{summary.units}</dd></div>
                  </dl>
                  <div className="aos-preset-card__details">
                    <span>{summary.list.battleFormation?.name ?? "Sin formación"}</span>
                    <span>{formatComposition(type.id, summary.composition)}</span>
                    <span>Tácticas: {summary.list.battleTactics.map((card) => card.name).join(" + ")}</span>
                    <span>Reglas y mejoras incluidas</span>
                  </div>
                  <details className="aos-preset-card__preview">
                    <summary>Ver lista completa</summary>
                    <pre>{formatArmyListText(summary.list)}</pre>
                  </details>
                  <button type="button" className="aos-primary-action" onClick={() => onCreate(summary.list)}>
                    <span aria-hidden="true">＋</span>Crear esta lista
                  </button>
                </article>
              ))}
            </section>
            <p className="aos-preset-disclaimer">
              Basadas en datos competitivos recientes y en el catálogo vigente de la app.
              El meta cambia con cada Battlescroll: revisa la lista antes de un torneo.
            </p>
          </>
        )}
      </div>
    </main>
  );
}

function formatAlliance(alliance) {
  return { order: "Orden", chaos: "Caos", death: "Muerte", destruction: "Destrucción" }[alliance] ?? alliance;
}

function normalizeSearch(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function formatComposition(typeId, composition) {
  if (typeId === "shooting") {
    return `${composition.ranged} de disparo · ${composition.screen} pantallas`;
  }
  if (typeId === "anti-monsters") {
    return `${composition.hunter} cazadores · ${composition.screen} pantallas`;
  }
  if (typeId === "control") {
    return `${composition.screen} unidades de línea · ${composition.combat} amenazas`;
  }
  if (typeId === "resilient") {
    return `${composition.durable} resistentes · ${composition.combat} amenazas`;
  }
  return "Composición competitiva equilibrada";
}

export default PredefinedLists;
