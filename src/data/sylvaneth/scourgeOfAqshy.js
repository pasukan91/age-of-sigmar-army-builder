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
  alternate("kurnoth-hunters-with-greatswords", {
    id: "kurnoth-hunters-with-greatswords-scourge-of-aqshy",
    imageAlias: "kurnoth-hunters-aqshy",
    name: "Scourge of Aqshy Kurnoth Hunters with Greatswords",
    points: 240,
    abilities: [
      ability("Hunter's Endurance", null, "Subtract 1 from the Rend of attacks targeting this unit while it is wholly within the creeping overgrowth.", "Passive"),
      ability("Vital Rangers", "End of Your Turn", "If this unit is not in combat, it can move up to its Move characteristic. It must end that move within the creeping overgrowth and not in combat.", "Once Per Turn (Army)", ["Move"]),
    ],
    details: { notes: legalNote },
  }),
  alternate("treelord-ancient", {
    id: "treelord-ancient-scourge-of-aqshy",
    imageAlias: "treelord-ancient-aqshy",
    name: "Scourge of Aqshy Treelord Ancient",
    points: 290,
    weapons: [
      weapon("Doom Tendril Staff", "Ranged", 4, "4+", "2+", "1", "D3", [], '18"'),
      weapon("Sweeping Blows", "Melee", 5, "4+", "2+", "1", "2", ["Anti-Charge (+1 Rend)"]),
      weapon("Massive Impaling Talons", "Melee", 2, "4+", "2+", "2", "3", ["Crit (Mortal)"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "At 10 or more damage, Sweeping Blows has 3 Attacks.", "Passive"),
      ability("Arcane Osmosis", "Your Hero Phase", "For the rest of the turn, add D3 to this unit's casting rolls. It cannot move or be removed from the battlefield by an ability that would set it up elsewhere or in reserve.", "Once Per Turn (Army)"),
      ability("Jade Abjuration", "Your Hero Phase", "Pick this unit or a visible friendly Awakened Wyldwood wholly within 12\" and make a casting roll. Until your next turn, ignore enemy Spell effects on units within 6\" of the target, and enemy manifestation weapons within 6\" of it have a maximum Attacks characteristic of 1.", "Spell", ["Spell"], 7),
    ],
    details: { notes: legalNote },
  }),
];

export default scourgeUnits;
