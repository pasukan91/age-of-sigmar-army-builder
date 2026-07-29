const rule = (id, name, phase, description, type = "Ability") => ({ id, name, phase, description, type, points: 0 });

export const battleTraits = [
  rule("harness-daemonic-power", "Harness Daemonic Power", "Start of Your Turn", "Remove all of your daemonic power points (DPP). Gain 1 DPP for each friendly desolation token, then distribute them among friendly non-Hobgrot Helsmiths of Hashut units, to a maximum of 3 per unit. Any unallocated points are lost.", "Once Per Turn (Army)"),
  rule("reserves-daemonic-power", "Reserves of Daemonic Power", "Any Hero Phase", "Spend 1 command point and pick a friendly non-Hobgrot Helsmiths of Hashut unit that has 0 DPP. Give 2 DPP to the target.", "Once Per Turn (Army), Command"),
  rule("leave-land-in-ruin", "Leave the Land in Ruin", "Start of Any Turn", "Pick a terrain feature or objective that does not have a friendly desolation token and is contested by a friendly Helsmiths of Hashut unit that is not in combat. Place a friendly desolation token on it.", "Once Per Turn (Army)"),
];

export const battleFormations = [
  rule("hashutite-host", "Hashutite Host — Amassed Legions", "Passive", "Each time a friendly Helsmiths of Hashut Infantry unit with 3 DPP uses the Rally command, make 3 additional rally rolls."),
  rule("castigation-battery", "Castigation Battery — Experimental Munitions", "Passive", "Add 1 to the Attacks characteristic of ranged weapons used by friendly Helsmiths of Hashut War Machines with 3 DPP."),
  rule("bullfathers-horns", "Bullfather's Horns — Bulls of the Ziggurat", "Passive", "Add 2\" to the Move characteristic of friendly Helsmiths of Hashut Cavalry and Monsters with 3 DPP."),
  rule("daemonsmith-cabal", "Daemonsmith Cabal — Arcane Dominance", "Passive", "Add 1 to casting, unbinding, banishment and chanting rolls for friendly Helsmiths of Hashut Wizards and Priests with 3 DPP."),
];

export const heroicTraits = [
  rule("servile-automaton", "Servile Automaton", "Deployment Phase", "Pick a friendly Helsmiths of Hashut Automaton in this unit's combat range to be its bodyguard. While the bodyguard remains in combat range, it has Strike-first while this Hero is in combat and, if this Hero is Infantry, this Hero has Ward (5+)."),
  rule("fire-you-worms", "Fire, You Worms!", "Enemy Charge Phase", "Pick a friendly Helsmiths of Hashut Infantry unit wholly within 12\" that is not in combat and was charged this phase. The target can use a Shoot ability against the charging unit, but unmodified hit rolls of 1-5 fail."),
  rule("eye-for-weakness", "An Eye for Weakness", "Your Hero Phase", "Pick an enemy unit within 18\". Until your next turn, add 1 to wound rolls for combat attacks made by friendly Helsmiths of Hashut units that target it."),
];

export const artefacts = [
  rule("scroll-petrification", "Scroll of Petrification", "Any Hero Phase", "Once per battle, pick a friendly Helsmiths of Hashut unit wholly within 12\". It has Ward (2+) for the rest of the turn, but cannot use non-passive abilities or be picked by friendly abilities. Enemy units can ignore it for movement, charging and set-up purposes."),
  rule("crucible-spite", "Crucible of Spite", "Your Hero Phase", "Once per battle, give the bearer up to 3 DPP. It cannot receive any more DPP for the rest of the battle."),
  rule("gauntlets-punishment", "Gauntlets of Punishment", "Your Shooting Phase", "Pick an enemy unit within 12\" and roll a D3. On a 2+, inflict mortal damage equal to the roll."),
];

export const spellLores = [{
  id: "lore-hashut", name: "Lore of Hashut", spells: [
    { ...rule("hateful-fractures", "Hateful Fractures", "Your Hero Phase", "Casting value 6, Unlimited. Pick an enemy unit within 18\". Halve its Move characteristic until your next turn."), castingValue: 6 },
    { ...rule("ashen-smog", "Ashen Smog", "Your Hero Phase", "Casting value 7. Pick a visible terrain feature within 18\" that has a friendly desolation token. It has Obscuring until your next turn. For each enemy contesting it, roll a D3; on a 2+, inflict mortal damage equal to the roll."), castingValue: 7 },
    { ...rule("molten-metal", "Molten Metal", "Your Hero Phase", "Casting value 8. Pick an enemy unit within 18\" and roll a number of dice equal to the unmodified casting roll. For each roll that equals or exceeds the target's Save characteristic, inflict 1 mortal damage."), castingValue: 8 },
  ],
}];

export const prayerLores = [{
  id: "prayers-hashut", name: "Prayers of Hashut", prayers: [
    { ...rule("black-flames", "Black Flames", "Your Hero Phase", "Chanting value 4, Unlimited. Pick an enemy unit within 12\" and roll a dice for each model in it. Each 5+ inflicts 1 mortal damage, or each 4+ if the chanting roll was 8+."), chantingValue: 4 },
    { ...rule("furnace-blessing", "Furnace Blessing", "Your Hero Phase", "Chanting value 4. Pick a friendly Helsmiths of Hashut unit wholly within 12\". Add 1 to the Rend characteristic of its melee weapons for the rest of the turn; on an 8+, they also have Crit (Mortal)."), chantingValue: 4 },
    { ...rule("storm-obsidian-shards", "Storm of Obsidian Shards", "Your Hero Phase", "Chanting value 5. Pick an enemy unit within 18\". Inflict D3 mortal damage and subtract 3 from its Control characteristic for the rest of the turn. On a 10+, pick a second target."), chantingValue: 5 },
  ],
}];

export const aqshyArtefacts = [
  rule("gem-utorak", "Gem of Utorak", "Your Hero Phase", "Once per battle, if the bearer is not a Wizard, it becomes Wizard (2) until your next turn. If it is already a Wizard, add 1 to its power level and D3 to its casting rolls until your next turn."),
  rule("casque-belittlement", "Casque of Belittlement", "Any Combat Phase", "Pick an enemy unit in combat with the bearer and roll a number of dice equal to the bearer's fury level, plus 1 dice for each charge it made. Each 3+ inflicts 1 mortal damage."),
  rule("horn-bullfather", "Horn of the Bullfather", "Deployment Phase", "Remove the bearer and, optionally, a visible friendly Hobgrot Vandalz unit. Set them up wholly within 7\" of a battlefield edge and more than 9\" from all enemies."),
];

export const accursedDevices = [
  { id: "infernal-motivators", name: "Infernal Motivators", points: 20, phase: "Passive", description: "Add 2\" to this unit's Move characteristic." },
  { id: "earthwrack-stabilisers", name: "Earthwrack Stabilisers", points: 10, phase: "Passive", description: "Add 1 to the Rend characteristic of this unit's melee weapons if it did not charge this turn." },
  { id: "bullfathers-scorn", name: "Bullfather's Scorn", points: 10, phase: "Your Shooting Phase", description: "Spend fury: this unit's ranged weapons have Crit (2 Hits) until your next turn. If they already have that ability, critical hits are scored on unmodified hit rolls of 5+ instead." },
];
