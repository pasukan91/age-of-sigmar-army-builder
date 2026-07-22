import units from "./units";
import scourgeUnits from "./scourgeOfAqshy";
import terrain from "./terrain";
import armiesOfRenown from "./armiesOfRenown";
import { kragnos, manifestations, manifestationLores } from "../orrukWarclans/shared";
import { battleTraits, battleFormations, heroicTraits, monsterTraits, artefacts, aqshyArtefacts, spellLores, prayerLores } from "./rules";

const ironjawz = {
  id: "ironjawz",
  alliance: "destruction",
  name: "Ironjawz",
  image: "/images/factions/ironjawz.webp",
  battleTraits,
  battleFormations,
  heroicTraits,
  monsterTraits,
  artefacts,
  aqshyArtefacts,
  spellLores,
  prayerLores,
  manifestations,
  manifestationLores,
  terrain,
  units: [...units, kragnos, ...scourgeUnits],
  armiesOfRenown,
};

export default ironjawz;
