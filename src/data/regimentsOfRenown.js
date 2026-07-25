import hedonitesRegiments from "./hedonites/regimentsOfRenown";
import skavenRegiments from "./skaven/regimentsOfRenown";
import orrukRegiments from "./orrukWarclans/regimentsOfRenown";
import gloomspiteRegiments from "./gloomspite/regimentsOfRenown";

const regimentsOfRenown = [
  ...hedonitesRegiments,
  ...skavenRegiments,
  ...orrukRegiments,
  ...gloomspiteRegiments,
];

export function getEligibleRegimentsOfRenown(factionId) {
  return regimentsOfRenown.filter((regiment) =>
    Array.isArray(regiment.eligibleFactionIds)
      ? regiment.eligibleFactionIds.includes(factionId)
      : regiment.sourceFaction === factionId
  );
}

export default regimentsOfRenown;
