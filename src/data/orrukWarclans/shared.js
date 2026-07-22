import { ability, createOrrukUnit, weapon } from "./unitFactory";

export const kragnos = createOrrukUnit({
  faction: "orruk-warclans",
  id: "kragnos-the-end-of-empires",
  name: "Kragnos, the End of Empires",
  points: 580,
  move: '10"',
  health: 18,
  control: 15,
  save: "4+",
  ward: "5+",
  baseSize: "130mm",
  regimentOptions: ["0-1 Headstompa", "0-1 Tusk Wrangler", "Any Ironjawz", "0-1 Mob Wrangler", "0-1 Swamp Beast", "Any Kruleboyz"],
  keywords: ["Warmaster", "Unique", "Hero", "Monster", "Ward (5+)", "Destruction", "Ironjawz", "Kruleboyz"],
  rules: { hero: true, unique: true, monster: true, ward: "5+", warmaster: true, canBeReinforced: false },
  weapons: [
    weapon("The Dread Mace", "Melee", 6, "3+", "2+", "3", "4", ["Crit (2 Hits)"]),
    weapon("Tuskbreaker", "Melee", 2, "3+", "2+", "2", "D3"),
    weapon("Hooves of Wrack and Ruin", "Melee", 6, "4+", "2+", "1", "2", ["Companion"]),
  ],
  abilities: [
    ability("Battle Damaged", null, "While this unit has 10 or more damage points, The Dread Mace has 4 Attacks and this unit has a Control characteristic of 10.", "Passive"),
    ability("Rampaging Destruction", "Any Charge Phase", "If this unit charged, either roll for mortal damage against every enemy within 1\", or pick an enemy Monster and roll 2D6; unless the roll is 7, multiply the two dice and inflict that much mortal damage.", "Once Per Turn (Army)", ["Rampage"]),
    ability("The End of Empires", "Your Charge Phase", "Add 1 to the number of dice rolled for charge rolls made by friendly Destruction units wholly within 12\", to a maximum of 3.", "Ability"),
    ability("Avatar of Destruction", null, "If this unit would be automatically destroyed, allocate 6 damage points to it instead; ward rolls cannot be made for those damage points.", "Passive"),
    ability("The Shield Inviolate", "Opponent declared a Spell ability", "If this unit was picked as the target, roll a dice. On a 3+, ignore the spell's effect on this unit. This can be used once for each Spell ability.", "Reaction"),
  ],
});

export const manifestations = [
  {
    id: "foot-of-gork",
    name: "Foot of Gork",
    image: "/images/manifestations/orruk-warclans/foot-of-gork.webp",
    castingValue: 7,
    phase: "Your Hero Phase",
    profile: { move: "-", health: 8, save: "4+", banishment: "7+", ward: "6+" },
    abilities: [
      ability("Multiple Parts", null, "When this manifestation is destroyed, remove both of its parts from play.", "Passive"),
      ability("Wandering Destruction", "Your Movement Phase", "Move one part wholly within 9\" of the other. Roll a D3 for each enemy within 3\"; on a 2+, inflict mortal damage equal to the roll and reduce that unit's charge dice by 1 until your next turn.", "Once Per Turn"),
    ],
    details: { models: 2, baseSize: null },
    keywords: ["Manifestation", "Endless Spell", "Ward (6+)", "Destruction", "Ironjawz", "Kruleboyz"],
  },
  {
    id: "gork-roara",
    name: "Gork-Roara",
    image: "/images/manifestations/orruk-warclans/gork-roara.webp",
    castingValue: 5,
    phase: "Your Hero Phase",
    profile: { move: '6"', health: 6, save: "5+", banishment: "7+", ward: "6+" },
    weapons: [weapon("Toxic Gas", "Melee", 5, "2+", "4+", "1", "D3")],
    abilities: [
      ability("Bellowing Waaagh!-Cries", "Your Hero Phase", "Pick an Ironjawz or Kruleboyz Wizard or Priest within 3\". Add either 1 or 2 to its casting or chanting rolls until your next turn, then roll that many dice: each 1-2 damages it and each 5+ grants nearby Orruks +1 to charge rolls.", "Ability"),
    ],
    details: { models: 1, baseSize: null },
    keywords: ["Manifestation", "Endless Spell", "Ward (6+)", "Destruction", "Ironjawz", "Kruleboyz"],
  },
  {
    id: "morkspit-marsh",
    name: "Morkspit Marsh",
    image: "/images/manifestations/orruk-warclans/morkspit-marsh.webp",
    castingValue: 5,
    phase: "Your Hero Phase",
    profile: { move: "-", health: 8, save: "5+", banishment: "7+", ward: "6+" },
    abilities: [
      ability("Tricksy Footing", null, "Subtract 3 from the control scores of enemy units while they are within 6\" of this manifestation.", "Passive"),
      ability("Grasping Gunge", null, "Enemy units cannot use Run abilities while they are within 6\" of this manifestation.", "Passive"),
    ],
    details: { models: 1, baseSize: null },
    keywords: ["Manifestation", "Endless Spell", "Ward (6+)", "Destruction", "Ironjawz", "Kruleboyz"],
  },
];

export const manifestationLores = [
  {
    id: "manifestations-of-gorkamorka",
    name: "Manifestations of Gorkamorka",
    description: "Manifestaciones compartidas por Ironjawz y Kruleboyz.",
    manifestations,
  },
];
