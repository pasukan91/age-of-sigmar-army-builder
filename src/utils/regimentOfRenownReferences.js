const FACTION_NAMES = {
  behemat: "Sons of Behemat",
  cities: "Cities of Sigmar",
  daughters: "Daughters of Khaine",
  flesheater: "Flesh-eater Courts",
  fyreslayers: "Fyreslayers",
  gloomspite: "Gloomspite Gitz",
  hashut: "Helsmiths of Hashut",
  hedonites: "Hedonites of Slaanesh",
  idoneth: "Idoneth Deepkin",
  ironjawz: "Ironjawz",
  kharadron: "Kharadron Overlords",
  khorne: "Blades of Khorne",
  kruleboyz: "Kruleboyz",
  lumineth: "Lumineth Realm-lords",
  nighthaunt: "Nighthaunt",
  nurgle: "Maggotkin of Nurgle",
  ogors: "Ogor Mawtribes",
  ossiarch: "Ossiarch Bonereapers",
  seraphon: "Seraphon",
  skaven: "Skaven",
  soulblight: "Soulblight Gravelords",
  std: "Slaves to Darkness",
  stormcast: "Stormcast Eternals",
  sylvaneth: "Sylvaneth",
  tzeentch: "Disciples of Tzeentch",
};

export function getRegimentOrganisation(regiment) {
  if (Array.isArray(regiment?.organisation)) return regiment.organisation;
  if (Array.isArray(regiment?.units)) return regiment.units;
  if (Array.isArray(regiment?.unitIds)) return regiment.unitIds;
  return [];
}

export function getRegimentEligibleFactionNames(regiment) {
  return (regiment?.eligibleFactionIds ?? []).map(
    (factionId) => FACTION_NAMES[factionId] ?? factionId,
  );
}

export function getRegimentSourceFactionName(regiment) {
  return FACTION_NAMES[regiment?.sourceFaction] ?? regiment?.sourceFaction ?? null;
}

export function createRegimentOfRenownReference(regiment) {
  return {
    kind: "regimentOfRenown",
    item: regiment,
    sourceName: getRegimentSourceFactionName(regiment),
  };
}
