function ArmyValidationPanel({ validation, onNavigateIssue }) {
  const { errors = [], warnings = [] } = validation ?? {};

  return (
    <section
      id="army-validation-panel"
      className={`aos-validation-panel${errors.length === 0 ? " is-valid" : ""}`}
      aria-labelledby="validation-title"
    >
      <header>
        <span className="aos-validation-panel__icon" aria-hidden="true">
          {errors.length === 0 ? "✓" : "!"}
        </span>
        <div>
          <span className="aos-eyebrow">Comprobación de ejército</span>
          <h2 id="validation-title">
            {errors.length === 0 ? "Lista legal" : `${errors.length} ${errors.length === 1 ? "error" : "errores"}`}
          </h2>
          <p>
            {errors.length === 0
              ? warnings.length > 0
                ? `La composición es legal; quedan ${warnings.length} elecciones recomendadas.`
                : "No se han encontrado problemas de composición."
              : "Corrige estos problemas antes de presentar la lista."}
          </p>
        </div>
      </header>

      {(errors.length > 0 || warnings.length > 0) && (
        <div className="aos-validation-panel__issues">
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

