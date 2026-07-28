import armiesOfRenown from "./armiesOfRenown";
import manifestations from "./manifestations";
import regimentsOfRenown from "./regimentsOfRenown";
import {
  artefacts,
  battleFormations,
  battleTraits,
  heroicTraits,
  originsOfTerrifyingFolkTales,
  spellLores,
} from "./rules";
import scourgeUnits from "./scourgeOfAqshy";
import terrain from "./terrain";
import units from "./units";

const soulblight = {
  id: "soulblight",
  alliance: "death",
  name: "Soulblight Gravelords",
  image: "/images/factions/soulblight.webp",
  battleTraits,
  battleFormations,
  heroicTraits,
  monsterTraits: [],
  artefacts,
  aqshyArtefacts: [],
  originsOfTerrifyingFolkTales,
  spellLores,
  prayerLores: [],
  manifestations,
  manifestationLores: [{
    id: "manifestations-of-the-grave",
    name: "Manifestations of the Grave",
    manifestations,
  }],
  terrain,
  units: [...units, ...scourgeUnits],
  armiesOfRenown,
  regimentsOfRenown,
};

export default soulblight;
