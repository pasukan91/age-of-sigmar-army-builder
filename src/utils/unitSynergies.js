const TARGET_TERMS = [
  "Hedonites of Slaanesh",
  "Skaven",
  "Infantry",
  "Cavalry",
  "Hero",
  "Monster",
  "Daemon",
  "Sybarite",
  "Paragon",
  "Verminus",
  "Skryre",
  "Moulder",
  "Pestilens",
  "Eshin",
  "Masterclan",
  "War Machine",
  "Weapon Team",
  "Wizard",
  "Priest",
  "Stormvermin",
  "Gnawhorde",
  "Mutated Menagerie",
];

const UNIT_ENHANCEMENTS = [
  ["artefact", "Artefacto"],
  ["heroicTrait", "Rasgo heroico"],
  ["monstrousTrait", "Rasgo monstruoso"],
  ["allConsumingObsession", "Obsesión devoradora"],
  ["moulderMutation", "Mutación Moulder"],
];

function normalize(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9+ -]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function includesTerm(text, term) {
  const normalizedTerm = normalize(term);

  return new RegExp(
    `(?:^|\\s)${normalizedTerm.replace(/ /g, "\\s+")}(?:$|\\s)`
  ).test(` ${text} `);
}

function getTargetTags(unit) {
  return new Set([
    normalize(unit?.name),
    normalize(unit?.id).replace(/-/g, " "),
    ...(unit?.keywords ?? []).flatMap((keyword) => {
      const normalizedKeyword = normalize(keyword);

      return [
        normalizedKeyword,
        normalizedKeyword.replace(/\s*\([^)]*\)\s*/g, "").trim(),
      ];
    }),
  ].filter(Boolean));
}

function targetHasTag(targetTags, term) {
  const normalizedTerm = normalize(term);

  return [...targetTags].some(
    (tag) =>
      tag === normalizedTerm ||
      includesTerm(tag, normalizedTerm)
  );
}

function matchesExplicitRule(synergy, unit) {
  const targetKeywords = new Set(
    (unit?.keywords ?? []).map(normalize)
  );
  const unitId = normalize(unit?.id);
  const requiredIds = (synergy?.unitIds ?? []).map(normalize);
  const rawRequiredKeywords = synergy?.includeKeywords ?? [];
  const requiredKeywords = rawRequiredKeywords.map(normalize);
  const excludedKeywords = (synergy?.excludeKeywords ?? []).map(normalize);

  if (requiredIds.length > 0 && !requiredIds.includes(unitId)) {
    return null;
  }

  if (
    requiredKeywords.some(
      (keyword) => !targetKeywords.has(keyword)
    ) ||
    excludedKeywords.some(
      (keyword) => targetKeywords.has(keyword)
    )
  ) {
    return null;
  }

  const matchedOn = [
    ...rawRequiredKeywords,
    ...(requiredIds.length > 0 ? [unit?.name] : []),
  ].filter(Boolean);

  return {
    matchedOn:
      matchedOn.length > 0
        ? matchedOn
        : ["Cualquier unidad amiga"],
  };
}

function inferTacticalConditions(ability) {
  const description = String(ability?.description ?? "");
  const normalizedDescription = normalize(description);
  const conditions = [];
  const whollyWithin = description.match(/wholly within\s+(\d+)"/i);
  const within = description.match(/within\s+(\d+)"/i);

  if (whollyWithin) {
    conditions.push(`Completamente a ${whollyWithin[1]}″`);
  } else if (within) {
    conditions.push(`A ${within[1]}″`);
  }

  if (normalizedDescription.includes("visible")) {
    conditions.push("Debe estar visible");
  }

  if (normalizedDescription.includes("if the target is a paragon")) {
    conditions.push("Ser Paragon modifica cómo se aplica el efecto");
  }

  if (normalizedDescription.includes("charged this turn")) {
    conditions.push("Debe haber cargado este turno");
  }

  return conditions;
}

function inferAbilityMatch(ability, unit) {
  if (ability?.synergy) {
    return matchesExplicitRule(ability.synergy, unit);
  }

  const text = normalize(ability?.description);

  if (!text || (!text.includes("friendly") && !text.includes("nearby"))) {
    return null;
  }

  const targetTags = getTargetTags(unit);
  const targetName = normalize(unit?.name);

  if (targetName && includesTerm(text, targetName)) {
    return { matchedOn: [unit.name] };
  }

  const clauses = [];
  const clausePattern = /(?:friendly|nearby)\s+(.{0,120}?)(?:\s+units?\b|\s+target\b)/g;
  let match = clausePattern.exec(text);

  while (match) {
    clauses.push(match[1]);
    match = clausePattern.exec(text);
  }

  for (const clause of clauses) {
    const excludedTerms = TARGET_TERMS.filter((term) =>
      includesTerm(clause, `non ${term}`)
    );

    if (
      excludedTerms.some((term) => targetHasTag(targetTags, term))
    ) {
      continue;
    }

    const requiredTerms = TARGET_TERMS.filter(
      (term) =>
        includesTerm(clause, term) &&
        !includesTerm(clause, `non ${term}`)
    );

    if (
      requiredTerms.every((term) => targetHasTag(targetTags, term))
    ) {
      return {
        matchedOn:
          requiredTerms.length > 0
            ? requiredTerms
            : ["Cualquier unidad amiga"],
      };
    }
  }

  return null;
}

function getArmyUnits(list) {
  return [
    ...(list?.regiments ?? []).flatMap((regiment) => [
      regiment?.hero,
      ...(regiment?.units ?? []),
    ]),
    ...(list?.auxiliaries ?? []),
  ].filter(Boolean);
}

function getUnitAbilities(unit) {
  return [
    ...(unit?.abilities ?? []).map((ability) => ({
      ability,
      sourceType: "Unidad",
    })),
    ...UNIT_ENHANCEMENTS.flatMap(([property, sourceType]) => {
      const enhancement = unit?.[property];

      return enhancement?.description
        ? [{ ability: enhancement, sourceType }]
        : [];
    }),
  ];
}

function getArmyRuleSources(list) {
  const formation = list?.battleFormation;
  const armyOfRenown = list?.armyOfRenown;
  const spellLore = list?.spellLore;
  const prayerLore = list?.prayerLore;

  return [
    ...(formation
      ? [{
          sourceName: formation.name,
          sourceType: "Formación de batalla",
          abilities: formation.abilities ?? [formation.ability ?? formation],
        }]
      : []),
    ...(armyOfRenown?.abilities?.length
      ? [{
          sourceName: armyOfRenown.name,
          sourceType: "Ejército de renombre",
          abilities: armyOfRenown.abilities,
        }]
      : []),
    ...(spellLore?.spells?.length
      ? [{
          sourceName: spellLore.name,
          sourceType: "Saber de hechizos",
          abilities: spellLore.spells,
        }]
      : []),
    ...(prayerLore?.prayers?.length
      ? [{
          sourceName: prayerLore.name,
          sourceType: "Saber de plegarias",
          abilities: prayerLore.prayers,
        }]
      : []),
  ];
}

export function getPotentialSynergies(list, targetUnit) {
  if (!list || !targetUnit) {
    return [];
  }

  const synergies = [];

  getArmyUnits(list).forEach((sourceUnit) => {
    const isSameInstance =
      sourceUnit === targetUnit ||
      (
        sourceUnit.instanceId &&
        targetUnit.instanceId &&
        sourceUnit.instanceId === targetUnit.instanceId
      );

    if (isSameInstance) {
      return;
    }

    getUnitAbilities(sourceUnit).forEach(({ ability, sourceType }) => {
      const match = inferAbilityMatch(ability, targetUnit);

      if (match) {
        synergies.push({
          ability,
          sourceName: sourceUnit.name,
          sourceType,
          matchedOn: match.matchedOn,
          conditions:
            ability.synergy?.conditions ??
            inferTacticalConditions(ability),
        });
      }
    });
  });

  getArmyRuleSources(list).forEach((source) => {
    (source.abilities ?? []).filter(Boolean).forEach((ability) => {
      const match = inferAbilityMatch(ability, targetUnit);

      if (match) {
        synergies.push({
          ability,
          sourceName: source.sourceName,
          sourceType: source.sourceType,
          matchedOn: match.matchedOn,
          conditions:
            ability.synergy?.conditions ??
            inferTacticalConditions(ability),
        });
      }
    });
  });

  const uniqueSynergies = new Map();

  synergies.forEach((synergy) => {
    const key = [
      synergy.sourceName,
      synergy.sourceType,
      synergy.ability?.name,
    ].map(normalize).join("|");

    if (!uniqueSynergies.has(key)) {
      uniqueSynergies.set(key, synergy);
    }
  });

  return [...uniqueSynergies.values()].sort((left, right) =>
    `${left.sourceType} ${left.sourceName} ${left.ability?.name}`.localeCompare(
      `${right.sourceType} ${right.sourceName} ${right.ability?.name}`,
      "es"
    )
  );
}
