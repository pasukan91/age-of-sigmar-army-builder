import { ability, createOrrukUnit, weapon } from "../orrukWarclans/unitFactory";

const make = (config) => createOrrukUnit({ faction: "kruleboyz", ...config });
const anyKruleboyz = ["any-kruleboyz"];

const units = [
  make({
    id: "gobsprakk-the-mouth-of-mork", name: "Gobsprakk, the Mouth of Mork", points: 240,
    move: '12"', health: 14, control: 5, save: "5+", ward: "6+", baseSize: "130mm",
    regimentOptions: ["0-1 Mob Wrangler", "0-1 Swamp Beast", "Any Kruleboyz"],
    keywords: ["Warmaster", "Unique", "Hero", "Monster", "Wizard (2)", "Fly", "Ward (6+)", "Destruction", "Kruleboyz"],
    rules: { hero: true, unique: true, monster: true, wizard: 2, ward: "6+", warmaster: true, companion: true, canBeReinforced: false },
    weapons: [
      weapon("Bogbark Staff", "Melee", 3, "4+", "3+", "1", "D3", ["Anti-Wizard (+1 Rend)", "Crit (Mortal)"]),
      weapon("Killabeak's Talons and Beak", "Melee", 7, "4+", "2+", "1", "2", ["Anti-Wizard (+1 Rend)", "Companion"]),
      weapon("Killabeak's Stinger", "Melee", 1, "3+", "2+", "2", "D6", ["Crit (Mortal)", "Companion"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "While this unit has 10 or more damage points, Killabeak's Talons and Beak has 5 Attacks.", "Passive"),
      ability("Strangle Hex", "Your Hero Phase", "Pick a visible enemy within 18\" and cast on 6. Roll dice equal to its Health, to a maximum of 10; each 4+ inflicts 1 mortal damage.", "Spell", ["Spell"], 6),
      ability("Crush to Death", "Any Combat Phase", "Pick an enemy in combat and roll. If the roll exceeds its Health, slay 1 model in that unit.", "Once Per Turn (Army)", ["Rampage"]),
      ability("Mork Sez No!", null, "Each time this unit unbinds a spell, inflict D3 mortal damage on the caster, or D6 if the unbinding roll was 10+.", "Passive"),
      ability("Screamin' Mandrakk", "Opponent declared a Spell ability", "Once per battle, this unit uses Unbind with 3D6 instead of 2D6.", "Reaction"),
    ],
  }),
  make({
    id: "killaboss-on-corpse-rippa-vulcha", name: "Killaboss on Corpse-rippa Vulcha", points: 240,
    move: '12"', health: 14, control: 5, save: "4+", baseSize: "130mm",
    regimentOptions: ["0-1 Mob Wrangler", "Any Kruleboyz"], canJoinRegimentAs: ["swamp-beast"],
    keywords: ["Hero", "Monster", "Fly", "Destruction", "Kruleboyz"],
    rules: { hero: true, monster: true, companion: true, canBeReinforced: false },
    weapons: [
      weapon("Boss-stikka or Boss-hacka", "Melee", 5, "4+", "3+", "1", "2", ["Crit (Mortal)"]),
      weapon("Vulcha's Talons and Beak", "Melee", 7, "4+", "2+", "1", "2", ["Companion"]),
      weapon("Vulcha's Stinger", "Melee", 1, "3+", "2+", "2", "D6", ["Crit (Mortal)", "Companion"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "While this unit has 10 or more damage points, Vulcha's Talons and Beak has 5 Attacks.", "Passive"),
      ability("Vulcha Dive", "Any Charge Phase", "After charging, roll dice equal to the unmodified charge roll for an enemy in combat. Each 4+ inflicts 1 mortal damage.", "Once Per Turn (Army)", ["Rampage"]),
      ability("Commanding View", "Reaction: Redeploy", "For a friendly Gutrippaz unit wholly within 12\", a Redeploy roll of 1-3 can be treated as 4.", "Reaction"),
    ],
  }),
  make({
    id: "killaboss-on-great-gnashtoof", name: "Killaboss on Great Gnashtoof", points: 130,
    move: '10"', health: 10, control: 2, save: "3+", baseSize: "105 × 70mm",
    regimentOptions: ["0-1 Mob Wrangler", "Any Kruleboyz"], canJoinRegimentAs: ["swamp-beast"],
    keywords: ["Hero", "Cavalry", "Destruction", "Kruleboyz"],
    rules: { hero: true, monster: true, companion: true, canBeReinforced: false },
    weapons: [
      weapon("Boss-stikka", "Melee", 5, "4+", "3+", "1", "2", ["Crit (Mortal)"]),
      weapon("Great Gnashtoof's Jaws", "Melee", 5, "4+", "3+", "1", "2", ["Companion"]),
    ],
    abilities: [
      ability("That's Ours, Ya Gitz!", null, "While contesting an objective you do not control, add 1 to hit rolls for combat attacks by friendly Kruleboyz units wholly within 12\".", "Passive"),
      ability("All Part of Da Plan", "Your Hero Phase", "Pick another friendly Kruleboyz unit wholly within 9\". Add 3 to its Control until your next turn.", "Ability"),
    ],
  }),
  make({
    id: "killaboss-with-stab-grot", name: "Killaboss with Stab-grot", points: 80,
    move: '5"', health: 6, control: 2, save: "4+", baseSize: "40mm [1], 25mm [1]",
    regimentOptions: anyKruleboyz, canJoinRegimentAs: ["mob-wrangler"],
    keywords: ["Hero", "Infantry", "Destruction", "Kruleboyz"],
    rules: { hero: true, companion: true, canBeReinforced: false },
    weapons: [
      weapon("Boss-hacka", "Melee", 5, "4+", "3+", "1", "2", ["Crit (Mortal)"]),
      weapon("Stab-grot's Shiv", "Melee", 2, "4+", "5+", "0", "1", ["Crit (Mortal)", "Companion"]),
    ],
    abilities: [
      ability("Stab-grot", null, "The Stab-grot is a token. If removed, this unit loses its Shiv attacks and cannot Unleash the Stab-grot.", "Passive"),
      ability("Unleash the Stab-grot!", "Any Combat Phase", "Once per battle, either inflict D3 mortal damage on an enemy in combat or gain Ward (5+) for the turn, then remove the token.", "Once Per Battle"),
      ability("Keep 'Em in Line", "Reaction: All-out Attack", "If this unit is wholly within 12\" of the friendly Kruleboyz Infantry unit using the command, add 1 to its wound rolls for combat attacks.", "Reaction"),
    ],
  }),
  make({
    id: "breaka-boss-on-mirebrute-troggoth", name: "Breaka-boss on Mirebrute Troggoth", points: 180,
    move: '5"', health: 12, control: 2, save: "4+", baseSize: "80mm",
    regimentOptions: ["0-1 Mob Wrangler", "Any Kruleboyz"], canJoinRegimentAs: ["swamp-beast"],
    keywords: ["Hero", "Monster", "Destruction", "Kruleboyz"],
    rules: { hero: true, monster: true, companion: true, canBeReinforced: false },
    weapons: [
      weapon("Bident-goad", "Melee", 5, "4+", "3+", "1", "2", ["Crit (Mortal)"]),
      weapon("Mirebrute's Clubs", "Melee", 4, "4+", "2+", "2", "3", ["Companion"]),
    ],
    abilities: [
      ability("Breaka-harness", "Any Combat Phase", "Inflict D3 mortal damage on this unit. Add 2 Attacks to Mirebrute's Clubs for each damage point allocated this way for the turn.", "Ability"),
      ability("Tear Limb from Limb", "End of Any Turn", "Pick an enemy Infantry unit within 1\" and roll. If the roll exceeds its Health, slay 1 model.", "Once Per Turn (Army)", ["Rampage"]),
      ability("Regeneration", "Start of Any Turn", "Heal (D3) this unit.", "Ability"),
    ],
  }),
  make({
    id: "snatchaboss-on-sludgeraker-beast", name: "Snatchaboss on Sludgeraker Beast", points: 180,
    move: '8"', health: 14, control: 5, save: "4+", baseSize: "120 × 92mm",
    regimentOptions: ["0-1 Mob Wrangler", "Any Kruleboyz"], canJoinRegimentAs: ["swamp-beast"],
    keywords: ["Hero", "Monster", "Destruction", "Kruleboyz"],
    rules: { hero: true, monster: true, companion: true, canBeReinforced: false },
    weapons: [
      weapon("Grappling Hook", "Melee", 3, "3+", "3+", "1", "3", ["Crit (Mortal)"]),
      weapon("Sludgeraker's Talons", "Melee", 6, "4+", "2+", "1", "2", ["Companion"]),
      weapon("Sludgeraker's Bite", "Melee", 1, "3+", "2+", "2", "D3+3", ["Companion"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "While this unit has 10 or more damage points, Sludgeraker's Talons has 4 Attacks.", "Passive"),
      ability("Sludgeraker Venom", "Your Hero Phase", "Pick a friendly Kruleboyz unit wholly within 12\". It gains the Sludgeraker Venom keyword for the rest of the turn.", "Ability"),
      ability("Festering Wounds", "End of Any Turn", "Pick up to 3 enemies damaged by this unit or a Sludgeraker Venom unit. On a 2+, inflict D3 mortal damage and subtract 1 from their wound rolls until the end of the next turn.", "Once Per Turn (Army)", ["Rampage"]),
    ],
  }),
  make({
    id: "swampboss-skumdrekk", name: "Swampboss Skumdrekk", points: 150,
    move: '8"', health: 15, control: 5, save: "4+", baseSize: "120 × 92mm",
    regimentOptions: ["0-1 Mob Wrangler", "0-1 Swamp Beast", "Any Kruleboyz"],
    keywords: ["Unique", "Hero", "Monster", "Destruction", "Kruleboyz"],
    rules: { hero: true, unique: true, monster: true, companion: true, canBeReinforced: false },
    weapons: [
      weapon("Snatcha-stikk", "Melee", 5, "4+", "3+", "2", "2", ["Crit (Mortal)"]),
      weapon("Sloppklaw's Talons", "Melee", 6, "4+", "2+", "1", "2", ["Companion"]),
      weapon("Sloppklaw's Bite", "Melee", 1, "2+", "2+", "1", "D3+3", ["Companion"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "While this unit has 10 or more damage points, Sloppklaw's Talons has 4 Attacks.", "Passive"),
      ability("Bet-master", "Deployment Phase", "Pick an enemy as the bet. Add 1 to wound rolls for this unit and friendly Hobgrot Slittaz attacks against it.", "Ability"),
      ability("Kountin' Krew", "Deployment Phase", "Pick a friendly Hobgrot Slittaz unit in combat range. Its knives gain Crit (Mortal) while wholly within 12\" of this unit for the battle.", "Ability"),
      ability("Aggravate Wounds", "End of Any Turn", "Pick an enemy Monster in combat and roll dice equal to its allocated damage points. Each 5+ inflicts 1 mortal damage.", "Once Per Turn (Army)", ["Rampage"]),
    ],
  }),
  make({
    id: "hobgrot-slittaboss", name: "Hobgrot Slittaboss", points: 70,
    move: '5"', health: 5, control: 2, save: "6+", baseSize: "32mm",
    regimentOptions: ["Any Infantry", "0-1 Monster", "0-1 War Machine"], canJoinRegimentAs: ["mob-wrangler"],
    keywords: ["Hero", "Infantry", "Destruction", "Kruleboyz"],
    rules: { hero: true, canBeReinforced: false },
    weapons: [weapon("Toxin-smeared Slitta-sword", "Melee", 4, "4+", "4+", "1", "D3", ["Crit (Mortal)"])],
    abilities: [
      ability("Kompany Taktikz", "Reaction: You declared a Fight ability", "Pick friendly Hobgrot Slittaz in combat range that have not fought. They can fight next and gain +1 to wound rolls for the turn.", "Reaction"),
      ability("Toxic Stash", "Any Combat Phase", "Once per battle, roll 2D6 for an enemy Infantry Hero in combat. If the roll exceeds its Health, destroy it.", "Once Per Battle"),
    ],
  }),
  make({
    id: "murknob-with-belcha-banna", name: "Murknob with Belcha-banna", points: 80,
    move: '5"', health: 6, control: 5, save: "4+", baseSize: "40mm",
    regimentOptions: anyKruleboyz, canJoinRegimentAs: ["mob-wrangler"],
    keywords: ["Hero", "Infantry", "Destruction", "Kruleboyz"],
    rules: { hero: true, canBeReinforced: false },
    weapons: [weapon("Murknob Cleaver", "Melee", 4, "4+", "3+", "1", "2", ["Crit (Mortal)"])],
    abilities: [
      ability("Power of Kragnos", null, "Friendly Kruleboyz units have Ward (6+) while wholly within 12\".", "Passive"),
      ability("Breath of the Mire-drakes", "Any Combat Phase", "Roll for each enemy in combat: on 2-5 inflict 1 mortal damage, on 6 inflict D3.", "Ability"),
    ],
  }),
  make({
    id: "swampcalla-shaman-with-pot-grot", name: "Swampcalla Shaman with Pot-grot", points: 120,
    move: '5"', health: 6, control: 2, save: "6+", baseSize: "40mm [1], 25mm [1]",
    regimentOptions: anyKruleboyz,
    keywords: ["Hero", "Wizard (1)", "Infantry", "Destruction", "Kruleboyz"],
    rules: { hero: true, wizard: 1, canBeReinforced: false },
    weapons: [weapon("Bogbark Staff", "Melee", 3, "4+", "3+", "1", "D3", ["Crit (Mortal)"])],
    abilities: [
      ability("Foul Elixirs", "Your Hero Phase", "Pick friendly Kruleboyz Infantry wholly within 12\" and roll. On a 2+, add 1 to its saves for the turn; on a 1, inflict D3 mortal damage.", "Once Per Turn (Army)"),
      ability("Pot-grot", null, "The Pot-grot is a token. Add 1 to casting rolls while it remains; remove it after an unmodified casting roll of 4 or less.", "Passive"),
    ],
  }),
  make({
    id: "gutrippaz", name: "Gutrippaz", points: 150, models: 10,
    move: '5"', health: 2, control: 1, save: "5+", baseSize: "32mm",
    keywords: ["Infantry", "Champion", "Musician (1/10)", "Standard Bearer (1/10)", "Destruction", "Kruleboyz"],
    weapons: [weapon("Stikka or Hacka", "Melee", 2, "4+", "3+", "1", "1", ["Crit (Mortal)"])],
    abilities: [ability("Scare Taktikz", "Any Combat Phase", "On a 3+, subtract 1 from hit rolls for attacks by non-Hero units that target this unit for the rest of the turn.", "Ability")],
  }),
  make({
    id: "hobgrot-slittaz", name: "Hobgrot Slittaz", points: 70, models: 10,
    move: '5"', health: 1, control: 1, save: "6+", baseSize: "25mm",
    keywords: ["Infantry", "Champion", "Musician (1/10)", "Standard Bearer (1/10)", "Destruction", "Kruleboyz"],
    weapons: [
      weapon("Scrap-grenades", "Ranged", 1, "4+", "3+", "0", "1", ["Shoot in Combat"], '8"'),
      weapon("Slitta-knives", "Melee", 2, "4+", "5+", "0", "1"),
    ],
    abilities: [ability("Scrap-bang", "End of Any Turn", "Pick an enemy in combat. On a 3+, inflict 1 mortal damage and this unit can immediately Retreat without suffering mortal damage.", "Ability")],
  }),
  make({
    id: "kruleboyz-monsta-killaz", name: "Kruleboyz Monsta-killaz", points: 120, models: 7,
    move: '5"', health: 2, control: 1, save: "5+", baseSize: "40mm [1], 32mm [6], 28.5mm [1]",
    notes: "La peana de 28.5mm corresponde al token Klutcha-grot. Esta unidad no se puede reforzar.",
    keywords: ["Infantry", "Champion (1/7)", "Musician (1/7)", "Destruction", "Kruleboyz"],
    rules: { canBeReinforced: false },
    weapons: [weapon("Monsta-killa Weapons", "Melee", 3, "4+", "3+", "1", "2", ["Anti-Monster (+1 Rend)", "Crit (Mortal)"])],
    abilities: [
      ability("Klutcha-grot", null, "The Klutcha-grot is a token. If removed, this unit cannot use A Tough Grot to Swallow.", "Passive"),
      ability("Bait and Trap", "Any Combat Phase", "Pick an enemy Monster in combat, adding 1 to the roll if damaged. On a 3+, it has Strike-last for the turn.", "Ability"),
      ability("A Tough Grot to Swallow", "Reaction: Enemy Rampage", "For an enemy Monster within 6\", on a 2+ its Rampage has no effect; on a 1 remove the Klutcha-grot.", "Once Per Turn"),
    ],
  }),
  make({
    id: "man-skewer-boltboyz", name: "Man-skewer Boltboyz", points: 100, models: 3,
    move: '5"', health: 2, control: 1, save: "5+", baseSize: "32mm",
    keywords: ["Infantry", "Champion", "Destruction", "Kruleboyz"],
    weapons: [
      weapon("Man-skewer Crossbow: Hasty Shot", "Ranged", 2, "3+", "4+", "1", "2", ["Crit (Auto-wound)"], '12"'),
      weapon("Man-skewer Crossbow: Aimed Shot", "Ranged", 1, "3+", "3+", "2", "2", ["Crit (Auto-wound)"], '18"'),
      weapon("Jaggedy Blades", "Melee", 2, "4+", "3+", "0", "1", ["Crit (Mortal)"]),
    ],
    abilities: [
      ability("Man-skewer Crossbows", null, "Each time this unit shoots, use either Hasty Shot or Aimed Shot for all its crossbow attacks.", "Passive"),
      ability("Pick 'Em Off", "Your Shooting Phase", "If this unit has not moved or been set up this turn, add 1 to hit rolls for its shooting attacks.", "Ability"),
    ],
  }),
  make({
    id: "beast-skewer-killbow", name: "Beast-skewer Killbow", points: 130,
    move: '3"', health: 5, control: 2, save: "5+", baseSize: "90 × 52mm",
    keywords: ["War Machine", "Destruction", "Kruleboyz"],
    rules: { canBeReinforced: false },
    weapons: [
      weapon("Beast-skewer Bolts", "Ranged", 2, "4+", "2+", "2", "2D6", ["Anti-Monster (+1 Rend)", "Crit (Auto-wound)"], '24"'),
      weapon("Jaggedy Blades", "Melee", 3, "4+", "3+", "0", "1", ["Crit (Mortal)"]),
    ],
    abilities: [
      ability("Skewering Bolts", "Your Shooting Phase", "Once per turn, Beast-skewer Bolts have Damage 6 against a Monster.", "Once Per Turn (Army)"),
      ability("Pick 'Em Off", "Your Shooting Phase", "If this unit has not moved or been set up this turn, add 1 to hit rolls for its shooting attacks.", "Ability"),
    ],
  }),
  make({
    id: "marshcrawla-sloggoth", name: "Marshcrawla Sloggoth", points: 130,
    move: '7"', health: 10, control: 2, save: "4+", baseSize: "105 × 70mm",
    keywords: ["War Machine", "Destruction", "Kruleboyz"],
    rules: { companion: true, canBeReinforced: false },
    weapons: [
      weapon("Nets and Snatcha-stikks", "Melee", 4, "4+", "5+", "0", "1"),
      weapon("Sloggoth's Claws", "Melee", 6, "4+", "2+", "1", "2", ["Companion"]),
    ],
    abilities: [
      ability("On Da March", null, "Friendly Kruleboyz Infantry wholly within 12\" can use Charge abilities even if they used Run in the same turn.", "Passive"),
      ability("Regeneration", "Start of Any Turn", "Heal (D3) this unit.", "Ability"),
    ],
  }),
];

export default units;
