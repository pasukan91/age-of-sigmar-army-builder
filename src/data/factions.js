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
import { normalizeFaction } from "./normalizeFaction";

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

  // ORDEN
  {
    id: "stormcast",
    alliance: "order",
    name: "Stormcast Eternals",
  },
  {
    id: "idoneth",
    alliance: "order",
    name: "Idoneth Deepkin",
  },
  {
    id: "lumineth",
    alliance: "order",
    name: "Lumineth Realm-lords",
  },
  {
    id: "daughters",
    alliance: "order",
    name: "Daughters of Khaine",
  },
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
  {
    id: "kharadron",
    alliance: "order",
    name: "Kharadron Overlords",
  },

  // MUERTE
  {
    id: "nighthaunt",
    alliance: "death",
    name: "Nighthaunt",
  },
  {
    id: "flesheater",
    alliance: "death",
    name: "Flesh-eater Courts",
  },

  // CAOS
  {
    id: "nurgle",
    alliance: "chaos",
    name: "Maggotkin of Nurgle",
  },
  {
    id: "std",
    alliance: "chaos",
    name: "Slaves to Darkness",
  },

  // DESTRUCCIÓN
  {
    id: "behemat",
    alliance: "destruction",
    name: "Sons of Behemat",
  },
].map(normalizeFaction);

export default factions;
