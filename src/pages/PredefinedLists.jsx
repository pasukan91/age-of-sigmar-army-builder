import { useMemo, useState } from "react";
import BackButton from "../components/BackButton";
import ChevronIcon from "../components/ChevronIcon";
import factions from "../data/factions";
import {
  getPredefinedListSummary,
  PREDEFINED_LIST_TYPES,
} from "../data/predefinedLists";
import {
  getFactionArtwork,
  getFactionArtworkPosition,
} from "../utils/factionArtwork";

const playableFactions = factions.filter((faction) => (faction.units?.length ?? 0) > 0);

function PredefinedLists({ onBack, onCreate }) {
  const [selectedFaction, setSelectedFaction] = useState(null);
  const [typeFilter, setTypeFilter] = useState("all");
  const summaries = useMemo(() => {
    if (!selectedFaction) return [];
    return PREDEFINED_LIST_TYPES
      .filter((type) => typeFilter === "all" || type.id === typeFilter)
      .map((type) => ({ type, summary: getPredefinedListSummary(selectedFaction, type.id) }))
      .filter((item) => item.summary);
  }, [selectedFaction, typeFilter]);

  return (
    <main className="aos-shell aos-presets-page">
      <header className="aos-screen-header">
        <BackButton onClick={selectedFaction ? () => setSelectedFaction(null) : onBack} light compact />
        <h1 className="aos-screen-header__title">Listas predefinidas</h1>
        <span aria-hidden="true" />
      </header>

      <div className="aos-screen-content aos-presets-content">
        {!selectedFaction ? (
          <>
            <header className="aos-form-intro">
              <p className="aos-kicker">Plantillas competitivas 2026–27</p>
              <h2 className="aos-heading">Elige tu facción</h2>
              <p className="aos-presets-intro">
                Cada plantilla se completa con formación, tácticas, saberes,
                terreno, mejoras y regimientos listos para editar.
              </p>
            </header>
            <section className="aos-preset-factions" aria-label="Facciones disponibles">
              {playableFactions.map((faction) => {
                const image = getFactionArtwork(faction) ?? `/images/factions/${faction.id}.webp`;
                return (
                  <button
                    key={faction.id}
                    type="button"
                    className="aos-preset-faction"
                    onClick={() => setSelectedFaction(faction)}
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
              <p className="aos-kicker">{selectedFaction.name}</p>
              <h2 className="aos-heading">Elige un estilo</h2>
              <p className="aos-presets-intro">
                Son puntos de partida competitivos: puedes cambiar cualquier
                unidad o regla en el constructor después de crearla.
              </p>
            </header>
            <div className="aos-preset-filters" role="group" aria-label="Filtrar estilos">
              <button type="button" className={typeFilter === "all" ? "is-active" : ""} onClick={() => setTypeFilter("all")}>Todas</button>
              {PREDEFINED_LIST_TYPES.map((type) => (
                <button key={type.id} type="button" className={typeFilter === type.id ? "is-active" : ""} onClick={() => setTypeFilter(type.id)}>
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
                  <dl className="aos-preset-card__stats">
                    <div><dt>Puntos</dt><dd>{summary.points}/2000</dd></div>
                    <div><dt>Regimientos</dt><dd>{summary.regiments}</dd></div>
                    <div><dt>Unidades</dt><dd>{summary.units}</dd></div>
                  </dl>
                  <div className="aos-preset-card__details">
                    <span>{summary.list.battleFormation?.name ?? "Sin formación"}</span>
                    <span>2 cartas de tácticas</span>
                    <span>Reglas y mejoras incluidas</span>
                  </div>
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

export default PredefinedLists;
