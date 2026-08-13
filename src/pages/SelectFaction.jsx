import { useEffect, useState } from "react";

import factions from "../data/factions";
import ChevronIcon from "../components/ChevronIcon";
import StepProgress from "../components/StepProgress";
import {
  getFactionArtwork,
  getFactionArtworkPosition,
} from "../utils/factionArtwork";
import "../styles/aos-app.css";

function SelectFaction({ alliance, onSelect, onBack, initialFaction = null }) {
  const [selectedFaction, setSelectedFaction] = useState(initialFaction);
  const factionList = factions.filter(
    (faction) => faction.alliance === alliance?.id && faction.units.length > 0
  );
  const background =
    alliance?.backgroundImage ??
    alliance?.image ??
    `/images/backgrounds/${alliance?.id ?? "factions"}.webp`;

  useEffect(() => {
    function handlePopState(event) {
      if (event.state?.factionStep !== "army-type") {
        setSelectedFaction(null);
        return;
      }

      const faction = factions.find(
        (item) => item.id === event.state?.selectedFactionId && item.alliance === alliance?.id
      );
      setSelectedFaction(faction ?? null);
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [alliance?.id]);

  function showArmyTypes(faction) {
    setSelectedFaction(faction);
    window.history.pushState(
      {
        ...window.history.state,
        factionStep: "army-type",
        selectedFactionId: faction.id,
      },
      "",
      window.location.href
    );
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }

  function returnToFactions() {
    if (window.history.state?.factionStep === "army-type") {
      window.history.back();
      return;
    }
    setSelectedFaction(null);
  }

  if (selectedFaction) {
    const variants = selectedFaction.armiesOfRenown ?? [];

    return (
      <main
        className="aos-page aos-selection-page"
        style={{
          "--aos-page-background": `url("${getFactionArtwork(selectedFaction) ?? background}")`,
          "--aos-page-background-position":
            getFactionArtworkPosition(selectedFaction, "page") ??
            selectedFaction.imagePosition ??
            "center",
        }}
      >
        <header className="aos-topbar">
          <button
            type="button"
            className="aos-icon-button"
            onClick={returnToFactions}
            aria-label="Volver a las facciones"
          >
            <ChevronIcon direction="left" size={10} thickness={3} />
          </button>
          <h1 className="aos-topbar__title">Tipo de ejército</h1>
          <span aria-hidden="true" />
        </header>

        <section className="aos-selection-content aos-army-type-screen">
          <StepProgress
            steps={["Alianza", "Facción", "Tipo", "Detalles"]}
            current={3}
            variant="dark"
          />
          <h2 className="aos-selection-heading">{selectedFaction.name}</h2>
          <p className="aos-army-type-screen__hint">
            Elige las reglas y unidades disponibles para esta lista.
          </p>

          <button
            type="button"
            className="aos-army-type-card"
            onClick={() => onSelect(selectedFaction, null)}
          >
            <strong>Ejército estándar</strong>
            <span>{selectedFaction.name}</span>
            <ChevronIcon direction="right" size={9} thickness={3} />
          </button>

          {variants.map((variant) => (
            <article
              key={variant.id}
              className="aos-army-type-card"
            >
              <div>
                <small className="aos-army-type-card__kind">Ejército de renombre</small>
                <strong>{variant.name}</strong>
                <p className="aos-army-type-card__description" lang="en">
                  {variant.description}
                </p>
                <details className="aos-army-type-card__details">
                  <summary>Ver detalles</summary>
                  <p lang="en"><small>Texto original (EN)</small>{variant.description}</p>
                </details>
              </div>
              <button
                type="button"
                className="aos-army-type-card__choose"
                onClick={() => onSelect(selectedFaction, variant)}
              >
                Elegir <ChevronIcon direction="right" size={9} thickness={3} />
              </button>
            </article>
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
        <StepProgress
          steps={["Alianza", "Facción", "Tipo", "Detalles"]}
          current={2}
          variant="dark"
        />
        <h2 className="aos-selection-heading">
          {alliance?.name ?? "Selecciona una facción"}
        </h2>

        {factionList.length === 0 && (
          <p style={styles.empty}>
            No hay facciones disponibles para esta Gran Alianza.
          </p>
        )}

        {factionList.map((faction) => {
          const image = getFactionArtwork(faction) ??
            `/images/factions/${faction.id}.webp`;
          return (
            <div key={faction.id} className="aos-faction-choice">
              <button
                type="button"
                className="aos-selection-card"
                onClick={() => showArmyTypes(faction)}
                style={{
                  "--aos-card-image": `url("${image}")`,
                  "--aos-card-position":
                    getFactionArtworkPosition(faction, "card") ??
                    faction.imagePosition ??
                    "center right",
                }}
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
