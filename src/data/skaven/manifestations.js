const summonSpell = (name, effect) => ({
  name: `Summon ${name}`,
  type: "Spell",
  phase: "Your Hero Phase",
  castingValue: 7,
  keywords: ["Spell", "Summon"],
  description:
    `Declare: If there is not a friendly ${name} on the battlefield, ` +
    "pick a friendly SKAVEN WIZARD to cast this spell, then make a casting roll of 2D6.\n\n" +
    `Effect: ${effect}`,
});

const manifestations = [
  {
    id: "vermintide",
    name: "Vermintide",
    image: "/images/manifestations/skaven-manifestations.webp",
    castingValue: 7,
    profile: {
      move: '7"',
      health: 13,
      control: "-",
      save: "6+",
      ward: "6+",
      banishment: "7+",
    },
    weapons: [
      {
        name: "Chittering Bites",
        type: "Melee",
        attacks: 13,
        hit: "5+",
        wound: "5+",
        rend: "0",
        damage: "1",
        abilities: ["Crit (Auto-wound)"],
      },
    ],
    abilities: [
      {
        name: "More-more Rats",
        type: "Ability",
        phase: "End of Any Turn",
        description: "Effect: Heal (D6) this MANIFESTATION.",
      },
    ],
    summonSpell: summonSpell(
      "Vermintide",
      "Set up a Vermintide wholly within 13\" of the caster, visible to them and more than 9\" from all enemy units."
    ),
    keywords: [
      "Manifestation",
      "Endless Spell",
      "Ward (6+)",
      "Chaos",
      "Skaven",
    ],
  },
  {
    id: "warp-lightning-vortex",
    name: "Warp Lightning Vortex",
    image: "/images/manifestations/warp-lightning-vortex.webp",
    castingValue: 7,
    profile: {
      move: "-",
      health: 7,
      control: "-",
      save: "6+",
      ward: "6+",
      banishment: "7+",
    },
    weapons: [],
    abilities: [
      {
        name: "Multiple Parts",
        type: "Passive",
        phase: null,
        description: "Effect: When a number of damage points equal to this MANIFESTATION's Health characteristic are allocated to it, this MANIFESTATION is destroyed and all its parts are removed from play.",
      },
      {
        name: "Warp Vortex",
        type: "Passive",
        phase: null,
        description: "Effect: Subtract 2 from run rolls and charge rolls for enemy units while they are within 6\" of this MANIFESTATION. In addition, if an enemy unit passes across this MANIFESTATION and/or the round-cornered triangle formed by drawing a line around all the bases of the MANIFESTATION's parts, inflict D3 mortal damage on that enemy unit after the MOVE ability has been resolved.",
      },
      {
        name: "Warp Lightning Bolts",
        type: "Ability",
        phase: "Any Hero Phase",
        description: "Declare: If this MANIFESTATION was not set up this turn, pick each enemy unit within 6\" of this MANIFESTATION to be the targets.\n\nEffect: Roll a dice for each target. On a 4+, inflict D3 mortal damage on the target.",
      },
    ],
    summonSpell: summonSpell(
      "Warp Lightning Vortex",
      "Set up the first part of the Warp Lightning Vortex within 18\" of the caster and visible to them, then set up the second and third parts exactly 7\" from the first part and exactly 7\" from each other so that they form a triangle."
    ),
    details: {
      models: 3,
      baseSize: null,
    },
    keywords: [
      "Manifestation",
      "Endless Spell",
      "Ward (6+)",
      "Chaos",
      "Skaven",
    ],
  },
  {
    id: "bell-of-doom",
    name: "Bell of Doom",
    image: "/images/manifestations/skaven-manifestations.webp",
    castingValue: 7,
    profile: {
      move: "3D6\"",
      health: 7,
      control: "-",
      save: "6+",
      ward: "6+",
      banishment: "7+",
    },
    weapons: [
      {
        name: "Volatile Warp Energy",
        type: "Melee",
        attacks: "2D6",
        hit: "4+",
        wound: "4+",
        rend: "1",
        damage: "1",
        abilities: [],
      },
    ],
    abilities: [
      {
        name: "Toll of Doom",
        type: "Passive",
        phase: null,
        description: "Effect: Subtract 1 from wound rolls for attacks that target friendly SKAVEN INFANTRY units while they are wholly within 13\" of this MANIFESTATION.",
      },
    ],
    summonSpell: summonSpell(
      "Bell of Doom",
      "Set up a Bell of Doom wholly within 13\" of the caster, visible to them and more than 9\" from all enemy units."
    ),
    keywords: [
      "Manifestation",
      "Endless Spell",
      "Fly",
      "Ward (6+)",
      "Chaos",
      "Skaven",
    ],
  },
];

export default manifestations;
