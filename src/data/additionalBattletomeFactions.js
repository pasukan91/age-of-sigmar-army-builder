import catalogue from "./additionalBattletomeFactions.generated.json";

const factions = Object.fromEntries(
  catalogue.factions.map((faction) => [faction.id, faction])
);

export const stormcast = factions.stormcast;
export const idoneth = factions.idoneth;
export const kharadron = factions.kharadron;
export const nighthaunt = factions.nighthaunt;
export const flesheater = factions.flesheater;

export default catalogue.factions;
