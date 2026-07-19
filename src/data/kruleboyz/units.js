const units = [
  {
    id: "gobsprakk",

    name: "Gobsprakk, the Mouth of Mork",

    image: "gobsprakk.png",

    points: 240,

    profile: {
      move: '12"',
      health: 14,
      control: 5,
      save: "5+",
      ward: "6+"
    },

    weapons: [
      {
        name: "Bogbark Staff",

        attacks: 3,

        hit: "4+",

        wound: "3+",

        rend: "-",

        damage: "D3",

        abilities: [
          "Anti-Wizard (+1 Rend)",
          "Crit (Mortal)"
        ]
      },

      {
        name: "Killabeak's Stinger",

        attacks: 1,

        hit: "3+",

        wound: "2+",

        rend: "1",

        damage: "D6",

        abilities: [
          "Crit (Mortal)",
          "Companion"
        ]
      },

      {
        name: "Killabeak's Talons and Beak",

        attacks: 7,

        hit: "4+",

        wound: "2+",

        rend: "1",

        damage: "2",

        abilities: [
          "Anti-Wizard (+1 Rend)",
          "Companion"
        ]
      }
    ],

    abilities: [
      {
        type: "Passive",

        icon: "skull",

        color: "black",

        phase: null,

        castingValue: null,

        keywords: [],

        lore: null,

        name: "Battle Damaged",

        description:
          "While this unit has 10 or more damage points, the Attacks characteristic of Killabeak's Talons and Beak is 5."
      },

      {
        type: "Once Per Turn",

        icon: "combat",

        color: "red",

        phase: "Any Combat Phase",

        castingValue: null,

        keywords: [
          "Rampage"
        ],

        lore: null,

        name: "Crush to Death",

        description:
          "Declare: Pick an enemy unit in combat with this unit to be the target.\n\nEffect: Roll a dice. If the roll exceeds the target's Health characteristic, 1 model in the target unit is slain."
      },

      {
        type: "Passive",

        icon: "combat",

        color: "gold",

        phase: null,

        castingValue: null,

        keywords: [],

        lore: "Lore",

        name: "Mork Sez No!",

        description:
          "Each time this unit unbinds a spell, inflict D3 mortal damage on the caster. If the unbinding roll was 10+, inflict D6 mortal damage on the caster instead."
      },

      {
        type: "Reaction",

        icon: "sun",

        color: "gold",

        phase: "Opponent declared a SPELL ability",

        castingValue: null,

        keywords: [],

        lore: "Lore",

        name: "Screamin' Mandrakk",

        description:
          "This unit uses the 'Unbind' ability but the unbinding roll is 3D6 instead of 2D6."
      },

      {
        type: "Spell",

        icon: "combat",

        color: "gold",

        phase: "Your Hero Phase",

        castingValue: 6,

        keywords: [
          "Spell"
        ],

        lore: "Lore",

        name: "Strangle Hex",

        description:
          "Declare: Pick a visible enemy unit within 18\" of this unit to be the target, then make a casting roll of 2D6.\n\nEffect: Roll a number of dice equal to the target's Health characteristic, to a maximum of 10. For each 4+, inflict 1 mortal damage on the target."
      }
    ],

    details: {
      models: 1,

      baseSize: "130mm",

      regimentOptions: [
        "0-1 Mob Wrangler",
        "0-1 Swamp Beast",
        "Any Kruleboyz"
      ]
    },

    keywords: [
      "Warmaster",
      "Unique",
      "Hero",
      "Monster",
      "Wizard (2)",
      "Fly",
      "Ward (6+)",
      "Destruction",
      "Kruleboyz"
    ],

    rules: {
      hero: true,
      unique: true,
      monster: true,
      wizard: 2,
      priest: 0,
      ward: "6+",
      warmaster: true,
      companion: true
    }
  },

  {
    id: "killaboss-on-great-gnashtoof",

    name: "Killaboss on Great Gnashtoof",

    image: "killaboss-on-great-gnashtoof.png",

    points: 130,

    profile: {
      move: '10"',
      health: 10,
      control: 2,
      save: "3+",
      ward: null
    },

    weapons: [
      {
        name: "Boss-stikka",

        attacks: 5,

        hit: "4+",

        wound: "3+",

        rend: "1",

        damage: "2",

        abilities: [
          "Crit (Mortal)"
        ]
      },

      {
        name: "Great Gnashtoof's Jaws",

        attacks: 5,

        hit: "4+",

        wound: "3+",

        rend: "1",

        damage: "2",

        abilities: [
          "Companion"
        ]
      }
    ],

    abilities: [
      {
        type: "Your Hero Phase",

        icon: "sun",

        color: "gold",

        phase: "Your Hero Phase",

        castingValue: null,

        keywords: [],

        lore: null,

        name: "All Part of Da Plan",

        description:
          "Declare: Pick another friendly KRULEBOYZ unit wholly within 9\" of this unit to be the target.\n\nEffect: Add 3 to the target's Control characteristic until the start of your next turn."
      },

      {
        type: "Passive",

        icon: "combat",

        color: "gold",

        phase: null,

        castingValue: null,

        keywords: [],

        lore: null,

        name: "That's Ours, Ya Gitz!",

        description:
          "While this unit is contesting an objective you do not control, add 1 to hit rolls for combat attacks made by friendly KRULEBOYZ units wholly within 12\" of this unit."
      }
    ],

    details: {
      models: 1,

      baseSize: "105 × 70mm",

      regimentOptions: [
        "0-1 Mob Wrangler",
        "Any Kruleboyz"
      ]
    },

    keywords: [
      "Hero",
      "Monster",
      "Cavalry",
      "Destruction",
      "Kruleboyz"
    ],

    rules: {
      hero: true,
      unique: false,
      monster: true,
      wizard: 0,
      priest: 0,
      ward: null,
      warmaster: false,
      companion: true
    }
  }
];

export default units;