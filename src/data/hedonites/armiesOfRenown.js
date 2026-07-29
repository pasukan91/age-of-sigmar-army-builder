const rule = (id, name, type, phase, description) => ({ id, name, type, phase, description });
const enhancement = (id, name, description, phase = null, type = "Passive") => ({
  id, name, points: 0, phase, type, description,
});

const manifestationsOfDepravity = [{
  id: "army-of-renown-manifestations-of-depravity",
  name: "Manifestations of Depravity",
  manifestations: ["dreadful-visage", "wheels-of-excruciation", "mesmerising-mirror"],
}];

const decadentHostRules = {
  battleTraits: [
    rule("perfection-made-manifest", "Perfection Made Manifest", "Once Per Turn (Army)", "Any Hero Phase", "Pick Sigvald and a visible unit within 3\". Inflict D3 mortal damage on the target; for each model slain, add 2 to the Attacks characteristic of Sigvald's melee weapons for the rest of the turn."),
    rule("infernal-handmaidens", "Infernal Handmaidens", "Passive", null, "While Sigvald is within 3\" of and visible to friendly Decadent Host Daemon units, add 1 to wound rolls for those Daemons' combat attacks."),
    rule("all-for-the-prince", "All for the Prince", "Passive", null, "While Sigvald is in another friendly Decadent Host Sybarite unit's combat range, he has Ward (2+). After each successful ward, allocate 1 damage to another friendly Decadent Host unit in his combat range after resolving his damage sequence; wards cannot be made for that damage."),
    rule("the-prince-in-the-mirror", "The Prince in the Mirror", "Ability", "Your Movement Phase", "If Sigvald has been destroyed, set up an identical replacement wholly within 6\" of a friendly Contorted Epitome and not in combat. He can be replaced even if he is a replacement unit."),
    rule("petulant-wrath", "Petulant Wrath", "Once Per Turn (Army)", "Any Combat Phase", "If Sigvald is not in combat and did not charge, pick another friendly Decadent Host unit within 1\". Inflict D6 mortal damage on it, then remove Sigvald and set him up within 1\" of that unit."),
    rule("important-people-have-important-places-to-be", "Important People Have Important Places to Be", "Once Per Turn (Army)", "End of Any Turn", "If Sigvald is not contesting an objective, he can move 2D6\" but must end contesting an objective. He can cross enemy combat ranges but cannot end in combat."),
  ],
  heroicTraits: [
    enhancement("protege", "Protégé", "Once per battle when using The Prince in the Mirror, set up Sigvald within 1\" of this unit instead of within 6\" of a Contorted Epitome; then this unit is automatically destroyed.", "Reaction: You declared The Prince in the Mirror", "Once Per Battle (Army)"),
  ],
  artefacts: [
    enhancement("mirror-plate", "Mirror-plate", "Weapons used by this unit have a maximum Attacks characteristic of 1. While it is within 3\" of and visible to Sigvald, add 20 to Sigvald's control score."),
  ],
  spellLores: [{
    id: "decadent-host-spells",
    name: "Spell Lore of the Decadent Host",
    spells: [
      { id: "diverting-excruciation", name: "Diverting Excruciation", castingValue: 6, phase: "Your Hero Phase", keywords: ["Spell", "Unlimited"], description: "Pick a visible friendly Sigvald wholly within 12\". Heal (D3) him." },
      { id: "visions-of-eternal-bliss", name: "Visions of Eternal Bliss", castingValue: 6, phase: "Your Hero Phase", keywords: ["Spell"], description: "Pick a visible friendly Sigvald wholly within 12\". Until your next turn, he scores critical hits on unmodified hit rolls of 5+." },
    ],
  }],
  manifestationLores: manifestationsOfDepravity,
};

const courtRules = {
  battleTraits: [
    rule("the-voice-and-the-talon", "The Voice and the Talon", "Passive", null, "Friendly Synessa and Dexcessa gain the Twin keyword."),
    rule("the-more-glorious-slaughter", "The More Glorious Slaughter", "Once Per Turn", "Start of Any Turn", "If one friendly Twin destroyed an enemy in the previous turn and the other did not, add 1 to hit rolls for combat attacks made by units in the latter Twin's regiment for the rest of the turn."),
    rule("the-longer-shadow", "The Longer Shadow", "Ability", "Your Hero Phase", "If one Twin contests an objective you control and the other does not, add 5 to the control scores of units in the latter Twin's regiment while they contest an objective you control until your next turn."),
    rule("the-grander-visage", "The Grander Visage", "Once Per Turn (Army)", "Any Hero Phase", "If either Twin is damaged, the Twin with fewer damage points has Ward (4+) for the rest of the turn."),
    rule("the-swifter-surge", "The Swifter Surge", "Once Per Turn (Army)", "Any Charge Phase", "If one Twin charged in the previous turn and the other did not, units in the latter Twin's regiment roll 1 additional charge die, to a maximum of 3, then discard 1 die."),
    rule("the-more-cunning-ruse", "The More Cunning Ruse", "Once Per Turn (Army)", "End of Any Turn", "If both Twins are within 12\" of and visible to each other, remove one and set it up more than 9\" from all enemies."),
  ],
  heroicTraits: [
    enhancement("tethered-to-the-twins", "Tethered to the Twins", "Once per battle, set up an identical replacement for a destroyed friendly Twin within 12\" of this unit and more than 9\" from all enemies.", "Your Hero Phase", "Once Per Battle"),
  ],
  artefacts: [
    enhancement("the-triplet-trinket", "The Triplet Trinket", "While a Twin is within 3\" of and visible to this unit, subtract 1 from hit rolls against both. If both Twins are within 3\" and visible, also subtract 1 from wound rolls against all three."),
  ],
  spellLores: [{
    id: "court-of-the-godlings-spells",
    name: "Spell Lore of the Court of the Godlings",
    spells: [
      { id: "essence-transfusion", name: "Essence Transfusion", castingValue: 6, phase: "Your Hero Phase", keywords: ["Spell", "Unlimited"], description: "Allocate any number of damage points to one visible friendly Twin without wards, then Heal twice that amount on the other visible friendly Twin." },
      { id: "sibilant-whispers", name: "Sibilant Whispers", castingValue: 7, phase: "Your Hero Phase", keywords: ["Spell"], description: "Pick an enemy within 18\". Until your next turn, halve its Move while it can see a friendly Twin; while it can see both Twins, it also rolls 1 fewer charge die, to a minimum of 1." },
      { id: "ecstatic-furore", name: "Ecstatic Furore", castingValue: 7, phase: "Your Hero Phase", keywords: ["Spell"], description: "Pick a visible friendly Twin wholly within 12\". Until your next turn, add 1 to wound rolls for combat attacks made by friendly Court of the Godlings units wholly within 12\" of and visible to that Twin." },
    ],
  }],
  manifestationLores: manifestationsOfDepravity,
};

export default [
  {
    id: "the-decadent-host",
    name: "The Decadent Host",
    requiredUnits: ["sigvald-prince-of-slaanesh"],
    excludesRegimentsOfRenown: true,
    roster: ["Sigvald, Prince of Slaanesh", "Any non-War Machine Sybarite units", "Up to 1 Daemonettes unit", "Up to 1 Contorted Epitome"],
    description: "An army led by Sigvald and built around mortal Sybarites, with limited daemonic support.",
    rules: decadentHostRules,
  },
  {
    id: "court-of-the-godlings",
    name: "Court of the Godlings",
    requiredUnits: ["dexcessa-the-talon-of-slaanesh", "synessa-the-voice-of-slaanesh"],
    excludesRegimentsOfRenown: true,
    roster: ["Dexcessa, the Talon of Slaanesh", "Synessa, the Voice of Slaanesh", "Any non-Unique Hedonites of Slaanesh Daemon units"],
    restrictions: ["Dexcessa and Synessa cannot be in the same regiment"],
    description: "The divine twins lead a court composed exclusively of non-Unique daemons.",
    rules: courtRules,
  },
];
