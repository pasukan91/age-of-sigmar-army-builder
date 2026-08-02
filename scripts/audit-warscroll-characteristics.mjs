import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { createServer } from "vite";

const referenceDirectory = process.argv[2];

if (!referenceDirectory) {
  throw new Error("Usage: node scripts/audit-warscroll-characteristics.mjs <catalogue-directory>");
}

function decodeXml(value) {
  return String(value ?? "")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function normalizeName(value) {
  return decodeXml(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[‘’`]/g, "'")
    .replace(/[^a-z0-9]+/gi, " ")
    .trim()
    .toLowerCase();
}

function normalizeStat(value) {
  return decodeXml(value)
    .replaceAll("−", "-")
    .replace(/\s+/g, "")
    .toUpperCase();
}

const referenceAliases = new Map([
  ["Morga the Mighty", "Morga the Mighty, Overtyrant"],
  ["Ogor Gluttons", "Gluttons"],
  ["Redd the Maw", "Redd the Maw, High Slaughtermaster"],
  ["Infernal Enrapturess", "Infernal Enrapturess, Herald of Slaanesh"],
  ["Kurnoth Hunters with Greatbows", "Kurnoth Hunters with Kurnoth Greatbows"],
  ["Kurnoth Hunters with Greatswords", "Kurnoth Hunters with Kurnoth Greatswords"],
  ["Kurnoth Hunters with Greatscythes", "Kurnoth Hunters with Kurnoth Scythes"],
  ["The Blades of the Hollow King", "Blades of the Hollow King"],
  ["Pusgoyle Blightlords (1 model)", "Pusgoyle Blightlords"],
]);

function referenceNameForLocal(name) {
  const scourgePrefix = "Scourge of Aqshy ";
  if (name.startsWith(scourgePrefix)) {
    const baseName = name.slice(scourgePrefix.length);
    const aliasedName = referenceAliases.get(baseName) ?? baseName;
    return `${aliasedName} (Scourge of Aqshy)`;
  }

  return referenceAliases.get(name) ?? name;
}

function parseCharacteristics(profileXml) {
  return Object.fromEntries(
    [...profileXml.matchAll(/<characteristic name="([^"]+)"[^>]*>([\s\S]*?)<\/characteristic>/g)]
      .map(([, name, value]) => [name, decodeXml(value).trim()])
  );
}

function loadReferenceUnits(directory) {
  const units = new Map();
  const libraryFiles = readdirSync(directory).filter((name) => name.endsWith(".cat"));

  for (const fileName of libraryFiles) {
    const xml = readFileSync(path.join(directory, fileName), "utf8");
    const entries = xml.matchAll(/^    <selectionEntry type="unit"[^>]*name="([^"]+)"[\s\S]*?^    <\/selectionEntry>/gm);

    for (const [entryXml, entryName] of entries) {
      const unitProfile = [...entryXml.matchAll(/<profile name="([^"]+)"[^>]*typeName="Unit"[^>]*>([\s\S]*?)<\/profile>/g)][0];
      if (!unitProfile) continue;

      const unit = {
        name: decodeXml(entryName),
        source: fileName,
        ...parseCharacteristics(unitProfile[2]),
      };
      const key = normalizeName(unit.name);
      const matches = units.get(key) ?? [];
      matches.push(unit);
      units.set(key, matches);
    }
  }

  return units;
}

const server = await createServer({
  logLevel: "silent",
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const { default: factions } = await server.ssrLoadModule("/src/data/factions.js");
  const references = loadReferenceUnits(referenceDirectory);
  const report = { compared: 0, missing: [], ambiguous: [], mismatches: [] };

  for (const faction of factions.filter((item) => item.units.length > 0)) {
    for (const unit of faction.units) {
      const matches = references.get(normalizeName(referenceNameForLocal(unit.name))) ?? [];
      if (matches.length === 0) {
        report.missing.push(`${faction.name}: ${unit.name}`);
        continue;
      }

      const distinctProfiles = [...new Map(matches.map((match) => [
        [match.Move, match.Health, match.Save, match.Control].map(normalizeStat).join("|"),
        match,
      ])).values()];

      if (distinctProfiles.length !== 1) {
        report.ambiguous.push({ faction: faction.name, unit: unit.name, matches: distinctProfiles });
        continue;
      }

      report.compared += 1;
      const reference = distinctProfiles[0];
      const localStats = {
        Move: unit.profile?.move,
        Health: unit.profile?.health,
        Save: unit.profile?.save,
        Control: unit.profile?.control,
      };

      for (const [stat, localValue] of Object.entries(localStats)) {
        if (normalizeStat(localValue) !== normalizeStat(reference[stat])) {
          report.mismatches.push({
            faction: faction.name,
            unit: unit.name,
            stat,
            local: localValue ?? null,
            reference: reference[stat] ?? null,
            source: reference.source,
          });
        }
      }
    }
  }

  console.log(JSON.stringify(report, null, 2));
} finally {
  await server.close();
}
