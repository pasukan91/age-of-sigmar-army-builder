import {
  calculateArmyPoints,
  hasExceededPointsLimit,
} from "../../utils/armyPoints";

function BuilderHeader({ list }) {
  const currentPoints =
    calculateArmyPoints(list);

  const pointsLimit =
    Number(list.pointsLimit) || 0;

  const hasExceededLimit =
    hasExceededPointsLimit(list);

  return (
    <header
      style={{
        padding: 20,
        marginBottom: 20,
        borderBottom: "1px solid #cccccc",
        backgroundColor: "#ffffff",
        color: "#111111",
      }}
    >
      <h1
        style={{
          marginTop: 0,
          marginBottom: 8,
        }}
      >
        {list.name}
      </h1>

      <p
        style={{
          marginTop: 0,
          marginBottom: 8,
          fontSize: 18,
        }}
      >
        {list.faction?.name}
      </p>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 14px",
          borderRadius: 8,
          backgroundColor: hasExceededLimit
            ? "#991b1b"
            : "#1f7a1f",
          color: "#ffffff",
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        {currentPoints}/{pointsLimit} puntos
      </div>

      {hasExceededLimit && (
        <div
          role="alert"
          style={{
            padding: 14,
            marginTop: 14,
            border: "1px solid #991b1b",
            borderRadius: 8,
            backgroundColor: "#fee2e2",
            color: "#7f1d1d",
            fontWeight: 700,
          }}
        >
          Has superado el límite de puntos por{" "}
          {currentPoints - pointsLimit} puntos.
        </div>
      )}
    </header>
  );
}

export default BuilderHeader;