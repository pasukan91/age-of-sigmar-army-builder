const ARRAY_FIELDS = [
  "battleTraits",
  "battleFormations",
  "heroicTraits",
  "monsterTraits",
  "artefacts",
  "aqshyArtefacts",
  "spellLores",
  "prayerLores",
  "manifestations",
  "manifestationLores",
  "terrain",
  "units",
  "armiesOfRenown",
  "regimentsOfRenown",
  "allConsumingObsessions",
  "moulderMutations",
  "specialKnickKnacks",
  "decorationsForValour",
  "ironweldInnovations",
  "visionsOfFate",
];

export function normalizeFaction(faction) {
  const normalized = Object.fromEntries(
    ARRAY_FIELDS.map((field) => [field, asArray(faction?.[field])])
  );

  normalized.spellLores = normalized.spellLores.map(normalizeSpellLore);
  normalized.prayerLores = normalized.prayerLores.map(normalizePrayerLore);
  normalized.manifestations = normalized.manifestations.map(normalizeManifestation);
  normalized.manifestationLores = normalizeManifestationLores({
    faction,
    lores: normalized.manifestationLores,
    manifestations: normalized.manifestations,
  });
  normalized.armiesOfRenown = normalized.armiesOfRenown.map((army) => ({
    ...army,
    rules: army.rules
      ? normalizeArmyRules(army.rules, normalized.manifestations)
      : undefined,
  }));

  return {
    ...faction,
    ...normalized,
  };
}

function normalizeArmyRules(rules, baseManifestations) {
  const normalized = normalizeFaction({
    id: "army-of-renown",
    ...rules,
    manifestations: rules.manifestations ?? baseManifestations,
    armiesOfRenown: [],
  });

  delete normalized.id;
  return normalized;
}

function normalizeSpellLore(lore) {
  return {
    ...lore,
    spells: asArray(lore?.spells).map((spell) => ({
      type: "Spell",
      phase: "Your Hero Phase",
      ...spell,
      keywords: unique(["Spell", ...asArray(spell?.keywords)]),
    })),
  };
}

function normalizePrayerLore(lore) {
  return {
    ...lore,
    prayers: asArray(lore?.prayers).map((prayer) => ({
      type: "Prayer",
      phase: "Your Hero Phase",
      ...prayer,
      keywords: unique(["Prayer", ...asArray(prayer?.keywords)]),
    })),
  };
}

function normalizeManifestation(manifestation) {
  if (typeof manifestation === "string") {
    return createPendingManifestation(manifestation);
  }

  const castingValue =
    manifestation.castingValue ??
    manifestation.summonSpell?.castingValue ??
    null;

  return {
    weapons: [],
    abilities: [],
    ...manifestation,
    castingValue,
    profile: {
      move: "-",
      health: null,
      control: "-",
      save: null,
      ...manifestation.profile,
    },
    summonSpell: manifestation.summonSpell ?? {
      name: `Summon ${manifestation.name}`,
      type: "Spell",
      phase: manifestation.phase ?? "Your Hero Phase",
      keywords: ["Spell", "Summon"],
      description: manifestation.description ?? "",
    },
    keywords: unique(["Manifestation", ...asArray(manifestation.keywords)]),
  };
}

function normalizeManifestationLores({ faction, lores, manifestations }) {
  const sourceLores = lores.length > 0
    ? lores
    : manifestations.length > 0
      ? [{
          id: `${faction.id}-manifestation-lore`,
          name: faction.manifestationLoreName ?? "Manifestation Lore",
          description: `Incluye ${formatNames(manifestations)}.`,
          manifestations,
        }]
      : [];

  return sourceLores.map((lore) => {
    const listedManifestations = asArray(lore.manifestations);
    const resolved = listedManifestations.length > 0
      ? listedManifestations.map((item) =>
          resolveManifestation(item, manifestations)
        )
      : resolveLoreByName(lore, manifestations);

    return {
      ...lore,
      manifestations: resolved.length > 0
        ? resolved
        : [createPendingManifestation(slugify(lore.name), lore.name)],
    };
  });
}

function resolveManifestation(item, manifestations) {
  if (typeof item !== "string") {
    return normalizeManifestation(item);
  }

  return manifestations.find((manifestation) => manifestation.id === item) ??
    createPendingManifestation(item);
}

function resolveLoreByName(lore, manifestations) {
  const loreId = slugify(lore.name);
  const match = manifestations.find((manifestation) =>
    manifestation.id === loreId ||
    slugify(manifestation.name) === loreId
  );

  return match ? [match] : [];
}

function createPendingManifestation(id, explicitName) {
  return {
    id,
    name: explicitName ?? titleFromId(id),
    dataPending: true,
    weapons: [],
    abilities: [],
    keywords: ["Manifestation"],
    profile: {},
  };
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function formatNames(items) {
  return items.map((item) => item.name).join(", ");
}

function slugify(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function titleFromId(id = "") {
  return String(id)
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getFactionValidationErrors(faction) {
  const errors = [];

  if (!faction?.id || !faction?.name || !faction?.alliance) {
    errors.push("faltan id, name o alliance");
  }

  ARRAY_FIELDS.forEach((field) => {
    if (!Array.isArray(faction?.[field])) {
      errors.push(`${field} no es un array`);
    }
  });

  faction?.spellLores?.forEach((lore) => {
    if (!lore.id || !lore.name || !Array.isArray(lore.spells)) {
      errors.push(`saber de hechizos inválido: ${lore?.id ?? "sin id"}`);
    }
  });

  faction?.manifestationLores?.forEach((lore) => {
    if (!lore.id || !lore.name || !Array.isArray(lore.manifestations)) {
      errors.push(`saber de manifestaciones inválido: ${lore?.id ?? "sin id"}`);
    }
  });

  return errors;
}
