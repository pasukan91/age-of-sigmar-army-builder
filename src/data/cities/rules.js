import { ability } from "../orrukWarclans/unitFactory";

const formation = (id, name, abilityName, type, phase, description, keywords = []) => ({
  id,
  name,
  description,
  ability: ability(abilityName, phase, description, type, keywords),
});

const enhancement = (
  id,
  name,
  description,
  { source = "Battletome", points = 0, phase = null, type = null } = {}
) => ({
  id,
  name,
  source,
  points,
  phase,
  type: type ?? phase,
  description,
});

export const battleTraits = [
  {
    id: "form-up",
    name: "Form Up!",
    type: "Ability",
    phase: "Start of Battle Round",
    keywords: [],
    description:
      "Pick a friendly Cities of Sigmar unit, then pick 2 other visible friendly Cities of Sigmar units wholly within 12\" of it. The 3 units cannot already be under orders and must each be a different unit type. For the rest of the battle round, all 3 are under orders.",
  },
  {
    id: "take-aim",
    name: "Take Aim!",
    type: "Once Per Turn (Army)",
    phase: "Your Shooting Phase",
    keywords: [],
    description:
      "Pick a friendly unit that is under orders and 1 of its ranged weapons. Add 1 to hit rolls for shooting attacks made with that weapon for the rest of the turn.",
  },
  {
    id: "sound-the-attack",
    name: "Sound the Attack!",
    type: "Once Per Turn (Army)",
    phase: "Reaction: You declared a Charge ability for a unit that is under orders",
    keywords: ["Charge"],
    description:
      "The unit using that Charge ability can change the lowest D6 in the charge roll to match the highest D6.",
  },
  {
    id: "into-them-you-dogs",
    name: "Into Them, You Dogs!",
    type: "Once Per Turn (Army)",
    phase: "Any Combat Phase",
    keywords: [],
    description:
      "Pick a friendly Hero that is under orders as the field officer, then pick 2 other visible friendly non-Hero units that are under orders and wholly within 12\" of it. The first time the field officer uses a Fight ability this turn, pick one target that has not fought as inspirited and the other as emboldened. The inspirited target can fight immediately after the field officer; the emboldened target can then fight immediately after the inspirited target if it has not fought.",
  },
  {
    id: "hurl-them-back",
    name: "Hurl Them Back!",
    type: "Once Per Turn (Army)",
    phase: "Any Combat Phase",
    keywords: [],
    description:
      "Pick a friendly unit that is under orders and in combat with an enemy unit that charged this turn. Add 1 to the Rend characteristic of that unit's melee weapons for the rest of the turn.",
  },
];

export const battleFormations = [
  formation(
    "stalwart-guardians",
    "Stalwart Guardians",
    "To the Last",
    "Passive",
    null,
    "Each time a friendly unit that is under orders uses the Rally command, you can make 3 additional rally rolls of D6."
  ),
  formation(
    "zealous-hordes",
    "Zealous Hordes",
    "Throngs of the Faithful",
    "Once Per Turn (Army)",
    "Reaction: Your opponent declared a Fight ability",
    "For the rest of the turn, add 1 to wound rolls for combat attacks made by friendly Sigmarite units that target the enemy unit using that Fight ability."
  ),
  formation(
    "collegiate-exemplars",
    "Collegiate Exemplars",
    "Masters of the Arcane",
    "Passive",
    null,
    "Add 1 to arcane manipulation rolls and banishment rolls for friendly Wizards that are under orders."
  ),
  formation(
    "swift-reinforcements",
    "Swift Reinforcements",
    "Dawnbringer Crusade",
    "Once Per Turn (Army)",
    "Your Hero Phase",
    "Pick a friendly non-Hero Cities of Sigmar Infantry unit wholly within friendly territory. It can move 6\". If it is in combat, it can pass through enemy combat ranges but can only end in combat with units it was fighting at the start of the move. If it is not in combat, it cannot enter combat during that move.",
    ["Move"]
  ),
];

export const heroicTraits = [
  enhancement(
    "stentorian-general",
    "Stentorian General",
    "Subtract 1 from ward rolls for enemy units while they are in combat with any visible friendly units that are wholly within 12\" of this unit and under orders."
  ),
  enhancement(
    "grizzled-drillmaster",
    "Grizzled Drillmaster",
    "Other visible friendly units have Ward (6+) while they are wholly within 12\" of this unit and under orders."
  ),
  enhancement(
    "beloved-leader",
    "Beloved Leader",
    "Ignore negative modifiers to hit and wound rolls applied by enemy abilities for attacks made by visible friendly units that are wholly within 12\" of this unit and under orders."
  ),
  enhancement(
    "pious-veteran",
    "Pious Veteran",
    "Each time you pick targets while declaring a Prayer ability used by a friendly Cities of Sigmar Priest, if this unit is eligible to be picked, you can pick it to be an additional target.",
    { source: "Aqshy" }
  ),
  enhancement(
    "bristling-attitude",
    "Bristling Attitude",
    "When an opponent declares a Charge ability for a visible unit within 12\", spend any number of rage dice. If your opponent's fury level is lower than yours, they increase it by 1, to a maximum of 7. Roll one die for each rage dice spent; for each 3+, subtract 1 from the charge roll.",
    {
      source: "Aqshy",
      phase: "Reaction: Opponent declared a Charge ability for a visible unit within 12\"",
    }
  ),
  enhancement(
    "cosmopolitan-leader",
    "Cosmopolitan Leader",
    "In your hero phase, pick up to 3 visible friendly non-War Machine Sigmarite units wholly within 12\". Spend 1 rage dice for each target. If your opponent's fury level is lower than yours, they increase it by 1, to a maximum of 7. Add 1 to wound rolls for each target's combat attacks until the start of your next turn.",
    { source: "Aqshy", phase: "Your Hero Phase" }
  ),
];

export const artefacts = [
  enhancement(
    "the-last-blade-of-embergard",
    "The Last Blade of Embergard",
    "This unit can use this ability while in reserve. Pick 1 of its non-Companion melee weapons. Add 2 to that weapon's Attacks and Rend characteristics for the rest of the battle.",
    { phase: "Deployment Phase" }
  ),
  enhancement(
    "bones-of-saint-ignifus",
    "Bones of Saint Ignifus",
    "When you declare a Spell or Prayer ability for a visible unit wholly within 12\" of this unit and under orders, add 1 to the casting roll or chanting roll.",
    {
      phase:
        "Reaction: You declared a Spell or Prayer ability for a visible unit wholly within 12\" and under orders",
    }
  ),
  enhancement(
    "the-sphere-celestial",
    "The Sphere Celestial",
    "If this unit is not in combat, pick a point on the battlefield within 1\" of this unit and more than 3\" from all other units (friendly and enemy) and terrain features, then another visible friendly Cities of Sigmar Infantry or Cavalry Hero wholly within 18\" and not in combat. Swap their positions, setting each up within 1\" of the other's former position and not in combat. Both can use Move abilities in the following movement phase.",
    { phase: "Your Hero Phase" }
  ),
];

export const ironweldInnovations = [
  enhancement(
    "prototype-arco-combustor-uninhibitor",
    "Prototype Arco-combustor Uninhibitor",
    "For the rest of the turn, add 3\" to this unit's Move, it can use Shoot abilities after Retreating, and Retreat abilities inflict no mortal damage on it.",
    { phase: "Once Per Battle, Your Movement Phase" }
  ),
  enhancement(
    "grapple-net-launcher",
    "Grapple-net Launcher",
    "If this unit did not charge this turn, pick an enemy unit in combat with it that charged this turn. Subtract 1 from the Attacks characteristic of the target's melee weapons for the rest of the turn.",
    { phase: "Once Per Battle, Enemy Combat Phase" }
  ),
  enhancement(
    "emergency-bellows",
    "Emergency Bellows",
    "Remove 1 of this unit's heat tokens.",
    { phase: "End of Any Turn" }
  ),
];

export const decorationsForValour = [
  enhancement(
    "twin-tailed-comet-of-honour",
    "Twin-tailed Comet of Honour",
    "While this unit has any champions, add 5 to its control score.",
    { source: "Aqshy", points: 10 }
  ),
  enhancement(
    "the-living-city-cross",
    "The Living City Cross",
    "While this unit has any champions, subtract 1 from hit rolls for shooting attacks that target this unit.",
    { source: "Aqshy", points: 10 }
  ),
  enhancement(
    "aqshian-order-of-merit",
    "Aqshian Order of Merit",
    "While this unit has any champions, if an enemy in combat with it uses Eruption of Fury, unmodified hit rolls of 6 for that ability do not inflict the additional D3 mortal damage on each unit in combat with the enemy.",
    { source: "Aqshy", points: 10 }
  ),
];

export const spellLores = [
  {
    id: "spells-of-the-collegiate-arcane",
    name: "Spells of the Collegiate Arcane",
    spells: [
      {
        id: "speed-of-the-twin-tailed-comet",
        name: "Speed of the Twin-tailed Comet",
        castingValue: 6,
        type: "Spell",
        phase: "Your Hero Phase",
        keywords: ["Spell", "Unlimited"],
        description:
          "Add 3\" to the Move characteristic of friendly non-War Machine Cities of Sigmar units while they are wholly within 12\" of and visible to the caster for the rest of the turn.",
      },
      {
        id: "curse-of-scorched-metal",
        name: "Curse of Scorched Metal",
        castingValue: 7,
        type: "Spell",
        phase: "Your Hero Phase",
        keywords: ["Spell"],
        description:
          "Pick a visible enemy unit within 18\". Until the start of your next turn, the first time it uses an Attack ability, each unmodified hit roll of 1 inflicts 1 mortal damage on it after that Attack ability has been resolved.",
      },
      {
        id: "high-stars-light",
        name: "High Star's Light",
        castingValue: 6,
        type: "Spell",
        phase: "Your Hero Phase",
        keywords: ["Spell"],
        description:
          "Pick a visible friendly Cities of Sigmar unit wholly within 12\". Add 1 to the Attacks characteristic of its melee weapons for the rest of the turn.",
      },
    ],
  },
];

export const prayerLores = [
  {
    id: "scriptures-of-sigmar",
    name: "Scriptures of Sigmar",
    prayers: [
      {
        id: "holy-aegis",
        name: "Holy Aegis",
        chantingValue: 3,
        type: "Prayer",
        phase: "Your Hero Phase",
        keywords: ["Prayer", "Unlimited"],
        description:
          "Pick a visible friendly Cities of Sigmar unit wholly within 12\". If the chanting roll was 7+, pick a second eligible unit. Until the start of your next turn, ignore the first damage point that would be allocated to each target in each phase.",
      },
      {
        id: "reckoning-of-sinners",
        name: "Reckoning of Sinners",
        chantingValue: 5,
        type: "Prayer",
        phase: "Your Hero Phase",
        keywords: ["Prayer"],
        description:
          "Pick a visible friendly Cities of Sigmar unit wholly within 12\". If the chanting roll was 10+, pick a second eligible unit. Until the start of your next turn, enemy units have a maximum control score of 1 while in combat with any target.",
      },
      {
        id: "benediction-of-the-high-heavens",
        name: "Benediction of the High Heavens",
        chantingValue: 3,
        type: "Prayer",
        phase: "Your Hero Phase",
        keywords: ["Prayer"],
        description:
          "Pick another visible friendly Cities of Sigmar unit wholly within 12\". Heal (D3) the target and the chanter. If the chanting roll was 7+, Heal (D3) each visible friendly Cities of Sigmar unit wholly within 12\" of the chanter instead.",
      },
    ],
  },
];

export const terrain = [{
  id: "dawners-triumph",
  name: "Dawner's Triumph",
  image: "/images/units/cos/dawners_triumph.jpg",
  profile: { move: "-", health: 8, control: "-", save: "4+", ward: "6+" },
  universalAbilities: ["Cover", "Impassable"],
  abilities: [
    ability(
      "Hauled to War",
      "Reaction: You declared a Normal Move ability for a Cities of Sigmar Infantry unit within 3\"",
      "After that Normal Move, pick a point within 1\" of that unit and within 6\" of this terrain. Set this terrain up within 1\" of that point and more than 3\" from enemies.",
      "Once Per Turn (Army)"
    ),
    ability(
      "Fury of the Faithful",
      "Any Combat Phase",
      "Pick a visible enemy within 6\". If this terrain is in combat, apply the effect; otherwise on a 3+. For the rest of the turn, melee weapons used by friendly Cities of Sigmar Infantry and Cavalry units have Crit (Auto-wound) against that enemy.",
      "Ability"
    ),
  ],
  details: { models: 1, baseSize: null },
  keywords: ["Faction Terrain", "Ward (6+)", "Order", "Cities of Sigmar"],
}];
