const manifestations = [
  {
    id: "dreadful-visage",

    name: "Dreadful Visage",

    image: "dreadful-visage.png",

    castingValue: 6,

    summonSpell: {
      name: "Summon Dreadful Visage",

      type: "Spell",

      phase: "Your Hero Phase",

      keywords: [
        "Spell",
        "Summon",
      ],

      description:
        "Declare: If there is not a friendly Dreadful Visage on the battlefield, pick a friendly HEDONITES OF SLAANESH WIZARD to cast this spell, then make a casting roll of 2D6.\n\nEffect: Set up a Dreadful Visage wholly within 12\" of the caster, visible to them and more than 9\" from all enemy units.",
    },

    profile: {
      move: '8"',
      health: 6,
      control: null,
      save: "5+",
      ward: "6+",
      banishment: "7+",
    },

    weapons: [
      {
        name: "Hooked Tongues",

        type: "Melee",

        attacks: 8,

        hit: "3+",

        wound: "4+",

        rend: "1",

        damage: "1",

        abilities: [
          "Crit (2 Hits)",
        ],
      },
    ],

    abilities: [
      {
        type: "Any Hero Phase",

        phase: "Any Hero Phase",

        name: "Flensing Tongues",

        keywords: [],

        description:
          "Declare: Pick a visible enemy unit within 12\" of this MANIFESTATION to be the target.\n\nEffect: Until this MANIFESTATION is banished or destroyed, the target is tongue-tied while it is within 12\" of this MANIFESTATION. While the target is tongue-tied:\n\n• It cannot use RUN abilities.\n\n• Your opponent must roll a D6 instead of a D3 when determining the amount of mortal damage inflicted on the target when it uses a RETREAT ability.",
      },
    ],

    details: {
      models: 1,
      baseSize: null,
    },

    keywords: [
      "Manifestation",
      "Endless Spell",
      "Fly",
      "Ward (6+)",
      "Chaos",
      "Hedonites of Slaanesh",
    ],
  },

  {
    id: "wheels-of-excruciation",

    name: "Wheels of Excruciation",

    image: "wheels-of-excruciation.png",

    castingValue: 6,

    summonSpell: {
      name: "Summon Wheels of Excruciation",

      type: "Spell",

      phase: "Your Hero Phase",

      keywords: [
        "Spell",
        "Summon",
      ],

      description:
        "Declare: If there is not a friendly Wheels of Excruciation on the battlefield, pick a friendly HEDONITES OF SLAANESH WIZARD to cast this spell, then make a casting roll of 2D6.\n\nEffect: Set up a Wheels of Excruciation wholly within 12\" of the caster, visible to them and more than 9\" from all enemy units.",
    },

    profile: {
      move: '8"',
      health: 6,
      control: null,
      save: "5+",
      ward: "6+",
      banishment: "7+",
    },

    weapons: [
      {
        name: "Rending Wheels",

        type: "Melee",

        attacks: 6,

        hit: "4+",

        wound: "2+",

        rend: "2",

        damage: "1",

        abilities: [
          "Charge (+1 Damage)",
        ],
      },
    ],

    abilities: [
      {
        type: "End of Any Turn",

        phase: "End of Any Turn",

        name: "Exquisite Agony",

        keywords: [],

        description:
          "Declare: Pick an enemy unit in combat with this MANIFESTATION to be the target.\n\nEffect: Inflict D6 mortal damage on the target.",
      },
    ],

    details: {
      models: 1,
      baseSize: null,
    },

    keywords: [
      "Manifestation",
      "Endless Spell",
      "Fly",
      "Ward (6+)",
      "Chaos",
      "Hedonites of Slaanesh",
    ],
  },

  {
    id: "mesmerising-mirror",

    name: "Mesmerising Mirror",

    image: "mesmerising-mirror.png",

    castingValue: 6,

    summonSpell: {
      name: "Summon Mesmerising Mirror",

      type: "Spell",

      phase: "Your Hero Phase",

      keywords: [
        "Spell",
        "Summon",
      ],

      description:
        "Declare: If there is not a friendly Mesmerising Mirror on the battlefield, pick a friendly HEDONITES OF SLAANESH WIZARD to cast this spell, then make a casting roll of 2D6.\n\nEffect: Set up a Mesmerising Mirror wholly within 12\" of the caster and visible to them.",
    },

    profile: {
      move: "-",
      health: 6,
      control: null,
      save: "5+",
      ward: "6+",
      banishment: "7+",
    },

    weapons: [],

    abilities: [
      {
        type: "Once Per Phase",

        phase:
          "Reaction: Opponent declared a Move ability for a unit within 18\" of and visible to this Manifestation",

        name: "Irresistible Lure",

        keywords: [],

        description:
          "Effect: If that enemy unit does not end that move closer to this MANIFESTATION than it was at the start of the move, inflict D6 mortal damage on that enemy unit after the MOVE ability has been resolved.",
      },
    ],

    details: {
      models: 1,
      baseSize: null,
    },

    keywords: [
      "Manifestation",
      "Endless Spell",
      "Ward (6+)",
      "Chaos",
      "Hedonites of Slaanesh",
    ],
  },
];

export default manifestations;