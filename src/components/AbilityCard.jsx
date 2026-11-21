import {
  getAbilityPhaseIcon,
  getAbilityPhaseTone,
  getAbilityTiming,
  parseAbilityDescription,
  parseFormattedText,
} from "../utils/abilityFormatting";
import { getUserPreferences } from "../utils/userPreferences";
import ChevronIcon from "./ChevronIcon";
import FactionMechanicIllustration from "./FactionMechanicIllustration";
import FormattedRulesText from "./FormattedRulesText";
import RuleCopyBlocks from "./RuleCopyBlocks";
import OfficialIcon from "./OfficialIcon";

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

function AbilityCard({ ability, defaultOpen = getUserPreferences().expandAbilities ?? false, context = null, variant }) {
  const isReference = variant === "reference";
  const isEnhancement = variant === "enhancement" || isReference;
  const timing = isEnhancement ? ability.phase : getAbilityTiming(ability);
  const tone = isEnhancement && /reaction/i.test(timing)
    ? "reaction"
    : getAbilityPhaseTone(ability);
  const name = String(ability.name ?? "").trim();
  const { introduction, sections } = parseAbilityDescription(ability.description);
  const keywords = ability.keywords ?? [];
  const phaseColors = { black: "#101110", green: "#2d5000", yellow: "#9b8928", red: "#781b1c", orange: "#a85e2c", blue: "#256079", gray: "#828282", grey: "#828282", purple: "#53336b" };

  return (
    <details className={`aos-ability-card aos-ability-card--${tone}${isEnhancement ? " aos-ability-card--enhancement" : ""}`} open={defaultOpen} style={isReference && phaseColors[ability.phaseColor] ? { "--ability-phase": phaseColors[ability.phaseColor] } : undefined}>
      <summary className="aos-ability-card__timing">
        <span className="aos-ability-card__icon" aria-hidden="true">
          {isEnhancement && tone === "passive"
            ? <OfficialIcon name="forge" size={24} strokeWidth={1.8} />
            : isEnhancement && (tone === "combat" || tone === "reaction")
              ? <OfficialIcon name="combatPhase" size={24} strokeWidth={1.8} />
              : getAbilityPhaseIcon(ability)}
        </span>
        <span className="aos-ability-card__heading">
          <span className="aos-ability-card__timing-label">
            <FormattedRulesText text={timing} />
          </span>
          {name && !isEnhancement && (
            <span className="aos-ability-card__name">
              <FormattedRulesText text={name} />
            </span>
          )}
        </span>
        {Number(ability.commandPoints) > 0 && (
          <span className="aos-ability-card__cost">{ability.commandPoints} {isReference ? "CP" : "PC"}</span>
        )}
        {isReference && (ability.castingValue != null || ability.chantingValue != null) && <span className="aos-ability-card__cost">{ability.chantingValue ?? ability.castingValue}</span>}
        <span className="aos-ability-card__chevron" aria-hidden="true">
          <ChevronIcon direction="down" size={9} thickness={2} />
        </span>
        {isEnhancement && name && (
          <span className="aos-ability-card__name"><FormattedRulesText text={name} />{isReference && Number(ability.points) > 0 && <small>{ability.points} Points</small>}</span>
        )}
      </summary>

      <div className="aos-ability-card__body">
        {(ability.castingValue != null || ability.chantingValue != null) && (
          <p className="aos-ability-card__roll">
            {ability.chantingValue != null ? "Valor de canto" : "Valor de lanzamiento"}: {ability.chantingValue ?? ability.castingValue}+
          </p>
        )}

        {context}

        <RuleCopyBlocks
          lore={ability.lore}
          className="aos-ability-card__lore"
        />

        {ability.resourceCost && <p className="aos-ability-card__roll">{ability.resourceCost.value} {ability.resourceCost.label}</p>}
        {ability.unlockCondition && <div className="aos-ability-card__text"><FormattedText text={ability.unlockCondition} /></div>}

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

        <FactionMechanicIllustration ability={ability} />

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
