import { useState } from "react";

function Accordion({
  title,
  subtitle,
  children,
  defaultOpen = false,
  variant = "light",
}) {
  const [open, setOpen] =
    useState(defaultOpen);

  const isDark = variant === "dark";

  return (
    <section
      style={{
        marginBottom: 12,

        border: isDark
          ? "1px solid #414249"
          : "1px solid #d2cec5",

        borderRadius: 6,

        backgroundColor: isDark
          ? "#292a30"
          : "#ffffff",

        color: isDark
          ? "#f6f3ea"
          : "#17171a",

        overflow: "hidden",

        boxShadow:
          "0 1px 2px rgba(0,0,0,0.14)",
      }}
    >
      <button
        type="button"
        onClick={() =>
          setOpen((previous) => !previous)
        }
        aria-expanded={open}
        style={{
          width: "100%",

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,

          padding: "14px 16px",

          border: "none",

          backgroundColor: isDark
            ? "#292a30"
            : "#ffffff",

          color: "inherit",

          textAlign: "left",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <strong
            style={{
              display: "block",

              fontSize: 16,
              fontWeight: 900,
              letterSpacing: "0.025em",
              textTransform: "uppercase",
            }}
          >
            {title}
          </strong>

          {subtitle && (
            <span
              style={{
                display: "block",
                marginTop: 3,

                color: isDark
                  ? "#b8b6bc"
                  : "#68666a",

                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {subtitle}
            </span>
          )}
        </div>

        <span
          aria-hidden="true"
          style={{
            width: 28,
            height: 28,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            borderRadius: 999,

            backgroundColor: open
              ? "#17171a"
              : "#dedbd3",

            color: open
              ? "#ffffff"
              : "#17171a",

            fontSize: 19,
            fontWeight: 800,

            transform: open
              ? "rotate(180deg)"
              : "rotate(0deg)",

            transition:
              "transform 160ms ease",
          }}
        >
         ⌄
        </span>
      </button>

      {open && (
        <div
          style={{
            padding: "4px 16px 16px",

            borderTop: isDark
              ? "1px solid #414249"
              : "1px solid #e0ddd6",

            lineHeight: 1.55,
          }}
        >
          {children}
        </div>
      )}
    </section>
  );
}

export default Accordion;