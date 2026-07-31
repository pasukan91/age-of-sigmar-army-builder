import units from "./units";
import scourgeUnits from "./scourgeOfAqshy";
import manifestations from "./manifestations";
import terrain from "./terrain";
import armiesOfRenown from "./armiesOfRenown";
import {
  artefacts,
  battleFormations,
  battleTraits,
  flawlessManoeuvres,
  heroicTraits,
  manifestationLores,
  spellLores,
} from "./rules";

const imageNames = {
  "archmage-teclis-and-celennar-spirit-of-hysh": "teclis.jpg",
  "avalenor-the-stoneheart-king": "avalenor.jpg",
  "ellania-and-ellathor-eclipsian-warsages": "EllaniaEllathor.jpg",
  "hurakan-windmage": "hurakanWindmage.jpg",
  "lyrior-uthralle-warden-of-ymetrica": "LyriorUthralle.jpg",
  "scinari-calligrave": "scinaricalligrave.jpg",
  "scinari-cathallar": "ScinariCathallar.jpg",
  "scinari-enlightener": "scinarienlightener.jpg",
  "scinari-loreseeker": "ScinariLoreseeker.jpg",
  "sevireth-lord-of-the-seventh-wind": "Sevireth.jpg",
  "the-light-of-eltharion": "LightEltharion.jpg",
  "vanari-bannerblade": "vanariBannerbladeLead.jpg",
  "vanari-lord-regent": "VanariLordRegent.jpg",
  "vanari-lord-regent-on-lightcourser": "VanariLordRegentonLightcourser.jpg",
  "alarith-spirit-of-the-mountain": "AlarithSpirit.jpg",
  "alarith-stoneguard": "alarithstoneguard.jpg",
  "alarith-stonemage": "AlarithStonemage.jpg",
  "hurakan-spirit-of-the-wind": "SpiritofWind.jpg",
  "hurakan-windchargers": "hurakanwindchargers.jpg",
  "vanari-auralan-sentinels": "vanariauralansentinels.jpg",
  "vanari-auralan-wardens": "vanariauralanwardens.jpg",
  "vanari-bladelords": "vanaribladelords.jpg",
  "vanari-dawnriders": "vanaridawnriders.jpg",
  "vanari-starshard-ballista": "VanariStarshardBallista.jpg",
  "ydrilan-riverblades": "ydrilan.jpg",
};

const withImage = (unit) => {
  const baseId = unit.id
    .replace("-scourge-of-aqshy", "");
  const filename =
    imageNames[baseId] ??
    imageNames[unit.imageAlias];

  return filename
    ? { ...unit, image: `/images/units/lumineth/${filename}` }
    : unit;
};

const manifestationImages = {
  "hyshian-twinstones": "hyshian_twinstones.jpg",
  "sanctum-of-amyntok": "sanctumamyntok.jpg",
  "rune-of-petrification": "runeofpetrification.jpg",
};

const completeManifestations = manifestations.map((manifestation) => ({
  ...manifestation,
  image: `/images/units/lumineth/${manifestationImages[manifestation.id]}`,
}));

const completeManifestationLores = manifestationLores.map((lore) => ({
  ...lore,
  manifestations: completeManifestations,
}));

const allUnits = [...units, ...scourgeUnits].map(withImage);
const completeArmiesOfRenown = armiesOfRenown.map((army) => ({
  ...army,
  rules: {
    ...army.rules,
    units: allUnits.filter(army.unitFilter),
    manifestations:
      army.id === "aelementiri-conclave" ? completeManifestations : [],
  },
}));

const lumineth = {
  id: "lumineth",
  alliance: "order",
  name: "Lumineth Realm-lords",
  image: "/images/factions/lumineth.webp",
  battleTraits,
  battleFormations,
  heroicTraits,
  artefacts,
  flawlessManoeuvres,
  flawlessManoeuvreLabel: "Flawless Manoeuvre",
  spellLores,
  manifestations: completeManifestations,
  manifestationLores: completeManifestationLores,
  terrain,
  units: allUnits,
  armiesOfRenown: completeArmiesOfRenown,
  regimentsOfRenown: [],
};

export default lumineth;
