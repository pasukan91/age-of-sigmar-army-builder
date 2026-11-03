export const october2026BalanceMetadata = {
  source: "https://www.warhammer-community.com/en-gb/downloads/warhammer-age-of-sigmar/",
  publicationDate: "2026-10-28",
  documents: ["Battle Profiles", "Rules Updates", "Armies of Renown"],
};

const PUBLICATION_DATE = october2026BalanceMetadata.publicationDate;

export function applyOctober2026Balance(faction) {
  if (!faction) return faction;

  let result = mapObjects(faction, (item) => patchOfficialItem(faction.id, item));
  if (faction.id === "behemat") result = patchSonsArmiesOfRenown(result);
  if (faction.id === "fyreslayers") result = patchLofnirDrothkeepers(result);

  return {
    ...result,
    balancePublicationDate: PUBLICATION_DATE,
  };
}

function patchOfficialItem(factionId, item) {
  if (factionId === "skaven" && item.id === "verminlord-corruptor") {
    return { ...item, points: 260, balanceSource: PUBLICATION_DATE };
  }

  if (factionId === "nighthaunt" && item.id === "pyregheists") {
    return patchChampionKeyword(item, "CHAMPION (1/8)");
  }

  if (factionId === "sylvaneth" && item.id === "the-twistweald") {
    return patchChampionKeyword(item, "CHAMPION (1/8)");
  }

  if (factionId === "lumineth" && item.id === "ydrilan-riverblades") {
    return patchChampionKeyword(item, "CHAMPION (1/10)");
  }

  if (factionId === "ogors" && item.id === "eat-em-alive") {
    const description = String(item.description ?? "").replace(
      /excluding (\*\*\^\^)?Faction Terrain(\^\^\*\*)?(?! and Manifestations)/i,
      "excluding **Faction Terrain** and **Manifestations**",
    );
    return description === item.description
      ? item
      : { ...item, description, balanceSource: PUBLICATION_DATE };
  }

  if (factionId === "fyreslayers" && item.id === "rhythmic-hammering") {
    const phase = String(item.phase ?? "");
    return phase.startsWith("Reaction:")
      ? item
      : { ...item, phase: `Reaction: ${phase}`, balanceSource: PUBLICATION_DATE };
  }

  if (factionId === "fyreslayers" && item.id === "scourge-of-aqshy-auric-runeson-on-magmadroth") {
    return {
      ...item,
      keywords: replaceKeywords(item.keywords, {
        FYRESLAYERS: "KHAZALITE HOLDS",
        MAGMADROTH: "GRIMMDRON",
      }),
      balanceSource: PUBLICATION_DATE,
    };
  }

  if (factionId === "fyreslayers" && item.id === "scourge-of-aqshy-vulkyn-flameseekers") {
    return {
      ...item,
      keywords: replaceKeywords(item.keywords, { FYRESLAYERS: "KHAZALITE HOLDS" }),
      balanceSource: PUBLICATION_DATE,
    };
  }

  if (factionId === "fyreslayers" && [
    "blazing-impetus",
    "fury-of-vulcatrix",
    "ichor-of-the-ur-salamander",
  ].includes(item.id)) {
    return patchRuleText(item, [
      [/Fyreslayers/gi, "Grimmdron"],
      [/Magmadroths?/gi, "Monsters"],
    ]);
  }

  if (factionId === "fyreslayers" && [
    "aureate-hide",
    "intense-fyrestream",
    "thickened-scales",
  ].includes(item.id)) {
    return {
      ...patchRuleText(item, item.id === "aureate-hide"
        ? [[/Fyreslayers/gi, "Khazalite Holds"]]
        : []),
      restrictionText: "Marks of Vulcatrix are unique enhancements that can be given to **GRIMMDRON MONSTERS**.",
      balanceSource: PUBLICATION_DATE,
    };
  }

  return item;
}

function replaceKeywords(keywords = [], replacements) {
  return keywords.map((keyword) => replacements[String(keyword).toUpperCase()] ?? keyword);
}

function patchRuleText(item, replacements) {
  const patch = { ...item, balanceSource: PUBLICATION_DATE };
  for (const field of ["description", "declare", "effect"]) {
    if (typeof patch[field] !== "string") continue;
    patch[field] = replacements.reduce(
      (text, [pattern, replacement]) => text.replace(pattern, replacement),
      patch[field],
    );
  }
  return patch;
}

function patchChampionKeyword(item, championKeyword) {
  const keywords = (item.keywords ?? []).filter(
    (keyword) => !/^champion(?:\s*\(|$)/i.test(keyword),
  );
  return {
    ...item,
    keywords: [...keywords, championKeyword],
    rules: { ...item.rules, canBeReinforced: true },
    balanceSource: PUBLICATION_DATE,
  };
}

function patchSonsArmiesOfRenown(faction) {
  const updatedArmyIds = new Set(["matriarch-s-mob", "stomper-tribe"]);
  return {
    ...faction,
    armiesOfRenown: (faction.armiesOfRenown ?? []).map((army) => {
      if (!updatedArmyIds.has(army.id)) return army;
      return {
        ...army,
        rules: {
          ...army.rules,
          units: (army.rules?.units ?? []).map((unit) => {
            if (!["mancrusher-gargant", "scourge-of-aqshy-mancrusher-gargant"].includes(unit.id)) {
              return unit;
            }
            const option = {
              min: 0,
              max: -1,
              keywords: ["Little"],
              nonKeywords: [],
              subhero_categories: [],
              unit_names: [],
              label: "Any Little",
            };
            const optionRule = {
              min: option.min,
              max: option.max,
              keywords: option.keywords,
              nonKeywords: option.nonKeywords,
              subhero_categories: option.subhero_categories,
              unit_names: option.unit_names,
            };
            return {
              ...unit,
              rules: {
                ...unit.rules,
                canLeadRegiment: true,
                canLeadRegimentAsHero: true,
              },
              details: {
                ...unit.details,
                regimentOptions: [option],
                regimentOptionRules: [optionRule],
                notes: [
                  ...(unit.details?.notes ?? []),
                  "This unit can lead a regiment as if it were a Hero. Any Little units can be added to its regiment.",
                ],
              },
              balanceSource: PUBLICATION_DATE,
            };
          }),
        },
        balanceSource: PUBLICATION_DATE,
      };
    }),
  };
}

function patchLofnirDrothkeepers(faction) {
  return {
    ...faction,
    armiesOfRenown: (faction.armiesOfRenown ?? []).map((army) => {
      if (army.id !== "lofnir-drothkeepers") return army;
      const existingById = new Map(
        (army.rules?.battleTraits ?? []).map((trait) => [trait.id, trait]),
      );
      const ferociousHeat = existingById.get("ferocious-heat");
      const daringTamers = existingById.get("daring-tamers");
      return {
        ...army,
        rules: {
          ...army.rules,
          name: "Khazalite Holds - Lofnir Drothkeepers",
          sourcePublication: "Army of Renown: Lofnir Drothkeepers (October 2026)",
          battleTraits: [
            {
              id: "blazing-vengeance",
              name: "Blazing Vengeance",
              phase: "Passive",
              type: "Ability",
              description: "Effect: Each time a friendly **DROTHKEEPERS MONSTER** is slain, give 1 **grudge mark** to each friendly **DROTHKEEPERS** unit within 6\" of it.",
              declare: null,
              effect: "Each time a friendly **DROTHKEEPERS MONSTER** is slain, give 1 **grudge mark** to each friendly **DROTHKEEPERS** unit within 6\" of it.",
              usedBy: null,
              keywords: [],
              balanceSource: PUBLICATION_DATE,
            },
            {
              id: "skilled-drothwranglers",
              name: "Skilled Drothwranglers",
              phase: "Passive",
              type: "Ability",
              description: "Effect: The timing of friendly **Auric Runeson on Magmadroth** units' **Packdroth** ability is 'Reaction: You declared a non-Charge Move ability for this unit' instead of 'Once Per Turn (Army), Reaction: You declared a Move ability for this unit in your movement phase'.",
              declare: null,
              effect: "The timing of friendly **Auric Runeson on Magmadroth** units' **Packdroth** ability is 'Reaction: You declared a non-Charge Move ability for this unit' instead of 'Once Per Turn (Army), Reaction: You declared a Move ability for this unit in your movement phase'.",
              usedBy: null,
              keywords: [],
              balanceSource: PUBLICATION_DATE,
            },
            ferociousHeat,
            daringTamers,
          ].filter(Boolean),
        },
        balanceSource: PUBLICATION_DATE,
      };
    }),
  };
}

function mapObjects(value, mapper) {
  if (Array.isArray(value)) return value.map((item) => mapObjects(item, mapper));
  if (!value || typeof value !== "object") return value;
  const nested = Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, mapObjects(item, mapper)]),
  );
  return mapper(nested);
}
