import units from "./units";

function alternateUnit(baseId, overrides) {
  const base = units.find((unit) => unit.id === baseId);

  return {
    ...base,
    ...overrides,
    image: `/images/units/skaven/${baseId}.jpg`,
    imageAlias: baseId,
    profile: {
      ...base.profile,
      ...overrides.profile,
    },
    details: {
      ...base.details,
      ...overrides.details,
    },
  };
}

const scourgeUnits = [
  alternateUnit("grey-seer-on-screaming-bell", {
    id: "grey-seer-on-screaming-bell-scourge-of-aqshy",
    name: "Scourge of Aqshy Grey Seer on Screaming Bell",
    points: 330,
    abilities: [
      {
        name: "Battle Damaged",
        type: "Passive",
        phase: null,
        keywords: [],
        description: "While this unit has 10 or more damage points, the Attacks characteristic of Crushing Bulk is 4.",
      },
      {
        name: "Echoes of the Vermindoom",
        type: "Once Per Turn (Army)",
        phase: "End of Any Turn",
        keywords: [],
        description: "Pick up to 3 visible friendly Skaven units wholly within 13\". Heal (D3) each target.",
      },
      {
        name: "The Bell Tolls",
        type: "Passive",
        phase: null,
        keywords: [],
        description: "In odd battle rounds, add 2\" Move to friendly Skaven units wholly within 13\". In even rounds, subtract 1 from hit rolls for attacks that target them.",
      },
      {
        name: "Pealing Portal",
        type: "Spell",
        phase: "Your Hero Phase",
        castingValue: 6,
        keywords: ["Spell"],
        description: "Until your next turn, this unit counts as a friendly Gnawhole for Gnawhole Ambush, Tunnels Through Reality and The Endless Vermintide.",
      },
    ],
    details: {
      notes: "Legal para juego equilibrado con el battlepack General's Handbook 2026-27.",
    },
  }),
  alternateUnit("verminlord-corruptor", {
    id: "verminlord-corruptor-scourge-of-aqshy",
    name: "Scourge of Aqshy Verminlord Corruptor",
    points: 310,
    weapons: [
      {
        name: "Plague Breath",
        type: "Ranged",
        range: '10"',
        attacks: 6,
        hit: "2+",
        wound: "4+",
        rend: "2",
        damage: "1",
        abilities: ["Shoot in Combat"],
      },
      {
        name: "Plaguereapers",
        type: "Melee",
        attacks: 8,
        hit: "3+",
        wound: "2+",
        rend: "2",
        damage: "2",
        abilities: ["Crit (Auto-wound)"],
      },
    ],
    abilities: [
      {
        name: "Foetid Features",
        type: "Once Per Battle (Army)",
        phase: "Deployment Phase",
        keywords: [],
        description: "Choose Noisome Halitosis, Pestilential Seepage or Curdled Miasma for the rest of the battle.",
      },
      {
        name: "Seething Blight",
        type: "Once Per Turn (Army)",
        phase: "Your Hero Phase",
        keywords: ["Rampage"],
        description: "Spend 1 rage dice and pick a unit wholly within 13\". It gains 1 Attack on melee weapons but cannot heal or return slain models; replacement units are also severely depleted.",
      },
    ],
    details: {
      notes: "Legal para juego equilibrado con el battlepack General's Handbook 2026-27.",
    },
  }),
];

export default scourgeUnits;
