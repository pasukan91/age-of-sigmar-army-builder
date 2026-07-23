import units from "./units";
import scourgeUnits from "./scourgeOfAqshy";
import terrain from "./terrain";
import armiesOfRenown from "./armiesOfRenown";
import { kragnos, manifestations, manifestationLores } from "../orrukWarclans/shared";
import { battleTraits, battleFormations, heroicTraits, monsterTraits, artefacts, aqshyArtefacts, spellLores, prayerLores } from "./rules";


const unitImages = {
  "gobsprakk-the-mouth-of-mork": "gobbsprakk.jpg",
  "killaboss-on-corpse-rippa-vulcha": "killaboss-in-corpse-rippa.jpg",
  "killaboss-on-great-gnashtoof": "killaboss-on-great-gnashroof.jpg",
  "killaboss-with-stab-grot": "killaboss.jpg",
  "breaka-boss-on-mirebrute-troggoth": "breakka-boss.jpg",
  "snatchaboss-on-sludgeraker-beast": "snatchaboss.jpg",
  "swampboss-skumdrekk": "skumdrekk.jpg",
  "hobgrot-slittaboss": "slittaboss.jpg",
  "swampcalla-shaman-with-pot-grot": "shaman.jpg",
  gutrippaz: "gutrippaz.jpg",
  "hobgrot-slittaz": "hobgrot.jpg",
  "man-skewer-boltboyz": "boltboyz.jpg",
  "beast-skewer-killbow": "beast-skewer.jpg",
  "marshcrawla-sloggoth": "sloggoth.jpg",
  "kragnos-the-end-of-empires": "kragnos.jpg",
  "killaboss-on-great-gnashtoof-scourge-of-aqshy": "killaboss-on-great-gnashroof-aqshy.jpg",
  "killaboss-with-stab-grot-scourge-of-aqshy": "killaboss-aqshy.jpg",
};
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
