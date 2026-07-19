import { useState } from "react";

function Accordion({
  title,
  children,
  defaultOpen = false,
  subtitle = null,
}) {
  const [isOpen, setIsOpen] =
    useState(defaultOpen);

  return (
    <section
      style={{
        marginBottom: 14,
        border: "1px solid #d0d0d0",
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "#ffffff",
        color: "#111111",
      }}
    >
      <button
        type="button"
        onClick={() =>
          setIsOpen((previous) => !previous)
        }
        aria-expanded={isOpen}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          width: "100%",
          padding: 16,
          border: "none",
          backgroundColor: "#ffffff",
          color: "#111111",
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        <div>
          <strong
            style={{
              display: "block",
              fontSize: 18,
            }}
          >
            {title}
          </strong>

          {subtitle && (
            <span
              style={{
                display: "block",
                marginTop: 4,
                color: "#666666",
                fontSize: 14,
              }}
            >
              {subtitle}
            </span>
          )}
        </div>

        <span
          aria-hidden="true"
          style={{
            flexShrink: 0,
            fontSize: 22,
            fontWeight: 700,
            transform: isOpen
              ? "rotate(180deg)"
              : "rotate(0deg)",
            transition:
              "transform 0.2s ease",
          }}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div
          style={{
            padding: 16,
            borderTop:
              "1px solid #d0d0d0",
            lineHeight: 1.6,
            whiteSpace: "pre-line",
          }}
        >
          {children}
        </div>
      )}
    </section>
  );
}

export default Accordion;