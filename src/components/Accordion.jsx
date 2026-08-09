import { useEffect, useState } from "react";
import ChevronIcon from "./ChevronIcon";

function Accordion({
  title,
  subtitle,
  children,
  defaultOpen = false,
  variant = "light",
  storageKey,
}) {
  const [open, setOpen] = useState(() => getStoredState(storageKey, defaultOpen));

  useEffect(() => {
    if (!storageKey) return;

    try {
      window.localStorage.setItem(storageKey, open ? "open" : "closed");
    } catch {
      // La preferencia es opcional; el acordeón sigue funcionando sin almacenamiento.
    }
  }, [open, storageKey]);

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

function getStoredState(storageKey, fallback) {
  if (!storageKey || typeof window === "undefined") return fallback;

  try {
    const stored = window.localStorage.getItem(storageKey);
    if (stored === "open") return true;
    if (stored === "closed") return false;
  } catch {
    // Algunos navegadores bloquean localStorage en modo privado.
  }

  return fallback;
}

export default Accordion;
