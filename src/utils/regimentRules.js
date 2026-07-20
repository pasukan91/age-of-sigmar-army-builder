function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function normalizeOption(value) {
  const option = normalize(value).replace(/^0-1\s+/, "");
  const aliases = {
    "any faction unit": "any-faction-unit",
    "any kruleboyz": "any-kruleboyz",
    "any hedonites of slaanesh": "any-hedonites",
    "any sybarite": "any-sybarite",
    "any daemon": "any-daemon",
    "any war machine": "any-war-machine",
    "any skaven": "any-skaven",
    "any skryre": "any-skryre",
    "any verminus": "any-verminus",
    "any moulder": "any-moulder",
    "any pestilens": "any-pestilens",
    "any eshin": "any-eshin",
    "skaven overclaw": "skaven-overclaw",
    "slaaneshi beguiler": "slaaneshi-beguiler",
    "dark egotist": "dark-egotist",
    "mob wrangler": "mob-wrangler",
    "swamp beast": "swamp-beast",
  };

  return aliases[option] ?? option;
}

function getKeywords(unit) {
  return (unit?.keywords ?? []).map(normalize);
}

function hasKeyword(unit, keyword) {
  return getKeywords(unit).includes(normalize(keyword));
}

function getAllArmyUnits(list) {
  return (list?.regiments ?? []).flatMap((regiment) => [
    regiment.hero,
    ...(regiment.units ?? []),
  ]).filter(Boolean);
}

function countUnitInArmy(list, unitId) {
  return getAllArmyUnits(list).filter((unit) => unit.id === unitId).length;
}

function isAllowedByArmyOfRenown(list, unit) {
  const armyId = list?.armyOfRenown?.id;

  if (!armyId) {
    return true;
  }

  if (armyId === "the-decadent-host") {
    if (unit.id === "sigvald-prince-of-slaanesh") {
      return true;
    }

    if (unit.id === "daemonettes") {
      return countUnitInArmy(list, unit.id) < 1;
    }

    if (unit.id === "contorted-epitome") {
      return countUnitInArmy(list, unit.id) < 1;
    }

    return hasKeyword(unit, "Sybarite") && !hasKeyword(unit, "War Machine");
  }

  if (armyId === "court-of-the-godlings") {
    if (["dexcessa-the-talon-of-slaanesh", "synessa-the-voice-of-slaanesh"].includes(unit.id)) {
      return true;
    }

    return hasKeyword(unit, "Daemon") && unit.rules?.unique !== true;
  }

  if (armyId === "the-great-grand-gnawhorde") {
    if (unit.id === "vizzik-skour-prophet-of-the-horned-rat") {
      return true;
    }

    return unit.rules?.unique !== true &&
      ["Masterclan", "Verminus", "Skryre", "Moulder"].some(
        (keyword) => hasKeyword(unit, keyword)
      );
  }

  if (armyId === "thanquols-mutated-menagerie") {
    return [
      "thanquol-on-boneripper",
      "master-moulder",
      "rat-ogors",
      "hell-pit-abomination",
      "brood-terror",
      "stormfiends",
    ].includes(unit.id);
  }

  return true;
}

function optionMatchesNonHero(unit, option) {
  switch (option) {
    case "any-hedonites":
      return hasKeyword(unit, "Hedonites of Slaanesh");
    case "any-sybarite":
      return hasKeyword(unit, "Sybarite");
    case "any-daemon":
      return hasKeyword(unit, "Daemon");
    case "any-war-machine":
      return hasKeyword(unit, "War Machine");
    case "any-kruleboyz":
      return hasKeyword(unit, "Kruleboyz");
    case "any-faction-unit":
      return true;
    case "any-skaven":
      return hasKeyword(unit, "Skaven");
    case "any-skryre":
      return hasKeyword(unit, "Skryre");
    case "any-verminus":
      return hasKeyword(unit, "Verminus");
    case "any-moulder":
      return hasKeyword(unit, "Moulder");
    case "any-pestilens":
      return hasKeyword(unit, "Pestilens");
    case "any-eshin":
      return hasKeyword(unit, "Eshin");
    default:
      return false;
  }
}

function roleLimit(option) {
  return ["slaaneshi-beguiler", "dark-egotist", "mob-wrangler", "swamp-beast", "skaven-overclaw"].includes(option)
    ? 1
    : null;
}

function countRole(regiment, role) {
  return (regiment?.units ?? []).filter((unit) =>
    (unit?.details?.canJoinRegimentAs ?? []).includes(role)
  ).length;
}

export function isUnitUniqueInArmy(list, unit, ignoredInstanceId = null) {
  if (unit?.rules?.unique !== true) {
    return false;
  }

  return getAllArmyUnits(list).some(
    (armyUnit) => armyUnit.id === unit.id && armyUnit.instanceId !== ignoredInstanceId
  );
}

export function canUnitJoinRegiment({ list, regiment, unit }) {
  if (!unit || !regiment?.hero || unit.id === regiment.hero.id) {
    return false;
  }

  if (isUnitUniqueInArmy(list, unit)) {
    return false;
  }

  if (!isAllowedByArmyOfRenown(list, unit)) {
    return false;
  }

  if (
    list?.armyOfRenown?.id === "court-of-the-godlings" &&
    [regiment.hero.id, unit.id].includes("dexcessa-the-talon-of-slaanesh") &&
    [regiment.hero.id, unit.id].includes("synessa-the-voice-of-slaanesh")
  ) {
    return false;
  }

  const options = (regiment.hero?.details?.regimentOptions ?? []).map(normalizeOption);
  const isHero = unit.rules?.hero === true || hasKeyword(unit, "Hero");

  if (!hasKeyword(regiment.hero, "Skryre")) {
    const sameCategoryCount = (regiment.units ?? []).filter((armyUnit) =>
      hasKeyword(armyUnit, hasKeyword(unit, "Weapon Team") ? "Weapon Team" : "War Machine")
    ).length;

    if (
      (hasKeyword(unit, "Weapon Team") || hasKeyword(unit, "War Machine")) &&
      sameCategoryCount >= 1
    ) {
      return false;
    }
  }

  if (isHero) {
    const joinRoles = unit.details?.canJoinRegimentAs ?? [];

    return options.some((option) => {
      if (option === unit.id) {
        return true;
      }

      if (!joinRoles.includes(option)) {
        return false;
      }

      const limit = roleLimit(option);
      return limit === null || countRole(regiment, option) < limit;
    });
  }

  return options.some(
    (option) => option === unit.id || optionMatchesNonHero(unit, option)
  );
}

export function getAvailableUnitsForRegiment(list, regiment) {
  return (list?.faction?.units ?? []).filter((unit) =>
    canUnitJoinRegiment({ list, regiment, unit })
  );
}

export function getAvailableRegimentLeaders(list) {
  return (list?.faction?.units ?? []).filter(
    (unit) =>
      unit.rules?.hero === true &&
      !isUnitUniqueInArmy(list, unit) &&
      isAllowedByArmyOfRenown(list, unit)
  );
}
