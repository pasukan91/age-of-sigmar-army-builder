import ChevronIcon from "../ChevronIcon";

function ArmyValidationPanel({
  validation,
  onNavigateIssue,
  expanded = false,
  onExpandedChange,
}) {
  const { errors = [], warnings = [] } = validation ?? {};
  const hasIssues = errors.length > 0 || warnings.length > 0;

  return (
    <section
      id="army-validation-panel"
      className={`aos-validation-panel${errors.length === 0 ? " is-valid" : ""}`}
      aria-labelledby="validation-title"
    >
      <header>
        <button
          type="button"
          className="aos-validation-panel__summary"
          onClick={() => hasIssues && onExpandedChange?.(!expanded)}
          aria-expanded={hasIssues ? expanded : undefined}
          aria-controls={hasIssues ? "army-validation-issues" : undefined}
        >
          <span className="aos-validation-panel__icon" aria-hidden="true">
            {errors.length === 0 ? "✓" : "!"}
          </span>
          <span className="aos-validation-panel__copy">
          <span className="aos-eyebrow">Comprobación de ejército</span>
          <strong id="validation-title" className="aos-validation-panel__title">
            {errors.length === 0
              ? warnings.length > 0
                ? `Lista legal · ${warnings.length} ${warnings.length === 1 ? "pendiente" : "pendientes"}`
                : "Lista legal"
              : `${errors.length} ${errors.length === 1 ? "error" : "errores"}${warnings.length > 0 ? ` · ${warnings.length} ${warnings.length === 1 ? "pendiente" : "pendientes"}` : ""}`}
          </strong>
          <span className="aos-validation-panel__description">
            {errors.length === 0
              ? warnings.length > 0
                ? `La composición es legal; quedan ${warnings.length} elecciones recomendadas.`
                : "No se han encontrado problemas de composición."
              : "Corrige estos problemas antes de presentar la lista."}
          </span>
          </span>
          {hasIssues && (
            <span className="aos-validation-panel__chevron" aria-hidden="true">
              <ChevronIcon direction={expanded ? "up" : "down"} size={8} />
            </span>
          )}
        </button>
      </header>

      {hasIssues && expanded && (
        <div className="aos-validation-panel__issues" id="army-validation-issues">
          {[...errors, ...warnings].map((item) => (
            <article key={item.id} className={`is-${item.severity}`}>
              <div>
                <small>{item.severity === "error" ? "Error" : "Pendiente"}</small>
                <strong>{item.title}</strong>
                <p>{item.message}</p>
              </div>
              <button type="button" onClick={() => onNavigateIssue?.(item)}>
                Ir al problema
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ArmyValidationPanel;
