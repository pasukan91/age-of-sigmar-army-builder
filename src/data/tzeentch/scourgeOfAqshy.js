import { ability, createUnit, weapon } from "./unitFactory";

const legalNote = "Warscroll de temporada de Scourge of Aqshy. Legal con el battlepack General's Handbook 2026-27.";

const scourgeUnits = [
  createUnit({
    id: "screamers-scourge-of-aqshy", name: "Scourge of Aqshy Screamers of Tzeentch", points: 110, models: 3,
    imageAlias: "screamers", move: '14"', health: 3, control: 1, save: "5+", ward: "6+", baseSize: "32mm",
    keywords: ["Beast", "Fly", "Ward (6+)", "Daemon"], rules: { ward: "6+" }, notes: legalNote,
    weapons: [weapon("Lamprey Bite", "Melee", 3, "4+", "4+", "1", "1", ["Charge (+1 Damage)", "Companion"])],
    abilities: [
      ability("Beast", null, "This unit has a maximum control score of 1.", "Passive"),
      ability("Imperilling Slashes", "Any Charge Phase", "If this unit charged, pick an enemy in combat and subtract 1 from its save rolls for the rest of the turn.", "Once Per Turn (Army)"),
    ],
  }),
  createUnit({
    id: "ogroid-thaumaturge-scourge-of-aqshy", name: "Scourge of Aqshy Ogroid Thaumaturge", points: 140,
    imageAlias: "ogroid_thaumaturge", move: '6"', health: 8, control: 2, save: "5+", ward: "6+", baseSize: "50mm",
    regimentOptions: ["any-arcanite"], canJoinRegimentAs: ["arcanite-cabalist"],
    keywords: ["Hero", "Wizard (1)", "Infantry", "Ward (6+)", "Arcanite"],
    rules: { hero: true, wizard: 1, ward: "6+", canBeReinforced: false }, notes: legalNote,
    weapons: [weapon("Thaumaturge Staff", "Ranged", 3, "3+", "4+", "0", "D3", ["Shoot in Combat"], '12"'), weapon("Great Horns and Cloven Hooves", "Melee", 6, "4+", "2+", "1", "2", ["Charge (+1 Damage)"])],
    abilities: [
      ability("Soul-deep Devotion", null, "While within a friendly non-Hero Arcanite unit's combat range, this unit has Ward (4+); successful wards pass damage to that unit after this damage sequence.", "Passive"),
      ability("Wrath of the Thaumaturge", "Any Charge Phase", "If not in combat, pick a friendly Arcanite unit in combat. Set this unit within 1\" of that target and in combat; it has charged.", "Once Per Turn (Army)", ["Core", "Charge"]),
    ],
  }),
];

export default scourgeUnits;
