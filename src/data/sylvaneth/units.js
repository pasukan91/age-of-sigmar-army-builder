import { ability, createOrrukUnit, weapon } from "../orrukWarclans/unitFactory";

const make = (config) => createOrrukUnit({ faction: "sylvaneth", ...config });
const sylvaneth = ["Order", "Sylvaneth"];
const heroRules = { hero: true, canBeReinforced: false };

const units = [
  make({
    id: "alarielle-the-everqueen", imageAlias: "alarielle", name: "Alarielle the Everqueen", points: 620, move: '14"', health: 16, control: 10, save: "4+", ward: "5+", baseSize: "160mm",
    regimentOptions: ["0-1 Forest Sentinel", "Any Sylvaneth"],
    keywords: ["Warmaster", "Unique", "Hero", "Monster", "Wizard (3)", "Fly", "Ward (5+)", ...sylvaneth],
    rules: { ...heroRules, unique: true, monster: true, wizard: 3, ward: "5+", warmaster: true, companion: true },
    weapons: [
      weapon("Spear of Kurnoth", "Ranged", 1, "2+", "3+", "2", "4", [], '12"'),
      weapon("Spear of Kurnoth", "Melee", 5, "3+", "3+", "2", "2", ["Charge (+1 Damage)"]),
      weapon("Wardroth Beetle's Antlers", "Melee", 6, "4+", "2+", "2", "4", ["Companion"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "At 10 or more damage, Wardroth Beetle's Antlers has 4 Attacks.", "Passive"),
      ability("Seasons of War", "Start of Battle Round", "Choose a season not chosen in the previous round: Burgeoning lets Ever Growing choose any opponent-uncontrolled terrain; Reaping gives friendly Sylvaneth wholly within 12\" +1 to casting and chanting; Dwindling lets them Charge after Retreating and avoids Retreat mortal damage; Everdusk lets Creeping Dread pick up to 3 targets.", "Ability"),
      ability("Lifebloom", "Any Hero Phase", "Heal (2D6) this unit.", "Once Per Turn (Army)"),
      ability("Metamorphosis", "Your Hero Phase", "Pick a visible enemy within 12\" and make a casting roll. Inflict 2D3 mortal damage. If it is destroyed, give the closest eligible terrain a friendly overgrown token; if every terrain feature already has one, inflict D3 mortal damage on each enemy within 6\" of the target.", "Spell", ["Spell"], 7),
      ability("The Goddess of Life", "Your Movement Phase", "Once per battle, even if destroyed, set up a replacement Alarielle with 8 damage points wholly within the creeping overgrowth and more than 9\" from enemies.", "Once Per Battle"),
      ability("Living Battering Ram", "Any Charge Phase", "If this unit charged, pick a visible enemy within 1\" and roll a dice. On a 3+, inflict mortal damage equal to the roll.", "Once Per Turn (Army)", ["Rampage"]),
    ],
  }),
  make({
    id: "belthanos-first-thorn-of-kurnoth", imageAlias: "belthanos", name: "Belthanos, First Thorn of Kurnoth", points: 290, move: '12"', health: 14, control: 5, save: "3+", baseSize: "150 × 95mm",
    regimentOptions: ["Any Sylvaneth"],
    keywords: ["Unique", "Hero", "Monster", "Fly", ...sylvaneth, "Kurnothi"],
    rules: { ...heroRules, unique: true, monster: true, companion: true },
    weapons: [
      weapon("Kurnoth's Glaive", "Melee", 5, "3+", "3+", "2", "2", ["Charge (+1 Damage)"]),
      weapon("Greatspite's Mandibles", "Melee", 4, "4+", "2+", "2", "3", ["Companion"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "At 10 or more damage, Greatspite's Mandibles has 3 Attacks.", "Passive"),
      ability("War-horn of the Wild Hunt", null, "Add 2\" to the Move characteristic of friendly Kurnothi units wholly within 12\".", "Passive"),
      ability("Rhythm of the Chase", "Any Combat Phase", "Pick an enemy in combat and roll a D3. On a 2+, inflict mortal damage equal to the roll, then this unit can move while remaining within 1\" of the target.", "Once Per Turn (Army)"),
      ability("Huntmaster's Strike", "End of Any Turn", "If this unit charged this turn, remove it and set it up wholly within the creeping overgrowth and more than 6\" from enemies.", "Once Per Turn (Army)"),
    ],
  }),
  make({
    id: "the-lady-of-vines", imageAlias: "lady-of-vines", name: "The Lady of Vines", points: 280, move: '6"', health: 10, control: 5, save: "4+", ward: "5+", baseSize: "80mm",
    regimentOptions: ["Any Sylvaneth"],
    keywords: ["Unique", "Hero", "Monster", "Wizard (2)", "Ward (5+)", ...sylvaneth, "Forest Elder"],
    rules: { ...heroRules, unique: true, monster: true, wizard: 2, ward: "5+" },
    weapons: [
      weapon("Kurnotheal's Wrath", "Ranged", 1, "2+", "2+", "2", "D6", [], '12"'),
      weapon("Kurnotheal's Wrath and Lashing Vines", "Melee", 6, "3+", "3+", "2", "2", ["Crit (Mortal)"]),
    ],
    abilities: [
      ability("Hand of the Everqueen", "Any Hero Phase", "Pick a terrain feature within 18\" with a friendly overgrown token. Measure range and visibility for this unit's next spell from that terrain feature; opponents also measure unbinding range and visibility to it.", "Once Per Turn (Army)"),
      ability("Protection of the Everqueen", "Your Hero Phase", "Make a casting roll, adding 1 if this unit is wholly within the creeping overgrowth. Until your next turn, friendly Sylvaneth units wholly within 12\" have Ward (5+).", "Spell", ["Spell"], 7),
      ability("Verdian Crown", "Any Hero Phase", "Once per battle, pick a terrain feature within 18\" without a friendly overgrown token and give it one.", "Once Per Battle"),
    ],
  }),
  make({
    id: "drycha-hamadreth", imageAlias: "drycha", name: "Drycha Hamadreth", points: 250, move: '10"', health: 12, control: 5, save: "3+", baseSize: "105 × 70mm",
    regimentOptions: ["Any Sylvaneth"],
    keywords: ["Unique", "Hero", "Monster", "Wizard (1)", ...sylvaneth, "Forest Elder"],
    rules: { ...heroRules, unique: true, monster: true, wizard: 1, companion: true },
    weapons: [
      weapon("Slashing Talons", "Melee", 5, "3+", "2+", "2", "2", ["Crit (2 Hits)"]),
      weapon("Swarm of Spites", "Melee", 20, "4+", "4+", "0", "1", ["Crit (Mortal)", "Companion"]),
    ],
    abilities: [
      ability("Terror of the Deep Woods", null, "Enemy units within 9\" cannot use Run or Retreat abilities.", "Passive"),
      ability("Enrage the Spites", "Your Hero Phase", "Pick up to 3 enemies visible and within 12\" or within the creeping overgrowth, then make a casting roll. Inflict D3 mortal damage on each.", "Spell", ["Spell"], 7),
      ability("Merciless Ambush", "Your Charge Phase", "If this unit is not in combat and has not Run or Retreated, make a charge roll. Set it up within 0.5\" of an enemy and wholly within a distance from friendly overgrown terrain equal to the roll; it counts as having charged.", "Rampage"),
    ],
  }),
  make({
    id: "spirit-of-durthu", imageAlias: "durthu", name: "Spirit of Durthu", points: 320, move: '6"', health: 14, control: 5, save: "3+", baseSize: "105 × 70mm",
    regimentOptions: ["0-1 Forest Sentinel", "Any Sylvaneth"],
    keywords: ["Hero", "Monster", ...sylvaneth, "Forest Elder"],
    rules: { ...heroRules, monster: true },
    weapons: [
      weapon("Verdant Blast", "Ranged", 3, "3+", "2+", "1", "2", ["Shoot in Combat"], '10"'),
      weapon("Guardian Sword", "Melee", 5, "3+", "2+", "2", "5", ["Anti-Monster (+1 Rend)"]),
      weapon("Massive Impaling Talons", "Melee", 2, "4+", "2+", "2", "3", ["Crit (Mortal)"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "At 10 or more damage, Guardian Sword has 3 Attacks.", "Passive"),
      ability("Guardian of the Glades", "Reaction: You declared a Charge ability", "Add 2 to the charge roll, but this unit must end within 0.5\" of an enemy in combat with another friendly Sylvaneth Hero.", "Once Per Turn (Army)"),
      ability("Groundshaker", "Any Combat Phase", "Pick an enemy non-Fly Infantry or Cavalry unit in combat. On a 3+, it has Strike-last for the rest of the turn.", "Once Per Turn (Army)", ["Rampage"]),
    ],
  }),
  make({
    id: "treelord-ancient", name: "Treelord Ancient", points: 280, move: '6"', health: 14, control: 5, save: "3+", baseSize: "105 × 70mm",
    regimentOptions: ["0-1 Forest Sentinel", "Any Sylvaneth"],
    keywords: ["Hero", "Monster", "Wizard (2)", ...sylvaneth, "Forest Elder"],
    rules: { ...heroRules, monster: true, wizard: 2 },
    weapons: [
      weapon("Doom Tendril Staff", "Ranged", 4, "4+", "2+", "1", "D3", [], '18"'),
      weapon("Sweeping Blows", "Melee", 5, "4+", "2+", "1", "2", ["Anti-Charge (+1 Rend)"]),
      weapon("Massive Impaling Talons", "Melee", 2, "4+", "2+", "2", "3", ["Crit (Mortal)"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "At 10 or more damage, Sweeping Blows has 3 Attacks.", "Passive"),
      ability("Awaken Slumbering Spirits", "Your Movement Phase", "Pick visible terrain within 12\" with a friendly overgrown token and a destroyed friendly non-Unique Kurnothi or Treelord unit. Set up a 1-model replacement wholly within 6\" of the terrain and more than 9\" from enemies, then remove the token. If it is a Treelord, allocate 10 damage to it.", "Once Per Turn (Army)"),
      ability("Eldest of Elders", "Any Combat Phase", "Roll a dice for each friendly Forest Elder in this unit's combat range. On a 3+, add 1 to its combat hit rolls until your next turn.", "Once Per Turn (Army)", ["Rampage"]),
    ],
  }),
  make({
    id: "warsong-revenant", name: "Warsong Revenant", points: 170, move: '6"', health: 7, control: 2, save: "5+", ward: "6+", baseSize: "105 × 70mm",
    regimentOptions: ["Any Sylvaneth"],
    keywords: ["Hero", "Priest (1)", "Infantry", "Fly", "Ward (6+)", ...sylvaneth, "Revenant"],
    rules: { ...heroRules, priest: 1, ward: "6+" },
    weapons: [weapon("Spirit Falchion and Spearing Vines", "Melee", 5, "3+", "3+", "1", "D3")],
    abilities: [
      ability("Alarielle's Song", null, "Friendly Sylvaneth units wholly within 12\" have Ward (6+). Subtract 1 from ward rolls for enemy units within 12\".", "Passive"),
      ability("Rousing Accompaniment", "Reaction: Unmodified chanting roll of 1", "Re-roll that chanting roll for a friendly Sylvaneth Priest wholly within 12\".", "Once Per Turn (Army)"),
    ],
  }),
  make({
    id: "grove-guardian", name: "Grove Guardian", points: 220, move: '4"', health: 9, control: 2, save: "5+", baseSize: "105 × 70mm",
    regimentOptions: ["Any Sylvaneth"],
    keywords: ["Hero", "Priest (2)", "Infantry", ...sylvaneth, "Forest Elder"],
    rules: { ...heroRules, priest: 2, companion: true },
    weapons: [
      weapon("Grove Sickle or Shears", "Melee", 3, "4+", "3+", "1", "D3"),
      weapon("Guardian Spites", "Melee", 6, "4+", "4+", "1", "D3", ["Crit (Mortal)", "Companion"]),
    ],
    abilities: [
      ability("Soulshriek", null, "Each time a model in a friendly non-Hero Revenant unit wholly within 12\" and visible is slain by a combat attack, roll dice equal to its Health. Each 5+ inflicts 1 mortal damage on the attacker after it fights.", "Passive"),
      ability("Regenesis", "Your Hero Phase", "Pick a friendly unit wholly within the creeping overgrowth or visible and wholly within 12\". On a 6+, pick a second. Return D3 slain models to Revenant Infantry or Dryads targets; otherwise Heal (3).", "Prayer", ["Prayer"], 4),
    ],
  }),
  make({
    id: "arch-revenant", name: "Arch-Revenant", points: 110, move: '12"', health: 6, control: 2, save: "4+", baseSize: "40mm",
    regimentOptions: ["Any non-Monster Sylvaneth"], canJoinRegimentAs: ["forest-sentinel"],
    keywords: ["Hero", "Infantry", "Fly", ...sylvaneth, "Revenant"],
    rules: heroRules,
    weapons: [weapon("Arch-Revenant's Glaive", "Melee", 5, "3+", "4+", "1", "2")],
    abilities: [
      ability("Gossamid Commander", "Any Combat Phase", "If this unit charged, pick visible friendly Gossamid Archers not in combat and wholly within 18\". They can Shoot, but must target an enemy in combat with this unit.", "Once Per Turn (Army)"),
      ability("Fight and Fly", "Reaction: You declared a Fight ability", "If this unit charged, it can move 2D6\" after fighting and cannot end that move in combat.", "Reaction"),
    ],
  }),
  make({
    id: "branchwych", name: "Branchwych", points: 100, move: '6"', health: 5, control: 2, save: "5+", baseSize: "32mm",
    regimentOptions: ["Any Infantry"],
    keywords: ["Hero", "Wizard (1)", "Infantry", ...sylvaneth],
    rules: { ...heroRules, wizard: 1 },
    weapons: [weapon("Greenwood Scythe", "Melee", 3, "3+", "3+", "1", "D3")],
    abilities: [ability("Slay the Trespassers", "Your Hero Phase", "Pick an enemy within the creeping overgrowth or visible and within friendly territory. On a 3+, add 1 to wound rolls for this unit's combat attacks against it for the rest of the turn.", "Ability")],
  }),
  make({
    id: "treelord", name: "Treelord", points: 240, move: '6"', health: 14, control: 5, save: "3+", baseSize: "105 × 70mm",
    keywords: ["Monster", ...sylvaneth, "Forest Elder"],
    rules: { monster: true, canBeReinforced: false },
    weapons: [
      weapon("Strangleroots", "Ranged", 5, "4+", "3+", "1", "1", [], '12"'),
      weapon("Sweeping Blows", "Melee", 4, "4+", "2+", "1", "2", ["Anti-Charge (+1 Rend)"]),
      weapon("Massive Impaling Talons", "Melee", 2, "4+", "2+", "2", "3", ["Crit (Mortal)"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "At 10 or more damage, Sweeping Blows has 3 Attacks.", "Passive"),
      ability("Lash and Tangle", "Any Shooting Phase", "Pick an enemy damaged by Strangleroots this turn. Roll a dice, adding 1 if it is within the creeping overgrowth. On a 3+, subtract 1 from its hit rolls until your next turn.", "Once Per Turn (Army)"),
      ability("Strangling Grasp", "Any Combat Phase", "Pick a visible enemy within 10\" and roll a dice. If the roll exceeds its Health characteristic, slay 1 model in it.", "Once Per Turn (Army)", ["Rampage"]),
    ],
  }),
  make({
    id: "dryads", name: "Dryads", points: 100, models: 10, move: '6"', health: 1, control: 1, save: "5+", baseSize: "32mm",
    keywords: ["Infantry", ...sylvaneth],
    weapons: [weapon("Wracking Talons", "Melee", 3, "4+", "3+", "1", "1")],
    abilities: [ability("One with the Forest", null, "Subtract 1 from hit and wound rolls for attacks targeting this unit while it is wholly within the creeping overgrowth.", "Passive")],
  }),
  make({
    id: "tree-revenants", name: "Tree-Revenants", points: 110, models: 5, move: '6"', health: 2, control: 1, save: "5+", baseSize: "32mm",
    keywords: ["Infantry", "Champion", ...sylvaneth, "Revenant"],
    weapons: [weapon("Enchanted Blade", "Melee", 3, "3+", "4+", "1", "1")],
    abilities: [ability("Warriors of the Woods", null, "While this unit is in combat and did not charge this turn, add 1 to the Damage of its melee weapons.", "Passive")],
  }),
  make({
    id: "spite-revenants", name: "Spite-Revenants", points: 100, models: 5, move: '6"', health: 2, control: 1, save: "5+", baseSize: "32mm",
    keywords: ["Infantry", "Champion", ...sylvaneth, "Revenant"],
    weapons: [weapon("Cruel Talons and Fangs", "Melee", 3, "3+", "4+", "1", "1", ["Crit (Mortal)"])],
    abilities: [ability("Shadowcreep", "Your Movement Phase", "If wholly within the creeping overgrowth, remove this unit and set it up wholly within 3\" of friendly overgrown terrain and more than 9\" from enemies. Add 1 to its charge rolls this turn.", "Ability")],
  }),
  make({
    id: "kurnoth-hunters-with-greatswords", imageAlias: "kurnoth-hunters", name: "Kurnoth Hunters with Greatswords", points: 210, models: 3, move: '6"', health: 5, control: 2, save: "4+", baseSize: "50mm",
    keywords: ["Infantry", "Champion", ...sylvaneth, "Kurnothi"],
    weapons: [weapon("Kurnoth Greatsword", "Melee", 4, "3+", "3+", "1", "2", ["Crit (Mortal)"])],
    abilities: [
      ability("Hunter's Endurance", null, "Subtract 1 from the Rend of attacks targeting this unit while it is wholly within the creeping overgrowth.", "Passive"),
      ability("Crashing Impact", "Any Combat Phase", "If this unit charged, pick an enemy in combat and roll a dice for each model in this unit in combat with it. Each 3+ inflicts 1 mortal damage.", "Once Per Turn (Army)"),
    ],
  }),
  make({
    id: "kurnoth-hunters-with-greatscythes", imageAlias: "kurnoth-hunters", name: "Kurnoth Hunters with Greatscythes", points: 200, models: 3, move: '6"', health: 5, control: 2, save: "4+", baseSize: "50mm",
    keywords: ["Infantry", "Champion", ...sylvaneth, "Kurnothi"],
    weapons: [weapon("Kurnoth Greatscythe", "Melee", 3, "3+", "3+", "1", "3", ["Anti-Charge (+1 Rend)"])],
    abilities: [
      ability("Hunter's Endurance", null, "Subtract 1 from the Rend of attacks targeting this unit while it is wholly within the creeping overgrowth.", "Passive"),
      ability("Tanglethorn Thicket", "Any Combat Phase", "Pick an enemy that charged and is in combat with this unit. Roll a dice for each model in this unit in combat with it; each 3+ inflicts 1 mortal damage.", "Once Per Turn (Army)"),
    ],
  }),
  make({
    id: "kurnoth-hunters-with-greatbows", imageAlias: "kurnoth-hunters", name: "Kurnoth Hunters with Greatbows", points: 190, models: 3, move: '6"', health: 5, control: 2, save: "4+", baseSize: "50mm",
    keywords: ["Infantry", "Champion", ...sylvaneth, "Kurnothi"],
    weapons: [
      weapon("Kurnoth Greatbow", "Ranged", 2, "3+", "3+", "1", "3", [], '18"'),
      weapon("Vicious Claws", "Melee", 3, "3+", "3+", "0", "1"),
    ],
    abilities: [
      ability("Hunter's Endurance", null, "Subtract 1 from the Rend of attacks targeting this unit while it is wholly within the creeping overgrowth.", "Passive"),
      ability("Steady Aim", null, "If this unit did not use a Move ability and was not set up this turn, add 1 to hit rolls for its shooting attacks.", "Passive"),
    ],
  }),
  make({
    id: "spiterider-lancers", name: "Spiterider Lancers", points: 230, models: 3, move: '12"', health: 5, control: 2, save: "4+", baseSize: "60mm",
    keywords: ["Cavalry", "Champion", ...sylvaneth, "Revenant"],
    rules: { companion: true },
    weapons: [
      weapon("Spiterider Lance", "Melee", 3, "3+", "4+", "1", "1", ["Charge (+1 Damage)", "Crit (2 Hits)"]),
      weapon("Spite's Mandibles", "Melee", 3, "4+", "3+", "1", "2", ["Companion"]),
    ],
    abilities: [
      ability("Forest Fighters", null, "This unit has a coherency range of 2\".", "Passive"),
      ability("Strike and Fade", "End of Any Turn", "If this unit charged, remove it and set it up wholly within the creeping overgrowth and more than 9\" from enemies.", "Once Per Turn (Army)"),
    ],
  }),
  make({
    id: "revenant-seekers", name: "Revenant Seekers", points: 180, models: 3, move: '12"', health: 5, control: 2, save: "4+", baseSize: "60mm",
    keywords: ["Cavalry", "Champion", ...sylvaneth, "Revenant"],
    rules: { companion: true },
    weapons: [
      weapon("Seeker Sickle", "Melee", 3, "3+", "4+", "1", "1", ["Crit (Mortal)"]),
      weapon("Spite's Mandibles", "Melee", 3, "4+", "3+", "1", "2", ["Companion"]),
    ],
    abilities: [
      ability("Forest Fighters", null, "This unit has a coherency range of 2\".", "Passive"),
      ability("Deafening Drone", "Any Combat Phase", "If this unit did not charge, pick an enemy in combat. Subtract 1 from the Attacks characteristic of its melee weapons for the rest of the turn.", "Once Per Turn (Army)"),
    ],
  }),
  make({
    id: "gossamid-archers", name: "Gossamid Archers", points: 120, models: 5, move: '12"', health: 2, control: 1, save: "5+", baseSize: "32mm",
    keywords: ["Infantry", "Champion", "Fly", ...sylvaneth, "Revenant"],
    weapons: [
      weapon("Gossamid Bow", "Ranged", 2, "3+", "4+", "1", "1", ["Crit (Auto-wound)", "Shoot in Combat"], '12"'),
      weapon("Cruel Talons", "Melee", 2, "3+", "4+", "0", "1"),
    ],
    abilities: [
      ability("Forest Fighters", null, "This unit has a coherency range of 2\".", "Passive"),
      ability("Zephyrspites", "Reaction: You declared a Shoot ability", "After shooting, this unit can move D6\" but cannot enter combat.", "Reaction", ["Move"]),
    ],
  }),
  make({
    id: "the-twistweald", imageAlias: "twistweald", name: "The Twistweald", points: 140, models: 8, move: '6"', health: 2, control: 1, save: "5+", baseSize: "40mm (2), 32mm (3), 28.5mm (3); or 40mm (1), 32mm (4), 28.5mm (3)",
    keywords: ["Infantry", "Champion", ...sylvaneth, "Revenant"],
    rules: { canBeReinforced: false },
    weapons: [
      weapon("Voracious Swarm", "Ranged", 6, "3+", "4+", "1", "1", ["Shoot in Combat"], '10"'),
      weapon("Warden's Bow", "Ranged", 2, "3+", "4+", "1", "1", [], '18"'),
      weapon("Twistroot Weapons", "Melee", 3, "3+", "4+", "1", "1"),
    ],
    abilities: [
      ability("Latching Paraspites", "End of Any Turn", "Pick an enemy in combat. It gains the Infested keyword for the rest of the battle. Infested enemies cannot move more than 6\" with non-Charge Move abilities.", "Once Per Turn (Army)"),
      ability("Pain-induced Frenzy", null, "This unit's melee weapons have Crit (2 Hits) if it charged this turn.", "Passive"),
    ],
  }),
];

export default units;
