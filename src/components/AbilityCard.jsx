import {
  getAbilityPhaseIcon,
  getAbilityPhaseTone,
  getAbilityTiming,
  parseAbilityDescription,
  parseFormattedText,
} from "../utils/abilityFormatting";
import ChevronIcon from "./ChevronIcon";
import FormattedRulesText from "./FormattedRulesText";

function FormattedText({ text }) {
  const { lead, bullets } = parseFormattedText(text);

  return (
    <>
      {lead && <p><FormattedRulesText text={lead} /></p>}
      {bullets.length > 0 && (
        <ul>
          {bullets.map((bullet, index) => (
            <li key={`${bullet}-${index}`}><FormattedRulesText text={bullet} /></li>
          ))}
        </ul>
      )}
    </>
  );
}

function AbilityCard({ ability, defaultOpen = true, context = null }) {
  const timing = getAbilityTiming(ability);
  const tone = getAbilityPhaseTone(ability);
  const { introduction, sections } = parseAbilityDescription(ability.description);
  const keywords = ability.keywords ?? [];

  return (
    <details className={`aos-ability-card aos-ability-card--${tone}`} open={defaultOpen}>
      <summary className="aos-ability-card__timing">
        <span className="aos-ability-card__icon" aria-hidden="true">
          {getAbilityPhaseIcon(ability)}
        </span>
        <span className="aos-ability-card__timing-label">
          <FormattedRulesText text={timing} />
        </span>
        {Number(ability.commandPoints) > 0 && (
          <span className="aos-ability-card__cost">{ability.commandPoints} PC</span>
        )}
        <span className="aos-ability-card__chevron" aria-hidden="true">
          <ChevronIcon direction="down" size={9} thickness={2} />
        </span>
      </summary>

      <div className="aos-ability-card__body">
        <h3>{ability.name}</h3>

        {(ability.castingValue != null || ability.chantingValue != null) && (
          <p className="aos-ability-card__roll">
            {ability.chantingValue != null ? "Valor de canto" : "Valor de lanzamiento"}: {ability.chantingValue ?? ability.castingValue}+
          </p>
        )}

        {context}

        {introduction && (
          <div className="aos-ability-card__text">
            <FormattedText text={introduction} />
          </div>
        )}

        {sections.map((section, index) => (
          <section className="aos-ability-card__step" key={`${section.title}-${index}`}>
            <h4>{section.title}</h4>
            <FormattedText text={section.text} />
          </section>
        ))}

        {sections.length === 0 && !introduction && (
          <p className="aos-ability-card__empty">Sin descripción.</p>
        )}

        {keywords.length > 0 && (
          <div className="aos-ability-card__keywords">
            <strong>Palabras clave:</strong>
            <span>{keywords.join(" · ")}</span>
          </div>
        )}
      </div>
    </details>
  );
}

export default AbilityCard;
