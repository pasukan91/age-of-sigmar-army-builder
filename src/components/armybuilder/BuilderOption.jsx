function BuilderOption({
  title,
  value,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: 15,
        margin: 15,
        border: "1px solid #ccc",
        borderRadius: 10,
        cursor: "pointer",
      }}
    >
      <h3>{title}</h3>

      <p>{value || "No seleccionado"}</p>
    </div>
  );
}

export default BuilderOption;