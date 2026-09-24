import { readFileSync, writeFileSync } from "node:fs";

const [profilesPath, cataloguePath, outputPath] = process.argv.slice(2);
if (!profilesPath || !cataloguePath || !outputPath) {
  throw new Error(
    "Usage: node scripts/generate-september-2026-balance.mjs " +
      "<changed-profiles.json> <catalogue.json> <output.json>",
  );
}

const changedProfiles = JSON.parse(readFileSync(profilesPath, "utf8"));
const catalogue = JSON.parse(readFileSync(cataloguePath, "utf8"));

const FACTION_IDS = new Map(
  catalogue.factions.map((faction) => [comparable(faction.name), faction.id]),
);

const COLLECTION_FIELDS = {
  artefactofpower: ["artefacts", "aqshyArtefacts"],
  battleformation: ["battleFormations"],
  heroictrait: ["heroicTraits", "aqshyHeroicTraits"],
  allconsumingobsession: ["aqshyEnhancements"],
  originofterrifyingfolktales: ["aqshyEnhancements"],
};

const UNIT_ALIASES = new Map([
  ["scourgeofaqshyinfernalenrapturess", "scourgeofaqshyinfernalenrapturessheraldofslaanesh"],
  ["gelguspusttheprinceofsores", "gelguspust"],
]);

function normalized(value) {
  return String(value ?? "")
    .replace(/^✹\s*/u, "")
    .replace(/[‘’‛`´]/g, "'")
    .replace(/[‐‑‒–—−]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function comparable(value) {
  return normalized(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function points(value) {
  const match = String(value ?? "").match(/^\s*(\d+)/);
  return match ? Number(match[1]) : null;
}

function slug(value) {
  return normalized(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function findByName(items, sourceName) {
  const key = UNIT_ALIASES.get(comparable(sourceName)) ?? comparable(sourceName);
  return (items ?? []).find((item) => comparable(item.name) === key);
}

function unitSourceName(rawName) {
  return normalized(rawName);
}

const factions = {};
const unmatched = [];

for (const entry of changedProfiles) {
  const factionId = FACTION_IDS.get(comparable(entry.faction));
  const sourceFaction = catalogue.factions.find((faction) => faction.id === factionId);
  if (!sourceFaction) {
    unmatched.push({ ...entry, reason: "faction" });
    continue;
  }

  const row = entry.row;
  const firstCell = normalized(row[0]);
  const isUnit = /^\d+$/.test(String(row[1] ?? "").trim());
  const factionPatch = (factions[factionId] ??= { units: {}, collections: {} });

  if (isUnit) {
    const allFactionUnits = [
      ...(sourceFaction.units ?? []),
      ...(sourceFaction.armiesOfRenown ?? []).flatMap((army) => army.rules?.units ?? []),
    ];
    const target = findByName(allFactionUnits, unitSourceName(firstCell));
    if (!target) {
      unmatched.push({ ...entry, reason: "unit", cleanedName: unitSourceName(firstCell) });
      continue;
    }

    const note = String(row[4] ?? "").replace(/\s+/g, " ").trim();
    factionPatch.units[target.id] = {
      name: target.name,
      points: points(row[2]),
      regimentOptions: String(row[3] ?? "")
        .split(/,|\n/)
        .map((item) => item.trim())
        .filter(Boolean),
      canJoinRegimentAs: note.match(/join an eligible regiment as (?:a|an) ([^.]+)\./i)?.[1]
        ? [slug(note.match(/join an eligible regiment as (?:a|an) ([^.]+)\./i)[1])]
        : null,
      canBeReinforced: Number(row[1]) > 1 && !target.rules?.hero
        ? !note.includes("cannot be reinforced")
        : false,
      page: entry.page,
    };
    continue;
  }

  const fields = COLLECTION_FIELDS[comparable(firstCell)];
  const target = fields
    ?.flatMap((field) => (sourceFaction[field] ?? []).map((item) => ({ field, item })))
    .find(({ item }) => comparable(item.name) === comparable(row[1]));

  if (!target) {
    unmatched.push({ ...entry, reason: "collection", cleanedName: normalized(row[1]) });
    continue;
  }

  factionPatch.collections[`${target.field}:${target.item.id ?? comparable(target.item.name)}`] = {
    field: target.field,
    id: target.item.id ?? null,
    name: target.item.name,
    points: points(row[2]),
    page: entry.page,
  };
}

const output = {
  metadata: {
    source: "https://www.warhammer-community.com/en-gb/downloads/warhammer-age-of-sigmar/",
    publicationDate: "2026-09-23",
    document: "Battle Profiles - September 2026",
  },
  factions,
};

writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Wrote ${outputPath}`);
console.log(`Faction patches: ${Object.keys(factions).length}`);
console.log(
  `Unit patches: ${Object.values(factions).reduce((sum, faction) => sum + Object.keys(faction.units).length, 0)}`,
);
console.log(
  `Collection patches: ${Object.values(factions).reduce((sum, faction) => sum + Object.keys(faction.collections).length, 0)}`,
);
if (unmatched.length) {
  console.error(JSON.stringify(unmatched, null, 2));
  process.exitCode = 1;
}
