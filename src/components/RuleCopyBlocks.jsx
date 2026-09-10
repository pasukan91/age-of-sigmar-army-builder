import FormattedRulesText from "./FormattedRulesText";

function CopyBlock({ kind, label, text }) {
  if (!text) return null;

  return (
    <section className={`aos-rule-copy aos-rule-copy--${kind}`}>
      <span className="aos-rule-copy__label">{label}</span>
      <p><FormattedRulesText text={text} /></p>
    </section>
  );
}

function RuleCopyBlocks({
  lore,
  rule,
  loreLabel = "Trasfondo",
  ruleLabel = "Regla",
  className = "",
}) {
  if (!lore && !rule) return null;

  return (
    <div className={`aos-rule-copy-group${className ? ` ${className}` : ""}`}>
      <CopyBlock kind="lore" label={loreLabel} text={lore} />
      <CopyBlock kind="rule" label={ruleLabel} text={rule} />
    </div>
  );
}

export default RuleCopyBlocks;
