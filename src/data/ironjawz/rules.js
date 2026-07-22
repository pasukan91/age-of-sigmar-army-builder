export const battleTraits = [
  {
    id: "mighty-destroyers",
    name: "Mighty Destroyers",
    type: "Once Per Turn (Army)",
    phase: "Any Hero Phase",
    keywords: [],
    description: "Declare: Pick a friendly IRONJAWZ unit that was not set up this turn.\n\nEffect: The target can move up to 3\". It can move into combat. If it was in combat at the start of the move, it must end that move in combat.",
  },
  {
    id: "ironjawz-waaagh",
    name: "Ironjawz Waaagh!",
    type: "Once Per Battle",
    phase: "Your Charge Phase",
    keywords: ["Waaagh!"],
    description: "Declare: Pick a friendly IRONJAWZ HERO.\n\nEffect: For the rest of the turn, add 1 to charge rolls and add 1 to the Attacks characteristic of melee weapons used by friendly IRONJAWZ units wholly within 18\" of the target.",
  },
];

const formation = (id, name, abilityName, description) => ({
  id,
  name,
  description,
  ability: { name: abilityName, type: "Passive", phase: null, keywords: [], description },
});

export const battleFormations = [
  formation("ironjawz-brawl", "Ironjawz Brawl", "Natural Disaster", "If you make an unmodified charge roll of 8+ for a friendly non-Hero Ironjawz unit, add 1 to the Attacks characteristic of that unit's melee weapons for the rest of the turn."),
  formation("ironfist", "Ironfist", "Smashin' and Bashin'", "The first time each turn an enemy is destroyed by a Fight ability used by an Ironjawz unit, add 1 to hit rolls for the next friendly Ironjawz unit picked to fight that turn."),
  formation("weirdfist", "Weirdfist", "Spirit of Gork", "Friendly Ironjawz Infantry units have Ward (6+) while wholly within 12\" of a friendly Ironjawz Wizard or Priest."),
  formation("grunta-stampede", "Grunta Stampede", "'Ere We Come!", "Add the number of enemy units destroyed this battle to the Move characteristic of friendly Gore-gruntas and Maw-grunta units, to a maximum of +4."),
];

export const heroicTraits = [
  { id: "an-eye-for-da-fight", name: "An Eye for Da Fight", points: 0, source: "Battletome", phase: "Reaction: Redeploy", description: "When determining a Redeploy move for a friendly Ironjawz unit wholly within 12\", a roll of 1-3 can be treated as 4." },
  { id: "mega-bossy", name: "Mega Bossy", points: 0, source: "Battletome", phase: null, description: "If this unit charged this turn, add 1 to charge rolls for friendly Ironjawz units wholly within 18\" for the rest of the turn." },
  { id: "hulking-brute", name: "Hulking Brute", points: 0, source: "Battletome", phase: "Any Charge Phase", description: "After this unit charges, pick an enemy within 1\". On a 2+, inflict D3 mortal damage; if the charge roll was 8+, roll a D6 instead." },
];

export const artefacts = [
  { id: "trophy-skulls", name: "Trophy Skulls", points: 0, source: "Battletome", description: "Add 10 to this unit's control score." },
  { id: "armour-of-gork", name: "Armour of Gork", points: 0, source: "Battletome", description: "This unit has Ward (6+)." },
  { id: "amberbone-whetstone", name: "Amberbone Whetstone", points: 0, source: "Battletome", phase: "Deployment Phase", description: "Pick one of this unit's melee weapons. Add 1 to that weapon's Rend characteristic for the rest of the battle." },
];

export const aqshyArtefacts = [
  { id: "chimeric-mantle", name: "Chimeric Mantle", source: "Aqshy", points: 0, phase: "Any Combat Phase", description: "Pick an enemy in combat. Subtract D3 from the Attacks characteristic of its Companion weapons while it remains in combat with this unit." },
  { id: "weird-skullz", name: "Weird Skullz", source: "Aqshy", points: 0, phase: "Your Shooting Phase", description: "Pick a visible enemy within 18\" and roll a dice, adding 1 within 12\". On a 4+, inflict 1 mortal damage and subtract 1 from its power level until your next turn." },
  { id: "horn-of-shattatusk", name: "Horn of Shattatusk", source: "Aqshy", points: 20, phase: "Reaction: Ironjawz Waaagh!", description: "Add 1 to the Attacks characteristic of Companion weapons used by friendly Ironjawz units wholly within 18\" for the rest of the turn." },
];

export const monsterTraits = [
  { id: "big-un", name: "Big 'Un", source: "Aqshy", points: 10, description: "Add 1 to the Rend characteristic of this unit's Companion weapons." },
  { id: "angry-un", name: "Angry 'Un", source: "Aqshy", points: 10, phase: "Any Charge Phase", description: "After this unit charges, pick an enemy within 1\" and roll dice equal to your fury level. Each 3+ inflicts 1 mortal damage." },
  { id: "fast-un", name: "Fast 'Un", source: "Aqshy", points: 10, phase: "Once Per Battle, Your Hero Phase", description: "If this unit was not set up this turn, it can use a Normal Move ability." },
];

export const spellLores = [
  {
    id: "lore-of-the-weird",
    name: "Lore of the Weird",
    spells: [
      { id: "bash-em-ladz", name: "Bash 'Em, Ladz!", castingValue: 6, type: "Spell", phase: "Your Hero Phase", keywords: ["Spell", "Unlimited"], description: "Pick a visible friendly Ironjawz unit wholly within 12\". Its melee weapons have Crit (2 Hits) for the rest of the turn." },
      { id: "mighty-eadbutt", name: "Mighty 'Eadbutt", castingValue: 6, type: "Spell", phase: "Your Hero Phase", keywords: ["Spell"], description: "Pick a visible enemy within 18\". Inflict D3 mortal damage, or 3 mortal damage if the target is a Wizard." },
      { id: "da-great-big-green-hand-of-gork", name: "Da Great Big Green Hand of Gork", castingValue: 7, type: "Spell", phase: "Your Hero Phase", keywords: ["Spell"], description: "Move a visible friendly unit wholly within 12\" and not in combat to a position wholly within 24\" of the caster and more than 9\" from enemies." },
    ],
  },
];

export const prayerLores = [
  {
    id: "warbeats",
    name: "Warbeats",
    prayers: [
      { id: "get-em-beat", name: "Get 'Em Beat", chantingValue: 4, phase: "Your Hero Phase", keywords: ["Prayer", "Unlimited"], description: "Add 1 to charge rolls for a visible friendly Ironjawz unit wholly within 12\". On an 8+, add one charge die, to a maximum of 3." },
      { id: "fixin-beat", name: "Fixin' Beat", chantingValue: 4, phase: "Your Hero Phase", keywords: ["Prayer"], description: "Heal (D6) a visible friendly Ironjawz unit wholly within 12\". On an 8+, Heal (D3+3) instead." },
      { id: "killa-beat", name: "Killa Beat", chantingValue: 5, phase: "Your Hero Phase", keywords: ["Prayer"], description: "Add 1 to the Damage of a visible friendly Ironjawz unit's melee weapons. On a 10+, pick a second eligible unit." },
    ],
  },
];
