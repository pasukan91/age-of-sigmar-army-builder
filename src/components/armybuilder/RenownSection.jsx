import { MAX_REGIMENTS_OF_RENOWN } from "../../utils/armyComposition";

function formatOrganisation(regiment) {
  const organisation = Array.isArray(regiment.organisation)
    ? regiment.organisation
    : Array.isArray(regiment.units)
      ? regiment.units
      : Array.isArray(regiment.unitIds)
        ? regiment.unitIds
        : [];

  return organisation.length > 0
    ? organisation.join(" · ")
    : "Composición no especificada";
}

function RenownSection({ available, selected, onAdd, onRemove }) {
  if (available.length === 0 && selected.length === 0) {
    return null;
  }

  const selectedIds = new Set(selected.map((item) => item.id));
  const limitReached = selected.length >= MAX_REGIMENTS_OF_RENOWN;

  return (
    <section className="aos-renown-section">
      <h2 className="aos-builder-section-title">Regimientos de renombre</h2>

      {limitReached && (
        <p>Solo puedes incluir 1 Regimiento de Renombre en el ejército.</p>
      )}

      {selected.map((regiment) => (
        <article className="aos-renown-card aos-renown-card--selected" key={regiment.instanceId}>
          <div>
            <span className="aos-kicker">Incluido</span>
            <h3>{regiment.name}</h3>
            <p>{formatOrganisation(regiment)}</p>
          </div>
          <div className="aos-renown-card__actions">
            <strong>{regiment.points} pts</strong>
            <button type="button" onClick={() => onRemove(regiment.instanceId)}>Eliminar</button>
          </div>
        </article>
      ))}

      {available.map((regiment) => (
        <article className="aos-renown-card" key={regiment.id}>
          <div>
            <h3>{regiment.name}</h3>
            <p>{formatOrganisation(regiment)}</p>
          </div>
          <div className="aos-renown-card__actions">
            <strong>{regiment.points} pts</strong>
            <button
              type="button"
              disabled={selectedIds.has(regiment.id) || limitReached}
              onClick={() => onAdd(regiment)}
            >
              {selectedIds.has(regiment.id) ? "Incluido" : "Añadir"}
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}

export default RenownSection;
