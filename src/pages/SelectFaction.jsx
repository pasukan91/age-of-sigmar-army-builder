import factions from "../data/factions";

import "../styles/aos-app.css";

function SelectFaction({
  alliance,
  onSelect,
  onBack,
}) {
  const factionList =
    factions.filter(
      (faction) =>
        faction.alliance === alliance?.id
    );

  const background =
    alliance?.backgroundImage ??
    alliance?.image ??
    `/images/backgrounds/${alliance?.id ?? "factions"}.webp`;

  return (
    <main
      className="aos-page aos-selection-page"
      style={{
        "--aos-page-background":
          `url("${background}")`,
      }}
    >
      <header className="aos-topbar">
        <button
          type="button"
          className="aos-icon-button"
          onClick={onBack}
          aria-label="Volver"
        >
          ‹
        </button>

        <h1 className="aos-topbar__title">
          Choose Faction
        </h1>

        <span aria-hidden="true" />
      </header>

      <section className="aos-selection-content">
        <h2 className="aos-selection-heading">
          {alliance?.name ??
            "Selecciona una facción"}
        </h2>

        {factionList.length === 0 && (
          <p style={styles.empty}>
            No hay facciones disponibles
            para esta Gran Alianza.
          </p>
        )}

        {factionList.map((faction) => {
          const image =
            faction.image ??
            `/images/factions/${faction.id}.webp`;

          return (
            <button
              key={faction.id}
              type="button"
              className="aos-selection-card"
              onClick={() =>
                onSelect(faction)
              }
              style={{
                "--aos-card-image":
                  `url("${image}")`,
              }}
            >
              <span className="aos-selection-card__content">
                <span className="aos-selection-card__title">
                  {faction.name}
                </span>
              </span>

              <span
                className="aos-round-action"
                aria-hidden="true"
              >
                ›
              </span>
            </button>
          );
        })}
      </section>
    </main>
  );
}

const styles = {
  empty: {
    padding: 20,
    border:
      "1px solid rgba(255,255,255,0.25)",
    borderRadius: 6,
    backgroundColor:
      "rgba(0,0,0,0.55)",
    textAlign: "center",
  },
};

export default SelectFaction;