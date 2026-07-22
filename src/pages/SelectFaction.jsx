import { useState } from "react";

import factions from "../data/factions";
import ChevronIcon from "../components/ChevronIcon";
import "../styles/aos-app.css";

function SelectFaction({ alliance, onSelect, onBack }) {
  const [selectedFaction, setSelectedFaction] = useState(null);
  const factionList = factions.filter(
    (faction) => faction.alliance === alliance?.id
  );
  const background =
    alliance?.backgroundImage ??
    alliance?.image ??
    `/images/backgrounds/${alliance?.id ?? "factions"}.webp`;

  if (selectedFaction) {
    const armyTypes = selectedFaction.armyTypes ?? [];
    const variants = selectedFaction.armiesOfRenown ?? [];

    return (
      <main
        className="aos-page aos-selection-page"
        style={{ "--aos-page-background": `url("${selectedFaction.image ?? background}")` }}
      >
        <header className="aos-topbar">
          <button
            type="button"
            className="aos-icon-button"
            onClick={() => setSelectedFaction(null)}
            aria-label="Volver a las facciones"
          >
            <ChevronIcon direction="left" size={10} thickness={3} />
          </button>
          <h1 className="aos-topbar__title">Tipo de ejército</h1>
          <span aria-hidden="true" />
        </header>

        <section className="aos-selection-content aos-army-type-screen">
          <p className="aos-selection-step">Paso 3 de 4</p>
          <h2 className="aos-selection-heading">{selectedFaction.name}</h2>
          <p className="aos-army-type-screen__hint">
            Elige las reglas y unidades disponibles para esta lista.
          </p>

          {armyTypes.length > 0 ? (
            armyTypes.map((armyType) => (
              <button
                key={armyType.id}
                type="button"
                className="aos-army-type-card"
                onClick={() => onSelect(armyType, null)}
              >
                <strong>{armyType.name}</strong>
                <span>Ejército de Orruk Warclans</span>
                <ChevronIcon direction="right" size={9} thickness={3} />
              </button>
            ))
          ) : (
            <button
              type="button"
              className="aos-army-type-card"
              onClick={() => onSelect(selectedFaction, null)}
            >
              <strong>Ejército estándar</strong>
              <span>{selectedFaction.name}</span>
              <ChevronIcon direction="right" size={9} thickness={3} />
            </button>
          )}

          {armyTypes.length === 0 && variants.map((variant) => (
            <button
              key={variant.id}
              type="button"
              className="aos-army-type-card"
              onClick={() => onSelect(selectedFaction, variant)}
            >
              <strong>{variant.name}</strong>
              <span>{variant.description}</span>
              <ChevronIcon direction="right" size={9} thickness={3} />
            </button>
          ))}
        </section>
      </main>
    );
  }

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
        <p className="aos-selection-step">Paso 2 de 4</p>
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
          return (
            <div key={faction.id} className="aos-faction-choice">
              <button
                type="button"
                className="aos-selection-card"
                onClick={() => {
                  setSelectedFaction(faction);
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
                    direction="right"
                    size={11}
                    thickness={3}
                  />
              </span>
              </button>
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
