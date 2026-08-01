import { ability, createOrrukUnit, weapon } from "../orrukWarclans/unitFactory";

const make = (config) => {
  const manifestation = createOrrukUnit({
    faction: "daughters",
    points: 0,
    ward: "6+",
    rules: { ward: "6+", canBeReinforced: false },
    ...config,
  });

  return {
    ...manifestation,
    castingValue: config.castingValue ?? 6,
    profile: { ...manifestation.profile, banishment: config.banishment ?? "7+" },
    summonSpell: {
      name: `Summon ${config.name}`,
      type: "Spell",
      phase: "Your Hero Phase",
      castingValue: config.castingValue ?? 6,
      keywords: ["Spell", "Summon"],
      description: config.summonDescription,
    },
  };
};

const manifestations = [
  make({
    id: "bloodwrack-viper", name: "Bloodwrack Viper", image: "/images/units/dok/bloodwrack-viper.jpg", move: '9"', health: 10, control: "-", save: "4+", baseSize: "100mm",
    keywords: ["Manifestation", "Endless Spell", "Ward (6+)", "Order", "Daughters of Khaine"],
    summonDescription: "Declare: If there is no friendly Bloodwrack Viper, pick a friendly Daughters of Khaine Wizard to cast this spell, then make a casting roll of 2D6.\n\nEffect: Set up a Bloodwrack Viper wholly within 12\" of the caster, visible to them and more than 9\" from enemies.",
    weapons: [weapon("Fanged Strikes", "Melee", 4, "4+", "2+", "1", "3", ["Anti-Hero (+1 Rend)", "Crit (Mortal)"])],
    abilities: [
      ability("Crushing Coils", "Any Combat Phase", "Pick an enemy Hero or Monster in combat. On a 3+, it has Strike-last for the rest of the turn.", "Ability"),
      ability("Bind and Bite", null, "This unit's combat attacks score critical hits on unmodified hit rolls of 4+ if the target has Strike-last.", "Passive"),
    ],
  }),
  make({
    id: "bladewind", name: "Bladewind", image: "/images/units/dok/bladewind.jpg", move: '12"', health: 7, control: "-", save: "5+", baseSize: "100mm",
    keywords: ["Manifestation", "Endless Spell", "Fly", "Ward (6+)", "Order", "Daughters of Khaine"],
    summonDescription: "Declare: If there is no friendly Bladewind, pick a friendly Daughters of Khaine Wizard to cast this spell, then make a casting roll of 2D6.\n\nEffect: Set up a Bladewind wholly within 12\" of the caster, visible to them and more than 9\" from enemies.",
    weapons: [weapon("Bladed Vortex", "Melee", 9, "3+", "3+", "1", "1")],
    abilities: [ability("Unnatural Edge", "Any Combat Phase", "If this manifestation charged, pick an enemy in combat. If this manifestation allocates damage to it this phase, ward rolls cannot be made for that enemy for the rest of the battle.", "Ability")],
  }),
  make({
    id: "heart-of-fury", name: "Heart of Fury", image: "/images/units/dok/heart-fury.jpg", move: "-", health: 7, control: "-", save: "4+", baseSize: "50mm",
    keywords: ["Manifestation", "Endless Spell", "Ward (6+)", "Order", "Daughters of Khaine"],
    summonDescription: "Declare: If there is no friendly Heart of Fury, pick a friendly Daughters of Khaine Wizard to cast this spell, then make a casting roll of 2D6.\n\nEffect: Set up a Heart of Fury wholly within 18\" of the caster and visible to them.",
    abilities: [ability("Locus of the Murder God", null, "Subtract 1 from wound rolls for attacks that target friendly Daughters of Khaine Infantry units wholly within 12\" of this manifestation.", "Passive")],
  }),
  make({
    id: "avatar-of-khaine", name: "Avatar of Khaine", image: "/images/factions/dok.webp", move: '6"', health: 7, control: "-", save: "3+", baseSize: "40mm", castingValue: 6,
    keywords: ["Manifestation", "Endless Spell", "Ward (6+)", "Order", "Daughters of Khaine"],
    summonDescription: "Declare: If there are fewer friendly Avatars of Khaine than friendly Bloodwrack Shrines, pick a friendly Bloodwrack Shrine to cast this spell, then make a casting roll of 2D6.\n\nEffect: Set up an Avatar of Khaine wholly within 12\" of the caster, visible to them and more than 9\" from enemies.",
    weapons: [weapon("Blade of the Bloody-Handed God", "Melee", 3, "3+", "3+", "2", "3")],
    abilities: [
      ability("Lord of Murder Incarnate", null, "This manifestation is affected by Blessings of Khaine as if it were a unit.", "Passive"),
      ability("Wrath of Khaine", null, "Add X to the Attacks of this manifestation's melee weapons, where X is the number of times you used Blessings of Khaine this battle, to a maximum of 3.", "Passive"),
    ],
  }),
];

export default manifestations;
