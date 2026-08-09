import hedonitesRegiments from "./hedonites/regimentsOfRenown.js";
import skavenRegiments from "./skaven/regimentsOfRenown.js";
import orrukRegiments from "./orrukWarclans/regimentsOfRenown.js";
import gloomspiteRegiments from "./gloomspite/regimentsOfRenown.js";
import citiesRegiments from "./cities/regimentsOfRenown.js";
import tzeentchRegiments from "./tzeentch/regimentsOfRenown.js";
import ossiarchRegiments from "./ossiarch/regimentsOfRenown.js";
import soulblightRegiments from "./soulblight/regimentsOfRenown.js";
import hashutRegiments from "./hashut/regimentsOfRenown.js";
import khorneRegiments from "./khorne/regimentsOfRenown.js";
import slavesRegiments from "./slaves/regimentsOfRenown.js";
import nurgleRegiments from "./nurgle/regimentsOfRenown.js";
import luminethRegiments from "./lumineth/regimentsOfRenown.js";
import daughtersRegiments from "./daughters/regimentsOfRenown.js";

const regimentsOfRenown = [
  ...hedonitesRegiments,
  ...skavenRegiments,
  ...orrukRegiments,
  ...gloomspiteRegiments,
  ...citiesRegiments,
  ...tzeentchRegiments,
  ...ossiarchRegiments,
  ...soulblightRegiments,
  ...hashutRegiments,
  ...khorneRegiments,
  ...slavesRegiments,
  ...nurgleRegiments,
  ...luminethRegiments,
  ...daughtersRegiments,
];

export function getEligibleRegimentsOfRenown(factionId) {
  return regimentsOfRenown.filter((regiment) =>
    Array.isArray(regiment.eligibleFactionIds)
      ? regiment.eligibleFactionIds.includes(factionId)
      : regiment.sourceFaction === factionId
  );
}

export default regimentsOfRenown;
