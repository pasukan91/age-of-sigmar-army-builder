import { useMemo, useState } from "react";

import MainNav from "../components/MainNav";
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

  const title = view === "root" ? "REFERENCE" : faction?.name?.toUpperCase();
  const artwork = faction ? getFactionArtwork(faction) : null;

  return (
    <main className="aos-official-page aos-reference-home">
      <header className="aos-official-header">
        {view === "root" ? <span aria-hidden="true" /> : (
          <button type="button" onClick={goBack} aria-label="Back">‹</button>
        )}
        <h1>{title}</h1>
        <button
          type="button"
          className="aos-official-search-button"
          onClick={() => setSearchOpen((open) => !open)}
          aria-label="Search"
          aria-expanded={searchOpen}
        >⌕</button>
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
                  <strong>{document}</strong><span aria-hidden="true">›</span>
                </button>
              ))}
            </section>
            <div className="aos-official-divider" />
            <section className="aos-official-link-list">
              {visibleFactions.map((item) => (
                <button key={item.id} type="button" onClick={() => openFaction(item)}>
                  <strong>{item.name}</strong><span aria-hidden="true">›</span>
                </button>
              ))}
            </section>
          </>
        )}

        {view === "faction" && (
          <section className="aos-official-link-list">
            <button type="button" onClick={() => setView("book")}>
              <strong>Battletome: {faction.name}</strong><span aria-hidden="true">›</span>
            </button>
            <button type="button" onClick={() => setView("book")}>
              <strong>Scourge of Aqshy: {faction.name}</strong><span aria-hidden="true">›</span>
            </button>
            <button type="button" onClick={() => setView("book")}>
              <strong>Scourge of Ghyran: {faction.name}</strong><span aria-hidden="true">›</span>
            </button>
            {(faction.armiesOfRenown ?? []).length > 0 && (
              <button type="button" onClick={() => setView("book")}>
                <strong>{faction.name} Rules of Renown</strong><span aria-hidden="true">›</span>
              </button>
            )}
            <button type="button" onClick={() => setView("book")}>
              <strong>Spearhead Armies</strong><span aria-hidden="true">›</span>
            </button>
          </section>
        )}

        {view === "book" && (
          <section className="aos-official-link-list">
            <button type="button" onClick={() => setView("warscrolls")}>
              <strong>Warscrolls</strong><span aria-hidden="true">›</span>
            </button>
            <button type="button" onClick={() => setView("warscrolls")}>
              <strong>Battle Profiles</strong><span aria-hidden="true">›</span>
            </button>
            <button type="button" onClick={onRules}>
              <strong>Army Rules</strong><span aria-hidden="true">›</span>
            </button>
          </section>
        )}

        {view === "warscrolls" && (
          <section className="aos-official-unit-list">
            {factionUnits.map((unit) => (
              <button key={unit.id ?? unit.name} type="button" onClick={() => onViewWarscroll(unit)}>
                <UnitArtwork unit={unit} variant="thumbnail" />
                <strong>{unit.name}</strong>
                <span>{unit.points} pts</span>
              </button>
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
