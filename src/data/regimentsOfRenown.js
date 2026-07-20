import hedonitesRegiments from "./hedonites/regimentsOfRenown";
import skavenRegiments from "./skaven/regimentsOfRenown";

const regimentsOfRenown = [
  ...hedonitesRegiments,
  ...skavenRegiments,
];

export function getEligibleRegimentsOfRenown(factionId) {
  return regimentsOfRenown.filter((regiment) =>
    regiment.eligibleFactionIds.includes(factionId)
  );
}

export default regimentsOfRenown;
