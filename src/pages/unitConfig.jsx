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

  const canBeReinforced =
    !isHero &&
    baseModels > 1 &&
    unit.rules?.canBeReinforced !== false;

  const canSelectArtefact =
    isHero && !isUnique;

  const canSelectHeroicTrait =
    isHero && !isUnique;

  const canSelectMonstrousTrait =
    isHero &&
    isMonster &&
    !isUnique;

  const artefactOptions = [
    ...(faction?.artefacts ?? []),
    ...(faction?.aqshyArtefacts ?? []),
  ];

  const heroicTraitOptions =
    faction?.heroicTraits ?? [];

  const monstrousTraitOptions =
    faction?.monsterTraits ?? [];

  const totalModels =
    canBeReinforced && reinforced
      ? baseModels * 2
      : baseModels;

  const totalPoints =
    canBeReinforced && reinforced
      ? basePoints * 2
      : basePoints;

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

      <header style={styles.header}>
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

      {canBeReinforced && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            Tamaño de unidad
          </h2>

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

      {canSelectHeroicTrait && (
        <SelectionSection
          title="Rasgo heroico"
          options={heroicTraitOptions}
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
  options = [],
  selected,
  onToggle,
}) {
  return (
    <section style={styles.section}>
      <h2 style={styles.sectionTitle}>
        {title}
      </h2>

      {options.length === 0 && (
        <p style={styles.emptyText}>
          No hay opciones disponibles.
        </p>
      )}

      {options.map((option) => (
        <CheckboxOption
          key={option.id}
          title={option.name}
          description={
            option.description
          }
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
  checked,
  onChange,
}) {
  return (
    <label
      style={{
        ...styles.optionCard,

        ...(checked
          ? styles.selectedOptionCard
          : {}),
      }}
    >
      <div style={styles.optionContent}>
        <strong style={styles.optionTitle}>
          {title}
        </strong>

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
      "repeat(auto-fit, minmax(120px, 1fr))",
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
};

export default UnitConfig;
