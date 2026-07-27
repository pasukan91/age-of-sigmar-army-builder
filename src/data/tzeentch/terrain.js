const terrain = [{
  id: "argent-shard",
  name: "Argent Shard",
  image: "/images/units/disciples/argent_shards.jpg",
  profile: { move: "-", health: 8, control: "-", save: "4+", ward: "6+" },
  universalAbilities: ["Cover", "Impassable"],
  abilities: [
    { name: "Magical Focus", type: "Once Per Turn (Army)", phase: "Any Hero Phase", description: "The next friendly spell this phase can measure range and visibility from this terrain; opponents also measure to it for Unbind." },
    { name: "Sorcerous Duplication", type: "Once Per Turn (Army)", phase: "Any Movement Phase", description: "If only one friendly Argent Shard exists, create another wholly within 12\" and at legal distances; otherwise reposition this terrain at legal distances." },
  ],
  details: { models: 1, baseSize: "Faction terrain" },
  keywords: ["Faction Terrain", "Ward (6+)", "Chaos", "Disciples of Tzeentch"],
}];

export default terrain;
