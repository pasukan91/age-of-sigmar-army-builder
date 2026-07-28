const manifestations = [
  {
    id: "bone-tithe-shrieker",
    name: "Bone-tithe Shrieker",
    image: "/images/units/osiarcas/bone-tithe-shrieker.jpg",
    castingValue: 6,
    profile: { move: '8"', health: 7, control: "-", save: "5+", ward: "6+", banishment: "7+" },
    weapons: [
      { name: "Soul-rending Shriek", type: "Ranged", range: '12"', attacks: 4, hit: "3+", wound: "4+", rend: "1", damage: "D3", abilities: ["Shoot in Combat"] },
      { name: "Soul-rending Shriek", type: "Melee", attacks: 4, hit: "3+", wound: "4+", rend: "1", damage: "D3", abilities: [] },
    ],
    abilities: [
      { name: "No Escape", type: "Passive", phase: null, description: "Subtract 1 from ward rolls for enemy units within 12\"." },
    ],
    summonSpell: {
      name: "Summon Bone-tithe Shrieker",
      type: "Spell",
      phase: "Your Hero Phase",
      castingValue: 6,
      keywords: ["Spell", "Summon"],
      description: "Set up a Bone-tithe Shrieker wholly within 12\" of the caster, visible and more than 9\" from enemies.",
    },
    keywords: ["Manifestation", "Endless Spell", "Fly", "Ward (6+)", "Death", "Ossiarch Bonereapers"],
  },
  {
    id: "soulstealer-carrion",
    name: "Soulstealer Carrion",
    image: "/images/units/osiarcas/soulstealer-carrion.jpg",
    castingValue: 6,
    profile: { move: '10"', health: 7, control: "-", save: "5+", ward: "6+", banishment: "7+" },
    weapons: [
      { name: "Spectral Claws and Beak", type: "Melee", attacks: 6, hit: "4+", wound: "2+", rend: "1", damage: "D3", abilities: [] },
    ],
    abilities: [
      { name: "Aviarch Sentry", type: "Passive", phase: null, description: "Subtract 10 from the control scores of enemy units within 6\"." },
    ],
    summonSpell: {
      name: "Summon Soulstealer Carrion",
      type: "Spell",
      phase: "Your Hero Phase",
      castingValue: 6,
      keywords: ["Spell", "Summon"],
      description: "Set up a Soulstealer Carrion wholly within 12\" of the caster, visible and more than 9\" from enemies.",
    },
    keywords: ["Manifestation", "Endless Spell", "Fly", "Ward (6+)", "Death", "Ossiarch Bonereapers"],
  },
  {
    id: "nightmare-predator",
    name: "Nightmare Predator",
    image: "/images/units/osiarcas/nightmare-predator.jpg",
    castingValue: 6,
    profile: { move: '8"', health: 7, control: "-", save: "5+", ward: "6+", banishment: "7+" },
    weapons: [
      { name: "Lacerating Claws", type: "Melee", attacks: 6, hit: "4+", wound: "2+", rend: "2", damage: "2", abilities: [] },
    ],
    abilities: [
      { name: "Death Incarnate", type: "End of Any Turn", phase: "End of Any Turn", description: "If destroyed or banished this turn and its summoner is still on the battlefield, roll a die and add 1 if an enemy model was slain by its combat attacks. On 4+, set it up wholly within 12\" of the summoner and more than 9\" from enemies." },
    ],
    summonSpell: {
      name: "Summon Nightmare Predator",
      type: "Spell",
      phase: "Your Hero Phase",
      castingValue: 6,
      keywords: ["Spell", "Summon"],
      description: "Set up a Nightmare Predator wholly within 12\" of the caster, visible and more than 9\" from enemies.",
    },
    keywords: ["Manifestation", "Endless Spell", "Fly", "Ward (6+)", "Death", "Ossiarch Bonereapers"],
  },
];

export default manifestations;
