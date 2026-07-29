export const battleTraits = [
  {
    id: "all-part-of-the-plan", name: "All Part of the Plan", type: "Passive", phase: null,
    description: "Start with 0 fate points. Gain 1 each time you lose priority, a friendly spell is unbound, a friendly unit miscasts, your opponent takes an objective you controlled at the start of the turn, or a friendly Argent Shard is demolished.",
  },
  {
    id: "eldritch-illusions", name: "Eldritch Illusions", type: "Once Per Battle (Army)", phase: "Deployment Phase",
    description: "Pick up to 3 friendly non-Monster units on the battlefield. Remove them and set them up in reserve masked by illusion. Masked units are destroyed at the end of the fifth battle round.",
  },
  {
    id: "silver-simulacrum", name: "Silver Simulacrum", type: "Once Per Battle (Army)", phase: "Deployment Phase",
    description: "If a friendly Argent Shard is on the battlefield, set up 1 additional Argent Shard wholly within friendly territory and more than 3\" from objectives and terrain.",
  },
  {
    id: "smoke-and-mirrors", name: "Smoke and Mirrors", type: "Once Per Turn (Army)", phase: "Any Hero Phase",
    description: "Pick a friendly non-Monster unit that was not set up this turn and was not set up with this ability in the previous turn, then pick a friendly unit masked by illusion as its substitute. Set up the substitute wholly within 6\" and out of combat, then place the target in reserve masked by illusion.",
  },
  {
    id: "destined-to-serve", name: "Destined to Serve", type: "Passive", phase: null,
    description: "Before allocating damage to a friendly unit, spend any number of fate points; remove 1 damage point from its damage pool for each point spent.",
  },
  {
    id: "destined-arcana", name: "Destined Arcana", type: "Reaction", phase: "You declared a Spell ability",
    description: "Spend any number of fate points. Add 1 to the casting roll for each point spent.",
  },
  {
    id: "destined-for-battle", name: "Destined for Battle", type: "Reaction", phase: "You declared a Charge ability in your turn",
    description: "Spend any number of fate points. Add 1 to the charge roll for each point spent.",
  },
];

export const battleFormations = [
  {
    id: "fated-blades", name: "Fated Blades", description: "A charge of 9+ unlocks a preordained assault.",
    ability: { name: "Cometh the Hour", type: "Passive", phase: null, description: "If a friendly unit makes a charge roll of 9+, add 1 to the Attacks of its melee weapons for the rest of the turn." },
  },
  {
    id: "malevolent-schemers", name: "Malevolent Schemers", description: "Mark a sacrifice whose death advances the plan.",
    ability: { name: "Inevitable Ending", type: "Once Per Turn (Army)", phase: "Start of Any Turn", description: "Pick a friendly or enemy unit. If it is destroyed this turn, gain 1 fate point." },
  },
  {
    id: "denizens-of-the-silver-towers", name: "Denizens of the Silver Towers", description: "Spent fate can flow back to the army.",
    ability: { name: "Twist of Fate", type: "Passive", phase: null, description: "After a friendly unit spends fate points on an ability, roll a die; on 4+, gain 1 fate point. Also roll after Destined to Serve removes damage." },
  },
  {
    id: "mutants-and-mad-things", name: "Mutants and Mad Things", description: "Masked units arrive from unexpected directions.",
    ability: { name: "Hideous Unpredictability", type: "Once Per Turn (Army)", phase: "Your Movement Phase", description: "Set up a friendly masked unit wholly within 6\" of a battlefield edge and more than 9\" from enemies." },
  },
];

export const heroicTraits = [
  {
    id: "silver-summoner", name: "Silver Summoner", source: "Battletome", points: 0, type: "Your Movement Phase", phase: "Your Movement Phase",
    description: "Pick a destroyed friendly non-Warflock Arcanite unit. Set up a half-strength replacement more than 9\" from enemies and wholly within 12\" of a visible friendly Argent Shard.",
  },
  {
    id: "grand-illusionist", name: "Grand Illusionist", source: "Battletome", points: 0, type: "Any Hero Phase", phase: "Any Hero Phase",
    description: "If this unit was set up this turn, it can move D3\" without passing through or ending in enemy combat range.",
  },
  {
    id: "devolving-aura", name: "Devolving Aura", source: "Battletome", points: 0, type: "Any Hero Phase", phase: "Any Hero Phase",
    description: "Pick a visible enemy within 12\". Roll a die, adding 1 if it was damaged this phase. On 3+, its maximum control score is 1 until your next turn.",
  },
];

export const artefacts = [
  { id: "fate-slicer", name: "Fate Slicer", source: "Battletome", points: 10, type: "End of Any Turn", phase: "End of Any Turn", description: "Gain 1 fate point if any models were slain by this unit this turn." },
  { id: "cloaked-in-wyrdflame", name: "Cloaked in Wyrdflame", source: "Battletome", points: 0, type: "Passive", phase: null, description: "Subtract 1 from wound rolls for attacks that target this unit." },
  { id: "kairic-tome", name: "Kairic Tome", source: "Battletome", points: 20, type: "Reaction", phase: "You declared a Spell ability", description: "Add 1 to or subtract 1 from the casting roll. It can be used more than once per phase but only once per spell." },
];

export const aqshyArtefacts = [
  { id: "tome-of-scorched-insight", name: "Tome of Scorched Insight", source: "Aqshy", points: 20, type: "Reaction", phase: "You declared a non-Summon Spell ability", description: "Change the casting roll to an unmodifiable 12. That spell cannot be unbound, but this unit cannot use it again for the rest of the battle." },
  { id: "the-five-verses-of-volarian", name: "The Five Verses of Volarian", source: "Aqshy", points: 0, type: "Passive", phase: null, description: "This unit has Move 14\" and Fly." },
  { id: "the-searing-eye", name: "The Searing Eye", source: "Aqshy", points: 0, type: "Reaction", phase: "You declared a Spell ability for a friendly unit wholly within 12\"", description: "Spend 1 rage die, increasing the opponent's fury if required. Roll a die: if it matches any casting die, the spell miscasts; otherwise add it to the casting roll." },
];

export const visionsOfFate = [
  { id: "vision-of-defiant-supremacy", name: "Vision of Defiant Supremacy", source: "Aqshy", points: 10, type: "Once Per Battle", phase: "Any Hero Phase", description: "If you won priority and took the first turn, or the opponent seized the initiative, this unit has Strike-first for the turn." },
  { id: "vision-of-destined-conquest", name: "Vision of Destined Conquest", source: "Aqshy", points: 30, type: "Once Per Battle", phase: "Start of Your Turn", description: "If contesting an objective you control wholly outside friendly territory, gain fate points equal to your command points if underdog; otherwise roll a die per command point and gain one for each 3+." },
  { id: "vision-of-arcane-sacrifice", name: "Vision of Arcane Sacrifice", source: "Aqshy", points: 20, type: "Passive", phase: null, description: "Units within 6\" add 1 to unbinding rolls and miscast on unmodified casting rolls of 4 or less. The first time this unit is destroyed, gain D6 fate points." },
];

export const spellLores = [
  {
    id: "lore-of-fate", name: "Lore of Fate", description: "Manipulation of fate and concealment.",
    spells: [
      { id: "infernal-gateway", name: "Infernal Gateway", castingValue: 6, keywords: ["Unlimited"], description: "Pick an enemy within 18\" not targeted by this spell this turn. Roll 5 dice or dice equal to your fate points; each 4+ inflicts 1 mortal damage." },
      { id: "wyrdflame-haze", name: "Wyrdflame Haze", castingValue: 6, description: "Until your next turn, friendly units wholly within 12\" of a friendly unit set up this turn are not visible to enemies more than 12\" away." },
      { id: "shield-of-fate", name: "Shield of Fate", castingValue: 7, description: "A visible friendly unit wholly within 12\" has Ward (5+) and enemies subtract 1 from hit rolls against it until your next turn." },
    ],
  },
  {
    id: "lore-of-change", name: "Lore of Change", description: "Transformative and reality-warping magic.",
    spells: [
      { id: "bolt-of-tzeentch", name: "Bolt of Tzeentch", castingValue: 7, keywords: ["Unlimited"], description: "An enemy within 18\" suffers D3 mortal damage and subtracts 1 from wound rolls for its attacks until your next turn." },
      { id: "fold-reality", name: "Fold Reality", castingValue: 6, description: "Optionally place a friendly non-Monster unit wholly within 12\" in reserve masked by illusion, and/or deploy a masked unit wholly within 12\" and more than 9\" from enemies." },
      { id: "transformed-to-spawn", name: "Transformed to Spawn", castingValue: 6, description: "Inflict D3 mortal damage on an enemy within 18\". If a model is slain, set up a masked Chaos Spawn in combat with that target only." },
    ],
  },
];
