import units from "./units";
import { ability, weapon } from "../orrukWarclans/unitFactory";

const legalNote =
  "Legal for matched play with the General's Handbook 2026-27 battlepack.";

function alternate(baseId, overrides) {
  const base = units.find((unit) => unit.id === baseId);

  return {
    ...base,
    ...overrides,
    profile: { ...base.profile, ...overrides.profile },
    details: { ...base.details, ...overrides.details },
  };
}

const scourgeUnits = [
  alternate("alarith-stonemage", {
    id: "alarith-stonemage-scourge-of-aqshy",
    name: "Scourge of Aqshy Alarith Stonemage",
    points: 150,
    weapons: [
      weapon("Staff of the High Peaks", "Melee", 3, "3+", "4+", "1", "D3"),
    ],
    abilities: [
      ability("Elemental Endurance", null, "If this unit is targeted by Depict Rune, until the end of the battle round, friendly Lumineth Realm-lords units wholly within 12\" remove 1 damage point on a 2+ instead of a 3+ when spending rage dice for Fight Through the Pain.", "Passive"),
      ability("Earth's Grip", "Your Hero Phase", "Pick a visible enemy with no more than 1 model within 18\" and make a casting roll. For the rest of the battle it is gripped until this unit is destroyed, it breaks free, or another target is picked. Each time it Moves, the opponent rolls; on a 7+ it breaks free, otherwise that Move has no effect.", "Spell", ["Spell"], 7),
    ],
    details: { notes: legalNote },
  }),
  alternate("scinari-loreseeker", {
    id: "scinari-loreseeker-scourge-of-aqshy",
    name: "Scourge of Aqshy Scinari Loreseeker",
    points: 160,
    weapons: [
      weapon("Eclipsian Staff", "Ranged", 3, "3+", "3+", "1", "D3", ["Shoot in Combat"], '12"'),
      weapon("Loreseeker Blade", "Melee", 5, "3+", "4+", "1", "2", ["Crit (Mortal)"]),
    ],
    abilities: [
      ability("Arcane Nullification", "Your Hero Phase", "Pick a visible enemy Hero within 12\". If this unit is in combat with it, apply the relevant effect until your next turn; otherwise on a 3+: if it has an artefact, that artefact has no effect; otherwise its combat weapon abilities other than Companion have no effect.", "Once Per Turn (Army)"),
      ability("Leashed Fury", "End of Any Turn", "If your opponent's fury is lower, increase it by 1 (maximum 7). For the rest of the turn, when using Eruption of Fury, each rage die spent counts as 3 and this unit can use it even if already used this turn.", "Once Per Turn (Army)"),
    ],
    details: { notes: legalNote },
  }),
];

export default scourgeUnits;

