import { manifestations } from "../orrukWarclans/shared";

const footOfGork = manifestations.filter((item) => item.id === "foot-of-gork");

const menagerieRules = {
  battleTraits: [
    { id: "crawly-swarm", name: "Crawly Swarm", type: "Passive", description: "-1 a impactar con ataques de combate contra unidades Menagerie totalmente a 12\" de un Monster Menagerie amigo que no haya cargado este turno." },
    { id: "propa-grisly", name: "Propa Grisly", type: "Once Per Turn (Army)", phase: "Any Combat Phase", description: "Elige un Monster Menagerie que no haya usado Rampage y un enemigo en combate. Tira tantos dados como la Health del Monster; cada 6+ causa 1 daño mortal. Después no puede usar más Rampages este turno." },
    { id: "after-it-ladz", name: "After It, Ladz!", type: "Once Per Turn (Army)", phase: "Your Movement Phase", description: "Un Monster Menagerie que no se haya desplegado este turno puede mover hasta 3\" y entrar en combate; si ya estaba en combate, debe acabar en combate." },
  ],
  battleFormations: [],
  heroicTraits: [{ id: "grim-diet", name: "Grim Diet", source: "Army of Renown", points: 0, description: "Esta unidad tiene Ward (5+)." }],
  artefacts: [{ id: "skinwriggla-larvae", name: "Skinwriggla Larvae", source: "Army of Renown", points: 0, description: "Una vez por batalla, infesta un objetivo a 6\". Los enemigos que lo disputan tienen -3 Control e ignoran sus modificadores positivos a Control." }],
  spellLores: [{ id: "morkish-mist-lore", name: "Morkish Mist", spells: [{ id: "morkish-mist", name: "Morkish Mist", type: "Spell", castingValue: 7, phase: "Your Hero Phase", keywords: ["Spell", "Unlimited"], description: "Una unidad Menagerie Infantry visible y totalmente a 12\" obtiene Ward (5+) hasta tu siguiente turno." }] }],
  prayerLores: [],
  manifestations: footOfGork,
  manifestationLores: [{ id: "menagerie-manifestations", name: "Foot of Gork", description: "Murkvast Menagerie puede invocar el Foot of Gork.", manifestations: footOfGork }],
  terrain: [],
};

const armiesOfRenown = [
  {
    id: "murkvast-menagerie",
    name: "Murkvast Menagerie",
    requiredUnits: ["swampboss-skumdrekk"],
    excludesRegimentsOfRenown: true,
    excludesFactionTerrain: true,
    rules: menagerieRules,
    roster: ["Swampboss Skumdrekk", "Kruleboyz Monsters", "Swampcalla Shaman", "Non-Hero Kruleboyz Infantry"],
    description: "Skumdrekk conduce una colección de monstruos del pantano y sus cuidadores Kruleboyz.",
  },
];

export default armiesOfRenown;
