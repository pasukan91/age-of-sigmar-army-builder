import ChevronIcon from "../ChevronIcon";

function BuilderOption({
  id,
  title,
  value,
  description,
  image,
  onClick,
  required = false,
  recommended = false,
  disabled = false,
}) {
  const hasValue = Boolean(value) && !/^(no |ninguna)/i.test(String(value).trim());
  const status = hasValue
    ? "Elegido"
    : required
      ? "Obligatorio"
      : recommended
        ? "Recomendado"
        : "Opcional";

  return (
    <div
      style={{
        padding: "0 4px",
        marginBottom: 10,
      }}
    >
      <button
        id={id}
        type="button"
        className="aos-builder-option-card"
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
        {image && (
          <img
            src={image}
            alt=""
            loading="lazy"
            style={{
              width: 82,
              aspectRatio: "1.2",
              flexShrink: 0,
              border: "1px solid #b9aa93",
              borderRadius: 4,
              backgroundColor: "#eee7dc",
              objectFit: "cover",
            }}
          />
        )}

        <div
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <span className="aos-builder-option-card__heading">
            <span>{title}</span>
            <small className={hasValue ? "is-complete" : required ? "is-required" : ""}>
              {status}
            </small>
          </span>

          <strong
            style={{
              display: "block",
              marginTop: 5,

              fontFamily:
                '"Oswald", "Arial Narrow", sans-serif',
              fontSize: 17,
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            {value}
          </strong>

          {description && (
            <span className="aos-builder-option-card__description">
              {description}
            </span>
          )}
        </div>

        <span
          aria-hidden="true"
          style={{
            width: 34,
            height: 34,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            border: "1px solid rgba(141,32,24,0.25)",
            borderRadius: 999,
            color: "#8d2018",
            backgroundColor: "rgba(141,32,24,0.06)",
          }}
        >
          <ChevronIcon direction="right" size={8} />
        </span>
      </button>
    </div>
  );
}

export default BuilderOption;
