import Accordion from "../components/Accordion";
import UnitArtwork from "../components/UnitArtwork";
import { getPotentialSynergies } from "../utils/unitSynergies";

import "../styles/aos-app.css";

function UnitWarscroll({
  unit,
  list,
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

  const potentialSynergies =
    getPotentialSynergies(list, unit);

  const isHedonitesUnit =
    (unit.keywords ?? []).some(
      (keyword) =>
        String(keyword).trim().toLowerCase() ===
        "hedonites of slaanesh"
    );

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

      <section className="aos-warscroll-hero">
        <UnitArtwork unit={unit} variant="warscroll" />
      </section>

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
          <div className="aos-warscroll-meta__identity">
            <h2 className="aos-warscroll-meta__name">
              {unit.name}
            </h2>

            <div className="aos-warscroll-meta__composition">
              <span>
                {displayedModels}{" "}
                {displayedModels === 1
                  ? "miniatura"
                  : "miniaturas"}
              </span>

              <span>
                Peana {unit.details?.baseSize ?? "—"}
              </span>

              {unit.profile?.ward && (
                <span>Ward {unit.profile.ward}</span>
              )}

              {unit.reinforced && (
                <span className="aos-warscroll-meta__reinforced">
                  Reforzada
                </span>
              )}
            </div>

            {unit.details?.notes && (
              <p className="aos-warscroll-meta__notes">
                {unit.details.notes}
              </p>
            )}
          </div>

          <strong className="aos-warscroll-meta__points">
            {displayedPoints} pts
          </strong>
        </section>

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

        {hasWeaponProfile(unit, "Ranged") && (
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
        )}

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

        <Accordion
          title="Sinergias potenciales"
          subtitle={`${potentialSynergies.length} ${
            potentialSynergies.length === 1
              ? "detectada"
              : "detectadas"
          }`}
          defaultOpen={potentialSynergies.length > 0}
        >
          <SynergyList synergies={potentialSynergies} />
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

        {unit.monstrousTrait && !isHedonitesUnit && (
          <EnhancementAccordion
            title="Rasgo monstruoso"
            enhancement={
              unit.monstrousTrait
            }
          />
        )}

        {unit.allConsumingObsession && (
          <EnhancementAccordion
            title="Obsesión devoradora"
            enhancement={unit.allConsumingObsession}
          />
        )}

        {unit.moulderMutation && (
          <EnhancementAccordion
            title="Mutación Moulder"
            enhancement={unit.moulderMutation}
          />
        )}

        {typeof onConfigure ===
          "function" && (
          <button
            type="button"
            className="aos-configure-button"
            onClick={onConfigure}
          >
            Asignar mejoras
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

function EnhancementAccordion({
  title,
  enhancement,
}) {
  return (
    <Accordion title={title}>
      <h3 style={styles.enhancementName}>
        {enhancement.name}
      </h3>

      {enhancement.source && (
        <span style={styles.enhancementSource}>
          {enhancement.source}
        </span>
      )}

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

  const enhancementPoints = [
    unit?.heroicTrait,
    unit?.monstrousTrait,
    unit?.artefact,
    unit?.allConsumingObsession,
    unit?.moulderMutation,
  ].reduce(
    (total, enhancement) =>
      total + (Number(enhancement?.points) || 0),
    0
  );

  return (
    (unit?.reinforced ? basePoints * 2 : basePoints) +
    enhancementPoints
  );
}

function SynergyList({ synergies }) {
  if (synergies.length === 0) {
    return (
      <section className="aos-synergy-empty">
        <span className="aos-synergy-empty__icon" aria-hidden="true">◇</span>
        <h2>Sin sinergias detectadas</h2>
        <p>
          Añade unidades de apoyo, asigna mejoras o selecciona una formación de batalla para descubrir combinaciones aplicables.
        </p>
      </section>
    );
  }

  return (
    <section className="aos-synergy-list" aria-label="Sinergias potenciales">
      <p className="aos-synergy-note">
        Estas reglas proceden de unidades y opciones presentes en tu ejército. La app no decide si las condiciones se cumplen durante la partida: solo te muestra todas las combinaciones posibles.
      </p>

      {synergies.map((synergy, index) => (
        <article
          className="aos-synergy-card"
          key={`${synergy.sourceType}-${synergy.sourceName}-${synergy.ability?.name}-${index}`}
        >
          <div className="aos-synergy-card__topline">
            <span className="aos-synergy-card__source-type">
              {synergy.sourceType}
            </span>
            <div className="aos-synergy-card__meta">
              {isSpellAbility(synergy.ability) &&
                synergy.ability?.castingValue != null && (
                  <span className="aos-synergy-card__casting">
                    Dificultad {synergy.ability.castingValue}+
                  </span>
                )}
              <span className="aos-synergy-card__phase">
                {synergy.ability?.phase ?? synergy.ability?.type ?? "Pasiva"}
              </span>
            </div>
          </div>

          <p className="aos-synergy-card__source">
            Aportada por <strong>{synergy.sourceName}</strong>
          </p>

          <h3>{synergy.ability?.name}</h3>

          <div className="aos-synergy-card__matches">
            {synergy.matchedOn.map((match) => (
              <span key={match}>{match}</span>
            ))}
          </div>

          {synergy.conditions?.length > 0 && (
            <div className="aos-synergy-card__conditions">
              <strong>Condiciones que debes comprobar</strong>
              <ul>
                {synergy.conditions.map((condition) => (
                  <li key={condition}>{condition}</li>
                ))}
              </ul>
            </div>
          )}

          <p className="aos-synergy-card__description">
            {synergy.ability?.description}
          </p>
        </article>
      ))}
    </section>
  );
}

function isSpellAbility(ability) {
  const type = String(ability?.type ?? "").trim().toLowerCase();
  const keywords = (ability?.keywords ?? []).map((keyword) =>
    String(keyword).trim().toLowerCase()
  );

  return type === "spell" || keywords.includes("spell");
}

function hasWeaponProfile(unit, type) {
  return (unit?.weapons ?? []).some(
    (weapon) =>
      (weapon.type ?? "Melee") === type
  );
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

  enhancementSource: {
    display: "inline-block",
    padding: "4px 9px",
    marginBottom: 10,
    border: "1px solid #9a6820",
    borderRadius: 999,
    backgroundColor: "#f2dfb3",
    color: "#5f3b0d",
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },

  preservedText: {
    whiteSpace: "pre-line",
    lineHeight: 1.55,
  },
};

export default UnitWarscroll;
