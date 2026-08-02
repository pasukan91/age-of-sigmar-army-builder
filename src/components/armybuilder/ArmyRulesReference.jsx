import Accordion from "../Accordion";
import AbilityCard from "../AbilityCard";
import { groupAbilitiesByPhase } from "../../utils/abilityFormatting";
import {
  universalAbilities,
  universalCommands,
} from "../../data/universalRules";

function ArmyRulesReference({ battleTraits, battleFormation }) {
  const formationAbility = battleFormation
    ? battleFormation.ability ?? battleFormation
    : null;

  return (
    <section className="aos-rules-reference" aria-labelledby="army-rules-title">
      <header className="aos-rules-reference__header">
        <p className="aos-kicker">Referencia de batalla</p>
        <h2 id="army-rules-title">Reglas del ejército</h2>
        <p>Consulta las habilidades de tu facción y las reglas universales sin salir de la lista.</p>
      </header>

      <Accordion
        title="Rasgos de batalla"
        subtitle={`${battleTraits.length} habilidades de ejército`}
      >
        <RuleList rules={battleTraits} emptyText="Este ejército no tiene rasgos de batalla disponibles." />
      </Accordion>

      <Accordion
        title="Formación de batalla"
        subtitle={battleFormation?.name ?? "No seleccionada"}
      >
        <RuleList
          rules={formationAbility ? [formationAbility] : []}
          emptyText="Selecciona una formación de batalla para consultar aquí su habilidad."
        />
      </Accordion>

      <Accordion
        title="Habilidades universales"
        subtitle={`${universalAbilities.length} habilidades básicas`}
      >
        <RuleList rules={universalAbilities} />
      </Accordion>

      <Accordion
        title="Comandos universales"
        subtitle={`${universalCommands.length} comandos`}
      >
        <RuleList rules={universalCommands} />
      </Accordion>
    </section>
  );
}

function RuleList({ rules, emptyText = "No hay reglas disponibles." }) {
  if (rules.length === 0) {
    return <p className="aos-rule-card__empty">{emptyText}</p>;
  }

  return (
    <div className="aos-ability-groups">
      {groupAbilitiesByPhase(rules).map((group) => (
        <section className="aos-ability-group" key={group.id}>
          <div className="aos-ability-group__cards">
            {group.items.map((rule) => (
              <AbilityCard ability={rule} key={rule.id ?? rule.name} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default ArmyRulesReference;
