export default [{
  id: "nexus-chaotica",
  name: "Nexus Chaotica",
  image: "/images/units/slaves/nexus_chaotica.jpg",
  profile: { move: "-", health: 12, control: "-", save: "4+", ward: null },
  terrainAbilities: ["Cover", "Impassable"],
  abilities: [
    {
      name: "Draw Power",
      phase: "Your Hero Phase",
      description: "Roll a dice and give this terrain feature a number of power points equal to the roll, to a maximum of 12.",
    },
    {
      name: "Infernal Sorcery",
      phase: "Your Hero Phase",
      description: "If this terrain feature has 3 or more power points, pick a friendly Slaves to Darkness Wizard within 3\", remove 3 power points and add 1 to that Wizard's casting rolls this turn.",
    },
    {
      name: "Corrupt the Realms",
      phase: "Your Hero Phase",
      description: "If this terrain feature has 9 or more power points, pick an objective or terrain feature within 24\" and each enemy unit within 3\" of it. Remove 9 power points, then roll a D3 for each target. On a 2+, inflict mortal damage equal to the roll.",
    },
  ],
  keywords: ["Faction Terrain", "Chaos", "Slaves to Darkness"],
}];
