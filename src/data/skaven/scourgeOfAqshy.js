import units from "./units";

function alternateUnit(baseId, overrides) {
  const base = units.find((unit) => unit.id === baseId);

  return {
    ...base,
    ...overrides,
    image: base.image,
    imageAlias: base.imageAlias ?? base.id,
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
    weapons: [
      {
        name: "Warpstone Staff",
        type: "Melee",
        attacks: 3,
        hit: "4+",
        wound: "4+",
        rend: "1",
        damage: "D3",
        abilities: [],
      },
      {
        name: "Rat Ogor's Tearing Claws",
        type: "Melee",
        attacks: 5,
        hit: "4+",
        wound: "3+",
        rend: "1",
        damage: "2",
        abilities: [],
      },
      {
        name: "Crushing Bulk",
        type: "Melee",
        attacks: 6,
        hit: "4+",
        wound: "2+",
        rend: "1",
        damage: "2",
        abilities: ["Charge (+1 Damage)", "Companion"],
      },
    ],
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
      notes: "Legal for matched play with the General's Handbook 2026-27 battlepack.",
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
        description: "Choose 1 effect for the battle: Noisome Halitosis adds 1 Damage to Plague Breath; Pestilential Seepage allows re-rolling chanting rolls for friendly Pestilens Priests wholly within 13\" while this unit is damaged; Curdled Miasma makes enemy units within 6\" not visible to other enemies more than 3\" from them.",
      },
      {
        name: "Seething Blight",
        type: "Once Per Turn (Army)",
        phase: "Your Hero Phase",
        keywords: ["Rampage"],
        description: "Spend 1 rage dice. If the opponent's fury level is lower than yours, increase it by 1, to a maximum of 7. Pick a visible unit wholly within 13\". For the rest of the battle, add 1 Attack to its melee weapons and it cannot heal or return slain models. If replaced, a single-model replacement is allocated half its remaining Health in damage; a multi-model replacement has half its models slain, rounding up.",
      },
    ],
    details: {
      notes: "Legal for matched play with the General's Handbook 2026-27 battlepack.",
    },
  }),
];

export default scourgeUnits;
