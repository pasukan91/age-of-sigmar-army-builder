import terrain from "./terrain";

const ability = (id, name, phase, description, type = "Ability") => ({
  id, name, phase, description, type,
});

const cycleRules = {
  battleTraits: [
    ability("revolution-and-revulsion", "Revolution and Revulsion", "Once Per Battle Round (Army), Start of Battle Round", "In the first battle round, roll a dice to determine which Cycle ability is ripe: 1 Unnatural Vitality; 2 Fecund Vigour; 3 Burgeoning Filth; 4 Plague of Misery; 5 Nauseous Revulsion; 6 Rampant Disease; 7 Corrupted Regrowth. In later rounds, the next ability in the sequence is ripe; after Corrupted Regrowth, return to Unnatural Vitality. Only the ripe Cycle ability can be used."),
    ability("unnatural-vitality", "Unnatural Vitality", "Passive", "Friendly non-Monster Cycle of Corruption Heroes have Ward (4+).", "Passive"),
    ability("fecund-vigour", "Fecund Vigour", "Once Per Turn (Army), Your Hero Phase", "Heal (D3) each friendly Cycle of Corruption unit."),
    ability("burgeoning-filth", "Burgeoning Filth", "Passive", "Subtract 3 from the control scores of enemy units while they are in combat with any friendly Cycle of Corruption units.", "Passive"),
    ability("plague-of-misery", "Plague of Misery", "Passive", "Enemy units within 12\" of any friendly Cycle of Corruption units cannot use abilities that heal or return slain models to a unit.", "Passive"),
    ability("nauseous-revulsion", "Nauseous Revulsion", "Passive", "Subtract 1 from charge rolls for enemy units.", "Passive"),
    ability("rampant-disease", "Rampant Disease", "Passive", "Melee weapons used by friendly non-Hero Cycle of Corruption units have Crit (2 Hits).", "Passive"),
    ability("corrupted-regrowth", "Corrupted Regrowth", "Once Per Turn (Army), Your Hero Phase", "Heal (7) each friendly Feculent Gnarlmaw. If there are none on the battlefield, set up a Feculent Gnarlmaw more than 9\" from all enemy units and more than 3\" from all objectives and other terrain features."),
  ],
  battleFormations: [],
  heroicTraits: [
    ability("utterly-disgusting", "Utterly Disgusting", "Passive", "Subtract 1 from hit rolls for attacks that target this unit.", "Heroic Trait"),
  ],
  artefacts: [
    ability("cankerous-nail", "Cankerous Nail", "Passive", "Add 1 to the Rend characteristic of this unit's melee weapons.", "Artefact of Power"),
  ],
  spellLores: [{
    id: "cycle-of-corruption-spell-lore", name: "Cycle of Corruption Spell Lore",
    spells: [
      { id: "epidermal-crustitis", name: "Epidermal Crustitis", castingValue: 7, keywords: ["Unlimited"], description: "Until the start of your next turn, subtract 1 from the Damage characteristic of melee weapons used for attacks that target the caster." },
      { id: "rank-and-vile", name: "Rank and Vile", castingValue: 6, description: "Pick a visible enemy Infantry unit within 18\". Until the start of your next turn, whenever one of its models is slain, roll a dice after removing it. On a 4+, return 1 slain model to a friendly non-Hero Cycle of Corruption Infantry unit within 6\" of the target." },
      { id: "spittledrain", name: "Spittledrain", castingValue: 6, description: "Pick a visible enemy within 12\". Subtract 1 from its Move until the start of your next turn, then roll a number of dice equal to its models. Each 6 inflicts 1 mortal damage, to a maximum of 7." },
    ],
  }],
  prayerLores: [{
    id: "cycle-of-corruption-prayer-lore", name: "Cycle of Corruption Prayer Lore",
    prayers: [
      { id: "bacterial-blessing", name: "Bacterial Blessing", chantingValue: 4, keywords: ["Unlimited"], description: "Pick a visible friendly Cycle of Corruption unit wholly within 12\". Until the start of your next turn, add 1 to wound rolls for its combat attacks. On a chanting roll of 7+, pick a second eligible unit." },
      { id: "ever-turning", name: "Ever Turning", chantingValue: 5, description: "The next Cycle ability in the sequence is ripe for the rest of the battle round instead of the current one. On a chanting roll of 12+, choose which Cycle ability is ripe." },
      { id: "virulent-agonies", name: "Virulent Agonies", chantingValue: 4, description: "Pick a visible enemy within 18\". Inflict 1 mortal damage on it and on each other enemy in its combat range. On a chanting roll of 7+, inflict D3 mortal damage on the target instead of 1." },
    ],
  }],
  terrain,
};

const gardenersRules = {
  battleTraits: [
    ability("the-garden-grows", "The Garden Grows", "Once Per Turn (Army), Your Hero Phase", "Set up a Feculent Gnarlmaw more than 3\" from all enemy units, objectives and other terrain features."),
    ability("transplanting", "Transplanting", "Once Per Turn (Army), Your Movement Phase", "Remove a friendly Feculent Gnarlmaw and set it up again within 3\" of a friendly Gardeners of Nurgle Hero and more than 3\" from all enemy units, objectives and other terrain features."),
    ability("head-gardener", "Head Gardener", "Once Per Battle (Army), Your Movement Phase", "Horticulous Slimux can use Cultivating the Garden of Nurgle this phase even if there are 1 or more friendly Feculent Gnarlmaws on the battlefield."),
    ability("putrescent-sap", "Putrescent Sap", "Once Per Turn (Army), Your Combat Phase", "Pick each enemy unit within 3\" of any friendly Feculent Gnarlmaws. Roll a D3 for each; on a 2+, inflict mortal damage equal to the roll."),
    ability("foul-fauna", "Foul Fauna", "Passive", "Add 2\" to the Move characteristic of friendly Gardeners of Nurgle Beasts of Nurgle and Plague Drones units while wholly within 6\" of any friendly Feculent Gnarlmaws.", "Passive"),
    ability("sickly-spores", "Sickly Spores", "Passive", "While a friendly Gardeners of Nurgle Infantry unit is wholly within 12\" of a friendly Feculent Gnarlmaw, ignore the first damage point that would be allocated to it in each phase.", "Passive"),
  ],
  battleFormations: [],
  heroicTraits: [
    ability("foetid-orchardist", "Foetid Orchardist", "Passive", "Add 1 to hit rolls for this unit's combat attacks while it is wholly within 7\" of any friendly Feculent Gnarlmaws.", "Heroic Trait"),
  ],
  artefacts: [
    ability("stinking-sporeseed", "Stinking Sporeseed", "Once Per Battle, Your Movement Phase", "Set up a Feculent Gnarlmaw within 3\" of this unit and more than 3\" from all enemy units, objectives and other terrain features.", "Artefact of Power"),
  ],
  spellLores: [{
    id: "gardeners-of-nurgle-spell-lore", name: "Gardeners of Nurgle Spell Lore",
    spells: [
      { id: "munificent-blights", name: "Munificent Blights", castingValue: 7, keywords: ["Unlimited"], description: "Pick a visible enemy within 18\". Until the start of your next turn, add 1 to the mortal damage inflicted on it by Putrescent Sap." },
      { id: "scumfall", name: "Scumfall", castingValue: 7, description: "Until the start of your next turn, friendly Gardeners of Nurgle units wholly within 12\" of a friendly Feculent Gnarlmaw are not visible to units more than 9\" away." },
      { id: "canopy-of-virulence", name: "Canopy of Virulence", castingValue: 7, description: "Pick a visible friendly Gardeners of Nurgle unit wholly within 12\". Until the start of your next turn, while it is wholly within 12\" of any friendly Feculent Gnarlmaws, ward rolls cannot be made for enemy units in combat with it." },
    ],
  }],
  terrain,
};

export default [{
  id: "cycle-of-corruption", name: "Cycle of Corruption",
  description: "A Rotbringers Army of Renown governed by the seven-stage Cycle of Corruption.",
  roster: ["Any Rotbringers units"], requiredUnits: [],
  excludesRegimentsOfRenown: true, rules: cycleRules,
}, {
  id: "the-gardeners-of-nurgle", name: "The Gardeners of Nurgle",
  description: "Horticulous Slimux leads Nurgle Daemons and cultivates an expanding forest of Feculent Gnarlmaws.",
  roster: ["Horticulous Slimux (must be included)", "Any Maggotkin of Nurgle Daemon units"],
  requiredUnits: ["horticulous-slimux"], excludesRegimentsOfRenown: true,
  rules: gardenersRules,
}];
