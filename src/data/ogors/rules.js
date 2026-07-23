export const battleTraits = [
  {
    id: "eat-em-alive", name: "Eat 'Em Alive", type: "Once Per Turn (Army)", phase: "End of Any Turn", keywords: [],
    description: "Pick a friendly Ogor unit that used a Fight ability this turn targeting a non-terrain enemy in combat. Inflict D3 mortal damage on that enemy, then give the Ogor one permanent effect (replace its current effect): Raw and Bloody Flesh (-1 Rend to attacks targeting it); Exotic Giblets (-1 to wards against its non-Companion combat attacks); Steaming Brains (+2 Control); Crunchy Bones (melee Crit (2 Hits), or Crit (Mortal) if already present); Slick Innards (can Charge after Running); or Mystery Meat (enemy power level -1 in combat, minimum 0).",
  },
  {
    id: "bull-charge", name: "Bull Charge", type: "Once Per Turn (Army)", phase: "Any Charge Phase", keywords: [],
    description: "Pick a friendly Ogor Mawtribes unit that charged and has not used a Rampage, then an enemy in combat. Your opponent moves that enemy up to 3\"; it can cross friendly combat ranges and end in combat. Roll a dice for each model in the charging unit within 3\" (+1 to each roll for Gutbusters); each 3+ inflicts 1 mortal damage. The Ogor then piles in and, if possible, must target that enemy when it fights.",
  },
  {
    id: "jaws-of-the-beast", name: "Jaws of the Beast", type: "Once Per Battle (Army)", phase: "Deployment Phase", keywords: ["Deploy"],
    description: "Pick a friendly Beastclaw Hero leading a regiment and one non-Hero unit from that regiment. Set both in reserve, tracking their prey.",
  },
  {
    id: "closing-the-jaws", name: "Closing the Jaws", type: "Ability", phase: "Your Movement Phase", keywords: [],
    description: "Set up the tracking Hero wholly within 9\" of a battlefield edge and more than 9\" from enemies. Set up the other tracking unit wholly within 9\" of that Hero and the same edge, and more than 9\" from enemies.",
  },
];

const formation = (id, name, abilityName, type, phase, description) => ({
  id, name, description, ability: { name: abilityName, type, phase, keywords: [], description },
});

export const battleFormations = [
  formation("hunger-filled-tribe", "Hunger-filled Tribe", "Feast of Bloodshed", "Once Per Turn (Army)", "End of Any Turn", "For each enemy unit destroyed this turn, pick a friendly unit not in combat that has not used Power Through. It can move 3\", cross combat ranges and end in combat."),
  formation("vanguard-of-the-mawpath", "Vanguard of the Mawpath", "Smash and Grab", "Once Per Turn (Army)", "Any Charge Phase", "Each friendly unit that made an unmodified charge roll of 8+ can move 3\". It can cross enemy combat ranges but must remain in combat with units it was already fighting."),
  formation("hinterland-hunters", "Hinterland Hunters", "Prowling Predators", "Passive", null, "Subtract 1 from hit rolls for attacks targeting friendly units wholly within 9\" of a battlefield edge if they did not charge this turn."),
  formation("maw-cult-fanatics", "Maw-cult Fanatics", "Grub's Up, Mateys!", "Once Per Turn (Army)", "End of Any Turn", "Heal (D3) each friendly unit that has previously been affected by Eat 'Em Alive."),
];

export const heroicTraits = [
  { id: "leave-not-a-morsel", name: "Leave Not a Morsel", points: 0, source: "Battletome", phase: null, description: "Visible enemy units within 6\" cannot be healed and slain models cannot be returned to them." },
  { id: "dreaded-far-and-wide", name: "Dreaded Far and Wide", points: 0, source: "Battletome", phase: null, description: "Ignore negative modifiers to this unit's control score, hit and wound rolls for non-Companion attacks, charge rolls, and the number of dice used for its charge rolls." },
  { id: "the-crusherguts", name: "The Crusherguts", points: 0, source: "Battletome", phase: "Any Combat Phase", description: "If this unit charged, pick an enemy in combat and roll a dice. If the roll exceeds its Health characteristic, slay 1 model and that unit cannot pile in for the rest of the turn." },
];

export const artefacts = [
  { id: "trophy-rack", name: "Trophy Rack", points: 0, source: "Battletome", phase: "Deployment Phase", description: "Choose Squeezed Head, Smashed City Rubble or Torn Appendages. Other friendly units visible and wholly within 6\" gain Anti-Monster, Anti-War Machine or Anti-Cavalry (+1 Rend), respectively, on melee weapons." },
  { id: "carvalox-hide", name: "Carvalox Hide", points: 0, source: "Battletome", phase: null, description: "This unit has Ward (6+), or Ward (4+) against damage inflicted by spells, prayers and manifestation abilities." },
  { id: "mantle-of-entrails", name: "Mantle of Entrails", points: 0, source: "Battletome", phase: "Once Per Battle (Army), Any Hero Phase", description: "Pick a visible enemy within 12\". Until your next turn, when it is picked for a command, roll a dice. On a 3+, the command has no effect but still counts as used and command points remain spent." },
];

export const aqshyArtefacts = [
  { id: "rusty-grater", name: "Rusty Grater", points: 0, source: "Aqshy", phase: null, description: "After this unit resolves Eruption of Fury, Heal (D3) this unit." },
  { id: "key-to-the-larder", name: "Key to the Larder", points: 0, source: "Aqshy", phase: "Deployment Phase", description: "Pick a friendly Ogor Infantry unit. For the battle, it ignores negative modifiers to hit and wound rolls for combat attacks while wholly within 12\" of and visible to the bearer." },
  { id: "a-choice-cut", name: "A Choice Cut", points: 0, source: "Aqshy", phase: null, description: "This unit cannot Run. Ignore the first damage point allocated in each phase to each friendly Ogor Infantry unit wholly within 12\" of and visible to this unit." },
];

export const monsterTraits = [
  { id: "extremely-obstinate", name: "Extremely Obstinate", source: "Aqshy", points: 10, phase: null, description: "This unit has a Control characteristic of 15." },
  { id: "grumpy-alpha", name: "Grumpy Alpha", source: "Aqshy", points: 10, phase: "Enemy Charge Phase", description: "Spend 1 fury and pick another visible friendly Ogor Monster wholly within 12\" and not in combat. Roll a dice; it can move that distance, enter combat and counts as having charged. Rampage." },
  { id: "horn-toss", name: "Horn Toss", source: "Aqshy", points: 10, phase: "Any Combat Phase", description: "If this unit charged, pick a 1-model enemy in combat, remove it and set it up within 1\". On a 2+, inflict mortal damage equal to a D3 roll. Rampage." },
];

export const spellLores = [{
  id: "lore-of-maw-magic", name: "Lore of Maw-magic",
  spells: [
    { id: "blood-feast", name: "Blood Feast", castingValue: 6, type: "Spell", phase: "Your Hero Phase", keywords: ["Spell", "Unlimited"], description: "Pick a visible friendly unit wholly within 12\". Add 1 to hit rolls for its combat attacks until your next turn." },
    { id: "shincruncher", name: "Shincruncher", castingValue: 7, type: "Spell", phase: "Your Hero Phase", keywords: ["Spell"], description: "Pick a visible enemy within 12\". Until your next turn, each time it ends a move or is set up, inflict D3 mortal damage on it." },
    { id: "tallowflage", name: "Tallowflage", castingValue: 7, type: "Spell", phase: "Your Hero Phase", keywords: ["Spell"], description: "Pick a visible friendly unit wholly within 12\". Until your next turn, it is not visible to enemy units more than 12\" away." },
  ],
}];

export const prayerLores = [{
  id: "everwinter-prayers", name: "Everwinter Prayers",
  prayers: [
    { id: "freezing-tailwinds", name: "Freezing Tailwinds", chantingValue: 3, type: "Prayer", phase: "Your Hero Phase", keywords: ["Prayer", "Unlimited"], description: "Pick a visible friendly unit wholly within 12\". Add 1 to its run and charge rolls until your next turn, or 2 if the chanting roll was 6+." },
    { id: "pulverising-hailstorm", name: "Pulverising Hailstorm", chantingValue: 4, type: "Prayer", phase: "Your Hero Phase", keywords: ["Prayer"], description: "Pick a visible enemy within 12\"; if the chanting roll was 8+, pick a second. Inflict 3 mortal damage on each target." },
    { id: "fortifying-hoarfrost", name: "Fortifying Hoarfrost", chantingValue: 4, type: "Prayer", phase: "Your Hero Phase", keywords: ["Prayer"], description: "Pick a visible friendly unit wholly within 12\". Subtract 1 from wound rolls for attacks targeting it until your next turn; on an 8+, also subtract 1 Rend from those attacks." },
  ],
}];
