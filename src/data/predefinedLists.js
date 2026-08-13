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
  getRegimentCompositionErrors,
} from "../utils/regimentRules";
import { getRegimentUnitLimit } from "../utils/armyComposition";
import { getPotentialSynergies } from "../utils/unitSynergies";
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
    "https://www.warhammer-community.com/en-gb/articles/yb8viq2m/head-to-aqshy-with-the-new-generals-handbook/",
    "https://www.warhammer-community.com/en-gb/articles/ilauiwfp/threshold-tactics-on-the-new-generals-handbook/",
  ],
};

export const PRESET_DOCTRINES = {
  "anti-monsters": {
    roleMinimums: { screen: 2, hunter: 2, combat: 2, mobile: 1 },
    specialistRole: "hunter",
    specialistPointCap: 0.46,
    battleplan: 1,
    tacticCards: [0, 4],
    plan: "Dos pantallas absorben la primera carga; los cazadores responden sobre el objetivo prioritario y una pieza móvil conserva la capacidad de puntuar.",
  },
  shooting: {
    roleMinimums: { screen: 2, ranged: 2, combat: 2, mobile: 1 },
    specialistRole: "ranged",
    specialistPointCap: 0.46,
    battleplan: 0,
    tacticCards: [0, 1],
    plan: "Las pantallas crean distancia y protegen las líneas de tiro; al menos dos amenazas de combate despejan objetivos y una pieza móvil completa tácticas.",
  },
  control: {
    roleMinimums: { screen: 2, objective: 3, mobile: 2, combat: 2 },
    specialistRole: null,
    specialistPointCap: 1,
    battleplan: 8,
    tacticCards: [2, 4],
    plan: "Varias unidades autónomas ocupan zonas distintas, mientras las amenazas de combate castigan al rival por disputar los objetivos.",
  },
  resilient: {
    roleMinimums: { durable: 3, screen: 1, combat: 2, mobile: 1 },
    specialistRole: null,
    specialistPointCap: 1,
    battleplan: 0,
    tacticCards: [1, 3],
    plan: "El yunque ocupa el centro, una pantalla evita intercambios desfavorables y las amenazas de respuesta impiden que el rival lo ignore.",
  },
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
  return isDedicatedMonsterHunter(unit) ||
    (
      !isScreen(unit) &&
      antiMonsterOutput(unit) / Math.sqrt(Math.max(60, Number(unit?.points) || 0)) >= 0.55
    );
}

function isDedicatedMonsterHunter(unit) {
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

function matchesSpecialistRole(unit, role) {
  if (role === "hunter") return isDedicatedMonsterHunter(unit);
  return Boolean(classifyPresetUnit(unit)[role]);
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
  const text = searchableText(unit?.abilities);
  return move >= 8 || keywordText(unit).includes("fly") ||
    text.includes("set it up again") ||
    text.includes("set up this unit") ||
    text.includes("remove this unit from the battlefield") ||
    text.includes("teleport");
}

function isCombatThreat(unit) {
  return weaponOutput(unit, "melee") >= Math.max(2, weaponOutput(unit, "ranged") * 0.65);
}

function isDurableUnit(unit) {
  return durability(unit) / Math.max(60, Number(unit?.points) || 0) >= 0.09;
}

function isObjectiveUnit(unit) {
  const points = Math.max(60, Number(unit?.points) || 0);
  return boardControl(unit) / Math.sqrt(points) >= 1.35;
}

function isSupportUnit(unit) {
  const text = searchableText(unit?.abilities);
  return utility(unit) > 0 || [
    "friendly unit",
    "add 1 to hit",
    "add 1 to wound",
    "subtract 1 from hit",
    "ward (",
    "heal (",
  ].some((term) => text.includes(term));
}

export function classifyPresetUnit(unit) {
  return {
    screen: isScreen(unit),
    ranged: isRangedSpecialist(unit),
    hunter: isMonsterHunter(unit),
    mobile: isMobileScorer(unit),
    combat: isCombatThreat(unit),
    durable: isDurableUnit(unit),
    objective: isObjectiveUnit(unit),
    support: isSupportUnit(unit),
  };
}

function selectedCoreUnits(list) {
  return asArray(list?.regiments).flatMap((regiment) => asArray(regiment?.units));
}

function roleForNextUnit(list, typeId, candidates) {
  const doctrine = PRESET_DOCTRINES[typeId];
  if (!doctrine) return null;

  const selected = selectedCoreUnits(list);
  const deficits = Object.entries(doctrine.roleMinimums)
    .filter(([role]) => candidates.some((unit) => classifyPresetUnit(unit)[role]))
    .map(([role, minimum]) => ({
      role,
      deficit: minimum - selected.filter((unit) => classifyPresetUnit(unit)[role]).length,
    }))
    .filter(({ deficit }) => deficit > 0)
    .sort((left, right) => right.deficit - left.deficit);

  return deficits[0]?.role ?? null;
}

function balancedCandidateScore(unit, list, typeId, desiredRole = null) {
  const base = scoreUnitForPreset(unit, typeId);
  if (typeId === "meta") return base;

  const roles = classifyPresetUnit(unit);
  const selected = selectedCoreUnits(list);
  const duplicateCount = selected.filter((item) => item.id === unit.id).length;
  const roleMatch = desiredRole && roles[desiredRole];
  const specialistRole = PRESET_DOCTRINES[typeId]?.specialistRole ?? null;
  const specialistCount = specialistRole
    ? selected.filter((item) => classifyPresetUnit(item)[specialistRole]).length
    : 0;
  const specialistSaturated = specialistRole && roles[specialistRole] &&
    specialistCount >= Math.ceil(Math.max(1, selected.length) * 0.5);
  const synergyCount = getPotentialSynergies(list, unit).length;
  const synergyMultiplier = 1 + Math.min(0.6, synergyCount * 0.12);

  return base * (roleMatch ? 3.2 : 1)
    * (specialistSaturated ? 0.28 : 1)
    * Math.pow(0.62, duplicateCount)
    * synergyMultiplier;
}

function sortBalancedCandidates(candidates, list, typeId, desiredRole) {
  const scores = new Map(candidates.map((unit) => [
    unit,
    balancedCandidateScore(unit, list, typeId, desiredRole),
  ]));
  return candidates.sort((left, right) => scores.get(right) - scores.get(left));
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
    const leaderBudget = typeId === "meta"
      ? remainingBeforeLeader - lowestUnitPoints
      : Math.min(
        regimentIndex === 0 ? list.pointsLimit * 0.27 : list.pointsLimit * 0.24,
        remainingBeforeLeader - lowestUnitPoints * 2
      );
    const leader = leaders.find((candidate) =>
      Number(candidate.points) <= leaderBudget &&
      (!candidate.rules?.unique || !list.regiments.some((regiment) => regiment.hero.id === candidate.id))
    );
    if (!leader) break;

    const regiment = { id: createId("regiment"), hero: cloneUnit(leader), units: [] };
    list.regiments.push(regiment);

    const slotLimit = getRegimentUnitLimit(regimentIndex);
    while (regiment.units.filter(countsTowardRegimentLimit).length < slotLimit) {
      const remaining = list.pointsLimit - calculateArmyPoints(list);
      const candidates = asArray(faction.units)
        .filter((unit) => !unit.rules?.hero && Number(unit.points) > 0)
        .filter((unit) => Number(unit.points) <= remaining)
        .filter((unit) => canUnitJoinRegiment({ list, regiment, unit }))
        .filter((unit) => typeId === "meta" ||
          selectedCoreUnits(list).filter((selected) => selected.id === unit.id).length < 2);
      const desiredRole = roleForNextUnit(list, typeId, candidates);
      sortBalancedCandidates(candidates, list, typeId, desiredRole);
      const selected = candidates.find((candidate) => {
        regiment.units.push(cloneUnit(candidate));
        const legal = getRegimentCompositionErrors(list).length === 0;
        regiment.units.pop();
        return legal;
      });
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
    .filter((unit) => unit.rules?.canBeReinforced !== false && !unit.reinforced);
  const desiredRole = roleForNextUnit(list, typeId, candidates);
  if (typeId === "meta") {
    candidates.sort(
      (left, right) => scoreUnitForPreset(right, typeId) - scoreUnitForPreset(left, typeId)
    );
  } else {
    sortBalancedCandidates(candidates, list, typeId, desiredRole);
  }

  candidates.forEach((unit) => {
    const remaining = list.pointsLimit - calculateArmyPoints(list);
    const projectedPoints = calculateArmyPoints(list) + Number(unit.points);
    const doctrine = PRESET_DOCTRINES[typeId];
    const specialistRole = doctrine?.specialistRole ?? null;
    const specialistPoints = specialistRole
      ? selectedCoreUnits(list).reduce((total, selected) => {
        if (!matchesSpecialistRole(selected, specialistRole)) return total;
        return total + Number(selected.points || 0) * (selected.reinforced ? 2 : 1);
      }, 0)
      : 0;
    const projectedSpecialistPoints = specialistPoints + (
      specialistRole && matchesSpecialistRole(unit, specialistRole)
        ? Number(unit.points || 0)
        : 0
    );
    const withinSpecialistCap = !specialistRole ||
      projectedSpecialistPoints / Math.max(1, projectedPoints) <= doctrine.specialistPointCap;

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
  }, {
    screen: 0,
    ranged: 0,
    hunter: 0,
    mobile: 0,
    combat: 0,
    durable: 0,
    objective: 0,
    support: 0,
  });
  const specialistRole = PRESET_DOCTRINES[typeId]?.specialistRole ?? null;
  const specialistPoints = specialistRole
    ? units.reduce((total, unit) => total + (
      matchesSpecialistRole(unit, specialistRole)
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

function describeAdaptedDoctrine(typeId, composition) {
  const doctrine = PRESET_DOCTRINES[typeId];
  if (!doctrine) return "Composición flexible orientada al entorno competitivo.";

  const adaptations = [];
  if (composition.screen >= 2) adaptations.push(`${composition.screen} pantallas`);
  if (composition.mobile >= 1) adaptations.push(`${composition.mobile} piezas móviles`);
  if (composition.objective >= 2) adaptations.push(`${composition.objective} unidades de control`);
  if (composition.combat >= 2) adaptations.push(`${composition.combat} amenazas de combate`);
  if (typeId === "shooting") adaptations.unshift(`${composition.ranged} unidades de disparo`);
  if (typeId === "anti-monsters") adaptations.unshift(`${composition.hunter} cazadores`);
  if (typeId === "resilient") adaptations.unshift(`${composition.durable} unidades resistentes`);

  const fallback = composition.mobile === 0
    ? " La facción no dispone de una pieza móvil clara, así que compensa con más presencia y capas defensivas."
    : "";
  return `${doctrine.plan} Composición resultante: ${adaptations.slice(0, 4).join(", ")}.${fallback}`;
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
  const doctrine = PRESET_DOCTRINES[type.id];
  list.battleplan = ghb2026Battleplans[
    doctrine?.battleplan ?? 0
  ] ?? ghb2026Battleplans[0];
  list.battleTactics = (
    doctrine?.tacticCards ?? [1, 2]
  ).map((index) => ghb2026BattleTacticsCards[index]).filter(Boolean);
  list.spellLore = pickOption(faction.spellLores, type.id);
  list.prayerLore = pickOption(faction.prayerLores, type.id);
  list.manifestationLore = pickOption(faction.manifestationLores, type.id);
  list.terrain = pickOption(faction.terrain, type.id);
  list.preset = {
    ...PRESET_SOURCE,
    id: type.id,
    name: type.name,
    doctrine: doctrine?.plan ?? "Composición flexible orientada al entorno competitivo.",
  };

  addRegiments(list, faction, type.id);
  reinforceCoreUnits(list, type.id);
  addEnhancements(list, faction, type.id);
  list.preset.doctrine = describeAdaptedDoctrine(
    type.id,
    getPredefinedComposition(list, type.id)
  );
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
