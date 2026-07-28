const lanceRules = {
  battleTraits: [
    {
      id: "praetorian-elite",
      name: "Praetorian Elite",
      type: "Once Per Battle Round (Army)",
      phase: "Start of Battle Round",
      description:
        "If any friendly Lance of Ossia Heroes are on the battlefield, pick one and gain relentless discipline points equal to its Relentless Discipline value. Unspent points are lost at the end of the battle round.",
    },
    {
      id: "kavalos-lance",
      name: "Kavalos Lance",
      type: "Passive",
      phase: null,
      description:
        "When a friendly Lance of Ossia unit uses Power Through, the target need not have a lower Health characteristic.",
    },
    {
      id: "vengeful-outriders",
      name: "Vengeful Outriders",
      type: "Relentless Discipline",
      phase: "Your Movement Phase",
      description:
        "Spend 1 relentless discipline point (2 if reinforced and above half strength). Add 2\" Move for the phase.",
    },
    {
      id: "silent-menace",
      name: "Silent Menace",
      type: "Relentless Discipline",
      phase: "Your Movement Phase",
      description:
        "Spend 1 relentless discipline point (2 if reinforced and above half strength). A visible enemy within 12\" cannot use Redeploy this turn.",
    },
    {
      id: "fury-of-zandtos",
      name: "Fury of Zandtos",
      type: "Relentless Discipline",
      phase: "Any Charge Phase",
      description:
        "Spend 1 relentless discipline point (2 if reinforced and above half strength). A charging unit's melee weapons, including Companion weapons, have Crit (2 Hits) for the turn.",
    },
    {
      id: "blood-smeared-hooves",
      name: "Blood-smeared Hooves",
      type: "Relentless Discipline",
      phase: "Any Combat Phase",
      description:
        "Spend 1 relentless discipline point (2 if reinforced and above half strength). Add 1 Rend to the charging unit's weapons, including Companion weapons, for the turn.",
    },
  ],
  battleFormations: [],
  heroicTraits: [
    {
      id: "prevailing-tactician",
      name: "Prevailing Tactician",
      source: "Army of Renown",
      points: 0,
      description:
        "In your hero phase, if Arch-Kavalos Zandtos is not wholly within 12\" of this unit, gain 2 relentless discipline points.",
    },
  ],
  artefacts: [
    {
      id: "helm-of-tyranny",
      name: "Helm of Tyranny",
      source: "Army of Renown",
      points: 0,
      description: "Subtract 3 from enemy control scores while within 12\".",
    },
  ],
  spellLores: [],
  manifestationLores: [],
  terrain: [],
};

const nullMyriadRules = {
  battleTraits: [
    {
      id: "arcane-immunity",
      name: "Arcane Immunity",
      type: "Passive",
      phase: null,
      description:
        "Friendly Null Myriad units have Ward (4+) against damage from Spell abilities, Prayer abilities and Manifestation abilities.",
    },
    {
      id: "first-of-the-mortarchs",
      name: "First of the Mortarchs",
      type: "Passive",
      phase: null,
      description:
        "Arkhan's successfully cast spell cannot be unbound when the roll contains 2 or more matching results, meets its casting value and is not a miscast.",
    },
    {
      id: "supernatural-absorption",
      name: "Supernatural Absorption",
      type: "Once Per Turn (Army)",
      phase: "Your Hero Phase",
      description:
        "Pick an enemy Manifestation in a friendly unit's combat range. On a 3+, banish it, then heal that friendly unit by the manifestation's Health or return slain models with combined Health up to that value.",
    },
  ],
  battleFormations: [],
  heroicTraits: [
    {
      id: "aura-of-enervation",
      name: "Aura of Enervation",
      source: "Army of Renown",
      points: 0,
      description:
        "Subtract 1 from wound rolls for shooting attacks targeting friendly Null Myriad units wholly within 12\".",
    },
  ],
  artefacts: [
    {
      id: "gothizzar-cartouche",
      name: "Gothizzar Cartouche",
      source: "Army of Renown",
      points: 0,
      description:
        "In your combat phase, pick an enemy within 12\". On a 3+, friendly Null Myriad units add 1 to hit rolls for combat attacks against it this turn.",
    },
  ],
  spellLores: [
    {
      id: "null-myriad-spell-lore",
      name: "Sorceries of the Null Myriad",
      spells: [
        {
          id: "unearthly-aura",
          name: "Unearthly Aura",
          castingValue: 5,
          keywords: ["Unlimited"],
          description:
            "A visible friendly Null Myriad unit wholly within 12\" adds 1 to wound rolls for combat attacks until your next turn.",
        },
        {
          id: "reinforce-construct",
          name: "Reinforce Construct",
          castingValue: 6,
          keywords: ["Unlimited"],
          description:
            "A visible friendly Null Myriad unit wholly within 12\" has Ward (5+) until your next turn.",
        },
      ],
    },
  ],
  manifestationLores: [
    {
      id: "null-myriad-manifestations",
      name: "Horror of the Necropolis",
      description:
        "Spell (6, Summon, Unlimited): summon one unfielded Soulstealer Carrion, Bone-tithe Shrieker or Nightmare Predator wholly within 12\", visible and more than 9\" from enemies.",
      manifestations: [
        "soulstealer-carrion",
        "bone-tithe-shrieker",
        "nightmare-predator",
      ],
    },
  ],
  terrain: [],
};

const armiesOfRenown = [
  {
    id: "the-lance-of-ossia",
    name: "The Lance of Ossia",
    requiredUnits: ["arch-kavalos-zandtos"],
    excludesRegimentsOfRenown: true,
    excludesFactionTerrain: true,
    rules: lanceRules,
    roster: [
      "Arch-Kavalos Zandtos (must be general)",
      "Liege-Kavalos on War Chariot",
      "Kavalos War Chariot",
      "Any Ossiarch Bonereapers Cavalry units",
    ],
    description:
      "Zandtos leads a fast army of cavalry and war chariots.",
  },
  {
    id: "the-null-myriad",
    name: "The Null Myriad",
    requiredUnits: ["arkhan"],
    excludesRegimentsOfRenown: true,
    rules: nullMyriadRules,
    roster: [
      "Arkhan the Black (must be general)",
      "Any non-Unique Ossiarch Bonereapers Wizard Heroes",
      "Any Ossiarch Bonereapers Infantry units",
    ],
    description:
      "Arkhan's personal legion combines Mortisan magic with arcane resilience.",
  },
];

export default armiesOfRenown;
