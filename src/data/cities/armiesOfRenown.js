import { ability, createOrrukUnit, weapon } from "../orrukWarclans/unitFactory";
import units from "./units";

const make = (config) => createOrrukUnit({
  faction: "cities",
  ...config,
});

const rule = (id, name, type, phase, description, keywords = []) => ({
  id,
  name,
  type,
  phase,
  description,
  keywords,
});

const enhancement = (id, name, description, phase = null) => ({
  id,
  name,
  source: "Army of Renown",
  points: 0,
  phase,
  type: phase,
  description,
});

const citiesKeywords = ["Order", "Cities of Sigmar"];
const sigmariteKeywords = [...citiesKeywords, "Sigmarite", "Iron March"];
const alliesKeywords = [...citiesKeywords, "Allies of the Free Cities"];
const cogfortRules = {
  hero: true,
  monster: false,
  unique: false,
  companion: true,
  canBeReinforced: false,
};

const immolatorCogfort = make({
  id: "immolator-cogfort",
  name: "The Iron March Immolator Cogfort",
  image: "/images/units/cos/conqueror_cogfort.jpg",
  points: 510,
  move: '6"',
  health: 25,
  control: 10,
  save: "3+",
  baseSize: "160mm",
  regimentOptions: ["Any Freeguild Gallants"],
  keywords: ["Hero", "War Machine", ...sigmariteKeywords],
  rules: cogfortRules,
  weapons: [
    weapon("Realmscorcher Flame Cannon", "Ranged", "6D6", "2+", "4+", "1", "1", ["Anti-Infantry (+1 Rend)"], '18"'),
    weapon("Breacher Cannon", "Ranged", 6, "3+", "3+", "1", "2", ["Anti-Infantry (+1 Rend)"], '12"'),
    weapon("Crew's Leadshotters", "Ranged", 6, "4+", "3+", "1", "D3", ["Shoot in Combat"], '12"'),
    weapon("Crushing Iron Feet", "Melee", 4, "4+", "2+", "2", "4", ["Companion"]),
  ],
  abilities: [
    ability("Battle Damaged", null, "While this unit has 10 or more damage points, Crushing Iron Feet has 3 Attacks and this unit has Control 5.", "Passive"),
    ability(
      "Power to Maximum!",
      "Any Hero Phase",
      "Pick one or more effects and give this unit the listed number of heat tokens: 1, Breacher Cannon has Crit (2 Hits); 1, roll up to 3 dice when charging and remove one; 2, Crushing Iron Feet has Charge (+1 Damage); 3, each model slain by Breacher Cannon inflicts 1 mortal damage on another model in that unit; 4, Realmscorcher Flame Cannon has 22 Attacks.",
      "Once Per Turn (Army)"
    ),
    ability("Overheating", null, "After Power to Maximum!, roll one die per heat token. Each 5+ allocates 1 damage point that cannot be warded, then remove 1 heat token.", "Passive"),
  ],
});

const linebreakerCogfort = make({
  id: "linebreaker-cogfort",
  name: "The Iron March Linebreaker Cogfort",
  image: "/images/units/cos/cannonade_cogfort.jpg",
  points: 450,
  move: '6"',
  health: 25,
  control: 10,
  save: "3+",
  baseSize: "160mm",
  regimentOptions: ["Any Freeguild Gallants"],
  keywords: ["Hero", "War Machine", ...sigmariteKeywords],
  rules: cogfortRules,
  weapons: [
    weapon("Godbreaker Cannon", "Ranged", 4, "4+", "2+", "2", "4", [], '24"'),
    weapon("Crew's Leadshotters", "Ranged", 6, "4+", "3+", "1", "D3", ["Shoot in Combat"], '12"'),
    weapon("Crushing Iron Feet", "Melee", 4, "4+", "2+", "2", "4", ["Companion"]),
  ],
  abilities: [
    ability("Battle Damaged", null, "While this unit has 10 or more damage points, Crushing Iron Feet has 3 Attacks and this unit has Control 5.", "Passive"),
    ability(
      "Ride to Glory",
      "Deployment Phase",
      "Pick up to 1 friendly Iron March Infantry Hero and up to 1 friendly non-Hero Iron March Infantry unit that have not been deployed. Set them up in reserve as this unit's passengers.",
      "Ability",
      ["Deploy"]
    ),
    ability(
      "Venture Forth",
      "Any Charge Phase",
      "If this unit has not used a Run ability this turn, set up each passenger wholly within 6\" and either not in combat or within 1/2\" of an enemy. A target set up in combat has charged. If this unit is not under orders, this unit and the targets are under orders for the rest of the battle round.",
      "Once Per Battle"
    ),
    ability(
      "Output to Maximum!",
      "Any Hero Phase",
      "Pick one or more effects and give this unit the listed number of heat tokens: 1, Crushing Iron Feet has Anti-Monster (+1 Rend); 1, roll up to 3 dice when charging and remove one; 2, Crushing Iron Feet has Charge (+1 Damage); 2, Godbreaker Cannon gains 1 Rend but must target the same enemy; 2, this unit has Move 10\".",
      "Once Per Turn (Army)"
    ),
    ability("Overheating", null, "After Output to Maximum!, roll one die per heat token. Each 5+ allocates 1 damage point that cannot be warded, then remove 1 heat token.", "Passive"),
  ],
});

const auricHearthguard = make({
  id: "allies-auric-hearthguard",
  name: "Allies of the Free Cities Auric Hearthguard",
  image: "/images/units/cos/auric_hearthguard.jpg",
  points: 130,
  models: 5,
  move: '4"',
  health: 2,
  control: 1,
  save: "6+",
  ward: "6+",
  baseSize: "32mm",
  keywords: ["Infantry", "Champion", "Ward (6+)", ...alliesKeywords, "Duardin"],
  rules: { ward: "6+" },
  weapons: [
    weapon("Magmapike", "Ranged", 2, "4+", "3+", "1", "1", ["Crit (2 Hits)", "Shoot in Combat"], '12"'),
    weapon("Magmapike", "Melee", 1, "3+", "3+", "1", "1", ["Crit (2 Hits)"]),
  ],
  abilities: [
    ability(
      "Lava-encrusted",
      null,
      "While this unit is under orders, each critical hit from its shooting attacks subtracts 1\" from the target's Move until the start of your next turn, cumulatively, to a minimum of half its starting Move.",
      "Passive"
    ),
  ],
});

const vulkynFlameseekers = make({
  id: "allies-vulkyn-flameseekers",
  name: "Allies of the Free Cities Vulkyn Flameseekers",
  image: "/images/units/cos/vulkyn_flameseekers.jpg",
  points: 160,
  models: 9,
  move: '4"',
  health: 2,
  control: 1,
  save: "5+",
  ward: "6+",
  baseSize: "32mm [4], 28.5mm [5]",
  keywords: ["Infantry", "Champion (1/9)", "Ward (6+)", ...alliesKeywords, "Duardin"],
  rules: { ward: "6+", companion: true, canBeReinforced: false },
  weapons: [
    weapon("Vulkyn Weapons", "Melee", 3, "3+", "3+", "1", "1", ["Anti-Monster (+1 Rend)"]),
    weapon("Kyndledroth's Fangs", "Melee", 1, "3+", "3+", "0", "2", ["Crit (Mortal)", "Companion"]),
  ],
  abilities: [
    ability(
      "Allied Drothmasters",
      "Any Combat Phase",
      "Pick an enemy Monster in combat. If this unit is under orders, apply the effect; otherwise, apply it on a 3+. Subtract 2 from the Damage of the target's Companion melee weapons for the rest of the turn.",
      "Once Per Turn (Army)"
    ),
  ],
});

const vanariWardens = make({
  id: "allies-vanari-auralan-wardens",
  name: "Allies of the Free Cities Vanari Auralan Wardens",
  image: "/images/units/cos/vanari_auralan_wardens.jpg",
  points: 120,
  models: 10,
  move: '6"',
  health: 1,
  control: 1,
  save: "4+",
  baseSize: "32mm",
  keywords: ["Infantry", "Champion", ...alliesKeywords, "Aelf"],
  weapons: [
    weapon("Warden Pike and Blade", "Melee", 2, "3+", "4+", "0", "1", ["Anti-Charge (+1 Rend)", "Crit (Mortal)"]),
  ],
  abilities: [
    ability(
      "Protective Pike-wall",
      null,
      "If this unit is under orders and has not charged this turn, ignore Charge (+1 Damage) for combat attacks made by enemies that target it.",
      "Passive"
    ),
  ],
});

const vanariSentinels = make({
  id: "allies-vanari-auralan-sentinels",
  name: "Allies of the Free Cities Vanari Auralan Sentinels",
  image: "/images/units/cos/vanari_auralan_sentinels.jpg",
  points: 140,
  models: 10,
  move: '6"',
  health: 1,
  control: 1,
  save: "5+",
  baseSize: "32mm",
  keywords: ["Infantry", "Champion", ...alliesKeywords, "Aelf"],
  weapons: [
    weapon("Auralan Bow", "Ranged", 2, "3+", "4+", "1", "1", ["Crit (Auto-wound)"], '18"'),
    weapon("Sentinel Blades", "Melee", 1, "3+", "4+", "0", "1"),
  ],
  abilities: [
    ability(
      "Fire Lofted Shots!",
      "Your Shooting Phase",
      "If this unit is under orders, add 6\" to the Range of its Auralan Bows and subtract 1 from hit rolls for its shooting attacks for the rest of the turn.",
      "Ability"
    ),
  ],
});

const getUnit = (id) => units.find((unit) => unit.id === id);
const mallusForgepriest = getUnit("mallus-forgepriest");
const freeguildGallants = getUnit("freeguild-gallants");
const baseCogforts = [
  getUnit("cannonade-cogfort"),
  getUnit("conqueror-cogfort"),
];

const ironMarchUnits = [
  ...baseCogforts,
  immolatorCogfort,
  linebreakerCogfort,
  mallusForgepriest,
  freeguildGallants,
].filter(Boolean);

const alliesUnits = [
  ...units.filter((unit) =>
    unit.keywords.includes("Sigmarite") && unit.rules?.unique !== true
  ),
  auricHearthguard,
  vulkynFlameseekers,
  vanariWardens,
  vanariSentinels,
];

const ironMarchRules = {
  units: ironMarchUnits,
  battleTraits: [
    rule(
      "iron-march-form-up",
      "Form Up, Iron March!",
      "Ability",
      "Start of Battle Round",
      "Pick a friendly Iron March unit, then 1 or 2 other visible friendly Iron March units wholly within 12\". They cannot already be under orders and must each be a different unit type. They are under orders for the rest of the battle round."
    ),
  ],
  heroicTraits: [
    enhancement("castellan-captain-vyan-philsin", "Castellan-Captain Vyan Philsin", "Add 1 to wound rolls for combat attacks made by friendly Iron March Infantry units while wholly within 12\" of this unit and under orders.", "Passive"),
    enhancement("commodore-de-gracon", "Commodore de Graçon", "This unit and up to 1 other friendly Iron March War Machine in its combat range can use Normal Move in your movement phase.", "Deployment Phase"),
    enhancement("castellan-captain-regan-valndercloud", "Castellan-Captain Regan Valndercloud", "If this unit charged, pick a visible enemy within 1\" and roll a D3. On a 2+, inflict mortal damage equal to the roll and that enemy has a maximum control score of 1 for the rest of the turn.", "Any Charge Phase"),
  ],
  artefacts: [
    enhancement("engineer-kirsta-loudren", "Engineer Kirsta Loudren", "If this unit is destroyed, before removing it roll for each visible unit within its combat range. On a 3+, inflict mortal damage equal to the roll on that unit.", "Passive"),
    enhancement("engineer-gurren-ashbrow", "Engineer Gurren Ashbrow", "Each time this unit uses the Rally command, make 3 additional rally rolls of D6.", "Passive"),
    enhancement("engineer-bartel-holst", "Engineer Bartel Holst", "This unit has Ward (6+) and Strike-last.", "Passive"),
  ],
  ironweldInnovations: [
    enhancement("battle-priest-solantra-whyl", "Battle-Priest Solantra Whyl", "This unit has Priest (1).", "Passive"),
    enhancement("broadmoore-and-louse", "Broadmoore and Louse", "Add 2 to the Attacks of this unit's Crew's Leadshotters. If this unit is destroyed, on a 3+ set up a Freeguild Marshal and Relic Envoy within 6\" and not in combat; it gains the Iron March keyword.", "Passive"),
    enhancement("master-sapper-gavelock-fiske", "Master Sapper Gavelock Fiske", "This unit's ranged weapons have Anti-Faction Terrain (+1 Rend) and Anti-War Machine (+1 Rend).", "Passive"),
  ],
  heroicTraitLabel: "Comandante de la Marcha de Hierro",
  artefactLabel: "Ingeniero de la Marcha de Hierro",
  ironweldInnovationLabel: "Auxiliar de la Marcha de Hierro",
  allowCogfortHeroEnhancements: true,
  spellLores: [],
  prayerLores: [{
    id: "iron-march-prayer-lore",
    name: "Iron March Prayer Lore",
    prayers: [{
      id: "the-chant-of-iron",
      name: "The Chant of Iron",
      chantingValue: 4,
      keywords: ["Prayer", "Unlimited"],
      description: "Pick either an enemy within 18\" or a friendly Iron March unit wholly within 12\" that has not been targeted by this prayer this turn. Against enemies, subtract 2\" from Move until your next turn and, on an 8+, pick a second target. For a friendly target, Heal (D3) it and the chanter; on an 8+, instead Heal (D3) every eligible friendly Iron March unit wholly within 12\".",
    }],
  }],
  manifestations: [],
  manifestationLores: [],
  terrain: [],
};

const alliesRules = {
  units: alliesUnits,
  battleTraits: [
    rule(
      "allies-form-up",
      "Form Up, Allies!",
      "Ability",
      "Start of Battle Round",
      "Pick a friendly Allies of the Free Cities unit, then 2 other visible friendly Allies of the Free Cities units wholly within 12\". They cannot already be under orders and must each be a different unit type. They are under orders for the rest of the battle round."
    ),
    rule(
      "forces-of-order",
      "Forces of Order",
      "Passive",
      null,
      "While 3 friendly Allies of the Free Cities units are wholly within 12\" of each other and include an Aelf, a Duardin and a Sigmarite unit, those units have Ward (5+) against shooting attacks, add 3 to their control scores and add 1 to wound rolls for their combat attacks."
    ),
  ],
  heroicTraits: [
    enhancement("respected-commander", "Respected Commander", "When determining a Redeploy distance for a visible Allies of the Free Cities unit wholly within 18\", a roll of 1-3 can be treated as 4.", "Reaction: You declared the Redeploy command"),
  ],
  artefacts: [
    enhancement("signet-of-the-city", "Signet of the City", "Once per battle in any hero phase, this unit and each visible friendly Allies of the Free Cities unit wholly within 18\" become under orders, gain Ward (6+) and have a maximum control score of 1 for the rest of the turn.", "Once Per Battle (Army), Any Hero Phase"),
  ],
  spellLores: [{
    id: "allies-of-the-free-cities-spell-lore",
    name: "Allies of the Free Cities Spell Lore",
    spells: [{
      id: "these-realms-are-ours",
      name: "These Realms Are Ours",
      castingValue: 7,
      keywords: ["Spell", "Unlimited"],
      description: "Pick an objective within 18\". For the rest of the turn, melee weapons used by friendly Allies of the Free Cities units have Charge (+1 Damage) against enemies contesting that objective.",
    }],
  }],
  prayerLores: [{
    id: "allies-of-the-free-cities-prayer-lore",
    name: "Allies of the Free Cities Prayer Lore",
    prayers: [{
      id: "divine-mandate",
      name: "Divine Mandate",
      chantingValue: 5,
      keywords: ["Prayer", "Unlimited"],
      description: "Pick a visible friendly Allies of the Free Cities unit wholly within 12\". On a 10+, pick a second target. Until your next turn, enemies have a maximum control score of 1 while in combat with a target.",
    }],
  }],
  manifestations: [],
  manifestationLores: [],
  terrain: [],
};

const armiesOfRenown = [
  {
    id: "the-iron-march",
    name: "The Iron March",
    roster: [
      "Cannonade Cogfort",
      "Immolator Cogfort",
      "Conqueror Cogfort",
      "Linebreaker Cogfort",
      "For each Conqueror or Linebreaker: up to 1 Mallus Forgepriest and 1 Freeguild Gallants unit",
    ],
    requiredUnits: [],
    excludesRegimentsOfRenown: true,
    excludesFactionTerrain: true,
    description: "Una columna mecanizada de Cogforts con comandantes, ingenieros y auxiliares exclusivos.",
    rules: ironMarchRules,
  },
  {
    id: "allies-of-the-free-cities",
    name: "Allies of the Free Cities",
    roster: [
      "Any non-Unique Sigmarite units",
      "Any Allies of the Free Cities Duardin units",
      "Any Allies of the Free Cities Aelf units",
      "1 Sigmarite unit for each Aelf or Duardin unit",
    ],
    requiredUnits: [],
    excludesRegimentsOfRenown: true,
    description: "Una alianza de Sigmaritas, aelfos y duardin que combate bajo órdenes compartidas.",
    rules: alliesRules,
  },
];

export default armiesOfRenown;
