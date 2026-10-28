import { MAX_REGIMENTS_OF_RENOWN } from "../../utils/armyComposition";
import { getRegimentOrganisation } from "../../utils/regimentOfRenownReferences";
import { getRegimentAbilityNames } from "../../utils/optionSummaries";
import { UnitCard } from "./RegimentSection";
import TrashIcon from "../TrashIcon";

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

function getUnitModels(unit) {
  const baseModels = Number(unit?.details?.models) || 1;
  return unit?.reinforced ? baseModels * 2 : baseModels;
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
          <details
            className="aos-regiment-card aos-renown-drop"
            key={regiment.instanceId ?? regiment.id}
            open
          >
            <summary className="aos-regiment-card__summary">
              <div>
                <h3 className="aos-renown-drop__title">Drop {dropNumber}</h3>
                <p className="aos-renown-drop__subtitle">
                  {regiment.name} · Regimiento de renombre
                </p>
              </div>
              <span className="aos-regiment-card__overview">
                {units.length} {units.length === 1 ? "unidad" : "unidades"} · {regiment.points} pts
              </span>
            </summary>

            <div className="aos-regiment-card__body">
              <header className="aos-regiment-card__actions">
                <span>Composición cerrada · 1 drop</span>
                <div className="aos-renown-drop__actions">
                  <button
                    type="button"
                    className="aos-renown-card__view"
                    onClick={() => onView?.(regiment)}
                  >
                    Reglas
                  </button>
                  <button
                    type="button"
                    className="aos-icon-delete"
                    onClick={() => onRemove(regiment.instanceId)}
                    aria-label={`Eliminar ${regiment.name}`}
                    title="Eliminar regimiento de renombre"
                  >
                    <TrashIcon size={17} />
                  </button>
                </div>
              </header>

              <RegimentContents regiment={regiment} />

              <p className="aos-renown-drop__section-label">Unidades del drop</p>
              {units.map((unit) => (
                <UnitCard
                  key={unit.instanceId ?? unit.id}
                  unit={unit}
                  points={0}
                  pointsLabel="incluida en el coste del drop"
                  models={getUnitModels(unit)}
                  locked
                  onView={() => onViewUnit?.(unit)}
                />
              ))}
            </div>
          </details>
        );
      })}

      {available.length > 0 && (
        <details className="aos-renown-catalogue">
          <summary>
            <span>Explorar regimientos disponibles</span>
            <small>{available.length} opciones</small>
          </summary>
          <div className="aos-renown-catalogue__content">
            {available.map((regiment) => (
              <article className="aos-renown-card" key={regiment.id}>
                <div>
                  <h3>{regiment.name}</h3>
                  <RegimentContents regiment={regiment} />
                </div>
                <div className="aos-renown-card__actions">
                  <strong>{regiment.points} pts</strong>
                  <button
                    type="button"
                    className="aos-renown-card__view"
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
