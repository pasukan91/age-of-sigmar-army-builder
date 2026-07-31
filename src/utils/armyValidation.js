import { calculateArmyPoints } from "./armyPoints.js";
import {
  countsTowardRegimentLimit,
  getRegimentCompositionErrors,
} from "./regimentRules.js";

const ENHANCEMENT_FIELDS = [
  "artefact",
  "heroicTrait",
  "monstrousTrait",
  "allConsumingObsession",
  "moulderMutation",
  "mortisanRefinement",
  "originOfTerrifyingFolkTale",
  "visionOfFate",
  "specialKnickKnack",
  "flawlessManoeuvre",
  "plaguefathersPox",
  "decorationForValour",
  "ironweldInnovation",
  "accursedDevice",
  "brazenMutation",
  "brandOfDarkGod",
  "ensorcelledBanner",
];

function issue(id, severity, title, message, section, targetId = null) {
  return { id, severity, title, message, section, targetId };
}

function isUnique(unit) {
  return unit?.rules?.unique === true || (unit?.keywords ?? []).some(
    (keyword) => String(keyword).trim().toLowerCase() === "unique"
  );
}

function getArmyUnits(list) {
  return (list?.regiments ?? []).flatMap((regiment) => [
    { unit: regiment.hero, regiment },
    ...(regiment.units ?? []).map((unit) => ({ unit, regiment })),
  ]).filter(({ unit }) => Boolean(unit));
}

export function validateArmyList(list) {
  if (!list) {
    return { issues: [], errors: [], warnings: [], isValid: false };
  }

  const issues = [];
  const regiments = list.regiments ?? [];
  const effectiveFaction = {
    ...(list.faction ?? {}),
    ...(list.armyOfRenown?.rules ?? {}),
  };
  const currentPoints = calculateArmyPoints(list);
  const pointsLimit = Number(list.pointsLimit ?? list.points) || 0;

  if (pointsLimit > 0 && currentPoints > pointsLimit) {
    issues.push(issue(
      "points-limit",
      "error",
      "Límite de puntos superado",
      `La lista tiene ${currentPoints} puntos y el límite es ${pointsLimit}.`,
      "list",
      "army-summary"
    ));
  }

  if (regiments.length === 0 && (list.regimentsOfRenown ?? []).length === 0) {
    issues.push(issue(
      "empty-army",
      "error",
      "El ejército está vacío",
      "Añade al menos un regimiento o un Regimiento de Renombre.",
      "regiments",
      "regiments-section"
    ));
  }

  if ((effectiveFaction.battleFormations ?? []).length > 0 && !list.battleFormation) {
    issues.push(issue(
      "missing-formation",
      "error",
      "Falta la formación de batalla",
      "Selecciona una formación para completar la composición del ejército.",
      "list",
      "battle-formation-option"
    ));
  }

  [
    ["spellLore", "spellLores", "Saber de hechizos"],
    ["prayerLore", "prayerLores", "Saber de plegarias"],
    ["manifestationLore", "manifestationLores", "Saber de manifestaciones"],
  ].forEach(([property, collection, label]) => {
    if ((effectiveFaction[collection] ?? []).length > 0 && !list[property]) {
      issues.push(issue(
        `missing-${property}`,
        "warning",
        `${label} sin seleccionar`,
        `Puedes escoger un ${label.toLowerCase()} antes de jugar.`,
        "list",
        `${property}-option`
      ));
    }
  });

  regiments.forEach((regiment, regimentIndex) => {
    const targetId = `regiment-${regiment.id}`;
    const regimentLabel = regiment.hero?.name ?? `Regimiento ${regimentIndex + 1}`;
    const limit = regimentIndex === 0 ? 4 : 3;
    const slotCount = (regiment.units ?? []).filter(countsTowardRegimentLimit).length;

    if (!regiment.hero) {
      issues.push(issue(
        `missing-leader-${regiment.id}`,
        "error",
        "Regimiento sin líder",
        `El regimiento ${regimentIndex + 1} necesita un héroe que lo lidere.`,
        "regiments",
        targetId
      ));
    }

    if (slotCount > limit) {
      issues.push(issue(
        `slots-${regiment.id}`,
        "error",
        "Demasiadas unidades en el regimiento",
        `${regimentLabel} ocupa ${slotCount} plazas y su máximo es ${limit}.`,
        "regiments",
        targetId
      ));
    }

    [regiment.hero, ...(regiment.units ?? [])].filter(Boolean).forEach((unit) => {
      if (unit.reinforced && unit.rules?.canBeReinforced === false) {
        issues.push(issue(
          `reinforced-${unit.instanceId ?? unit.id}`,
          "error",
          "Refuerzo no permitido",
          `${unit.name} no se puede reforzar.`,
          "regiments",
          targetId
        ));
      }
    });
  });

  getRegimentCompositionErrors(list).forEach((error) => {
    issues.push(issue(
      `composition-${error.regimentId}-${error.role}`,
      "error",
      "Composición de regimiento ilegal",
      error.message,
      "regiments",
      `regiment-${error.regimentId}`
    ));
  });

  const uniqueUnits = new Map();
  getArmyUnits(list).forEach(({ unit, regiment }) => {
    if (!isUnique(unit)) return;
    const entries = uniqueUnits.get(unit.id) ?? [];
    entries.push(regiment.id);
    uniqueUnits.set(unit.id, entries);
  });
  uniqueUnits.forEach((regimentIds, unitId) => {
    if (regimentIds.length < 2) return;
    const unitName = list.faction?.units?.find((unit) => unit.id === unitId)?.name ?? unitId;
    issues.push(issue(
      `duplicate-unique-${unitId}`,
      "error",
      "Unidad única repetida",
      `${unitName} aparece ${regimentIds.length} veces en el ejército.`,
      "regiments",
      `regiment-${regimentIds[0]}`
    ));
  });

  const enhancements = new Map();
  getArmyUnits(list).forEach(({ unit, regiment }) => {
    ENHANCEMENT_FIELDS.forEach((field) => {
      const enhancement = unit[field];
      if (!enhancement?.id) return;
      const key = `${field}:${enhancement.id}`;
      const entries = enhancements.get(key) ?? [];
      entries.push({ unit, regiment, enhancement });
      enhancements.set(key, entries);
    });
  });
  enhancements.forEach((entries, key) => {
    if (entries.length < 2) return;
    issues.push(issue(
      `duplicate-enhancement-${key}`,
      "error",
      "Mejora repetida",
      `${entries[0].enhancement.name} está asignada a más de una unidad.`,
      "regiments",
      `regiment-${entries[0].regiment.id}`
    ));
  });

  (list.armyOfRenown?.requiredUnits ?? []).forEach((unitId) => {
    const present = getArmyUnits(list).some(({ unit }) => unit.id === unitId);
    if (present) return;
    const unitName = list.faction?.units?.find((unit) => unit.id === unitId)?.name ?? unitId;
    issues.push(issue(
      `missing-required-${unitId}`,
      "error",
      "Falta una unidad obligatoria",
      `${unitName} es obligatoria en ${list.armyOfRenown.name}.`,
      "regiments",
      "regiments-section"
    ));
  });

  const errors = issues.filter((item) => item.severity === "error");
  const warnings = issues.filter((item) => item.severity === "warning");

  return {
    issues,
    errors,
    warnings,
    isValid: errors.length === 0,
  };
}

