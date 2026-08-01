const formation = (id, name, abilityName, type, phase, description) => ({
  id,
  name,
  description,
  ability: { name: abilityName, type, phase, keywords: [], description },
});

const enhancement = (id, name, description, phase = null, source = "Battletome") => ({
  id,
  name,
  points: 0,
  source,
  phase,
  description,
});

export const battleTraits = [
  {
    id: "anointed-ritualist",
    name: "Anointed Ritualist",
    type: "Ability",
    phase: "Start of First Battle Round",
    keywords: [],
    description: "If there are no friendly anointed units, pick a friendly non-Unique Daughters of Khaine Hero. It is anointed for the rest of the battle, even if destroyed. Friendly anointed units can use Exalted abilities on the warscrolls of destroyed friendly anointed units as if those abilities were on their own warscrolls.",
  },
  {
    id: "bloody-succession",
    name: "Bloody Succession",
    type: "Passive",
    phase: null,
    keywords: [],
    description: "Each time a friendly anointed unit is destroyed, after removing it from play, immediately use Anointed Ritualist as if it were the start of the first battle round.",
  },
  {
    id: "strident-war-cry",
    name: "Strident War Cry",
    type: "Once Per Turn (Army)",
    phase: "Reaction: You declared a Charge ability for an anointed unit",
    keywords: [],
    description: "Pick a friendly non-Hero Daughters of Khaine unit not in combat, wholly within 12\" of that anointed unit and that has not charged this turn. If the anointed unit charges, the target can immediately Charge even outside your charge phase. Re-roll charge rolls for the target for the rest of the phase.",
  },
  {
    id: "blood-rites",
    name: "Blood Rites",
    type: "Passive",
    phase: null,
    keywords: [],
    description: "Perform a blood rite when: an anointed unit destroys an enemy with combat attacks; an anointed unit is destroyed; a friendly unit contesting an objective you control is destroyed; a friendly unit destroys an enemy contesting an objective you do not control; or a unit is destroyed within 3\" of a Place of Power.",
  },
  {
    id: "blessings-of-khaine",
    name: "Blessings of Khaine",
    type: "Once Per Turn (Army)",
    phase: "End of Any Turn",
    keywords: [],
    description: "If you performed any blood rites this turn, activate 1 inactive blessing. Active blessings affect friendly Daughters of Khaine units and are cumulative: Ruthlessness gives +1 to combat hit rolls; Hatred gives +1 to combat wound rolls; Haste gives +3\" Move; Zeal gives Ward (5+) after charging; Shadow gives enemies -1 to hit with shooting; Cruelty allows Charge and Shoot after Retreat; Clarity gives +1 to chanting and casting rolls.",
  },
];

export const battleFormations = [
  formation("coven-of-blood", "Coven of Blood", "The Breath of Khaine", "Passive", null, "Friendly Daughters of Khaine models contesting an objective you control are not visible to enemy models more than 9\" away."),
  formation("frenzied-devotees", "Frenzied Devotees", "Heretic's Bane", "Once Per Turn (Army)", "Start of Enemy Turn", "Pick an enemy Wizard or Priest. Roll a die for each objective you control. For each 3+, subtract 1 from that unit's casting and chanting rolls for the rest of the turn."),
  formation("cold-hearted-murderers", "Cold-hearted Murderers", "Bloody-handed Worshippers", "Reaction: You declared a Fight ability for an anointed unit", null, "After that anointed unit fights, pick a friendly non-Hero Daughters of Khaine unit in its combat range that has not fought. It can Fight immediately; its melee weapons have Crit (Auto-wound), or Crit (Mortal) if they already have Crit (Auto-wound), for the rest of the turn."),
  formation("fervent-ritualists", "Fervent Ritualists", "Final Frenzy", "Once Per Turn (Army)", "End of Any Turn", "Pick each friendly Daughters of Khaine unit contesting an objective. Return up to D3 slain models to each target with Health 2 or less, or 1 slain model to each target with Health 3 or more."),
];

export const heroicTraits = [
  enhancement("shadow-blooded", "Shadow-blooded", "When a friendly Daughters of Khaine unit wholly within 12\" uses Redeploy, a distance roll of 1-3 can be treated as 4.", "Reaction: Redeploy"),
  enhancement("hand-of-khaine", "Hand of Khaine", "Pick an enemy Hero in combat and roll 2D6. If the roll exceeds its Health, destroy it. If it is destroyed, this unit can Fight twice this phase, gaining Strike-last after the first Fight.", "Any Combat Phase"),
  enhancement("murderous-duellist", "Murderous Duellist", "Pick an enemy single-model unit in combat and roll 2D6. If the roll equals or exceeds its Control, all of that unit's attacks must target this unit for the rest of the turn while they remain in combat.", "Any Combat Phase"),
  enhancement("murder-manifested", "Murder Manifested", "When this unit activates a Place of Power, roll a die instead of the normal effect. On a 1, it suffers D3 mortal damage. On a 2+, if there is no friendly Avatar of Khaine, summon one wholly within 12\", visible and more than 9\" from enemies.", "Reaction: Activate Place of Power", "Aqshy"),
  enhancement("loyal-unto-death", "Loyal Unto Death", "At deployment, pick another friendly Daughters of Khaine Hero with Health at least equal to this unit. For the battle, if that Hero would be destroyed while this unit is in its combat range, it is not destroyed, Heal (D3) it, then destroy this unit.", "Deployment Phase", "Aqshy"),
  enhancement("honoured-among-sects", "Honoured Among Sects", "If this unit is anointed, every blessing from Blessings of Khaine applies to it as if active.", null, "Aqshy"),
];

export const artefacts = [
  enhancement("crimson-draught", "Crimson Draught", "Re-roll charge rolls for this unit."),
  enhancement("darkling-elixir", "Darkling Elixir", "Pick a visible friendly Daughters of Khaine unit wholly within 12\". On a 3+, it can immediately Retreat as if it were your movement phase.", "End of Your Turn"),
  enhancement("witchbrew", "Witchbrew", "Pick a visible friendly non-Unique Daughters of Khaine unit wholly within 12\". On a 3+, ignore negative save modifiers for it until your next turn.", "Your Hero Phase"),
];

export const boonsOfShadow = [
  { ...enhancement("ulguan-reactions", "Ulguan Reactions", "Each unmodified save roll of 6 against a combat attack inflicts 1 mortal damage on the attacking unit after its Fight ability resolves.", null, "Aqshy"), points: 10 },
  { ...enhancement("talismans-of-shadow", "Talismans of Shadow", "When you declare a Spell, Prayer or Unbind for a unit within 3\", spend 1 rage die. If your opponent's fury is lower, they increase it by 1, then add 1 to that roll.", "Reaction: Spell, Prayer or Unbind", "Aqshy"), points: 10 },
  { ...enhancement("tenebrous-aura", "Tenebrous Aura", "Pick an enemy in combat. It cannot Retreat and cannot be healed or have slain models returned for the rest of the turn.", "Start of Any Turn", "Aqshy"), points: 10 },
];

export const spellLores = [{
  id: "lore-of-shadows",
  name: "Lore of Shadows",
  spells: [
    { id: "steed-of-shadows", name: "Steed of Shadows", castingValue: 6, keywords: ["Spell", "Unlimited"], description: "Pick a visible friendly Daughters of Khaine unit wholly within 12\". It can Charge this turn even if it used Run." },
    { id: "mindrazor", name: "Mindrazor", castingValue: 7, keywords: ["Spell"], description: "Pick a visible friendly Daughters of Khaine unit wholly within 12\". Its melee weapons have Charge (+1 Damage) until your next turn." },
    { id: "black-horror-of-ulgu", name: "Black Horror of Ulgu", castingValue: 6, keywords: ["Spell"], description: "Pick a point within 18\" and up to 3 enemy units within 3\" of it. Those units cannot Run until your next turn." },
  ],
}];

export const prayerLores = [{
  id: "prayers-of-the-khainite-cult",
  name: "Prayers of the Khainite Cult",
  prayers: [
    { id: "catechism-of-murder", name: "Catechism of Murder", chantingValue: 3, keywords: ["Prayer", "Unlimited"], description: "Pick a visible friendly Daughters of Khaine unit wholly within 12\". Its melee weapons have Crit (Auto-wound) until your next turn. On a 7+, its combat attacks score critical hits on unmodified hit rolls of 5+." },
    { id: "covenant-of-the-iron-heart", name: "Covenant of the Iron Heart", chantingValue: 3, keywords: ["Prayer"], description: "Pick a visible friendly Daughters of Khaine unit wholly within 12\". Add 10 to its control score until your next turn. On a 6+, also ignore the first damage point allocated to it in each phase." },
    { id: "dance-of-doom", name: "Dance of Doom", chantingValue: 4, keywords: ["Prayer"], description: "Pick a visible friendly non-Unique Daughters of Khaine unit wholly within 12\". Add 1 to the Attacks of its melee weapons this turn. On a 10+, it can Fight twice, gaining Strike-last after the first Fight." },
  ],
}];

export const manifestationLores = [{
  id: "manifestations-of-khaine",
  name: "Manifestations of Khaine",
  description: "Daughters of Khaine Wizards can summon the Bloodwrack Viper, Bladewind and Heart of Fury.",
  manifestations: ["bloodwrack-viper", "bladewind", "heart-of-fury"],
}];
