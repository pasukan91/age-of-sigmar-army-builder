import armiesOfRenown from "./armiesOfRenown";
import manifestations from "./manifestations";
import regimentsOfRenown from "./regimentsOfRenown";
import { aqshyPrayerLores, artefacts, battleFormations, battleTraits, brazenMutations, heroicTraits, prayerLores } from "./rules";
import scourgeUnits from "./scourgeOfAqshy";
import terrain from "./terrain";
import units from "./units";

export default {
  id:"khorne",alliance:"chaos",name:"Blades of Khorne",image:"/images/factions/blades.webp",
  battleTraits,battleFormations,heroicTraits,monsterTraits:[],artefacts,
  brazenMutations,spellLores:[],prayerLores:[...prayerLores,...aqshyPrayerLores],aqshyPrayerLores,
  manifestations,terrain,units:[...units,...scourgeUnits],armiesOfRenown,regimentsOfRenown,
};
