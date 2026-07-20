import hedonitesRegiments from "./hedonites/regimentsOfRenown";

const regimentsOfRenown = [...hedonitesRegiments];

export function getEligibleRegimentsOfRenown(factionId) {
  return regimentsOfRenown.filter((regiment) =>
    regiment.eligibleFactionIds.includes(factionId)
  );
}

export default regimentsOfRenown;
