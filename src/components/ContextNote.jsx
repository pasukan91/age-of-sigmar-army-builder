function ContextNote({ title = "Qué hacer", children, tone = "info" }) {
  return (
    <aside className={`aos-context-note is-${tone}`} aria-label={title}>
      <span className="aos-context-note__icon" aria-hidden="true">
        {tone === "success" ? "✓" : tone === "warning" ? "!" : "i"}
      </span>
      <div>
        <strong>{title}</strong>
        <p>{children}</p>
      </div>
    </aside>
  );
}

export default ContextNote;
