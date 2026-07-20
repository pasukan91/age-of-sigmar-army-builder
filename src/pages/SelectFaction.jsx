import { useState } from "react";

import factions from "../data/factions";
import ChevronIcon from "../components/ChevronIcon";
import "../styles/aos-app.css";

function SelectFaction({ alliance, onSelect, onBack }) {
  const [expandedFactionId, setExpandedFactionId] = useState(null);
  const factionList = factions.filter(
    (faction) => faction.alliance === alliance?.id
  );
  const background =
    alliance?.backgroundImage ??
    alliance?.image ??
    `/images/backgrounds/${alliance?.id ?? "factions"}.webp`;

  return (
    <main
      className="aos-page aos-selection-page"
      style={{ "--aos-page-background": `url("${background}")` }}
    >
      <header className="aos-topbar">
        <button
          type="button"
          className="aos-icon-button"
          onClick={onBack}
          aria-label="Volver"
          >
            <ChevronIcon direction="left" size={10} thickness={3} />
        </button>

        <h1 className="aos-topbar__title">Elige facción</h1>
        <span aria-hidden="true" />
      </header>

      <section className="aos-selection-content">
        <h2 className="aos-selection-heading">
          {alliance?.name ?? "Selecciona una facción"}
        </h2>

        {factionList.length === 0 && (
          <p style={styles.empty}>
            No hay facciones disponibles para esta Gran Alianza.
          </p>
        )}

        {factionList.map((faction) => {
          const image =
            faction.image ?? `/images/factions/${faction.id}.webp`;
          const variants = faction.armiesOfRenown ?? [];
          const expanded = expandedFactionId === faction.id;

          return (
            <div key={faction.id} className="aos-faction-choice">
              <button
                type="button"
                className="aos-selection-card"
                aria-expanded={variants.length > 0 ? expanded : undefined}
                onClick={() => {
                  if (variants.length > 0) {
                    setExpandedFactionId(expanded ? null : faction.id);
                    return;
                  }

                  onSelect(faction, null);
                }}
                style={{ "--aos-card-image": `url("${image}")` }}
              >
                <span className="aos-selection-card__content">
                  <span className="aos-selection-card__title">
                    {faction.name}
                  </span>
                </span>

              <span className="aos-round-action" aria-hidden="true">
                  <ChevronIcon
                    direction={expanded ? "up" : "right"}
                    size={11}
                    thickness={3}
                  />
              </span>
              </button>

              {expanded && (
                <div className="aos-faction-variant-menu">
                  <p>Selecciona el tipo de ejército</p>

                  <button type="button" onClick={() => onSelect(faction, null)}>
                    <strong>Ejército estándar</strong>
                    <span>{faction.name}</span>
                  </button>

                  {variants.map((variant) => (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => onSelect(faction, variant)}
                    >
                      <strong>{variant.name}</strong>
                      <span>{variant.description}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </section>
    </main>
  );
}

const styles = {
  empty: {
    padding: 20,
    border: "1px solid rgba(255,255,255,0.25)",
    borderRadius: 6,
    backgroundColor: "rgba(0,0,0,0.55)",
    textAlign: "center",
  },
};

export default SelectFaction;
