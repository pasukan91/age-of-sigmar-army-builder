const terrain = [
  {
    id: "fane-of-slaanesh",

    name: "Fane of Slaanesh",

    image: "fane-of-slaanesh.png",

    profile: {
      move: "-",
      health: 10,
      control: "-",
      save: "4+",
      ward: "6+",
    },

    universalAbilities: [
      "Cover",
      "Impassable",
    ],

    abilities: [
      {
        type: "Once Per Turn (Army)",

        phase: "Your Hero Phase",

        name: "Damned Conduit",

        keywords: [],

        description:
          "Declare: Pick a visible enemy unit within 18\" of this terrain feature to be the target.\n\nEffect: Roll a dice. On a 3+, until the start of your next turn, while the target is within X\" of this terrain feature, the target's weapons have the Companion weapon ability, where X is determined by the current battle round:\n\nBattle Round 1: 9\"\nBattle Round 2: 12\"\nBattle Round 3: 15\"\nBattle Round 4: 18\"\nBattle Round 5: 21\"",
      },
    ],

    details: {
      models: 1,
      baseSize: null,
    },

    keywords: [
      "Faction Terrain",
      "Ward (6+)",
      "Chaos",
      "Hedonites of Slaanesh",
    ],
  },
];

export default terrain;