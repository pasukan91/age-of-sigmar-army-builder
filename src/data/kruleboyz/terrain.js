const terrain = [
  {
    id: "skaregob-totem",
    name: "Skaregob Totem",
    image: "/images/terrain/kruleboyz/skaregob-totem.webp",
    profile: { move: "-", health: 12, control: "-", save: "4+", ward: null },
    universalAbilities: ["Cover", "Impassable"],
    abilities: [
      { name: "Up We Go!", type: "Your Hero Phase", phase: "Your Hero Phase", description: "Place a friendly Kruleboyz Infantry Hero within 3\" and not in combat on this terrain feature as its Shouty Boss." },
      { name: "Man Da Tower!", type: "Passive", phase: null, description: "The Shouty Boss cannot move; ranges, visibility and attacks to or from it are measured to the totem, and attacks target the totem instead." },
      { name: "I'm Off!", type: "Your Movement Phase", phase: "Your Movement Phase", description: "Set up the Shouty Boss wholly within 6\" and not in combat if it was not placed on the totem this turn." },
      { name: "Sinister Stare", type: "Once Per Turn", phase: "Your Hero Phase", description: "Pick a visible enemy or friendly Kruleboyz unit wholly within 12\", or 18\" with a Shouty Boss. Add 1 to Dirty Trick rolls that target it within the same range until your next turn." },
    ],
    details: { models: 1, baseSize: null },
    keywords: ["Faction Terrain", "Destruction", "Kruleboyz"],
  },
];

export default terrain;
