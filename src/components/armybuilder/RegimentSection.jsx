import {
  getAvailableRegimentLeaders,
  getAvailableUnitsForRegiment,
} from "../../utils/regimentRules";
import {
  canAddRegiment,
  getGeneralRegimentId,
} from "../../utils/armyComposition";
import UnitArtwork from "../UnitArtwork";
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
    regiment
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
      getGeneralRegimentId(list) === regiment.id
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

          const offeredUnits =
            getAvailableUnitsForRegiment(
              list,
              regiment,
              { ignoreCapacity: true }
            );
          const addUnitsDisabled = offeredUnits.length === 0;
          const regimentPoints = getUnitPoints(regiment.hero)
            + units.reduce((total, unit) => total + getUnitPoints(unit), 0);

          return (
            <article
              id={`regiment-${regiment.id}`}
              key={regiment.id}
              className="aos-official-regiment"
            >
              <header className="aos-official-regiment__header">
                <strong>{getGeneralRegimentId(list) === regiment.id ? "General’s Regiment" : `Regiment ${regimentIndex + 1}`}</strong>
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

              <UnitCard
                unit={regiment.hero}
                isLeader
                isGeneral={getGeneralRegimentId(list) === regiment.id}
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
                Add Unit
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
  isGeneral = false,
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
  const assignedEnhancements = [
    unit.artefact,
    unit.heroicTrait,
    ...(!isHedonitesUnit
      ? [unit.monstrousTrait]
      : []),
    unit.allConsumingObsession,
    unit.moulderMutation,
    unit.mortisanRefinement,
    unit.accursedDevice,
    unit.brazenMutation,
    unit.originOfTerrifyingFolkTale,
    unit.visionOfFate,
    unit.specialKnickKnack,
    unit.flawlessManoeuvre,
    unit.plaguefathersPox,
    unit.decorationForValour,
    unit.ironweldInnovation,
    unit.brandOfDarkGod,
    unit.ensorcelledBanner,
    unit.boonOfShadow,
    unit.aqshyEnhancement,
    ...Object.values(unit.specialEnhancements ?? {}),
  ]
    .filter(Boolean)
    .filter((enhancement, index, enhancements) =>
      enhancements.findIndex((candidate) =>
        (candidate.id ?? candidate.name) === (enhancement.id ?? enhancement.name)
      ) === index
    );

  return (
    <article className="aos-official-roster-unit">
      {(onConfigure || (locked && onView)) && (
        <button
          type="button"
          className="aos-official-roster-unit__configure"
          onClick={onConfigure ?? onView}
          aria-label={onConfigure ? `Configure ${unit.name}` : `Ver warscroll de ${unit.name}`}
        />
      )}
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
        {isGeneral && <span className="aos-unit-enhancement aos-unit-general">GENERAL</span>}
        <span className="aos-official-roster-unit__points">
          {pointsLabel ?? `${points}pts`}
        </span>

        {assignedEnhancements.length > 0 && (
          <div className="aos-unit-enhancements" aria-label="Mejoras asignadas">
            {assignedEnhancements.map((enhancement) => (
              <span className="aos-unit-enhancement" key={enhancement.id ?? enhancement.name}>
                {enhancement.name}
                {Number(enhancement.points) > 0 && ` - ${enhancement.points} Points`}
              </span>
            ))}
          </div>
        )}
      </div>

      {!locked && !isLeader && (
        <details className="aos-official-action-menu aos-official-action-menu--unit">
          <summary aria-label={`${unit.name} options`}>⋮</summary>
          <div>
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
