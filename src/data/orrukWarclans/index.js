import baseIronjawz from "../ironjawz";
import baseKruleboyz from "../kruleboyz";

const footOfGork = baseKruleboyz.manifestations.filter((item) => item.id === "foot-of-gork");

const combinedUnits = [...baseIronjawz.units, ...baseKruleboyz.units].filter(
  (unit, index, units) => units.findIndex((candidate) => candidate.id === unit.id) === index
);

const bigWaaaghRules = {
  units: combinedUnits,
  battleTraits: [
    { id: "notorious-bosses", name: "Notorious Bosses", type: "Once Per Battle", phase: "Deployment Phase", description: "Elige hasta 1 Hero Ironjawz no único y hasta 1 Hero Kruleboyz no único que no tengan rasgo heroico. Da a cada objetivo 1 rasgo heroico de la Big Waaagh!." },
    { id: "power-of-the-waaagh", name: "The Power of the Waaagh!", type: "Once Per Turn (Army)", phase: "Your Hero Phase", description: "Elige hasta 1 unidad Big Waaagh! Ironjawz y hasta 1 unidad Big Waaagh! Kruleboyz. Obtienen la keyword Power of the Waaagh! durante el resto de la ronda." },
    { id: "possessed-by-power", name: "Possessed by the Power of the Waaagh!", type: "Passive", description: "Las unidades con Power of the Waaagh! obtienen +1 a correr y cargar si son Ironjawz; si son Kruleboyz, sus ataques consiguen impactos críticos con resultados sin modificar de 5+." },
    { id: "rally-warclans", name: "Rally the Warclans", type: "Once Per Turn (Army)", phase: "Your Movement Phase", description: "Si tu general está en el campo, elige una unidad Big Waaagh! destruida que empezó la batalla con 3+ miniaturas. Despliega una unidad de reemplazo con la mitad de sus miniaturas, totalmente a 12\" del general y a más de 9\" del enemigo." },
  ],
  battleFormations: [],
  heroicTraits: [
    { id: "takin-names", name: "Takin' Names", source: "Army of Renown", points: 0, description: "Si esta unidad destruye un Hero enemigo, obtiene Power of the Waaagh! durante el resto de la batalla." },
    { id: "a-proper-sneak", name: "A Proper Sneak", source: "Army of Renown", points: 0, description: "Una vez por batalla, si tiene Power of the Waaagh! y no se ha usado otra Brutal Kunnin' este turno, las unidades Big Waaagh! totalmente a 12\" obtienen Ward (5+) durante la ronda." },
    { id: "da-old-one-two", name: "Da Old One-Two", source: "Army of Renown", points: 0, description: "Una vez por batalla, si tiene Power of the Waaagh! y no se ha usado otra Brutal Kunnin' este turno, las armas de combate Big Waaagh! totalmente a 12\" obtienen Crit (2 Hits) durante la ronda." },
    { id: "get-krumpin", name: "Get Krumpin'!", source: "Army of Renown", points: 0, description: "Una vez por batalla, si tiene Power of the Waaagh! y no se ha usado otra Brutal Kunnin' este turno, +1 a herir con ataques de combate Big Waaagh! totalmente a 12\" durante la ronda." },
  ],
  artefacts: [{ id: "da-sneaky-stab-slab", name: "Da Sneaky Stab-slab", source: "Army of Renown", points: 0, description: "Cada salvación sin modificar de 6 contra un ataque de combate inflige 1 daño mortal a la unidad atacante después de resolver su Fight." }],
  spellLores: [{ id: "two-headz-as-one-lore", name: "Two Headz as One", spells: [{ id: "two-headz-as-one", name: "Two Headz as One", type: "Spell", castingValue: 7, phase: "Your Hero Phase", keywords: ["Spell"], description: "Elige una unidad Infantry amiga a 12\". Si es Ironjawz, obtiene +3 Control mientras esté a 12\" de Kruleboyz amigos; si es Kruleboyz, obtiene +2\" Move mientras esté a 12\" de Ironjawz amigos, hasta tu siguiente turno." }] }],
  prayerLores: [{ id: "unstoppable-waaagh-beats-lore", name: "Unstoppable Waaagh!-beats", prayers: [{ id: "unstoppable-waaagh-beats", name: "Unstoppable Waaagh!-beats", chantingValue: 4, phase: "Your Hero Phase", keywords: ["Prayer"], description: "Una unidad Infantry no Hero en combate puede usar 2 Fight este turno; tras la primera obtiene Strike-last. Con 10+, elige un segundo objetivo elegible." }] }],
  manifestations: footOfGork,
  manifestationLores: [{ id: "big-waaagh-manifestations", name: "Foot of Gork", description: "La Big Waaagh! puede invocar el Foot of Gork.", manifestations: footOfGork }],
  terrain: [],
};

const bigWaaagh = {
  id: "big-waaagh",
  name: "Big Waaagh!",
  excludesRegimentsOfRenown: true,
  excludesFactionTerrain: true,
  rules: bigWaaaghRules,
  roster: ["Ironjawz units", "Kruleboyz units", "El mismo número de regimientos liderados por cada warclan"],
  description: "Una fuerza combinada de Ironjawz y Kruleboyz con sus propias reglas de Waaagh!.",
};

const ironjawz = { ...baseIronjawz, armiesOfRenown: [bigWaaagh, ...(baseIronjawz.armiesOfRenown ?? [])] };
const kruleboyz = { ...baseKruleboyz, armiesOfRenown: [bigWaaagh, ...(baseKruleboyz.armiesOfRenown ?? [])] };

const orrukWarclans = {
  id: "orruk-warclans",
  alliance: "destruction",
  name: "Orruk Warclans",
  armyTypes: [kruleboyz, ironjawz],
};

export default orrukWarclans;
