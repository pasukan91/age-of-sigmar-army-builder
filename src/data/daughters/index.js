import units from "./units";
import scourgeUnits from "./scourgeOfAqshy";
import manifestations from "./manifestations";
import terrain from "./terrain";
import armiesOfRenown from "./armiesOfRenown";
import {
  artefacts,
  battleFormations,
  battleTraits,
  boonsOfShadow,
  heroicTraits,
  manifestationLores,
  prayerLores,
  spellLores,
} from "./rules";

const imageNames = {
  "morathi-khaine": "morathi.jpg",
  "the-shadow-queen": "shadow-queen.jpg",
  "krethusa": "krethusa.jpg",
  "slaughter-queen": "slaughter-queen.jpg",
  "hag-queen": "hag-queen.jpg",
  "slaughter-queen-cauldron": "slaughter-queen-cauldron-blood.jpg",
  "hag-queen-cauldron-blood": "hag-queen-cauldron-blood.jpg",
  "bloodwrack-shrine": "bloodwrack-shrine.jpg",
  "melusai-ironscale": "melusai-ironscale.jpg",
  "bloodwrack-medusa": "bloodwrack-medusa.jpg",
  "high-gladiatrix": "high-gladiatrix.jpg",
  "blood-hags": "blood-hags.jpg",
  "khainite-shadowstalkers": "khainite-shadowstalkers.jpg",
  "witch-aelves": "witch-aelves.jpg",
  "sisters-slaughter": "sisters-slaughter.jpg",
  "khinerai-heartrenders": "khinerai-heartrenders.jpg",
  "khirenai-lifetakers": "khirenai-lifetakers.jpg",
  "blood-sisters": "blood-sisters.jpg",
  "blood-stalkers": "blood-stalkers.jpg",
  "doomfire-warlocks": "doomfire-warlocks.jpg",
};

const withImage = (unit) => {
  const filename = imageNames[unit.imageAlias ?? unit.id];
  return filename ? { ...unit, image: `/images/units/dok/${filename}` } : unit;
};

const completeManifestationLores = manifestationLores.map((lore) => ({
  ...lore,
  manifestations: lore.manifestations.map((id) => manifestations.find((item) => item.id === id)).filter(Boolean),
}));

const daughters = {
  id: "daughters",
  alliance: "order",
  name: "Daughters of Khaine",
  image: "/images/factions/dok.webp",
  battleTraits,
  battleFormations,
  heroicTraits,
  artefacts,
  boonsOfShadow,
  spellLores,
  prayerLores,
  manifestations,
  manifestationLores: completeManifestationLores,
  terrain,
  units: [...units, ...scourgeUnits].map(withImage),
  armiesOfRenown,
  regimentsOfRenown: [],
};

export default daughters;
