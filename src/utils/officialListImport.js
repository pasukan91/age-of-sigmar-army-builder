import { calculateArmyPoints } from "./armyPoints.js";

const REGIMENT_HEADING = /^(General(?:'s|’s) Regiment|Regiment\s+\d+)$/i;
const UNIT_LINE = /^(.+?)\s+\((\d+)\)\s*$/;

const ENHANCEMENT_FIELDS = [
  ["heroicTraits", "heroicTrait"],
  ["aqshyHeroicTraits", "heroicTrait"],
  ["monsterTraits", "monstrousTrait"],
  ["artefacts", "artefact"],
  ["aqshyArtefacts", "artefact"],
  ["allConsumingObsessions", "allConsumingObsession"],
  ["moulderMutations", "moulderMutation"],
  ["mortisanRefinements", "mortisanRefinement"],
  ["originsOfTerrifyingFolkTales", "originOfTerrifyingFolkTale"],
  ["visionsOfFate", "visionOfFate"],
  ["specialKnickKnacks", "specialKnickKnack"],
  ["flawlessManoeuvres", "flawlessManoeuvre"],
  ["plaguefathersPoxes", "plaguefathersPox"],
  ["decorationsForValour", "decorationForValour"],
  ["ironweldInnovations", "ironweldInnovation"],
  ["accursedDevices", "accursedDevice"],
  ["brazenMutations", "brazenMutation"],
  ["brandsOfTheDarkGods", "brandOfDarkGod"],
  ["ensorcelledBanners", "ensorcelledBanner"],
  ["boonsOfShadow", "boonOfShadow"],
];

export class OfficialListImportError extends Error {
  constructor(message) {
    super(message);
    this.name = "OfficialListImportError";
  }
}

export function importOfficialArmyList(rawText, { factions = [], alliances = [] } = {}) {
  const text = decodeExportText(rawText);
  const lines = text.split(/\r?\n/).map((line) => line.trim());
  const content = lines.filter(Boolean);
  const heading = content[0]?.match(/^(.*?)\s+(\d+)\s*\/\s*(\d+)\s+pts\s*$/i);

  if (!heading) {
    throw new OfficialListImportError(
      "No encuentro la cabecera de la lista (nombre y puntos). Pega la exportación completa de la app oficial."
    );
  }

  const firstRegimentIndex = lines.findIndex((line) => REGIMENT_HEADING.test(line));
  if (firstRegimentIndex < 0) {
    throw new OfficialListImportError("No encuentro ningún regimiento en el texto exportado.");
  }

  const headerLines = lines.slice(1, firstRegimentIndex).filter(Boolean);
  const faction = findFaction(headerLines, factions);
  if (!faction) {
    throw new OfficialListImportError(
      "No puedo relacionar la facción exportada con una facción disponible en la app."
    );
  }

  const armyOfRenown = findNamedItem(headerLines, faction.armiesOfRenown);
  const rules = armyOfRenown?.rules
    ? { ...faction, ...armyOfRenown.rules }
    : faction;
  const warnings = [];
  const now = Date.now();
  const list = {
    id: makeId("list"),
    name: heading[1].trim(),
    alliance: alliances.find((item) => item.id === faction.alliance) ?? {
      id: faction.alliance,
      name: faction.alliance,
    },
    faction,
    pointsLimit: Number(heading[3]),
    commandPoints: 4,
    furyPoints: 0,
    armyOfRenown: armyOfRenown ?? null,
    battleFormation: findNamedItem(headerLines, rules.battleFormations),
    battleplan: null,
    spellLore: findPrefixedItem(headerLines, "Spell Lore", rules.spellLores, warnings),
    prayerLore: findPrefixedItem(headerLines, "Prayer Lore", rules.prayerLores, warnings),
    manifestationLore: findPrefixedItem(
      headerLines,
      "Manifestation Lore",
      rules.manifestationLores,
      warnings
    ),
    battleTactics: [],
    battleRound: 1,
    battleTurnActor: "self",
    battleLog: [],
    battleUnitStates: {},
    terrain: null,
    regiments: [],
    regimentsOfRenown: [],
    auxiliaries: [],
    createdAt: now,
    updatedAt: now,
  };

  parseRegiments(lines, firstRegimentIndex, rules, list, warnings);
  list.terrain = parseTerrain(lines, rules.terrain, warnings);

  if (list.regiments.length === 0) {
    throw new OfficialListImportError(
      "No se ha podido crear ningún regimiento. Revisa los nombres indicados en los avisos."
    );
  }

  const generalIndex = list.regiments.findIndex((regiment) => regiment.isGeneralRegiment);
  if (generalIndex > 0) {
    const [generalRegiment] = list.regiments.splice(generalIndex, 1);
    list.regiments.unshift(generalRegiment);
  }
  list.regiments.forEach((regiment) => delete regiment.isGeneralRegiment);

  const declaredPoints = Number(heading[2]);
  const calculatedPoints = calculateArmyPoints(list);
  if (declaredPoints !== calculatedPoints) {
    warnings.push(
      `La app oficial indica ${declaredPoints} pts, pero el catálogo local calcula ${calculatedPoints} pts.`
    );
  }

  const versionLine = content.find((line) => /^App:\s*/i.test(line));
  const version = versionLine?.match(/^App:\s*([^|]+?)(?:\s*\|\s*Data:\s*(\S+))?$/i);

  return {
    list,
    warnings,
    source: {
      declaredPoints,
      calculatedPoints,
      appVersion: version?.[1]?.trim() ?? null,
      dataVersion: version?.[2]?.trim() ?? null,
    },
  };
}

function parseRegiments(lines, startIndex, rules, list, warnings) {
  let currentRegiment = null;
  let currentUnit = null;
  let inTerrain = false;

  for (let index = startIndex; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line) continue;

    if (/^Faction Terrain$/i.test(line)) {
      currentRegiment = null;
      currentUnit = null;
      inTerrain = true;
      continue;
    }
    if (/^Created with Warhammer/i.test(line) || /^App:\s*/i.test(line)) break;
    if (inTerrain) continue;

    if (REGIMENT_HEADING.test(line)) {
      currentRegiment = {
        id: makeId("regiment"),
        hero: null,
        units: [],
        isGeneralRegiment: /^General/i.test(line),
      };
      list.regiments.push(currentRegiment);
      currentUnit = null;
      continue;
    }

    if (line.startsWith("•")) {
      if (currentUnit) applyBullet(line, currentUnit, rules, warnings);
      continue;
    }

    const unitMatch = line.match(UNIT_LINE);
    if (!unitMatch || !currentRegiment) continue;

    const unit = findByName(unitMatch[1], rules.units);
    if (!unit) {
      warnings.push(`Unidad no encontrada: “${unitMatch[1]}”.`);
      currentUnit = null;
      continue;
    }

    const instance = {
      ...unit,
      instanceId: makeId(currentRegiment.hero ? "unit" : "hero"),
    };
    if (!currentRegiment.hero) currentRegiment.hero = instance;
    else currentRegiment.units.push(instance);
    currentUnit = instance;
  }

  list.regiments = list.regiments.filter((regiment) => {
    if (regiment.hero) return true;
    warnings.push("Se ha omitido un regimiento cuyo líder no coincide con el catálogo local.");
    return false;
  });
}

function applyBullet(rawLine, unit, rules, warnings) {
  const value = rawLine
    .replace(/^•\s*/, "")
    .replace(/\s*-\s*\(\d+\)\s*Points?\s*$/i, "")
    .trim();

  if (/^General$/i.test(value)) return;
  if (/^Reinforced$/i.test(value)) {
    unit.reinforced = true;
    const models = Number(unit.details?.models);
    if (Number.isFinite(models)) unit.configuredModels = models * 2;
    return;
  }

  const specialEnhancement = findByName(value, rules?.aqshyEnhancements);
  if (specialEnhancement) {
    const category = specialEnhancement.enhancementCategory ?? specialEnhancement.groupName;
    unit.specialEnhancements = {
      ...(unit.specialEnhancements ?? {}),
      [category]: specialEnhancement,
    };
    return;
  }

  for (const [collection, property] of ENHANCEMENT_FIELDS) {
    const enhancement = findByName(value, rules?.[collection]);
    if (enhancement) {
      unit[property] = enhancement;
      return;
    }
  }

  warnings.push(`Mejora u opción no encontrada para ${unit.name}: “${value}”.`);
}

function parseTerrain(lines, terrain, warnings) {
  const sectionIndex = lines.findIndex((line) => /^Faction Terrain$/i.test(line));
  if (sectionIndex < 0) return null;

  const terrainName = lines.slice(sectionIndex + 1).find((line) =>
    line && !/^Created with Warhammer/i.test(line) && !/^App:\s*/i.test(line)
  );
  if (!terrainName) return null;

  const match = findByName(terrainName, terrain);
  if (!match) warnings.push(`Elemento de terreno no encontrado: “${terrainName}”.`);
  return match ?? null;
}

function findFaction(headerLines, factions) {
  const segments = headerLines.flatMap((line) => line.split("|").map((part) => part.trim()));
  return factions.find((faction) =>
    segments.some((segment) => {
      const candidate = normalizeName(segment);
      return candidate === normalizeName(faction.name) || candidate === normalizeName(faction.id);
    })
  ) ?? null;
}

function findPrefixedItem(lines, prefix, items, warnings) {
  const expression = new RegExp(`^${prefix.replace(" ", "\\s+")}\\s*-\\s*(.+)$`, "i");
  const match = lines.map((line) => line.match(expression)).find(Boolean);
  if (!match) return null;

  const item = findByName(match[1], items);
  if (!item) warnings.push(`${prefix} no encontrado: “${match[1]}”.`);
  return item ?? null;
}

function findNamedItem(lines, items = []) {
  return items?.find((item) =>
    lines.some((line) => normalizeName(line) === normalizeName(item.name))
  ) ?? null;
}

function findByName(name, items = []) {
  const normalized = normalizeName(name);
  return items?.find((item) =>
    normalizeName(item?.name) === normalized || normalizeName(item?.id) === normalized
  ) ?? null;
}

function normalizeName(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function decodeExportText(value = "") {
  return String(value)
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, "\"")
    .replace(/&apos;|&#39;/gi, "'");
}

function makeId(prefix) {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
