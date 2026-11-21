import { useMemo, useState } from "react";

import MainNav from "../components/MainNav";
import AbilityCard from "../components/AbilityCard";
import FormattedRulesText from "../components/FormattedRulesText";
import OfficialIcon from "../components/OfficialIcon";
import UnitArtwork from "../components/UnitArtwork";
import factions from "../data/factions";
import { getFactionArtwork, getFactionArtworkPosition } from "../utils/factionArtwork";

const FEATURED_DOCUMENTS = [
  "Core Documents",
  "Rules of Renown",
  "Legends",
  "Spearhead Battlepacks",
  "Scourge of Ghyran",
  "Scourge of Aqshy",
];

function Home({ onMyLists, onSettings, onRules, onViewWarscroll }) {
  const [library, setLibrary] = useState(null);
  const [view, setView] = useState("root");
  const [faction, setFaction] = useState(null);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [section, setSection] = useState(null);
  const [publication, setPublication] = useState("battletome");

  const orrukArmies = useMemo(() => factions
    .filter((item) => item.id === "ironjawz" || item.id === "kruleboyz")
    .sort((left, right) => ["ironjawz", "kruleboyz"].indexOf(left.id) - ["ironjawz", "kruleboyz"].indexOf(right.id)), []);

  const factionUnits = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return [...(faction?.units ?? []), ...(faction?.terrain ?? [])]
      .filter((unit) => !needle || unit.name.toLocaleLowerCase().includes(needle))
      .sort((left, right) => left.name.localeCompare(right.name));
  }, [faction, query]);

  const visibleFactions = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    const rootFactions = factions.filter(
      (item) => item.id !== "ironjawz" && item.id !== "kruleboyz"
    );
    const orrukWarclans = {
      id: "orruk-warclans",
      alliance: "destruction",
      name: "Orruk Warclans",
      armyTypes: orrukArmies,
    };
    return [...rootFactions, orrukWarclans]
      .filter((item) => !needle || item.name.toLocaleLowerCase().includes(needle) ||
        (item.armyTypes ?? []).some((army) => army.name.toLocaleLowerCase().includes(needle)))
      .sort((left, right) => left.name.localeCompare(right.name));
  }, [orrukArmies, query]);

  function openFaction(nextFaction) {
    if (nextFaction.id === "orruk-warclans") {
      setFaction(null);
      setView("orruk");
      setQuery("");
      return;
    }
    if (library && !["Legends", "Spearhead Battlepacks"].includes(library)) { openBook(nextFaction, library === "Rules of Renown" ? "renown" : library === "Scourge of Ghyran" ? "ghyran" : "aqshy"); return; }
    setFaction(nextFaction);
    setView("faction");
    setQuery("");
  }

  function openBook(nextFaction, nextPublication = "battletome") {
    if (nextPublication === "spearhead") { setLibrary("Spearhead Battlepacks"); setView("library"); return; }
    setFaction(nextFaction);
    setPublication(nextPublication);
    setSection(null);
    setView("book");
    setQuery("");
  }

  function goBack() {
    setQuery("");
    if (view === "library") { setLibrary(null); setView("root"); return; }
    if (view === "book" && library) { setView("library"); return; }
    if (view === "warscrolls" || view === "section") {
      setSection(null);
      setView("book");
      return;
    }
    if (view === "book") {
      if (faction?.id === "ironjawz" || faction?.id === "kruleboyz") {
        setView("orruk-book");
      } else {
        setView("faction");
      }
      return;
    }
    if (view === "orruk-book") {
      setFaction(null);
      setView("orruk");
      return;
    }
    if (view === "orruk") {
      setFaction(null);
      setView("root");
      return;
    }
    if (view === "faction") {
      setFaction(null);
      setView("root");
      return;
    }
    setFaction(null);
    setView("root");
  }

  const title = getReferenceTitle(view, faction, publication, section);
  const artworkFaction = faction ?? (view === "orruk" || view === "orruk-book" ? orrukArmies[0] : null);
  const artwork = artworkFaction ? getFactionArtwork(artworkFaction) : null;
  const bookSections = faction ? getBookSections(faction, publication) : [];

  return (
    <main className="aos-official-page aos-reference-home">
      <header className={`aos-official-header${view === "root" ? " aos-official-header--root" : ""}`}>
        {view === "root" ? <span aria-hidden="true" /> : (
          <button type="button" onClick={goBack} aria-label="Back"><OfficialIcon name="back" size={25} strokeWidth={2.5} /></button>
        )}
        <h1>{title}</h1>
        <button
          type="button"
          className="aos-official-search-button"
          onClick={() => setSearchOpen((open) => !open)}
          aria-label="Search"
          aria-expanded={searchOpen}
        ><OfficialIcon name="search" size={25} strokeWidth={2.6} /></button>
      </header>

      {searchOpen && (
        <div className="aos-official-search">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search reference…"
            autoFocus
          />
        </div>
      )}

      {view !== "root" && artwork && (
        <div
          className="aos-official-faction-hero"
          style={{
            "--official-faction-art": `url("${artwork}")`,
            "--official-faction-position": getFactionArtworkPosition(artworkFaction, "list") ?? "center",
          }}
          aria-hidden="true"
        />
      )}

      <div className="aos-official-content">
        {view === "root" && (
          <>
            <section className="aos-official-link-list is-featured">
              {FEATURED_DOCUMENTS.map((document) => (
                <button
                  key={document}
                  type="button"
                  onClick={() => { if (document === "Core Documents") { onRules(); return; } setLibrary(document); setView("library"); }}
                >
                  <strong>{document}</strong><OfficialIcon name="chevronRight" size={22} strokeWidth={3} />
                </button>
              ))}
            </section>
            <div className="aos-official-divider" />
            <section className="aos-official-link-list">
              {visibleFactions.map((item) => (
                <button key={item.id} type="button" onClick={() => openFaction(item)}>
                  <strong>{item.name}</strong><OfficialIcon name="chevronRight" size={22} strokeWidth={3} />
                </button>
              ))}
            </section>
          </>
        )}

        {view === "library" && <section className="aos-official-link-list">
          <h2>{library}</h2>
          {["Legends", "Spearhead Battlepacks"].includes(library) ? <div className="aos-preferences-panel"><p>Consulta los documentos de {library} en las descargas oficiales. Este catálogo de Storm Forge está preparado para juego equilibrado.</p><a href="https://www.warhammer-community.com/en-gb/downloads/warhammer-age-of-sigmar/" target="_blank" rel="noreferrer">Abrir descargas de Warhammer Community ↗</a></div> : factions.filter((item) => library !== "Rules of Renown" || item.armiesOfRenown?.length).map((item) => <button type="button" key={item.id} onClick={() => openBook(item, library === "Rules of Renown" ? "renown" : library === "Scourge of Ghyran" ? "ghyran" : "aqshy")}><strong>{item.name}</strong><OfficialIcon name="chevronRight" /></button>)}
        </section>}
        {view === "faction" && (
          <section className="aos-official-link-list">
            <button type="button" onClick={() => openBook(faction, "battletome")}>
              <strong>Battletome: {faction.name}</strong><OfficialIcon name="chevronRight" size={22} strokeWidth={3} />
            </button>
            <button type="button" onClick={() => openBook(faction, "aqshy")}>
              <strong>Scourge of Aqshy: {faction.name}</strong><OfficialIcon name="chevronRight" size={22} strokeWidth={3} />
            </button>
            <button type="button" onClick={() => openBook(faction, "ghyran")}>
              <strong>Scourge of Ghyran: {faction.name}</strong><OfficialIcon name="chevronRight" size={22} strokeWidth={3} />
            </button>
            {(faction.armiesOfRenown ?? []).length > 0 && (
              <button type="button" onClick={() => openBook(faction, "renown")}>
                <strong>{faction.name} Rules of Renown</strong><OfficialIcon name="chevronRight" size={22} strokeWidth={3} />
              </button>
            )}
            <button type="button" onClick={() => openBook(faction, "spearhead")}>
              <strong>Spearhead Armies</strong><OfficialIcon name="chevronRight" size={22} strokeWidth={3} />
            </button>
          </section>
        )}

        {view === "orruk" && (
          <section className="aos-official-link-list">
            {orrukArmies.map((army) => (
              <button key={`aqshy-${army.id}`} type="button" onClick={() => openBook(army, "aqshy")}>
                <strong>Scourge of Aqshy: {army.name}</strong><OfficialIcon name="chevronRight" size={22} strokeWidth={3} />
              </button>
            ))}
            {orrukArmies.map((army) => (
              <button key={`ghyran-${army.id}`} type="button" onClick={() => openBook(army, "ghyran")}>
                <strong>Scourge of Ghyran: {army.name}</strong><OfficialIcon name="chevronRight" size={22} strokeWidth={3} />
              </button>
            ))}
            <button type="button" onClick={() => openBook(orrukArmies[0], "renown")}>
              <strong>Orruk Warclans Rules of Renown</strong><OfficialIcon name="chevronRight" size={22} strokeWidth={3} />
            </button>
            <button type="button" onClick={() => setView("orruk-book")}>
              <strong>Destruction Battletome: Orruk Warclans</strong><OfficialIcon name="chevronRight" size={22} strokeWidth={3} />
            </button>
            <button type="button" onClick={() => openBook(orrukArmies[0], "spearhead")}>
              <strong>Spearhead Armies</strong><OfficialIcon name="chevronRight" size={22} strokeWidth={3} />
            </button>
          </section>
        )}

        {view === "orruk-book" && (
          <section className="aos-official-link-list">
            {orrukArmies.map((army) => (
              <button key={army.id} type="button" onClick={() => openBook(army, "battletome")}>
                <strong>{army.name}</strong><OfficialIcon name="chevronRight" size={22} strokeWidth={3} />
              </button>
            ))}
          </section>
        )}

        {view === "book" && (
          <>
            <section className="aos-official-link-list">
              <button type="button" onClick={onRules}>
                <strong>Addenda, Errata and FAQs</strong><OfficialIcon name="chevronRight" size={22} strokeWidth={3} />
              </button>
            </section>
            <div className="aos-official-divider" />
            <section className="aos-official-link-list">
              {bookSections.map((section) => (
                <button
                  key={section.label}
                  type="button"
                  onClick={() => {
                    if (section.view === "warscrolls") {
                      setView("warscrolls");
                      return;
                    }
                    setSection(section);
                    setView("section");
                  }}
                >
                  <strong>{section.label}</strong><OfficialIcon name="chevronRight" size={22} strokeWidth={3} />
                </button>
              ))}
            </section>
          </>
        )}

        {view === "section" && section && (
          <FactionBookSection
            faction={faction}
            section={section}
            onViewWarscroll={onViewWarscroll}
          />
        )}

        {view === "warscrolls" && (
          <section className="aos-official-warscroll-groups">
            {groupWarscrolls(factionUnits).map((group) => (
              <details key={group.label} open>
                <summary>
                  <strong>{group.label}</strong>
                  <OfficialIcon name="chevronDown" size={22} strokeWidth={3} />
                </summary>
                <div className="aos-official-unit-list">
                  {group.units.map((unit) => (
                    <button key={unit.id ?? unit.name} type="button" onClick={() => onViewWarscroll(unit)}>
                      <UnitArtwork unit={unit} variant="thumbnail" />
                      <strong>{unit.name}</strong>
                    </button>
                  ))}
                </div>
              </details>
            ))}
          </section>
        )}
      </div>

      <MainNav
        active="reference"
        onReference={() => { setFaction(null); setView("root"); }}
        onStormForge={onMyLists}
        onProfile={onSettings}
      />
    </main>
  );
}

export default Home;

function getBookSections(faction, publication = "battletome") {
  if (publication === "renown") {
    return [{ label: "Armies of Renown", field: "armiesOfRenown", kind: "renown" }];
  }

  if (publication === "aqshy") {
    const sections = [{ label: "Warscrolls", view: "warscrolls" }];
    if ((faction.aqshyEnhancements ?? []).length) {
      sections.push({ label: "Scourge of Aqshy Enhancements", field: "aqshyEnhancements" });
    }
    sections.push({ label: "Battle Profiles", field: "units", kind: "profiles" });
    return sections;
  }

  if (publication === "ghyran") {
    const sections = [{ label: "Warscrolls", view: "warscrolls" }];
    if ((faction.battleFormations ?? []).length) {
      sections.push({ label: "Battle Formations", field: "battleFormations", kind: "formations" });
    }
    if ((faction.ghyranEnhancements ?? []).length) {
      sections.push({ label: `${faction.name} Monstrous Traits`, field: "ghyranEnhancements" });
    }
    sections.push({ label: "Battle Profiles", field: "units", kind: "profiles" });
    return sections;
  }

  const sections = [
    { label: "Warscrolls", view: "warscrolls" },
    { label: "Battle Traits", field: "battleTraits" },
    { label: "Battle Formations", field: "battleFormations", kind: "formations" },
    { label: "Artefacts Of Power", field: "artefacts" },
    { label: "Heroic Traits", field: "heroicTraits" },
  ];

  if ((faction.spellLores ?? []).length) sections.push({ label: "Spell Lores", field: "spellLores", kind: "spells" });
  if ((faction.prayerLores ?? []).length) sections.push({ label: "Prayer Lores", field: "prayerLores", kind: "prayers" });
  if ((faction.manifestationLores ?? []).length) sections.push({ label: "Manifestation Lores", field: "manifestationLores", kind: "manifestations" });
  sections.push({ label: "Battle Profiles", field: "units", kind: "profiles" });
  return sections;
}

function getReferenceTitle(view, faction, publication, section) {
  if (view === "root") return "REFERENCE";
  if (view === "orruk") return "ORRUK WARCLANS";
  if (view === "orruk-book") return "DESTRUCTION BATTLETOME: ORRUK WARCLANS";
  if (view === "warscrolls") return "WARSCROLLS";
  if (view === "section") return section?.label?.toUpperCase() ?? "REFERENCE";
  if (view === "book") {
    if (publication === "aqshy") return `SCOURGE OF AQSHY: ${faction?.name ?? ""}`;
    if (publication === "ghyran") return `SCOURGE OF GHYRAN: ${faction?.name ?? ""}`;
    if (publication === "renown") return `${faction?.name ?? ""} RULES OF RENOWN`;
    if (publication === "spearhead") return "SPEARHEAD ARMIES";
    const alliance = String(faction?.alliance ?? "").toUpperCase();
    return `${alliance} BATTLETOME: ${faction?.name ?? ""}`.trim();
  }
  return faction?.name?.toUpperCase() ?? "REFERENCE";
}

function FactionBookSection({ faction, section, onViewWarscroll }) {
  if (section.kind === "profiles") {
    return (
      <section className="aos-official-profile-list">
        {(faction?.units ?? []).map((unit) => (
          <button key={unit.id ?? unit.name} type="button" onClick={() => onViewWarscroll(unit)}>
            <UnitArtwork unit={unit} variant="thumbnail" />
            <span>
              <strong>{unit.name}</strong>
              <small>{unit.details?.models ?? 1} {(unit.details?.models ?? 1) === 1 ? "model" : "models"}</small>
            </span>
            <b>{unit.points ?? 0} pts</b>
            <OfficialIcon name="chevronRight" size={19} strokeWidth={3} />
          </button>
        ))}
      </section>
    );
  }

  const groups = getFactionRuleGroups(faction, section);
  return (
    <section className="aos-official-faction-rules">
      {groups.map((group) => (
        <article key={group.id ?? group.name} className="aos-official-faction-rule-group">
          {group.name && <h2>{group.name}</h2>}
          {group.description && <p><FormattedRulesText text={group.description} /></p>}
          {group.items.map((ability, index) => (
            <AbilityCard
              key={`${ability.id ?? ability.name}-${index}`}
              ability={ability}
              context={ability.restrictionText ? (
                <p className="aos-official-rule-restriction"><FormattedRulesText text={ability.restrictionText} /></p>
              ) : null}
            />
          ))}
        </article>
      ))}
      {groups.length === 0 && <p className="aos-empty-message">No hay contenido disponible en esta publicación.</p>}
    </section>
  );
}

function getFactionRuleGroups(faction, section) {
  const items = faction?.[section.field] ?? [];
  if (section.kind === "formations") {
    return items.map((formation) => ({
      id: formation.id,
      name: formation.name,
      items: formation.abilities?.length ? formation.abilities : formation.ability ? [formation.ability] : [],
    }));
  }
  if (section.kind === "spells") {
    return items.map((lore) => ({ id: lore.id, name: lore.name, description: lore.description, items: lore.spells ?? [] }));
  }
  if (section.kind === "prayers") {
    return items.map((lore) => ({ id: lore.id, name: lore.name, description: lore.description, items: lore.prayers ?? [] }));
  }
  if (section.kind === "manifestations") {
    return items.map((lore) => ({
      id: lore.id,
      name: lore.name,
      description: lore.description,
      items: (lore.manifestations ?? []).flatMap((manifestation) => [
        manifestation.summonSpell ?? {
          id: `${manifestation.id}-summon`,
          name: `Summon ${manifestation.name}`,
          phase: manifestation.phase ?? "Your Hero Phase",
          description: manifestation.description ?? "",
          castingValue: manifestation.castingValue,
          keywords: manifestation.keywords ?? [],
        },
        ...(manifestation.abilities ?? []),
      ]),
    }));
  }
  if (section.kind === "renown") {
    return items.map((army) => ({
      id: army.id,
      name: army.name,
      description: army.description ?? (army.roster ?? []).join(" · "),
      items: [
        ...(army.rules?.battleTraits ?? []),
        ...(army.rules?.heroicTraits ?? []),
        ...(army.rules?.artefacts ?? []),
        ...(army.rules?.spellLores ?? []).flatMap((lore) => lore.spells ?? []),
        ...(army.rules?.prayerLores ?? []).flatMap((lore) => lore.prayers ?? []),
      ],
    }));
  }
  const groupName = items[0]?.groupName ?? section.label;
  const restriction = items[0]?.restrictionText;
  return [{
    id: section.field,
    name: groupName,
    description: restriction,
    items,
  }];
}

function groupWarscrolls(units) {
  const definitions = [
    ["Hero", "hero"],
    ["Infantry", "infantry"],
    ["Cavalry", "cavalry"],
    ["Monster", "monster"],
    ["War Machine", "war machine"],
    ["Beast", "beast"],
    ["Faction Terrain", "faction terrain"],
  ];
  const remaining = [...units];
  const groups = definitions.map(([label, keyword]) => {
    const matches = remaining.filter((unit) => (unit.keywords ?? [])
      .some((value) => String(value).trim().toLowerCase() === keyword));
    matches.forEach((unit) => remaining.splice(remaining.indexOf(unit), 1));
    return { label, units: matches };
  }).filter((group) => group.units.length);

  if (remaining.length) groups.push({ label: "Other", units: remaining });
  return groups;
}
