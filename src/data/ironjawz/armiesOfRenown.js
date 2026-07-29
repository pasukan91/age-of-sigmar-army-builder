import { manifestations } from "../orrukWarclans/shared";
import terrain from "./terrain";

const gorkRoara = manifestations.filter((item) => item.id === "gork-roara");

const ironmongerzRules = {
  battleTraits: [
    { id: "legendary-vandals", name: "Legendary Vandals", type: "Passive", description: "Melee weapons used by Ironmongerz units have Anti-Faction Terrain (+1 Rend) and Anti-War Machine (+1 Rend)." },
    { id: "into-da-breach", name: "Into Da Breach", type: "End of Any Turn", phase: "End of Any Turn", description: "An Ironmongerz unit that was damaged this turn and is not in combat can move D6\"; it must end more than 9\" from all enemy units." },
    { id: "ironclad-scrums", name: "Ironclad Scrums", type: "Passive", description: "Friendly Ardboyz units have Ward (5+) while they are close to another friendly Ardboyz unit." },
    { id: "shield-of-scrap-and-muscle", name: "Shield of Scrap and Muscle", type: "Passive", description: "Zoggrok has Ward (4+) while near friendly Ardboyz; each successful ward roll allocates 1 damage point to an eligible friendly Ardboyz unit." },
  ],
  battleFormations: [],
  heroicTraits: [{ id: "oi-back-to-it", name: "Oi! Back To It!", source: "Army of Renown", points: 0, description: "When a friendly Ardboyz or Brutes unit wholly within 12\" uses Rally, you can make 3 additional rally rolls." }],
  artefacts: [{ id: "da-great-wollopa", name: "Da Great Wollopa", source: "Army of Renown", points: 0, description: "If the bearer's attacks allocate damage to an enemy unit, it is krump'd until the start of your next turn: subtract 1 from its save rolls and ignore positive modifiers to its save rolls." }],
  spellLores: [{ id: "green-gods-hammer-lore", name: "The Green God's Hammer", spells: [{ id: "the-green-gods-hammer", name: "The Green God's Hammer", type: "Spell", castingValue: 7, phase: "Your Hero Phase", keywords: ["Spell", "Unlimited"], description: "A visible Ironmongerz Infantry unit wholly within 12\" rolls 1 additional charge dice, to a maximum of 3, until the start of your next turn." }] }],
  prayerLores: [{ id: "get-em-gork-lore", name: "Get 'Em, Gork!", prayers: [{ id: "get-em-gork", name: "Get 'Em, Gork!", chantingValue: 5, phase: "Your Hero Phase", keywords: ["Prayer", "Unlimited"], description: "On a chanting roll of 5-9, a visible terrain feature wholly within 12\" is stomped by Gork; on a 10+, the range is 18\". Roll a D3 each time an enemy unit ends a move within 6\" of terrain stomped by Gork." }] }],
  manifestations: gorkRoara,
  manifestationLores: [{ id: "ironmongerz-manifestations", name: "Gork-Roara", description: "Zoggrok's Ironmongerz can summon Gork-Roara.", manifestations: gorkRoara }],
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
    description: "Zoggrok's band of smiths and wreckers, focused on armoured Ironjawz infantry.",
  },
];

export default armiesOfRenown;
