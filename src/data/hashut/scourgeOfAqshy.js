import { ability, createUnit, weapon } from "./unitFactory";

const resilience = ability("Daemonic Resilience", "Passive", "With 1 DPP, this unit has Ward (6+). With 2 DPP, it has Ward (5+). With 3 DPP, it has Ward (4+) against damage inflicted by spells, prayers and manifestation abilities, and Ward (5+) against all other damage.");

export default [
  createUnit({
    id: "scourge-daemonsmith-infernal-taurus",
    name: "Scourge of Aqshy Daemonsmith on Infernal Taurus",
    points: 350,
    source: "Scourge of Aqshy",
    move: '10"',
    health: 15,
    control: 5,
    save: "3+",
    baseSize: "130mm",
    imageAlias: "daemonsmith_infernal_taurus",
    keywords: ["Hero", "Monster", "War Machine", "Wizard (1)", "Fly", "Duardin"],
    regimentOptions: ["0-1 Hashutite Commander", "Any Helsmiths of Hashut"],
    weapons: [
      weapon("Hurled Daemonfire", "Ranged", 3, "4+", "4+", 1, "D3", ["Crit (2 Hits)", "Shoot in Combat"], '18"'),
      weapon("Daemonsmith's Staff", "Melee", 3, "4+", "3+", 1, "D3"),
      weapon("Horns and Hooves", "Melee", 6, "4+", "2+", 2, 3, ["Charge (+1 Damage)", "Companion"]),
    ],
    abilities: [
      resilience,
      ability("Battle Damaged", "Passive", "While this unit has 10 or more damage points, Horns and Hooves has an Attacks characteristic of 4."),
      ability("Leech Realm-magic", "Your Hero Phase", "Add 1 to this unit's casting and unbinding rolls until your next turn. You can remove a friendly desolation token from an objective or terrain feature contested by this unit to permanently increase its power level by 1.", "Once Per Turn (Army)"),
      ability("Calamitous Shockwave", "Any Combat Phase", "Pick up to 3 enemy units in combat with this unit and roll a dice for each. If the roll is lower than this unit's fury level, that enemy cannot use Eruption of Fury or spend rage dice on Fight Through the Pain, and attacks that target it have +1 Rend for the rest of the turn.", "Once Per Turn (Army), Rampage"),
    ],
    rules: { hero: true, monster: true, wizard: 1, canBeReinforced: false },
  }),
  createUnit({
    id: "scourge-anointed-sentinels",
    name: "Scourge of Aqshy Anointed Sentinels",
    points: 170,
    models: 3,
    source: "Scourge of Aqshy",
    move: '10"',
    health: 4,
    save: "4+",
    baseSize: "75×42mm",
    imageAlias: "annointed_sentinels",
    keywords: ["Cavalry", "Champion", "Duardin"],
    weapons: [weapon("Glaive", "Melee", 3, "3+", "3+", 1, 2, ["Anti-Cavalry (+1 Rend)", "Charge (+1 Damage)"])],
    abilities: [
      resilience,
      ability("Zealous Acolytes", "Passive", "Add 1 to the Attacks characteristic of this unit's melee weapons while it contests an objective you do not control. Add 10 to its Control characteristic while it contests an objective you control."),
    ],
  }),
];
