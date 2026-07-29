import units from "./units";
import { ability } from "./unitFactory";

const legalNote =
  "Warscroll de temporada de Scourge of Aqshy. Legal con el battlepack General's Handbook 2026-27.";

function alternateUnit(baseId, overrides) {
  const base = units.find((unit) => unit.id === baseId);

  return {
    ...base,
    ...overrides,
    image: base.image,
    imageAlias: base.imageAlias ?? base.id,
    profile: {
      ...base.profile,
      ...overrides.profile,
    },
    details: {
      ...base.details,
      ...overrides.details,
      notes: legalNote,
    },
    rules: {
      ...base.rules,
      ...overrides.rules,
    },
  };
}

const scourgeUnits = [
  alternateUnit("vokmortian", {
    id: "vokmortian-scourge-of-aqshy",
    name: "Scourge of Aqshy Vokmortian, Master of the Bone-tithe",
    source: "Aqshy",
    points: 180,
    abilities: [
      ability("Master of the Bone-tithe", "Your Hero Phase", "Your opponent chooses: Pay the Tithe, inflicting D6 mortal damage on one of their non-Manifestation, non-terrain units and preventing healing, returned models or replacement until your next turn; or Deny the Ossiarchs their Rightful Due, letting you gain 4 relentless discipline points, add 5 control near an objective you do not control, or give Gaze of Death +2 Attacks and +6\" Range for the turn."),
      ability("Cowed into Inaction", "Your Hero Phase", "Spell (7): pick an enemy Hero within 18\". Until your next turn, commands used by enemies in its combat range have no effect unless your opponent spends 1 rage die; they still count as used and command points are lost.", "Spell", ["Spell"]),
    ],
  }),
  alternateUnit("mortis-reapers", {
    id: "mortis-reapers-scourge-of-aqshy",
    name: "Scourge of Aqshy Mortis Reapers",
    source: "Aqshy",
    points: 90,
    abilities: [
      ability("Terminate Their Command", "Any Charge Phase", "If this unit is in combat, pick a visible enemy Hero within 12\". If it is more than 3\" from all other enemies, or on a 3+ otherwise, reposition this unit within 1\" of the target.", "Once Per Turn (Army)"),
      ability("The Coldness of Death", "End of Any Turn", "If an enemy Hero was destroyed by this unit's combat attacks this turn, your opponent reduces their fury level to 0.", "Once Per Turn (Army)"),
    ],
  }),
];

export default scourgeUnits;
