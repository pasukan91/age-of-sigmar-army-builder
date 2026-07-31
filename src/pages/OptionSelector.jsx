import Accordion from "../components/Accordion";
import BackButton from "../components/BackButton";
import UnitArtwork from "../components/UnitArtwork";

function OptionSelector({
  title,
  options = [],
  onView,
  onConfigure,
  goBack,
  selectedOptions = [],
  maxSelections = 1,
  variant,
  onToggle,
}) {
  const isMultiSelect = maxSelections > 1;
  const selectedIds = new Set(selectedOptions.map((option) => option.id));

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

  function canReceiveAqshyObsession(option) {
    const keywords = (option?.keywords ?? []).map(
      (keyword) => String(keyword).trim().toLowerCase()
    );

    const isHero =
      option?.rules?.hero === true ||
      keywords.includes("hero");

    return (
      !isHero &&
      keywords.includes("hedonites of slaanesh") &&
      (keywords.includes("infantry") ||
        keywords.includes("cavalry"))
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
            {isMultiSelect
              ? `Selecciona hasta ${maxSelections} opciones`
              : "Selecciona una opción"}
          </h2>
        </div>

        {options.length === 0 && (
          <div className="aos-empty-message">
            No hay opciones disponibles.
          </div>
        )}

        {variant === "battleTactics" ? (
          <BattleTacticsOptions
            cards={options}
            selectedIds={selectedIds}
            selectedCount={selectedOptions.length}
            maxSelections={maxSelections}
            onToggle={onToggle}
          />
        ) : (
        <section className="aos-option-list">
          {options.map((option) => {
            const description =
              getDescription(option);
            const isSelected = selectedIds.has(option.id);
            const selectionLimitReached =
              isMultiSelect &&
              selectedOptions.length >= maxSelections &&
              !isSelected;

            return (
              <article
                key={option.id}
                className={`aos-option-card${isSelected ? " is-selected" : ""}`}
              >
                <div className="aos-option-card__head">
                  {option.image && !hasWarscroll(option) && (
                    <img
                      className="aos-option-card__map"
                      src={option.image}
                      alt={`${option.name} battleplan map`}
                      loading="lazy"
                    />
                  )}

                  {hasWarscroll(option) && (
                    onView ? (
                      <button
                        type="button"
                        onClick={() => onView(option)}
                        className="aos-unit-artwork-link"
                        aria-label={`Ver warscroll de ${option.name}`}
                      >
                        <UnitArtwork unit={option} variant="thumbnail" />
                      </button>
                    ) : (
                      <UnitArtwork unit={option} variant="thumbnail" />
                    )
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

                    {canReceiveAqshyObsession(option) && (
                      <span className="aos-aqshy-pill">
                        AQSHY · Obsesión disponible
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
                        {(option.details?.baseSize ??
                          option.profile?.baseSize ??
                          option.baseSize) && (
                          <>
                            {" · "}
                            Peana {option.details?.baseSize ??
                              option.profile?.baseSize ??
                              option.baseSize}
                          </>
                        )}
                      </p>
                    )}
                  </div>

                  <div className="aos-option-card__actions">
                    {onConfigure && (
                      <button
                        type="button"
                        onClick={() => isMultiSelect
                          ? onToggle?.(option)
                          : onConfigure(option)
                        }
                        className="aos-option-card__button aos-option-card__button--select"
                        disabled={selectionLimitReached}
                        aria-pressed={isMultiSelect ? isSelected : undefined}
                        aria-label={`${isSelected ? "Quitar" : "Seleccionar"} ${option.name}`}
                      >
                        {isSelected ? "Seleccionada" : "Seleccionar"}
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
        )}

        {isMultiSelect && (
          <div className="aos-option-selector__footer">
            <span>{selectedOptions.length}/{maxSelections} seleccionadas</span>
            <button type="button" className="aos-primary-action" onClick={goBack}>
              Confirmar
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

function BattleTacticsOptions({
  cards,
  selectedIds,
  selectedCount,
  maxSelections,
  onToggle,
}) {
  return (
    <section className="aos-battle-tactics-selector">
      {cards.map((card) => (
        <Accordion
          key={card.id}
          title={`Carta de táctica ${card.number} · ${card.name}`}
          subtitle={`${card.tactics?.length ?? 0} tácticas de batalla`}
        >
          {card.introduction && (
            <p className="aos-battle-tactics-selector__introduction">
              {card.introduction}
            </p>
          )}

          {card.setup && (
            <section className="aos-game-rule-panel">
              <div className="aos-game-rule-panel__label">
                <span>Preparación de batalla</span>
              </div>
              <p>{card.setup}</p>
            </section>
          )}

          {(card.tactics ?? []).map((tactic) => {
            const isSelected = selectedIds.has(tactic.id);
            const limitReached = selectedCount >= maxSelections && !isSelected;

            return (
              <div
                className={`aos-game-battle-card__tactic${isSelected ? " is-selected" : ""}`}
                key={tactic.id}
              >
                <div className="aos-game-battle-card__tactic-heading">
                  <span>{tactic.type}</span>
                  <b>{tactic.points} PV</b>
                </div>
                <strong>{tactic.name}</strong>
                {tactic.flavour && <em>{tactic.flavour}</em>}
                <p>{tactic.condition}</p>
                <button
                  type="button"
                  className="aos-option-card__button aos-option-card__button--select"
                  disabled={limitReached}
                  aria-pressed={isSelected}
                  onClick={() => onToggle?.(tactic)}
                >
                  {isSelected ? "Seleccionada" : "Seleccionar"}
                </button>
              </div>
            );
          })}
        </Accordion>
      ))}
    </section>
  );
}

export default OptionSelector;
