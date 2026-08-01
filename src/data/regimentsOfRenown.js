import hedonitesRegiments from "./hedonites/regimentsOfRenown";
import skavenRegiments from "./skaven/regimentsOfRenown";
import orrukRegiments from "./orrukWarclans/regimentsOfRenown";
import gloomspiteRegiments from "./gloomspite/regimentsOfRenown";
import citiesRegiments from "./cities/regimentsOfRenown";
import tzeentchRegiments from "./tzeentch/regimentsOfRenown";
import ossiarchRegiments from "./ossiarch/regimentsOfRenown";
import soulblightRegiments from "./soulblight/regimentsOfRenown";
import hashutRegiments from "./hashut/regimentsOfRenown";
import khorneRegiments from "./khorne/regimentsOfRenown";
import slavesRegiments from "./slaves/regimentsOfRenown";
import nurgleRegiments from "./nurgle/regimentsOfRenown";
import luminethRegiments from "./lumineth/regimentsOfRenown";
import daughtersRegiments from "./daughters/regimentsOfRenown";

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
