import { ability, createUnit, weapon } from "./unitFactory";

export default [
  createUnit({
    id: "scourge-chaos-lord-on-karkadrak",
    name: "Scourge of Aqshy Chaos Lord on Karkadrak",
    source: "Scourge of Aqshy",
    points: 230,
    move: '9"',
    health: 10,
    control: 2,
    save: "3+",
    baseSize: "90×52mm",
    imageAlias: "chaos_lord_karkadrak",
    keywords: ["Hero", "Cavalry", "Warriors of Chaos"],
    regimentOptions: ["0-1 Ruinous Champion", "Any Slaves to Darkness"],
    canJoinRegimentAs: ["ruinous-champion"],
    weapons: [
      weapon("Hexed Weapons", "Melee", 5, "3+", "3+", 1, 2, ["Charge (+1 Damage)", "Crit (Mortal)"]),
      weapon("Karkadrak's Claws and Horn", "Melee", 4, "4+", "3+", 1, 2, ["Companion"]),
    ],
    abilities: [
      ability("Ferocious Influence", "Any Combat Phase", "If this unit charged this turn, pick an enemy unit in combat with it. Add 1 to the Damage characteristic of this unit's Companion weapons against that enemy, and add 1 to hit rolls for Companion weapons used by friendly Slaves to Darkness Cavalry and War Machines wholly within 12\".", "Once Per Turn (Army)"),
      ability("Wrathful Abandon", "End of Any Turn", "If this unit charged this turn, this unit and 1 friendly non-Hero Warriors of Chaos unit that charged and is wholly within 12\" can each move a number of inches equal to your rage level. They must remain in any combats they were already in and cannot enter new combats.", "Once Per Turn (Army)"),
    ],
    rules: { hero: true, canBeReinforced: false },
  }),
  createUnit({
    id: "scourge-chaos-warriors",
    name: "Scourge of Aqshy Chaos Warriors",
    source: "Scourge of Aqshy",
    points: 200,
    models: 10,
    move: '5"',
    health: 2,
    control: 1,
    save: "3+",
    baseSize: "32mm",
    imageAlias: "chaos_warriors",
    keywords: ["Infantry", "Champion", "Musician (1/10)", "Standard Bearer (1/10)", "Warriors of Chaos"],
    weapons: [weapon("Rune-etched Weapons", "Melee", 2, "3+", "3+", 1, 1, ["Crit (Auto-wound)"])],
    abilities: [
      ability("For the Glory of the Dark Gods", "Your Hero Phase", "Until the start of your next turn, apply the following cumulative effects based on your rage level: 1+, Ward (6+); 4+, this unit's combat weapons have Anti-charge (+1 Rend); 7, this unit has Strike-first while it has not charged.", "Once Per Turn (Army)"),
    ],
  }),
];
