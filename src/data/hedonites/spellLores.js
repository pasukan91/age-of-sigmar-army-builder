const spellLores = [
  {
    id: "lore-of-extravagance",

    name: "Lore of Extravagance",

    description:
      "Hechizos de los Hedonites of Slaanesh centrados en potenciar a sus aliados y debilitar a enemigos concretos.",

    spells: [
      {
        id: "hysterical-frenzy",

        name: "Hysterical Frenzy",

        castingValue: 6,

        type: "Spell",

        phase: "Your Hero Phase",

        keywords: [
          "Spell",
          "Unlimited",
        ],

        description:
          "Declare: Pick a friendly HEDONITES OF SLAANESH WIZARD to cast this spell, pick a visible friendly HEDONITES OF SLAANESH unit wholly within 12\" of them to be the target, then make a casting roll of 2D6.\n\nEffect: Add 1 to wound rolls for the target's combat attacks until the start of your next turn.",
      },

      {
        id: "last-ecstasy",

        name: "Last Ecstasy",

        castingValue: 6,

        type: "Spell",

        phase: "Your Hero Phase",

        keywords: [
          "Spell",
        ],

        description:
          "Declare: Pick a friendly HEDONITES OF SLAANESH WIZARD to cast this spell, pick a visible friendly HEDONITES OF SLAANESH unit wholly within 12\" of them to be the target, then make a casting roll of 2D6.\n\nEffect: Until the start of your next turn, each time a model in the target unit is slain by a combat attack and that model was in combat with the attacking unit, roll a dice. If the target unit is a MONSTER, roll 10 dice instead. For each 4+, inflict 1 mortal damage on the attacking unit after the FIGHT ability has been resolved.",
      },

      {
        id: "overwhelming-acquiescence",

        name: "Overwhelming Acquiescence",

        castingValue: 7,

        type: "Spell",

        phase: "Your Hero Phase",

        keywords: [
          "Spell",
        ],

        description:
          "Declare: Pick a friendly HEDONITES OF SLAANESH WIZARD to cast this spell, pick a visible enemy unit within 18\" of the caster to be the target, then make a casting roll of 2D6.\n\nEffect: Until the start of your next turn, weapons used by friendly HEDONITES OF SLAANESH units for attacks that target that enemy unit, including Companion weapons, have Crit (2 Hits).",
      },
    ],
  },
];

export default spellLores;