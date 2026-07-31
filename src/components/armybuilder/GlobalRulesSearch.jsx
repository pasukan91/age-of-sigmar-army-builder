import { useMemo, useState } from "react";
import { buildRuleSearchIndex, searchRules } from "../../utils/ruleSearch";

const FILTERS = [
  ["all", "Todo"],
  ["unit", "Unidades"],
  ["spell", "Hechizos"],
  ["prayer", "Plegarias"],
  ["enhancement", "Mejoras"],
  ["universal", "Universales"],
];

function GlobalRulesSearch({ list, onViewUnit, onViewRule }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("all");
  const index = useMemo(() => buildRuleSearchIndex(list), [list]);
  const results = useMemo(() => searchRules(index, query, kind).slice(0, 80), [index, query, kind]);

  function openResult(result) {
    if (result.kind === "unit") {
      onViewUnit?.(result.item);
      return;
    }
    onViewRule?.({
      kind: result.kind,
      item: result.item,
      sourceName: result.sourceName,
    });
  }

  return (
    <section className="aos-global-search" aria-labelledby="global-search-title">
      <header>
        <span className="aos-eyebrow">Referencia completa</span>
        <h2 id="global-search-title">Buscar reglas y warscrolls</h2>
        <p>Busca por nombre, habilidad, fase, palabra clave o fuente.</p>
      </header>

      <label className="aos-global-search__input">
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ej.: Ward, fase de héroe, Vanari…"
          autoComplete="off"
        />
        {query && <button type="button" onClick={() => setQuery("")} aria-label="Limpiar búsqueda">×</button>}
      </label>

      <div className="aos-global-search__filters" aria-label="Filtrar resultados">
        {FILTERS.map(([id, label]) => (
          <button
            type="button"
            key={id}
            className={kind === id ? "is-active" : ""}
            onClick={() => setKind(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="aos-global-search__count">{results.length} resultados</p>

      <div className="aos-global-search__results">
        {results.map((result) => (
          <button type="button" key={result.id} onClick={() => openResult(result)}>
            <span className={`aos-global-search__kind is-${result.kind}`}>{kindLabel(result.kind)}</span>
            <span>
              <strong>{result.name}</strong>
              <small>{result.sourceName}</small>
              {result.summary && <p>{truncate(result.summary, 150)}</p>}
            </span>
            <i aria-hidden="true">›</i>
          </button>
        ))}
        {results.length === 0 && <p className="aos-empty-message">No hay resultados para esta búsqueda.</p>}
      </div>
    </section>
  );
}

function kindLabel(kind) {
  return {
    unit: "Unidad",
    spell: "Hechizo",
    prayer: "Plegaria",
    enhancement: "Mejora",
    formation: "Formación",
    battleTrait: "Rasgo",
    manifestation: "Manifestación",
    terrain: "Terreno",
    universal: "Universal",
  }[kind] ?? "Regla";
}

function truncate(value, limit) {
  const text = String(value ?? "");
  return text.length > limit ? `${text.slice(0, limit).trim()}…` : text;
}

export default GlobalRulesSearch;

