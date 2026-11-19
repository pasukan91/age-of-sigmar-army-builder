import { useMemo, useState } from "react";

import MainNav from "../components/MainNav";
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
  const [view, setView] = useState("root");
  const [faction, setFaction] = useState(null);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const factionUnits = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return (faction?.units ?? [])
      .filter((unit) => !needle || unit.name.toLocaleLowerCase().includes(needle))
      .sort((left, right) => left.name.localeCompare(right.name));
  }, [faction, query]);

  const visibleFactions = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return factions
      .filter((item) => !needle || item.name.toLocaleLowerCase().includes(needle))
      .sort((left, right) => left.name.localeCompare(right.name));
  }, [query]);

  function openFaction(nextFaction) {
    setFaction(nextFaction);
    setView("faction");
    setQuery("");
  }

  function goBack() {
    setQuery("");
    if (view === "warscrolls" || view === "book") {
      setView("faction");
      return;
    }
    setFaction(null);
    setView("root");
  }

  const title = getReferenceTitle(view, faction);
  const artwork = faction ? getFactionArtwork(faction) : null;
  const bookSections = faction ? getBookSections(faction) : [];

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
            "--official-faction-position": getFactionArtworkPosition(faction, "list") ?? "center",
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
                  onClick={document === "Core Documents" ? onRules : undefined}
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

        {view === "faction" && (
          <section className="aos-official-link-list">
            <button type="button" onClick={() => setView("book")}>
              <strong>Battletome: {faction.name}</strong><OfficialIcon name="chevronRight" size={22} strokeWidth={3} />
            </button>
            <button type="button" onClick={() => setView("book")}>
              <strong>Scourge of Aqshy: {faction.name}</strong><OfficialIcon name="chevronRight" size={22} strokeWidth={3} />
            </button>
            <button type="button" onClick={() => setView("book")}>
              <strong>Scourge of Ghyran: {faction.name}</strong><OfficialIcon name="chevronRight" size={22} strokeWidth={3} />
            </button>
            {(faction.armiesOfRenown ?? []).length > 0 && (
              <button type="button" onClick={() => setView("book")}>
                <strong>{faction.name} Rules of Renown</strong><OfficialIcon name="chevronRight" size={22} strokeWidth={3} />
              </button>
            )}
            <button type="button" onClick={() => setView("book")}>
              <strong>Spearhead Armies</strong><OfficialIcon name="chevronRight" size={22} strokeWidth={3} />
            </button>
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
                  onClick={section.view === "warscrolls" ? () => setView("warscrolls") : onRules}
                >
                  <strong>{section.label}</strong><OfficialIcon name="chevronRight" size={22} strokeWidth={3} />
                </button>
              ))}
            </section>
          </>
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

function getBookSections(faction) {
  const sections = [
    { label: "Warscrolls", view: "warscrolls" },
    { label: "Battle Traits" },
    { label: "Battle Formations" },
    { label: "Artefacts Of Power" },
    { label: "Heroic Traits" },
  ];

  if ((faction.spellLores ?? []).length) sections.push({ label: "Spell Lores" });
  if ((faction.prayerLores ?? []).length) sections.push({ label: "Prayer Lores" });
  if ((faction.manifestationLores ?? []).length) sections.push({ label: "Manifestation Lores" });
  sections.push({ label: "Battle Profiles" });
  return sections;
}

function getReferenceTitle(view, faction) {
  if (view === "root") return "REFERENCE";
  if (view === "warscrolls") return "WARSCROLLS";
  if (view === "book") {
    const alliance = String(faction?.alliance ?? "").toUpperCase();
    return `${alliance} BATTLETOME: ${faction?.name ?? ""}`.trim();
  }
  return faction?.name?.toUpperCase() ?? "REFERENCE";
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
