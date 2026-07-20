import units from "./units";
import scourgeUnits from "./scourgeOfAqshy";
import armiesOfRenown from "./armiesOfRenown";
import regimentsOfRenown from "./regimentsOfRenown";
import {
  artefacts,
  battleFormations,
  battleTraits,
  heroicTraits,
  manifestations,
  moulderMutations,
  prayerLores,
  spellLores,
  terrain,
} from "./rules";

const skaven = {
  id: "skaven",
  alliance: "chaos",
  name: "Skaven",
  image: "/images/factions/skaven.webp",
  battleTraits,
  battleFormations,
  heroicTraits,
  moulderMutations,
  monsterTraits: [],
  artefacts,
  aqshyArtefacts: [],
  spellLores,
  prayerLores,
  manifestations: [],
  manifestationLores: manifestations,
  terrain,
  units: [...units, ...scourgeUnits],
  armiesOfRenown,
  regimentsOfRenown,
};

export default skaven;
