import { ability, createOrrukUnit, weapon } from "../orrukWarclans/unitFactory";

const make = (config) => createOrrukUnit({ faction: "daughters", ...config });
const dok = ["Order", "Daughters of Khaine"];
const aelf = [...dok, "Aelf"];
const heroRules = { hero: true, canBeReinforced: false };
const wardRules = { ward: "6+" };

const units = [
  make({
    id: "morathi-khaine", name: "Morathi-Khaine", points: 750, move: '6"', health: 6, control: 2, save: "5+", ward: "4+", baseSize: "40mm",
    regimentOptions: ["1-1 The Shadow Queen", "0-1 Coven Matriarch", "Any Daughters of Khaine"],
    keywords: ["Warmaster", "Unique", "Hero", "Wizard (3)", "Infantry", "Ward (4+)", ...aelf],
    rules: { ...heroRules, unique: true, wizard: 3, ward: "4+", warmaster: true },
    weapons: [weapon("Heartrender and Bladed Wings", "Melee", 5, "3+", "4+", "2", "2")],
    abilities: [
      ability("The Iron Heart of Khaine", null, "Each time you perform a blood rite, choose 1: this unit is only visible within its combat range until your next turn; Heal (D6) this unit or a Shadow Queen; a Shadow Queen can immediately Normal Move or Retreat; reposition this unit more than 9\" from enemies; or set this unit's Control to 5 and a Shadow Queen's Control to 15 for the turn.", "Passive"),
      ability("Divine Matriarch", "Your Hero Phase", "Pick a visible friendly Daughters of Khaine Priest or Wizard wholly within 12\". Add 1 to its casting and chanting rolls until your next turn.", "Ability"),
      ability("Surge of Hatred", "Your Hero Phase", "Pick a friendly Shadow Queen wholly within 12\" and in combat, or a visible friendly non-Hero Daughters of Khaine unit wholly within 12\" and in combat, then make a casting roll. A Shadow Queen target can Fight immediately; otherwise inflict D3 mortal damage on each enemy in combat with the target.", "Spell", ["Spell"], 7),
    ],
  }),
  make({
    id: "the-shadow-queen", name: "The Shadow Queen", points: 0, move: '12"', health: 15, control: 10, save: "4+", ward: "6+", baseSize: "100mm",
    regimentOptions: [], canJoinRegimentAs: [], notes: "Can only be taken in Morathi-Khaine's regiment.",
    keywords: ["Unique", "Hero", "Monster", "Fly", "Ward (6+)", ...dok],
    rules: { ...heroRules, unique: true, monster: true, ward: "6+", canLeadRegiment: false },
    weapons: [
      weapon("Heartrender", "Melee", 8, "3+", "3+", "2", "3", ["Crit (Mortal)"]),
      weapon("Envenomed Tail", "Melee", 1, "3+", "3+", "2", "6", ["Crit (Mortal)"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "At 10 or more damage, Heartrender has 5 Attacks.", "Passive"),
      ability("Two Bodies, One Soul", "Your Hero Phase", "Once per battle for the army, even if destroyed, if Blessings of Khaine has been used 3 or more times, replace a destroyed Morathi-Khaine or Shadow Queen within 3\" of the surviving paired unit.", "Once Per Battle (Army)"),
      ability("Coils of the Shadow Queen", "Any Combat Phase", "Pick an enemy Hero or Monster in combat. On a 3+, it is constricted until your next turn while in combat with this unit; attacks against it score critical hits on unmodified hit rolls of 5+.", "Once Per Turn (Army)", ["Rampage"]),
      ability("Crown of Serpents", "Any Combat Phase", "Pick an enemy in combat and roll 5 dice, adding 2 if constricted. For each 5+, choose a different effect: -1 hit; -1 wound; random Damage becomes 1; D3 mortal damage; or it cannot be healed or return models this turn.", "Ability"),
    ],
  }),
  make({
    id: "krethusa-the-croneseer", imageAlias: "krethusa", name: "Krethusa the Croneseer", points: 220, move: '12"', health: 6, control: 2, save: "5+", ward: "5+", baseSize: "60mm",
    regimentOptions: ["0-1 Coven Matriarch", "Any Aelf"],
    keywords: ["Unique", "Hero", "Priest (2)", "Infantry", "Fly", "Ward (5+)", ...aelf],
    rules: { ...heroRules, unique: true, priest: 2, ward: "5+" },
    weapons: [weapon("Staff of Morai-Heg", "Melee", 4, "3+", "4+", "1", "D3")],
    abilities: [
      ability("The Croneseer", null, "Gain 1 prophecy token each time you perform a blood rite. At 2+, enemies cannot target this unit with shooting or spells; at 3+, re-roll chanting rolls of 1; at 4+, unmodified hit rolls of 1-4 against this unit fail.", "Passive"),
      ability("Omens of Doom", "Your Hero Phase", "Make a chanting roll. Pick 1 effect, or 2 on a 10+: reduce an enemy Wizard or Priest's power level by 1; let a friendly Daughters of Khaine Infantry unit wholly within 12\" Normal Move as if it had Run; or prevent a visible enemy within 12\" from scoring critical hits until your next turn.", "Prayer", ["Prayer"], 4),
    ],
  }),
  make({
    id: "slaughter-queen", name: "Slaughter Queen", points: 130, move: '6"', health: 5, control: 2, save: "5+", ward: "6+", baseSize: "25mm",
    regimentOptions: ["0-1 Coven Matriarch", "Any Aelf"],
    keywords: ["Hero", "Priest (1)", "Infantry", "Ward (6+)", ...aelf],
    rules: { ...heroRules, priest: 1, ...wardRules },
    weapons: [weapon("Deathsword and Blade of Khaine", "Melee", 6, "3+", "4+", "1", "2")],
    abilities: [ability("Fanatical Blademaster", "Your Hero Phase", "Pick a visible friendly Daughters of Khaine unit wholly within 12\" and roll a die. On a 3+, apply 1 inactive blessing to it until your next turn. If Blessings of Khaine has been used 3+ times, apply 2 instead.", "Once Per Turn (Army)", ["Exalted"])],
  }),
  make({
    id: "hag-queen", name: "Hag Queen", points: 110, move: '6"', health: 5, control: 2, save: "5+", ward: "6+", baseSize: "25mm",
    regimentOptions: ["0-1 Coven Matriarch", "Any Aelf"],
    keywords: ["Hero", "Priest (1)", "Infantry", "Ward (6+)", ...aelf],
    rules: { ...heroRules, priest: 1, ...wardRules },
    weapons: [weapon("Blade of Khaine", "Melee", 5, "3+", "4+", "1", "2")],
    abilities: [ability("Catechism of Violence", "Any Combat Phase", "For the turn, after a visible friendly Daughters of Khaine unit wholly within 12\" fights, pick a visible friendly Priest wholly within 12\" of this unit. That Priest gains 1 ritual point.", "Once Per Turn (Army)", ["Exalted"])],
  }),
  make({
    id: "slaughter-queen-on-cauldron-of-blood", imageAlias: "slaughter-queen-cauldron", name: "Slaughter Queen on Cauldron of Blood", points: 300, move: '6"', health: 12, control: 5, save: "4+", ward: "6+", baseSize: "120 x 92mm",
    regimentOptions: ["0-1 Coven Matriarch", "Any Aelf"],
    keywords: ["Hero", "Priest (1)", "War Machine", "Ward (6+)", ...aelf],
    rules: { ...heroRules, priest: 1, ...wardRules, companion: true },
    weapons: [weapon("Shrine Guardians' Blades", "Melee", 9, "3+", "4+", "1", "2"), weapon("Avatar's Sword", "Melee", 5, "3+", "3+", "2", "3", ["Companion"])],
    abilities: [
      ability("Consecrated Revulsion", null, "Add 1 to save rolls for visible friendly Daughters of Khaine Infantry units wholly within 12\".", "Passive"),
      ability("Icon of Slaughter", null, "When a friendly Daughters of Khaine unit wholly within 12\" uses Rally, make 3 additional rally rolls. If any Hag Queen on Cauldron of Blood is on the battlefield, make D3 additional rolls instead.", "Passive", ["Exalted"]),
    ],
  }),
  make({
    id: "hag-queen-on-cauldron-of-blood", imageAlias: "hag-queen-cauldron-blood", name: "Hag Queen on Cauldron of Blood", points: 290, move: '6"', health: 12, control: 5, save: "4+", ward: "6+", baseSize: "120 x 92mm",
    regimentOptions: ["0-1 Coven Matriarch", "Any Aelf"],
    keywords: ["Hero", "Priest (1)", "War Machine", "Ward (6+)", ...aelf],
    rules: { ...heroRules, priest: 1, ...wardRules, companion: true },
    weapons: [weapon("Shrine Guardians' Blades", "Melee", 9, "3+", "4+", "1", "2"), weapon("Avatar's Sword", "Melee", 5, "3+", "3+", "2", "3", ["Companion"])],
    abilities: [
      ability("Wrathful Repulsion", "Any Combat Phase", "Pick a visible friendly Daughters of Khaine unit wholly within 12\" and in combat that charged. If a Slaughter Queen on Cauldron is present, pick a second. Targets have Ward (5+) for the turn.", "Once Per Turn (Army)", ["Exalted"]),
      ability("Roaring Idol", "Your Hero Phase", "Pick a friendly Daughters of Khaine Manifestation wholly within 12\". On a 3+, it cannot be targeted by enemy Banish abilities until your next turn.", "Once Per Turn (Army)"),
    ],
  }),
  make({
    id: "bloodwrack-shrine", imageAlias: "bloodwrack-shrine", name: "Bloodwrack Shrine", points: 270, move: '6"', health: 12, control: 5, save: "4+", ward: "6+", baseSize: "120 x 92mm",
    regimentOptions: ["0-1 Coven Matriarch", "Any non-Aelf"],
    keywords: ["Hero", "War Machine", "Wizard (2)", "Ward (6+)", ...dok],
    rules: { ...heroRules, wizard: 2, ...wardRules },
    weapons: [weapon("Bloodwrack Stare", "Ranged", 4, "3+", "3+", "2", "3", ["Crit (2 Hits)", "Shoot in Combat"], '15"'), weapon("Shrine Guardians' Blades", "Melee", 9, "3+", "4+", "1", "2")],
    abilities: [
      ability("Born of Slaughter", "Your Hero Phase", "If there are fewer friendly Avatars of Khaine than friendly Bloodwrack Shrines, make a casting roll and summon an Avatar wholly within 12\", visible and more than 9\" from enemies.", "Spell", ["Spell", "Summon"], 6),
      ability("Aura of Agony", "Your Hero Phase", "Until your next turn, enemy Manifestations cannot be set up within 12\" and this unit has Ward (4+) against mortal damage from spells, prayers and manifestations.", "Once Per Turn (Army)", ["Exalted"]),
      ability("Agonising Spasms", "Reaction: You declared a Shoot ability", "If every attack targeted the same enemy and any models were slain, on a 3+ that enemy has a maximum control score of 1 for the turn.", "Ability"),
    ],
  }),
  make({
    id: "melusai-ironscale", imageAlias: "melusai-ironscale", name: "Melusai Ironscale", points: 110, move: '8"', health: 6, control: 2, save: "5+", ward: "6+", baseSize: "40mm",
    regimentOptions: ["Any non-Aelf"], canJoinRegimentAs: ["coven-matriarch"],
    keywords: ["Hero", "Infantry", "Ward (6+)", ...dok],
    rules: { ...heroRules, ...wardRules },
    weapons: [weapon("Keldrisaith", "Melee", 6, "3+", "4+", "1", "2", ["Crit (Mortal)"])],
    abilities: [ability("Ironscale's Fury", null, "When a model in a friendly non-Hero Daughters of Khaine unit is slain by a combat attack while within this unit's combat range and in combat with the attacker, roll a die, or 2 dice for Blood Sisters or Blood Stalkers. Each 5+ inflicts 1 mortal damage on the attacker.", "Passive", ["Exalted"])],
  }),
  make({
    id: "bloodwrack-medusa", name: "Bloodwrack Medusa", points: 140, move: '8"', health: 6, control: 2, save: "5+", ward: "6+", baseSize: "40mm",
    regimentOptions: ["Any non-Aelf"],
    keywords: ["Hero", "Wizard (1)", "Infantry", "Ward (6+)", ...dok],
    rules: { ...heroRules, wizard: 1, ...wardRules },
    weapons: [weapon("Bloodwrack Spear and Whisperclaw", "Melee", 5, "3+", "4+", "1", "2", ["Crit (Mortal)"])],
    abilities: [
      ability("Exsanguinating Glare", "Your Shooting Phase", "Pick an enemy in combat, or a visible enemy within 12\" if not in combat. Roll a D3. On a 2+, inflict that much mortal damage, then if models were slain inflict mortal damage equal to its Health.", "Once Per Turn (Army)"),
      ability("Arcane Resonance", null, "Add 1 to casting rolls for Summon abilities and 1 to this unit's banishment rolls.", "Passive", ["Exalted"]),
    ],
  }),
  make({
    id: "high-gladiatrix", imageAlias: "high-gladiatrix", name: "High Gladiatrix", points: 120, move: '6"', health: 5, control: 2, save: "5+", ward: "6+", baseSize: "32mm",
    regimentOptions: ["Any Aelf"], canJoinRegimentAs: ["coven-matriarch"],
    keywords: ["Hero", "Infantry", "Ward (6+)", ...aelf],
    rules: { ...heroRules, ...wardRules },
    weapons: [weapon("Barbed Whip and Gladiatrix's Blade", "Melee", 6, "3+", "4+", "1", "2")],
    abilities: [ability("Paragon of Slaughter", "Your Hero Phase", "Pick a visible friendly Daughters of Khaine Infantry unit wholly within 12\". If this unit is in combat, add 1 Rend to its melee weapons this turn; otherwise, do so on a 3+.", "Once Per Turn (Army)", ["Exalted"])],
  }),
  make({
    id: "blood-hags", imageAlias: "blood-hags", name: "Blood Hags", points: 150, models: 10, move: '6"', health: 1, control: 1, save: "5+", ward: "6+", baseSize: "28.5mm",
    keywords: ["Infantry", "Champion", "Standard Bearer (1/10)", "Ward (6+)", ...aelf], rules: { ...wardRules },
    weapons: [weapon("Ki'raich", "Ranged", 1, "3+", "4+", "1", "1", [], '10"'), weapon("Valthrai", "Melee", 3, "3+", "4+", "1", "1")],
    abilities: [
      ability("Wicked Wardens", null, "While wholly within 12\" of a friendly Hag Queen on Cauldron, Slaughter Queen on Cauldron or Shrine of Dark Tribute, this unit's melee weapons have Anti-charge (+1 Rend).", "Passive"),
      ability("Crimson Offerings", "Reaction: You declared Blessings of Khaine", "If an enemy was destroyed by this unit's combat attacks this turn, pick 2 blessings instead of 1.", "Once Per Turn (Army)"),
    ],
  }),
  make({
    id: "khainite-shadowstalkers", imageAlias: "khainite-shadowstalkers", name: "Khainite Shadowstalkers", points: 130, models: 9, move: '6"', health: 1, control: 1, save: "5+", ward: "6+", baseSize: "40mm [1], 28.5mm [8]",
    notes: "This unit cannot be reinforced.", keywords: ["Infantry", "Champion (1/9)", "Ward (6+)", ...aelf], rules: { ...wardRules, canBeReinforced: false },
    weapons: [weapon("Cursed Bolts and Missiles", "Ranged", 2, "3+", "4+", "1", "1", [], '10"'), weapon("Blades of Murder", "Melee", 2, "3+", "4+", "1", "1")],
    abilities: [ability("Shadow Leap", "Your Movement Phase", "Remove this unit from the battlefield and set it up again more than 9\" from enemies.", "Once Per Turn (Army)")],
  }),
  make({
    id: "witch-aelves", imageAlias: "witch-aelves", name: "Witch Aelves", points: 120, models: 10, move: '6"', health: 1, control: 1, save: "6+", ward: "6+", baseSize: "25mm",
    keywords: ["Infantry", "Champion", "Musician (1/5)", "Standard Bearer (1/5)", "Ward (6+)", ...aelf], rules: { ...wardRules },
    weapons: [weapon("Sciansa", "Melee", 3, "3+", "4+", "0", "1")],
    abilities: [ability("Frenzied Fervour", null, "Add 1 to the Rend of this unit's melee weapons if it charged this turn.", "Passive")],
  }),
  make({
    id: "sisters-of-slaughter", imageAlias: "sisters-slaughter", name: "Sisters of Slaughter", points: 110, models: 10, move: '6"', health: 1, control: 1, save: "6+", ward: "6+", baseSize: "25mm",
    keywords: ["Infantry", "Champion", "Musician (1/5)", "Standard Bearer (1/5)", "Ward (6+)", ...aelf], rules: { ...wardRules },
    weapons: [weapon("Kruiplash", "Melee", 3, "3+", "4+", "0", "1")],
    abilities: [ability("Dance of Death", "Any Combat Phase", "Pick an enemy that charged this turn and is in combat with this unit. Subtract 1 from its hit and wound rolls for combat attacks this turn.", "Once Per Turn (Army)")],
  }),
  make({
    id: "khinerai-heartrenders", imageAlias: "khinerai-heartrenders", name: "Khinerai Heartrenders", points: 100, models: 5, move: '12"', health: 2, control: 1, save: "5+", ward: "6+", baseSize: "40mm",
    keywords: ["Infantry", "Champion", "Fly", "Ward (6+)", ...dok], rules: { ...wardRules },
    weapons: [weapon("Barbed Javelin", "Ranged", 2, "3+", "4+", "1", "1", [], '12"'), weapon("Barbed Javelin", "Melee", 1, "3+", "4+", "0", "1")],
    abilities: [ability("Fire and Flight", "Reaction: You declared a Shoot ability", "After shooting, this unit can move 2D6\" but cannot enter combat.", "Once Per Turn (Army)")],
  }),
  make({
    id: "khinerai-lifetakers", imageAlias: "khirenai-lifetakers", name: "Khinerai Lifetakers", points: 110, models: 5, move: '12"', health: 2, control: 1, save: "5+", ward: "6+", baseSize: "40mm",
    keywords: ["Infantry", "Champion", "Fly", "Ward (6+)", ...dok], rules: { ...wardRules },
    weapons: [weapon("Barbed Sickle", "Melee", 2, "3+", "4+", "1", "1")],
    abilities: [ability("Fight and Flight", "Any Combat Phase", "If in combat, this unit can move 12\", pass through enemy combat ranges but not end in combat. Roll a D3 for each enemy passed across; on a 2+, inflict mortal damage equal to the roll.", "Once Per Turn (Army)", ["Core", "Attack", "Fight"])],
  }),
  make({
    id: "blood-sisters", imageAlias: "blood-sisters", name: "Blood Sisters", points: 160, models: 5, move: '8"', health: 3, control: 1, save: "5+", ward: "6+", baseSize: "40mm",
    keywords: ["Infantry", "Champion", "Ward (6+)", ...dok], rules: { ...wardRules },
    weapons: [weapon("Heartshard Glaive", "Melee", 2, "3+", "4+", "1", "2", ["Crit (Mortal)"])],
    abilities: [ability("Crystal Touch", "Any Combat Phase", "Pick an enemy Infantry or Cavalry unit in combat and roll a die. If the roll is equal to or less than its Health, it has Strike-last this turn.", "Once Per Turn (Army)")],
  }),
  make({
    id: "blood-stalkers", imageAlias: "blood-stalkers", name: "Blood Stalkers", points: 150, models: 5, move: '8"', health: 3, control: 1, save: "5+", ward: "6+", baseSize: "40mm",
    keywords: ["Infantry", "Champion", "Ward (6+)", ...dok], rules: { ...wardRules },
    weapons: [weapon("Heartseeker Bow", "Ranged", 3, "3+", "4+", "1", "1", ["Crit (Auto-wound)"], '18"'), weapon("Scianlar", "Melee", 2, "3+", "4+", "0", "1")],
    abilities: [ability("Barbed Arrows", "Reaction: You declared a Shoot ability", "If all attacks targeted the same enemy, roll a die and add 1 if another friendly Blood Stalkers unit also targeted it this turn. On a 3+, subtract 1 from its charge rolls until your next turn.", "Once Per Turn (Army)")],
  }),
  make({
    id: "doomfire-warlocks", name: "Doomfire Warlocks", points: 150, models: 5, move: '14"', health: 3, control: 1, save: "5+", ward: "6+", baseSize: "60 x 35mm",
    notes: "Moves to Warhammer Legends on 1 June 2027.", keywords: ["Wizard (1)", "Cavalry", "Champion", "Ward (6+)", ...aelf], rules: { wizard: 1, ...wardRules, companion: true },
    weapons: [weapon("Doomfire Crossbow", "Ranged", 2, "3+", "4+", "0", "1", [], '10"'), weapon("Cursed Scimitar", "Melee", 2, "3+", "4+", "1", "1"), weapon("Dark Steed's Vicious Bite", "Melee", 2, "5+", "3+", "0", "1", ["Companion"])],
    abilities: [ability("Outmanoeuvre", null, "When this unit uses Redeploy, a distance roll of 1-3 can be treated as 4.", "Passive")],
  }),
];

export default units;
