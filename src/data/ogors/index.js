import units from "./units";
import scourgeUnits from "./scourgeOfAqshy";
import terrain from "./terrain";
import armiesOfRenown from "./armiesOfRenown";
import { kragnos as sharedKragnos } from "../orrukWarclans/shared";
import {
  battleTraits,
  battleFormations,
  heroicTraits,
  monsterTraits,
  artefacts,
  aqshyArtefacts,
  spellLores,
  prayerLores,
} from "./rules";

const imageNames = {
  "morga-the-mighty": "morga.jpg",
  "grell-firefist": "grell.jpg",
  "tyrant-on-glutthorn": "glutthorn.jpg",
  tyrant: "tyrant.jpg",
  "maulbeast-cavalry": "maulbeast.jpg",
  gluttons: "gluttons.jpg",
  ironguts: "ironguts.jpg",
  ironblaster: "ironblaster.jpg",
  "gnoblar-scraplauncher": "gnoblar.jpg",
  "frostlord-on-stonehorn": "frostlord.jpg",
  "frostlord-on-thundertusk": "frostlord-on-thunderhusk.jpg",
  "huskard-on-stonehorn": "huskard-on-stonehorn.jpg",
  "huskard-on-thundertusk": "huskard-on-thunderhusk.jpg",
  "bloodpelt-hunter": "bloodpelt.jpg",
  mantrapper: "mantrapper.jpg",
  "maulbeast-raiders": "maulbeast.jpg",
  "stonehorn-beastriders": "stonehorn-beastriders.jpg",
  "thundertusk-beastriders": "thunderhusk-beastriders.jpg",
  "redd-the-maw": "redd.jpg",
  butcher: "butcher.png",
  cleavers: "cleavers.png",
  gutseers: "guttseers.jpg",
  "gorger-mawpack": "gorger.jpg",
};

const withImage = (unit) => {
  const baseId = unit.imageAlias ?? unit.id;
  const filename = imageNames[baseId];
  return filename ? { ...unit, image: `/images/units/ogors/${filename}` } : unit;
};

const kragnos = {
  ...sharedKragnos,
  image: "/images/units/kruleboyz/kragnos.jpg",
  details: {
    ...sharedKragnos.details,
    regimentOptions: ["Any Ogor Mawtribes"],
  },
  keywords: ["Warmaster", "Unique", "Hero", "Monster", "Ward (5+)", "Destruction", "Ogor Mawtribes"],
};

const ogors = {
  id: "ogors",
  alliance: "destruction",
  name: "Ogor Mawtribes",
  image: "/images/factions/ogormawtribes.webp",
  battleTraits,
  battleFormations,
  heroicTraits,
  monsterTraits,
  artefacts,
  aqshyArtefacts,
  spellLores,
  prayerLores,
  manifestations: [],
  manifestationLores: [],
  terrain,
  units: [...units, kragnos, ...scourgeUnits].map(withImage),
  armiesOfRenown,
};

export default ogors;
