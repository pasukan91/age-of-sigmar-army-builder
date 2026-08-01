import Accordion from "../components/Accordion";
import AbilityCard from "../components/AbilityCard";
import { getRuleArtwork } from "../utils/ruleReferences";
import { groupAbilitiesByPhase } from "../utils/abilityFormatting";
import "../styles/aos-app.css";

function RuleWarscroll({ reference, onBack }) {
  const { item, kind, sourceName } = reference ?? {};

  if (!item) {
    return <EmptyReference onBack={onBack} />;
  }

  const isManifestation = kind === "manifestation";
  const isTerrain = kind === "terrain";
  const profile = item.profile ?? {};
  const artwork = getRuleArtwork(item, kind);
  const primaryRule = isManifestation ? item.summonSpell : item;
  const ruleParts = splitRuleText(primaryRule?.description);
  const isInvocation = isManifestation && isPrayer(primaryRule);
  const value = isManifestation
    ? isInvocation
      ? primaryRule?.chantingValue ?? item.chantingValue ?? primaryRule?.castingValue ?? item.castingValue
      : primaryRule?.castingValue ?? item.castingValue
    : kind === "prayer"
      ? item.chantingValue ?? item.castingValue
      : item.castingValue;
  const declareText = ruleParts.declare ||
    (isManifestation ? getManifestationDeclare(item, primaryRule, isInvocation) : "");
  const effectText = ruleParts.effect ||
    (!ruleParts.declare ? primaryRule?.description : "");

  return (
    <main className="aos-page aos-warscroll-page aos-reference-warscroll">
      <header className="aos-topbar">
        <button type="button" className="aos-icon-button" onClick={onBack} aria-label="Volver">‹</button>
        <h1 className="aos-topbar__title">{item.name}</h1>
        <span aria-hidden="true" />
      </header>

      <section className={`aos-reference-hero aos-reference-hero--${kind}`}>
        {artwork && (
          <img
            className="aos-reference-hero__image"
            src={artwork}
            alt={`${item.name}, miniatura oficial de Warhammer`}
          />
        )}
        <span className="aos-reference-hero__kind">{getKindLabel(kind)}</span>
        <h2>{item.name}</h2>
        {sourceName && <p>{sourceName}</p>}
      </section>

      {(isManifestation || isTerrain) && (
        <section className="aos-profile-strip">
          <Stat label="Move" value={profile.move} />
          <Stat label="Health" value={profile.health} />
          <Stat label="Control" value={profile.control} />
          <Stat label="Save" value={profile.save} variant="save" />
        </section>
      )}

      <div className="aos-warscroll-content">
        {item.dataPending ? (
          <section className="aos-reference-warning">
            <strong>Perfil pendiente de incorporar</strong>
            <p>La lista original solo contiene el nombre de esta manifestación. No se muestran valores sin verificar.</p>
          </section>
        ) : (
          <>
            {(kind === "spell" || kind === "prayer" || isManifestation) && (
              <section className="aos-casting-card">
                <div className="aos-casting-card__value">
                  <span>{kind === "prayer" || isInvocation ? "Canto" : isManifestation ? "Manifestar" : "Lanzamiento"}</span>
                  <strong>{value ?? "-"}+</strong>
                </div>
                <div className="aos-casting-card__content">
                  <span>{primaryRule?.phase ?? item.phase ?? "Fase indicada en la regla"}</span>
                  <h2>{primaryRule?.name ?? item.name}</h2>
                  <RuleKeywords keywords={primaryRule?.keywords ?? item.keywords} />
                </div>
              </section>
            )}

            {(declareText || effectText) && (
              <section className="aos-rule-procedure">
                <RuleStep title={isManifestation ? "Condiciones para manifestarla" : kind === "prayer" ? "Condiciones para entonarla" : "Condiciones para lanzarlo"} text={declareText} />
                <RuleStep title="Efecto" text={effectText} variant="effect" />
              </section>
            )}

            {isManifestation && profile.banishment && (
              <section className="aos-banishment-card">
                <span>Destierro</span>
                <strong>{profile.banishment}</strong>
                <p>Valor que debe alcanzarse para desterrar esta manifestación.</p>
              </section>
            )}

            {item.weapons?.length > 0 && (
              <Accordion
                title="Armas"
                subtitle={`${item.weapons.length} ${item.weapons.length === 1 ? "perfil" : "perfiles"}`}
                defaultOpen
              >
                <WeaponList weapons={item.weapons} />
              </Accordion>
            )}

            {item.universalAbilities?.length > 0 && (
              <Accordion title="Habilidades universales" subtitle={`${item.universalAbilities.length}`} defaultOpen>
                <div className="aos-keyword-list">
                  {item.universalAbilities.map((ability) => <span key={ability}>{ability}</span>)}
                </div>
              </Accordion>
            )}

            {item.abilities?.length > 0 && (
              <Accordion title="Habilidades" subtitle={`${item.abilities.length}`} defaultOpen>
                <AbilityList abilities={item.abilities} />
              </Accordion>
            )}

            <Accordion title="Keywords" subtitle={`${item.keywords?.length ?? 0}`}>
              <RuleKeywords keywords={item.keywords} />
            </Accordion>
          </>
        )}
      </div>
    </main>
  );
}

function EmptyReference({ onBack }) {
  return (
    <main className="aos-page aos-warscroll-page">
      <header className="aos-topbar">
        <button type="button" className="aos-icon-button" onClick={onBack} aria-label="Volver">‹</button>
        <h1 className="aos-topbar__title">Ficha de reglas</h1>
        <span aria-hidden="true" />
      </header>
    </main>
  );
}

function Stat({ label, value, variant = "" }) {
  return (
    <div className={`aos-stat ${variant ? `aos-stat--${variant}` : ""}`}>
      <div className="aos-stat__circle">{value ?? "-"}</div>
      <span className="aos-stat__label">{label}</span>
    </div>
  );
}

function RuleStep({ title, text, variant = "" }) {
  if (!text) return null;
  return (
    <article className={`aos-rule-step ${variant ? `aos-rule-step--${variant}` : ""}`}>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function AbilityList({ abilities }) {
  return (
    <div className="aos-ability-groups">
      {groupAbilitiesByPhase(abilities).map((group) => (
        <section className="aos-ability-group" key={group.id}>
          <div className="aos-ability-group__cards">
            {group.items.map((ability, index) => (
              <AbilityCard ability={ability} key={`${ability.name}-${index}`} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function WeaponList({ weapons }) {
  return <div className="aos-rule-list">{weapons.map((weapon) => (
    <article className="aos-reference-weapon" key={`${weapon.type}-${weapon.name}`}>
      <h3>{weapon.name}</h3>
      <div>{[["Attacks", weapon.attacks], ["Hit", weapon.hit], ["Wound", weapon.wound], ["Rend", weapon.rend], ["Damage", weapon.damage]].map(([label, value]) => <span key={label}><small>{label}</small><strong>{value ?? "-"}</strong></span>)}</div>
      {weapon.abilities?.length > 0 && <p>{weapon.abilities.join(" · ")}</p>}
    </article>
  ))}</div>;
}

function RuleKeywords({ keywords = [] }) {
  return <div className="aos-keyword-list">{keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div>;
}

function splitRuleText(description = "") {
  const text = String(description).trim();
  const declareMatch = text.match(/Declare:\s*([\s\S]*?)(?=\n\s*\nEffect:|Effect:|$)/i);
  const effectMatch = text.match(/Effect:\s*([\s\S]*)$/i);
  return { declare: declareMatch?.[1]?.trim() ?? "", effect: effectMatch?.[1]?.trim() ?? "" };
}

function isPrayer(rule) {
  return String(rule?.type ?? "").toLowerCase() === "prayer" ||
    rule?.keywords?.some((keyword) => String(keyword).toLowerCase() === "prayer");
}

function getManifestationDeclare(item, rule, invocation) {
  if (!rule) return "";

  const summoner = invocation ? "PRIEST" : "WIZARD";
  const action = invocation ? "chant this prayer" : "cast this spell";
  const roll = invocation ? "chanting" : "casting";

  return `If there is not a friendly ${item.name} on the battlefield, pick an eligible friendly ${summoner} to ${action}, then make a ${roll} roll of 2D6.`;
}

function getKindLabel(kind) {
  return { spell: "Hechizo", prayer: "Plegaria", manifestation: "Manifestación", terrain: "Escenografía de facción" }[kind] ?? "Regla";
}

export default RuleWarscroll;
