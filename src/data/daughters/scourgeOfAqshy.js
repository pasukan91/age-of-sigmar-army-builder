import units from "./units";
import { ability, weapon } from "../orrukWarclans/unitFactory";

function alternate(baseId, overrides) {
  const base = units.find((unit) => unit.id === baseId);
  return {
    ...base,
    ...overrides,
    profile: { ...base.profile, ...overrides.profile },
    details: { ...base.details, ...overrides.details },
  };
}

const legalNote = "Legal for matched play with the General's Handbook 2026-27 battlepack.";

const scourgeUnits = [
  alternate("melusai-ironscale", {
    id: "melusai-ironscale-scourge-of-aqshy",
    name: "Scourge of Aqshy Melusai Ironscale",
    points: 140,
    details: { regimentOptions: ["Any Daughters of Khaine"], canJoinRegimentAs: ["coven-matriarch"], notes: legalNote },
    weapons: [weapon("Keldrisaith", "Melee", 6, "3+", "4+", "1", "2", ["Crit (Mortal)"])],
    abilities: [ability("Frenzied Slaughter", "Your Hero Phase", "Pick a visible friendly Daughters of Khaine unit wholly within 12\" and roll a die, re-rolling if this unit is in combat. If the roll is lower than your fury level, add 1 to the Attacks of weapons used by this unit and the target until your next turn.", "Once Per Turn (Army)", ["Exalted"])],
  }),
  alternate("khainite-shadowstalkers", {
    id: "khainite-shadowstalkers-scourge-of-aqshy",
    name: "Scourge of Aqshy Khainite Shadowstalkers",
    points: 100,
    details: { notes: legalNote },
    abilities: [ability("Shadow Lariat", "End of Any Turn", "If not in combat, pick a visible enemy single-model Infantry or Cavalry Hero within 12\". If it is more than 3\" from friendly units, apply the effect; otherwise on a 3+. Your opponent repositions it in combat with this unit.", "Once Per Turn (Army)")],
  }),
];

export default scourgeUnits;
