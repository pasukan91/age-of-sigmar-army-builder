import battleTraits from "./battleTraits";
import battleFormations from "./battleFormations";
import heroicTraits from "./heroicTraits";
import monsterTraits from "./monsterTraits";
import artefacts from "./artefacts";
import spellLores from "./spellLores";
import manifestations from "./manifestations";
import terrain from "./terrain";
import units from "./units";
import missingUnits from "./missingUnits";
import regimentProfiles from "./regimentProfiles";
import armiesOfRenown from "./armiesOfRenown";
import regimentsOfRenown from "./regimentsOfRenown";

const completeUnits = [...units, ...missingUnits].map((unit) => {
  const profile = regimentProfiles[unit.id] ?? {};

  return {
    ...unit,
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

  battleTraits,

  battleFormations,

  heroicTraits,

  monsterTraits,

  artefacts,

  aqshyArtefacts: [],

  spellLores,

  prayerLores: [],

  manifestations,

  terrain,

  units: completeUnits,

  armiesOfRenown,

  regimentsOfRenown,
};

export default hedonites;
