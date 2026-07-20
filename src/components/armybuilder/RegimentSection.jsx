import {
  getAvailableRegimentLeaders,
  getAvailableUnitsForRegiment,
} from "../../utils/regimentRules";
import UnitArtwork from "../UnitArtwork";

function RegimentSection({
  list,
  setSelector,
  setPage,
  onViewWarscroll,
  onConfigureUnit,
  onRemoveUnit,
  onRemoveRegiment,
}) {
  const regiments = Array.isArray(
    list?.regiments
  )
    ? list.regiments
    : [];

  const availableHeroes =
    getAvailableRegimentLeaders(list);

  function getRegimentLimit(index) {
    return index === 0 ? 4 : 3;
  }

  function getUnitPoints(unit) {
    const basePoints =
      Number(unit?.points) || 0;

    return unit?.reinforced
      ? basePoints * 2
      : basePoints;
  }

  function getUnitModels(unit) {
    const baseModels =
      Number(
        unit?.details?.models
      ) || 1;

    return unit?.reinforced
      ? baseModels * 2
      : baseModels;
  }

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

  return (
    <section style={styles.section}>
      {regiments.length === 0 && (
        <div style={styles.emptyCard}>
          No hay ningún regimiento.
        </div>
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
            getRegimentLimit(
              regimentIndex
            );

          const availableSlots =
            Math.max(
              limit - units.length,
              0
            );

          const full =
            units.length >= limit;

          const selectableUnits =
            getAvailableUnitsForRegiment(
              list,
              regiment
            );

          return (
            <article
              key={regiment.id}
              style={
                styles.regimentCard
              }
            >
              <header
                style={
                  styles.regimentHeader
                }
              >
                <div>
                  <h3
                    style={
                      styles.regimentTitle
                    }
                  >
                    Regimiento{" "}
                    {regimentIndex + 1}
                  </h3>

                  <p
                    style={
                      styles.regimentSubtitle
                    }
                  >
                    {regimentIndex === 0
                      ? "Regimiento del general"
                      : `Liderado por ${regiment.hero.name}`}
                    {regiment.requiredByArmyOfRenown
                      ? " · Obligatorio"
                      : ""}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    requestRemoveRegiment(
                      regiment,
                      regimentIndex
                    )
                  }
                  style={
                    styles.deleteRegimentButton
                  }
                >
                  Eliminar regimiento
                </button>
              </header>

              <div style={styles.slotsRow}>
                <span>
                  Unidades:{" "}
                  {units.length}/{limit}
                </span>

                <span>
                  {availableSlots}{" "}
                  {availableSlots === 1
                    ? "plaza disponible"
                    : "plazas disponibles"}
                </span>
              </div>

              <p
                style={
                  styles.sectionLabel
                }
              >
                Líder
              </p>

              <UnitCard
                unit={regiment.hero}
                isLeader
                points={getUnitPoints(
                  regiment.hero
                )}
                models={getUnitModels(
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

              <p
                style={
                  styles.sectionLabel
                }
              >
                Unidades
              </p>

              {units.length === 0 && (
                <div
                  style={
                    styles.emptyUnitCard
                  }
                >
                  Todavía no hay unidades.
                </div>
              )}

              {units.map((unit) => (
                <UnitCard
                  key={unit.instanceId}
                  unit={unit}
                  points={getUnitPoints(
                    unit
                  )}
                  models={getUnitModels(
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
                />
              ))}

              <button
                type="button"
                disabled={
                  full ||
                  selectableUnits.length ===
                    0
                }
                onClick={() => {
                  setSelector({
                    title:
                      `Añadir unidad a ` +
                      regiment.hero.name,

                    property:
                      "newUnit",

                    regimentId:
                      regiment.id,

                    options:
                      selectableUnits,
                  });

                  setPage("selector");
                }}
                style={{
                  ...styles.addUnitButton,

                  opacity:
                    full ||
                    selectableUnits.length ===
                      0
                      ? 0.5
                      : 1,

                  cursor:
                    full ||
                    selectableUnits.length ===
                      0
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {full
                  ? "Regimiento completo"
                  : "+ Añadir unidad"}
              </button>
            </article>
          );
        }
      )}

      <button
        type="button"
        disabled={
          availableHeroes.length === 0
        }
        onClick={() => {
          setSelector({
            title:
              "Selecciona el líder del regimiento",

            property:
              "newRegiment",

            regimentId: null,

            options:
              availableHeroes,
          });

          setPage("selector");
        }}
        style={
          styles.addRegimentButton
        }
      >
        + Añadir regimiento
      </button>
    </section>
  );
}

function UnitCard({
  unit,
  isLeader = false,
  points,
  models,
  onView,
  onConfigure,
  onRemove,
}) {
  return (
    <article style={styles.unitCard}>
      <UnitArtwork unit={unit} variant="thumbnail" />

      <div style={styles.unitInfo}>
        <strong style={styles.unitName}>
          {unit.name}
        </strong>

        <div style={styles.badges}>
          {isLeader && (
            <span style={styles.badge}>
              Líder
            </span>
          )}

          {unit.rules?.hero && (
            <span style={styles.badge}>
              Héroe
            </span>
          )}

          {unit.reinforced && (
            <span style={styles.badge}>
              Reforzada
            </span>
          )}
        </div>

        <p style={styles.summary}>
          {models}{" "}
          {models === 1
            ? "miniatura"
            : "miniaturas"}{" "}
          · {points} puntos
        </p>

        {unit.artefact && (
          <p style={styles.upgrade}>
            <strong>
              Artefacto:
            </strong>{" "}
            {unit.artefact.name}
          </p>
        )}

        {unit.heroicTrait && (
          <p style={styles.upgrade}>
            <strong>
              Rasgo heroico:
            </strong>{" "}
            {unit.heroicTrait.name}
          </p>
        )}

        {unit.monstrousTrait && (
          <p style={styles.upgrade}>
            <strong>
              Rasgo monstruoso:
            </strong>{" "}
            {
              unit.monstrousTrait
                .name
            }
          </p>
        )}
      </div>

      <div style={styles.actions}>
        <button
          type="button"
          onClick={onView}
          style={
            styles.secondaryButton
          }
        >
          Warscroll
        </button>

        <button
          type="button"
          onClick={onConfigure}
          style={styles.primaryButton}
        >
          Configuración
        </button>

        {!isLeader && (
          <button
            type="button"
            onClick={onRemove}
            style={
              styles.deleteUnitButton
            }
          >
            Eliminar
          </button>
        )}
      </div>
    </article>
  );
}

const styles = {
  section: {
    padding: "0 16px 24px",
  },

  emptyCard: {
    padding: 18,
    marginBottom: 20,
    border: "1px dashed #aaa092",
    borderRadius: 3,
    color: "#716a61",
    backgroundColor: "rgba(255,255,255,0.55)",
    textAlign: "center",
  },

  regimentCard: {
    padding: 16,
    marginBottom: 20,
    border: "1px solid #d4cec1",
    borderTop: "4px solid #8f6c2e",
    borderRadius: 3,
    backgroundColor: "#faf8f3",
    boxShadow:
      "0 5px 16px rgba(47,38,28,0.13)",
  },

  regimentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 14,
    marginBottom: 12,
  },

  regimentTitle: {
    margin: 0,
    fontFamily:
      '"Oswald", "Arial Narrow", sans-serif',
    fontSize: 23,
    textTransform: "uppercase",
  },

  regimentSubtitle: {
    margin: "4px 0 0",
    color: "#666666",
  },

  slotsRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    padding: 10,
    marginBottom: 16,
    borderRadius: 2,
    color: "#5f574e",
    backgroundColor: "#e9e3d7",
    fontSize: 12,
    fontWeight: 800,
    textTransform: "uppercase",
  },

  sectionLabel: {
    margin: "15px 0 8px",
    color: "#666666",
    fontSize: 13,
    fontWeight: 700,
    textTransform: "uppercase",
  },

  unitCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 14,
    padding: 14,
    marginBottom: 10,
    border: "1px solid #d0d0d0",
    borderLeft: "4px solid #891f18",
    borderRadius: 3,
    backgroundColor: "#fffefa",
  },

  unitInfo: {
    flex: "1 1 260px",
  },

  unitName: {
    fontFamily:
      '"Oswald", "Arial Narrow", sans-serif',
    fontSize: 19,
    textTransform: "uppercase",
  },

  badges: {
    display: "flex",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 7,
  },

  badge: {
    padding: "3px 7px",
    borderRadius: 999,
    color: "#ffffff",
    backgroundColor: "#62605c",
    fontSize: 11,
    fontWeight: 700,
  },

  summary: {
    margin: "8px 0 0",
    color: "#555555",
  },

  upgrade: {
    margin: "6px 0 0",
    fontSize: 14,
  },

  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },

  secondaryButton: {
    padding: "9px 12px",
    border: "1px solid #111111",
    borderRadius: 3,
    backgroundColor: "#faf8f3",
    fontWeight: 700,
    cursor: "pointer",
  },

  primaryButton: {
    padding: "9px 12px",
    border: "1px solid #5f120e",
    borderRadius: 3,
    backgroundColor: "#891f18",
    color: "#ffffff",
    cursor: "pointer",
  },

  deleteUnitButton: {
    padding: "9px 12px",
    border: "1px solid #a40000",
    borderRadius: 3,
    backgroundColor: "#ffffff",
    color: "#a40000",
    cursor: "pointer",
  },

  deleteRegimentButton: {
    padding: "8px 10px",
    border: "1px solid #a40000",
    borderRadius: 3,
    backgroundColor: "#ffffff",
    color: "#a40000",
    cursor: "pointer",
  },

  addUnitButton: {
    width: "100%",
    padding: 13,
    border: "1px solid #8f6c2e",
    borderRadius: 3,
    color: "#5f120e",
    backgroundColor: "#f5eee1",
    fontWeight: 700,
  },

  addRegimentButton: {
    width: "100%",
    padding: 15,
    border: "1px solid #5f120e",
    borderRadius: 3,
    background:
      "linear-gradient(180deg, #a22b22, #5f120e)",
    color: "#ffffff",
    fontWeight: 700,
    fontFamily:
      '"Oswald", "Arial Narrow", sans-serif',
    fontSize: 17,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    cursor: "pointer",
  },

  emptyUnitCard: {
    padding: 14,
    marginBottom: 10,
    border: "1px dashed #cccccc",
    borderRadius: 3,
    color: "#666666",
  },
};

export default RegimentSection;
