import { useMemo } from "react";
import Accordion from "../components/Accordion";
import BackButton from "../components/BackButton";
import UnitArtwork from "../components/UnitArtwork";

function OptionSelector({
  title,
  options = [],
  onView,
  onConfigure,
  goBack,
  state = {},
  onStateChange,
}) {
  const query = state.query ?? "";
  const role = state.role ?? "all";
  const keyword = state.keyword ?? "all";
  const maxPoints = state.maxPoints ?? "all";
  const sort = state.sort ?? "name";
  const isUnitSelector = options.some(
    (option) => option?.rules || (option?.keywords ?? []).length > 0
  );

  const keywordOptions = useMemo(() => {
    const values = new Set(
      options.flatMap((option) => option?.keywords ?? []).filter(Boolean)
    );

    return [...values].sort((left, right) =>
      left.localeCompare(right, "es")
    );
  }, [options]);

  const visibleOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = options.filter((option) => {
      const keywords = (option?.keywords ?? []).map((item) =>
        String(item).trim().toLowerCase()
      );
      const isHero = option?.rules?.hero === true || keywords.includes("hero");
      const haystack = [option?.name, option?.id, ...keywords]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      if (normalizedQuery && !haystack.includes(normalizedQuery)) return false;
      if (role === "heroes" && !isHero) return false;
      if (role === "units" && isHero) return false;
      if (keyword !== "all" && !keywords.includes(keyword.toLowerCase())) return false;
      if (maxPoints !== "all" && Number(option?.points) > Number(maxPoints)) return false;

      return true;
    });

    return [...filtered].sort((left, right) => {
      if (sort === "points-asc") return (Number(left.points) || 0) - (Number(right.points) || 0);
      if (sort === "points-desc") return (Number(right.points) || 0) - (Number(left.points) || 0);
      return String(left.name ?? "").localeCompare(String(right.name ?? ""), "es");
    });
  }, [keyword, maxPoints, options, query, role, sort]);

  function updateState(patch) {
    onStateChange?.({ ...state, ...patch });
  }

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
            Selecciona una opción
          </h2>
        </div>

        {options.length > 6 && (
          <section className="aos-selector-tools" aria-label="Buscar y filtrar opciones">
            <label className="aos-selector-search">
              <span>Buscar</span>
              <input
                type="search"
                value={query}
                placeholder="Nombre o palabra clave"
                onChange={(event) => updateState({ query: event.target.value })}
              />
            </label>

            <div className="aos-selector-filters">
              {isUnitSelector && (
                <>
                  <label>
                    <span>Tipo</span>
                    <select value={role} onChange={(event) => updateState({ role: event.target.value })}>
                      <option value="all">Todos</option>
                      <option value="heroes">Héroes</option>
                      <option value="units">Unidades</option>
                    </select>
                  </label>

                  <label>
                    <span>Keyword</span>
                    <select value={keyword} onChange={(event) => updateState({ keyword: event.target.value })}>
                      <option value="all">Todas</option>
                      {keywordOptions.map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <span>Puntos</span>
                    <select value={maxPoints} onChange={(event) => updateState({ maxPoints: event.target.value })}>
                      <option value="all">Sin límite</option>
                      <option value="100">Hasta 100</option>
                      <option value="200">Hasta 200</option>
                      <option value="300">Hasta 300</option>
                      <option value="400">Hasta 400</option>
                    </select>
                  </label>
                </>
              )}

              <label>
                <span>Orden</span>
                <select value={sort} onChange={(event) => updateState({ sort: event.target.value })}>
                  <option value="name">Nombre</option>
                  <option value="points-asc">Puntos: menor primero</option>
                  <option value="points-desc">Puntos: mayor primero</option>
                </select>
              </label>
            </div>

            <p className="aos-selector-results" role="status">
              {visibleOptions.length} de {options.length} opciones
            </p>
          </section>
        )}

        {options.length === 0 && (
          <div className="aos-empty-message">
            No hay opciones disponibles.
          </div>
        )}

        {options.length > 0 && visibleOptions.length === 0 && (
          <div className="aos-empty-message">
            No hay opciones que coincidan con los filtros.
          </div>
        )}

        <section className="aos-option-list">
          {visibleOptions.map((option) => {
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
                    {hasWarscroll(option) &&
                      onView && (
                        <button
                          type="button"
                          onClick={() =>
                            onView(option)
                          }
                          className="aos-option-card__button aos-option-card__button--view"
                          aria-label={`Ver warscroll de ${option.name}`}
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
                        aria-label={`Seleccionar ${option.name}`}
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
