import { useState } from "react";

import BackButton from "../components/BackButton";

function UnitConfig({
  unit,
  faction,
  mode,
  goBack,
  onConfirm,
}) {
  const [reinforced, setReinforced] =
    useState(
      Boolean(unit?.reinforced)
    );

  const [heroicTrait, setHeroicTrait] =
    useState(
      unit?.heroicTrait ?? null
    );

  const [monstrousTrait, setMonstrousTrait] =
    useState(
      unit?.monstrousTrait ?? null
    );

  const [artefact, setArtefact] =
    useState(unit?.artefact ?? null);

  const [allConsumingObsession, setAllConsumingObsession] =
    useState(unit?.allConsumingObsession ?? null);

  const [moulderMutation, setMoulderMutation] =
    useState(unit?.moulderMutation ?? null);

  if (!unit) {
    return (
      <main className="aos-shell">
        <header className="aos-screen-header">
          <BackButton
            onClick={goBack}
            light
            compact
          />
          <h1 className="aos-screen-header__title">
            Configuración
          </h1>
          <span aria-hidden="true" />
        </header>

        <div className="aos-screen-content">
          <p className="aos-empty-message">
            No hay ninguna unidad seleccionada.
          </p>
        </div>
      </main>
    );
  }

  const keywords = Array.isArray(
    unit.keywords
  )
    ? unit.keywords.map((keyword) =>
        String(keyword)
          .trim()
          .toLowerCase()
      )
    : [];

  const baseModels =
    Number(unit.details?.models) || 1;

  const basePoints =
    Number(unit.points) || 0;

  const isHero =
    unit.rules?.hero === true ||
    keywords.includes("hero");

  const isUnique =
    unit.rules?.unique === true ||
    keywords.includes("unique");

  const isMonster =
    unit.rules?.monster === true ||
    keywords.includes("monster");

  const isWarMachine =
    keywords.includes("war machine");

  const isHedonitesFaction =
    faction?.id === "hedonites" ||
    faction?.name === "Hedonites of Slaanesh" ||
    keywords.includes("hedonites of slaanesh");

  const canBeReinforced =
    !isHero &&
    baseModels > 1 &&
    unit.rules?.canBeReinforced !== false;

  const canSelectArtefact =
    isHero && !isUnique;

  const canSelectHeroicTrait =
    isHero && !isUnique;

  const rawMonstrousTraitOptions =
    faction?.monsterTraits ?? [];

  const monstrousTraitOptions =
    Array.isArray(rawMonstrousTraitOptions)
      ? rawMonstrousTraitOptions
      : Object.values(rawMonstrousTraitOptions).flat();

  const canSelectMonstrousTrait =
    !isHedonitesFaction &&
    isHero &&
    isMonster &&
    !isUnique &&
    monstrousTraitOptions.length > 0;

  const canSelectAllConsumingObsession =
    !isHero &&
    (keywords.includes("infantry") ||
      keywords.includes("cavalry")) &&
    (faction?.allConsumingObsessions?.length ?? 0) > 0;

  const canSelectMoulderMutation =
    !isHero &&
    !isWarMachine &&
    keywords.includes("skaven") &&
    (faction?.moulderMutations?.length ?? 0) > 0;

  const artefactOptions = [
    ...(faction?.artefacts ?? []),
    ...(faction?.aqshyArtefacts ?? []),
  ];

  const heroicTraitOptions =
    faction?.heroicTraits ?? [];

  const aqshyHeroicTraitOptions =
    heroicTraitOptions.filter(
      (option) => option.source === "Aqshy"
    );

  const standardHeroicTraitOptions =
    heroicTraitOptions.filter(
      (option) => option.source !== "Aqshy"
    );

  const allConsumingObsessionOptions =
    faction?.allConsumingObsessions ?? [];

  const moulderMutationOptions =
    faction?.moulderMutations ?? [];

  const totalModels =
    canBeReinforced && reinforced
      ? baseModels * 2
      : baseModels;

  const totalPoints =
    (canBeReinforced && reinforced
      ? basePoints * 2
      : basePoints) +
    Number(artefact?.points ?? 0) +
    Number(heroicTrait?.points ?? 0) +
    Number(monstrousTrait?.points ?? 0) +
    Number(allConsumingObsession?.points ?? 0) +
    Number(moulderMutation?.points ?? 0);

  function handleConfirm() {
    if (
      typeof onConfirm !== "function"
    ) {
      return;
    }

    onConfirm({
      ...unit,

      reinforced:
        canBeReinforced &&
        reinforced,

      configuredModels:
        totalModels,

      artefact:
        canSelectArtefact
          ? artefact
          : null,

      heroicTrait:
        canSelectHeroicTrait
          ? heroicTrait
          : null,

      monstrousTrait:
        canSelectMonstrousTrait
          ? monstrousTrait
          : null,

      allConsumingObsession:
        canSelectAllConsumingObsession
          ? allConsumingObsession
          : null,

      moulderMutation:
        canSelectMoulderMutation
          ? moulderMutation
          : null,
    });
  }

  function toggleExclusiveOption(
    setter,
    option
  ) {
    setter((previous) =>
      previous?.id === option.id
        ? null
        : option
    );
  }

  function getConfirmText() {
    if (mode === "editUnit") {
      return "Guardar configuración";
    }

    if (mode === "newRegiment") {
      return "Crear regimiento";
    }

    return "Añadir unidad";
  }

  return (
    <main className="aos-shell">
      <header className="aos-screen-header">
        <BackButton
          onClick={goBack}
          light
          compact
        />

        <h1 className="aos-screen-header__title">
          Configuración
        </h1>

        <span aria-hidden="true" />
      </header>

      <div className="aos-screen-content">

      <header className="aos-unit-config-header" style={styles.header}>
        <div>
          <p style={styles.eyebrow}>
            Configuración
          </p>

          <h1 style={styles.title}>
            {unit.name}
          </h1>
        </div>

        <div style={styles.pointsBox}>
          <strong>{totalPoints}</strong>

          <span>
            {totalPoints === 1
              ? " punto"
              : " puntos"}
          </span>
        </div>
      </header>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>
          Resumen
        </h2>

        <div style={styles.summaryGrid}>
          <SummaryItem
            label="Modelos"
            value={totalModels}
          />

          <SummaryItem
            label="Movimiento"
            value={
              unit.profile?.move ?? "-"
            }
          />

          <SummaryItem
            label="Salud"
            value={
              unit.profile?.health ?? "-"
            }
          />

          <SummaryItem
            label="Salvación"
            value={
              unit.profile?.save ?? "-"
            }
          />
        </div>
      </section>

      {(canBeReinforced ||
        canSelectAllConsumingObsession ||
        canSelectMoulderMutation) && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            Tamaño y mejoras de unidad
          </h2>

          {canBeReinforced && (
            <CheckboxOption
              title="Unidad reforzada"
              description={
                `Duplica el tamaño de ` +
                `${baseModels} a ` +
                `${baseModels * 2} modelos.`
              }
              checked={reinforced}
              onChange={() =>
                setReinforced(
                  (previous) => !previous
                )
              }
            />
          )}

          {canSelectAllConsumingObsession && (
            <div style={styles.embeddedEnhancement}>
              <div style={styles.sectionHeadingRow}>
                <h3 style={styles.embeddedTitle}>
                  Obsesiones devoradoras
                </h3>

                <span
                  style={{
                    ...styles.sourceBadge,
                    ...styles.aqshySourceBadge,
                    marginTop: 0,
                  }}
                >
                  Aqshy
                </span>
              </div>

              <p style={styles.sectionIntro}>
                Asigna una Obsesión de Aqshy a esta unidad.
                Cada una solo puede elegirse una vez por ejército.
              </p>

              {allConsumingObsessionOptions.map((option) => (
                <CheckboxOption
                  key={option.id}
                  title={`${option.name} · ${option.points} pts`}
                  description={option.description}
                  source={option.source}
                  checked={
                    allConsumingObsession?.id === option.id
                  }
                  onChange={() =>
                    toggleExclusiveOption(
                      setAllConsumingObsession,
                      option
                    )
                  }
                />
              ))}
            </div>
          )}

          {canSelectMoulderMutation && (
            <div style={styles.embeddedEnhancement}>
              <div style={styles.sectionHeadingRow}>
                <h3 style={styles.embeddedTitle}>
                  Mutaciones Moulder
                </h3>

                <span
                  style={{
                    ...styles.sourceBadge,
                    ...styles.aqshySourceBadge,
                    marginTop: 0,
                  }}
                >
                  Aqshy
                </span>
              </div>

              <p style={styles.sectionIntro}>
                Asigna una mutación a esta unidad Skaven no Hero y no Máquina de Guerra. Cada mutación solo puede elegirse una vez por ejército.
              </p>

              {moulderMutationOptions.map((option) => (
                <CheckboxOption
                  key={option.id}
                  title={`${option.name} · ${option.points} pts`}
                  description={option.description}
                  source={option.source}
                  checked={moulderMutation?.id === option.id}
                  onChange={() =>
                    toggleExclusiveOption(
                      setMoulderMutation,
                      option
                    )
                  }
                />
              ))}
            </div>
          )}
        </section>
      )}

      {canSelectArtefact && (
        <SelectionSection
          title="Artefacto de poder"
          options={artefactOptions}
          selected={artefact}
          onToggle={(option) =>
            toggleExclusiveOption(
              setArtefact,
              option
            )
          }
        />
      )}

      {canSelectHeroicTrait &&
        standardHeroicTraitOptions.length > 0 && (
        <SelectionSection
          title="Rasgo heroico"
          options={standardHeroicTraitOptions}
          selected={heroicTrait}
          onToggle={(option) =>
            toggleExclusiveOption(
              setHeroicTrait,
              option
            )
          }
        />
      )}

      {canSelectHeroicTrait &&
        aqshyHeroicTraitOptions.length > 0 && (
        <SelectionSection
          title="Rasgos heroicos de Aqshy"
          source="Aqshy"
          intro="Contenido adicional de Scourge of Aqshy. Elige uno de estos rasgos o uno del Battletome."
          options={aqshyHeroicTraitOptions}
          selected={heroicTrait}
          onToggle={(option) =>
            toggleExclusiveOption(
              setHeroicTrait,
              option
            )
          }
        />
      )}

      {canSelectMonstrousTrait && (
        <SelectionSection
          title="Rasgo monstruoso"
          options={
            monstrousTraitOptions
          }
          selected={monstrousTrait}
          onToggle={(option) =>
            toggleExclusiveOption(
              setMonstrousTrait,
              option
            )
          }
        />
      )}

      {isUnique && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            Mejoras
          </h2>

          <p style={styles.emptyText}>
            Esta unidad es única y no puede
            recibir artefactos ni rasgos.
          </p>
        </section>
      )}

      <button
        type="button"
        onClick={handleConfirm}
        style={styles.confirmButton}
      >
        {getConfirmText()}
      </button>
      </div>
    </main>
  );
}

function SummaryItem({
  label,
  value,
}) {
  return (
    <div style={styles.summaryItem}>
      <span style={styles.summaryLabel}>
        {label}
      </span>

      <strong style={styles.summaryValue}>
        {value}
      </strong>
    </div>
  );
}

function SelectionSection({
  title,
  source,
  intro,
  options = [],
  selected,
  onToggle,
}) {
  return (
    <section className="aos-unit-config-section" style={styles.section}>
      <div className="aos-unit-config-heading-row" style={styles.sectionHeadingRow}>
        <h2 style={styles.sectionTitle}>
          {title}
        </h2>

        {source && (
          <span
            style={{
              ...styles.sourceBadge,
              ...styles.aqshySourceBadge,
              marginTop: 0,
            }}
          >
            {source}
          </span>
        )}
      </div>

      {intro && (
        <p style={styles.sectionIntro}>
          {intro}
        </p>
      )}

      {options.length === 0 && (
        <p style={styles.emptyText}>
          No hay opciones disponibles.
        </p>
      )}

      {options.map((option) => (
        <CheckboxOption
          key={option.id}
          title={
            Number(option.points) > 0
              ? `${option.name} · ${option.points} pts`
              : option.name
          }
          description={
            option.description
          }
          source={option.source}
          checked={
            selected?.id === option.id
          }
          onChange={() =>
            onToggle(option)
          }
        />
      ))}
    </section>
  );
}

function CheckboxOption({
  title,
  description,
  source,
  checked,
  onChange,
}) {
  return (
    <label
      className="aos-config-option-card"
      style={{
        ...styles.optionCard,

        ...(checked
          ? styles.selectedOptionCard
          : {}),
      }}
    >
      <div className="aos-config-option-content" style={styles.optionContent}>
        <strong style={styles.optionTitle}>
          {title}
        </strong>

        {source && (
          <span
            style={{
              ...styles.sourceBadge,
              ...(source === "Aqshy"
                ? styles.aqshySourceBadge
                : styles.standardSourceBadge),
            }}
          >
            {source}
          </span>
        )}

        {description && (
          <p
            style={
              styles.optionDescription
            }
          >
            {description}
          </p>
        )}
      </div>

      <input
        className="aos-config-option-checkbox"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={styles.checkbox}
      />
    </label>
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 20,
    marginBottom: 22,
  },

  eyebrow: {
    margin: "0 0 4px",
    color: "#891f18",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },

  title: {
    margin: 0,
    fontFamily:
      '"Oswald", "Arial Narrow", sans-serif',
    fontSize: "clamp(30px, 6vw, 42px)",
    lineHeight: 1.05,
    textTransform: "uppercase",
  },

  pointsBox: {
    minWidth: 90,
    padding: 12,
    border: "1px solid #8f6c2e",
    borderRadius: 3,
    color: "#ffffff",
    backgroundColor: "#891f18",
    textAlign: "center",
  },

  section: {
    padding: 18,
    marginBottom: 18,
    border: "1px solid #d4cec1",
    borderTop: "4px solid #8f6c2e",
    borderRadius: 3,
    backgroundColor: "#faf8f3",
    boxShadow:
      "0 4px 14px rgba(47,38,28,0.11)",
  },

  sectionTitle: {
    margin: "0 0 14px",
    color: "#39322c",
    fontFamily:
      '"Oswald", "Arial Narrow", sans-serif',
    textAlign: "left",
    fontSize: 22,
    textTransform: "uppercase",
  },

  summaryGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(100px, 1fr))",
    gap: 10,
  },

  summaryItem: {
    padding: 12,
    border: "1px solid #dddddd",
    borderRadius: 999,
    backgroundColor: "#eee8dc",
    textAlign: "center",
  },

  summaryLabel: {
    display: "block",
    marginBottom: 4,
    color: "#666666",
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
  },

  summaryValue: {
    fontSize: 18,
  },

  optionCard: {
    width: "100%",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 18,
    padding: 16,
    marginBottom: 10,
    border: "1px solid #cccccc",
    borderRadius: 3,
    backgroundColor: "#fffefa",
    color: "#111111",
    cursor: "pointer",
  },

  selectedOptionCard: {
    border: "2px solid #891f18",
    backgroundColor: "#f4e9e3",
  },

  optionContent: {
    flex: 1,
    minWidth: 0,
    textAlign: "left",
  },

  optionTitle: {
    display: "block",
    fontSize: 17,
  },

  optionDescription: {
    margin: "8px 0 0",
    whiteSpace: "pre-line",
    lineHeight: 1.5,
    fontSize: 16,
  },

  checkbox: {
    width: 26,
    height: 26,
    flexShrink: 0,
    accentColor: "#891f18",
    cursor: "pointer",
  },

  emptyText: {
    margin: 0,
    textAlign: "center",
    color: "#555555",
  },

  confirmButton: {
    width: "100%",
    padding: 16,
    marginTop: 4,
    border: "1px solid #5f120e",
    borderRadius: 3,
    background:
      "linear-gradient(180deg, #a22b22, #5f120e)",
    color: "#ffffff",
    fontSize: 18,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow:
      "0 4px 10px rgba(95,18,14,0.28)",
  },

  sectionHeadingRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  sectionIntro: {
    margin: "-3px 0 14px",
    color: "#625b51",
    fontSize: 14,
    lineHeight: 1.45,
    textAlign: "left",
  },

  embeddedEnhancement: {
    paddingTop: 16,
    marginTop: 16,
    borderTop: "1px solid #d4c7ad",
  },

  embeddedTitle: {
    margin: 0,
    color: "#39322c",
    fontFamily:
      '"Oswald", "Arial Narrow", sans-serif',
    fontSize: 20,
    textTransform: "uppercase",
  },

  sourceBadge: {
    display: "inline-block",
    padding: "3px 8px",
    marginTop: 8,
    borderRadius: 999,
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },

  aqshySourceBadge: {
    border: "1px solid #9a6820",
    backgroundColor: "#f2dfb3",
    color: "#5f3b0d",
  },

  standardSourceBadge: {
    border: "1px solid #8b8983",
    backgroundColor: "#e8e5de",
    color: "#4f4b43",
  },
};

export default UnitConfig;
