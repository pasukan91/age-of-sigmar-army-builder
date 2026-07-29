import { ability, createUnit, weapon } from "./unitFactory";

const make = (config) => {
  const item = createUnit({ points: 0, models: 1, control: "-", ...config });
  return {
    ...item,
    castingValue: config.castingValue,
    profile: { ...item.profile, banishment: "7+" },
    summonSpell: {
      name: `Summon ${config.name}`,
      type: "Spell",
      phase: "Your Hero Phase",
      keywords: ["Spell", "Summon"],
      description: config.summonDescription,
    },
  };
};

const manifestations = [
  make({
    id: "burning-sigil-of-tzeentch", name: "Burning Sigil of Tzeentch", imageAlias: "Burning_Sigil_of_Tzeentch_M02",
    castingValue: 6, move: "-", health: 6, save: "4+", ward: "6+",
    keywords: ["Manifestation", "Endless Spell", "Ward (6+)"], rules: { ward: "6+", canBeReinforced: false },
    summonDescription: "Set up a Burning Sigil wholly within 18\" of the caster and visible to them.",
    abilities: [ability("Radiant Transmogrification", "Any Hero Phase", "Roll 2 dice for each unit within 9\" and choose either result: 2-3 heals or damages D3; 4 changes run/charge access; 5 modifies hit rolls; 6 modifies wound rolls.")],
  }),
  make({
    id: "tome-of-eyes", name: "Tome of Eyes", imageAlias: "Tome_of_Eyes_M02",
    castingValue: 5, move: '4"', health: 5, save: "6+", ward: "6+",
    keywords: ["Manifestation", "Endless Spell", "Ward (6+)"], rules: { ward: "6+", canBeReinforced: false },
    summonDescription: "Set up a Tome of Eyes wholly within 18\" of the caster, visible to them and more than 9\" from all enemy units.",
    weapons: [weapon("Incinerating Gaze", "Melee", "2D6", "4+", "4+", "0", "1")],
    abilities: [ability("Compendium of Dark Knowledge", "Your Hero Phase", "A visible friendly Wizard within 3\" can immediately use a spell from the Lore of Change or Lore of Fate without it counting toward its spell limit.")],
  }),
  make({
    id: "daemonic-simulacrum", name: "Daemonic Simulacrum", imageAlias: "Daemonic_Simulacrum_M02",
    castingValue: 7, move: '10"', health: 7, save: "5+", ward: "6+",
    keywords: ["Manifestation", "Endless Spell", "Fly", "Ward (6+)"], rules: { ward: "6+", canBeReinforced: false },
    summonDescription: "Set up a Daemonic Simulacrum wholly within 12\" of the caster, visible to them and more than 9\" from enemies.",
    weapons: [weapon("Snapping Jaws", "Melee", "2D6", "4+", "3+", "1", "1", ["Anti-Wizard (+1 Rend)", "Crit (Mortal)"])],
    abilities: [ability("Jaws of Fate", null, "Add 2 to the Attacks of Snapping Jaws for each fate point you have.", "Passive")],
  }),
];

export default manifestations;
