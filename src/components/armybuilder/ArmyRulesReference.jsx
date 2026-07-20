import Accordion from "../Accordion";
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
    <div className="aos-rule-list">
      {rules.map((rule) => (
        <article className="aos-rule-card" key={rule.id ?? rule.name}>
          <div className="aos-rule-card__heading">
            <div>
              {rule.phase && <span className="aos-rule-card__phase">{rule.phase}</span>}
              <h3>{rule.name}</h3>
            </div>

            {Number(rule.commandPoints) > 0 && (
              <span className="aos-rule-card__cp">{rule.commandPoints} PC</span>
            )}
          </div>

          {rule.type && <p className="aos-rule-card__type">{rule.type}</p>}
          <p className="aos-rule-card__description">{rule.description}</p>
        </article>
      ))}
    </div>
  );
}

export default ArmyRulesReference;
