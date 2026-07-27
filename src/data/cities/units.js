import { ability, createOrrukUnit, weapon } from "../orrukWarclans/unitFactory";

const artwork = {
  "tahlia-vedra-lioness-of-the-parch": "tahlia_vedra",
  "pontifex-zenestra-matriarch-of-the-great-wheel": "zenestra",
  "freeguild-cavalier-marshal": "freeguild_cavalier_marshall",
  "freeguild-marshal-and-relic-envoy": "freeguild_marshall",
  "jorvan-kreel-heir-of-the-kraken": "jorvan_kreel",
  "mallus-forgepriest": "mallus_forgepriest",
  "erasmus-zonn-the-enlightened-one": "erasmus",
  "alchemite-warforger": "alchemite_warforger",
  "amethyst-knellmage": "amethyst_knellmage",
  "aqshian-pyrocaster": "asquian_pyrocaster",
  "galen-and-doralia-ven-denst": "galen_doralia",
  "callis-and-toll": "saviours_cinderfall",
  "tolls-companions": "saviours_cinderfall",
  "freeguild-command-adjutants": "freeguild_command_corps",
  "freeguild-command-auxiliaries": "freeguild_command_corps",
  "freeguild-command-corps-whisperblade": "freeguild_command_corps",
  "freeguild-steelhelms": "freeguild_steelhelms",
  "freeguild-cavaliers": "freeguild_cavaliers",
  "freeguild-gallants": "freeguild_gallants",
  "freeguild-grenadiers": "freeguild_grenadiers",
  "fusil-major-on-ogor-warhulk": "fusil-major-on-ogor",
  "ironweld-great-cannon": "ironweld_great_cannon",
  "freeguild-fusiliers": "freeguild_fusiliers",
  "wildercorps-hunters": "wildercorps_hunters",
  "cannonade-cogfort": "cannonade_cogfort",
  "conqueror-cogfort": "conqueror_cogfort",
  "gate-gargants": "gate_gargants",
};

const make = (config) => createOrrukUnit({
  faction: "cities",
  image: artwork[config.id]
    ? `/images/units/cos/${artwork[config.id]}.jpg`
    : "/images/factions/citiesofsigmar.webp",
  ...config,
});
const cities = ["Order", "Cities of Sigmar"];
const sigmarite = [...cities, "Sigmarite"];
const heroRules = { hero: true, canBeReinforced: false };

const units = [
  make({
    id: "tahlia-vedra-lioness-of-the-parch",
    name: "Tahlia Vedra, Lioness of the Parch",
    points: 340,
    move: '12"',
    health: 15,
    control: 5,
    save: "3+",
    ward: "6+",
    baseSize: "100mm",
    regimentOptions: ["0-1 Freeguild Veteran", "Any Sigmarite"],
    keywords: ["Warmaster", "Unique", "Hero", "Monster", "Fly", "Ward (6+)", ...sigmarite],
    rules: { ...heroRules, unique: true, monster: true, warmaster: true, ward: "6+", companion: true },
    weapons: [
      weapon("Weapon of Office", "Melee", 6, "3+", "4+", "1", "2"),
      weapon("Infernadine's Leonine Jaws", "Melee", 3, "3+", "2+", "2", "3", [
        "Anti-Monster (+1 Rend)",
        "Companion",
      ]),
      weapon("Infernadine's Scorpid Stinger", "Melee", 2, "4+", "2+", "2", "D3+3", [
        "Crit (Mortal)",
        "Companion",
      ]),
    ],
    abilities: [
      ability(
        "Battle Damaged",
        null,
        "While this unit has 10 or more damage points, Infernadine's Leonine Jaws has 2 Attacks.",
        "Passive"
      ),
      ability(
        "Lead from the Front",
        "Any Combat Phase",
        "Once per battle, if this unit is in combat, pick each visible friendly Sigmarite unit wholly within 12\". Add 1 to hit and wound rolls for those units' combat attacks for the rest of the turn.",
        "Once Per Battle"
      ),
      ability(
        "Paralysing Venom",
        "Any Combat Phase",
        "Pick an enemy unit in combat and roll a die. If the roll is equal to or less than its Health characteristic, subtract 1 from wound rolls for its attacks for the rest of the turn.",
        "Rampage",
        ["Rampage"]
      ),
      ability(
        "Combat Tactician",
        "Enemy Hero Phase",
        "If this unit is not in combat, pick a visible friendly Sigmarite Infantry unit wholly within 18\" and not in combat. It can immediately use a Normal Move ability and is under orders for the rest of the battle round.",
        "Ability"
      ),
    ],
  }),
  make({
    id: "pontifex-zenestra-matriarch-of-the-great-wheel",
    name: "Pontifex Zenestra, Matriarch of the Great Wheel",
    points: 190,
    move: '5"',
    health: 9,
    control: 2,
    save: "5+",
    ward: "4+",
    baseSize: "90 × 52mm",
    regimentOptions: ["0-1 Freeguild Veteran", "Any Sigmarite"],
    keywords: ["Unique", "Hero", "Priest (2)", "Infantry", "Ward (4+)", ...sigmarite],
    rules: { ...heroRules, unique: true, priest: 2, ward: "4+" },
    weapons: [
      weapon("Sceptre of the Wheel", "Melee", 3, "4+", "4+", "1", "D3"),
      weapon("Acolytes' Club and Axe", "Melee", 4, "4+", "4+", "0", "1"),
    ],
    abilities: [
      ability(
        "The Great Wheel Turns",
        null,
        "Each time a model in a visible friendly Sigmarite unit wholly within 12\" is slain by a combat attack while in combat with the attacker, make zealotry rolls equal to that model's Health. Each 6+ inflicts 1 mortal damage on the attacker after its Fight ability resolves.",
        "Passive"
      ),
      ability(
        "Vessel of Sigmar",
        "Your Hero Phase",
        "Make a chanting roll, re-rolling an unmodified 1. Pick 1 effect, or up to 2 different effects on a 10+: Sanctified Ground makes visible enemies that Charge within 9\" gain Strike-last; Ardent Prayers adds 1 to friendly Sigmarite zealotry rolls; Cast Out Evil rolls a D3 for each visible enemy Wizard and Priest and, on a 2+, inflicts that many mortal damage.",
        "Prayer",
        ["Prayer"]
      ),
    ],
  }),
  make({
    id: "freeguild-cavalier-marshal",
    name: "Freeguild Cavalier-Marshal",
    points: 120,
    move: '10"',
    health: 7,
    control: 2,
    save: "3+",
    baseSize: "75 × 42mm",
    regimentOptions: ["0-1 Freeguild Veteran", "Any Sigmarite", "Any Allies of the Free Cities"],
    canJoinRegimentAs: ["freeguild-veteran"],
    keywords: ["Hero", "Cavalry", ...sigmarite],
    rules: { ...heroRules, companion: true },
    weapons: [
      weapon("Dragoon Pistol", "Ranged", 4, "3+", "4+", "1", "1", ["Shoot in Combat"], '10"'),
      weapon("Master-forged Cavalier Sword", "Melee", 5, "3+", "4+", "1", "2", [
        "Charge (+1 Damage)",
      ]),
      weapon("Warhorse's Steel-shod Hooves", "Melee", 2, "5+", "3+", "0", "1", ["Companion"]),
    ],
    abilities: [
      ability(
        "'For Sigmar! For Glory!'",
        "Reaction: You declared the Counter-charge command for this unit",
        "Pick a visible friendly non-Hero Sigmarite Cavalry unit wholly within 12\", not in combat and that has not Run. After this unit's Counter-charge resolves, if this unit is in combat, the target can Charge as if it were your charge phase and can re-roll charge rolls for the rest of the phase.",
        "Reaction"
      ),
      ability(
        "Run Down the Foe",
        "Any Charge Phase",
        "If this unit charged, pick it and up to 2 visible friendly non-Hero Sigmarite Cavalry units that charged and are wholly within 12\". Each target piles in, then on a 2+ inflicts the D3 roll as mortal damage on an enemy in combat.",
        "Once Per Turn (Army)"
      ),
    ],
  }),
  make({
    id: "freeguild-marshal-and-relic-envoy",
    name: "Freeguild Marshal and Relic Envoy",
    points: 110,
    move: '5"',
    health: 5,
    control: 2,
    save: "3+",
    baseSize: "32mm [1], 28.5mm [1]",
    regimentOptions: ["0-1 Freeguild Veteran", "Any Sigmarite", "Any Allies of the Free Cities"],
    canJoinRegimentAs: ["freeguild-veteran"],
    keywords: ["Hero", "Infantry", ...sigmarite],
    rules: heroRules,
    weapons: [
      weapon("Duelling Pistols", "Ranged", 4, "3+", "4+", "1", "1", ["Shoot in Combat"], '10"'),
      weapon("Master-forged Weapon", "Melee", 5, "3+", "4+", "1", "2"),
    ],
    abilities: [
      ability(
        "Attendant Relic Envoy",
        "Your Hero Phase",
        "Pick a visible friendly Sigmarite unit wholly within 18\" and not under orders, then place this unit's Relic Envoy token next to it. While this unit is under orders and on the battlefield, the unit next to the token is also under orders.",
        "Once Per Turn (Army)"
      ),
      ability(
        "Front-line Commander",
        "Reaction: You declared a Fight ability for this unit",
        "Once per battle, if this unit is under orders, pick a friendly Sigmarite Infantry or Monster unit wholly within 12\" or next to its Relic Envoy that has not fought. It can fight immediately after this unit, and can use 2 Fight abilities this phase; after the first, it has Strike-last for the rest of the turn.",
        "Once Per Battle (Army)"
      ),
    ],
  }),
  make({
    id: "jorvan-kreel-heir-of-the-kraken",
    name: "Jorvan Kreel, Heir of the Kraken",
    points: 120,
    move: '6"',
    health: 5,
    control: 2,
    save: "4+",
    baseSize: "32mm [1], 25mm [1]",
    regimentOptions: ["0-1 Freeguild Veteran", "Any Sigmarite"],
    keywords: ["Unique", "Hero", "Infantry", ...sigmarite],
    rules: { ...heroRules, unique: true },
    weapons: [weapon("Ranger Blades", "Melee", 6, "3+", "4+", "1", "2")],
    abilities: [
      ability(
        "Prowling Ash Panther",
        "Any Combat Phase",
        "Thexa is a token. If it is not on the battlefield, place it next to an enemy in combat, then roll a D3. On a 2+, inflict mortal damage equal to the roll. If that enemy is destroyed, remove Thexa.",
        "Ability"
      ),
      ability(
        "Harrying Attacks",
        null,
        "While Thexa is next to an enemy unit, that unit's attacks cannot score critical hits; treat them as regular hits.",
        "Passive"
      ),
      ability(
        "Fluid Combat Style",
        "Reaction: You declared a Fight ability for this unit or a non-Hero Sigmarite Infantry unit wholly within 12\"",
        "After that Fight resolves, pick a point within 6\" of this unit and more than 3\" from all units and terrain. Remove the unit that fought and set it up wholly within 6\" of that point and not in combat.",
        "Reaction"
      ),
    ],
  }),
  make({
    id: "mallus-forgepriest",
    name: "Mallus Forgepriest",
    points: 130,
    move: '5"',
    health: 5,
    control: 2,
    save: "4+",
    baseSize: "28.5mm",
    regimentOptions: ["0-1 Sigmarite War Machine", "Any Sigmarite Infantry"],
    keywords: ["Hero", "Priest (1)", "Infantry", ...sigmarite],
    rules: { ...heroRules, priest: 1 },
    weapons: [weapon("Meteoric Warhammer", "Melee", 4, "4+", "3+", "1", "D3", ["Crit (Auto-wound)"])],
    abilities: [
      ability(
        "Consecrate the Land",
        "Your Movement Phase",
        "Pick an objective you control that this unit is contesting. If no enemies contest it, it becomes consecrated; otherwise it does so on a 3+. Friendly non-War Machine Sigmarite units wholly within 6\" of a consecrated objective and under orders have Ward (5+); friendly Sigmarite War Machines have Ward (6+). It ceases to be consecrated if your opponent gains control.",
        "Once Per Turn (Army)"
      ),
    ],
  }),
  make({
    id: "erasmus-zonn-the-enlightened-one",
    name: "Erasmus Zonn, the Enlightened One",
    points: 170,
    move: '12"',
    health: 9,
    control: 2,
    save: "4+",
    baseSize: "75 × 42mm",
    regimentOptions: ["Any Sigmarite"],
    keywords: ["Unique", "Hero", "Wizard (1)", "Cavalry", "Fly", ...sigmarite],
    rules: { ...heroRules, unique: true, wizard: 1, companion: true },
    weapons: [
      weapon("Rod of Radiance", "Ranged", 2, "3+", "3+", "2", "D3", ["Crit (2 Hits)"], '10"'),
      weapon("Glyphwing's Heads", "Melee", 4, "4+", "3+", "1", "D3+1", ["Companion"]),
    ],
    abilities: [
      ability(
        "Lantern of All-knowledge",
        "Your Hero Phase",
        "If wholly within 9\" of a battlefield corner, choose until your next turn: friendly Sigmarite units wholly within 6\" are not visible beyond 6\"; add 1 power level; add 2 to this unit's arcane manipulation rolls; or add 3 Attacks to Rod of Radiance and set its Damage to 3.",
        "Ability"
      ),
      ability(
        "Realmsphere Mastery",
        "Any Hero Phase",
        "Pick a visible enemy manifestation within 12\" that was not set up this turn. Make a 2D6 arcane manipulation roll. If it equals or exceeds the target's banishment value, set up an Endless Spell that can be summoned using a Summon spell this unit can cast within 1\" of the target and more than 3\" from all enemy units and enemy manifestations. If that Endless Spell has multiple parts, both parts must be set up within 1\" of the target. This unit has summoned that Endless Spell. If a friendly Endless Spell of the same type is already on the battlefield, banish and remove it before setting up the new one. Then banish and remove the target.",
        "Ability"
      ),
      ability(
        "The Four Corners of the Realms",
        "Your Hero Phase",
        "Remove this unit and set it up wholly within 9\" of a battlefield corner and more than 3\" from enemies.",
        "Spell",
        ["Spell"],
        6
      ),
    ],
  }),
  make({
    id: "alchemite-warforger",
    name: "Alchemite Warforger",
    points: 130,
    move: '5"',
    health: 5,
    control: 2,
    save: "5+",
    baseSize: "32mm",
    regimentOptions: ["0-1 Sigmarite War Machine", "Any Sigmarite Infantry"],
    keywords: ["Hero", "Wizard (1)", "Infantry", ...sigmarite],
    rules: { ...heroRules, wizard: 1 },
    weapons: [weapon("Tongstaff", "Melee", 3, "4+", "4+", "1", "D3")],
    abilities: [
      ability(
        "Runic Crucible",
        "Your Hero Phase",
        "Pick a visible friendly Sigmarite unit wholly within 12\" and make an arcane manipulation roll of D6. On a 3+, its melee weapons have Crit (Mortal) until the start of your next turn.",
        "Once Per Turn (Army)"
      ),
    ],
  }),
  make({
    id: "amethyst-knellmage",
    name: "Amethyst Knellmage",
    points: 110,
    move: '5"',
    health: 5,
    control: 2,
    save: "6+",
    baseSize: "32mm",
    regimentOptions: ["0-1 Sigmarite War Machine", "Any Sigmarite Infantry"],
    keywords: ["Hero", "Wizard (1)", "Infantry", ...sigmarite],
    rules: { ...heroRules, wizard: 1 },
    weapons: [weapon("Amethyst Scythe", "Melee", 3, "4+", "4+", "1", "D3")],
    abilities: [
      ability(
        "Deathly Candlelight",
        "Your Hero Phase",
        "Pick a visible enemy unit within 12\". It cannot use commands for the rest of the turn.",
        "Spell",
        ["Spell"],
        7
      ),
      ability(
        "Ominous Presence",
        "Your Hero Phase",
        "Make an arcane manipulation roll of D6. On a 3+, Deathly Candlelight can target a visible enemy within 18\" instead of 12\" for the rest of the turn.",
        "Once Per Turn (Army)"
      ),
    ],
  }),
  make({
    id: "aqshian-pyrocaster",
    name: "Aqshian Pyrocaster",
    points: 100,
    move: '5"',
    health: 5,
    control: 2,
    save: "6+",
    baseSize: "32mm",
    regimentOptions: ["0-1 Sigmarite War Machine", "Any Sigmarite Infantry"],
    keywords: ["Hero", "Wizard (1)", "Infantry", ...sigmarite],
    rules: { ...heroRules, wizard: 1 },
    weapons: [weapon("Burning Fists", "Melee", 3, "4+", "4+", "1", "D3")],
    abilities: [
      ability(
        "Incandescent Incineration",
        "Your Hero Phase",
        "Pick a visible enemy within 12\". If it is not incandescent, inflict D3 mortal damage and it becomes incandescent for the rest of the battle. If it is already incandescent, allocate 3 damage with no ward and it ceases to be incandescent.",
        "Spell",
        ["Spell"],
        6
      ),
      ability(
        "The Flames of Aqshy",
        "Your Hero Phase",
        "Make an arcane manipulation roll of D6. On a 3+, Incandescent Incineration can target a visible enemy within 18\" instead of 12\" for the rest of the turn.",
        "Once Per Turn (Army)"
      ),
    ],
  }),
  make({
    id: "galen-and-doralia-ven-denst",
    name: "Galen and Doralia ven Denst",
    points: 140,
    models: 2,
    move: '5"',
    health: 5,
    control: 2,
    save: "4+",
    baseSize: "28.5mm",
    regimentOptions: ["0-1 Ironweld Great Cannon", "Any Sigmarite Infantry"],
    keywords: ["Unique", "Hero", "Infantry", ...sigmarite],
    rules: { ...heroRules, unique: true },
    weapons: [
      weapon("Anti-thaumic Crossbow", "Ranged", 3, "3+", "4+", "1", "2", [
        "Anti-Manifestation (+1 Rend)",
        "Anti-Wizard (+1 Rend)",
      ], '18"'),
      weapon("Spell-banishing Pistol", "Ranged", 4, "3+", "4+", "1", "1", [
        "Shoot in Combat",
      ], '10"'),
      weapon("Consecrated Blade", "Melee", 4, "3+", "4+", "1", "2", [
        "Anti-Wizard (+1 Rend)",
      ]),
    ],
    abilities: [
      ability(
        "Guardian and Mentor",
        null,
        "While this unit has 2 models, it has Ward (5+).",
        "Passive"
      ),
      ability(
        "Weapons of Banishment",
        "Your Hero Phase",
        "Pick a visible friendly Sigmarite unit wholly within 12\" that is under orders. Until the start of your next turn, while it is wholly within 12\" and under orders, add 1 to the Damage of its melee weapons for attacks that target Wizards, Priests or Manifestations.",
        "Once Per Turn (Army)"
      ),
    ],
  }),
  make({
    id: "callis-and-toll",
    name: "Callis and Toll",
    points: 240,
    models: 2,
    move: '5"',
    health: 5,
    control: 2,
    save: "4+",
    baseSize: "28.5mm",
    regimentOptions: ["Toll's Companions", "Any Sigmarite Infantry"],
    keywords: ["Unique", "Hero", "Infantry", ...sigmarite],
    rules: { ...heroRules, unique: true },
    weapons: [
      weapon("Flintlock Pistols", "Ranged", 4, "3+", "4+", "1", "1", [
        "Anti-Wizard (+1 Rend)",
        "Shoot in Combat",
      ], '10"'),
      weapon("Azyrite Blades", "Melee", 4, "3+", "4+", "1", "2", [
        "Anti-Wizard (+1 Rend)",
      ]),
    ],
    abilities: [
      ability(
        "Relentless Hunters",
        "Start of Battle Round",
        "If there is no marked unit, pick an enemy Hero to be marked for the rest of the battle. If there are no enemy Heroes, pick an enemy non-Hero instead.",
        "Once Per Battle"
      ),
      ability(
        "The Right Tools for the Job",
        null,
        "Double the Damage characteristic of this unit's melee weapons for attacks that target the marked unit.",
        "Passive"
      ),
    ],
  }),
  make({
    id: "tolls-companions",
    name: "Toll's Companions",
    points: 0,
    models: 4,
    move: '5"',
    health: 3,
    control: 1,
    save: "4+",
    baseSize: "40mm [1], 28.5mm [3]",
    keywords: ["Unique", "Infantry", ...sigmarite],
    rules: { unique: true, canBeReinforced: false },
    weapons: [weapon("Exotic Weapons", "Melee", 4, "3+", "4+", "1", "1", [
      "Anti-Wizard (+1 Rend)",
    ])],
    abilities: [
      ability(
        "Hidden Agents",
        "Deployment Phase",
        "If this unit and Callis and Toll have not been deployed, set both up in reserve in the shadows.",
        "Once Per Battle",
        ["Deploy"]
      ),
      ability(
        "Emerge from the Shadows",
        "Your Movement Phase",
        "If this unit is in the shadows, set it up more than 6\" from the marked unit and more than 9\" from all other enemies. Set up Callis and Toll wholly within 6\" of it with the same restrictions.",
        "Once Per Battle"
      ),
      ability(
        "Saviours of Cinderfall",
        null,
        "While Callis and Toll is within this unit's combat range, both units have Ward (5+).",
        "Passive"
      ),
    ],
  }),
  make({
    id: "freeguild-command-adjutants",
    name: "Freeguild Command Corps: Adjutants",
    points: 200,
    models: 3,
    move: '5"',
    health: 3,
    control: 1,
    save: "4+",
    baseSize: "32mm [1], 28.5mm [2]",
    keywords: ["Infantry", ...sigmarite],
    rules: { canBeReinforced: false },
    weapons: [weapon("Adjutant Weapons", "Melee", 3, "4+", "4+", "1", "2")],
    abilities: [
      ability(
        "Freeguild Adjutants",
        "Your Hero Phase",
        "Pick a friendly Sigmarite unit wholly within 12\" that is under orders. If this unit is in combat, the effect applies automatically; otherwise, roll a die and apply it on a 3+. Add 5 to the target's control score until the start of your next turn.",
        "Once Per Turn (Army)"
      ),
    ],
  }),
  make({
    id: "freeguild-command-auxiliaries",
    name: "Freeguild Command Corps: Auxiliaries",
    points: 0,
    models: 2,
    move: '5"',
    health: 3,
    control: 2,
    save: "6+",
    baseSize: "40mm [1], 28.5mm [1]",
    keywords: ["Infantry", "Musician (1/2)", ...sigmarite],
    rules: { canBeReinforced: false },
    weapons: [weapon("Assortment of Weapons", "Melee", 2, "4+", "4+", "0", "1")],
    abilities: [
      ability(
        "Seize the Souls",
        "Your Hero Phase",
        "Pick a visible enemy unit within 18\" and roll a die. On a 3+, models cannot be returned to it and it cannot be healed until the start of your next turn.",
        "Once Per Turn (Army)"
      ),
      ability(
        "Field Surgery",
        "End of Any Turn",
        "If this unit is not in combat, on a 3+ pick a friendly non-War Machine Sigmarite unit wholly within 12\". Return D3 slain models to a non-Hero Infantry target, 1 model to a non-Hero Cavalry target, or Heal (D3) a Hero or Monster.",
        "Once Per Turn (Army)"
      ),
    ],
  }),
  make({
    id: "freeguild-command-corps-whisperblade",
    name: "Freeguild Command Corps: Whisperblade",
    points: 0,
    move: '5"',
    health: 3,
    control: 2,
    save: "6+",
    baseSize: "28.5mm",
    keywords: ["Infantry", ...sigmarite],
    rules: { canBeReinforced: false },
    weapons: [weapon("Enchanted Rapier", "Melee", 4, "3+", "4+", "2", "2", [
      "Crit (Mortal)",
    ])],
    abilities: [
      ability(
        "Lurking Spymaster",
        null,
        "This unit cannot use or be picked as the target of Form Up!. While it is within the combat range of a friendly Sigmarite Infantry unit with 3 or more models, and no other friendly Whisperblades are within that unit's combat range, this unit cannot be targeted by shooting or combat attacks.",
        "Passive"
      ),
    ],
  }),
  make({
    id: "freeguild-steelhelms",
    name: "Freeguild Steelhelms",
    points: 90,
    models: 10,
    move: '5"',
    health: 1,
    control: 1,
    save: "4+",
    baseSize: "25mm",
    keywords: ["Infantry", "Champion", "Musician (1/10)", "Standard Bearer (1/10)", ...sigmarite],
    weapons: [weapon("Freeguild Weapons", "Melee", 2, "4+", "4+", "0", "1")],
    abilities: [
      ability(
        "Steel of Helm and Heart",
        "Any Combat Phase",
        "If this unit has 5 or more models, pick an enemy in combat. If this unit is under orders, apply the effect; otherwise roll a die, subtracting 1 if the target is a Monster, and apply it on a 4+. When the target fights this turn, it must pile in towards this unit and every model in its combat range must attack this unit.",
        "Once Per Turn (Army)"
      ),
    ],
  }),
  make({
    id: "freeguild-cavaliers",
    name: "Freeguild Cavaliers",
    points: 150,
    models: 5,
    move: '10"',
    health: 3,
    control: 1,
    save: "3+",
    baseSize: "60 × 35mm",
    keywords: ["Cavalry", "Champion", "Standard Bearer (1/5)", ...sigmarite],
    rules: { companion: true },
    weapons: [
      weapon("Cavalier Weapon", "Melee", 3, "3+", "4+", "1", "1", ["Charge (+1 Damage)"]),
      weapon("Warhorse's Steel-shod Hooves", "Melee", 2, "5+", "3+", "0", "1", ["Companion"]),
    ],
    abilities: [
      ability(
        "Storm of Steel",
        "Any Charge Phase",
        "If this unit is in combat and has not charged this turn, pick an enemy in combat and up to 1 friendly Freeguild Cavalier-Marshal in this unit's combat range. If this unit is under orders the effect applies; otherwise on a 3+. This unit and the friendly target can Charge even in combat and outside your charge phase, but must end in combat with the enemy target.",
        "Once Per Turn (Army)"
      ),
    ],
  }),
  make({
    id: "freeguild-gallants",
    name: "Freeguild Gallants",
    points: 130,
    models: 5,
    move: '5"',
    health: 2,
    control: 1,
    save: "3+",
    baseSize: "28.5mm",
    keywords: ["Infantry", "Champion", "Standard Bearer (1/5)", ...sigmarite],
    weapons: [weapon("Weapons of Gallantry", "Melee", 2, "3+", "4+", "1", "1")],
    abilities: [
      ability(
        "Not One Step Back",
        null,
        "If this unit has not used a Charge ability this turn, add 1 to the Attacks and Damage characteristics of its melee weapons.",
        "Passive"
      ),
      ability(
        "Break Them Upon the Walls",
        null,
        "While this unit is under orders, the melee weapons of other visible friendly Sigmarite units wholly within 12\" have Anti-charge (+1 Rend).",
        "Passive"
      ),
    ],
  }),
  make({
    id: "freeguild-grenadiers",
    name: "Freeguild Grenadiers",
    points: 140,
    models: 10,
    move: '5"',
    health: 1,
    control: 1,
    save: "4+",
    baseSize: "28.5mm",
    keywords: ["Infantry", "Champion (1/10)", ...sigmarite],
    rules: { canBeReinforced: false },
    weapons: [
      weapon("Ruin-sweeper Arsenal", "Ranged", 1, "4+", "2+", "2", "1", [], '10"'),
      weapon("Grenadier Bardiche", "Melee", 2, "4+", "4+", "1", "2"),
    ],
    abilities: [
      ability(
        "Cinders and Ashes",
        "End of Any Turn",
        "If this unit contains a Cindergout, pick a terrain feature or objective it contests and every enemy contesting it. Roll a D3 for each target; on a 2+, inflict mortal damage equal to the roll.",
        "Once Per Turn (Army)"
      ),
    ],
  }),
  make({
    id: "fusil-major-on-ogor-warhulk",
    name: "Fusil-Major on Ogor Warhulk",
    points: 160,
    move: '6"',
    health: 8,
    control: 2,
    save: "3+",
    baseSize: "50mm",
    regimentOptions: ["0-1 Freeguild Veteran", "Any Sigmarite", "Any Allies of the Free Cities"],
    canJoinRegimentAs: ["freeguild-veteran"],
    keywords: ["Hero", "Infantry", ...sigmarite],
    rules: heroRules,
    weapons: [
      weapon("Long Fusil", "Ranged", 2, "3+", "2+", "2", "2", [
        "Anti-Hero (+1 Rend)",
        "Crit (Auto-wound)",
      ], '24"'),
      weapon("Warhulk's Mace", "Melee", 4, "4+", "2+", "2", "2"),
    ],
    abilities: [
      ability(
        "Coordinate Attacks",
        "Your Shooting Phase",
        "Pick a visible enemy unit within 24\". For the rest of the turn, add 1 to hit rolls for attacks made by friendly Sigmarite units that are under orders and target that enemy.",
        "Once Per Turn (Army)"
      ),
    ],
  }),
  make({
    id: "ironweld-great-cannon",
    name: "Ironweld Great Cannon",
    points: 140,
    move: '3"',
    health: 6,
    control: 2,
    save: "4+",
    baseSize: "90mm",
    keywords: ["War Machine", ...sigmarite],
    weapons: [
      weapon("Great Cannon", "Ranged", 3, "4+", "2+", "2", "D3+2", [], '24"'),
      weapon("Crew's Tools and Sidearms", "Melee", 2, "4+", "4+", "0", "1"),
    ],
    abilities: [
      ability(
        "Relentless Bombardment",
        "Any Shooting Phase",
        "Pick an enemy targeted by this unit's shooting attacks this phase. Roll a die, adding 1 if this unit is under orders. On a 3+, subtract 2 from charge and run rolls for the target until the start of your next turn.",
        "Once Per Turn (Army)"
      ),
    ],
  }),
  make({
    id: "freeguild-fusiliers",
    name: "Freeguild Fusiliers",
    points: 120,
    models: 10,
    move: '5"',
    health: 1,
    control: 1,
    save: "4+",
    baseSize: "28.5mm",
    keywords: ["Infantry", "Champion", "Standard Bearer (1/10)", ...sigmarite],
    weapons: [
      weapon("Fusil-cannon", "Ranged", 1, "4+", "2+", "2", "1", [], '18"'),
      weapon("Bayonet", "Melee", 1, "4+", "4+", "0", "1"),
    ],
    abilities: [
      ability(
        "Fortified Position",
        null,
        "While this unit is under orders, its ranged weapons have Shoot in Combat and subtract 1 from the Rend of weapons used for attacks that target it.",
        "Passive"
      ),
      ability(
        "Blackpowder Squire",
        "Reaction: You declared a Shoot ability for this unit while it is in combat",
        "Once per battle, remove this unit's Blackpowder Squire token and add 1 to the Rend of its ranged weapons for the rest of the turn.",
        "Once Per Battle"
      ),
    ],
  }),
  make({
    id: "wildercorps-hunters",
    name: "Wildercorps Hunters",
    points: 120,
    models: 11,
    move: '5"',
    health: 1,
    control: 1,
    save: "5+",
    baseSize: "40mm [2], 28.5mm [3], 25mm [6]",
    keywords: ["Infantry", "Champion (1/11)", ...sigmarite],
    rules: { canBeReinforced: false, companion: true },
    weapons: [
      weapon("Hunting Crossbow", "Ranged", 2, "4+", "4+", "1", "1", [], '15"'),
      weapon("Wildercorps Hunting Weapons", "Melee", 2, "4+", "4+", "0", "1"),
      weapon("Trailhound's Ferocious Bite", "Melee", 2, "4+", "4+", "0", "1", ["Companion"]),
    ],
    abilities: [
      ability(
        "Expert Pathfinders",
        "Deployment Phase",
        "Pick this unit and up to 2 friendly non-Monster, non-War Machine Sigmarite units if none have been deployed. Set them up in reserve scouting ahead.",
        "Once Per Turn (Army)",
        ["Deploy"]
      ),
      ability(
        "Prepared Arrival",
        "Your Movement Phase",
        "If this unit is scouting ahead, set it up wholly within 9\" of a battlefield edge and more than 9\" from enemies. Then set up each other friendly unit scouting ahead wholly within 12\" of this unit and more than 9\" from enemies.",
        "Once Per Turn (Army)"
      ),
    ],
  }),
  make({
    id: "cannonade-cogfort",
    name: "Cannonade Cogfort",
    points: 530,
    move: '6"',
    health: 25,
    control: 10,
    save: "3+",
    baseSize: "160mm",
    regimentOptions: ["0-1 Freeguild Veteran", "Any Sigmarite", "Any Allies of the Free Cities"],
    keywords: ["Hero", "War Machine", ...sigmarite],
    rules: { ...heroRules, companion: true },
    weapons: [
      weapon("Godbreaker Cannon", "Ranged", 4, "4+", "2+", "2", "4", [], '24"'),
      weapon("Breacher Cannon", "Ranged", 6, "3+", "3+", "1", "2", ["Anti-Infantry (+1 Rend)"], '12"'),
      weapon("Crew's Leadshotters", "Ranged", 6, "4+", "3+", "1", "D3", ["Shoot in Combat"], '12"'),
      weapon("Crushing Iron Feet", "Melee", 4, "4+", "2+", "2", "4", ["Companion"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "While this unit has 10 or more damage points, Crushing Iron Feet has 3 Attacks and this unit has Control 5.", "Passive"),
      ability(
        "Full Power!",
        "Any Hero Phase",
        "Choose one or more effects and give this unit heat tokens equal to each chosen number: 1, subtract 1 from hit rolls for shooting attacks targeting friendly Sigmarite units wholly within 12\" and under orders; 2, Move 10\"; 3, re-roll one hit and wound roll for Godbreaker Cannon each time this unit Shoots; 6, it can Shoot after Retreating.",
        "Once Per Turn (Army)"
      ),
      ability("Overheating", null, "After Full Power!, roll one die per heat token. Each 5+ allocates 1 damage that cannot be warded, then remove 1 heat token.", "Passive"),
      ability(
        "Special Ammunition",
        "Reaction: You declared a Shoot ability for this unit",
        "If this unit is under orders, on a 3+ choose: Nullshot subtracts 1 from ward rolls against Godbreaker Cannon; Heavy Shot adds 1 Rend to Godbreaker Cannon; Grapeshot inflicts D3 mortal damage on each other enemy within the target's combat range if every Godbreaker Cannon attack targeted the same enemy.",
        "Once Per Turn (Army)"
      ),
    ],
  }),
  make({
    id: "conqueror-cogfort",
    name: "Conqueror Cogfort",
    points: 440,
    move: '6"',
    health: 25,
    control: 10,
    save: "3+",
    baseSize: "160mm",
    regimentOptions: ["0-1 Freeguild Veteran", "Any Sigmarite", "Any Allies of the Free Cities"],
    keywords: ["Hero", "War Machine", ...sigmarite],
    rules: { ...heroRules, companion: true },
    weapons: [
      weapon("Realmscorcher Flame Cannon", "Ranged", "6D6", "2+", "4+", "1", "1", ["Anti-Infantry (+1 Rend)"], '18"'),
      weapon("Crew's Leadshotters", "Ranged", 6, "4+", "3+", "1", "D3", ["Shoot in Combat"], '12"'),
      weapon("Crushing Iron Feet", "Melee", 4, "4+", "2+", "2", "4", ["Companion"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "While this unit has 10 or more damage points, Crushing Iron Feet has 3 Attacks and this unit has Control 5.", "Passive"),
      ability(
        "All Aboard!",
        "Deployment Phase",
        "Pick up to 1 friendly Sigmarite Infantry Hero and up to 1 friendly non-Hero Sigmarite Infantry unit that have not been deployed. Set them up in reserve as this unit's passengers.",
        "Ability",
        ["Deploy"]
      ),
      ability("Overheating", null, "After Full Charge!, roll one die per heat token. Each 5+ allocates 1 damage that cannot be warded, then remove 1 heat token.", "Passive"),
      ability(
        "Full Charge!",
        "Any Hero Phase",
        "Choose one or more effects and give this unit heat tokens equal to each chosen number: 1, passengers' melee weapons gain Charge (+1 Damage) after Sally Forth; 2, Move 10\"; 3, add 2 Attacks to Leadshotters and Crushing Iron Feet; 4, Realmscorcher Flame Cannon has 22 Attacks; 6, it can Shoot after Retreating.",
        "Once Per Turn (Army)"
      ),
      ability(
        "Sally Forth!",
        "Any Charge Phase",
        "Once per battle, if this unit has not Run, set up its passengers wholly within 6\" and either not in combat or within 1/2\" of an enemy. A target set up in combat has charged. If this unit is not under orders, it and the targets become under orders for the rest of the battle round.",
        "Once Per Battle"
      ),
    ],
  }),
  make({
    id: "gate-gargants",
    name: "Gate Gargants",
    points: 320,
    models: 2,
    move: '8"',
    health: 10,
    control: 5,
    save: "3+",
    ward: "6+",
    baseSize: "80mm",
    keywords: ["Monster", "Ward (6+)", ...sigmarite],
    rules: { monster: true, ward: "6+", canBeReinforced: false },
    weapons: [
      weapon("Scattershot Cannon", "Ranged", 5, "4+", "3+", "1", "D3", [], '10"'),
      weapon("Massive Warmaul", "Melee", 5, "4+", "2+", "2", "3"),
    ],
    abilities: [
      ability(
        "Aggressive Defenders",
        "Your Movement Phase",
        "Pick up to 3 other visible friendly Sigmarite units in combat with enemies that are also in combat with this unit. Each target can Shoot and/or Charge after Retreating this turn, and Retreat abilities inflict no mortal damage on them.",
        "Once Per Turn (Army)"
      ),
      ability(
        "Open the Gates!",
        "Any Charge Phase",
        "Pick a visible friendly non-War Machine Cities of Sigmar unit wholly within 12\". Add 2 to its charge rolls for the rest of the turn.",
        "Once Per Turn (Army)",
        ["Rampage"]
      ),
    ],
  }),
];

export default units;
