import { useMemo, useState } from "react";
import Accordion from "../components/Accordion";
import BackButton from "../components/BackButton";
import ContextNote from "../components/ContextNote";
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
  const [query, setQuery] = useState("");
  const [unitGroup, setUnitGroup] = useState("all");
  const isMultiSelect = maxSelections > 1;
  const selectedIds = new Set(selectedOptions.map((option) => option.id));
  const filteredOptions = useMemo(() => {
    const normalizedQuery = normalizeSearch(query);
    return options.filter((option) => {
      if (unitGroup !== "all" && getUnitGroup(option) !== unitGroup) return false;
      if (!normalizedQuery) return true;
      return normalizeSearch([
        option.name,
        option.points,
        option.keywords,
        option.description,
      ].flat().filter(Boolean).join(" ")).includes(normalizedQuery);
    });
  }, [options, query, unitGroup]);
  const optionGroups = variant === "units"
    ? groupUnitOptions(filteredOptions)
    : [{ id: "options", label: null, options: filteredOptions }];
  const guidance = getSelectorGuidance({ title, variant, isMultiSelect, maxSelections });

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
              ? `Elige hasta ${maxSelections}`
              : "Elige una opción"}
          </h2>
        </div>

        <ContextNote title={guidance.title}>
          {guidance.description}
        </ContextNote>

        {variant === "units" && options.length > 8 && (
          <section className="aos-selector-tools" aria-label="Buscar y filtrar unidades">
            <label className="aos-selector-search">
              <span className="aos-visually-hidden">Buscar unidad</span>
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por nombre, palabra clave o puntos…"
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} aria-label="Borrar búsqueda">×</button>
              )}
            </label>
            <div className="aos-selector-filters" role="group" aria-label="Tipo de unidad">
              {[{ id: "all", label: "Todas" }, ...UNIT_GROUPS.map(([id, label]) => ({ id, label }))]
                .filter((filter) => filter.id === "all" || options.some((option) => getUnitGroup(option) === filter.id))
                .map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    className={unitGroup === filter.id ? "is-active" : ""}
                    onClick={() => setUnitGroup(filter.id)}
                    aria-pressed={unitGroup === filter.id}
                  >
                    {filter.label}
                  </button>
                ))}
            </div>
            <p className="aos-selector-result-count" role="status">
              {filteredOptions.length} {filteredOptions.length === 1 ? "opción disponible" : "opciones disponibles"}
            </p>
          </section>
        )}

        {filteredOptions.length === 0 && (
          <div className="aos-empty-message">
            <strong>No hay coincidencias.</strong>
            <span>Prueba otro nombre o quita algún filtro.</span>
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
        <section className={`aos-option-list${variant === "units" ? " aos-option-list--grouped" : ""}`}>
          {optionGroups.map((group) => (
            <section className="aos-option-group" key={group.id} aria-labelledby={`option-group-${group.id}`}>
              {group.label && (
                <header className="aos-option-group__header">
                  <h3 id={`option-group-${group.id}`}>{group.label}</h3>
                  <span>{group.options.length}</span>
                </header>
              )}
              <div className="aos-option-group__items">
          {group.options.map((option) => {
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
                      alt={`Mapa del plan de batalla ${option.name}`}
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
              </div>
            </section>
          ))}
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

const UNIT_GROUPS = [
  ["hero", "Héroes"],
  ["infantry", "Infantería"],
  ["cavalry", "Caballería"],
  ["monster", "Monstruos"],
  ["war machine", "Máquinas de guerra"],
  ["beast", "Bestias"],
  ["terrain", "Terreno"],
];

function groupUnitOptions(options) {
  const groups = new Map(UNIT_GROUPS.map(([id, label]) => [id, { id: id.replace(/\s+/g, "-"), label, options: [] }]));
  const other = { id: "other", label: "Otras unidades", options: [] };

  options.forEach((option) => {
    const groupId = getUnitGroup(option);
    (groupId ? groups.get(groupId) : other).options.push(option);
  });

  return [...groups.values(), other].filter((group) => group.options.length > 0);
}

function getUnitGroup(option) {
  const keywords = (option.keywords ?? []).map((keyword) => String(keyword).trim().toLowerCase());
  return UNIT_GROUPS.find(([keyword]) => keywords.includes(keyword))?.[0] ?? "other";
}

function normalizeSearch(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getSelectorGuidance({ title, variant, isMultiSelect, maxSelections }) {
  if (variant === "units") {
    return {
      title: "Cómo elegir una unidad",
      description:
        "Toca la imagen para consultar su warscroll. Revisa puntos y perfil; después pulsa Seleccionar para añadirla.",
    };
  }

  if (variant === "battleTactics" || isMultiSelect) {
    return {
      title: "Selección múltiple",
      description: `Puedes elegir hasta ${maxSelections} opciones. Pulsa de nuevo una opción seleccionada para quitarla y confirma al terminar.`,
    };
  }

  if (String(title).toLowerCase().includes("formación")) {
    return {
      title: "Define el estilo del ejército",
      description:
        "La formación es obligatoria y añade una regla global. Abre la descripción para comparar antes de elegir.",
    };
  }

  return {
    title: "Revisa antes de elegir",
    description:
      "Abre la descripción para entender el efecto. Al pulsar Seleccionar volverás al constructor con la opción aplicada.",
  };
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
      {cards.map((card) => {
        const isSelected = selectedIds.has(card.id);
        const limitReached = selectedCount >= maxSelections && !isSelected;

        return (
          <Accordion
            key={card.id}
            title={`Carta de táctica ${card.number} · ${card.name}`}
            subtitle={`${card.tactics?.length ?? 0} misiones`}
          >
            <button
              type="button"
              className="aos-option-card__button aos-option-card__button--select aos-battle-tactics-selector__card-button"
              disabled={limitReached}
              aria-pressed={isSelected}
              onClick={() => onToggle?.(card)}
            >
              {isSelected ? "Carta seleccionada" : "Seleccionar esta carta"}
            </button>

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

            {(card.tactics ?? []).map((tactic) => (
              <div className="aos-game-battle-card__tactic" key={tactic.id}>
              <div className="aos-game-battle-card__tactic-heading">
                <span>{tactic.type}</span>
                <b>{tactic.points} PV</b>
              </div>
              <strong>{tactic.name}</strong>
              {tactic.flavour && <em>{tactic.flavour}</em>}
              <p>{tactic.condition}</p>
            </div>
            ))}
          </Accordion>
        );
      })}
    </section>
  );
}

export default OptionSelector;
