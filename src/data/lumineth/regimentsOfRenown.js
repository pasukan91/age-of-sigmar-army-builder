const eligibleFactionIds = [
  "cities",
  "daughters",
  "fyreslayers",
  "idoneth",
  "kharadron",
  "seraphon",
  "stormcast",
  "sylvaneth",
];

const regimentsOfRenown = [
  {
    id: "sigil-convocation",
    name: "Sigil Convocation",
    points: 130,
    sourceFaction: "lumineth",
    eligibleFactionIds,
    organisation: [
      "1 Scinari Calligrave",
      "1 Sanctum of Amyntok",
      "1 Hyshian Twinstones",
      "1 Rune of Petrification",
    ],
    abilities: [
      {
        name: "Cycle Manifestation",
        type: "Spell",
        phase: "Your Hero Phase",
        castingValue: 6,
        keywords: ["Spell", "Summon"],
        description: "Pick the regiment's Calligrave and one of its manifestations not on the battlefield. If another is present, banish it, then set up the chosen manifestation within 1\" of the caster and visible. Sanctum of Amyntok is instead set up wholly within 12\", more than 3\" from enemies, in a ring.",
      },
      {
        name: "Swift Erasure",
        type: "Reaction",
        phase: "Opponent declared a Spell ability",
        description: "For each friendly target wholly within 12\" of the Calligrave, roll. On a 4+, that Spell has no effect on it.",
      },
      {
        name: "Arcane Taxonomy",
        type: "Once Per Turn",
        phase: "Your Movement Phase",
        description: "Remove the Calligrave and set it up wholly within 3\" of a friendly manifestation and more than 7\" from enemies.",
      },
    ],
  },
  {
    id: "dawnrider-lance",
    name: "Dawnrider Lance",
    points: 260,
    sourceFaction: "lumineth",
    eligibleFactionIds,
    organisation: [
      "1 Vanari Lord Regent on Lightcourser",
      "5 Vanari Dawnriders",
    ],
    abilities: [
      {
        name: "Blinding Charge",
        type: "Once Per Turn (Army)",
        phase: "Any Charge Phase",
        description: "Pick a regiment unit that charged and an enemy Infantry unit within 1\". Ignore positive save modifiers for that enemy for the rest of the turn.",
      },
      {
        name: "Masters of All Terrain",
        type: "Passive",
        phase: null,
        description: "Ignore negative modifiers to run and charge rolls and Move characteristics for units in this regiment.",
      },
    ],
  },
];

export default regimentsOfRenown;

