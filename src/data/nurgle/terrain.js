export default [{
  id: "feculent-gnarlmaw", name: "Feculent Gnarlmaw",
  image: "/images/units/maggotkin/feculent_gnarlmaw.jpg",
  profile: { move: "-", health: 7, control: "-", save: "5+", ward: "5+" },
  terrainAbilities: ["Cover", "Impassable"],
  weapons: [{
    name: "Maggot-infested Mouth", type: "Melee", attacks: 4,
    hit: "4+", wound: "3+", rend: 1, damage: "D3", abilities: [],
  }],
  abilities: [
    { name: "Riddled with Disease", phase: "Passive", type: "Ability", description: "When a friendly Maggotkin of Nurgle Daemon unit wholly within 12\" uses Rally, add 1 to the number of rally dice rolled. If that unit is not a Hero, add 3 instead." },
    { name: "Rot-Blossom", phase: "Passive", type: "Ability", description: "Friendly Rotbringers units have Ward (5+) while they are wholly within 12\" of this terrain feature." },
    { name: "Tendrils of Corruption", phase: "Any Movement Phase", type: "Ability", description: "Change this terrain feature's Move characteristic to 3\" for the rest of the phase, then it can immediately move 3\". It cannot move through or end that move in combat with enemy units, and cannot end that move on an objective or another terrain feature. Designer's Note: it cannot use Move, Run, Retreat or Charge abilities." },
  ],
  keywords: ["Faction Terrain", "Ward (5+)", "Chaos", "Nurgle"],
}];
