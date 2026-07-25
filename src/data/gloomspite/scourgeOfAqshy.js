import units from "./units";
import { ability, weapon } from "../orrukWarclans/unitFactory";

function alternate(baseId, overrides) {
  const base = units.find((unit) => unit.id === baseId);

  return {
    ...base,
    ...overrides,
    image: base.image,
    imageAlias: base.imageAlias,
    profile: { ...base.profile, ...overrides.profile },
    details: { ...base.details, ...overrides.details },
  };
}

const legalNote = "Legal para juego equilibrado con el battlepack General's Handbook 2026-27.";

const scourgeUnits = [
  alternate("fellwater-troggoths", {
    id: "fellwater-troggoths-scourge-of-aqshy",
    name: "Scourge of Aqshy Fellwater Troggoths",
    points: 180,
    weapons: [
      weapon("Noxious Vomit", "Ranged", "D3", "2+", "3+", "2", "1", ["Shoot in Combat"], '6"'),
      weapon("Spiked Club", "Melee", 4, "4+", "3+", "1", "2"),
    ],
    abilities: [
      ability("Gut-wrenching Stench", "Any Combat Phase", "Pick an enemy in combat and roll a dice. You can spend up to 3 rage dice to add that amount to the roll and raise your opponent's fury if it is lower. On a 5+, the target has Strike-last for the turn.", "Once Per Turn (Army)"),
      ability("Regeneration", "Start of Any Turn", "Heal (D3) this unit."),
    ],
    details: { notes: legalNote },
  }),
  alternate("sunsteala-wheelas", {
    id: "sunsteala-wheelas-scourge-of-aqshy",
    name: "Scourge of Aqshy Sunsteala Wheelas",
    points: 170,
    abilities: [
      ability("Slice and Soar", "Any Combat Phase", "After charging, roll one dice per enemy model in combat, adding 1 to each roll for 2 Wheelas or 2 for 3+. Each 6+ inflicts 1 mortal damage. Spend 1 rage dice to move 2D6\" out of combat and raise your opponent's fury if it is lower.", "Once Per Turn (Army)", ["Core", "Attack", "Fight"]),
    ],
    details: { notes: legalNote },
  }),
];

export default scourgeUnits;
