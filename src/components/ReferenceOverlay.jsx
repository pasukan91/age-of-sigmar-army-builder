import { useEffect, useRef } from "react";

function ReferenceOverlay({ title, onClose, children }) {
  const sheetRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    let focusFrame;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = [...(sheetRef.current?.querySelectorAll(
        'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
      ) ?? [])];
      if (focusable.length === 0) {
        event.preventDefault();
        sheetRef.current?.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    focusFrame = window.requestAnimationFrame(() => {
      const initialTarget = sheetRef.current?.querySelector("button, [href], [tabindex]");
      (initialTarget ?? sheetRef.current)?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.cancelAnimationFrame(focusFrame);
      previousFocus?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="aos-reference-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div className="aos-reference-overlay__sheet" ref={sheetRef} tabIndex="-1">
        {children}
      </div>
    </div>
  );
}

export default ReferenceOverlay;
