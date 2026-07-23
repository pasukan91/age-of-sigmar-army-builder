import units from "./units";
import scourgeUnits from "./scourgeOfAqshy";
import manifestations from "./manifestations";
import terrain from "./terrain";
import {
  aqshyArtefacts,
  artefacts,
  battleFormations,
  battleTraits,
  heroicTraits,
  manifestationLores,
  monsterTraits,
  prayerLores,
  spellLores,
} from "./rules";

const imageNames = {
  "alarielle": "alarielle.jpg",
  "arch-revenant": "arch-revenant.jpg",
  "belthanos": "belthanos.jpg",
  "branchwych": "branchwych.jpg",
  "dryads": "dryads.jpg",
  "drycha": "drycha.jpg",
  "durthu": "durthu.jpg",
  "gossamid-archers": "gossamid-archers.jpg",
  "grove-guardian": "grove-guardian.jpg",
  "kurnoth-hunters": "kurnoth-hunters.jpg",
  "kurnoth-hunters-aqshy": "kurnoth-hunters-aqshy.jpg",
  "lady-of-vines": "lady-of-vines.jpg",
  "revenant-seekers": "revenant-seekers.jpg",
  "spite-revenants": "spite-revenants.jpg",
  "spiterider-lancers": "spiterider-lancers.jpg",
  "tree-revenants": "tree-revenants.jpg",
  "treelord": "treelord.jpg",
  "treelord-ancient": "treelord-ancient.jpg",
  "treelord-ancient-aqshy": "treelord-ancient-aqshy.jpg",
  "twistweald": "twistweald.jpg",
  "warsong-revenant": "warsong-revenant.jpg",
};

const withImage = (unit) => {
  const filename = imageNames[unit.imageAlias ?? unit.id];
  return filename ? { ...unit, image: `/images/units/sylvaneth/${filename}` } : unit;
};

const manifestationImages = {
  "gladewyrm": "gladewyrm.jpg",
  "vengeful-skullroot": "skullroot.jpg",
  "spiteswarm-hive": "spiteswarm.jpg",
};

const completeManifestations = manifestations.map((item) => ({
  ...item,
  image: `/images/units/sylvaneth/${manifestationImages[item.id]}`,
}));

const completeManifestationLores = manifestationLores.map((lore) => ({
  ...lore,
  manifestations: completeManifestations,
}));

const sylvaneth = {
  id: "sylvaneth",
  alliance: "order",
  name: "Sylvaneth",
  image: "/images/factions/sylvaneth.webp",
  battleTraits,
  battleFormations,
  heroicTraits,
  monsterTraits,
  artefacts,
  aqshyArtefacts,
  spellLores,
  prayerLores,
  manifestations: completeManifestations,
  manifestationLores: completeManifestationLores,
  terrain,
  units: [...units, ...scourgeUnits].map(withImage),
  armiesOfRenown: [],
  regimentsOfRenown: [],
};

export default sylvaneth;
