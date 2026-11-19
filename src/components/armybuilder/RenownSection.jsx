import { MAX_REGIMENTS_OF_RENOWN } from "../../utils/armyComposition";
import { getRegimentOrganisation } from "../../utils/regimentOfRenownReferences";
import { getRegimentAbilityNames } from "../../utils/optionSummaries";
import { UnitCard } from "./RegimentSection";

function formatOrganisation(regiment) {
  const organisation = getRegimentOrganisation(regiment);

  return organisation.length > 0
    ? organisation.join(" · ")
    : "Composición no especificada";
}

function RegimentContents({ regiment }) {
  const abilityNames = getRegimentAbilityNames(regiment);

  return (
    <div className="aos-renown-card__contents">
      <p>{formatOrganisation(regiment)}</p>
      {abilityNames.length > 0 ? (
        <p>
          <strong>{abilityNames.length === 1 ? "Regla" : "Reglas"}:</strong>{" "}
          {abilityNames.join(" · ")}
        </p>
      ) : (
        <p>Sin reglas adicionales; usa el warscroll de la unidad incluida.</p>
      )}
    </div>
  );
}

function RenownSection({
  available,
  selected,
  regularRegimentCount = 0,
  onAdd,
  onRemove,
  onView,
  onViewUnit,
}) {
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

      {selected.map((regiment, regimentIndex) => {
        const units = Array.isArray(regiment.resolvedUnits)
          ? regiment.resolvedUnits
          : [];
        const dropNumber = regularRegimentCount + regimentIndex + 1;

        return (
          <article
            className="aos-official-regiment aos-official-renown"
            key={regiment.instanceId ?? regiment.id}
          >
            <header className="aos-official-regiment__header">
              <strong>Drop {dropNumber}</strong>
              <span>{regiment.points} Points</span>
              <details className="aos-official-action-menu">
                <summary aria-label={`${regiment.name} options`}>⋮</summary>
                <div>
                  <button type="button" onClick={() => onView?.(regiment)}>View Rules</button>
                  <button type="button" onClick={() => onRemove(regiment.instanceId)}>Remove</button>
                </div>
              </details>
            </header>

            <div className="aos-official-renown__intro">
              <strong>{regiment.name}</strong>
              <RegimentContents regiment={regiment} />
            </div>

            {units.map((unit) => (
              <UnitCard
                key={unit.instanceId ?? unit.id}
                unit={unit}
                points={0}
                pointsLabel="Included"
                locked
                onView={() => onViewUnit?.(unit)}
              />
            ))}
          </article>
        );
      })}

      {available.length > 0 && (
        <details className="aos-official-renown-catalogue">
          <summary>
            <span>Explorar regimientos disponibles</span>
            <small>{available.length} opciones</small>
          </summary>
          <div>
            {available.map((regiment) => (
              <article className="aos-official-renown-option" key={regiment.id}>
                <div>
                  <h3>{regiment.name}</h3>
                  <RegimentContents regiment={regiment} />
                </div>
                <div>
                  <strong>{regiment.points} pts</strong>
                  <button
                    type="button"
                    onClick={() => onView?.(regiment)}
                  >
                    Consultar
                  </button>
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
          </div>
        </details>
      )}
    </section>
  );
}

export default RenownSection;
