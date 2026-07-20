const scourgeHeroicTraits = [
  {
    id: "agonisingly-elusive",
    name: "Agonisingly Elusive",
    source: "Aqshy",
    points: 0,
    type: "Any Movement Phase",
    phase: "Any Movement Phase",
    keywords: ["Core", "Move"],
    description:
      "Declare: Pick an enemy unit in combat with this unit.\n\nEffect: If it is your turn, apply the effect below. If it is your opponent's turn, roll a dice and apply the effect below on a 3+.\n\nInflict D3 mortal damage on the target. Then, this unit must move up to its Move characteristic. It can pass through the combat ranges of enemy units but cannot end that move in combat.",
  },
  {
    id: "incensed",
    name: "Incensed",
    source: "Aqshy",
    points: 0,
    type: "Once Per Battle (Army)",
    phase: "Your Hero Phase",
    keywords: [],
    description:
      "Declare: Pick an objective within 6\" of this unit to be the target.\n\nEffect: Until the start of your next turn, while every model in a friendly Hedonites of Slaanesh unit is contesting the target, that unit is not visible to enemy units more than 9\" away from it.",
  },
  {
    id: "arcane-magnetism",
    name: "Arcane Magnetism",
    source: "Aqshy",
    points: 0,
    type: "Any Combat Phase",
    phase: "Any Combat Phase",
    keywords: [],
    description:
      "Effect: If this unit has 3 or more damage points, it can use a Spell ability as if it were your hero phase. If it does so, treat that ability as if it had the Unlimited keyword and treat this unit as if it had Wizard (1).",
  },
];

const allConsumingObsessions = [
  {
    id: "obsession-with-control",
    name: "Obsession with Control",
    source: "Aqshy",
    points: 10,
    type: "Deployment Phase",
    phase: "Deployment Phase",
    description:
      "Declare: Pick an objective to be the target.\n\nEffect: For the rest of the battle, while this unit is contesting the target, it has Ward (5+) and add 5 to its control score.",
  },
  {
    id: "obsession-with-form",
    name: "Obsession with Form",
    source: "Aqshy",
    points: 10,
    type: "Reaction",
    phase: "You declared a Run ability for this unit",
    description:
      "Effect: Subtract 1 from hit rolls for attacks that target this unit for the rest of the turn.",
  },
  {
    id: "obsession-with-pain",
    name: "Obsession with Pain",
    source: "Aqshy",
    points: 10,
    type: "Any Combat Phase",
    phase: "Any Combat Phase",
    description:
      "Effect: If this unit is damaged, spend 1 rage dice. If your opponent's fury level is lower than yours, they increase their fury level by 1, to a maximum of 7. Then, add 1 to the Rend characteristic of this unit's non-Companion melee weapons for the rest of the turn.",
  },
];

const baseRules = {
  unique: false,
  monster: false,
  wizard: 0,
  priest: 0,
  warmaster: false,
};

const scourgeUnits = [
  {
    id: "infernal-enrapturess-scourge-of-aqshy",
    name: "Scourge of Aqshy Infernal Enrapturess",
    imageAlias: "infernal-enrapturess",
    points: 90,
    profile: { move: '6"', health: 5, control: 2, save: "5+", ward: "6+" },
    weapons: [
      {
        name: "Piercing Claw",
        type: "Melee",
        attacks: 5,
        hit: "3+",
        wound: "4+",
        rend: "1",
        damage: "2",
        abilities: [],
      },
    ],
    abilities: [
      {
        type: "Passive",
        icon: "control",
        color: "black",
        phase: null,
        castingValue: null,
        keywords: [],
        lore: null,
        name: "Delightful Defeatism",
        description:
          "Effect: Each time a visible enemy unit within 18\" of this unit uses the Rally command, your opponent makes 3 fewer rally rolls of D6.",
      },
      {
        type: "Once Per Turn (Army)",
        icon: "combat",
        color: "red",
        phase: "Reaction: Opponent declared Eruption of Fury for a visible unit within 12\"",
        castingValue: null,
        keywords: [],
        lore: null,
        name: "Like Nails on a Chalkboard",
        description:
          "Effect: Roll off with your opponent. If you win, pick another friendly or enemy unit in combat with the unit using Eruption of Fury. The unit you picked becomes the target of that ability. Your opponent must spend as many rage dice as possible for that ability, to a maximum of 3.",
      },
    ],
    heroicTrait: null,
    monstrousTrait: null,
    artefact: null,
    allConsumingObsession: null,
    details: {
      models: 1,
      baseSize: "32mm",
      regimentOptions: [],
      notes: "Warscroll de temporada de Scourge of Aqshy. Legal en juego equilibrado con el battlepack General's Handbook 2026-27.",
    },
    keywords: [
      "Hero",
      "Infantry",
      "Ward (6+)",
      "Chaos",
      "Hedonites of Slaanesh",
      "Daemon",
    ],
    rules: { ...baseRules, hero: true, ward: "6+", companion: false },
  },
  {
    id: "blissbarb-seekers-scourge-of-aqshy",
    name: "Scourge of Aqshy Blissbarb Seekers",
    imageAlias: "blissbarb-seekers",
    points: 150,
    profile: { move: '14"', health: 4, control: 1, save: "5+", ward: null },
    weapons: [
      { name: "Seeker Bow", type: "Ranged", range: '12"', attacks: 3, hit: "3+", wound: "4+", rend: "1", damage: "1", abilities: [] },
      { name: "Sybarite Blade", type: "Melee", attacks: 1, hit: "3+", wound: "4+", rend: "0", damage: "1", abilities: [] },
      { name: "Exalted Steed's Poisoned Tongue", type: "Melee", attacks: 3, hit: "3+", wound: "4+", rend: "0", damage: "1", abilities: ["Companion"] },
    ],
    abilities: [
      {
        type: "Once Per Turn (Army)",
        icon: "shooting",
        color: "blue",
        phase: "Any Shooting Phase",
        castingValue: null,
        keywords: [],
        lore: null,
        name: "Numbing Toxins",
        description:
          "Declare: Pick an enemy unit that was damaged by this unit's shooting attacks this turn to be the target.\n\nEffect: For the rest of the turn, the target cannot use reactions and cannot be picked as the target of reactions used by your opponent or by other enemy units.",
      },
    ],
    heroicTrait: null,
    monstrousTrait: null,
    artefact: null,
    allConsumingObsession: null,
    details: {
      models: 5,
      baseSize: "75 × 42mm",
      regimentOptions: [],
      notes: "Warscroll de temporada de Scourge of Aqshy. Legal en juego equilibrado con el battlepack General's Handbook 2026-27.",
    },
    keywords: [
      "Cavalry",
      "Champion",
      "Chaos",
      "Hedonites of Slaanesh",
      "Sybarite",
    ],
    rules: {
      ...baseRules,
      hero: false,
      ward: null,
      companion: true,
      canBeReinforced: true,
    },
  },
];

export { allConsumingObsessions, scourgeHeroicTraits, scourgeUnits };
