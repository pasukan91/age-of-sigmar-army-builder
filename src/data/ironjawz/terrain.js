const terrain = [
  {
    id: "bossrokk-tower",
    name: "Bossrokk Tower",
    image: "/images/terrain/ironjawz/bossrokk-tower.webp",
    profile: { move: "-", health: 12, control: "-", save: "4+", ward: null },
    universalAbilities: ["Cover", "Impassable"],
    abilities: [
      { name: "Up We Go!", type: "Your Hero Phase", phase: "Your Hero Phase", description: "Place a friendly Ironjawz Infantry Hero within 3\" and not in combat on this terrain feature as its Shouty Boss." },
      { name: "Man Da Tower!", type: "Passive", phase: null, description: "The Shouty Boss cannot move; ranges, visibility and attacks to or from it are measured to the tower, and attacks target the tower instead." },
      { name: "I'm Off!", type: "Your Movement Phase", phase: "Your Movement Phase", description: "Set up the Shouty Boss wholly within 6\" and not in combat if it was not placed on the tower this turn." },
      { name: "Aggressively Bossy", type: "Once Per Turn", phase: "Your Hero Phase", description: "Pick a visible enemy within 18\" and roll, adding 1 with a Shouty Boss. On a 4+, reduce its control, casting/chanting, or charge dice until your next turn." },
    ],
    details: { models: 1, baseSize: null },
    keywords: ["Faction Terrain", "Destruction", "Ironjawz"],
  },
];

export default terrain;
