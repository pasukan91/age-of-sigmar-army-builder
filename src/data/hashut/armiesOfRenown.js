const trait = (id, name, phase, description, type = "Ability") => ({
  id, name, phase, description, type, points: 0,
});

export default [
  {
    id: "taars-grand-forgehost",
    name: "Taar's Grand Forgehost",
    rosterRules: "You must include Urak Taar. You must include a Daemonsmith or Ashen Elder. You can include non-Hobgrot Helsmiths of Hashut Infantry units and any Helsmiths of Hashut War Machines. You cannot include Regiments of Renown.",
    battleTraits: [
      trait("rising-fire", "Rising Fire", "Passive", "The effects are cumulative by battle round: in round 2, friendly units gain Crit (2 Hits); in round 3, add 1 to casting and chanting rolls; in round 4, attacks score critical hits on unmodified hit rolls of 5+; in round 5, add 1 to the power level of friendly Wizards and Priests.", "Passive"),
      trait("masterful-daemonworks", "Masterful Daemonworks", "Passive", "Friendly Grand Forgehost War Machines have Ward (6+).", "Passive"),
      trait("ranks-unbroken", "Dread Ranks Unbroken", "Your Movement Phase", "Pick a destroyed friendly Grand Forgehost Infantry unit. Set up an identical replacement unit with half the number of models, rounding up, wholly within 6\" of a terrain feature and more than 9\" from all enemies.", "Once Per Turn (Army)"),
    ],
    heroicTraits: [
      trait("ruthless-overseer", "Ruthless Overseer", "Passive", "Each time a friendly Grand Forgehost unit wholly within 12\" uses the Rally command, make 3 additional rally rolls.", "Passive"),
    ],
    artefacts: [
      trait("talisman-obsidian", "Talisman of Obsidian", "Passive", "Subtract 1 from hit rolls for attacks that target the bearer.", "Passive"),
    ],
    spellLores: [{
      id: "reinforce-daemonsteel",
      name: "Reinforce Daemonsteel",
      castingValue: 7,
      phase: "Your Hero Phase",
      description: "Casting value 7, Unlimited. Until your next turn, ignore the first damage point allocated in each phase to friendly Grand Forgehost units wholly within 12\" of the caster.",
    }],
    prayerLores: [
      { id: "grasp-stone", name: "Grasp of Stone", chantingValue: 4, phase: "Your Hero Phase", description: "Chanting value 4, Unlimited. Pick a visible point within 18\". Until your next turn, subtract 1 from the Attacks characteristic of melee weapons used by enemy units wholly within 6\" of that point; on an 8+, they also have Strike-last." },
      { id: "shackling-curse", name: "Shackling Curse", castingValue: 6, phase: "Your Hero Phase", description: "Casting value 6. Pick a visible enemy unit within 18\". Subtract 1 from the Attacks characteristic of its melee weapons until your next turn." },
      { id: "lava-storm", name: "Lava Storm", chantingValue: 5, phase: "Your Hero Phase", description: "Chanting value 5. Pick a visible enemy unit within 18\". If the chanting roll was 7+, pick an additional enemy unit. Inflict D3 mortal damage on each target." },
    ],
  },
  {
    id: "ziggurat-stampede",
    name: "Ziggurat Stampede",
    rosterRules: "You must include a Daemonsmith on Infernal Taurus. You can include any Helsmiths of Hashut Cavalry and Automaton units. You cannot include Regiments of Renown.",
    battleTraits: [
      trait("let-realms-tremble", "Let the Realms Tremble", "Passive", "Add X to charge rolls for friendly Ziggurat Stampede units, where X is the number of other friendly Ziggurat Stampede units that have already charged this phase.", "Passive"),
      trait("break-them", "Break Them, One and All...!", "Passive", "Any number of friendly Ziggurat Stampede units can use the Power Through command in the same turn.", "Passive"),
      trait("run-roughshod", "Run Roughshod", "Your Movement Phase", "Pick a friendly Ziggurat Stampede unit in combat. It can use Shoot and/or Charge abilities this turn even if it used a Retreat ability, and it does not suffer retreating damage.", "Once Per Turn (Army)"),
    ],
    heroicTraits: [
      trait("raging-animus", "Raging Animus", "Passive", "Each time an unmodified save roll of 1 is made for this unit against a combat attack, inflict D3 mortal damage on the attacking unit after the Fight ability has been resolved.", "Passive"),
    ],
    artefacts: [
      trait("visage-great-bull", "Visage of the Great Bull", "Passive", "During the charge phase, add 1 to the number of dice rolled when making charge rolls for the bearer, to a maximum of 3.", "Passive"),
    ],
    spellLores: [
      { id: "searing-detonation", name: "Searing Detonation", castingValue: 6, phase: "Your Hero Phase", description: "Casting value 6, Unlimited. Pick each enemy unit in combat with the caster. Roll a D3 for each target; on a 2+, inflict mortal damage equal to the roll." },
      { id: "flaming-weapons", name: "Flaming Weapons", castingValue: 7, phase: "Your Hero Phase", description: "Casting value 7. Pick a friendly Ziggurat Stampede unit wholly within 12\". Add 1 to the Rend characteristic of its melee weapons until your next turn." },
      { id: "burn-to-ash", name: "Burn to Ash", castingValue: 8, phase: "Your Hero Phase", description: "Casting value 8. Pick a visible enemy unit or Faction Terrain feature within 18\". If the target is Faction Terrain, abilities on that terrain feature's warscroll have no effect until your next turn." },
    ],
  },
];
