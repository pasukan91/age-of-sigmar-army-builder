const rule = (id, name, phase, description, type = "Ability") => ({
  id, name, phase, description, type,
});

export const battleTraits = [
  rule("ancient-burial-sites", "Ancient Burial Sites", "Deployment Phase", "Once per battle (Army). If a friendly Cursed Sepulchre is on the battlefield, set up up to 2 additional Cursed Sepulchres. The first must be more than 3\" from all units, objectives and terrain; the second must also be wholly outside enemy territory.", "Once Per Battle (Army)"),
  rule("the-unquiet-dead", "The Unquiet Dead", "Deployment Phase", "Pick any number of undeployed Deathrattle or Deadwalkers units and place them in reserve in the grave. You cannot have more units in the grave than on the battlefield."),
  rule("the-rising-dead", "The Rising Dead", "Your Movement Phase", "Set up a unit from the grave wholly within 6\" of a friendly Cursed Sepulchre and more than 9\" from enemies, or wholly within 6\" of a battlefield edge in friendly territory and more than 9\" from enemies."),
  rule("deathly-invocation", "Deathly Invocation", "Any Hero Phase", "Once per turn (Army). Pick a friendly Hero, then up to 3 friendly Deathrattle or Deadwalkers units wholly within 12\". Heal (3) each damaged target; otherwise return slain models with combined Health up to 3.", "Once Per Turn (Army)"),
  rule("endless-legions", "Endless Legions", "Any Movement Phase", "Once per battle round (Army). Replace a destroyed non-Unique Deathrattle or Deadwalkers unit that began with 2+ models at half strength, wholly within 12\" of a friendly Hero or within 6\" of a Cursed Sepulchre and more than 9\" from enemies. In your movement phase it can be set up more than 3\" away, but cannot charge if within 9\".", "Once Per Battle Round (Army)"),
  rule("the-hunger", "The Hunger", "End of Any Turn", "Once per turn (Army). Pick each friendly Vampire that used a Fight ability this turn. Heal (D3) it, or Heal (2D3) if it destroyed an enemy unit using a Fight ability.", "Once Per Turn (Army)"),
];

export const battleFormations = [
  rule("legion-of-shyish", "Legion of Shyish — Horror Unending", null, "You can pick 1 additional target for Deathly Invocation.", "Passive"),
  rule("bacchanal-of-blood", "Bacchanal of Blood — Aristocracy of the Night", null, "Add 1 to casting rolls for friendly Vampires not in combat. Add 1 to wound rolls for combat attacks made by friendly Vampires that charged this turn.", "Passive"),
  rule("deathstench-drove", "Deathstench Drove — Dragged Down and Torn Apart", "End of Any Turn", "Once per turn (Army). Pick up to 3 friendly Deadwalkers units in combat. Each can pile in, then on a 2+ inflicts D3 mortal damage on an enemy in combat.", "Once Per Turn (Army)"),
  rule("deathmarch", "Deathmarch — Tide of Bones and Blades", null, "Add 1 to Rend for melee weapons used by friendly Deathrattle units that charged when attacking a unit with fewer models.", "Passive"),
];

export const heroicTraits = [
  { id: "lash-of-the-sire", name: "Lash of the Sire", source: "Battletome", points: 20, phase: "Your Hero Phase", description: "Pick another friendly Soulblight Gravelords unit in combat range. On a 2+, if it is not in combat it can move D6\" and cannot end in combat; if it is in combat, it can pile in." },
  { id: "unbending-will", name: "Unbending Will", source: "Battletome", points: 0, phase: "Your Hero Phase", description: "Pick a friendly Deathrattle or Deadwalkers unit with 2+ models wholly within 12\". Add D6 to its control score for the rest of the turn." },
  { id: "unhinged-rampager", name: "Unhinged Rampager", source: "Battletome", points: 0, phase: null, type: "Passive", description: "Re-roll charge rolls for this unit in your charge phase." },
  { id: "immortal-ego", name: "Immortal Ego", points: 0, source: "Aqshy", type: "Passive", description: "Each phase, re-roll 1 hit roll, 1 wound roll and 1 save roll for this unit." },
  { id: "furious-endings", name: "Furious Endings", points: 0, source: "Aqshy", type: "Passive", description: "Each time a Manifestation within 12\" is removed from play, gain 1 rage die." },
  { id: "eternal-thrall", name: "Eternal Thrall", points: 0, source: "Aqshy", phase: "Deployment Phase", description: "Pick another friendly non-Unique Soulblight Gravelords Infantry Hero. Necromancer: +1 power level; Vampire: +1 to unbinding rolls; Deathrattle: ignore the first damage point allocated each phase." },
];

export const artefacts = [
  { id: "terminus-clock", name: "Terminus Clock", points: 0, phase: "Your Hero Phase", description: "On a 3+, enemy Wizards within 18\" subtract 1 from casting rolls until the start of your next turn." },
  { id: "shard-of-night", name: "Shard of Night", points: 0, phase: null, type: "Passive", description: "Ignore modifiers to save rolls for shooting attacks that target this unit (positive and negative)." },
  { id: "amulet-of-graves", name: "Amulet of Graves", points: 0, phase: "Your Hero Phase", type: "Once Per Battle", description: "If fewer than 3 friendly Cursed Sepulchres are on the battlefield, set one up more than 9\" from enemies, more than 1\" from friendly units and more than 3\" from objectives and terrain." },
];

export const originsOfTerrifyingFolkTales = [
  { id: "empty-graveyard", name: "The Empty Graveyard", points: 10, source: "Scourge of Aqshy", phase: "Deployment Phase", description: "Remove this unit and set it up more than 9\" from enemies and wholly within 7\" of terrain or a battlefield edge. It cannot use Move abilities in the first turn of the first battle round." },
  { id: "never-dead", name: "The Never-Dead", points: 10, source: "Scourge of Aqshy", phase: "Any Hero Phase", description: "Spend a rage die; if the opponent has lower fury they must increase it by 1 (maximum 7). Until the end of the turn, unmodified save rolls of 5+ cause attacks targeting this unit to fail." },
  { id: "incarnadine-killers", name: "The Incarnadine Killers", points: 10, source: "Scourge of Aqshy", phase: "End of Any Turn", description: "If this unit is not in combat and destroyed an enemy with a combat attack this turn, it can move D6\" and can end that move in combat." },
];

export const spellLores = [{
  id: "lore-of-undeath",
  name: "Lore of Undeath",
  spells: [
    { id: "vile-transference", name: "Vile Transference", castingValue: 7, keywords: ["Unlimited"], description: "Pick an enemy within 18\" and roll a die for each model in it. Inflict 1 mortal damage for each 6. If any models are slain, Heal (D3) the caster." },
    { id: "prison-of-grief", name: "Prison of Grief", castingValue: 7, description: "A visible enemy wholly within 12\" has Strike-last until the start of your next turn." },
    { id: "waste-away", name: "Waste Away", castingValue: 7, description: "Subtract 1 from the Damage characteristic of melee weapons used by a visible enemy wholly within 12\" for the rest of the turn." },
  ],
}];
