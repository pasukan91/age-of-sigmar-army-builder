import hedonitesRegiments from "./hedonites/regimentsOfRenown";
import skavenRegiments from "./skaven/regimentsOfRenown";
import orrukRegiments from "./orrukWarclans/regimentsOfRenown";

const regimentsOfRenown = [
  ...hedonitesRegiments,
  ...skavenRegiments,
  ...orrukRegiments,
];

export function getEligibleRegimentsOfRenown(factionId) {
  return regimentsOfRenown.filter((regiment) =>
    regiment.sourceFaction === factionId
  );
}

export default regimentsOfRenown;
