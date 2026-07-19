import { useEffect, useState } from "react";

import BackButton from "../components/BackButton";

function UnitConfig({
  unit,
  faction,
  mode,
  goBack,
  onConfirm,
}) {
  const [reinforced, setReinforced] =
    useState(false);

  const [heroicTrait, setHeroicTrait] =
    useState(null);

  const [monstrousTrait, setMonstrousTrait] =
    useState(null);

  const [artefact, setArtefact] =
    useState(null);

  /*
   * Si cambiamos de unidad sin desmontar el
   * componente, sincronizamos el formulario.
   */
  useEffect(() => {
    setReinforced(
      Boolean(unit?.reinforced)
    );

    setHeroicTrait(
      unit?.heroicTrait ?? null
    );

    setMonstrousTrait(
      unit?.monstrousTrait ?? null
    );

    setArtefact(
      unit?.artefact ?? null
    );
  }, [unit]);

  if (!unit) {
    return (
      <main style={styles.page}>
        <BackButton onClick={goBack} />

        <p>
          No hay ninguna unidad seleccionada.
        </p>
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
    <main style={styles.page}>
      <BackButton onClick={goBack} />

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
  page: {
    minHeight: "100vh",
    padding: 20,
    backgroundColor: "#eeeeee",
    color: "#111111",
  },

  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 20,
    marginBottom: 20,
  },

  eyebrow: {
    margin: "0 0 4px",
    color: "#666666",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },

  title: {
    margin: 0,
  },

  pointsBox: {
    minWidth: 90,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    textAlign: "center",
  },

  section: {
    padding: 18,
    marginBottom: 18,
    borderRadius: 12,
    backgroundColor: "#ffffff",
  },

  sectionTitle: {
    margin: "0 0 14px",
    textAlign: "center",
    fontSize: 22,
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
    borderRadius: 8,
    backgroundColor: "#fafafa",
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
    borderRadius: 9,
    backgroundColor: "#ffffff",
    color: "#111111",
    cursor: "pointer",
  },

  selectedOptionCard: {
    border: "2px solid #111111",
    backgroundColor: "#f3f3f3",
  },

  optionContent: {
    flex: 1,
    minWidth: 0,
    textAlign: "center",
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
    accentColor: "#111111",
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
    border: "none",
    borderRadius: 10,
    backgroundColor: "#000000",
    color: "#ffffff",
    fontSize: 18,
    fontWeight: 700,
    cursor: "pointer",
  },
};

export default UnitConfig;