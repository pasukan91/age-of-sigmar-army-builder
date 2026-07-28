import armiesOfRenown from "./armiesOfRenown";
import manifestations from "./manifestations";
import regimentsOfRenown from "./regimentsOfRenown";
import {
  aqshyArtefacts,
  artefacts,
  battleFormations,
  battleTraits,
  heroicTraits,
  mortisanRefinements,
  spellLores,
} from "./rules";
import scourgeUnits from "./scourgeOfAqshy";
import terrain from "./terrain";
import units from "./units";

const ossiarch = {
  id: "ossiarch",
  alliance: "death",
  name: "Ossiarch Bonereapers",
  image: "/images/factions/ossiarchs.webp",
  battleTraits,
  battleFormations,
  heroicTraits,
  monsterTraits: [],
  artefacts,
  aqshyArtefacts,
  mortisanRefinements,
  spellLores,
  prayerLores: [],
  manifestations,
  manifestationLores: [
    {
      id: "horrors-of-the-necropolis",
      name: "Horrors of the Necropolis",
      description:
        "Bone-tithe Shrieker, Soulstealer Carrion and Nightmare Predator.",
      manifestations,
    },
  ],
  terrain,
  units: [...units, ...scourgeUnits],
  armiesOfRenown,
  regimentsOfRenown,
};

export default ossiarch;
