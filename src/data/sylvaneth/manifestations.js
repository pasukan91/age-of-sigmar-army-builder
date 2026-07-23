import { ability, createOrrukUnit, weapon } from "../orrukWarclans/unitFactory";

const make = (config) => createOrrukUnit({ faction: "sylvaneth", points: 0, ...config });

const manifestations = [
  make({
    id: "gladewyrm", name: "Gladewyrm", move: '8"', health: 7, control: "-", save: "4+", ward: "6+", baseSize: "100mm",
    keywords: ["Manifestation", "Ward (6+)", "Order", "Sylvaneth"],
    rules: { ward: "6+", canBeReinforced: false },
    weapons: [weapon("Fanged Maw", "Melee", 6, "4+", "2+", "1", "D3", ["Anti-Priest (+1 Rend)", "Anti-Wizard (+1 Rend)"])],
    abilities: [
      ability("Arcane Predator", null, "Subtract 1 from casting, unbinding, chanting and banishment rolls for enemy units in combat with this manifestation.", "Passive"),
      ability("Burrow Through the Realmroots", "Your Movement Phase", "If this manifestation is not in combat, remove it and set it up more than 9\" from enemy non-Wizards and non-Priests and more than 3\" from enemy Wizards and Priests.", "Ability"),
    ],
    notes: "Banishment: 7+.",
  }),
  make({
    id: "vengeful-skullroot", name: "Vengeful Skullroot", imageAlias: "skullroot", move: '8"', health: 8, control: "-", save: "4+", ward: "6+", baseSize: "105 × 70mm",
    keywords: ["Manifestation", "Fly", "Ward (6+)", "Order", "Sylvaneth"],
    rules: { ward: "6+", canBeReinforced: false },
    weapons: [weapon("Grasping Roots", "Melee", 3, "4+", "2+", "1", "D3")],
    abilities: [ability("Horrifying Aspect", null, "Subtract 1 from hit rolls for attacks made by enemy units while they are within 6\" of this manifestation.", "Passive")],
    notes: "Banishment: 7+.",
  }),
  make({
    id: "spiteswarm-hive", name: "Spiteswarm Hive", imageAlias: "spiteswarm", move: "-", health: 6, control: "-", save: "6+", ward: "6+", baseSize: "60mm",
    keywords: ["Manifestation", "Ward (6+)", "Order", "Sylvaneth"],
    rules: { ward: "6+", canBeReinforced: false },
    weapons: [
      weapon("Swarming Spites", "Ranged", 5, "3+", "4+", "1", "1", ["Crit (2 Hits)"], '18"'),
      weapon("Stinging Spites", "Melee", 10, "4+", "3+", "1", "1", ["Crit (2 Hits)"]),
    ],
    abilities: [ability("Enraged Swarm", null, "If this manifestation was not set up this turn, add 10 to Swarming Spites' Attacks, but all of those attacks must target an enemy within 9\".", "Passive")],
    notes: "Banishment: 7+.",
  }),
];

export default manifestations;
