import { useMemo, useState } from "react";

import { getUniqueListUnits } from "../../utils/listWarscrolls";
import { normalizeRuleItem } from "../../utils/ruleReferences";
import ChevronIcon from "../ChevronIcon";
import UnitArtwork from "../UnitArtwork";

function ArmyQuickSearch({ list, battleTraits, battleFormation, onViewUnit, onViewRule }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const units = useMemo(() => getUniqueListUnits(list), [list]);
  const rules = useMemo(
    () => collectRules(list, battleTraits, battleFormation),
    [list, battleTraits, battleFormation],
  );
  const matchingUnits = units.filter((unit) => matchesQuery(unit, normalizedQuery));
  const matchingRules = rules.filter(({ item }) => matchesQuery(item, normalizedQuery));

  return (
    <section className="aos-quick-search" aria-labelledby="quick-search-title">
      <header>
        <span className="aos-eyebrow">Consulta inmediata</span>
        <h2 id="quick-search-title">Buscar en el ejército</h2>
        <p>Localiza una unidad, habilidad, hechizo, plegaria o terreno sin abandonar la lista.</p>
      </header>

      <label className="aos-quick-search__field">
        <span className="aos-visually-hidden">Buscar unidades y reglas</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar unidad o regla…"
          autoComplete="off"
        />
        {query && (
          <button type="button" onClick={() => setQuery("")} aria-label="Borrar búsqueda">×</button>
        )}
      </label>

      <SearchGroup title="Unidades" count={matchingUnits.length}>
        {matchingUnits.map((unit) => (
          <button className="aos-quick-search__result" type="button" key={unit.id} onClick={() => onViewUnit?.(unit)}>
            <UnitArtwork unit={unit} variant="thumbnail" />
            <span><small>Unidad</small><strong>{unit.name}</strong><em>{unit.points ?? 0} pts</em></span>
            <ChevronIcon direction="right" size={8} />
          </button>
        ))}
      </SearchGroup>

      <SearchGroup title="Reglas" count={matchingRules.length}>
        {matchingRules.map((reference) => (
          <button className="aos-quick-search__result" type="button" key={`${reference.kind}-${reference.item.id}`} onClick={() => onViewRule?.(reference)}>
            <span className="aos-quick-search__sigil" aria-hidden="true">◆</span>
            <span><small>{reference.label}</small><strong>{reference.item.name}</strong><em>{reference.item.phase ?? reference.sourceName}</em></span>
            <ChevronIcon direction="right" size={8} />
          </button>
        ))}
      </SearchGroup>

      {matchingUnits.length === 0 && matchingRules.length === 0 && (
        <p className="aos-empty-message">No hay coincidencias en este ejército.</p>
      )}
    </section>
  );
}

function SearchGroup({ title, count, children }) {
  if (count === 0) return null;

  return (
    <section className="aos-quick-search__group">
      <div><h3>{title}</h3><span>{count}</span></div>
      <div className="aos-quick-search__results">{children}</div>
    </section>
  );
}

function matchesQuery(item, query) {
  if (!query) return true;

  return [
    item?.name,
    item?.phase,
    item?.type,
    item?.description,
    ...(item?.keywords ?? []),
  ].some((value) => String(value ?? "").toLowerCase().includes(query));
}

function collectRules(list, battleTraits = [], battleFormation) {
  const references = [];
  const add = (kind, label, sourceName, items = []) => {
    (items ?? []).forEach((rawItem) => {
      if (!rawItem) return;
      const normalizedItem = normalizeRuleItem(rawItem);
      references.push({
        kind,
        label,
        sourceName,
        item: {
          ...normalizedItem,
          id: normalizedItem.id ?? `${kind}-${references.length}`,
        },
      });
    });
  };

  add("rule", "Rasgo de batalla", "Reglas del ejército", battleTraits);
  add("rule", "Formación de batalla", battleFormation?.name, battleFormation ? [battleFormation.ability ?? battleFormation] : []);
  add("spell", "Hechizo", list?.spellLore?.name, list?.spellLore?.spells);
  add("prayer", "Plegaria", list?.prayerLore?.name, list?.prayerLore?.prayers);
  add("manifestation", "Manifestación", list?.manifestationLore?.name, list?.manifestationLore?.manifestations);
  add("terrain", "Terreno de facción", "Terreno de facción", list?.terrain ? [list.terrain] : []);

  return references;
}

export default ArmyQuickSearch;
