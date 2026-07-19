import Accordion from "../components/Accordion";

import "../styles/aos-app.css";

function UnitWarscroll({
  unit,
  onBack,
  onConfigure,
}) {
  if (!unit) {
    return (
      <main className="aos-page aos-warscroll-page">
        <header className="aos-topbar">
          <button
            type="button"
            className="aos-icon-button"
            onClick={onBack}
            aria-label="Volver"
          >
            ‹
          </button>

          <h1 className="aos-topbar__title">
            Warscroll
          </h1>

          <span aria-hidden="true" />
        </header>

        <div className="aos-warscroll-content">
          <p>
            No se ha seleccionado ninguna
            unidad.
          </p>
        </div>
      </main>
    );
  }

  const displayedPoints =
    getDisplayedPoints(unit);

  const displayedModels =
    getDisplayedModels(unit);

  const unitImage =
    unit.image ??
    `/images/units/${unit.id}.webp`;

  return (
    <main className="aos-page aos-warscroll-page">
      <header className="aos-topbar">
        <button
          type="button"
          className="aos-icon-button"
          onClick={onBack}
          aria-label="Volver"
        >
          ‹
        </button>

        <h1 className="aos-topbar__title">
          {unit.name}
        </h1>

        <span aria-hidden="true" />
      </header>

      <section
        className="aos-warscroll-hero"
        style={{
          "--aos-unit-image":
            `url("${unitImage}")`,
        }}
        aria-label={
          `Imagen de ${unit.name}`
        }
      />

      <section className="aos-profile-strip">
        <Stat
          label="Move"
          value={unit.profile?.move}
        />

        <Stat
          label="Health"
          value={unit.profile?.health}
        />

        <Stat
          label="Control"
          value={unit.profile?.control}
        />

        <Stat
          label="Save"
          value={unit.profile?.save}
          variant="save"
        />
      </section>

      <div className="aos-warscroll-content">
        <section className="aos-warscroll-meta">
          <div>
            <h2 className="aos-warscroll-meta__name">
              {unit.name}
            </h2>

            <span>
              {displayedModels}{" "}
              {displayedModels === 1
                ? "miniatura"
                : "miniaturas"}
            </span>
          </div>

          <strong className="aos-warscroll-meta__points">
            {displayedPoints} pts
          </strong>
        </section>

        {unit.reinforced && (
          <div style={styles.reinforced}>
            Unidad reforzada
          </div>
        )}

        <Accordion
          title="Melee Weapons"
          subtitle={
            getWeaponCount(
              unit,
              "Melee"
            )
          }
        >
          <WeaponList
            weapons={unit.weapons}
            type="Melee"
          />
        </Accordion>

        <Accordion
          title="Ranged Weapons"
          subtitle={
            getWeaponCount(
              unit,
              "Ranged"
            )
          }
        >
          <WeaponList
            weapons={unit.weapons}
            type="Ranged"
          />
        </Accordion>

        <Accordion
          title="Abilities"
          subtitle={
            `${unit.abilities?.length ?? 0}`
          }
        >
          <AbilityList
            abilities={unit.abilities}
          />
        </Accordion>

        <Accordion title="Unit Details">
          <DetailRow
            label="Modelos"
            value={displayedModels}
          />

          <DetailRow
            label="Peana"
            value={
              unit.details?.baseSize ??
              "-"
            }
          />

          {unit.profile?.ward && (
            <DetailRow
              label="Ward"
              value={
                unit.profile.ward
              }
            />
          )}

          {unit.details?.notes && (
            <p style={styles.preservedText}>
              {unit.details.notes}
            </p>
          )}
        </Accordion>

        <Accordion title="Keywords">
          <div style={styles.keywordList}>
            {(unit.keywords ?? []).map(
              (keyword) => (
                <span
                  key={keyword}
                  style={styles.keyword}
                >
                  {keyword}
                </span>
              )
            )}

            {(unit.keywords ?? [])
              .length === 0 && (
              <p>
                Sin keywords.
              </p>
            )}
          </div>
        </Accordion>

        {unit.artefact && (
          <EnhancementAccordion
            title="Artefacto"
            enhancement={
              unit.artefact
            }
          />
        )}

        {unit.heroicTrait && (
          <EnhancementAccordion
            title="Rasgo heroico"
            enhancement={
              unit.heroicTrait
            }
          />
        )}

        {unit.monstrousTrait && (
          <EnhancementAccordion
            title="Rasgo monstruoso"
            enhancement={
              unit.monstrousTrait
            }
          />
        )}

        {typeof onConfigure ===
          "function" && (
          <button
            type="button"
            className="aos-configure-button"
            onClick={onConfigure}
          >
            Configuración
          </button>
        )}
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
  variant,
}) {
  return (
    <div
      className={
        variant === "save"
          ? "aos-stat aos-stat--save"
          : "aos-stat"
      }
    >
      <div className="aos-stat__circle">
        {value ?? "-"}
      </div>

      <span className="aos-stat__label">
        {label}
      </span>
    </div>
  );
}

function WeaponList({
  weapons = [],
  type,
}) {
  const filteredWeapons =
    weapons.filter((weapon) => {
      const weaponType =
        weapon.type ?? "Melee";

      return weaponType === type;
    });

  if (filteredWeapons.length === 0) {
    return (
      <p>
        No hay perfiles registrados.
      </p>
    );
  }

  return filteredWeapons.map(
    (weapon, index) => (
      <article
        key={`${weapon.name}-${index}`}
        style={styles.weapon}
      >
        <h3 style={styles.weaponName}>
          {weapon.name}
        </h3>

        <div style={styles.weaponGrid}>
          {type === "Ranged" && (
            <WeaponStat
              label="Alcance"
              value={weapon.range}
            />
          )}

          <WeaponStat
            label="Ataques"
            value={weapon.attacks}
          />

          <WeaponStat
            label="Impactar"
            value={weapon.hit}
          />

          <WeaponStat
            label="Herir"
            value={weapon.wound}
          />

          <WeaponStat
            label="Rend"
            value={weapon.rend}
          />

          <WeaponStat
            label="Daño"
            value={weapon.damage}
          />
        </div>

        {weapon.abilities?.length >
          0 && (
          <div style={styles.weaponAbilities}>
            {weapon.abilities.join(
              " · "
            )}
          </div>
        )}
      </article>
    )
  );
}

function WeaponStat({
  label,
  value,
}) {
  return (
    <div style={styles.weaponStat}>
      <span style={styles.weaponStatLabel}>
        {label}
      </span>

      <strong>
        {value ?? "-"}
      </strong>
    </div>
  );
}

function AbilityList({
  abilities = [],
}) {
  if (abilities.length === 0) {
    return (
      <p>
        Esta unidad no tiene habilidades
        registradas.
      </p>
    );
  }

  return abilities.map(
    (ability, index) => (
      <article
        key={`${ability.name}-${index}`}
        style={styles.ability}
      >
        <div style={styles.abilityHeader}>
          <h3 style={styles.abilityName}>
            {ability.name}
          </h3>

          {(ability.phase ||
            ability.type) && (
            <span style={styles.abilityType}>
              {ability.phase ??
                ability.type}
            </span>
          )}
        </div>

        {ability.castingValue != null && (
          <p>
            <strong>
              Valor de lanzamiento:
            </strong>{" "}
            {ability.castingValue}
          </p>
        )}

        <p style={styles.preservedText}>
          {ability.description}
        </p>

        {ability.keywords?.length >
          0 && (
          <div style={styles.keywordList}>
            {ability.keywords.map(
              (keyword) => (
                <span
                  key={keyword}
                  style={styles.keyword}
                >
                  {keyword}
                </span>
              )
            )}
          </div>
        )}
      </article>
    )
  );
}

function DetailRow({
  label,
  value,
}) {
  return (
    <div style={styles.detailRow}>
      <span>{label}</span>

      <strong>{value}</strong>
    </div>
  );
}

function EnhancementAccordion({
  title,
  enhancement,
}) {
  return (
    <Accordion title={title}>
      <h3 style={styles.enhancementName}>
        {enhancement.name}
      </h3>

      <p style={styles.preservedText}>
        {enhancement.description}
      </p>
    </Accordion>
  );
}

function getWeaponCount(
  unit,
  type
) {
  const count =
    (unit.weapons ?? []).filter(
      (weapon) =>
        (weapon.type ?? "Melee") ===
        type
    ).length;

  return `${count} ${
    count === 1
      ? "perfil"
      : "perfiles"
  }`;
}

function getDisplayedPoints(unit) {
  const basePoints =
    Number(unit?.points) || 0;

  return unit?.reinforced
    ? basePoints * 2
    : basePoints;
}

function getDisplayedModels(unit) {
  const baseModels =
    Number(unit?.details?.models) ||
    1;

  return unit?.reinforced
    ? baseModels * 2
    : baseModels;
}

const styles = {
  reinforced: {
    padding: 10,
    marginBottom: 10,
    borderLeft:
      "5px solid #d8b354",
    backgroundColor: "#272d2e",
    color: "#ffffff",
    fontWeight: 700,
    textAlign: "center",
    textTransform: "uppercase",
  },

  weapon: {
    padding: 13,
    marginBottom: 10,
    border: "1px solid #d2c9ae",
    backgroundColor: "#f5f0e2",
  },

  weaponName: {
    margin: "0 0 11px",
    fontFamily:
      '"Oswald", "Arial Narrow", sans-serif',
    fontSize: 18,
    textTransform: "uppercase",
  },

  weaponGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(72px, 1fr))",
    gap: 7,
  },

  weaponStat: {
    padding: 8,
    border:
      "1px solid rgba(0,0,0,0.13)",
    backgroundColor: "#ffffff",
    textAlign: "center",
  },

  weaponStatLabel: {
    display: "block",
    marginBottom: 3,
    color: "#666666",
    fontSize: 10,
    fontWeight: 700,
    textTransform: "uppercase",
  },

  weaponAbilities: {
    paddingTop: 10,
    color: "#6e120c",
    fontSize: 13,
    fontWeight: 700,
  },

  ability: {
    padding: 13,
    marginBottom: 10,
    borderLeft:
      "4px solid #8e1b13",
    backgroundColor: "#f4f1e8",
  },

  abilityHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },

  abilityName: {
    margin: 0,
    fontFamily:
      '"Oswald", "Arial Narrow", sans-serif',
    fontSize: 19,
    textTransform: "uppercase",
  },

  abilityType: {
    flexShrink: 0,
    padding: "4px 7px",
    backgroundColor: "#8e1b13",
    color: "#ffffff",
    fontSize: 10,
    fontWeight: 700,
    textTransform: "uppercase",
  },

  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 20,
    padding: "10px 0",
    borderBottom:
      "1px solid #dddddd",
  },

  keywordList: {
    display: "flex",
    flexWrap: "wrap",
    gap: 7,
  },

  keyword: {
    padding: "5px 8px",
    borderRadius: 2,
    backgroundColor: "#252b2c",
    color: "#ffffff",
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
  },

  enhancementName: {
    marginBottom: 8,
    fontFamily:
      '"Oswald", "Arial Narrow", sans-serif',
    textTransform: "uppercase",
  },

  preservedText: {
    whiteSpace: "pre-line",
    lineHeight: 1.55,
  },
};

export default UnitWarscroll;