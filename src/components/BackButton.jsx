function BackButton({
  onClick,
  label = "Volver",
  light = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,

        minHeight: 42,
        padding: "8px 12px",

        border: light
          ? "1px solid rgba(255,255,255,0.35)"
          : "1px solid #aaa69e",

        borderRadius: 4,

        backgroundColor: light
          ? "rgba(0,0,0,0.18)"
          : "#f0eee8",

        color: light
          ? "#ffffff"
          : "#17171a",

        fontSize: 14,
        fontWeight: 800,
        letterSpacing: "0.04em",
        textTransform: "uppercase",

        cursor: "pointer",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          fontSize: 19,
          lineHeight: 1,
        }}
      >
        ‹
      </span>

      {label}
    </button>
  );
}

export default BackButton;