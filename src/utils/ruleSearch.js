import {
  universalAbilities,
  universalCommands,
} from "../data/universalRules.js";

function normalize(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function addRule(results, item, kind, sourceName) {
  if (!item?.name) return;
  results.push({
    id: `${kind}:${item.id ?? normalize(item.name)}:${sourceName ?? ""}`,
    kind,
    name: item.name,
    summary: item.description ?? item.ability?.description ?? "",
    phase: item.phase ?? item.ability?.phase ?? null,
    sourceName,
    item: item.ability ? { ...item.ability, name: item.name } : item,
  });
}

export function buildRuleSearchIndex(list) {
  const faction = {
    ...(list?.faction ?? {}),
    ...(list?.armyOfRenown?.rules ?? {}),
  };
  const results = [];

  (faction.units ?? []).forEach((unit) => {
    results.push({
      id: `unit:${unit.id}`,
      kind: "unit",
      name: unit.name,
      summary: `${unit.points ?? 0} puntos · ${(unit.keywords ?? []).join(", ")}`,
      sourceName: faction.name,
      item: unit,
    });
  });

  (faction.battleTraits ?? []).forEach((item) => addRule(results, item, "battleTrait", "Rasgos de batalla"));
  (faction.battleFormations ?? []).forEach((item) => addRule(results, item, "formation", "Formaciones"));
  (faction.heroicTraits ?? []).forEach((item) => addRule(results, item, "enhancement", "Rasgos heroicos"));
  (faction.artefacts ?? []).forEach((item) => addRule(results, item, "enhancement", "Artefactos"));
  (faction.spellLores ?? []).forEach((lore) => (lore.spells ?? []).forEach((item) => addRule(results, item, "spell", lore.name)));
  (faction.prayerLores ?? []).forEach((lore) => (lore.prayers ?? []).forEach((item) => addRule(results, item, "prayer", lore.name)));
  (faction.manifestations ?? []).forEach((item) => addRule(results, item, "manifestation", "Manifestaciones"));
  (faction.terrain ?? []).forEach((item) => addRule(results, item, "terrain", "Terreno de facción"));
  universalAbilities.forEach((item) => addRule(results, item, "universal", "Habilidades universales"));
  universalCommands.forEach((item) => addRule(results, item, "universal", "Comandos universales"));

  return results;
}

export function searchRules(index, query, kind = "all") {
  const needle = normalize(query).trim();
  return index.filter((entry) => {
    if (kind !== "all" && entry.kind !== kind) return false;
    if (!needle) return true;
    const haystack = normalize([
      entry.name,
      entry.summary,
      entry.phase,
      entry.sourceName,
      ...(entry.item?.keywords ?? []),
    ].join(" "));
    const words = haystack.split(/[^a-z0-9]+/).filter(Boolean);
    const terms = needle.split(/\s+/).filter(Boolean);

    return terms.every((term) =>
      term.length <= 2
        ? haystack.includes(term)
        : words.some((word) => word.startsWith(term))
    );
  });
}
