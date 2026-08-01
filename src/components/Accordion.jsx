import { useState } from "react";
import ChevronIcon from "./ChevronIcon";

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
      className={`aos-accordion ${isDark ? "aos-accordion--dark" : "aos-accordion--light"} ${open ? "is-open" : ""}`}
    >
      <button
        className="aos-accordion__trigger"
        type="button"
        onClick={() =>
          setOpen((previous) => !previous)
        }
        aria-expanded={open}
      >
        <div className="aos-accordion__label">
          <strong>
            {title}
          </strong>

          {subtitle && (
            <span>
              {subtitle}
            </span>
          )}
        </div>

        <span
          className="aos-accordion__chevron"
          aria-hidden="true"
        >
          <ChevronIcon
            direction={open ? "up" : "down"}
            size={8}
            thickness={2}
          />
        </span>
      </button>

      {open && (
        <div className="aos-accordion__content">
          {children}
        </div>
      )}
    </section>
  );
}

export default Accordion;
