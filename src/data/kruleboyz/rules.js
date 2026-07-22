export const battleTraits = [
  {
    id: "dirty-tricks",
    name: "Dirty Tricks",
    type: "Passive",
    phase: null,
    keywords: [],
    description: "Your army can use 1 Dirty Trick ability per phase. The required dirty trick roll is 2+ for the first used that battle round, 3+ for the second, 4+ for the third and 5+ for the fourth or subsequent.",
  },
  {
    id: "venom-encrusted-weapons",
    name: "Venom-encrusted Weapons",
    type: "Once Per Turn (Army)",
    phase: "Your Hero Phase",
    keywords: ["Dirty Trick"],
    description: "Pick a friendly Kruleboyz Infantry unit and make a dirty trick roll. Until your next turn, its attacks score critical hits on unmodified hit rolls of 5+.",
  },
  {
    id: "sneaky-sneakin",
    name: "Sneaky Sneakin'",
    type: "Once Per Turn (Army)",
    phase: "Your Hero Phase",
    keywords: ["Dirty Trick"],
    description: "Pick a friendly Kruleboyz Infantry unit with 10 or fewer models, not in combat and not already used for a Dirty Trick this turn. On a successful roll, reposition it wholly within 3\" of terrain and more than 9\" from enemies.",
  },
  {
    id: "lethal-surprise",
    name: "Lethal Surprise",
    type: "Once Per Turn (Army)",
    phase: "Any Charge Phase",
    keywords: ["Dirty Trick"],
    description: "Pick an enemy that charged and is in combat with a friendly Kruleboyz unit. On a successful dirty trick roll, inflict D3 mortal damage and disable Charge (+1 Damage) on its weapons for the turn.",
  },
  {
    id: "noisy-racket",
    name: "Noisy Racket",
    type: "Once Per Turn (Army)",
    phase: "Any Combat Phase",
    keywords: ["Dirty Trick"],
    description: "Pick an enemy in combat with a friendly Kruleboyz unit. On a successful dirty trick roll, the target has Strike-last for the rest of the turn.",
  },
];

const formation = (id, name, abilityName, type, phase, description) => ({
  id,
  name,
  description,
  ability: { name: abilityName, type, phase, keywords: [], description },
});

export const battleFormations = [
  formation("kruleboyz-klaw", "Kruleboyz Klaw", "Swampshroud", "Passive", null, "Friendly Kruleboyz units wholly within 3\" of terrain are not visible to enemy units more than 12\" away."),
  formation("middul-finga", "Middul Finga", "Far-killa Bolts", "Your Shooting Phase", "Your Shooting Phase", "Pick up to 3 friendly Man-skewer Boltboyz or Beast-skewer Killbow units. Add 3\" to the Range of their ranged weapons for the rest of the turn."),
  formation("light-finga", "Light Finga", "Ded Sneaky", "Passive", null, "You can use Sneaky Sneakin' twice per turn instead of once."),
  formation("trophy-finga", "Trophy Finga", "Meanest Beasts", "Passive", null, "Companion weapons used by friendly Kruleboyz units have Crit (2 Hits)."),
];

export const heroicTraits = [
  { id: "backstabba", name: "Backstabba", points: 0, source: "Battletome", phase: "End of Any Turn", description: "Pick an enemy Hero in combat with this unit and another friendly Kruleboyz unit. Inflict D3 mortal damage, plus 1 for each additional friendly Kruleboyz unit in combat with it." },
  { id: "slippery-skumbag", name: "Slippery Skumbag", points: 0, source: "Battletome", phase: "Any Combat Phase", description: "If this unit is in combat, roll a dice. On a 3+, it can immediately Retreat without suffering mortal damage." },
  { id: "egomaniak", name: "Egomaniak", points: 10, source: "Battletome", phase: null, description: "While in the combat range of a friendly non-Hero Kruleboyz Infantry unit, this unit has Ward (4+). Successful wards allocate 1 damage to an eligible nearby friendly unit." },
];

export const artefacts = [
  { id: "morks-eye-pebble", name: "Mork's Eye Pebble", points: 0, source: "Battletome", phase: "Once Per Battle, Reaction: Attack ability", description: "Friendly Kruleboyz units have Ward (5+) while wholly within 12\" of this unit for the rest of the turn." },
  { id: "swamp-staff", name: "Swamp Staff", points: 0, source: "Battletome", phase: null, description: "If this unit is not a Wizard, it can use Unbind as Wizard (1). Otherwise, add 1 to this unit's power level." },
  { id: "eye-biter-ash", name: "Eye-biter Ash", points: 0, source: "Battletome", phase: "Any Combat Phase", description: "Once per battle, pick an enemy in combat. Subtract 1 from hit and wound rolls for its attacks for the rest of the turn." },
];

export const aqshyArtefacts = [
  { id: "tattermask", name: "Tattermask", source: "Aqshy", points: 0, description: "Unmodified hit rolls of 1-3 for attacks that target this unit fail." },
  { id: "woggly-bogstikk", name: "Woggly Bogstikk", source: "Aqshy", points: 0, phase: "Your Hero Phase", description: "Pick a visible enemy within 12\" and roll a dice. If it exceeds the target's Control, inflict mortal damage equal to the roll." },
  { id: "spell-in-a-rattle", name: "Spell in a Rattle", source: "Aqshy", points: 0, phase: "Once Per Battle, Any Hero Phase", description: "Use a non-Summon spell from your chosen lore as Wizard (1). Its casting roll is an unmodifiable 9 and cannot be unbound." },
];

export const monsterTraits = [
  { id: "spittin-un", name: "Spittin' 'Un", source: "Aqshy", points: 20, description: "This unit gains Caustic Saliva: Range 12\", Attacks equal to your fury level, Hit 4+, Wound 3+, Rend 2, Damage D3." },
  { id: "sly-un", name: "Sly 'Un", source: "Aqshy", points: 10, phase: "Once Per Battle, End of Any Turn", description: "Remove this unit and set it up again more than 9\" from all enemies." },
  { id: "quick-un", name: "Quick 'Un", source: "Aqshy", points: 20, description: "Add half your fury level, rounding up, to run and charge rolls for this unit." },
];

export const spellLores = [
  {
    id: "lore-of-the-swamp",
    name: "Lore of the Swamp",
    spells: [
      { id: "da-black-pit", name: "Da Black Pit", castingValue: 5, type: "Spell", phase: "Your Hero Phase", keywords: ["Spell", "Unlimited"], description: "Pick a visible enemy within 18\" and roll a dice for each model in it. Each 6 inflicts 1 mortal damage." },
      { id: "choking-mist", name: "Choking Mist", castingValue: 7, type: "Spell", phase: "Your Hero Phase", keywords: ["Spell"], description: "Pick a visible enemy within 12\". Subtract 1 from the Attacks characteristic of its weapons until your next turn." },
      { id: "morks-kunnin", name: "Mork's Kunnin'", castingValue: 6, type: "Spell", phase: "Your Hero Phase", keywords: ["Spell"], description: "Pick a visible friendly Kruleboyz unit wholly within 12\". Add 1 to its save rolls until your next turn." },
    ],
  },
];
