import alliances from "./alliances";
import {
  ghb2026Battleplans,
  ghb2026BattleTacticsCards,
} from "./ghb2026";
import { createArmyList } from "../models/ArmyList";
import { calculateArmyPoints } from "../utils/armyPoints";
import {
  canUnitJoinRegiment,
  countsTowardRegimentLimit,
  getAvailableRegimentLeaders,
} from "../utils/regimentRules";
import { getRegimentUnitLimit } from "../utils/armyComposition";
import createId from "../utils/createId";

export const PREDEFINED_LIST_TYPES = [
  {
    id: "meta",
    name: "Lista meta",
    shortName: "Meta",
    icon: "★",
    description: "Composición equilibrada inspirada en las unidades y estructuras que más aparecen en resultados competitivos recientes.",
  },
  {
    id: "anti-monsters",
    name: "Cazamonstruos",
    shortName: "Antimonstruos",
    icon: "⌖",
    description: "Incluye cazadores de gran daño apoyados por pantallas y unidades de control para no regalar la mesa mientras derriba objetivos grandes.",
  },
  {
    id: "shooting",
    name: "Potencia de disparo",
    shortName: "Disparo",
    icon: "➶",
    description: "Combina una base de disparo con pantallas, presencia de combate y control para proteger las piezas clave y disputar objetivos.",
  },
  {
    id: "control",
    name: "Control de mesa",
    shortName: "Control",
    icon: "◆",
    description: "Combina cuerpos numerosos y movilidad con amenazas de daño suficientes para dominar objetivos y completar tácticas.",
  },
  {
    id: "resilient",
    name: "Yunque resistente",
    shortName: "Resistencia",
    icon: "⬟",
    description: "Construye un núcleo resistente acompañado de movilidad y pegada para aguantar sin renunciar a puntuar ni responder al rival.",
  },
];

const PRESET_SOURCE = {
  season: "GHB 2026-27",
  researchedAt: "2026-08-13",
  sources: [
    "https://listhammer.info/aos",
    "https://aos-events.com/",
    "https://www.warhammer-community.com/en-gb/articles/dwshnd8s/warhammer-age-of-sigmar-quarterly-battlescroll-updates/",
  ],
};

const SPECIAL_ENHANCEMENTS = [
  ["allConsumingObsessions", "allConsumingObsession"],
  ["moulderMutations", "moulderMutation"],
  ["mortisanRefinements", "mortisanRefinement"],
  ["originsOfTerrifyingFolkTales", "originOfTerrifyingFolkTale"],
  ["visionsOfFate", "visionOfFate"],
  ["specialKnickKnacks", "specialKnickKnack"],
  ["plaguefathersPoxes", "plaguefathersPox"],
  ["decorationsForValour", "decorationForValour"],
  ["ironweldInnovations", "ironweldInnovation"],
  ["accursedDevices", "accursedDevice"],
  ["brazenMutations", "brazenMutation"],
  ["brandsOfTheDarkGods", "brandOfDarkGod"],
  ["ensorcelledBanners", "ensorcelledBanner"],
  ["boonsOfShadow", "boonOfShadow"],
  ["aqshyEnhancements", "aqshyEnhancement"],
];

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function averageDice(value) {
  if (typeof value === "number") return value;
  const normalized = String(value ?? "0").toUpperCase().replace(/\s/g, "");
  const dice = normalized.match(/^(\d*)D(\d+)(?:\+(\d+))?$/);
  if (dice) {
    const count = Number(dice[1] || 1);
    return count * (Number(dice[2]) + 1) / 2 + Number(dice[3] || 0);
  }
  return Number.parseFloat(normalized) || 0;
}

function rollChance(value) {
  const target = Number.parseInt(String(value ?? ""), 10);
  return target >= 2 && target <= 6 ? (7 - target) / 6 : 0;
}

function profileNumber(value) {
  return Number.parseFloat(String(value ?? "0")) || 0;
}

function unitModels(unit) {
  return Math.max(1, Number(unit?.details?.models ?? unit?.models) || 1);
}

function keywordText(unit) {
  return asArray(unit?.keywords).join(" ").toLowerCase();
}

function searchableText(value) {
  if (!value) return "";
  if (typeof value === "string") return value.toLowerCase();
  if (Array.isArray(value)) return value.map(searchableText).join(" ");
  if (typeof value === "object") return Object.values(value).map(searchableText).join(" ");
  return String(value).toLowerCase();
}

function weaponOutput(unit, type = null) {
  return asArray(unit?.weapons)
    .filter((weapon) => !type || String(weapon.type).toLowerCase() === type)
    .reduce((total, weapon) => {
      const output = averageDice(weapon.attacks)
        * rollChance(weapon.hit)
        * rollChance(weapon.wound)
        * averageDice(weapon.damage)
        * (1 + profileNumber(weapon.rend) * 0.16);
      return total + output;
    }, 0) * unitModels(unit);
}

function antiMonsterOutput(unit) {
  return asArray(unit?.weapons).reduce((total, weapon) => {
    const abilities = searchableText(weapon.abilities);
    const antiBonus = abilities.includes("anti-monster") ? 2.5 : 1;
    const mortalBonus = abilities.includes("mortal") ? 1.25 : 1;
    return total + weaponOutput({ ...unit, weapons: [weapon] }) * antiBonus * mortalBonus;
  }, 0);
}

function durability(unit) {
  const models = unitModels(unit);
  const health = profileNumber(unit?.profile?.health ?? unit?.health) || 1;
  const save = Number.parseInt(String(unit?.profile?.save ?? unit?.save ?? "7"), 10) || 7;
  const ward = Number.parseInt(String(unit?.profile?.ward ?? unit?.ward ?? "7"), 10) || 7;
  const saveFactor = save <= 6 ? 1 + (7 - save) * 0.2 : 1;
  const wardFactor = ward <= 6 ? 1 / (1 - (7 - ward) / 6) : 1;
  return models * health * saveFactor * wardFactor;
}

function boardControl(unit) {
  const models = unitModels(unit);
  const control = profileNumber(unit?.profile?.control ?? unit?.control) || 1;
  const move = profileNumber(unit?.profile?.move ?? unit?.move);
  return models * control + move * 0.8 + (keywordText(unit).includes("fly") ? 4 : 0);
}

function utility(unit) {
  const rules = unit?.rules ?? {};
  const abilities = searchableText(unit?.abilities);
  return Number(rules.wizard || 0) * 5
    + Number(rules.priest || 0) * 5
    + (abilities.includes("heal") ? 4 : 0)
    + (abilities.includes("return") || abilities.includes("replacement") ? 3 : 0);
}

function isRangedSpecialist(unit) {
  const ranged = weaponOutput(unit, "ranged");
  const melee = weaponOutput(unit, "melee");
  return ranged >= 1.5 && ranged > melee * 1.15;
}

function isMonsterHunter(unit) {
  const weapons = asArray(unit?.weapons);
  const rulesText = searchableText([
    weapons.map((weapon) => weapon.abilities),
    unit?.abilities,
  ]);
  const ordinaryOutput = weapons.reduce(
    (total, weapon) => total + weaponOutput({ ...unit, weapons: [weapon] }),
    0
  );
  return rulesText.includes("anti-monster") ||
    rulesText.includes("anti monster") ||
    antiMonsterOutput(unit) > ordinaryOutput * 1.35;
}

function isScreen(unit) {
  const models = unitModels(unit);
  const points = Number(unit?.points) || 0;
  const keywords = keywordText(unit);
  return !unit?.rules?.hero &&
    !unit?.rules?.monster &&
    !keywords.includes("monster") &&
    models >= 5 &&
    points / models <= 32 &&
    (!isRangedSpecialist(unit) || points / models <= 18);
}

function isMobileScorer(unit) {
  const move = profileNumber(unit?.profile?.move ?? unit?.move);
  return move >= 8 || keywordText(unit).includes("fly");
}

function isCombatThreat(unit) {
  return weaponOutput(unit, "melee") >= Math.max(2, weaponOutput(unit, "ranged") * 0.65);
}

function isDurableUnit(unit) {
  return durability(unit) / Math.max(60, Number(unit?.points) || 0) >= 0.09;
}

export function classifyPresetUnit(unit) {
  return {
    screen: isScreen(unit),
    ranged: isRangedSpecialist(unit),
    hunter: isMonsterHunter(unit),
    mobile: isMobileScorer(unit),
    combat: isCombatThreat(unit),
    durable: isDurableUnit(unit),
  };
}

const BALANCED_ROLE_ROTATIONS = {
  "anti-monsters": ["screen", "hunter", "screen", "combat", "hunter", "mobile"],
  shooting: ["screen", "ranged", "screen", "combat", "ranged", "mobile"],
  control: ["screen", "combat", "mobile", "durable", "combat", "screen"],
  resilient: ["durable", "combat", "mobile", "screen", "durable", "combat"],
};

function selectedCoreUnits(list) {
  return asArray(list?.regiments).flatMap((regiment) => asArray(regiment?.units));
}

function roleForNextUnit(list, typeId) {
  const rotation = BALANCED_ROLE_ROTATIONS[typeId];
  if (!rotation) return null;
  return rotation[selectedCoreUnits(list).length % rotation.length];
}

function balancedCandidateScore(unit, list, typeId, desiredRole = null) {
  const base = scoreUnitForPreset(unit, typeId);
  if (typeId === "meta") return base;

  const roles = classifyPresetUnit(unit);
  const selected = selectedCoreUnits(list);
  const duplicateCount = selected.filter((item) => item.id === unit.id).length;
  const roleMatch = desiredRole && roles[desiredRole];
  const specialistRole = typeId === "shooting" ? "ranged"
    : typeId === "anti-monsters" ? "hunter"
      : null;
  const specialistCount = specialistRole
    ? selected.filter((item) => classifyPresetUnit(item)[specialistRole]).length
    : 0;
  const specialistSaturated = specialistRole && roles[specialistRole] &&
    specialistCount >= Math.ceil(Math.max(1, selected.length) * 0.5);

  return base * (roleMatch ? 3.2 : 1)
    * (specialistSaturated ? 0.28 : 1)
    * Math.pow(0.62, duplicateCount);
}

export function scoreUnitForPreset(unit, typeId) {
  const points = Math.max(60, Number(unit?.points) || 0);
  const melee = weaponOutput(unit, "melee");
  const ranged = weaponOutput(unit, "ranged");
  const toughness = durability(unit);
  const control = boardControl(unit);
  const support = utility(unit);
  const base = {
    "anti-monsters": antiMonsterOutput(unit) * 2.2 + melee * 0.45 + toughness * 0.25,
    shooting: ranged * 2.5 + control * 0.25 + support,
    control: control * 2.1 + toughness * 0.7 + support,
    resilient: toughness * 1.9 + melee * 0.5 + control * 0.35,
    meta: melee + ranged * 1.15 + toughness * 0.8 + control * 0.75 + support * 1.4,
  }[typeId] ?? 0;
  return base / Math.sqrt(points);
}

function scoreOption(option, typeId) {
  const text = searchableText(option);
  const terms = {
    meta: ["control", "move", "hit", "wound", "command", "objective"],
    "anti-monsters": ["monster", "rend", "mortal", "damage", "hero", "warmaster"],
    shooting: ["shoot", "ranged", "missile", "ballistic", "cannon", "war machine"],
    control: ["control", "objective", "move", "run", "set up", "territory"],
    resilient: ["ward", "save", "heal", "health", "damage point", "defence"],
  }[typeId] ?? [];
  return terms.reduce((score, term) => score + (text.includes(term) ? 1 : 0), 0)
    - Number(option?.points || 0) * 0.01;
}

function pickOption(options, typeId) {
  return [...asArray(options)].sort(
    (left, right) => scoreOption(right, typeId) - scoreOption(left, typeId)
  )[0] ?? null;
}

function cloneUnit(unit) {
  return {
    ...unit,
    instanceId: createId(unit?.rules?.hero ? "hero" : "unit"),
    reinforced: false,
  };
}

function hasRequiredMinimumOption(hero) {
  return asArray(hero?.details?.regimentOptions).some((option) =>
    /^[1-9]\d*\s*[-–—]\s*\d+/.test(String(option).trim())
  );
}

function selectLeaders(list, typeId, remainingPoints) {
  return getAvailableRegimentLeaders(list)
    .filter((unit) => Number(unit.points) > 0 && Number(unit.points) <= remainingPoints)
    .filter((unit) => !hasRequiredMinimumOption(unit))
    .sort((left, right) => {
      const leftBonus = left.rules?.unique ? 0 : 0.35;
      const rightBonus = right.rules?.unique ? 0 : 0.35;
      const selectedLeaders = list.regiments.map((regiment) => regiment.hero);
      const leftDuplicates = selectedLeaders.filter((unit) => unit.id === left.id).length;
      const rightDuplicates = selectedLeaders.filter((unit) => unit.id === right.id).length;
      return (scoreUnitForPreset(right, typeId) + rightBonus) * Math.pow(0.7, rightDuplicates)
        - (scoreUnitForPreset(left, typeId) + leftBonus) * Math.pow(0.7, leftDuplicates);
    });
}

function addEnhancements(list, faction, typeId) {
  const hero = list.regiments
    .map((regiment) => regiment.hero)
    .find((unit) => unit && !unit.rules?.unique);
  if (!hero) return;

  const remaining = () => Math.max(0, list.pointsLimit - calculateArmyPoints(list));
  const chooseAffordable = (options) => [...asArray(options)]
    .filter((option) => Number(option?.points || 0) <= remaining())
    .sort((left, right) => scoreOption(right, typeId) - scoreOption(left, typeId))[0] ?? null;

  hero.heroicTrait = chooseAffordable(faction.heroicTraits);
  hero.artefact = chooseAffordable([
    ...asArray(faction.artefacts),
    ...asArray(faction.aqshyArtefacts),
  ]);
  if (hero.rules?.monster) hero.monstrousTrait = chooseAffordable(faction.monsterTraits);

  SPECIAL_ENHANCEMENTS.some(([collection, property]) => {
    const option = chooseAffordable(faction[collection]);
    if (!option) return false;
    hero[property] = option;
    return true;
  });
}

function addRegiments(list, faction, typeId) {
  const lowestUnitPoints = Math.min(
    ...asArray(faction.units)
      .filter((unit) => !unit.rules?.hero && Number(unit.points) > 0)
      .map((unit) => Number(unit.points)),
    100
  );

  for (let regimentIndex = 0; regimentIndex < 5; regimentIndex += 1) {
    const remainingBeforeLeader = list.pointsLimit - calculateArmyPoints(list);
    if (remainingBeforeLeader < lowestUnitPoints + 70) break;
    const leaders = selectLeaders(list, typeId, remainingBeforeLeader - lowestUnitPoints);
    const leader = leaders.find((candidate) =>
      !candidate.rules?.unique || !list.regiments.some((regiment) => regiment.hero.id === candidate.id)
    );
    if (!leader) break;

    const regiment = { id: createId("regiment"), hero: cloneUnit(leader), units: [] };
    list.regiments.push(regiment);

    const slotLimit = getRegimentUnitLimit(regimentIndex);
    while (regiment.units.filter(countsTowardRegimentLimit).length < slotLimit) {
      const remaining = list.pointsLimit - calculateArmyPoints(list);
      const desiredRole = roleForNextUnit(list, typeId);
      const candidates = asArray(faction.units)
        .filter((unit) => !unit.rules?.hero && Number(unit.points) > 0)
        .filter((unit) => Number(unit.points) <= remaining)
        .filter((unit) => canUnitJoinRegiment({ list, regiment, unit }))
        .filter((unit) => typeId === "meta" ||
          selectedCoreUnits(list).filter((selected) => selected.id === unit.id).length < 2)
        .sort((left, right) =>
          balancedCandidateScore(right, list, typeId, desiredRole)
          - balancedCandidateScore(left, list, typeId, desiredRole)
        );
      const selected = candidates[0];
      if (!selected) break;
      regiment.units.push(cloneUnit(selected));
    }

    if (regiment.units.length === 0 && list.regiments.length > 1) {
      list.regiments.pop();
      break;
    }
    if (calculateArmyPoints(list) >= 1820) break;
  }
}

function reinforceCoreUnits(list, typeId) {
  const candidates = list.regiments
    .flatMap((regiment) => regiment.units)
    .filter((unit) => unit.rules?.canBeReinforced !== false && !unit.reinforced)
    .sort((left, right) => {
      if (typeId === "meta") {
        return scoreUnitForPreset(right, typeId) - scoreUnitForPreset(left, typeId);
      }
      const desiredRole = roleForNextUnit(list, typeId);
      return balancedCandidateScore(right, list, typeId, desiredRole)
        - balancedCandidateScore(left, list, typeId, desiredRole);
    });

  candidates.forEach((unit) => {
    const remaining = list.pointsLimit - calculateArmyPoints(list);
    const projectedPoints = calculateArmyPoints(list) + Number(unit.points);
    const specialistRole = typeId === "shooting" ? "ranged"
      : typeId === "anti-monsters" ? "hunter"
        : null;
    const specialistPoints = specialistRole
      ? selectedCoreUnits(list).reduce((total, selected) => {
        if (!classifyPresetUnit(selected)[specialistRole]) return total;
        return total + Number(selected.points || 0) * (selected.reinforced ? 2 : 1);
      }, 0)
      : 0;
    const projectedSpecialistPoints = specialistPoints + (
      specialistRole && classifyPresetUnit(unit)[specialistRole]
        ? Number(unit.points || 0)
        : 0
    );
    const withinSpecialistCap = !specialistRole ||
      projectedSpecialistPoints / Math.max(1, projectedPoints) <= 0.58;

    if (
      Number(unit.points) > 0 &&
      Number(unit.points) <= remaining &&
      withinSpecialistCap
    ) {
      unit.reinforced = true;
    }
  });
}

export function getPredefinedComposition(list, typeId = list?.preset?.id) {
  const units = selectedCoreUnits(list ?? {});
  const totalPoints = Math.max(1, calculateArmyPoints(list));
  const roleCounts = units.reduce((counts, unit) => {
    const roles = classifyPresetUnit(unit);
    Object.entries(roles).forEach(([role, matches]) => {
      if (matches) counts[role] += 1;
    });
    return counts;
  }, { screen: 0, ranged: 0, hunter: 0, mobile: 0, combat: 0, durable: 0 });
  const specialistRole = typeId === "shooting" ? "ranged"
    : typeId === "anti-monsters" ? "hunter"
      : null;
  const specialistPoints = specialistRole
    ? units.reduce((total, unit) => total + (
      classifyPresetUnit(unit)[specialistRole]
        ? Number(unit.points || 0) * (unit.reinforced ? 2 : 1)
        : 0
    ), 0)
    : 0;

  return {
    ...roleCounts,
    coreUnits: units.length,
    specialistShare: specialistRole ? specialistPoints / totalPoints : 0,
  };
}

export function createPredefinedArmyList({ faction, typeId = "meta" }) {
  if (!faction || asArray(faction.units).length === 0) return null;
  if (
    typeId === "shooting" &&
    !asArray(faction.units).some((unit) => !unit.rules?.hero && isRangedSpecialist(unit))
  ) {
    return null;
  }
  const type = PREDEFINED_LIST_TYPES.find((item) => item.id === typeId)
    ?? PREDEFINED_LIST_TYPES[0];
  const alliance = alliances.find((item) => item.id === faction.alliance) ?? {
    id: faction.alliance,
    name: faction.alliance,
  };
  const list = createArmyList({
    name: `${type.shortName} — ${faction.name}`,
    faction,
    alliance,
    pointsLimit: 2000,
  });

  list.battleFormation = pickOption(faction.battleFormations, type.id);
  list.battleplan = ghb2026Battleplans[
    { meta: 0, "anti-monsters": 1, shooting: 5, control: 8, resilient: 3 }[type.id] ?? 0
  ] ?? ghb2026Battleplans[0];
  list.battleTactics = {
    meta: [1, 2],
    "anti-monsters": [0, 4],
    shooting: [0, 3],
    control: [2, 5],
    resilient: [1, 3],
  }[type.id].map((index) => ghb2026BattleTacticsCards[index]).filter(Boolean);
  list.spellLore = pickOption(faction.spellLores, type.id);
  list.prayerLore = pickOption(faction.prayerLores, type.id);
  list.manifestationLore = pickOption(faction.manifestationLores, type.id);
  list.terrain = pickOption(faction.terrain, type.id);
  list.preset = { ...PRESET_SOURCE, id: type.id, name: type.name };

  addRegiments(list, faction, type.id);
  reinforceCoreUnits(list, type.id);
  addEnhancements(list, faction, type.id);
  list.updatedAt = Date.now();
  return list;
}

export function getPredefinedListSummary(faction, typeId) {
  const list = createPredefinedArmyList({ faction, typeId });
  if (!list) return null;
  return {
    list,
    points: calculateArmyPoints(list),
    regiments: list.regiments.length,
    units: list.regiments.reduce((total, regiment) => total + 1 + regiment.units.length, 0),
    composition: getPredefinedComposition(list, typeId),
  };
}
