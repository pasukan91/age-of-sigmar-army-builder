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
      description: "Tira un dado y gana esa cantidad de puntos de poder, hasta un máximo de 12.",
    },
    {
      name: "Infernal Sorcery",
      phase: "Your Hero Phase",
      description: "Con 3+ puntos, elige un Wizard Slaves to Darkness amigo a 3\", retira 3 puntos y suma 1 a sus tiradas de lanzamiento este turno.",
    },
    {
      name: "Corrupt the Realms",
      phase: "Your Hero Phase",
      description: "Con 9+ puntos, elige un objetivo o terreno a 24\" y los enemigos a 3\" de él. Retira 9 puntos; por cada objetivo tira D3 y con 2+ inflige esa cantidad de mortales.",
    },
  ],
  keywords: ["Faction Terrain", "Chaos", "Slaves to Darkness"],
}];
