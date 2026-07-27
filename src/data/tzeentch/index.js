import units from "./units";
import scourgeUnits from "./scourgeOfAqshy";
import manifestations from "./manifestations";
import terrain from "./terrain";
import armiesOfRenown from "./armiesOfRenown";
import regimentsOfRenown from "./regimentsOfRenown";
import {
  aqshyArtefacts,
  artefacts,
  battleFormations,
  battleTraits,
  heroicTraits,
  spellLores,
  visionsOfFate,
} from "./rules";

const tzeentch = {
  id: "tzeentch",
  alliance: "chaos",
  name: "Disciples of Tzeentch",
  image: "/images/factions/disciples.webp",
  battleTraits,
  battleFormations,
  heroicTraits,
  monsterTraits: [],
  artefacts,
  aqshyArtefacts,
  visionsOfFate,
  spellLores,
  prayerLores: [],
  manifestations,
  manifestationLores: [{
    id: "manifestations-of-tzeentch",
    name: "Manifestations of Tzeentch",
    description: "Burning Sigil of Tzeentch, Daemonic Simulacrum and Tome of Eyes.",
    manifestations,
  }],
  terrain,
  units: [...units, ...scourgeUnits],
  armiesOfRenown,
  regimentsOfRenown,
};

export default tzeentch;
