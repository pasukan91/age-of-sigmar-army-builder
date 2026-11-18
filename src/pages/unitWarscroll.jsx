import { getDisplayKeywords } from "../utils/displayKeywords";

import Accordion from "../components/Accordion";
import AbilityCard from "../components/AbilityCard";
import RuleCopyBlocks from "../components/RuleCopyBlocks";
import UnitArtwork from "../components/UnitArtwork";
import { getEnhancementTiming } from "../utils/enhancementTiming";
import { groupAbilitiesByPhase } from "../utils/abilityFormatting";

import "../styles/aos-app.css";

function UnitWarscroll({
  unit,
  onBack,
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

  const accordionPrefix = `storm-forge:warscroll:${unit.id ?? unit.name}`;

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
          label="Movimiento"
          value={unit.profile?.move}
        />

        <Stat
          label="Salud"
          value={unit.profile?.health}
        />

        <Stat
          label="Control"
          value={unit.profile?.control}
        />

        <Stat
          label="Salvación"
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

            {unit.source && (
              <p className="aos-warscroll-meta__notes">
                Fuente: {unit.source}
              </p>
            )}
          </div>

          <strong className="aos-warscroll-meta__points">
            {displayedPoints} pts
          </strong>
        </section>

        {hasWeaponProfile(unit, "Ranged") && (
          <Accordion
            title="Ranged Weapons"
            storageKey={`${accordionPrefix}:ranged-weapons`}
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
          title="Melee Weapons"
          storageKey={`${accordionPrefix}:melee-weapons`}
          subtitle={getWeaponCount(unit, "Melee")}
        >
          <WeaponList weapons={unit.weapons} type="Melee" />
        </Accordion>

        <Accordion
          title="Abilities"
          storageKey={`${accordionPrefix}:abilities`}
          subtitle={
            `${unit.abilities?.length ?? 0}`
          }
        >
          <AbilityList
            abilities={unit.abilities}
          />
        </Accordion>

        <Accordion title="Unit Details" storageKey={`${accordionPrefix}:details`}>
          <div className="aos-official-unit-details">
            <p>• {displayedModels} {displayedModels === 1 ? "model" : "models"}</p>
            <p><strong>{displayedPoints} Points</strong></p>
            {(unit.details?.regimentOptions ?? []).length > 0 && (
              <>
                <strong>Regiment Options:</strong>
                {(unit.details.regimentOptions ?? []).map((option) => <p key={option}>• {option}</p>)}
              </>
            )}
          </div>
        </Accordion>

        <Accordion title="Keywords" storageKey={`${accordionPrefix}:keywords`}>
          <div style={styles.keywordList}>
            {getDisplayKeywords(unit.keywords).map(
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
                Sin palabras clave.
              </p>
            )}
          </div>
        </Accordion>

        {unit.artefact && (
          <EnhancementAccordion
            title="Artefacto"
            storageKey={`${accordionPrefix}:artefact`}
            enhancement={
              unit.artefact
            }
          />
        )}

        {unit.heroicTrait && (
          <EnhancementAccordion
            title="Rasgo heroico"
            storageKey={`${accordionPrefix}:heroic-trait`}
            enhancement={
              unit.heroicTrait
            }
          />
        )}

        {unit.monstrousTrait && !isHedonitesUnit && (
          <EnhancementAccordion
            title="Rasgo monstruoso"
            storageKey={`${accordionPrefix}:monstrous-trait`}
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

        {unit.mortisanRefinement && (
          <EnhancementAccordion
            title="Refinamiento Mortisan"
            enhancement={unit.mortisanRefinement}
          />
        )}

        {unit.originOfTerrifyingFolkTale && (
          <EnhancementAccordion
            title="Origen de relato terrorífico"
            enhancement={unit.originOfTerrifyingFolkTale}
          />
        )}

        {unit.visionOfFate && (
          <EnhancementAccordion
            title="Visión de destino"
            enhancement={unit.visionOfFate}
          />
        )}

        {unit.specialKnickKnack && (
          <EnhancementAccordion
            title="Special Knick-Knack"
            enhancement={unit.specialKnickKnack}
          />
        )}

        {unit.plaguefathersPox && (
          <EnhancementAccordion
            title="Plaguefather’s Pox"
            enhancement={unit.plaguefathersPox}
          />
        )}

        {unit.decorationForValour && (
          <EnhancementAccordion
            title="Decoration for Valour"
            enhancement={unit.decorationForValour}
          />
        )}

        {unit.ironweldInnovation && (
          <EnhancementAccordion
            title="Ironweld Innovation"
            enhancement={unit.ironweldInnovation}
          />
        )}

        {unit.accursedDevice && (
          <EnhancementAccordion
            title="Dispositivo maldito"
            enhancement={unit.accursedDevice}
          />
        )}

        {unit.brazenMutation && (
          <EnhancementAccordion
            title="Mutación de bronce"
            enhancement={unit.brazenMutation}
          />
        )}

        {unit.brandOfDarkGod && (
          <EnhancementAccordion
            title="Brand of the Dark Gods"
            enhancement={unit.brandOfDarkGod}
          />
        )}

        {unit.ensorcelledBanner && (
          <EnhancementAccordion
            title="Ensorcelled Banner"
            enhancement={unit.ensorcelledBanner}
          />
        )}

        {unit.boonOfShadow && (
          <EnhancementAccordion
            title="Boon of Shadow"
            enhancement={unit.boonOfShadow}
          />
        )}

        {unit.aqshyEnhancement && (
          <EnhancementAccordion
            title={unit.aqshyEnhancement.groupName ?? "Mejora de Aqshy"}
            enhancement={unit.aqshyEnhancement}
          />
        )}

        {Object.entries(unit.specialEnhancements ?? {}).map(([category, enhancement]) =>
          enhancement ? (
            <EnhancementAccordion
              key={category}
              title={category}
              enhancement={enhancement}
            />
          ) : null
        )}

        {(unit.lore || unit.details?.lore) && (
          <Accordion title="Lore" storageKey={`${accordionPrefix}:lore`}>
            <RuleCopyBlocks lore={unit.lore ?? unit.details?.lore} />
          </Accordion>
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
        <div className="aos-weapon-profile__heading">
          <h3 style={styles.weaponName}>{weapon.name}</h3>
        </div>

        <div
          style={{
            ...styles.weaponGrid,
            gridTemplateColumns: `repeat(${
              type === "Ranged" ? 6 : 5
            }, minmax(0, 1fr))`,
          }}
        >
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

      <strong style={styles.weaponStatValue}>
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

  return (
    <div className="aos-ability-groups">
      {groupAbilitiesByPhase(abilities).map((group) => (
        <section className="aos-ability-group" key={group.id}>
          <div className="aos-ability-group__cards">
            {group.items.map((ability, index) => (
              <AbilityCard
                key={`${ability.name}-${index}`}
                ability={ability}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function EnhancementAccordion({
  title,
  enhancement,
  storageKey,
}) {
  return (
    <Accordion
      title={title}
      storageKey={storageKey ?? `storm-forge:warscroll-enhancement:${enhancement.id ?? enhancement.name}`}
    >
      <h3 style={styles.enhancementName}>
        {enhancement.name}
      </h3>

      <span className="aos-rule-card__phase">
        {getEnhancementTiming(enhancement)}
      </span>

      {enhancement.source && (
        <span style={styles.enhancementSource}>
          {enhancement.source}
        </span>
      )}

      <RuleCopyBlocks lore={enhancement.lore} rule={enhancement.description} />
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
    unit?.mortisanRefinement,
    unit?.originOfTerrifyingFolkTale,
    unit?.visionOfFate,
    unit?.specialKnickKnack,
    unit?.flawlessManoeuvre,
    unit?.plaguefathersPox,
    unit?.decorationForValour,
    unit?.ironweldInnovation,
    unit?.accursedDevice,
    unit?.brazenMutation,
    unit?.brandOfDarkGod,
    unit?.ensorcelledBanner,
    unit?.boonOfShadow,
    unit?.aqshyEnhancement,
    ...Object.values(unit?.specialEnhancements ?? {}),
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
    gap: 4,
  },

  weaponStat: {
    minWidth: 0,
    padding: "7px 2px",
    border:
      "1px solid rgba(0,0,0,0.13)",
    backgroundColor: "#ffffff",
    textAlign: "center",
  },

  weaponStatLabel: {
    display: "block",
    marginBottom: 3,
    color: "#666666",
    fontSize: 8,
    fontWeight: 700,
    textTransform: "uppercase",
  },

  weaponAbilities: {
    paddingTop: 10,
    color: "#6e120c",
    fontSize: 13,
    fontWeight: 700,
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

  weaponStatValue: {
    fontSize: 13,
    whiteSpace: "nowrap",
  },

  preservedText: {
    whiteSpace: "pre-line",
    lineHeight: 1.55,
  },
};

export default UnitWarscroll;
