import units from "./units";
import { ability, weapon } from "../orrukWarclans/unitFactory";

function alternate(baseId, overrides) {
  const base = units.find((unit) => unit.id === baseId);
  return {
    ...base,
    ...overrides,
    image: `/images/units/ironjawz/${baseId}.webp`,
    imageAlias: baseId,
    profile: { ...base.profile, ...overrides.profile },
    details: { ...base.details, ...overrides.details },
  };
}

const scourgeUnits = [
  alternate("megaboss", {
    id: "megaboss-scourge-of-aqshy",
    name: "Scourge of Aqshy Megaboss",
    points: 150,
    abilities: [
      ability("Get In There and Wallop 'Em!", "Your Hero Phase", "Pick a friendly Ironjawz unit wholly within 12\" that was not set up this turn. The next use of Mighty Destroyers this turn can pick it as a second target.", "Once Per Battle Round (Army)"),
      ability("You Ain't Gonna Show Me Up", "End of Any Turn", "If this unit fought this turn, spend 1 rage dice and add 1 permanently to the Damage of its Boss-choppa. If your opponent has lower fury, they gain 1 fury.", "Once Per Turn (Army)"),
    ],
    weapons: [weapon("Boss-choppa", "Melee", 8, "4+", "2+", "1", "2")],
    details: { notes: "Legal para juego equilibrado con el battlepack General's Handbook 2026-27." },
  }),
  alternate("brutes", {
    id: "brutes-scourge-of-aqshy",
    name: "Scourge of Aqshy Brutes",
    points: 160,
    abilities: [ability("You Call Dat a Punch?", "Reaction: Opponent declared an Attack ability", "Add 1 to hit and wound rolls for this unit's combat attacks that target the attacking enemy for the rest of the turn.", "Once Per Turn (Army)")],
    details: { notes: "Legal para juego equilibrado con el battlepack General's Handbook 2026-27." },
  }),
];

export default scourgeUnits;
