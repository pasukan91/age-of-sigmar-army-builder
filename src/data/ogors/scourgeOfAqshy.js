import units from "./units";
import { ability, weapon } from "../orrukWarclans/unitFactory";

function alternate(baseId, overrides) {
  const base = units.find((unit) => unit.id === baseId);
  return {
    ...base,
    ...overrides,
    imageAlias: baseId,
    profile: { ...base.profile, ...overrides.profile },
    details: { ...base.details, ...overrides.details },
  };
}

const legalNote = "Legal para juego equilibrado con el battlepack General's Handbook 2026-27.";

const scourgeUnits = [
  alternate("huskard-on-thundertusk", {
    id: "huskard-on-thundertusk-scourge-of-aqshy",
    name: "Scourge of Aqshy Huskard on Thundertusk",
    points: 260,
    weapons: [
      weapon("Ice Blast", "Ranged", 1, "4+", "2+", "1", "D3+2", ["Companion"], '12"'),
      weapon("Chaintrap", "Ranged", 1, "4+", "3+", "1", "3", ["Anti-Monster (+1 Rend)"], '12"'),
      weapon("Harpoon Launcher", "Ranged", 1, "4+", "3+", "1", "D3", [], '18"'),
      weapon("Blood Vulture", "Ranged", 1, "2+", "3+", "0", "1", [], '24"'),
      weapon("Huskard's Punches and Kicks", "Melee", 3, "4+", "2+", "0", "1"),
      weapon("Thundertusk's Colossal Tusks", "Melee", 3, "4+", "2+", "1", "5", ["Anti-Infantry (+1 Rend)", "Companion"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "At 10 or more damage, Thundertusk's Colossal Tusks has 2 Attacks.", "Passive"),
      ability("Cool Tempers", "End of Your Turn", "If this unit is wholly outside friendly territory and not in combat, your opponent's fury level is reduced by 1.", "Rampage"),
      ability("Everwinter's Ire", "Start of Any Turn", "Add 1 to chanting rolls if your opponent's fury is equal to yours or up to 2 lower; add 2 instead if it is at least 3 lower.", "Ability"),
    ],
    details: { notes: legalNote },
  }),
  alternate("frostlord-on-thundertusk", {
    id: "frostlord-on-thundertusk-scourge-of-aqshy",
    name: "Scourge of Aqshy Frostlord on Thundertusk",
    points: 280,
    weapons: [
      weapon("Ice Blast", "Ranged", 1, "4+", "2+", "1", "D3+2", ["Companion"], '12"'),
      weapon("Frost Spear", "Melee", 4, "4+", "2+", "2", "2", ["Charge (+1 Damage)"]),
      weapon("Thundertusk's Colossal Tusks", "Melee", 3, "4+", "2+", "1", "5", ["Anti-Infantry (+1 Rend)", "Companion"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "At 10 or more damage, Thundertusk's Colossal Tusks has 2 Attacks.", "Passive"),
      ability("Cold Fury", "Reaction: Eruption of Fury", "Unmodified hit rolls of 6 inflict 3 mortal damage instead of D3. On an unmodified 1, allocate 1 mortal damage to this unit instead, with no ward.", "Reaction"),
      ability("Snow Plough", "Your Charge Phase", "This unit can Charge while in combat. If the unmodified charge roll is 2 or less, it does not count as having charged.", "Rampage"),
    ],
    details: { notes: legalNote },
  }),
];

export default scourgeUnits;
