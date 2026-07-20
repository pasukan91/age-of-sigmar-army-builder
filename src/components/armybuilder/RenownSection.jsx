function RenownSection({ available, selected, onAdd, onRemove }) {
  if (available.length === 0 && selected.length === 0) {
    return null;
  }

  const selectedIds = new Set(selected.map((item) => item.id));

  return (
    <section className="aos-renown-section">
      <h2 className="aos-builder-section-title">Regimientos de renombre</h2>

      {selected.map((regiment) => (
        <article className="aos-renown-card aos-renown-card--selected" key={regiment.instanceId}>
          <div>
            <span className="aos-kicker">Incluido</span>
            <h3>{regiment.name}</h3>
            <p>{regiment.organisation.join(" · ")}</p>
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
            <p>{regiment.organisation.join(" · ")}</p>
          </div>
          <div className="aos-renown-card__actions">
            <strong>{regiment.points} pts</strong>
            <button type="button" disabled={selectedIds.has(regiment.id)} onClick={() => onAdd(regiment)}>
              {selectedIds.has(regiment.id) ? "Incluido" : "Añadir"}
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}

export default RenownSection;
