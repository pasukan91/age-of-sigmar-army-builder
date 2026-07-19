function BackButton({
  onClick,
  label = "Volver",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 14px",
        marginBottom: 18,
        border: "1px solid #b8b8b8",
        borderRadius: 8,
        backgroundColor: "#ffffff",
        color: "#111111",
        fontSize: 16,
        fontWeight: 700,
        cursor: "pointer",
      }}
    >
      <span aria-hidden="true">
        ←
      </span>

      <span>{label}</span>
    </button>
  );
}

export default BackButton;