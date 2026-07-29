const manifestations = [
  {
    id: "hand-of-nagash",
    name: "Hand of Nagash",
    image: "/images/units/soulblight/hand-of-nagash.jpg",
    castingValue: 7,
    profile: { move: '8"', health: 10, control: "-", save: "5+", banishment: "8+", ward: "6+" },
    weapons: [{ name: "Grasping Talon", type: "Melee", attacks: 5, hit: "4+", wound: "2+", rend: "1", damage: "2", abilities: ["Crit (Mortal)"] }],
    abilities: [
      { name: "Chill Grasp", phase: "Any Combat Phase", description: "Pick an enemy in combat. On a 4+, until your next turn it has maximum control score 1 while within 3\" and cannot use Move abilities while within 3\"." },
      { name: "Inescapable Reach", phase: "Your Movement Phase", description: "If not set up this turn, remove and set it up more than 9\" from enemies, then roll D3; on a 2+ it can move that many inches." },
    ],
    keywords: ["Manifestation", "Endless Spell", "Fly", "Ward (6+)", "Death", "Soulblight Gravelords"],
    summonSpell: { name: "Summon Hand of Nagash", castingValue: 7, phase: "Your Hero Phase", description: "Set it up wholly within 12\" of and visible to the caster and more than 9\" from enemies.", keywords: ["Spell", "Summon"] },
  },
  {
    id: "unholy-reliquary",
    name: "Unholy Reliquary",
    image: "/images/units/soulblight/unholly-relicary.jpg",
    castingValue: 6,
    profile: { move: "-", health: 8, control: "-", save: "5+", banishment: "7+", ward: "6+" },
    abilities: [{ name: "Draw on Power", phase: "Any Combat Phase", description: "Pick a friendly Soulblight Gravelords Hero wholly within 12\". Heal (D3) it, or add 1 to its melee Attacks for the turn; then this manifestation is banished and removed from play." }],
    keywords: ["Manifestation", "Endless Spell", "Ward (6+)", "Death", "Soulblight Gravelords"],
    summonSpell: { name: "Summon Unholy Reliquary", castingValue: 6, phase: "Your Hero Phase", description: "Set it up wholly within 18\" of and visible to the caster and more than 3\" from enemies.", keywords: ["Spell", "Summon"] },
  },
  {
    id: "sanguine-swarm",
    name: "Sanguine Swarm",
    image: "/images/units/soulblight/sanguine-swarm.jpg",
    castingValue: 6,
    profile: { move: '12"', health: 6, control: "-", save: "6+", banishment: "7+", ward: "6+" },
    weapons: [{ name: "Leeching Bites", type: "Melee", attacks: 10, hit: "5+", wound: "5+", rend: "0", damage: "1", abilities: ["Crit (Mortal)"] }],
    abilities: [
      { name: "Multiple Parts", type: "Passive", phase: null, description: "This manifestation has 2 parts. Both must end moves within 9\" of each other and each part is armed with Leeching Bites." },
      { name: "Leeching Bites", type: "Passive", phase: null, description: "Each time this manifestation scores a critical hit, Heal (1) it." },
    ],
    keywords: ["Manifestation", "Endless Spell", "Fly", "Ward (6+)", "Death", "Soulblight Gravelords"],
    summonSpell: { name: "Summon Sanguine Swarm", castingValue: 6, phase: "Your Hero Phase", description: "Set it up wholly within 12\" of and visible to the caster and more than 9\" from enemies. Its 2 parts must be set up within 9\" of each other.", keywords: ["Spell", "Summon"] },
  },
];

export default manifestations;
