import Accordion from "../components/Accordion";
import BackButton from "../components/BackButton";
import UnitArtwork from "../components/UnitArtwork";

function OptionSelector({
  title,
  options = [],
  onView,
  onConfigure,
  goBack,
}) {
  function hasWarscroll(option) {
    return Boolean(
      option.rules ||
      option.details ||
      option.weapons
    );
  }

  function getDescription(option) {
    return (
      option.description ??
      option.ability?.description ??
      null
    );
  }

  return (
    <main className="aos-shell">
      <header className="aos-screen-header">
        <BackButton
          onClick={goBack}
          light
          compact
        />

        <h1 className="aos-screen-header__title">
          {title}
        </h1>

        <span aria-hidden="true" />
      </header>

      <div className="aos-screen-content">
        <div className="aos-form-intro">
          <p className="aos-kicker">
            Opciones disponibles
          </p>

          <h2 className="aos-heading">
            Selecciona una opción
          </h2>
        </div>

        {options.length === 0 && (
          <div className="aos-empty-message">
            No hay opciones disponibles.
          </div>
        )}

        <section className="aos-option-list">
          {options.map((option) => {
            const description =
              getDescription(option);

            return (
              <article
                key={option.id}
                className="aos-option-card"
              >
                <div className="aos-option-card__head">
                  {hasWarscroll(option) && (
                    <UnitArtwork unit={option} variant="thumbnail" />
                  )}

                  <div>
                    <h3 className="aos-option-card__title">
                      {option.name}
                    </h3>

                    {typeof option.points ===
                      "number" && (
                      <span className="aos-option-card__points">
                        {option.points} puntos
                      </span>
                    )}

                    {option.profile && (
                      <p className="aos-option-card__profile">
                        Movimiento {option.profile.move ?? "–"}
                        {" · "}
                        Salud {option.profile.health ?? "–"}
                        {" · "}
                        Control {option.profile.control ?? "–"}
                        {" · "}
                        Salvación {option.profile.save ?? "–"}
                      </p>
                    )}
                  </div>

                  <div className="aos-option-card__actions">
                    {hasWarscroll(option) &&
                      onView && (
                        <button
                          type="button"
                          onClick={() =>
                            onView(option)
                          }
                          className="aos-option-card__button aos-option-card__button--view"
                        >
                          Warscroll
                        </button>
                      )}

                    {onConfigure && (
                      <button
                        type="button"
                        onClick={() =>
                          onConfigure(option)
                        }
                        className="aos-option-card__button aos-option-card__button--select"
                      >
                        Seleccionar
                      </button>
                    )}
                  </div>
                </div>

                {description && (
                  <div style={{ marginTop: 14 }}>
                    <Accordion title="Descripción">
                      <p
                        style={{
                          margin: 0,
                          whiteSpace: "pre-line",
                        }}
                      >
                        {description}
                      </p>
                    </Accordion>
                  </div>
                )}
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}

export default OptionSelector;
