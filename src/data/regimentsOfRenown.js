import catalogue from "./regimentsOfRenown.generated.json" with { type: "json" };

const regimentsOfRenown = catalogue.regiments;

export function getEligibleRegimentsOfRenown(factionId) {
  return regimentsOfRenown.filter((regiment) =>
    Array.isArray(regiment.eligibleFactionIds)
      ? regiment.eligibleFactionIds.includes(factionId)
      : regiment.sourceFaction === factionId
  );
}

export default regimentsOfRenown;
