import units from "./units.js";
import { ability, weapon } from "../orrukWarclans/unitFactory.js";

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

const legalNote = "Legal for matched play with the General's Handbook 2026-27 battlepack.";

const scourgeUnits = [
  alternate("huskard-on-thundertusk", {
    id: "huskard-on-thundertusk-scourge-of-aqshy",
    name: "Scourge of Aqshy Huskard on Thundertusk",
    points: 260,
    keywords: ["Hero", "Monster", "Priest (1)", "Destruction", "Ogor Mawtribes", "Ogor", "Beastclaw Raiders"],
    weapons: [
      weapon("Ice Blast", "Ranged", 1, "4+", "2+", "1", "D3+2", ["Companion"], '12"'),
      weapon("Chaintrap", "Ranged", 1, "4+", "3+", "1", "3", ["Anti-Monster (+1 Rend)"], '12"'),
      weapon("Harpoon Launcher", "Ranged", 1, "4+", "3+", "1", "D3", [], '18"'),
      weapon("Blood Vulture", "Ranged", 1, "2+", "3+", "0", "1", [], '24"'),
      weapon("Punches and Kicks", "Melee", 3, "4+", "2+", "0", "1"),
      weapon("Thundertusk's Colossal Tusks", "Melee", 3, "4+", "2+", "1", "5", ["Anti-Infantry (+1 Rend)", "Companion"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "At 10 or more damage, Thundertusk's Colossal Tusks has 2 Attacks.", "Passive"),
      ability("Cool Tempers", "End of Your Turn", "If this unit is wholly outside friendly territory and not in combat, your opponent must reduce their fury level by 1, to a minimum of 0.", "Rampage"),
      ability("Everwinter's Ire", "Start of Any Turn", "For the rest of the turn, while your opponent's fury level is equal to or up to 2 levels below yours, add 1 to chanting rolls for this unit. While it is 3 or more levels below yours, add 2 to chanting rolls for this unit instead.", "Once Per Turn (Army)"),
    ],
    details: { notes: legalNote },
  }),
  alternate("frostlord-on-thundertusk", {
    id: "frostlord-on-thundertusk-scourge-of-aqshy",
    name: "Scourge of Aqshy Frostlord on Thundertusk",
    points: 280,
    keywords: ["Hero", "Monster", "Destruction", "Ogor Mawtribes", "Ogor", "Beastclaw Raiders"],
    weapons: [
      weapon("Ice Blast", "Ranged", 1, "4+", "2+", "1", "D3+2", ["Companion"], '12"'),
      weapon("Frost Spear", "Melee", 4, "4+", "2+", "2", "2", ["Charge (+1 Damage)"]),
      weapon("Thundertusk's Colossal Tusks", "Melee", 3, "4+", "2+", "1", "5", ["Anti-Infantry (+1 Rend)", "Companion"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "At 10 or more damage, Thundertusk's Colossal Tusks has 2 Attacks.", "Passive"),
      ability("Cold Fury", "Reaction: You declared the 'Eruption of Fury' ability for this unit", "When resolving attacks as part of that ability, each unmodified hit roll of 6 inflicts an additional 3 mortal damage on each enemy unit in combat with this unit instead of D3. Each unmodified hit roll of 1 allocates 1 mortal damage to this unit instead of D3; ward rolls cannot be made for that damage point.", "Reaction"),
      ability("Snow Plough", "Your Charge Phase", "This unit can use Charge abilities this turn even if it is in combat. If the charge roll is 2 or less when it does so, it does not count as having charged.", "Once Per Turn (Army)", ["Rampage"]),
    ],
    details: { notes: legalNote },
  }),
];

export default scourgeUnits;
