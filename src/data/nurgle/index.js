import units from "./units";
import scourgeUnits from "./scourgeOfAqshy";
import terrain from "./terrain";
import armiesOfRenown from "./armiesOfRenown";
import regimentsOfRenown from "./regimentsOfRenown";
import {
  artefacts, battleFormations, battleTraits, heroicTraits,
  plaguefathersPoxes, prayerLores, spellLores,
} from "./rules";

export default {
  id: "nurgle",
  alliance: "chaos",
  name: "Maggotkin of Nurgle",
  image: "/images/factions/maggotkin.webp",
  battleTraits,
  battleFormations,
  heroicTraits,
  monsterTraits: [],
  artefacts,
  plaguefathersPoxes,
  spellLores,
  prayerLores,
  manifestations: [],
  manifestationLores: [],
  terrain,
  units: [...units, ...scourgeUnits],
  armiesOfRenown,
  regimentsOfRenown,
};
