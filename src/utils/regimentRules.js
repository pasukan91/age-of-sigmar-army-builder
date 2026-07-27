function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function normalizeOption(value) {
  const option = normalize(value).replace(/^0-1(?:\s+|-)/, "");
  const aliases = {
    "any faction unit": "any-faction-unit",
    "any kruleboyz": "any-kruleboyz",
    "any ironjawz": "any-ironjawz",
    "any infantry": "any-infantry",
    "any monster": "any-monster",
    "any war machine": "any-war-machine",
    "monster": "any-monster",
    "war machine": "any-war-machine",
    "headstompa": "headstompa",
    "tusk wrangler": "tusk-wrangler",
    "any hedonites of slaanesh": "any-hedonites",
    "any sybarite": "any-sybarite",
    "any daemon": "any-daemon",
    "any arcanite": "any-arcanite",
    "any disciples of tzeentch": "any-disciples-of-tzeentch",
    "any skaven": "any-skaven",
    "any skryre": "any-skryre",
    "any verminus": "any-verminus",
    "any moulder": "any-moulder",
    "any pestilens": "any-pestilens",
    "any eshin": "any-eshin",
    "any ogor mawtribes": "any-ogors",
    "any sylvaneth": "any-sylvaneth",
    "any gloomspite gitz": "any-gloomspite",
    "any moonclan": "any-moonclan",
    "any moonclan infantry": "any-moonclan-infantry",
    "any troggoth": "any-troggoth",
    "any gitmob": "any-gitmob",
    "any spiderfang": "any-spiderfang",
    "any non-monster sylvaneth": "any-non-monster-sylvaneth",
    "any gutbusters": "any-gutbusters",
    "any beastclaw": "any-beastclaw",
    "any beastclaw raiders": "any-beastclaw",
    "any mawseekers": "any-mawseekers",
    "any gnoblars": "any-gnoblars",
    "any gorger mawpack": "any-gorger-mawpack",
    "any sigmarite": "any-sigmarite",
    "any sigmarite infantry": "any-sigmarite-infantry",
    "any allies of the free cities": "any-allies-of-the-free-cities",
    "sigmarite war machine": "sigmarite-war-machine",
    "freeguild veteran": "freeguild-veteran",
    "ironweld great cannon": "ironweld-great-cannon",
    "toll's companions": "tolls-companions",
    "skaven overclaw": "skaven-overclaw",
    "slaaneshi beguiler": "slaaneshi-beguiler",
    "dark egotist": "dark-egotist",
    "mob wrangler": "mob-wrangler",
    "swamp beast": "swamp-beast",
    "bloodpelt hunter": "bloodpelt-hunter",
    "gnoblar scraplauncher": "gnoblar-scraplauncher",
    "voice of the everwinter": "voice-of-the-everwinter",
    "forest sentinel": "forest-sentinel",
    "moonclan agitator": "moonclan-agitator",
    "top dog": "top-dog",
    "dankhold troggboss": "dankhold-troggboss",
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

  if (armyId === "change-cult-uprising") {
    return hasKeyword(unit, "Arcanite") && !hasKeyword(unit, "Warflock");
  }

  if (armyId === "the-oracles-of-fate") {
    return unit.id === "kairos-fateweaver" || hasKeyword(unit, "Daemon");
  }

  if (armyId === "big-waaagh") {
    return hasKeyword(unit, "Ironjawz") || hasKeyword(unit, "Kruleboyz");
  }

  if (armyId === "zoggroks-ironmongerz") {
    return unit.id === "zoggrok-anvilsmasha" ||
      (hasKeyword(unit, "Ironjawz") && hasKeyword(unit, "Infantry"));
  }

  if (armyId === "murkvast-menagerie") {
    const armyUnits = getAllArmyUnits(list);
    const monsterCount = armyUnits.filter((armyUnit) =>
      hasKeyword(armyUnit, "Kruleboyz") &&
      hasKeyword(armyUnit, "Hero") &&
      hasKeyword(armyUnit, "Monster")
    ).length;

    if ([
      "swampboss-skumdrekk",
      "snatchaboss-on-sludgeraker-beast",
      "killaboss-on-corpse-rippa-vulcha",
      "breaka-boss-on-mirebrute-troggoth",
      "marshcrawla-sloggoth",
    ].includes(unit.id)) {
      return true;
    }

    if (unit.id === "swampcalla-shaman-with-pot-grot") {
      return countUnitInArmy(list, unit.id) < monsterCount;
    }

    const isEligibleInfantry = hasKeyword(unit, "Kruleboyz") &&
      hasKeyword(unit, "Infantry") && unit.rules?.hero !== true;

    if (!isEligibleInfantry) {
      return false;
    }

    const infantryCount = armyUnits.filter((armyUnit) =>
      hasKeyword(armyUnit, "Kruleboyz") &&
      hasKeyword(armyUnit, "Infantry") &&
      armyUnit.rules?.hero !== true
    ).length;

    return infantryCount < monsterCount;
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
    case "any-arcanite":
      return hasKeyword(unit, "Arcanite");
    case "any-disciples-of-tzeentch":
      return hasKeyword(unit, "Disciples of Tzeentch");
    case "any-war-machine":
      return hasKeyword(unit, "War Machine");
    case "any-kruleboyz":
      return hasKeyword(unit, "Kruleboyz");
    case "any-ironjawz":
      return hasKeyword(unit, "Ironjawz");
    case "any-infantry":
      return hasKeyword(unit, "Infantry");
    case "any-monster":
      return hasKeyword(unit, "Monster");
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
    case "any-ogors":
      return hasKeyword(unit, "Ogor Mawtribes");
    case "any-sylvaneth":
      return hasKeyword(unit, "Sylvaneth");
    case "any-non-monster-sylvaneth":
      return hasKeyword(unit, "Sylvaneth") && !hasKeyword(unit, "Monster");
    case "any-gloomspite":
      return hasKeyword(unit, "Gloomspite Gitz");
    case "any-moonclan":
      return hasKeyword(unit, "Moonclan");
    case "any-moonclan-infantry":
      return hasKeyword(unit, "Moonclan") && hasKeyword(unit, "Infantry");
    case "any-troggoth":
      return hasKeyword(unit, "Troggoth");
    case "any-gitmob":
      return hasKeyword(unit, "Gitmob");
    case "any-spiderfang":
      return hasKeyword(unit, "Spiderfang");
    case "any-gutbusters":
      return hasKeyword(unit, "Gutbusters");
    case "any-beastclaw":
      return hasKeyword(unit, "Beastclaw");
    case "any-mawseekers":
      return hasKeyword(unit, "Mawseekers");
    case "any-gnoblars":
      return hasKeyword(unit, "Gnoblars");
    case "any-gorger-mawpack":
      return unit.id === "gorger-mawpack";
    case "any-sigmarite":
      return hasKeyword(unit, "Sigmarite");
    case "any-sigmarite-infantry":
      return hasKeyword(unit, "Sigmarite") && hasKeyword(unit, "Infantry");
    case "any-allies-of-the-free-cities":
      return hasKeyword(unit, "Allies of the Free Cities");
    case "sigmarite-war-machine":
      return hasKeyword(unit, "Sigmarite") && hasKeyword(unit, "War Machine");
    default:
      return false;
  }
}

function roleLimit(option) {
  return ["slaaneshi-beguiler", "dark-egotist", "mob-wrangler", "swamp-beast", "skaven-overclaw", "headstompa", "tusk-wrangler", "voice-of-the-everwinter", "forest-sentinel", "moonclan-agitator", "top-dog", "dankhold-troggboss", "freeguild-veteran", "tzeentchian-deceiver", "arcanite-cabalist"].includes(option)
    ? 1
    : null;
}

function countRole(regiment, role) {
  return (regiment?.units ?? []).filter((unit) =>
    (unit?.details?.canJoinRegimentAs ?? []).includes(role)
  ).length;
}

const FREE_COMMAND_CORPS_UNITS = new Set([
  "freeguild-command-auxiliaries",
  "freeguild-command-corps-whisperblade",
]);

export function countsTowardRegimentLimit(unit) {
  return !FREE_COMMAND_CORPS_UNITS.has(unit?.id);
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
    FREE_COMMAND_CORPS_UNITS.has(unit.id) &&
    !(regiment.units ?? []).some(
      (regimentUnit) => regimentUnit.id === "freeguild-command-adjutants"
    )
  ) {
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
  const armyUnits = list?.armyOfRenown?.rules?.units;
  const units = Array.isArray(armyUnits) && armyUnits.length > 0
    ? armyUnits
    : list?.faction?.units ?? [];

  return units.filter((unit) =>
    canUnitJoinRegiment({ list, regiment, unit })
  );
}

export function getAvailableRegimentLeaders(list) {
  const armyUnits = list?.armyOfRenown?.rules?.units;
  const units = Array.isArray(armyUnits) && armyUnits.length > 0
    ? armyUnits
    : list?.faction?.units ?? [];

  return units.filter(
    (unit) =>
      unit.rules?.hero === true &&
      !isUnitUniqueInArmy(list, unit) &&
      isAllowedByArmyOfRenown(list, unit)
  );
}
