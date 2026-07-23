import units from "./units";
import scourgeUnits from "./scourgeOfAqshy";
import terrain from "./terrain";
import armiesOfRenown from "./armiesOfRenown";
import { kragnos, manifestations, manifestationLores } from "../orrukWarclans/shared";
import { battleTraits, battleFormations, heroicTraits, monsterTraits, artefacts, aqshyArtefacts, spellLores, prayerLores } from "./rules";

const unitImages = {
  "gordrakk-the-fist-of-gork": "gordrakk-the-fist-of-gork.jpg",
  "megaboss-on-maw-krusha": "megaboss-on-maw-krusha.jpg",
  megaboss: "megaboss.jpg",
  "tuskboss-on-maw-grunta": "tuskboss-on-maw-grunta.jpg",
  "zoggrok-anvilsmasha": "zoggrok-anvilsmasha.jpg",
  "ardboy-big-boss": "ardboy-big-boss.jpg",
  warchanter: "warchanter.jpg",
  "weirdnob-shaman": "weirdnob-shaman.jpg",
  ardboyz: "ardboyz.jpg",
  brutes: "brutes.jpg",
  "weirdbrute-wrekkaz": "weirdbrute-wrekkaz.jpg",
  "gore-gruntas": "gore-gruntas.jpg",
  "maw-grunta-with-hakkin-krew": "maw-grunta-with-hakkin-krew.jpg",
  "megaboss-scourge-of-aqshy": "megaboss-aqshy.jpg",
  "brutes-scourge-of-aqshy": "brutes-aqshy.jpg",
};

const withAvailableImage = (unit) => {
  if (unit.id === "kragnos-the-end-of-empires") {
    return { ...unit, image: "/images/units/kruleboyz/kragnos.jpg" };
  }

  return unitImages[unit.id]
    ? { ...unit, image: `/images/units/ironjawz/${unitImages[unit.id]}` }
    : unit;
};

const ironjawz = {
  id: "ironjawz",
  alliance: "destruction",
  name: "Ironjawz",
  image: "/images/factions/ironjawz-army.webp",
  imagePosition: "75% 42%",
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
  units: [...units, kragnos, ...scourgeUnits].map(withAvailableImage),
  armiesOfRenown,
};

export default ironjawz;
