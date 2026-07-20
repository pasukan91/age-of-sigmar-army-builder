import {
  calculateArmyPoints,
  hasExceededPointsLimit,
} from "../../utils/armyPoints";

function BuilderHeader({ list, storageStatus = "saved" }) {
  const currentPoints =
    calculateArmyPoints(list);

  const pointsLimit =
    Number(
      list?.pointsLimit ??
        list?.points
    ) || 0;

  const exceeded =
    hasExceededPointsLimit(list);

  return (
    <header className="aos-army-summary-card" style={styles.header}>
      <div style={styles.overlay}>
        <p style={styles.factionLabel}>
          {list.faction?.name ??
            "Age of Sigmar"}
        </p>

        {list.armyOfRenown && (
          <p style={styles.renownLabel}>
            {list.armyOfRenown.name}
          </p>
        )}

        <h1 style={styles.title}>
          {list.name}
        </h1>

        <div
          role="status"
          aria-live="polite"
          style={{
            ...styles.saveStatus,
            ...(storageStatus === "error"
              ? styles.saveStatusError
              : {}),
          }}
        >
          <span aria-hidden="true">
            {storageStatus === "error" ? "!" : "✓"}
          </span>
          {storageStatus === "saving"
            ? "Guardando…"
            : storageStatus === "error"
              ? "No se pudo guardar"
              : "Guardada en este dispositivo"}
        </div>

        <div style={styles.divider} />

        <div style={styles.pointsRow}>
          <div>
            <span style={styles.pointsLabel}>
              Puntos
            </span>

            <div
              style={{
                ...styles.pointsValue,

                color: exceeded
                  ? "#ffd0cb"
                  : "#ffffff",
              }}
            >
              {currentPoints}
              <span style={styles.limit}>
                {" "}
                / {pointsLimit}
              </span>
            </div>
          </div>

          <div
            style={{
              ...styles.statusBadge,

              backgroundColor: exceeded
                ? "#9c2923"
                : "#426547",
            }}
          >
            {exceeded
              ? "Límite superado"
              : "Lista válida"}
          </div>
        </div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    margin: 16,
    borderRadius: 8,

    background:
      "linear-gradient(135deg, #5d120e 0%, #8d2018 58%, #32100e 100%)",

    color: "#ffffff",

    overflow: "hidden",

    boxShadow:
      "0 8px 22px rgba(0,0,0,0.28)",
  },

  overlay: {
    padding: "24px 20px",

    background:
      "linear-gradient(90deg, rgba(0,0,0,0.25), rgba(0,0,0,0.04))",
  },

  factionLabel: {
    margin: "0 0 5px",

    color: "#e0c489",

    fontSize: 12,
    fontWeight: 900,
    letterSpacing: "0.13em",
    textTransform: "uppercase",
  },

  renownLabel: {
    margin: "0 0 7px",
    color: "#ffffff",
    fontFamily: '"Oswald", "Arial Narrow", sans-serif',
    fontSize: 16,
    fontWeight: 700,
    textTransform: "uppercase",
  },

  title: {
    margin: 0,

    fontSize: 28,
    lineHeight: 1.05,
    fontWeight: 900,
    letterSpacing: "0.02em",
    textTransform: "uppercase",
  },

  divider: {
    width: 56,
    height: 3,

    margin: "15px 0",

    backgroundColor: "#c6a15b",
  },

  saveStatus: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "5px 8px",
    marginTop: 10,
    border: "1px solid rgba(255,255,255,0.22)",
    borderRadius: 999,
    color: "#f4ead3",
    backgroundColor: "rgba(0,0,0,0.18)",
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },

  saveStatusError: {
    color: "#ffffff",
    backgroundColor: "#9c2923",
  },

  pointsRow: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 15,
  },

  pointsLabel: {
    display: "block",

    color: "#dfd9cf",

    fontSize: 11,
    fontWeight: 900,
    letterSpacing: "0.11em",
    textTransform: "uppercase",
  },

  pointsValue: {
    marginTop: 2,

    fontSize: 27,
    fontWeight: 900,
  },

  limit: {
    color: "#dfd9cf",
    fontSize: 18,
  },

  statusBadge: {
    padding: "7px 10px",

    border:
      "1px solid rgba(255,255,255,0.25)",

    borderRadius: 4,

    color: "#ffffff",

    fontSize: 11,
    fontWeight: 900,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
};

export default BuilderHeader;
