import { ability, createUnit, weapon } from "./unitFactory";

const scourgeUnits = [
  createUnit({
    id: "scourge-revenant-draconith",
    name: "Scourge of Aqshy Revenant Draconith",
    imageAlias: "revenant_draconith",
    source: "Scourge of Aqshy",
    points: 290,
    baseSize: "160mm",
    move: '12"', health: 16, control: 5, save: "5+",
    keywords: ["Monster", "Fly", "Ward (6+)"],
    rules: { monster: true, canBeReinforced: false },
    weapons: [
      weapon("Pestilential Miasma", "Ranged", 5, "3+", "3+", "1", "2", ["Shoot in Combat", "Companion"], '10"'),
      weapon("Colossal Maw", "Melee", 3, "4+", "2+", "2", "3", ["Companion"]),
      weapon("Tearing Claws", "Melee", 7, "4+", "2+", "1", "2", ["Companion"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "While this unit has 10 or more damage points, Tearing Claws has 5 Attacks.", "Passive"),
      ability("Brimming with Rancour", "Enemy Hero Phase", "Once per turn (Army). Pick a visible enemy. It cannot end a non-Charge Move within X\" of this unit, where X is your current fury.", "Once Per Turn (Army)"),
      ability("Volatile Animus", "Any Combat Phase", "Once per turn (Army). Spend a rage die and increase the opponent's fury by 1 if lower. Choose Retaliatory Posture (+1 save; enemy hit/wound modifiers ignored against this unit; +1 hit against enemies that fought) or Unrelenting Ferocity (ignore negative hit/wound modifiers; +1 Rend and Damage for Companion weapons against enemies that have not fought).", "Once Per Turn (Army)"),
    ],
  }),
  createUnit({
    id: "scourge-vengorian-lord",
    name: "Scourge of Aqshy Vengorian Lord",
    imageAlias: "vengorian-lord",
    source: "Scourge of Aqshy",
    points: 310,
    baseSize: "80mm",
    move: '10"', health: 11, control: 5, save: "4+",
    regimentOptions: ["0-1-deathrattle-overseer", "any-soulblight"],
    keywords: ["Hero", "Monster", "Wizard (1)", "Fly", "Ward (6+)", "Vampire"],
    rules: { hero: true, monster: true, wizard: 1, canBeReinforced: false },
    weapons: [
      weapon("Nightmare Sabre", "Melee", 4, "3+", "3+", "1", "2"),
      weapon("Gore-drenched Talons", "Melee", 3, "3+", "2+", "3", "3"),
    ],
    abilities: [
      ability("Nightmare's Miasma", null, "Subtract 1 from Rend for melee weapons used by enemy units in combat with this unit.", "Passive"),
      ability("Indignant Outburst", "Any Combat Phase", "Once per turn, if this unit is in combat, gain 1 rage die.", "Once Per Turn"),
      ability("Frenzied Surge", "Any Combat Phase", "Once per turn, optionally pick a friendly non-Hero Soulblight Gravelords Infantry or Monster within 12\". This unit and the target can each move X+D3\", where X is your fury, passing through enemies; both must end in combat with the same enemy.", "Once Per Turn"),
    ],
  }),
];

export default scourgeUnits;
