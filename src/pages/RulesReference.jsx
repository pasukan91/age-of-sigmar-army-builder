import { useMemo, useState } from "react";
import BackButton from "../components/BackButton";
import FormattedRulesText from "../components/FormattedRulesText";
import rules from "../data/sigdexRules.generated.json";

function RulesReference({ onBack }) {
  const [documentId, setDocumentId] = useState(rules.documents[0]?.id);
  const [query, setQuery] = useState("");
  const document = rules.documents.find((item) => item.id === documentId) ?? rules.documents[0];
  const sections = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return document?.sections ?? [];
    return (document?.sections ?? []).filter((section) => JSON.stringify(section).toLowerCase().includes(needle));
  }, [document, query]);

  return (
    <main className="aos-page aos-rules-browser">
      <header className="aos-topbar">
        <BackButton onClick={onBack} />
        <h1 className="aos-topbar__title">Reglas y FAQ</h1>
        <span aria-hidden="true" />
      </header>
      <section className="aos-rules-browser__controls">
        <div className="aos-rules-browser__tabs">
          {rules.documents.map((item) => (
            <button key={item.id} type="button" className={item.id === document?.id ? "is-active" : ""} onClick={() => setDocumentId(item.id)}>
              {item.title}
            </button>
          ))}
          <button type="button" className={documentId === "faq" ? "is-active" : ""} onClick={() => setDocumentId("faq")}>FAQ · {rules.metadata.faqPublishedDate}</button>
        </div>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar una regla…" aria-label="Buscar reglas" />
      </section>
      {documentId === "faq" ? <FaqContent query={query} /> : (
        <section className="aos-rules-browser__content">
          {sections.map((section) => <RuleSection key={section.name} section={section} />)}
          {sections.length === 0 && <p className="aos-empty-message">No hay resultados.</p>}
        </section>
      )}
    </main>
  );
}

function RuleSection({ section, level = 2 }) {
  const Heading = `h${Math.min(6, level)}`;
  return (
    <details className="aos-rules-browser__section" open={level === 2}>
      <summary><Heading>{section.name}</Heading></summary>
      <div>
        {(section.containers ?? []).map((container, index) => (
          <article key={`${container.name}-${index}`} className="aos-rules-browser__card">
            {container.name && <h4>{container.name}</h4>}
            {(container.components ?? []).map((component, componentIndex) => (
              <RuleComponent key={componentIndex} component={component} />
            ))}
          </article>
        ))}
        {(section.subSections ?? []).map((child) => <RuleSection key={child.name} section={child} level={level + 1} />)}
      </div>
    </details>
  );
}

function RuleComponent({ component }) {
  const ability = component.ability;
  if (ability) return (
    <div className="aos-rules-browser__ability">
      <strong>{ability.name ?? component.title}</strong>
      {ability.timing && <small>{ability.timing}</small>}
      <FormattedRulesText text={[ability.declare && `Declare: ${ability.declare}`, ability.effect && `Effect: ${ability.effect}`].filter(Boolean).join("\n\n")} />
    </div>
  );
  return <div className={`aos-rules-browser__text is-${component.contentType ?? "text"}`}><FormattedRulesText text={component.text ?? ""} /></div>;
}

function FaqContent({ query }) {
  const needle = query.trim().toLowerCase();
  const groups = rules.faq.filter((group) => !needle || JSON.stringify(group).toLowerCase().includes(needle));
  return <section className="aos-rules-browser__content">{groups.map((group) => (
    <details className="aos-rules-browser__section" key={group.title} open={!needle}>
      <summary><h2>{group.title}</h2></summary>
      <div>{[...(group.questions ?? []), ...(group.rules ?? []).flatMap((rule) => (rule.questions ?? []).map((item) => ({ ...item, rule: rule.title })))].map((item, index) => (
        <article className="aos-rules-browser__card" key={index}>{item.rule && <small>{item.rule}</small>}<h4>{item.question}</h4><FormattedRulesText text={item.answer} /></article>
      ))}</div>
    </details>
  ))}</section>;
}

export default RulesReference;
