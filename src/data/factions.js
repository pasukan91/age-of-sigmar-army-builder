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
import {
  flesheater,
  idoneth,
  kharadron,
  nighthaunt,
  stormcast,
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
].map((faction) => {
  const addedArmies = (armiesOfRenownByFaction[faction.id] ?? []).map(
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

  return normalizeFaction({
    ...faction,
    armiesOfRenown: [
      ...(faction.armiesOfRenown ?? []),
      ...addedArmies,
    ],
  });
});

export default factions;
