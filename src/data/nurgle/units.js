import { ability as a, createUnit as u, weapon as w } from "./unitFactory";

const hero = (wizard = 0, extra = {}) => ({ hero: true, wizard, canBeReinforced: false, ...extra });
const daemon = ["Daemon"];
const rot = ["Rotbringers"];
const anyNurgle = ["any-maggotkin-of-nurgle"];
const anyDaemon = ["any-daemon"];
const anyRot = ["any-rotbringers"];
const melee = (name, attacks, hit, wound, rend, damage, abilities = []) =>
  w(name, "Melee", attacks, hit, wound, rend, damage, abilities);
const ranged = (name, range, attacks, hit, wound, rend, damage, abilities = []) =>
  w(name, "Ranged", attacks, hit, wound, rend, damage, abilities, range);

const units = [
  u({
    id: "belga-the-cystwitch", name: "Belga the Cystwitch", imageAlias: "belga", points: 130,
    health: 7, control: 3, save: "5+", ward: "6+", baseSize: "40mm",
    keywords: ["Unique", "Hero", "Priest (1)", "Infantry", "Ward (6+)", ...rot],
    rules: hero(0, { unique: true, priest: 1, ward: "6+" }),
    regimentOptions: ["0-1-plaguebearers", "0-1-cankerborn", "0-1-rotbringer-lord", ...anyRot],
    weapons: [melee("Thrice-tainted Staff", 3, "4+", "4+", 1, "D3")],
    abilities: [
      a("Ruptured Cysts", "Your Hero Phase", "Chanting value 4. Pick a visible Diseased enemy unit within 18\". Inflict D3 mortal damage on it, then inflict 1 mortal damage on each other Diseased enemy unit within 3\" of it. On a chanting roll of 9+, you may pick a friendly Plaguebearers unit within 12\" of the target and return 1 slain model to it for each enemy Infantry model slain by this ability this turn.", "Prayer", ["Prayer"]),
      a("Scry the Filth", "Your Hero Phase", "For the rest of the turn, either add 1 to casting rolls for friendly Maggotkin of Nurgle Wizards within 3\" of this unit, or add 1 to chanting rolls for friendly Maggotkin of Nurgle Priests within 3\" of this unit."),
    ],
  }),
  u({
    id: "bloab-rotspawned", name: "Bloab Rotspawned", points: 260, move: '8"', health: 14,
    control: 5, save: "4+", ward: "6+", baseSize: "100mm",
    keywords: ["Unique", "Hero", "Monster", "Wizard (1)", "Ward (6+)", ...rot],
    rules: hero(1, { unique: true, monster: true, ward: "6+" }),
    regimentOptions: ["0-1-rotbringer-lord", ...anyNurgle],
    weapons: [
      ranged("Bilespurter's Vile Bile", '7"', 7, "2+", "4+", 1, "D3", ["Shoot in Combat", "Companion"]),
      melee("Harvestman's Scythe", 3, "3+", "3+", 1, 2, ["Anti-Monster (+1 Rend)"]),
      melee("Bilespurter's Claws", 5, "4+", "2+", 2, 3, ["Companion"]),
    ],
    abilities: [
      a("Battle Damaged", "Passive", "While this unit has 10 or more damage points, the Attacks characteristic of Bilespurter's Claws is 3.", "Passive"),
      a("Miasma of Pestilence", "Your Hero Phase", "Casting value 6. Pick a visible friendly Maggotkin of Nurgle unit wholly within 12\". Until the start of your next turn, weapon abilities on weapons used for attacks that target it have no effect, except Companion.", "Spell", ["Spell"]),
      a("Daemon Flies", "Any Combat Phase", "Once per turn (army), pick an enemy Monster in combat with this unit and roll a dice. On a 3+, subtract 1 from the Attacks characteristic of its melee weapons for the rest of the turn.", "Rampage", ["Rampage"]),
    ],
  }),
  u({
    id: "cankerborn", name: "Cankerborn", points: 180, models: 2, health: 6, control: 2,
    save: "5+", ward: "5+", baseSize: "40mm",
    keywords: ["Unique", "Hero", "Infantry", "Ward (5+)", ...daemon],
    rules: hero(0, { unique: true, ward: "5+" }), regimentOptions: anyDaemon,
    canJoinRegimentAs: ["plague-scion"],
    weapons: [melee("Blightblades", 4, "3+", "3+", 1, 3, ["Crit (Mortal)"])],
    abilities: [
      a("Utter Defilement", "End of Any Turn", "This unit has 2 Pestilent Pollutant tokens. Pick an objective or terrain feature within 12\" and place a token beside it. If both tokens are already on the battlefield, relocate one instead."),
      a("From the Tainted Earth", "Your Movement Phase", "Remove this unit from the battlefield and set it up more than 9\" from all enemy units and wholly within 3\" of an objective or terrain feature with a friendly Pestilent Pollutant token, a Polluted terrain feature, or an objective you control.", "Core, Move", ["Core", "Move"]),
      a("Entropy Endures", "Passive", "While this unit has 2 models, if an ability would automatically destroy it, 1 model in this unit is slain instead.", "Passive"),
    ],
  }),
  u({
    id: "festus-the-leechlord", name: "Festus the Leechlord", imageAlias: "festus", points: 290,
    move: '5"', health: 14, control: 5, save: "4+", ward: "5+", baseSize: "150 x 95mm",
    keywords: ["Unique", "Hero", "Monster", "Wizard (2)", "Ward (5+)", ...rot],
    rules: hero(2, { unique: true, monster: true, ward: "5+" }),
    regimentOptions: ["0-1-plague-scion", ...anyNurgle],
    weapons: [
      melee("Gnarled Plague Staff", 3, "3+", "3+", 1, "D3", ["Crit (Auto-wound)"]),
      melee("Gathoblyt's Maw", 4, "4+", "2+", 2, 3, ["Crit (Mortal)", "Companion"]),
    ],
    abilities: [
      a("Battle Damaged", "Passive", "While this unit has 10 or more damage points, the Attacks characteristic of Gathoblyt's Maw is 3.", "Passive"),
      a("Leechlord's Curse", "Your Hero Phase", "Casting value 6. Pick a visible enemy unit within 18\"; this unit gains 1 leech point for the rest of the battle. Until the start of your next turn, after that enemy uses a Core ability or command, roll a dice. On a 3+, inflict 1 mortal damage on it; if damage is allocated, Heal (1) this unit.", "Spell", ["Spell"]),
      a("Vile Poisons", "Any Combat Phase", "Once per turn (army), if this unit did not charge, pick an enemy non-Manifestation, non-terrain unit in combat with it and roll off, adding each unit's Control. If this unit wins, inflict mortal damage equal to the difference on an enemy Hero or Monster; otherwise, 1 model in the target is slain.", "Rampage", ["Rampage"]),
      a("Annelid Engorgement", "End of Any Turn", "For each enemy unit in combat with this unit that was destroyed this turn, gain D3 leech points for the rest of the battle. Until the end of the next turn, add 1 to this unit's Control characteristic for each current leech point."),
    ],
  }),
  u({
    id: "gelgus-pust", name: "Gelgus Pust, the Prince of Sores", points: 200, move: '8"',
    health: 8, control: 5, save: "3+", ward: "5+", baseSize: "50mm",
    keywords: ["Unique", "Hero", "Infantry", "Fly", "Ward (5+)", ...daemon],
    rules: hero(0, { unique: true, ward: "5+" }), regimentOptions: ["0-1-plague-scion", ...anyNurgle],
    weapons: [melee("Malady and Contagion", 7, "3+", "3+", 1, 3, ["Crit (Auto-wound)"])],
    abilities: [
      a("Master Contaminator", "Once Per Battle, Your Hero Phase", "Pick a terrain feature within 6\". You consider that terrain feature to be Polluted for the rest of the battle."),
      a("Polluting Aura", "Passive", "When a friendly Maggotkin of Nurgle unit wholly within 6\" of a Polluted terrain feature would heal, add 1 to the amount healed. When an enemy within 6\" of one would heal, subtract 1 from the amount healed, to a minimum of 0.", "Passive"),
      a("Grin of the Grandfather", "Any Combat Phase", "For each enemy in combat with this unit, roll a dice. If the roll equals or exceeds its Control, choose one for the rest of the turn: subtract 1 from its combat hit rolls, subtract 1 from its combat wound rolls, or subtract 1 from its Control."),
      a("Parasitic Infestation", "Any Charge Phase", "For each enemy unit that charged this turn and is in combat with this unit, roll a D3. On a 2+, inflict mortal damage equal to the roll."),
    ],
  }),
  u({
    id: "great-unclean-one", name: "Great Unclean One", imageAlias: "unclean_one", points: 380,
    move: '6"', health: 20, control: 5, save: "4+", ward: "5+", baseSize: "130mm",
    keywords: ["Hero", "Monster", "Wizard (2)", "Ward (5+)", ...daemon],
    rules: hero(2, { monster: true, ward: "5+" }), regimentOptions: ["0-1-plague-scion", ...anyNurgle],
    weapons: [
      ranged("Noxious Bile", '7"', "D3+3", "3+", "2+", 2, 2, ["Shoot in Combat"]),
      melee("Colossal Blight Weapons", 4, "3+", "2+", 2, 4),
    ],
    abilities: [
      a("Battle Damaged", "Passive", "While this unit has 10 or more damage points, the Attacks characteristic of Colossal Blight Weapons is 3.", "Passive"),
      a("Plague Wind", "Your Hero Phase", "Casting value 7. Pick a visible enemy unit within 12\" that is not a Manifestation or terrain feature. It has the Diseased keyword.", "Spell", ["Spell"]),
      a("Locus of Nurgle", "Your Movement Phase", "Once per turn (army), pick a destroyed friendly non-Hero Nurgle Daemon unit that started with 3 or more models. On a 3+, set up a replacement unit with half its starting models, rounding up, wholly within 6\" of this unit or a friendly Feculent Gnarlmaw and more than 9\" from enemies."),
      a("Bloated with Corruption", "End of Any Turn", "Once per turn (army), if this unit is damaged, pick up to 3 enemy units in combat with it and roll a D3 for each. On a 2+, inflict mortal damage equal to the roll.", "Rampage", ["Rampage"]),
    ],
  }),
  u({
    id: "gutrot-spume", name: "Gutrot Spume", points: 100, health: 7, control: 2,
    save: "4+", ward: "6+", baseSize: "40mm",
    keywords: ["Unique", "Hero", "Infantry", "Ward (6+)", ...rot],
    rules: hero(0, { unique: true, ward: "6+" }), regimentOptions: ["0-1-rotbringer-lord", ...anyRot],
    weapons: [melee("Rot-pocked Axe", 5, "3+", "2+", 1, 2, ["Anti-Hero (+1 Rend)", "Crit (Mortal)"])],
    abilities: [
      a("Master of the Slime Fleet", "Deployment Phase", "Pick this unit's undeployed regiment. Set every unit in it up in reserve aboard the Slime Fleet.", "Deploy", ["Deploy"]),
      a("Pestilential Beachhead", "Your Movement Phase", "If this unit is aboard the Slime Fleet, set it up wholly within 7\" of a battlefield edge and more than 9\" from enemies, then set up the other units aboard wholly within 7\" of it and a battlefield edge and more than 9\" from enemies."),
      a("Flailing Tentacles", "Any Combat Phase", "Pick an enemy Infantry Hero in combat with this unit. On a 3+, it has Strike-last for the rest of the turn."),
    ],
  }),
  u({
    id: "harbinger-of-decay", name: "Harbinger of Decay", imageAlias: "harbringer_decay", points: 140,
    move: '8"', health: 7, control: 2, save: "3+", ward: "6+", baseSize: "90 x 52mm",
    keywords: ["Hero", "Priest (1)", "Cavalry", "Ward (6+)", ...rot],
    rules: hero(0, { priest: 1, ward: "6+" }), regimentOptions: ["0-1-rotbringer-lord", ...anyRot],
    weapons: [
      melee("Grim Rotsword or Plague Scythe", 3, "3+", "3+", 1, 3, ["Crit (Mortal)"]),
      melee("Daemonic Mount's Flyblown Bite", 2, "5+", "3+", 0, 1, ["Companion"]),
    ],
    abilities: [
      a("Knell of Doom", "Once Per Turn (Army), Enemy Hero Phase", "Pick an enemy within 18\" and roll a D3, or a D6 if it is within 6\" of friendly Sloven Knights. If the roll equals or exceeds its Control, subtract 1 from its wound rolls until the start of your next turn."),
      a("Omens of Decay", "Your Hero Phase", "Chanting value 4. Pick a visible enemy within 12\". Subtract twice the current battle round number from its control score for the rest of the turn. On a chanting roll of 10+, this affects every enemy within 12\".", "Prayer", ["Prayer"]),
    ],
  }),
  u({
    id: "horticulous-slimux", name: "Horticulous Slimux", points: 140, health: 8, control: 2,
    save: "4+", ward: "5+", baseSize: "105 x 70mm",
    keywords: ["Unique", "Hero", "Cavalry", "Ward (5+)", ...daemon],
    rules: hero(0, { unique: true, ward: "5+" }), regimentOptions: anyDaemon,
    weapons: [
      melee("Lopping Shears", 3, "3+", "3+", 1, 2),
      melee("Mulch's Jaws", 4, "4+", "3+", 1, "D3", ["Companion"]),
    ],
    abilities: [
      a("Cultivating the Garden of Nurgle", "Your Movement Phase", "If there is no more than 1 friendly Feculent Gnarlmaw, set one up wholly within 12\" of this unit and more than 3\" from enemies, objectives and other terrain."),
      a("Beast Handler", "Your Movement Phase", "Pick a destroyed friendly Beast of Nurgle. On a 3+, set up a replacement wholly within 12\" of this unit and more than 9\" from enemies."),
      a("Gnarlmaw Whisperer", "End of Your Turn", "Remove a friendly Feculent Gnarlmaw wholly within 12\" and set it up more than 3\" from enemies, objectives and other terrain."),
    ],
  }),
  u({
    id: "lord-of-afflictions", name: "Lord of Afflictions", points: 170, move: '8"', health: 8,
    control: 2, save: "3+", ward: "6+", baseSize: "60mm",
    keywords: ["Hero", "Cavalry", "Fly", "Ward (6+)", ...rot],
    rules: hero(0, { ward: "6+" }), regimentOptions: anyRot,
    weapons: [
      melee("Festerspike", 4, "3+", "3+", 1, 2, ["Charge (+1 Damage)"]),
      melee("Rot Fly's Mouthparts and Sting", 6, "4+", "3+", 0, 1, ["Companion"]),
    ],
    abilities: [
      a("Vectors of Foulest Contagion", "Once Per Turn (Army), Any Combat Phase", "Pick up to 3 enemy units in combat with this unit and roll a D3 for each. On a 2+, inflict mortal damage equal to the roll."),
      a("Master of Rot Flies", "Any Combat Phase", "If this unit charged, pick it and up to 2 friendly Pusgoyle Blightlords units wholly within 12\". Add 1 to the Rend of their Rot Fly's Mouthparts and Sting for the rest of the turn."),
    ],
  }),
  u({
    id: "lord-of-blights", name: "Lord of Blights", points: 140, health: 7, control: 2,
    save: "3+", ward: "6+", baseSize: "40mm",
    keywords: ["Hero", "Infantry", "Ward (6+)", ...rot], rules: hero(0, { ward: "6+" }),
    regimentOptions: anyRot, canJoinRegimentAs: ["rotbringer-lord"],
    weapons: [melee("Bubotic Hammer", 4, "3+", "3+", 1, 3, ["Anti-Charge (+1 Rend)"])],
    abilities: [
      a("Thrice-ripened Death's Heads", "Once Per Turn (Army), Any Combat Phase", "Pick an enemy that charged this turn and is in combat with this unit or friendly Plague Drones wholly within 12\". Roll a D3; on a 2+, inflict mortal damage equal to the roll."),
      a("Festering Bulwark", "Once Per Turn (Army), Any Combat Phase", "Pick this unit and a friendly Putrid Blightkings unit within 3\". On a 3+, ignore negative modifiers to save rolls for both targets for the rest of the turn."),
    ],
  }),
  u({
    id: "lord-of-plagues", name: "Lord of Plagues", points: 120, health: 7, control: 2,
    save: "4+", ward: "6+", baseSize: "40mm",
    keywords: ["Hero", "Infantry", "Ward (6+)", ...rot], rules: hero(0, { ward: "6+" }),
    regimentOptions: anyRot, canJoinRegimentAs: ["rotbringer-lord"],
    weapons: [melee("Plague-ridden Great Blade", 5, "3+", "3+", 1, 2, ["Crit (Mortal)"])],
    abilities: [
      a("Lord of the Infected Legions", "Passive", "Add 1 to wound rolls for combat attacks made by friendly Rotswords units that did not charge this turn while wholly within 12\" of this unit.", "Passive"),
      a("Sevenfold Slaughter", "Once Per Turn (Army), Any Combat Phase", "Pick a friendly Rotswords unit that did not charge this turn and is wholly within 12\". On a 2+, add 1 to the Attacks characteristic of its Ruined Master-crafted Weapons for the rest of the turn."),
    ],
  }),
  u({
    id: "morbidex-twiceborn", name: "Morbidex Twiceborn", imageAlias: "morbidex_twiceborn",
    points: 250, move: '8"', health: 14, control: 5, save: "4+", ward: "6+", baseSize: "100mm",
    keywords: ["Unique", "Hero", "Monster", "Ward (6+)", ...rot],
    rules: hero(0, { unique: true, monster: true, ward: "6+" }),
    regimentOptions: ["0-1-rotbringer-lord", ...anyNurgle],
    weapons: [
      ranged("Tripletongue's Slabrous Tongues", '7"', 3, "3+", "3+", 1, 1, ["Shoot in Combat", "Companion"]),
      melee("Fleshreaper Scythe", 5, "3+", "3+", 1, 2),
      melee("Tripletongue's Claws", 5, "4+", "2+", 2, 3, ["Companion"]),
    ],
    abilities: [
      a("Battle Damaged", "Passive", "While this unit has 10 or more damage points, the Attacks characteristic of Tripletongue's Claws is 3.", "Passive"),
      a("Lord of Nurglings", "Passive", "Friendly Nurglings wholly within 12\" ignore the first damage point allocated to them each phase and can ignore the effect of the Beast ability.", "Passive"),
      a("Tide of Nurglings", "Once Per Turn (Army), Any Combat Phase", "Pick up to 2 friendly Nurglings units wholly within 12\" and roll for each. On a 2+, a target not in combat may move that many inches without ending in combat; a target in combat may pile in."),
      a("Gigantic Nurgling-kin", "End of Any Turn", "Heal this unit by half the number of damage points it has, rounding up."),
    ],
  }),
  u({
    id: "orghotts-daemonspew", name: "Orghotts Daemonspew", imageAlias: "orghotts_daemonspew",
    points: 260, move: '8"', health: 14, control: 5, save: "3+", ward: "6+", baseSize: "100mm",
    keywords: ["Unique", "Hero", "Monster", "Ward (6+)", ...rot],
    rules: hero(0, { unique: true, monster: true, ward: "6+" }),
    regimentOptions: ["0-1-rotbringer-lord", ...anyNurgle],
    weapons: [
      ranged("Whippermaw's Grasping Tongue", '7"', 1, "3+", "3+", 0, "D6", ["Shoot in Combat", "Companion"]),
      melee("Rotaxes", 7, "3+", "3+", 1, 2),
      melee("Whippermaw's Claws", 5, "4+", "2+", 2, 3, ["Companion"]),
    ],
    abilities: [
      a("Battle Damaged", "Passive", "While this unit has 10 or more damage points, the Attacks characteristic of Whippermaw's Claws is 3.", "Passive"),
      a("Acid Ichor", "Passive", "Each time an unmodified save roll of 1 is made for this unit against a combat attack, after the attacking unit has used its Fight ability, inflict 1 mortal damage on it.", "Passive"),
      a("Grasping Tongue", "Any Combat Phase", "Once per turn (army), pick an enemy in combat with this unit. On a 3+, add 1 to wound rolls for friendly Maggotkin of Nurgle combat attacks that target it for the rest of the turn.", "Rampage", ["Rampage"]),
    ],
  }),
  u({
    id: "poxbringer", name: "Poxbringer, Herald of Nurgle", points: 90, health: 5, control: 2,
    save: "5+", ward: "5+", baseSize: "32mm",
    keywords: ["Hero", "Wizard (1)", "Infantry", "Ward (5+)", ...daemon],
    rules: hero(1, { ward: "5+" }), regimentOptions: anyDaemon, canJoinRegimentAs: ["plague-scion"],
    weapons: [melee("Corrupted Balesword", 3, "4+", "3+", 1, 2, ["Crit (Mortal)"])],
    abilities: [
      a("Captain of Plague Legions", "Reaction: You declared a Fight ability for this unit", "Pick an eligible friendly Plaguebearers unit in combat range of this unit. It fights immediately after this unit, and add 1 to the Attacks characteristic of its melee weapons for the rest of the turn.", "Reaction"),
    ],
  }),
  u({
    id: "rotbringer-sorcerer", name: "Rotbringer Sorcerer", points: 100, health: 6, control: 2,
    save: "5+", ward: "6+", baseSize: "32mm",
    keywords: ["Hero", "Wizard (1)", "Infantry", "Ward (6+)", ...rot],
    rules: hero(1, { ward: "6+" }), regimentOptions: ["0-1-rotbringer-lord", ...anyRot],
    weapons: [melee("Rotwood Staff", 3, "4+", "3+", 1, "D3")],
    abilities: [
      a("Tainted Sorceries", "Your Hero Phase", "Pick an enemy unit targeted by a spell successfully cast by this unit this phase. On a 2+, subtract 1 from ward rolls for it for the rest of the turn."),
    ],
  }),
  u({
    id: "rotigus", name: "Rotigus", points: 420, move: '6"', health: 22, control: 10,
    save: "4+", ward: "5+", baseSize: "130mm",
    keywords: ["Warmaster", "Unique", "Hero", "Monster", "Wizard (2)", "Ward (5+)", ...daemon],
    rules: hero(2, { unique: true, monster: true, warmaster: true, ward: "5+" }),
    regimentOptions: ["0-1-plague-scion", ...anyNurgle],
    weapons: [
      melee("Gnarlrod", 5, "3+", "2+", 1, 3),
      melee("Fanged Maws", 4, "3+", "2+", 2, 2),
    ],
    abilities: [
      a("Battle Damaged", "Passive", "While this unit has 10 or more damage points, the Attacks characteristic of Gnarlrod is 3.", "Passive"),
      a("Bringer of Plenty", "Passive", "Add 1 to casting rolls for friendly Nurgle Wizards while they are wholly within 12\" of this unit.", "Passive"),
      a("Mountain of Loathsome Flesh", "Any Charge Phase", "Once per turn (army), if this unit charged, pick an enemy within 1\". On a 3+, roll a number of dice equal to the number of models in it; each 5+ inflicts 1 mortal damage.", "Rampage", ["Rampage"]),
      a("Deluge of Nurgle", "Your Hero Phase", "Casting value 8. Pick every other unit within 18\". Inflict 1 mortal damage on each enemy target and Heal (1) each friendly target. Until the start of your next turn, abilities cannot heal or return slain models to enemy units while they are within 18\" of Rotigus.", "Spell", ["Spell"]),
    ],
  }),
  u({
    id: "shaman-foulhoof", name: "Shaman Foulhoof", points: 110, move: '6"', health: 5,
    control: 2, save: "5+", ward: "6+", baseSize: "32mm",
    keywords: ["Unique", "Hero", "Wizard (1)", "Infantry", "Ward (6+)", ...rot],
    rules: hero(1, { unique: true, ward: "6+" }), regimentOptions: ["0-1-rotbringer-lord", ...anyRot],
    weapons: [melee("Rotstave", 3, "4+", "3+", 1, 3)],
    abilities: [
      a("Purulent Profusion", "Your Hero Phase", "Casting value 7. Pick a visible enemy within 18\". Subtract 1 from the Rend characteristic of its melee weapons until the start of your next turn.", "Spell", ["Spell"]),
      a("Rampant Defilement", "Any Combat Phase", "Pick a friendly Pestigors unit wholly within 12\". On a 3+, add 1 to the Attacks characteristic of its melee weapons for the rest of the turn."),
    ],
  }),
  u({
    id: "sloppity-bilepiper", name: "Sloppity Bilepiper, Herald of Nurgle", imageAlias: "sloppity_bilepiper",
    points: 90, health: 5, control: 2, save: "5+", ward: "5+", baseSize: "32mm",
    keywords: ["Hero", "Infantry", "Ward (5+)", ...daemon], rules: hero(0, { ward: "5+" }),
    regimentOptions: anyDaemon, canJoinRegimentAs: ["plague-scion"],
    weapons: [melee("Marotter", 3, "4+", "3+", 1, 2)],
    abilities: [
      a("Jolly Gutpipes", "Your Hero Phase", "Once per turn (army), pick a friendly Nurgle Daemon wholly within 12\" or an enemy within 12\" and roll a dice. If the roll equals or exceeds its Control: a friendly target adds 2 to run and charge rolls until your next turn; an enemy target suffers D3 mortal damage whenever it ends a move or is set up further from this unit than where it started, while this unit remains on the battlefield."),
    ],
  }),
  u({
    id: "spoilpox-scrivener", name: "Spoilpox Scrivener, Herald of Nurgle", imageAlias: "spoilpox_scrivener",
    points: 80, health: 5, control: 2, save: "5+", ward: "5+", baseSize: "40mm",
    keywords: ["Hero", "Infantry", "Ward (5+)", ...daemon], rules: hero(0, { ward: "5+" }),
    regimentOptions: anyDaemon, canJoinRegimentAs: ["plague-scion"],
    weapons: [
      ranged("Disgusting Sneezes", '7"', "D6", "2+", "4+", 0, 1, ["Shoot in Combat"]),
      melee("Distended Maw", 3, "4+", "3+", 1, 2),
    ],
    abilities: [
      a("Keep Counting", "Your Hero Phase", "Once per turn (army), pick friendly Plaguebearers wholly within 12\". On a 2+, either add 1 to their combat wound rolls or add 5 to their Control until the start of your next turn."),
      a("Stupefying Sneezes", "Any Shooting Phase", "Once per turn (army), pick an enemy Monster damaged by this unit's shooting attacks this phase. It cannot use Rampage abilities until the start of your next turn."),
    ],
  }),
  u({
    id: "the-glottkin", name: "The Glottkin", imageAlias: "glootkin", points: 470, move: '6"',
    health: 24, control: 10, save: "4+", ward: "6+", baseSize: "130mm",
    keywords: ["Warmaster", "Unique", "Hero", "Monster", "Wizard (1)", "Ward (6+)", ...rot],
    rules: hero(1, { unique: true, monster: true, warmaster: true, ward: "6+" }),
    regimentOptions: ["0-1-rotbringer-lord", ...anyNurgle],
    weapons: [
      melee("Ghurk's Tentacle", 4, "3+", "2+", 2, 5),
      melee("Ghurk's Lamprey Maw", 3, "3+", "2+", 2, 3),
      melee("Otto's Scythe", 4, "3+", "3+", 1, 3),
    ],
    abilities: [
      a("Battle Damaged", "Passive", "While this unit has 10 or more damage points, the Attacks characteristic of Ghurk's Tentacle is 3.", "Passive"),
      a("Overgrowth", "Your Hero Phase", "Casting value 6. Pick a visible enemy within 12\" and roll a number of dice equal to its Health. Each 5+ inflicts 1 mortal damage, to a maximum of 7. If any damage is allocated and it is not a Manifestation or terrain feature, it becomes Diseased.", "Spell", ["Spell"]),
      a("Horrific Opponent", "Passive", "Subtract 5 from the control scores of enemy units while they are in combat with this unit.", "Passive"),
      a("Blighted Stampede", "Reaction: You declared the Counter-charge command", "Once per turn (army), pick up to 2 friendly Maggotkin of Nurgle units wholly within 12\". After the first Counter-charge resolves, each target may use Counter-charge without spending command points."),
      a("Tentacle Trap", "Any Combat Phase", "Pick an enemy Hero or Monster in combat with this unit. On a 4+, it cannot move or be set up elsewhere, and add 1 to hit rolls for attacks that target it for the rest of the turn.", "Rampage", ["Rampage"]),
    ],
  }),

  u({
    id: "beast-of-nurgle", name: "Beast of Nurgle", points: 100, move: '7"', health: 8,
    control: 1, save: "5+", ward: "5+", baseSize: "60mm",
    keywords: ["Beast", "Ward (5+)", ...daemon], rules: { ward: "5+" },
    weapons: [melee("Filthy Claws and Maw", 5, "4+", "3+", 1, "D3", ["Companion"])],
    abilities: [
      a("Beast", "Passive", "This unit has a maximum control score of 1.", "Passive"),
      a("Attention Seekers", "Any Charge Phase", "Once per turn (army), if this unit is not in combat, it may make a 2D6\" charge move towards the closest enemy, moving through combat ranges. It must end within 1/2\" of that enemy and inflicts D3 mortal damage on it. If it does so, this unit has charged."),
    ],
  }),
  u({
    id: "nurglings", name: "Nurglings", points: 100, models: 3, health: 4, control: 1,
    save: "6+", ward: "5+", baseSize: "40mm",
    keywords: ["Infantry", "Ward (5+)", ...daemon], rules: { ward: "5+" },
    weapons: [melee("Tiny Razor-sharp Teeth", 5, "5+", "5+", 0, 1, ["Crit (Auto-wound)"])],
    abilities: [
      a("Beast", "Passive", "This unit has a maximum control score of 1.", "Passive"),
      a("Endless Swarm", "End of Any Turn", "Once per turn (army), if this unit was destroyed this turn, set up a replacement unit wholly within 6\" of a friendly Feculent Gnarlmaw and more than 9\" from enemies."),
    ],
  }),
  u({
    id: "pestigors", name: "Pestigors", points: 140, models: 10, move: '6"', health: 2,
    control: 1, save: "5+", ward: "6+", baseSize: "32mm",
    keywords: ["Infantry", "Champion", "Musician (1/10)", "Standard Bearer (1/10)", "Ward (6+)", ...rot],
    rules: { ward: "6+" }, weapons: [melee("Corroded Weapons", 2, "4+", "3+", 0, 1)],
    abilities: [a("Bestial Desecration", "Passive", "Add 1 to the Rend characteristic of this unit's melee weapons while it is not in enemy territory.", "Passive")],
  }),
  u({
    id: "plague-drones", name: "Plague Drones", points: 150, models: 3, move: '8"', health: 5,
    control: 2, save: "5+", ward: "5+", baseSize: "60mm",
    keywords: ["Cavalry", "Champion", "Musician (1/3)", "Standard Bearer (1/3)", "Fly", "Ward (5+)", ...daemon],
    rules: { ward: "5+" },
    weapons: [
      melee("Noxious Plaguesword", 2, "4+", "3+", 0, 1, ["Crit (Mortal)"]),
      melee("Rot Fly's Mouthparts and Sting", 6, "4+", "3+", 0, 1, ["Companion"]),
    ],
    abilities: [
      a("Dispersed Formation", "Passive", "This unit has a coherency range of 2\".", "Passive"),
      a("Ripe Pastures", "Passive", "This unit can use Charge abilities after using a Retreat ability and does not suffer mortal damage from Retreat abilities.", "Passive"),
    ],
  }),
  u({
    id: "plaguebearers", name: "Plaguebearers", points: 130, models: 10, health: 2, control: 1,
    save: "6+", ward: "5+", baseSize: "32mm",
    keywords: ["Infantry", "Champion", "Musician (1/10)", "Standard Bearer (1/10)", "Ward (5+)", ...daemon],
    rules: { ward: "5+" }, weapons: [melee("Plaguesword", 1, "4+", "3+", 0, 1, ["Crit (Mortal)"])],
    abilities: [a("Cloud of Flies", "Passive", "Subtract 1 from hit rolls for attacks that target this unit while it is contesting an objective you control.", "Passive")],
  }),
  u({
    id: "pox-wretches", name: "Pox-Wretches", points: 110, models: 14, move: '5"', health: 1,
    control: 1, save: "6+", ward: "6+", baseSize: "25mm",
    keywords: ["Infantry", "Champion", "Ward (6+)", ...rot], rules: { ward: "6+" },
    weapons: [melee("Decaying Weapons", 2, "4+", "4+", 0, 1, ["Crit (Auto-wound)"])],
    abilities: [
      a("Mire Kelpies", "Passive", "This unit has 6 Mire Kelpie tokens for every 14 models in it.", "Passive"),
      a("Contagious Catarrh", "Once Per Turn (Army), End of Any Turn", "If this unit has Mire Kelpie tokens, pick an enemy non-Manifestation, non-terrain unit in combat and remove any number of tokens. Roll a dice, adding 1 for each token removed. On an unmodified 1 there is no effect; on a 6+, the target becomes Diseased."),
    ],
  }),
  u({
    id: "pusgoyle-blightlords", name: "Pusgoyle Blightlords", points: 190, models: 2,
    move: '8"', health: 8, control: 2, save: "4+", ward: "6+", baseSize: "60mm",
    keywords: ["Cavalry", "Fly", "Ward (6+)", ...rot], rules: { ward: "6+" },
    weapons: [
      melee("Flyrider's Arsenal", 4, "3+", "3+", 1, 1, ["Charge (+1 Damage)"]),
      melee("Rot Fly's Mouthparts and Sting", 6, "4+", "3+", 0, 1, ["Companion"]),
    ],
    abilities: [
      a("Dispersed Formation", "Passive", "This unit has a coherency range of 2\".", "Passive"),
      a("Relentless Attackers", "Passive", "Add 1 to the Rend characteristic of Flyrider's Arsenal for attacks that target enemy units contesting an objective.", "Passive"),
    ],
  }),
  u({
    id: "pusgoyle-blightlords-single", name: "Pusgoyle Blightlords (1 model)",
    imageAlias: "pusgoyle_blightlords", points: 110, move: '8"', health: 8, control: 2,
    save: "4+", ward: "6+", baseSize: "60mm",
    notes: "You can include 1 unit of this type for each Lord of Afflictions in your army.",
    keywords: ["Cavalry", "Fly", "Ward (6+)", ...rot],
    rules: { ward: "6+", canBeReinforced: false },
    weapons: [
      melee("Flyrider's Arsenal", 4, "3+", "3+", 1, 1, ["Charge (+1 Damage)"]),
      melee("Rot Fly's Mouthparts and Sting", 6, "4+", "3+", 0, 1, ["Companion"]),
    ],
    abilities: [
      a("Dispersed Formation", "Passive", "This unit has a coherency range of 2\".", "Passive"),
      a("Relentless Attackers", "Passive", "Add 1 to the Rend characteristic of Flyrider's Arsenal for attacks that target enemy units contesting an objective.", "Passive"),
    ],
  }),
  u({
    id: "putrid-blightkings", name: "Putrid Blightkings", points: 130, models: 5,
    health: 3, control: 1, save: "5+", ward: "6+", baseSize: "40mm",
    keywords: ["Infantry", "Champion", "Standard Bearer (1/5)", "Ward (6+)", ...rot],
    rules: { ward: "6+" },
    weapons: [melee("Pox-blighted Weapons", 4, "3+", "3+", 1, 1, ["Anti-Priest (+1 Rend)", "Anti-Wizard (+1 Rend)"])],
    abilities: [
      a("Discomfiting Stench", "Once Per Turn (Army), End of Any Turn", "Pick a visible enemy Wizard or Priest within 12\" and roll a dice. If it exceeds its power level, until the start of your next turn a Wizard miscasts on casting rolls containing two or more rolls of 1, 2 or 3; a Priest fails on an unmodified chanting roll of 1 or 2, removes D3 ritual points, and cannot be given ritual points for the rest of this phase."),
    ],
  }),
  u({
    id: "rotmire-creed", name: "Rotmire Creed", points: 110, models: 10, move: '5"', health: 1,
    control: 1, save: "6+", ward: "6+", baseSize: "32mm [2], 28.5mm [2], 25mm [6]",
    keywords: ["Infantry", "Champion (1/10)", "Ward (6+)", ...rot],
    rules: { ward: "6+", canBeReinforced: false },
    weapons: [
      ranged("Contagion Blowpipes", '12"', 2, "4+", "3+", 0, 1, ["Crit (Auto-wound)"]),
      melee("Bilewood Weapons", 2, "4+", "4+", 0, 1),
    ],
    abilities: [
      a("Virulent Concoctions", "Passive", "When you use Infect, you can pick an eligible enemy unit damaged by this unit's shooting attacks this turn even if it is not within 7\" of a friendly Maggotkin of Nurgle unit.", "Passive"),
    ],
  }),
  u({
    id: "rotswords", name: "Rotswords", points: 210, models: 10, health: 2, control: 1,
    save: "3+", ward: "6+", baseSize: "32mm",
    keywords: ["Infantry", "Champion", "Musician (1/10)", "Standard Bearer (1/10)", "Ward (6+)", ...rot],
    rules: { ward: "6+" },
    weapons: [melee("Ruined Master-crafted Weapons", 2, "3+", "3+", 1, 1, ["Crit (2 Hits)"])],
    abilities: [
      a("Sweat-soaked and Reeking", "Once Per Turn (Army), Any Combat Phase", "Pick an enemy unit that charged this turn and is in combat with this unit. On a 3+, it cannot use commands for the rest of the turn."),
    ],
  }),
  u({
    id: "sloven-knights", name: "Sloven Knights", points: 180, models: 3, move: '8"', health: 4,
    control: 1, save: "3+", ward: "6+", baseSize: "75 x 42mm",
    keywords: ["Cavalry", "Champion", "Ward (6+)", ...rot], rules: { ward: "6+" },
    weapons: [
      melee("Entropic Bludgeons", 2, "4+", "3+", 2, 2, ["Charge (+1 Damage)"]),
      melee("Foetid Nag's Hooves", 2, "5+", "3+", 0, 1, ["Companion"]),
    ],
    abilities: [
      a("Pall of Exhaustion", "Once Per Turn (Army), Any Combat Phase", "Pick an enemy unit in combat with this unit. Add 1 to the roll if it is also in combat with another friendly Rotbringers unit. On a 3+, it has Strike-last for the rest of the turn."),
    ],
  }),
];

export default units;
