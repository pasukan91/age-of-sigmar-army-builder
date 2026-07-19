const heroicTraits = [
  {
    id: "centre-of-attention",

    name: "Centre of Attention",

    points: 0,

    description:
      "Declare: Pick a visible enemy unit within 12\" of this unit to be the target.\n\nEffect: Roll a dice. On a 3+, for the rest of the turn, while this unit is wholly within 12\" of the battlefield and visible to the target:\n\n• Subtract 1 from hit rolls for attacks made by that enemy unit that target other friendly HEDONITES OF SLAANESH units.\n\n• Add 1 to hit rolls for combat attacks made by other friendly HEDONITES OF SLAANESH units that target that enemy unit.",

    type: "Any Hero Phase",

    phase: "Any Hero Phase",

    keywords: [],
  },

  {
    id: "dilettante",

    name: "Dilettante",

    points: 0,

    description:
      "Effect: Remove this unit from the battlefield and set it up again on the battlefield more than 9\" from all enemy units.",

    type: "Once Per Battle (Army)",

    phase: "Your Movement Phase",

    keywords: [],
  },

  {
    id: "unseemly-vitality",

    name: "Unseemly Vitality",

    points: 0,

    description:
      "Effect: Heal (D3) this unit.",

    type: "End of Any Turn",

    phase: "End of Any Turn",

    keywords: [],
  },
];

export default heroicTraits;