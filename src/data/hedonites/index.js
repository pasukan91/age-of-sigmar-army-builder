import battleTraits from "./battleTraits";
import battleFormations from "./battleFormations";
import heroicTraits from "./heroicTraits";
import artefacts from "./artefacts";
import spellLores from "./spellLores";
import manifestations from "./manifestations";
import terrain from "./terrain";
import units from "./units";
import missingUnits from "./missingUnits";
import regimentProfiles from "./regimentProfiles";
import armiesOfRenown from "./armiesOfRenown";
import regimentsOfRenown from "./regimentsOfRenown";
import {
  allConsumingObsessions,
  scourgeHeroicTraits,
  scourgeUnits,
} from "./scourgeOfAqshy";

const imageAliases = {
  dexcessa: "dexcessa-the-talon-of-slaanesh",
  synessa: "synessa-the-voice-of-slaanesh",
  sigvald: "sigvald-prince-of-slaanesh",
  syllesske: "syllesske-the-vengeful-alliance",
};

const completeUnits = [...units, ...missingUnits, ...scourgeUnits].map((unit) => {
  const profile = regimentProfiles[unit.id] ?? {};
  const sourceAlias = unit.imageAlias
    ?? unit.image?.replace(/\.[^.]+$/, "")
    ?? unit.id.replace("-scourge-of-aqshy", "");
  const imageAlias = imageAliases[sourceAlias] ?? sourceAlias;

  return {
    ...unit,
    image: `/images/units/hedonitas/${imageAlias}.webp`,
    details: {
      ...unit.details,
      regimentOptions: profile.options ?? [],
      canJoinRegimentAs: profile.canJoinAs ?? [],
    },
  };
});

const hedonites = {
  id: "hedonites",

  alliance: "chaos",

  name: "Hedonites of Slaanesh",

  image: "/images/factions/hedonites.webp",

  battleTraits,

  battleFormations,

  heroicTraits: [...heroicTraits, ...scourgeHeroicTraits],

  allConsumingObsessions,

  monsterTraits: [],

  artefacts,

  aqshyArtefacts: [],

  spellLores,

  prayerLores: [],

  manifestations,
  manifestationLoreName: "Manifestations of Depravity",

  terrain,

  units: completeUnits,

  armiesOfRenown,

  regimentsOfRenown,
};

export default hedonites;
