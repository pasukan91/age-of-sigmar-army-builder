import OfficialIcon from "./OfficialIcon";

function WardSave({ ward }) {
  const value = String(ward ?? "").trim();
  if (!value || value === "-" || value === "—") return null;

  return (
    <section className="aos-ward-save" aria-label={`Ward Save ${value}`}>
      <strong>Ward Save</strong>
      <span className="aos-ward-save__badge">
        <OfficialIcon name="forge" size={46} strokeWidth={1.2} />
        <strong>{value}</strong>
      </span>
    </section>
  );
}

export default WardSave;
