import orrukWarclans from "./orrukWarclans";
import hedonites from "./hedonites";
import skaven from "./skaven";
import ogors from "./ogors";
import sylvaneth from "./sylvaneth";

const [kruleboyz, ironjawz] = orrukWarclans.armyTypes;

const factions = [
  kruleboyz,
  ironjawz,
  hedonites,
  skaven,
  ogors,
  sylvaneth,

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
    id: "cities",
    alliance: "order",
    name: "Cities of Sigmar",
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
    id: "soulblight",
    alliance: "death",
    name: "Soulblight Gravelords",
  },
  {
    id: "ossiarch",
    alliance: "death",
    name: "Ossiarch Bonereapers",
  },
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
    id: "hashut",
    alliance: "chaos",
    name: "Disciples of Hashut",
  },
  {
    id: "tzeentch",
    alliance: "chaos",
    name: "Disciples of Tzeentch",
  },
  {
    id: "nurgle",
    alliance: "chaos",
    name: "Maggotkin of Nurgle",
  },
  {
    id: "khorne",
    alliance: "chaos",
    name: "Blades of Khorne",
  },
  {
    id: "std",
    alliance: "chaos",
    name: "Slaves to Darkness",
  },

  // DESTRUCCIÓN
  {
    id: "gloomspite",
    alliance: "destruction",
    name: "Gloomspite Gitz",
  },
  {
    id: "behemat",
    alliance: "destruction",
    name: "Sons of Behemat",
  },
];

export default factions;
