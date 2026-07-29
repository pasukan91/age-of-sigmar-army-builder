const rule = (id, name, phase, description, type = "Ability", points = 0, source = null) => ({
  id, name, phase, description, type, points, ...(source ? { source } : {}),
});

export const battleTraits = [
  rule("eye-of-the-gods", "Eye of the Gods", "Deployment Phase", "Once per battle, pick a friendly non-Unique Warriors of Chaos or Darkoath Hero. It gains D3 Apotheosis points each time it uses a Fight ability and at the end of each of your turns if it is contesting an objective wholly outside friendly territory."),
  rule("dark-apotheosis", "Dark Apotheosis", "Any Hero Phase", "Once per battle, pick a friendly unit with 8 or more Apotheosis points. It can either Heal all damage allocated to it and gain Ward (5+) for the rest of the battle, or be replaced by a Daemon Prince that inherits its status as general, enhancements and Pledge to Chaos. Remove any manifestations summoned by the target. If it was your general, the Daemon Prince becomes your general and is added to its regiment.", "Once Per Battle (Army)"),
  rule("pledge-to-chaos", "Pledge to Chaos", "Your Hero Phase", "Once per turn, pick a friendly non-Unique Slaves to Darkness unit that does not already have a pledge. It gains Pledged to Khorne, Tzeentch, Nurgle or Slaanesh for the rest of the battle.", "Once Per Turn (Army)"),
  rule("pledged-to-khorne", "Pledged to Khorne", "Passive", "Add 1 to the Attacks characteristic of combat weapons used by friendly Pledged to Khorne units."),
  rule("pledged-to-tzeentch", "Pledged to Tzeentch", "Your Movement Phase", "Once per turn, roll 2D6 and pick a friendly Pledged to Tzeentch unit. Remove it from the battlefield and set it up wholly within 6\" of a point within the distance rolled and more than 9\" from all enemy units.", "Once Per Turn (Army)"),
  rule("pledged-to-nurgle", "Pledged to Nurgle", "Passive", "Friendly Pledged to Nurgle units have Ward (6+), or Ward (5+) if they already had Ward (6+)."),
  rule("pledged-to-slaanesh", "Pledged to Slaanesh", "Your Charge Phase", "When making a charge roll for a friendly Pledged to Slaanesh unit, you can roll 1 additional dice, to a maximum of 3. If you do so, discard 1 dice of your choice."),
];

export const battleFormations = [
  rule("legion-of-chaos", "Legion of Chaos - United in Darkness", "Passive", "While there is at least 1 friendly Warriors of Chaos Hero and at least 1 other friendly Daemon or Darkoath Hero on the battlefield, add 2 to the control scores of friendly Slaves to Darkness units contesting objectives wholly outside friendly territory."),
  rule("godswrath-warband", "Godswrath Warband - Ironclad Onslaught", "End of Your Turn", "Pick an objective contested by a friendly unit and place a defiled token beside it. For each enemy unit contesting a defiled objective, roll a D3. On a 2+, inflict mortal damage on that unit equal to the roll.", "Once Per Turn (Army)"),
  rule("despoilers", "Despoilers - Feral Ruin", "End of Your Turn", "Pick a friendly Daemon Prince and a visible friendly non-Daemon, non-Unique Slaves to Darkness unit wholly within 12\". Remove that unit's Pledge to Chaos keywords and give it the Pledge to Chaos keywords that the Daemon Prince has.", "Once Per Turn (Army)"),
  rule("darkoath-horde", "Darkoath Horde - Rally the Tribes", "Your Movement Phase", "Spend 1 command point. If there is a friendly Darkoath Hero on the battlefield, pick a friendly non-Hero, non-Unique Darkoath unit that has been destroyed. On a 3+, set up a replacement unit with half the number of models wholly within 6\" of a battlefield edge and more than 3\" from all enemy units.", "Once Per Turn (Army), Command"),
];

export const heroicTraits = [
  rule("favoured-of-the-pantheon", "Favoured of the Pantheon", "Passive", "If this unit is the target of Eye of the Gods, it gains 3 Apotheosis points."),
  rule("deathmonger", "Deathmonger", "Any Combat Phase", "Once per battle, this unit can use two Fight abilities this phase. After the first is resolved, this unit has Strike-last for the rest of the phase.", "Once Per Battle"),
  rule("radiance-of-dark-glory", "Radiance of Dark Glory", "Any Hero Phase", "Roll a dice for each damaged friendly unit wholly within 12\". On a 3+, that unit can Heal (1), or Heal (3) if it is a Monster.", "Ability", 20),
];

export const artefacts = [
  rule("infernal-puppet", "Infernal Puppet", "Start of Any Turn", "Once per battle, pick a visible enemy Wizard within 24\". This turn, each time that Wizard uses a Spell ability, it suffers D3 mortal damage. If it is destroyed by this damage, the spell is not resolved.", "Once Per Battle"),
  rule("conquerors-crown", "The Conqueror's Crown", "Passive", "Subtract 5 from the control scores of enemy Infantry units in combat with the bearer."),
  rule("realmwarpers-twist-rune", "Realmwarper's Twist-rune", "Your Hero Phase", "Once per battle, pick a terrain feature within 12\". It has Obscuring until the start of your next turn if it did not already have it. Roll a dice for each model within 1\" of that terrain feature; for each 5+, inflict 1 mortal damage on that model's unit.", "Once Per Battle"),
];

export const aqshyArtefacts = [
  rule("aelfskin-scroll", "Aelfskin Scroll", "Reaction: Opponent declared a Spell ability", "Once per battle, pick a visible friendly Slaves to Darkness Wizard within 18\". After the enemy spell is resolved, that Wizard can use a Spell ability with the same casting roll without counting towards its power level.", "Once Per Battle", 0, "Aqshy"),
  rule("rune-of-murder", "Rune of Murder", "Any Combat Phase", "Once per battle, pick one of the bearer's combat weapons. Either inflict 3 mortal damage on the bearer to double that weapon's Attacks characteristic this turn, or add D6 to that weapon's Attacks characteristic this turn.", "Once Per Battle", 0, "Aqshy"),
  rule("darkflame-pendant", "Darkflame Pendant", "Passive", "The Damage characteristic of weapons used for attacks that target the bearer cannot exceed 1.", "Ability", 0, "Aqshy"),
];

export const brandsOfTheDarkGods = [
  rule("brand-unbreakable-bonds", "Brand of Unbreakable Bonds", "Your Movement Phase", "Once per battle, remove this unit from the battlefield and set it up wholly within 3\" of an objective you control and not in combat. It cannot use Charge abilities this turn.", "Once Per Battle", 10, "Aqshy"),
  rule("brand-apoplexy", "Brand of Apoplexy", "Passive", "While your rage level is 7, add 1 to the Damage characteristic of this unit's weapons.", "Ability", 10, "Aqshy"),
  rule("brand-unaligned", "Brand of the Unaligned", "Your Hero Phase", "Remove all Pledge to Chaos keywords from this unit and pick one it has not had before: Pledged to Khorne, Tzeentch, Nurgle or Slaanesh. It keeps that keyword for the rest of the battle.", "Ability", 20, "Aqshy"),
];

export const ensorcelledBanners = [
  rule("dread-banner", "The Dread Banner", "Passive", "While this unit contains a standard bearer, enemy units cannot use commands while in combat with it."),
  rule("banner-rage", "The Banner of Rage", "Passive", "This unit gains Pledged to Khorne and, while it contains a standard bearer, add 1 to wound rolls for its combat attacks."),
  rule("blasted-standard", "The Blasted Standard", "Passive", "This unit gains Pledged to Tzeentch and, while it contains a standard bearer, it has Ward (4+) against damage inflicted by shooting attacks."),
  rule("eroding-icon", "The Eroding Icon", "Passive", "This unit gains Pledged to Nurgle and, while it contains a standard bearer, attacks that target it cannot score critical hits."),
  rule("banner-screaming-flesh", "The Banner of Screaming Flesh", "Passive", "This unit gains Pledged to Slaanesh. In addition, while it contains a standard bearer, if it charged this turn, add 1 to the Attacks characteristic of its combat weapons for the rest of the turn."),
];

export const spellLores = [{
  id: "lore-of-the-damned", name: "Lore of the Damned", spells: [
    { ...rule("spite-tongue-curse", "Spite-tongue Curse", "Your Hero Phase", "Casting value 5, Unlimited. Pick a visible enemy unit within 12\" to suffer 3 mortal damage. If the spell fails or is unbound, the caster suffers D3 mortal damage."), castingValue: 5 },
    { ...rule("binding-damnation", "Binding Damnation", "Your Hero Phase", "Casting value 7. Pick a visible enemy unit within 12\". It has Strike-last until the start of your next turn."), castingValue: 7 },
    { ...rule("daemonic-speed", "Daemonic Speed", "Your Hero Phase", "Casting value 7. Pick a visible friendly Slaves to Darkness unit wholly within 12\". It can roll 1 additional charge dice this turn, to a maximum of 3."), castingValue: 7 },
  ],
}];
