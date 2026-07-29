const rule = (id, name, phase, description, type = "Ability", points = 0) => ({
  id, name, phase, description, type, points,
});

export const battleTraits = [
  rule("blighted-regrowth", "Blighted Regrowth", "Your Hero Phase", "If there are no friendly Feculent Gnarlmaws on the battlefield, set one up wholly within 12\" of an objective you control and more than 3\" from enemy units, objectives and other terrain features."),
  rule("blessed-by-the-plaguefather", "Blessed by the Plaguefather", "End of Any Turn", "Once per turn, choose Infect, Spread or Mutate. Infect gives an eligible enemy within 7\" of a friendly Maggotkin unit Diseased (on a 4+ if it is not in combat). Spread gives Diseased to other enemies in the target's combat range. Mutate inflicts 1 mortal damage on every Diseased enemy unit.", "Once Per Turn (Army)"),
  rule("wracked-with-disease", "Wracked with Disease", "End of Any Turn", "Pick every Diseased enemy unit. Inflict D3 mortal damage on each target.", "Once Per Turn (Army)"),
  rule("ceaseless-infectors", "Ceaseless Infectors", "End of Any Turn", "Pick an enemy that was in combat with a friendly Rotbringers unit destroyed this turn. On a 3+, it gains the Diseased keyword.", "Once Per Turn (Army)"),
  rule("burst-pustules", "Burst Pustules", null, "Before the last model in a Diseased enemy unit is removed, roll a die. On a 3+, another enemy within 9\" gains the Diseased keyword.", "Passive"),
  rule("desperate-remedies", "Desperate Remedies", null, "If an ability would heal or return slain models to a Diseased enemy unit, it does neither; instead, that unit loses the Diseased keyword.", "Passive"),
];

export const battleFormations = [
  { id: "tallyband-of-nurgle", name: "Tallyband of Nurgle", description: "Nominate a plague progenitor.", ability: rule("plague-progenitor", "Plague Progenitor", "Deployment Phase", "Once per battle, pick an enemy plague progenitor and roll 2D3. On a 6, or if the roll equals or exceeds its Health, it is Diseased. In round 1 it cannot use or be targeted by healing or model-returning abilities while Diseased. When Spread targets it, also inflict D3 mortal damage on each other enemy in its combat range.", "Once Per Battle (Army)") },
  { id: "plague-cyst", name: "Plague Cyst", description: "Rotbringers draw strength from nearby daemons.", ability: rule("vectors-of-contagion", "Vectors of Contagion", null, "Add 5 to the control scores of friendly non-Hero Rotbringers units while wholly within 12\" of friendly Maggotkin of Nurgle Daemon units.", "Passive") },
  { id: "nurgles-menagerie", name: "Nurgle’s Menagerie", description: "The Garden's beasts carry virulent diseases.", ability: rule("denizens-of-the-garden", "Denizens of the Garden", null, "Companion weapons used by friendly Maggotkin of Nurgle units have Crit (2 Hits).", "Passive") },
  { id: "affliction-cyst", name: "Affliction Cyst", description: "Daemonic blooms invigorate their followers.", ability: rule("filth-laden-daemonic-blooms", "Filth-laden Daemonic Blooms", null, "Each time you make a run roll for a friendly non-Monster Maggotkin of Nurgle Daemon unit, you can change the roll to a 4.", "Passive") },
];

export const heroicTraits = [
  rule("grandfathers-blessing", "Grandfather’s Blessing", "End of Any Turn", "If this unit is in combat with a Diseased enemy unit, Heal (D3) this unit."),
  rule("gift-of-febrile-frenzy", "Gift of Febrile Frenzy", "Any Combat Phase", "Pick a visible friendly non-Hero Maggotkin of Nurgle unit wholly within 12\". On a 3+, add 1 to the Attacks characteristic of its melee weapons for the rest of the turn."),
  rule("overpowering-stench", "Overpowering Stench", "Any Combat Phase", "Pick an enemy in combat with this unit and roll off. If your roll is higher, either ignore positive save modifiers for it or subtract 1 from its ward rolls for the rest of the turn."),
];

export const artefacts = [
  rule("the-witherstave", "The Witherstave", "Any Combat Phase", "Pick an enemy that charged this turn and is in combat with this unit. On a 3+, subtract 1 from the Damage characteristic of its melee weapons for the rest of the turn."),
  rule("the-carrion-dirge", "The Carrion Dirge", "Any Hero Phase", "Once per battle, pick up to 3 enemies within 18\". Subtract 5 from their control scores until your next turn.", "Once Per Battle"),
  rule("rustfang", "Rustfang", "Any Combat Phase", "Pick an enemy Hero or Monster in combat with this unit. Subtract 1 from save rolls for it for the rest of the turn."),
];

export const plaguefathersPoxes = [
  rule("snuggling-sickness", "Snuggling Sickness", "Any Hero Phase", "Pick an enemy in combat with this unit. For the turn, its Retreat abilities fail on an 8+ roll of 2D6 plus its Control, and it cannot be removed and set up elsewhere or placed in reserve.", "Plaguefather’s Pox", 10),
  rule("chuckling-murrain", "Chuckling Murrain", null, "The opponent must spend 1 additional rage die for a unit in combat with this unit to use Eruption of Fury or Fight Through the Pain. The additional die does not count toward the number spent.", "Plaguefather’s Pox", 10),
  rule("the-weeping-flux", "The Weeping Flux", null, "Each time a model in this unit is slain by a combat attack, roll dice equal to this unit's Health characteristic. Each 6 inflicts 1 mortal damage on the attacking unit.", "Plaguefather’s Pox", 10),
];

export const spellLores = [{
  id: "lore-of-malignance", name: "Lore of Malignance", description: "Malign spells of growth, despair and decay.",
  spells: [
    { id: "fleshy-abundance", name: "Fleshy Abundance", castingValue: 6, keywords: ["Unlimited"], description: "Pick a visible friendly Maggotkin of Nurgle unit wholly within 12\". Either Heal (D3) it or subtract 1 from wound rolls for attacks that target it until your next turn." },
    { id: "crippling-despair", name: "Crippling Despair", castingValue: 6, description: "Pick a visible enemy within 18\". It cannot use commands for the rest of the turn." },
    { id: "cloying-quagmire", name: "Cloying Quagmire", castingValue: 7, description: "Pick a visible enemy within 18\". Until your next turn, halve its Move; if its Save is 3+ or better, also subtract 1 from its run and charge rolls." },
  ],
}];

export const prayerLores = [{
  id: "lore-of-virulence", name: "Lore of Virulence", description: "Virulent blessings of the Plague God.",
  prayers: [
    { id: "gift-of-disease", name: "Gift of Disease", chantingValue: 3, keywords: ["Unlimited"], description: "Until your next turn, subtract 1 from wound rolls for attacks made by enemies in combat with the chanter. In addition, on a 10+, each enemy in combat with the chanter becomes Diseased." },
    { id: "favoured-poxes", name: "Favoured Poxes", chantingValue: 4, description: "Pick an enemy within 18\". Until your next turn, subtract 2 from its charge rolls; on a chanting roll of 10+, subtract 1 from the number of dice rolled for its charge instead, to a minimum of 1." },
    { id: "bloated-with-sickness", name: "Bloated with Sickness", chantingValue: 4, description: "Pick a friendly non-Monster Maggotkin of Nurgle unit wholly within 12\". Until your next turn, ignore the first damage point allocated to it in each phase. On a 10+, pick a second target." },
  ],
}, {
  id: "benedictions-of-sickness", name: "Benedictions of Sickness", description: "Scourge of Aqshy prayer lore.",
  prayers: [
    { id: "febrile-advance", name: "Febrile Advance", chantingValue: 3, keywords: ["Unlimited"], description: "Pick a friendly Maggotkin of Nurgle unit wholly within 12\". Until your next turn, add 3\" to its pile-in moves. On a 6+, pick a second target." },
    { id: "blunting-blight", name: "Blunting Blight", chantingValue: 5, description: "Pick an enemy within 18\". Until your next turn, its attacks cannot score critical hits. On a 10+, pick a second target." },
    { id: "agonising-vomiting", name: "Agonising Vomiting", chantingValue: 4, description: "Pick an enemy within 18\" and roll 7 dice. Add 1 to each roll if it is Diseased and add 1 if the chanting roll was 7+. Each 5+ inflicts 1 mortal damage." },
  ],
}];
