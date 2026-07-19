import alliances from "../data/alliances";

import "../styles/aos-app.css";

function SelectAlliance({
  onSelect,
  onBack,
}) {
  const pageBackground =
    "/images/backgrounds/select-alliance.webp";

  return (
    <main
      className="aos-page aos-selection-page"
      style={{
        "--aos-page-background":
          `url("${pageBackground}")`,
      }}
    >
      <SelectionHeader
        title="Choose Alliance"
        onBack={onBack}
      />

      <section className="aos-selection-content">
        <h2 className="aos-selection-heading">
          Selecciona una Gran Alianza
        </h2>

        {alliances.map((alliance) => {
          const image =
            alliance.image ??
            `/images/alliances/${alliance.id}.webp`;

          return (
            <button
              key={alliance.id}
              type="button"
              className="aos-selection-card"
              onClick={() =>
                onSelect(alliance)
              }
              style={{
                "--aos-card-image":
                  `url("${image}")`,
              }}
            >
              <span className="aos-selection-card__content">
                <span className="aos-selection-card__title">
                  {alliance.name}
                </span>
              </span>

              <span
                className="aos-round-action"
                aria-hidden="true"
              >
                ⌄
              </span>
            </button>
          );
        })}
      </section>
    </main>
  );
}

function SelectionHeader({
  title,
  onBack,
}) {
  return (
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
        {title}
      </h1>

      <span aria-hidden="true" />
    </header>
  );
}

export default SelectAlliance;