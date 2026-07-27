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
      { name: "Sinister Stare", type: "Passive", phase: null, description: "Add 1 to dirty trick rolls for friendly Kruleboyz units wholly within 12\" of this terrain feature or for enemy units within 12\" of it. If this terrain feature has a Shouty Boss, use 18\" instead of 12\"." },
    ],
    details: { models: 1, baseSize: null },
    keywords: ["Faction Terrain", "Destruction", "Kruleboyz"],
  },
];

export default terrain;
