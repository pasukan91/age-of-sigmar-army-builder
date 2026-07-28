const terrain = [
  {
    id: "bone-tithe-nexus",
    name: "Bone-tithe Nexus",
    image: "/images/units/osiarcas/bone-tithe-nexus.jpg",
    profile: { move: "-", health: 13, control: "-", save: "4+", ward: null },
    universalAbilities: ["Cover", "Unstable"],
    weapons: [
      { name: "Almighty Obsidian Blade", type: "Melee", attacks: 2, hit: "4+", wound: "2+", rend: "2", damage: "3", abilities: [] },
    ],
    abilities: [
      {
        name: "Deathly Aura",
        type: "Passive",
        phase: null,
        description:
          "Enemy units cannot be set up within X\" of this terrain, where X is 9\"/12\"/15\"/18\"/21\" in battle rounds 1-5 respectively.",
      },
    ],
    details: { models: 1, baseSize: null },
    keywords: ["Faction Terrain", "Death", "Ossiarch Bonereapers"],
  },
];

export default terrain;
