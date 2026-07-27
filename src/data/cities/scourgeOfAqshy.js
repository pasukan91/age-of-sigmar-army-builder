import { ability } from "../orrukWarclans/unitFactory";
import units from "./units";

function alternate(baseId, overrides) {
  const base = units.find((unit) => unit.id === baseId);

  return {
    ...base,
    ...overrides,
    image: overrides.image ?? base.image,
    profile: { ...base.profile, ...overrides.profile },
    details: { ...base.details, ...overrides.details },
  };
}

const legalNote =
  "Warscroll de temporada de Scourge of Aqshy. Legal en juego equilibrado con el battlepack General's Handbook 2026-27.";

const scourgeUnits = [
  alternate("alchemite-warforger", {
    id: "alchemite-warforger-scourge-of-aqshy",
    name: "Scourge of Aqshy Alchemite Warforger",
    image: "/images/units/cos/alchemite_warforger-aqshy.jpg",
    points: 100,
    abilities: [
      ability(
        "Crucible of Rage",
        "Your Hero Phase",
        "Spend 1 rage dice to apply the effect; if your opponent's fury level is lower, they increase it by 1, to a maximum of 7. Otherwise, roll a die and apply the effect on a 3+. Until the start of your next turn, add 1 to casting rolls for friendly Cities of Sigmar units wholly within 6\".",
        "Once Per Turn (Army)"
      ),
    ],
    details: { notes: legalNote },
  }),
  alternate("pontifex-zenestra-matriarch-of-the-great-wheel", {
    id: "pontifex-zenestra-scourge-of-aqshy",
    name: "Scourge of Aqshy Pontifex Zenestra",
    image: "/images/units/cos/zenestra-aqshy.jpg",
    points: 160,
    abilities: [
      ability(
        "Sigmar's Blessing",
        "Your Hero Phase",
        "Pick a visible friendly Sigmarite unit wholly within 12\" and make a chanting roll of D6. Until the start of your next turn, its melee weapons have Charge (+1 Damage); on a 10+, it also has Ward (5+) if it charged that turn.",
        "Prayer",
        ["Prayer"]
      ),
      ability(
        "Unquenchable Faith",
        null,
        "If this unit would be destroyed, before removing it, it can immediately use Sigmar's Blessing as if it were your hero phase. It does not count towards its Prayer limit, uses an unmodifiable roll of 10, and the effect lasts for the rest of the battle.",
        "Passive"
      ),
    ],
    details: { notes: legalNote },
  }),
];

export default scourgeUnits;
