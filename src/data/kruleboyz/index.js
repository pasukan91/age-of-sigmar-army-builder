import units from "./units";
import scourgeUnits from "./scourgeOfAqshy";
import terrain from "./terrain";
import armiesOfRenown from "./armiesOfRenown";
import { kragnos, manifestations, manifestationLores } from "../orrukWarclans/shared";
import { battleTraits, battleFormations, heroicTraits, monsterTraits, artefacts, aqshyArtefacts, spellLores } from "./rules";

const unitImages = {
  "gobsprakk-the-mouth-of-mork": "gobbsprakk.jpg",
  "killaboss-on-corpse-rippa-vulcha": "killaboss-in-corpse-rippa.jpg",
  "killaboss-on-great-gnashtoof": "killaboss-on-great-gnashroof.jpg",
  "killaboss-with-stab-grot": "killaboss.jpg",
  "breaka-boss-on-mirebrute-troggoth": "breakka-boss.jpg",
  "snatchaboss-on-sludgeraker-beast": "snatchaboss.jpg",
  "swampboss-skumdrekk": "skumdrekk.jpg",
  "hobgrot-slittaboss": "slittaboss.jpg",
  "murknob-with-belcha-banna": "murknob-with-belcha-banna.jpg",
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

const withAvailableImage = (unit) => unitImages[unit.id]
  ? { ...unit, image: `/images/units/kruleboyz/${unitImages[unit.id]}` }
  : unit;

const manifestationImages = {
  "foot-of-gork": "foot-of-gork.jpg",
  "gork-roara": "gork-roara.jpg",
  "morkspit-marsh": "morkspit-marsh.jpg",
};

const kruleboyzManifestations = manifestations.map((manifestation) => ({
  ...manifestation,
  image: `/images/units/kruleboyz/${manifestationImages[manifestation.id]}`,
}));

const kruleboyzManifestationLores = manifestationLores.map((lore) => ({
  ...lore,
  manifestations: kruleboyzManifestations,
}));

const kruleboyzTerrain = terrain.map((feature) => feature.id === "skaregob-totem"
  ? { ...feature, image: "/images/units/kruleboyz/skaregob.jpg" }
  : feature
);

const kruleboyzArmiesOfRenown = armiesOfRenown.map((army) => {
  if (army.id !== "murkvast-menagerie") {
    return army;
  }

  const footOfGork = kruleboyzManifestations.filter(
    (manifestation) => manifestation.id === "foot-of-gork"
  );

  return {
    ...army,
    rules: {
      ...army.rules,
      manifestations: footOfGork,
      manifestationLores: (army.rules.manifestationLores ?? []).map((lore) => ({
        ...lore,
        manifestations: footOfGork,
      })),
    },
  };
});

const kruleboyz = {
  id: "kruleboyz",
  alliance: "destruction",
  name: "Kruleboyz",
  image: "/images/factions/kruleboyz.webp",
  battleTraits,
  battleFormations,
  heroicTraits,
  monsterTraits,
  artefacts,
  aqshyArtefacts,
  spellLores,
  prayerLores: [],
  manifestations: kruleboyzManifestations,
  manifestationLores: kruleboyzManifestationLores,
  terrain: kruleboyzTerrain,
  units: [...units, kragnos, ...scourgeUnits].map(withAvailableImage),
  armiesOfRenown: kruleboyzArmiesOfRenown,
};

export default kruleboyz;
