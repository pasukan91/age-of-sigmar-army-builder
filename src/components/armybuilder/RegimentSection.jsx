import {
  countsTowardRegimentLimit,
  getAvailableRegimentLeaders,
  getAvailableUnitsForRegiment,
  getRegimentCompositionErrors,
} from "../../utils/regimentRules";
import {
  canAddRegiment,
  getRegimentUnitLimit,
} from "../../utils/armyComposition";
import UnitArtwork from "../UnitArtwork";
import { getEnhancementTiming } from "../../utils/enhancementTiming";
import { isUniqueUnit } from "../../utils/unitIdentity";
import { getUnitPoints } from "../../utils/armyPoints";

function RegimentSection({
  list,
  setSelector,
  setPage,
  onViewWarscroll,
  onConfigureUnit,
  onRemoveUnit,
  onDuplicateUnit,
  onRemoveRegiment,
}) {
  const regiments = Array.isArray(
    list?.regiments
  )
    ? list.regiments
    : [];

  const availableHeroes =
    getAvailableRegimentLeaders(list);
  const compositionErrors =
    getRegimentCompositionErrors(list);

  function requestRemoveUnit(
    regiment,
    unit
  ) {
    if (
      typeof onRemoveUnit !==
      "function"
    ) {
      console.error(
        "RegimentSection no ha recibido onRemoveUnit."
      );

      return;
    }

    if (!unit.instanceId) {
      console.error(
        "La unidad no tiene instanceId.",
        unit
      );

      return;
    }

    const confirmed =
      window.confirm(
        `¿Eliminar ${unit.name} del regimiento de ${regiment.hero.name}?`
      );

    if (!confirmed) {
      return;
    }

    onRemoveUnit({
      regimentId: regiment.id,
      unitInstanceId:
        unit.instanceId,
    });
  }

  function requestRemoveRegiment(
    regiment,
    regimentIndex
  ) {
    if (
      typeof onRemoveRegiment !==
      "function"
    ) {
      console.error(
        "RegimentSection no ha recibido onRemoveRegiment."
      );

      return;
    }

    const description =
      regimentIndex === 0
        ? "el regimiento del general"
        : `el regimiento de ${regiment.hero.name}`;

    const confirmed =
      window.confirm(
        `¿Eliminar ${description}?\n\nSe eliminarán también todas sus unidades.`
      );

    if (!confirmed) {
      return;
    }

    onRemoveRegiment(
      regiment.id
    );
  }

  function openNewRegimentSelector() {
    setSelector({
      title: "Add Hero",
      property: "newRegiment",
      regimentId: null,
      options: availableHeroes,
      ui: { variant: "units" },
    });
    setPage("selector");
  }

  return (
    <section style={styles.section}>
      {regiments.length === 0 && (
        <article className="aos-official-empty-regiment">
          <header>
            <strong>Regiment 1</strong>
            <span>0 Points</span>
            <span aria-hidden="true">⋮</span>
          </header>
          <button
            type="button"
            onClick={openNewRegimentSelector}
            disabled={availableHeroes.length === 0 || !canAddRegiment(list)}
          >
            Add Hero
          </button>
        </article>
      )}

      {regiments.map(
        (
          regiment,
          regimentIndex
        ) => {
          const units =
            Array.isArray(
              regiment.units
            )
              ? regiment.units
              : [];

          const limit =
            getRegimentUnitLimit(
              regimentIndex
            );

          const full =
            units.filter(countsTowardRegimentLimit).length >= limit;

          const selectableUnits =
            getAvailableUnitsForRegiment(
              list,
              regiment
            );

          const canAddFreeCommandCorpsUnit =
            selectableUnits.some(
              (unit) => !countsTowardRegimentLimit(unit)
            );

          const offeredUnits = full
            ? selectableUnits.filter(
                (unit) => !countsTowardRegimentLimit(unit)
              )
            : selectableUnits;

          const addUnitsDisabled =
            (full && !canAddFreeCommandCorpsUnit) ||
            offeredUnits.length === 0;
          const regimentErrors =
            compositionErrors.filter(
              (error) =>
                error.regimentId === regiment.id
            );
          const regimentPoints = getUnitPoints(regiment.hero)
            + units.reduce((total, unit) => total + getUnitPoints(unit), 0);

          return (
            <article
              id={`regiment-${regiment.id}`}
              key={regiment.id}
              className="aos-official-regiment"
            >
              <header className="aos-official-regiment__header">
                <strong>Regiment {regimentIndex + 1}</strong>
                <span>{regimentPoints} Points</span>
                <details className="aos-official-action-menu">
                  <summary aria-label={`Regiment ${regimentIndex + 1} options`}>⋮</summary>
                  <div>
                    <button
                      type="button"
                      onClick={() => requestRemoveRegiment(regiment, regimentIndex)}
                    >
                      Remove Regiment
                    </button>
                  </div>
                </details>
              </header>

              {regimentErrors.map((error) => (
                <p
                  key={`${error.role}-${error.max}`}
                  role="alert"
                  style={styles.compositionError}
                >
                  Composición ilegal: {error.message}
                </p>
              ))}

              <UnitCard
                unit={regiment.hero}
                isLeader
                points={getUnitPoints(
                  regiment.hero
                )}
                onView={() => {
                  if (
                    typeof onViewWarscroll ===
                    "function"
                  ) {
                    onViewWarscroll({
                      unit:
                        regiment.hero,
                      regimentId:
                        regiment.id,
                      isLeader: true,
                    });
                  }
                }}
                onConfigure={() => {
                  if (
                    typeof onConfigureUnit ===
                    "function"
                  ) {
                    onConfigureUnit({
                      unit:
                        regiment.hero,
                      regimentId:
                        regiment.id,
                      isLeader: true,
                    });
                  }
                }}
              />

              {units.map((unit) => (
                <UnitCard
                  key={unit.instanceId}
                  unit={unit}
                  points={getUnitPoints(
                    unit
                  )}
                  onView={() => {
                    if (
                      typeof onViewWarscroll ===
                      "function"
                    ) {
                      onViewWarscroll({
                        unit,
                        regimentId:
                          regiment.id,
                        isLeader: false,
                      });
                    }
                  }}
                  onConfigure={() => {
                    if (
                      typeof onConfigureUnit ===
                      "function"
                    ) {
                      onConfigureUnit({
                        unit,
                        regimentId:
                          regiment.id,
                        isLeader: false,
                      });
                    }
                  }}
                  onRemove={() =>
                    requestRemoveUnit(
                      regiment,
                      unit
                    )
                  }
                  onDuplicate={() => {
                    if (typeof onDuplicateUnit === "function") {
                      onDuplicateUnit({
                        regimentId: regiment.id,
                        unitInstanceId: unit.instanceId,
                      });
                    }
                  }}
                  canDuplicate={
                    unit.rules?.unique !== true &&
                    !(unit.keywords ?? []).some(
                      (keyword) =>
                        String(keyword).trim().toLowerCase() === "unique"
                    )
                  }
                />
              ))}

              <button
                type="button"
                disabled={
                  addUnitsDisabled
                }
                onClick={() => {
                  setSelector({
                    title:
                      "Add Unit",

                    property:
                      "newUnit",

                    regimentId:
                      regiment.id,

                    options:
                      offeredUnits,
                    ui: { variant: "units" },
                  });

                  setPage("selector");
                }}
                style={{
                  ...styles.addUnitButton,

                  opacity:
                    addUnitsDisabled
                      ? 0.5
                      : 1,

                  cursor:
                    addUnitsDisabled
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {full && !canAddFreeCommandCorpsUnit
                  ? "Regiment Full"
                  : "Add Unit"}
              </button>
            </article>
          );
        }
      )}

    </section>
  );
}

export function UnitCard({
  unit,
  isLeader = false,
  points,
  pointsLabel,
  locked = false,
  onView,
  onConfigure,
  onRemove,
  onDuplicate,
  canDuplicate = false,
}) {
  const isHedonitesUnit =
    (unit?.keywords ?? []).some(
      (keyword) =>
        String(keyword).trim().toLowerCase() ===
        "hedonites of slaanesh"
    );
  const isUnique = isUniqueUnit(unit);

  const assignedEnhancements = [
    ["Artefacto", unit.artefact],
    ["Rasgo heroico", unit.heroicTrait],
    ...(!isHedonitesUnit
      ? [["Rasgo monstruoso", unit.monstrousTrait]]
      : []),
    ["Obsesión", unit.allConsumingObsession],
    ["Mutación Moulder", unit.moulderMutation],
    ["Refinamiento Mortisan", unit.mortisanRefinement],
    ["Dispositivo maldito", unit.accursedDevice],
    ["Mutación de bronce", unit.brazenMutation],
    ["Origen de relato terrorífico", unit.originOfTerrifyingFolkTale],
    ["Visión de destino", unit.visionOfFate],
    ["Special Knick-Knack", unit.specialKnickKnack],
    ["Flawless Manoeuvre", unit.flawlessManoeuvre],
    ["Plaguefather’s Pox", unit.plaguefathersPox],
    ["Decoration for Valour", unit.decorationForValour],
    ["Ironweld Innovation", unit.ironweldInnovation],
    ["Brand of the Dark Gods", unit.brandOfDarkGod],
    ["Ensorcelled Banner", unit.ensorcelledBanner],
    ["Boon of Shadow", unit.boonOfShadow],
  ].filter(([, enhancement]) => Boolean(enhancement));

  return (
    <article className="aos-official-roster-unit">
      <button
        type="button"
        onClick={onView}
        className="aos-unit-artwork-link"
        aria-label={`Ver warscroll de ${unit.name}`}
      >
        <UnitArtwork unit={unit} variant="thumbnail" />
      </button>

      <div className="aos-official-roster-unit__info">
        <strong>
          {unit.name}
        </strong>
        <span className="aos-official-roster-unit__points">
          {pointsLabel ?? `${points}pts`}
        </span>

        {assignedEnhancements.length > 0 && (
          <div className="aos-unit-enhancements" aria-label="Mejoras asignadas">
            {assignedEnhancements.map(([label, enhancement]) => (
              <div className="aos-unit-enhancement" key={`${label}-${enhancement.id}`}>
                <span className="aos-unit-enhancement__type">{label}</span>
                <strong>{enhancement.name}</strong>
                <div className="aos-unit-enhancement__meta">
                  <span>{getEnhancementTiming(enhancement)}</span>
                  {enhancement.source && (
                    <span className={enhancement.source === "Aqshy" ? "is-aqshy" : ""}>
                      {enhancement.source}
                    </span>
                  )}
                  {Number(enhancement.points) > 0 && (
                    <span>{enhancement.points} pts</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {!locked && (
        <details className="aos-official-action-menu aos-official-action-menu--unit">
          <summary aria-label={`${unit.name} options`}>⋮</summary>
          <div>
            {!isUnique && <button type="button" onClick={onConfigure}>Configure</button>}
            {!isLeader && canDuplicate && <button type="button" onClick={onDuplicate}>Duplicate</button>}
            {!isLeader && <button type="button" onClick={onRemove}>Remove</button>}
          </div>
        </details>
      )}
    </article>
  );
}

const styles = {
  section: {
    padding: "0 0 24px",
  },

  compositionError: {
    padding: 10,
    margin: "0 0 14px",
    border: "1px solid #a40000",
    borderRadius: 3,
    color: "#7b110c",
    backgroundColor: "#fff0ee",
    fontSize: 13,
    fontWeight: 700,
  },

  addUnitButton: {
    display: "block",
    width: "auto",
    minWidth: 132,
    minHeight: 50,
    padding: "10px 26px",
    margin: "18px auto 4px",
    border: "1px solid #ffffff",
    borderRadius: 999,
    color: "#ffffff",
    backgroundColor: "#050505",
    boxShadow: "0 0 0 1px #050505",
    fontFamily: '"Roboto Slab", Georgia, serif',
    fontWeight: 700,
    textTransform: "uppercase",
  },

};

export default RegimentSection;
