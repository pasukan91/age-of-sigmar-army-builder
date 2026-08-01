function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function normalizeOption(value) {
  const option = normalize(value).replace(
    /^\d+\s*[-–—]\s*\d+(?:\s+|-)/,
    ""
  );
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
    "any ossiarch bonereapers": "any-ossiarch",
    "any soulblight gravelords": "any-soulblight",
    "any soulblight": "any-soulblight",
    "any helsmiths of hashut": "any-hashut",
    "any blades of khorne": "any-khorne",
    "any blades of khorne daemon": "any-khorne-daemon",
    "any blades of khorne daemon cavalry": "any-khorne-daemon-cavalry",
    "any bloodbound": "any-bloodbound",
    "any bloodbound warmonger": "bloodbound-warmonger",
    "any claws of karanak": "claws-of-karanak",
    "any flesh hounds": "flesh-hounds",
    "any rotbringers": "any-rotbringers",
    "any maggotkin of nurgle": "any-maggotkin-of-nurgle",
    "any slaves to darkness": "any-slaves-to-darkness",
    "any warriors of chaos": "any-warriors-of-chaos",
    "any darkoath": "any-darkoath",
    "any lumineth realm-lords": "any-lumineth",
    "any daughters of khaine": "any-daughters-of-khaine",
    "any aelf": "any-aelf",
    "any non-aelf": "any-non-aelf",
    "any vanari": "any-vanari",
    "any alarith": "any-alarith",
    "any hurakan": "any-hurakan",
    "any vanari auralan wardens": "vanari-auralan-wardens",
    "any vanari bladelords": "vanari-bladelords",
    "lumineth paragon": "lumineth-paragon",
    "any chaos legionnaires": "chaos-legionnaires",
    "any ogroid theridons": "ogroid-theridons",
    "ruinous champion": "ruinous-champion",
    "oathsworn": "oathsworn",
    "eternus": "eternus",
    "singri brand": "singri-brand",
    "the oathsworn kin": "oathsworn-kin",
    "any hashutite commander": "hashutite-commander",
    "any deathrattle": "any-deathrattle",
    "any vyrkos retainer": "any-vyrkos-retainer",
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
    "legion subcommander": "legion-subcommander",
    "deathrattle overseer": "deathrattle-overseer",
    "vyrkos retainer": "vyrkos-retainer",
    "slaughter seeker": "slaughter-seeker",
    "bloodbound warmonger": "bloodbound-warmonger",
    "baleful lord": "baleful-lord",
  };

  return aliases[option] ?? option.replace(/\s+/g, "-");
}

function parseRegimentOption(value) {
  const rawOption = normalize(value);
  const limitMatch = rawOption.match(
    /^(\d+)\s*[-–—]\s*(\d+)(?:\s+|-)(.+)$/
  );

  return {
    key: normalizeOption(value),
    label: limitMatch?.[3]?.trim() || String(value ?? "").trim(),
    min: limitMatch ? Number(limitMatch[1]) : null,
    max: limitMatch ? Number(limitMatch[2]) : null,
  };
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

  if (armyId === "taars-grand-forgehost") {
    return unit.id === "urak-taar" ||
      unit.id === "daemonsmith" ||
      unit.id === "ashen-elder" ||
      (
        hasKeyword(unit, "Helsmiths of Hashut") &&
        (
          (hasKeyword(unit, "Infantry") && !hasKeyword(unit, "Hobgrot")) ||
          hasKeyword(unit, "War Machine")
        )
      );
  }

  if (armyId === "ziggurat-stampede") {
    return unit.id === "daemonsmith-infernal-taurus" ||
      (
        hasKeyword(unit, "Helsmiths of Hashut") &&
        (hasKeyword(unit, "Cavalry") || hasKeyword(unit, "Automaton"))
      );
  }

  if (armyId === "gorechosen-champions") {
    return [
      "mighty-lord-of-khorne",
      "slaughterpriest",
      "bloodsecrator",
      "bloodstoker",
      "realmgore-ritualist",
      "skullgrinder",
      "deathbringer",
    ].includes(unit.id);
  }

  if (armyId === "the-baleful-lords") {
    return hasKeyword(unit, "Monster") &&
      hasKeyword(unit, "Hero") &&
      hasKeyword(unit, "Daemon");
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

  if (armyId === "the-lance-of-ossia") {
    return [
      "arch-kavalos-zandtos",
      "liege-kavalos-on-war-chariot",
      "kavalos-war-chariot",
    ].includes(unit.id) || (
      hasKeyword(unit, "Ossiarch Bonereapers") &&
      hasKeyword(unit, "Cavalry")
    );
  }

  if (armyId === "the-null-myriad") {
    if (unit.id === "arkhan") {
      return true;
    }

    if (
      unit.rules?.hero === true &&
      unit.rules?.unique !== true &&
      Number(unit.rules?.wizard ?? 0) > 0
    ) {
      return true;
    }

    return hasKeyword(unit, "Ossiarch Bonereapers") &&
      hasKeyword(unit, "Infantry");
  }

  if (armyId === "knights-of-the-crimson-keep") {
    return [
      "prince-vhordrai",
      "vampire-lord-on-nightmare-steed",
      "blood-knights",
      "revenant-draconith",
    ].includes(unit.id);
  }

  if (armyId === "barrow-legion") {
    return hasKeyword(unit, "Deathrattle");
  }

  if (armyId === "the-iron-march") {
    if ([
      "cannonade-cogfort",
      "immolator-cogfort",
      "conqueror-cogfort",
      "linebreaker-cogfort",
    ].includes(unit.id)) {
      return true;
    }

    const escortSlots = getAllArmyUnits(list).filter((armyUnit) =>
      ["conqueror-cogfort", "linebreaker-cogfort"].includes(armyUnit.id)
    ).length;

    if (unit.id === "mallus-forgepriest") {
      return countUnitInArmy(list, unit.id) < escortSlots;
    }

    if (unit.id === "freeguild-gallants") {
      return countUnitInArmy(list, unit.id) < escortSlots;
    }

    return false;
  }

  if (armyId === "allies-of-the-free-cities") {
    if (hasKeyword(unit, "Sigmarite")) {
      return unit.rules?.unique !== true;
    }

    if (
      hasKeyword(unit, "Allies of the Free Cities") &&
      (hasKeyword(unit, "Aelf") || hasKeyword(unit, "Duardin"))
    ) {
      const armyUnits = getAllArmyUnits(list);
      const sigmariteCount = armyUnits.filter((armyUnit) =>
        hasKeyword(armyUnit, "Sigmarite")
      ).length;
      const alliedCount = armyUnits.filter((armyUnit) =>
        hasKeyword(armyUnit, "Allies of the Free Cities") &&
        (hasKeyword(armyUnit, "Aelf") || hasKeyword(armyUnit, "Duardin"))
      ).length;

      return alliedCount < sigmariteCount;
    }

    return false;
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
      return hasKeyword(unit, "Gnoblar") || hasKeyword(unit, "Gnoblars");
    case "any-gorger-mawpack":
      return unit.id === "gorger-mawpack";
    case "any-sigmarite":
      return hasKeyword(unit, "Sigmarite");
    case "any-sigmarite-infantry":
      return hasKeyword(unit, "Sigmarite") && hasKeyword(unit, "Infantry");
    case "any-allies-of-the-free-cities":
      return hasKeyword(unit, "Allies of the Free Cities") ||
        hasKeyword(unit, "Aelf") ||
        hasKeyword(unit, "Duardin");
    case "any-ossiarch":
      return hasKeyword(unit, "Ossiarch Bonereapers");
    case "any-soulblight":
      return hasKeyword(unit, "Soulblight Gravelords");
    case "any-hashut":
      return hasKeyword(unit, "Helsmiths of Hashut");
    case "any-khorne":
      return hasKeyword(unit, "Blades of Khorne");
    case "any-khorne-daemon":
      return hasKeyword(unit, "Blades of Khorne") && hasKeyword(unit, "Daemon");
    case "any-khorne-daemon-cavalry":
      return hasKeyword(unit, "Blades of Khorne") && hasKeyword(unit, "Daemon") && hasKeyword(unit, "Cavalry");
    case "any-bloodbound":
      return hasKeyword(unit, "Bloodbound");
    case "any-rotbringers":
      return hasKeyword(unit, "Rotbringers");
    case "any-maggotkin-of-nurgle":
      return hasKeyword(unit, "Maggotkin of Nurgle");
    case "any-slaves-to-darkness":
      return hasKeyword(unit, "Slaves to Darkness");
    case "any-warriors-of-chaos":
      return hasKeyword(unit, "Warriors of Chaos");
    case "any-darkoath":
      return hasKeyword(unit, "Darkoath");
    case "any-lumineth":
      return hasKeyword(unit, "Lumineth Realm-lords");
    case "any-daughters-of-khaine":
      return hasKeyword(unit, "Daughters of Khaine");
    case "any-aelf":
      return hasKeyword(unit, "Aelf");
    case "any-non-aelf":
      return !hasKeyword(unit, "Aelf");
    case "any-vanari":
      return hasKeyword(unit, "Vanari");
    case "any-alarith":
      return hasKeyword(unit, "Alarith");
    case "any-hurakan":
      return hasKeyword(unit, "Hurakan");
    case "any-deathrattle":
      return hasKeyword(unit, "Deathrattle");
    case "sigmarite-war-machine":
      return hasKeyword(unit, "Sigmarite") && hasKeyword(unit, "War Machine");
    default:
      return false;
  }
}

function isHeroUnit(unit) {
  return unit?.rules?.hero === true || hasKeyword(unit, "Hero");
}

function unitMatchesRegimentOption(unit, option) {
  if (isHeroUnit(unit)) {
    const joinRoles = (unit?.details?.canJoinRegimentAs ?? []).map(
      normalizeOption
    );

    return option.key === normalizeOption(unit?.id) ||
      joinRoles.includes(option.key);
  }

  return option.key === normalizeOption(unit?.id) ||
    optionMatchesNonHero(unit, option.key);
}

function countUnitsForOption(regiment, option) {
  return (regiment?.units ?? []).filter((unit) =>
    unitMatchesRegimentOption(unit, option)
  ).length;
}

function optionHasCapacity(regiment, option) {
  return option.max === null ||
    countUnitsForOption(regiment, option) < option.max;
}

const FREE_COMMAND_CORPS_UNITS = new Set([
  "freeguild-command-auxiliaries",
  "freeguild-command-corps-whisperblade",
]);

const DEPENDENT_UNIT_REQUIREMENTS = {
  "tolls-companions": {
    leaderIds: ["callis-and-toll"],
    max: 1,
  },
  "singri-brand": {
    leaderIds: ["gunnar-brand"],
    max: 1,
  },
  "oathsworn-kin": {
    leaderIds: ["gunnar-brand"],
    max: 1,
  },
  "freeguild-command-auxiliaries": {
    requiredUnitIds: ["freeguild-command-adjutants"],
    max: 1,
  },
  "freeguild-command-corps-whisperblade": {
    requiredUnitIds: ["freeguild-command-adjutants"],
    max: 1,
  },
};

function satisfiesDependentUnitRequirement(regiment, unit) {
  const requirement = DEPENDENT_UNIT_REQUIREMENTS[unit?.id];

  if (!requirement) {
    return true;
  }

  if (
    requirement.leaderIds &&
    !requirement.leaderIds.includes(regiment?.hero?.id)
  ) {
    return false;
  }

  if (
    requirement.requiredUnitIds &&
    !requirement.requiredUnitIds.every((requiredId) =>
      (regiment?.units ?? []).some((regimentUnit) =>
        regimentUnit.id === requiredId
      )
    )
  ) {
    return false;
  }

  const count = (regiment?.units ?? []).filter(
    (regimentUnit) => regimentUnit.id === unit.id
  ).length;

  return requirement.max == null || count < requirement.max;
}

function getDependentUnitCompositionErrors(regiment, regimentIndex) {
  return Object.entries(DEPENDENT_UNIT_REQUIREMENTS).flatMap(
    ([unitId, requirement]) => {
      const units = (regiment?.units ?? []).filter((unit) => unit.id === unitId);

      if (units.length === 0) {
        return [];
      }

      const errors = [];
      const label = units[0].name ?? unitId;

      if (
        requirement.leaderIds &&
        !requirement.leaderIds.includes(regiment?.hero?.id)
      ) {
        errors.push({
          regimentId: regiment.id,
          regimentIndex,
          role: unitId,
          count: units.length,
          message: `${label} no puede incluirse en el regimiento de este lider.`,
        });
      }

      if (
        requirement.requiredUnitIds &&
        !requirement.requiredUnitIds.every((requiredId) =>
          (regiment?.units ?? []).some((unit) => unit.id === requiredId)
        )
      ) {
        errors.push({
          regimentId: regiment.id,
          regimentIndex,
          role: unitId,
          count: units.length,
          message: `${label} requiere su unidad principal en el mismo regimiento.`,
        });
      }

      if (requirement.max != null && units.length > requirement.max) {
        errors.push({
          regimentId: regiment.id,
          regimentIndex,
          role: unitId,
          count: units.length,
          max: requirement.max,
          message: `${label} solo puede incluirse ${requirement.max} vez por regimiento.`,
        });
      }

      return errors;
    }
  );
}

export function isMatchedPlayUnit(unit) {
  return !normalize(unit?.source).includes("legends");
}

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

  if (!isMatchedPlayUnit(unit)) {
    return false;
  }

  if (!satisfiesDependentUnitRequirement(regiment, unit)) {
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

  const options = (regiment.hero?.details?.regimentOptions ?? []).map(
    parseRegimentOption
  );
  const isHero = isHeroUnit(unit);

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
    return options.some(
      (option) =>
        unitMatchesRegimentOption(unit, option) &&
        optionHasCapacity(regiment, option)
    );
  }

  return options.some(
    (option) =>
      unitMatchesRegimentOption(unit, option) &&
      optionHasCapacity(regiment, option)
  );
}

export function getRegimentCompositionErrors(list) {
  return (list?.regiments ?? []).flatMap((regiment, regimentIndex) => {
    const options = (regiment?.hero?.details?.regimentOptions ?? [])
      .map(parseRegimentOption)
      .filter((option) => option.max !== null);

    const optionErrors = options.flatMap((option) => {
      const count = countUnitsForOption(regiment, option);

      if (count >= option.min && count <= option.max) {
        return [];
      }

      if (count < option.min) {
        return [{
          regimentId: regiment.id,
          regimentIndex,
          role: option.key,
          label: option.label,
          count,
          min: option.min,
          max: option.max,
          message:
            `El regimiento de ${regiment.hero?.name ?? "este líder"} ` +
            `debe incluir al menos ${option.min} unidad de ${option.label}.`,
        }];
      }

      return [{
        regimentId: regiment.id,
        regimentIndex,
        role: option.key,
        label: option.label,
        count,
        max: option.max,
        message:
          `El regimiento de ${regiment.hero?.name ?? "este líder"} ` +
          `incluye ${count} unidades de ${option.label}; el máximo es ${option.max}.`,
      }];
    });

    return [
      ...optionErrors,
      ...getDependentUnitCompositionErrors(regiment, regimentIndex),
    ];
  });
}

export function hasIllegalRegimentComposition(list) {
  return getRegimentCompositionErrors(list).length > 0;
}

export function getAvailableUnitsForRegiment(list, regiment) {
  const armyUnits = list?.armyOfRenown?.rules?.units;
  const units = Array.isArray(armyUnits) && armyUnits.length > 0
    ? armyUnits
    : list?.faction?.units ?? [];

  return units.filter((unit) =>
    isMatchedPlayUnit(unit) &&
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
      unit.rules?.canLeadRegiment !== false &&
      isMatchedPlayUnit(unit) &&
      !isUnitUniqueInArmy(list, unit) &&
      isAllowedByArmyOfRenown(list, unit)
  );
}
