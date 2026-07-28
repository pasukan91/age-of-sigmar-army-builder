const terrain = [{
  id: "cursed-sepulchre",
  name: "Cursed Sepulchre",
  image: "/images/units/soulblight/cursed-sepulcre.jpg",
  profile: { move: "-", health: 8, control: "-", save: "4+", ward: "6+" },
  abilities: [
    { name: "Locus of Shyish", type: "Passive", phase: null, description: "Friendly Soulblight Gravelords Wizards casting a Summon spell from Manifestations of the Grave can measure range and visibility from this terrain feature." },
    { name: "Leeching Soil", type: "Passive", phase: null, description: "Each time a model is slain within 9\" of this terrain feature, Heal (1) this terrain feature." },
  ],
  keywords: ["Faction Terrain", "Ward (6+)", "Death", "Soulblight Gravelords"],
  terrainAbilities: ["Cover", "Impassable"],
}];

export default terrain;
