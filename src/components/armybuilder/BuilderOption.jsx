function BuilderOption({
  title,
  value,
  onClick,
  disabled = false,
}) {
  const hasValue =
    value &&
    value !== "No seleccionada" &&
    value !== "No seleccionado";

  return (
    <div
      style={{
        padding: "0 4px",
        marginBottom: 10,
      }}
    >
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        style={{
          width: "100%",
          minHeight: 70,

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,

          padding: "13px 15px",

          border: hasValue
            ? "1px solid #8d6a30"
            : "1px solid #d2cec5",

          borderLeft: hasValue
            ? "5px solid #c6a15b"
            : "5px solid #77777d",

          borderRadius: 3,

          backgroundColor: "#faf8f3",
          color: "#17171a",

          textAlign: "left",

          boxShadow:
            "0 3px 9px rgba(47,38,28,0.13)",

          opacity: disabled ? 0.55 : 1,
          cursor: disabled
            ? "not-allowed"
            : "pointer",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <span
            style={{
              display: "block",

              color: "#68666a",

              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {title}
          </span>

          <strong
            style={{
              display: "block",
              marginTop: 5,

              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",

              fontFamily:
                '"Oswald", "Arial Narrow", sans-serif',
              fontSize: 17,
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            {value}
          </strong>
        </div>

        <span
          aria-hidden="true"
          style={{
            color: "#8d2018",
            fontSize: 27,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          ›
        </span>
      </button>
    </div>
  );
}

export default BuilderOption;
