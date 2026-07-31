import { ability, createOrrukUnit, weapon } from "../orrukWarclans/unitFactory";

function make(config) {
  const manifestation = createOrrukUnit({
    faction: "lumineth",
    points: 0,
    control: "-",
    ...config,
  });

  return {
    ...manifestation,
    castingValue: config.castingValue,
    profile: {
      ...manifestation.profile,
      banishment: "7+",
    },
    summonSpell: {
      name: `Summon ${config.name}`,
      type: "Spell",
      phase: "Your Hero Phase",
      keywords: ["Spell", "Summon"],
      castingValue: config.castingValue,
      description: config.summonDescription,
    },
  };
}

const manifestations = [
  make({
    id: "hyshian-twinstones",
    imageAlias: "hyshian_twinstones",
    name: "Hyshian Twinstones",
    castingValue: 6,
    move: '5"',
    health: 5,
    save: "4+",
    ward: "6+",
    baseSize: "50mm",
    keywords: ["Manifestation", "Endless Spell", "Ward (6+)", "Order", "Lumineth Realm-lords"],
    rules: { ward: "6+", canBeReinforced: false },
    summonDescription:
      "Declare: If there is not a friendly Hyshian Twinstones on the battlefield, pick a friendly Lumineth Realm-lords Wizard to cast this spell, then make a casting roll of 2D6.\n\nEffect: Set up a Hyshian Twinstones wholly within 18\" of the caster and visible to them.",
    weapons: [weapon("Crackling Energy", "Melee", "2D6", "4+", "4+", "0", "1")],
    abilities: [
      ability("Reservoir of Power", null, "Each time any unit successfully casts a spell within 12\", give this manifestation 1 arcane charge point, to a maximum of 6.", "Passive"),
      ability("Release Arcane Charge", "Reaction: You declared a Spell or Unbind ability", "For a Lumineth Realm-lords Wizard within 3\", add this manifestation's arcane charge points to the casting or unbinding roll, then reset them to 0.", "Once Per Turn (Army)"),
    ],
  }),
  make({
    id: "sanctum-of-amyntok",
    imageAlias: "sanctumamyntok",
    name: "Sanctum of Amyntok",
    castingValue: 7,
    move: "-",
    health: 6,
    save: "4+",
    ward: "6+",
    baseSize: "3-part ring",
    keywords: ["Manifestation", "Endless Spell", "Ward (6+)", "Order", "Lumineth Realm-lords"],
    rules: { ward: "6+", canBeReinforced: false },
    summonDescription:
      "Declare: If there is not a friendly Sanctum of Amyntok on the battlefield, pick a friendly Lumineth Realm-lords Wizard to cast this spell, then make a casting roll of 2D6.\n\nEffect: Set up a Sanctum of Amyntok wholly within 12\" of the caster, visible to them and more than 3\" from all enemy units, with its 3 parts touching to form a ring.",
    abilities: [
      ability("Sigil of Yngra", null, "While a friendly unit with Health 10 or less is wholly inside the ring, it is not visible to enemy units and enemy abilities that would target it must target this manifestation instead.", "Passive"),
    ],
  }),
  make({
    id: "rune-of-petrification",
    imageAlias: "runeofpetrification",
    name: "Rune of Petrification",
    castingValue: 7,
    move: "-",
    health: 6,
    save: "4+",
    ward: "6+",
    baseSize: "75 × 42mm",
    keywords: ["Manifestation", "Endless Spell", "Ward (6+)", "Order", "Lumineth Realm-lords"],
    rules: { ward: "6+", canBeReinforced: false },
    summonDescription:
      "Declare: If there is not a friendly Rune of Petrification on the battlefield, pick a friendly Lumineth Realm-lords Wizard to cast this spell, then make a casting roll of 2D6.\n\nEffect: Set up a Rune of Petrification wholly within 12\" of the caster and visible to them.",
    abilities: [
      ability("Turn to Stone", "Any Hero Phase", "Roll a D3 for each enemy within 6\". On a 2+, inflict mortal damage equal to the roll. If 3 mortal damage is inflicted on a unit, it has Strike-last for the rest of the turn.", "Ability"),
    ],
  }),
];

export default manifestations;

