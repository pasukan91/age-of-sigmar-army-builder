import { manifestations } from "../orrukWarclans/shared";
import terrain from "./terrain";

const gorkRoara = manifestations.filter((item) => item.id === "gork-roara");

const ironmongerzRules = {
  battleTraits: [
    { id: "legendary-vandals", name: "Legendary Vandals", type: "Passive", description: "Las armas cuerpo a cuerpo de las unidades Ironmongerz tienen Anti-Faction Terrain (+1 Rend) y Anti-War Machine (+1 Rend)." },
    { id: "into-da-breach", name: "Into Da Breach", type: "End of Any Turn", phase: "End of Any Turn", description: "Una unidad Ironmongerz que haya sufrido daño este turno y no esté en combate puede mover D6\"; debe terminar a más de 9\" de los enemigos." },
    { id: "ironclad-scrums", name: "Ironclad Scrums", type: "Passive", description: "Las unidades Ardboyz amigas tienen Ward (5+) mientras estén cerca de otra unidad Ardboyz amiga." },
    { id: "shield-of-scrap-and-muscle", name: "Shield of Scrap and Muscle", type: "Passive", description: "Zoggrok tiene Ward (4+) junto a Ardboyz amigos; cada salvaguarda superada asigna 1 punto de daño a una unidad Ardboyz amiga elegible." },
  ],
  battleFormations: [],
  heroicTraits: [{ id: "oi-back-to-it", name: "Oi! Back To It!", source: "Army of Renown", points: 0, description: "Cuando una unidad Ardboyz o Brutes amiga totalmente a 12\" usa Rally, puedes hacer 3 tiradas de rally adicionales." }],
  artefacts: [{ id: "da-great-wollopa", name: "Da Great Wollopa", source: "Army of Renown", points: 0, description: "Si los ataques del portador asignan daño a un enemigo, queda krump'd hasta tu siguiente turno: -1 a sus salvaciones e ignora sus modificadores positivos a la salvación." }],
  spellLores: [{ id: "green-gods-hammer-lore", name: "The Green God's Hammer", spells: [{ id: "the-green-gods-hammer", name: "The Green God's Hammer", type: "Spell", castingValue: 7, phase: "Your Hero Phase", keywords: ["Spell", "Unlimited"], description: "Una unidad Ironmongerz Infantry visible y totalmente a 12\" tira 1 dado adicional para sus cargas, hasta un máximo de 3, hasta tu siguiente turno." }] }],
  prayerLores: [{ id: "get-em-gork-lore", name: "Get 'Em, Gork!", prayers: [{ id: "get-em-gork", name: "Get 'Em, Gork!", chantingValue: 5, phase: "Your Hero Phase", keywords: ["Prayer", "Unlimited"], description: "Con 5-9, un terreno visible totalmente a 12\" queda pisoteado por Gork; con 10+, el alcance es 18\". Cuando un enemigo inicia o termina un movimiento a 6\", un 2+ le causa el daño mortal obtenido en D3." }] }],
  manifestations: gorkRoara,
  manifestationLores: [{ id: "ironmongerz-manifestations", name: "Gork-Roara", description: "Zoggrok's Ironmongerz puede invocar Gork-Roara.", manifestations: gorkRoara }],
  terrain,
};

const armiesOfRenown = [
  {
    id: "zoggroks-ironmongerz",
    name: "Zoggrok's Ironmongerz",
    requiredUnits: ["zoggrok-anvilsmasha"],
    excludesRegimentsOfRenown: true,
    rules: ironmongerzRules,
    roster: ["Zoggrok Anvilsmasha", "Ironjawz Infantry", "Ardboyz"],
    description: "La banda de herreros y demoledores de Zoggrok, centrada en infantería acorazada Ironjawz.",
  },
];

export default armiesOfRenown;
