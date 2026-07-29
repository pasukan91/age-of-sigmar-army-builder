import armiesOfRenown from "./armiesOfRenown";
import manifestations from "./manifestations";
import regimentsOfRenown from "./regimentsOfRenown";
import {
  aqshyArtefacts,
  artefacts,
  battleFormations,
  battleTraits,
  brandsOfTheDarkGods,
  ensorcelledBanners,
  heroicTraits,
  spellLores,
} from "./rules";
import scourgeUnits from "./scourgeOfAqshy";
import terrain from "./terrain";
import units from "./units";

export default {
  id: "std",
  alliance: "chaos",
  name: "Slaves to Darkness",
  image: "/images/factions/slaves.webp",
  battleTraits,
  battleFormations,
  heroicTraits,
  monsterTraits: [],
  artefacts,
  aqshyArtefacts,
  brandsOfTheDarkGods,
  ensorcelledBanners,
  spellLores,
  prayerLores: [],
  manifestations,
  terrain,
  units: [...units, ...scourgeUnits],
  armiesOfRenown,
  regimentsOfRenown,
};
