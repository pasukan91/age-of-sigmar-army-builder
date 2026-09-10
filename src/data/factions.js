import orrukWarclans from "./orrukWarclans";
import hedonites from "./hedonites";
import skaven from "./skaven";
import ogors from "./ogors";
import sylvaneth from "./sylvaneth";
import gloomspite from "./gloomspite";
import cities from "./cities";
import tzeentch from "./tzeentch";
import ossiarch from "./ossiarch";
import soulblight from "./soulblight";
import hashut from "./hashut";
import khorne from "./khorne";
import slaves from "./slaves";
import nurgle from "./nurgle";
import lumineth from "./lumineth";
import daughters from "./daughters";
import armiesOfRenownByFaction from "./rulesOfRenownArmies";
import { normalizeFaction } from "./normalizeFaction";
import { applyAosCommunityFactionData } from "./applyAosCommunityFactionData";
import {
  flesheater,
  idoneth,
  kharadron,
  nighthaunt,
  stormcast,
  universalManifestationLores,
  universalManifestations,
} from "./additionalBattletomeFactions";

const [kruleboyz, ironjawz] = orrukWarclans.armyTypes;

const factions = [
  kruleboyz,
  ironjawz,
  hedonites,
  skaven,
  ogors,
  sylvaneth,
  gloomspite,
  cities,
  tzeentch,
  ossiarch,
  soulblight,
  hashut,
  khorne,
  slaves,
  nurgle,
  lumineth,
  daughters,

  // ORDEN
  stormcast,
  idoneth,
  {
    id: "seraphon",
    alliance: "order",
    name: "Seraphon",
  },
  {
    id: "fyreslayers",
    alliance: "order",
    name: "Fyreslayers",
  },
  kharadron,

  // MUERTE
  nighthaunt,
  flesheater,

  // CAOS
  // DESTRUCCIÓN
  {
    id: "behemat",
    alliance: "destruction",
    name: "Sons of Behemat",
  },
].map((localFaction) => {
  const faction = applyAosCommunityFactionData(localFaction);
  const mergeUnique = (items) => [
    ...new Map(items.map((item) => [item?.sourceId ?? item?.id ?? item?.name, item])).values(),
  ];
  const withUniversalManifestations = (rules = {}) => ({
    ...rules,
    manifestations: mergeUnique([
      ...(rules.manifestations ?? []),
      ...universalManifestations,
    ]),
    manifestationLores: mergeUnique([
      ...(rules.manifestationLores ?? []),
      ...universalManifestationLores,
    ]),
  });
  const addedArmies = (
    faction.catalogueDataVersion
      ? []
      : armiesOfRenownByFaction[faction.id] ?? []
  ).map(
    ({ unitFilter, ...renownArmy }) => ({
      ...renownArmy,
      rules: {
        ...renownArmy.rules,
        units: unitFilter
          ? (faction.units ?? []).filter(unitFilter)
          : (faction.units ?? []),
      },
    })
  );

  const armiesByName = new Map();
  [...addedArmies, ...(faction.armiesOfRenown ?? [])].forEach((army) => {
    armiesByName.set(String(army.name ?? army.id).toLowerCase(), {
      ...army,
      rules: withUniversalManifestations(army.rules),
    });
  });

  return normalizeFaction({
    ...withUniversalManifestations(faction),
    armiesOfRenown: [...armiesByName.values()],
  });
});

const kruleboyzFaction = factions.find((faction) => faction.id === "kruleboyz");
const ironjawzFaction = factions.find((faction) => faction.id === "ironjawz");
if (kruleboyzFaction && ironjawzFaction) {
  kruleboyzFaction.regimentAllies = ironjawzFaction.units;
  ironjawzFaction.regimentAllies = kruleboyzFaction.units;
}

export default factions;
