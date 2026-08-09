import { useRef, useState } from "react";

import Accordion from "../components/Accordion";
import AbilityCard from "../components/AbilityCard";
import DamageCalculator from "../components/DamageCalculator";
import UnitArtwork from "../components/UnitArtwork";
import { getEnhancementTiming } from "../utils/enhancementTiming";
import { groupAbilitiesByPhase } from "../utils/abilityFormatting";
import { isUniqueUnit } from "../utils/unitIdentity";
import { getPotentialSynergies } from "../utils/unitSynergies";

import "../styles/aos-app.css";

function UnitWarscroll({
  unit,
  list,
  onBack,
  onConfigure,
}) {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const calculatorRef = useRef(null);

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
  const accordionPrefix = `storm-forge:warscroll:${unit.id ?? unit.name}`;

  const isHedonitesUnit =
    (unit.keywords ?? []).some(
      (keyword) =>
        String(keyword).trim().toLowerCase() ===
        "hedonites of slaanesh"
    );

  function openCalculator() {
    setCalculatorOpen(true);
    window.requestAnimationFrame(() => {
      calculatorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

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

        {(unit.weapons ?? []).length > 0 && (
          <button
            type="button"
            className="aos-damage-calculator-launch"
            onClick={openCalculator}
          >
            <span aria-hidden="true">∑</span>
            <span>
              <strong>Calculadora de daño</strong>
              <small>Compara el promedio contra salvaciones de 2+ a 6+</small>
            </span>
          </button>
        )}

        {calculatorOpen && (
          <div ref={calculatorRef} className="aos-damage-calculator-anchor">
            <DamageCalculator
              key={unit.id ?? unit.name}
              unit={unit}
              models={displayedModels}
              onClose={() => setCalculatorOpen(false)}
            />
          </div>
        )}

        <Accordion
          title="Armas de combate"
          storageKey={`${accordionPrefix}:melee-weapons`}
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
            onCalculate={openCalculator}
          />
        </Accordion>

        {hasWeaponProfile(unit, "Ranged") && (
          <Accordion
            title="Armas a distancia"
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
              onCalculate={openCalculator}
            />
          </Accordion>
        )}

        <Accordion
          title="Habilidades"
          storageKey={`${accordionPrefix}:abilities`}
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
          storageKey={`${accordionPrefix}:synergies`}
        >
          <SynergyList synergies={potentialSynergies} />
        </Accordion>

        <Accordion title="Palabras clave" storageKey={`${accordionPrefix}:keywords`}>
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

        {typeof onConfigure ===
          "function" &&
          !isUniqueUnit(unit) && (
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
  onCalculate,
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
          <h3 style={styles.weaponName}>
            {weapon.name}
          </h3>
          <button
            type="button"
            className="aos-weapon-profile__calculator"
            onClick={onCalculate}
            aria-label={`Calcular daño de ${weapon.name}`}
            title="Abrir calculadora de daño"
          >
            ∑
          </button>
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
    unit?.mortisanRefinement,
    unit?.originOfTerrifyingFolkTale,
    unit?.visionOfFate,
    unit?.specialKnickKnack,
    unit?.plaguefathersPox,
    unit?.decorationForValour,
    unit?.ironweldInnovation,
    unit?.accursedDevice,
    unit?.brazenMutation,
    unit?.brandOfDarkGod,
    unit?.ensorcelledBanner,
    unit?.boonOfShadow,
    unit?.aqshyEnhancement,
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

  const groups = groupAbilitiesByPhase(
    synergies,
    (synergy) => synergy.ability
  );

  return (
    <section className="aos-synergy-list" aria-label="Sinergias potenciales">
      <p className="aos-synergy-note">
        Estas reglas proceden de unidades y opciones presentes en tu ejército. La app no decide si las condiciones se cumplen durante la partida: solo te muestra todas las combinaciones posibles.
      </p>

      <div className="aos-ability-groups">
        {groups.map((group) => (
          <section className="aos-ability-group" key={group.id}>
            <div className="aos-ability-group__cards">
              {group.items.map((synergy, index) => (
                <AbilityCard
                  key={`${synergy.sourceType}-${synergy.sourceName}-${synergy.ability?.name}-${index}`}
                  ability={synergy.ability}
                  context={(
                    <div className="aos-ability-card__context">
                      <div className="aos-synergy-card__topline">
                        <span className="aos-synergy-card__source-type">
                          {synergy.sourceType}
                        </span>
                        {isSpellAbility(synergy.ability) &&
                          synergy.ability?.castingValue != null && (
                            <span className="aos-synergy-card__casting">
                              Dificultad {synergy.ability.castingValue}+
                            </span>
                          )}
                      </div>
                      <p className="aos-synergy-card__source">
                        Aportada por <strong>{synergy.sourceName}</strong>
                      </p>
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
                    </div>
                  )}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
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
