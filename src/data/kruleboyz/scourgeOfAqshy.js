import units from "./units";
import { ability, weapon } from "../orrukWarclans/unitFactory";

function alternate(baseId, overrides) {
  const base = units.find((unit) => unit.id === baseId);
  return {
    ...base,
    ...overrides,
    image: `/images/units/kruleboyz/${baseId}.webp`,
    imageAlias: baseId,
    profile: { ...base.profile, ...overrides.profile },
    details: { ...base.details, ...overrides.details },
  };
}

const scourgeUnits = [
  alternate("killaboss-on-great-gnashtoof", {
    id: "killaboss-on-great-gnashtoof-scourge-of-aqshy",
    name: "Scourge of Aqshy Killaboss on Great Gnashtoof",
    points: 230,
    weapons: [
      weapon("Boss-skewa", "Melee", 5, "4+", "3+", "1", "2", ["Anti-Hero (+1 Rend)", "Crit (Mortal)"]),
      weapon("Great Gnashtoof's Jaws", "Melee", 5, "4+", "3+", "1", "2", ["Companion"]),
    ],
    abilities: [
      ability("Drag 'Em Out", "Your Combat Phase", "Pick an enemy Infantry Hero in combat and roll 2D6. Move up to the roll, then your opponent sets the target within 1\" of this unit if possible.", "Once Per Turn (Army)"),
      ability("Prowling the Flanks", "Your Movement Phase", "If wholly within 6\" of an edge, reposition wholly within 6\" of an edge and more than 9\" from enemies.", "Once Per Turn (Army)"),
    ],
    details: { notes: "Legal para juego equilibrado con el battlepack General's Handbook 2026-27." },
  }),
  alternate("killaboss-with-stab-grot", {
    id: "killaboss-with-stab-grot-scourge-of-aqshy",
    name: "Scourge of Aqshy Killaboss with Stab-grot",
    points: 130,
    weapons: [weapon("Boss-hacka", "Melee", 5, "4+", "3+", "1", "2", ["Crit (Mortal)"])],
    abilities: [
      ability("Just Keep Stabbin'", "Any Combat Phase", "Roll dice equal to your fury level for an enemy in combat. You may spend 1 rage dice for +1 to each roll and force a lower-fury opponent to gain 1 fury. Each 3+ inflicts 1 mortal damage.", "Once Per Turn (Army)"),
      ability("Jump 'Em, Ladz, or Else!", "Reaction: You declared a Fight ability", "Pick friendly Gutrippaz or Hobgrot Slittaz in combat range that have not fought. They can fight next and gain +1 Attack for the turn.", "Reaction"),
    ],
    details: { notes: "Legal para juego equilibrado con el battlepack General's Handbook 2026-27." },
  }),
];

export default scourgeUnits;
