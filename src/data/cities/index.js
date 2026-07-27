import units from "./units";
import scourgeUnits from "./scourgeOfAqshy";
import armiesOfRenown from "./armiesOfRenown";
import regimentsOfRenown from "./regimentsOfRenown";
import {
  artefacts,
  battleFormations,
  battleTraits,
  decorationsForValour,
  heroicTraits,
  ironweldInnovations,
  prayerLores,
  spellLores,
  terrain,
} from "./rules";

const cities = {
  id: "cities",
  alliance: "order",
  name: "Cities of Sigmar",
  image: "/images/factions/citiesofsigmar.webp",
  battleTraits,
  battleFormations,
  heroicTraits,
  monsterTraits: [],
  artefacts,
  aqshyArtefacts: [],
  decorationsForValour,
  ironweldInnovations,
  spellLores,
  prayerLores,
  manifestations: [],
  manifestationLores: [],
  terrain,
  units: [...units, ...scourgeUnits],
  armiesOfRenown,
  regimentsOfRenown,
};

export default cities;
