import { ability, weapon } from "../orrukWarclans/unitFactory";

const option = (id, name, points, description, source = "Battletome") => ({
  id,
  name,
  points,
  source,
  description,
});

export const battleTraits = [
  {
    id: "the-faces-of-the-bad-moon",
    name: "The Faces of the Bad Moon",
    type: "Once Per Battle Round (Army)",
    phase: "Start of Battle Round",
    keywords: [],
    description: "At the start of the first battle round, pick Grinnin', Scowlin', Sulkin' or Cacklin'. At the start of each later battle round, the Bad Moon advances to the next face in that sequence.",
  },
  {
    id: "under-the-light-of-the-bad-moon",
    name: "Under the Light of the Bad Moon",
    type: "Passive",
    phase: null,
    keywords: [],
    description: "Cacklin' or Grinnin': non-Squig Moonclan units gain +5 control and Spiderfang units score critical hits on unmodified hit rolls of 5+. Grinnin' or Scowlin': subtract 1 Rend from combat attacks targeting Troggoths. Scowlin' or Sulkin': Squig units can use Move 4 instead of rolling. Sulkin' or Cacklin': Gitmob units can Charge and Shoot after Retreating.",
  },
  {
    id: "creeping-gloom",
    name: "Creeping Gloom",
    type: "Once Per Turn (Army)",
    phase: "Your Hero Phase",
    keywords: [],
    description: "Pick a terrain feature. Until your next turn, friendly non-Monster, non-War Machine Gloomspite Gitz units wholly within 3\" of it are not visible to enemies more than 9\" away.",
  },
];

export const battleFormations = [
  {
    id: "gloomspite-horde",
    name: "Gloomspite Horde",
    description: "Moonclan and Spiderfang mobs spread violent lunacy through the enemy line.",
    ability: ability("Spreading Loonacy", "End of Your Turn", "Pick up to 3 friendly non-Squig Moonclan or Spiderfang units in combat. Each makes a pile-in move, then on a 2+ inflicts D3 mortal damage on an enemy in combat.", "Once Per Turn (Army)"),
  },
  {
    id: "gitmob-pack",
    name: "Gitmob Pack",
    description: "Gitmob units stab at pursuers while slipping out of combat.",
    ability: ability("Git and Run", "Your Movement Phase", "Pick a friendly Gitmob unit in combat. On a 2+, inflict D3 mortal damage on an enemy in combat, then the Gitmob can move up to its Move characteristic through enemy combat ranges but cannot end in combat.", "Once Per Turn (Army)", ["Core", "Move", "Retreat"]),
  },
  {
    id: "squigalanche",
    name: "Squigalanche",
    description: "Charging squigs become even more ravenous.",
    ability: ability("Bouncing Fury", null, "Each time a friendly Squig unit charges, add 1 to the Attacks characteristic of its Fang-filled Gobs, Massive Fang-filled Gobs or Huge Fang-filled Gobs for the rest of the turn.", "Passive"),
  },
  {
    id: "troggherd",
    name: "Troggherd",
    description: "A massed troggoth herd regenerates as it fights.",
    ability: ability("Herd Healing", null, "After a friendly Troggoth unit resolves a Fight ability, Heal (D3) that unit.", "Passive"),
  },
];

export const heroicTraits = [
  option("the-clammy-hand", "The Clammy Hand", 0, "Each time a friendly Gloomspite Gitz unit wholly within 12\" uses Rally, make 3 additional rally rolls."),
  option("loontouched", "Loontouched", 20, "If this unit is not a Wizard, it has Wizard (1). Otherwise, add 1 to its casting rolls."),
  option("fight-another-day", "Fight Another Day", 0, "In any combat phase, if this unit is in combat, roll a dice. On a 3+, it can immediately Retreat without suffering mortal damage."),
];

export const artefacts = [
  option("the-clammy-cowl", "The Clammy Cowl", 20, "Subtract 1 from hit rolls for attacks that target this unit."),
  option("backstabbers-blade", "Backstabber's Blade", 0, "Once per battle at the end of any turn, pick an enemy Hero in combat. On a 2+, inflict mortal damage equal to the roll."),
  option("leering-gitshield", "Leering Gitshield", 0, "Each unmodified hit roll of 1 for an attack targeting this unit inflicts 1 mortal damage on the attacker after the Attack ability resolves."),
];

export const specialKnickKnacks = [
  option("fizzcap", "Fizzcap", 10, "Once per battle in any hero phase, this unit can use one Summon Spell from your manifestation lore with a fixed, unmodifiable casting roll of 12 that cannot be unbound. If it is not Moonclan, on a 1-4 one model in the unit is slain.", "Aqshy"),
  option("spoofshrooms", "Spoofshrooms", 10, "At the end of any turn, roll a dice (D3+3 for Gitmob). This unit can move that many inches through enemy combat ranges but cannot end in a new combat.", "Aqshy"),
  option("glitzy-bitz-rolla", "Glitzy Bitz Rolla", 10, "At the start of any turn, spend 1 rage dice. Non-Troggoths gain +1 to wound for the turn; Troggoths improve one of Colossal Boulder Club, Throwin' Boulders or Noxious Vomit.", "Aqshy"),
];

export const spellLores = [
  {
    id: "lore-of-the-clammy-dank",
    name: "Lore of the Clammy Dank",
    description: "The fungal sorcery of Moonclan and Spiderfang shamans.",
    spells: [
      { id: "bad-portents", name: "Bad Portents", castingValue: 6, keywords: ["Unlimited"], description: "Roll a dice. On a 3-5, advance the face of the Bad Moon; on a 6, pick a new face for this battle round." },
      { id: "spore-maws", name: "Spore Maws", castingValue: 7, description: "Pick up to 3 visible enemy units within 12\". Roll a D3 for each; on a 2+, inflict mortal damage equal to the roll." },
      { id: "the-hand-of-gork", name: "The Hand of Gork", castingValue: 7, description: "Teleport a visible friendly Gloomspite Gitz unit wholly within 12\" and not in combat to a position wholly within 24\" of the caster and more than 9\" from enemies." },
    ],
  },
  {
    id: "lore-of-the-little-waaagh",
    name: "Lore of the Little Waaagh!",
    description: "Additional spell lore from Scourge of Aqshy.",
    spells: [
      { id: "puffballoons", name: "Puffballoons", castingValue: 6, description: "A visible friendly Gloomspite Gitz unit wholly within 12\" can move up to 3\" after an ability inflicts damage on it, until your next turn." },
      { id: "itchy-nuisance", name: "Itchy Nuisance", castingValue: 6, keywords: ["Unlimited"], description: "Pick an objective within 18\". Until your next turn, subtract 1 from wound rolls for enemy attacks while their unit contests it." },
      { id: "loonshrine-glow", name: "Loonshrine Glow", castingValue: 7, description: "For the turn, a Bad Moon Loonshrine can set up its Moonclan Lairs replacement wholly within 6\" of the caster and more than 3\" from enemies." },
    ],
  },
];

export const manifestations = [
  {
    id: "morks-mighty-mushroom",
    name: "Mork's Mighty Mushroom",
    image: "/images/units/gloomspite/morks_mighty_mushroom.jpg",
    castingValue: 6,
    profile: { move: "-", health: 6, control: "-", save: "6+", ward: "6+", banishment: "7+" },
    weapons: [],
    abilities: [ability("Mutating Spores", "Any Shooting Phase", "Pick up to 3 enemies within 6\". Roll one dice for each model in each target within 6\"; every 5+ inflicts 1 mortal damage.")],
    summonSpell: {
      name: "Summon Mork's Mighty Mushroom",
      type: "Spell",
      phase: "Your Hero Phase",
      castingValue: 6,
      keywords: ["Spell", "Summon"],
      description: "Declare: If there is not a friendly Mork's Mighty Mushroom on the battlefield, pick a friendly GLOOMSPITE GITZ WIZARD to cast this spell, then make a casting roll of 2D6.\n\nEffect: Set up a Mork's Mighty Mushroom wholly within 12\" of the caster and visible to them.",
    },
    keywords: ["Manifestation", "Endless Spell", "Ward (6+)", "Destruction", "Gloomspite Gitz"],
  },
  {
    id: "scuttletide",
    name: "Scuttletide",
    image: "/images/units/gloomspite/scuttletide.jpg",
    castingValue: 6,
    profile: { move: '8"', health: 6, control: "-", save: "6+", ward: "6+", banishment: "7+" },
    weapons: [weapon("Spider Bites", "Melee", 8, "4+", "4+", "0", "1", ["Crit (Mortal)"])],
    abilities: [
      ability("Wall Crawler", null, "This manifestation can pass across terrain as if it had Fly.", "Passive"),
      ability("Endless Terrors", null, "This manifestation has Ward (4+) while wholly within 12\" of a friendly Arachnarok.", "Passive"),
    ],
    summonSpell: {
      name: "Summon Scuttletide",
      type: "Spell",
      phase: "Your Hero Phase",
      castingValue: 6,
      keywords: ["Spell", "Summon"],
      description: "Declare: If there is not a friendly Scuttletide on the battlefield, pick a friendly GLOOMSPITE GITZ WIZARD to cast this spell, then make a casting roll of 2D6.\n\nEffect: Set up a Scuttletide wholly within 12\" of the caster, visible to them and more than 9\" from all enemy units.",
    },
    keywords: ["Manifestation", "Endless Spell", "Ward (6+)", "Destruction", "Gloomspite Gitz"],
  },
  {
    id: "scrapskuttles-arachnacauldron",
    name: "Scrapskuttle's Arachnacauldron",
    image: "/images/units/gloomspite/scrapskuttles_rachnacauldron.jpg",
    castingValue: 7,
    profile: { move: '6"', health: 6, control: "-", save: "5+", ward: "6+", banishment: "7+" },
    weapons: [weapon("Spider Legs", "Melee", 2, "4+", "3+", "0", "2")],
    abilities: [ability("Blessings of the Cauldron", "Your Hero Phase", "Pick a friendly Gloomspite Gitz Wizard within 1\". Add 1 to its power level until your next turn.")],
    summonSpell: {
      name: "Summon Scrapskuttle's Arachnacauldron",
      type: "Spell",
      phase: "Your Hero Phase",
      castingValue: 7,
      keywords: ["Spell", "Summon"],
      description: "Declare: If there is not a friendly Scrapskuttle's Arachnacauldron on the battlefield, pick a friendly GLOOMSPITE GITZ WIZARD to cast this spell, then make a casting roll of 2D6.\n\nEffect: Set up a Scrapskuttle's Arachnacauldron wholly within 12\" of the caster, visible to them and more than 9\" from all enemy units.",
    },
    keywords: ["Manifestation", "Endless Spell", "Ward (6+)", "Destruction", "Gloomspite Gitz"],
  },
  {
    id: "malevolent-moon",
    name: "Malevolent Moon",
    image: "/images/units/gloomspite/malevolent_moon.jpg",
    castingValue: 7,
    profile: { move: '12"', health: 6, control: "-", save: "6+", ward: "6+", banishment: "7+" },
    weapons: [weapon("Lunarock Slam", "Melee", 1, "4+", "3+", "0", "D3")],
    abilities: [ability("Lurid Light", null, "Friendly Gloomspite Gitz units wholly within 12\" are affected by all four faces of the Bad Moon.", "Passive")],
    summonSpell: {
      name: "Summon Malevolent Moon",
      type: "Spell",
      phase: "Your Hero Phase",
      castingValue: 7,
      keywords: ["Spell", "Summon"],
      description: "Declare: If there is not a friendly Malevolent Moon on the battlefield, pick a friendly GLOOMSPITE GITZ WIZARD to cast this spell, then make a casting roll of 2D6.\n\nEffect: Set up a Malevolent Moon wholly within 12\" of the caster, visible to them and more than 9\" from all enemy units.",
    },
    keywords: ["Manifestation", "Endless Spell", "Fly", "Ward (6+)", "Destruction", "Gloomspite Gitz"],
  },
];

export const manifestationLores = [{
  id: "dank-manifestations",
  name: "Dank Manifestations",
  description: "Mork's Mighty Mushroom, Scuttletide, Scrapskuttle's Arachnacauldron and Malevolent Moon.",
  manifestations,
}];

export const terrain = [{
  id: "bad-moon-loonshrine",
  name: "Bad Moon Loonshrine",
  image: "/images/units/gloomspite/bad_mon_loonshrine.jpg",
  profile: { move: "-", health: 12, control: "-", save: "4+", ward: null },
  universalAbilities: ["Cover", "Impassable"],
  abilities: [ability("Moonclan Lairs", "End of Your Turn", "Pick a destroyed friendly non-Hero, non-Monster, non-War Machine Gloomspite Gitz unit. Set up a replacement at half strength wholly within 12\" of this terrain and more than 3\" from enemies.", "Once Per Turn (Army)")],
  details: { models: 1, baseSize: null },
  keywords: ["Faction Terrain", "Destruction", "Gloomspite Gitz"],
}];
