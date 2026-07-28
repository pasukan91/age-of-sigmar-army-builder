import armiesOfRenown from "./armiesOfRenown";
import regimentsOfRenown from "./regimentsOfRenown";
import { accursedDevices, aqshyArtefacts, artefacts, battleFormations, battleTraits, heroicTraits, prayerLores, spellLores } from "./rules";
import scourgeUnits from "./scourgeOfAqshy";
import units from "./units";

export default {
  id:"hashut", alliance:"chaos", name:"Helsmiths of Hashut", image:"/images/factions/hashut.webp",
  battleTraits, battleFormations, heroicTraits, monsterTraits:[], artefacts, aqshyArtefacts,
  accursedDevices, spellLores, prayerLores, manifestations:[], terrain:[],
  units:[...units,...scourgeUnits], armiesOfRenown, regimentsOfRenown,
};
