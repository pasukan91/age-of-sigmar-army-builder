const terrain = [{
  id: "shrine-of-dark-tribute",
  name: "Shrine of Dark Tribute",
  points: 20,
  image: "/images/units/dok/shrine-dark-tribute.jpg",
  profile: { move: "-", health: 12, control: "-", save: "4+", ward: "6+" },
  universalAbilities: ["Cover", "Impassable"],
  abilities: [
    { name: "Call to Murder", type: "Ability", phase: "Your Hero Phase", description: "Deactivate 1 active blessing from Blessings of Khaine, then activate 1 inactive blessing. This does not count as using Blessings of Khaine." },
    { name: "In Dark Communion", type: "Ability", phase: "Your Hero Phase", description: "Pick a friendly Daughters of Khaine Wizard or Priest within 3\". Until this terrain uses this ability again or is removed, that unit is in dark communion and can re-roll 1 casting or chanting roll each turn." },
  ],
  details: { models: 1, baseSize: "Faction terrain" },
  keywords: ["Faction Terrain", "Ward (6+)", "Order", "Daughters of Khaine"],
}];

export default terrain;
