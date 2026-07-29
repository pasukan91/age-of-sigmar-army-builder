const rule = (id, name, phase, description, type = "Ability") => ({ id, name, phase, description, type, points: 0 });

export const battleTraits = [
  rule("blood-drenched", "Blood-drenched", "Reaction: You declared Skulls for the Skull Throne", "After resolving Skulls for the Skull Throne, if you unlocked a Blood Tithe ability this turn, pick a friendly Blades of Khorne unit. For the rest of the battle: ignore positive modifiers to its save rolls; if it is Bloodbound, its Blood-hungry weapons gain Crit (Mortal); if it is a non-Monster Daemon, its Blood-hungry weapons, including Companion weapons, gain +1 Rend; if it is a Monster, its Blood-hungry weapons gain +1 Damage.", "Once Per Turn, Reaction"),
  rule("blood-for-the-blood-god", "Blood for the Blood God", "Passive", "Gain 1 blood tithe point each time a friendly or enemy unit is destroyed. Blood tithe points are spent to permanently unlock Blood Tithe abilities."),
  rule("skulls-for-the-skull-throne", "Skulls for the Skull Throne", "Start of Any Turn", "Spend the indicated number of blood tithe points to unlock an available Blood Tithe ability.", "Once Per Turn (Army)"),
  rule("murderlust", "Murderlust — 0", "Any Charge Phase", "Reaction to a friendly charge: replace one of the charge dice with a new roll. If you do so, after that unit charges, it suffers D3 mortal damage.", "Once Per Turn (Army), Blood Tithe"),
  rule("divine-scorn", "Divine Scorn — 1", "Start of Any Turn", "Pick up to 3 enemy Wizards or Priests within 6\" of friendly Khorne units. On a 3+, subtract 1 from the target's power level until the start of your next turn (to a minimum of 0).", "Blood Tithe"),
  rule("punish-the-pacifist", "Punish the Pacifist — 1", "Your Combat Phase", "Roll a dice for each enemy unit and manifestation that is not in combat and for each friendly unit that is not in combat. On a 1-2, the friendly unit suffers 1 mortal damage; on a 3+, the enemy unit or manifestation suffers 1 mortal damage.", "Once Per Turn (Army), Blood Tithe"),
  rule("murder-the-mystic", "Murder the Mystic — 2", "Your Hero Phase", "Requires Divine Scorn. Make a banishment roll for up to 4 enemy manifestations. Each manifestation banished by this ability inflicts D3 mortal damage on each enemy unit within 3\" of it.", "Once Per Turn (Army), Blood Tithe"),
  rule("glorious-combat-or-naught", "Glorious Combat or Naught — 2", "Passive", "Requires Divine Scorn or Punish the Pacifist. Subtract 1 from hit rolls for shooting attacks that target friendly Khorne units.", "Blood Tithe"),
  rule("revel-in-battle", "Revel in Battle — 3", "Passive", "Requires Punish the Pacifist. Weapon abilities other than Companion have no effect on combat attacks made by enemy units that charged a Khorne unit this turn.", "Blood Tithe"),
  rule("slaughter-triumphant", "Slaughter Triumphant — 4", "Passive", "Requires Glorious Combat or Naught or Murder the Mystic. Add 1 to the Attacks characteristic of weapons used by friendly Khorne units that charged this turn.", "Blood Tithe"),
  rule("cleave-wide-the-grin", "Cleave Wide the Grin — 4", "Passive", "Requires Revel in Battle or Glorious Combat or Naught. Add 1 to hit rolls for combat attacks made by friendly Khorne units.", "Blood Tithe"),
];

export const battleFormations = [
  rule("khornate-legion", "Khornate Legion — Butchers of Nations", "Any Combat Phase", "After a friendly Daemon unit uses a Fight ability, pick a friendly Bloodbound unit wholly within 12\" of it that has not used a Fight ability this phase to use a Fight ability immediately after the first has been resolved.", "Once Per Turn (Army), Reaction"),
  rule("brass-stampede", "Brass Stampede — Drawn to Carnage", "Passive", "Add X to charge rolls for friendly Khorne units, where X is the number of friendly Khorne Cavalry or Monster units wholly within 12\" that have charged in the same phase."),
  rule("bloodbound-warhorde", "Bloodbound Warhorde — Tireless Conquerors", "Passive", "Add 1 to hit rolls for combat attacks made by friendly Bloodbound units that target enemy units contesting an objective you do not control."),
  rule("murderhost", "Murderhost — Eager Killers", "End of Your Turn", "Each friendly Daemon unit that used a Fight ability this turn and is no longer in combat can move D6\". It cannot end that move in combat."),
];

export const heroicTraits = [
  rule("magical-scorn", "Magical Scorn", "Passive", "Subtract 1 from casting and chanting rolls for enemy Wizards and Priests within 12\" of the bearer."),
  rule("frenzied-taskmaster", "Frenzied Taskmaster", "Your Movement Phase", "Pick a friendly Khorne Infantry or Cavalry unit within the bearer's combat range that is not in combat. That unit can move D6\" but cannot end that move in combat. If it ends the move within the bearer's combat range, inflict mortal damage on it equal to the roll."),
  rule("skull-collector", "Skull Collector", "End of Any Turn", "If the bearer destroyed an enemy Hero with combat attacks this turn, add 1 to the Attacks characteristic of the bearer's combat weapons for the rest of the battle. This effect is cumulative."),
];

export const artefacts = [
  rule("collar-of-contempt", "Collar of Contempt", "Passive", "The bearer can use Unbind abilities as if it had Wizard (1). Each time the bearer successfully unbinds a spell, the caster suffers D3 mortal damage."),
  rule("butchers-blade", "Butcher's Blade", "End of Your Turn", "For each enemy unit damaged by the bearer's combat attacks this turn, on a 2+, inflict D3 mortal damage on that unit."),
  rule("argath", "Ar'gath, the King of Blades", "Passive", "Enemy Heroes in combat with the bearer cannot make ward rolls."),
];

export const prayerLores = [{
  id: "blood-blessings-of-khorne", name: "Blood Blessings of Khorne", prayers: [
    { ...rule("uncontrollable-rage", "Uncontrollable Rage", "Your Hero Phase", "Chanting value 4, Unlimited. Pick a friendly unit wholly within 12\" to gain the effects of Blood-drenched until the start of your next turn. If the chanting roll was 8+, it also ignores Wild-eyed Brutality."), chantingValue: 4 },
    { ...rule("blood-boil", "Blood Boil", "Your Hero Phase", "Chanting value 4. Roll a dice for each model in an enemy unit visible to the chanter and within 18\". For each 5+, inflict 1 mortal damage on that unit. If the chanting roll was 8+, also subtract 1 from wound rolls for that unit's attacks until the start of your next turn."), chantingValue: 4 },
    { ...rule("final-act-of-violence", "Final Act of Violence", "Your Hero Phase", "Chanting value 4. Until the start of your next turn, each time a model in the target Khorne unit is slain by a combat attack, roll a dice, or 2 dice if the chanting roll was 8+. For each 5+, after the attacking unit's Fight ability is resolved, inflict 1 mortal damage on it."), chantingValue: 4 },
  ],
}];

export const aqshyPrayerLores = [{
  id: "proclamations-of-slaughter", name: "Proclamations of Slaughter", prayers: [
    { ...rule("fetters-of-blood", "Fetters of Blood", "Your Hero Phase", "Chanting value 4. Pick an enemy unit within 18\". Until the start of your next turn, it cannot use Run or Retreat abilities or be removed from the battlefield and set up again. If the chanting roll was 8+, pick a second target."), chantingValue: 4 },
    { ...rule("stoke-the-flames", "Stoke the Flames", "Your Hero Phase", "Chanting value 3, Unlimited. Until the start of your next turn, your opponent cannot spend rage dice to use Fight Through the Pain for the target unit. If that unit is destroyed, gain 1 rage die, or 2 if the chanting roll was 6+."), chantingValue: 3 },
    { ...rule("gift-of-apoplexy", "Gift of Apoplexy", "Your Hero Phase", "Chanting value 3. Until the start of your next turn, after the target enemy unit uses an ability other than Move or Fight, it suffers D3 mortal damage, or 3 mortal damage if the chanting roll was 8+."), chantingValue: 3 },
  ],
}];

export const brazenMutations = [
  { id: "brass-flesh", name: "Brass Flesh", points: 20, phase: "Passive", description: "Unmodified save rolls of 5+ for this unit cannot fail." },
  { id: "blade-limbs", name: "Blade-limbs", points: 20, phase: "Passive", description: "When this unit uses Eruption of Fury, for each unmodified hit roll of 6, inflict 3 additional mortal damage on each enemy unit in combat with it instead of D3." },
  { id: "scorpion-tails", name: "Scorpion Tails", points: 10, phase: "Any Combat Phase", description: "Pick an enemy unit in combat with this unit to suffer D3 mortal damage. If that enemy unit had a starting size of 1, also subtract 1 from wound rolls for its combat attacks this turn." },
];
