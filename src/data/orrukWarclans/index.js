import baseIronjawz from "../ironjawz";
import baseKruleboyz from "../kruleboyz";

const footOfGork = baseKruleboyz.manifestations.filter((item) => item.id === "foot-of-gork");

const combinedUnits = [...baseIronjawz.units, ...baseKruleboyz.units].filter(
  (unit, index, units) => units.findIndex((candidate) => candidate.id === unit.id) === index
);

const bigWaaaghRules = {
  units: combinedUnits,
  battleTraits: [
    { id: "notorious-bosses", name: "Notorious Bosses", type: "Once Per Battle", phase: "Deployment Phase", description: "Pick up to 1 non-Unique Ironjawz Hero and up to 1 non-Unique Kruleboyz Hero that do not have a heroic trait. Give each target 1 Big Waaagh! heroic trait." },
    { id: "power-of-the-waaagh", name: "The Power of the Waaagh!", type: "Once Per Turn (Army)", phase: "Your Hero Phase", description: "Pick up to 1 Big Waaagh! Ironjawz unit and up to 1 Big Waaagh! Kruleboyz unit. They gain the Power of the Waaagh! keyword for the rest of the battle round." },
    { id: "possessed-by-power", name: "Possessed by the Power of the Waaagh!", type: "Passive", description: "Units with Power of the Waaagh! add 1 to run and charge rolls if they are Ironjawz; if they are Kruleboyz, their attacks score critical hits on unmodified hit rolls of 5+." },
    { id: "rally-warclans", name: "Rally the Warclans", type: "Once Per Turn (Army)", phase: "Your Movement Phase", description: "If your general is on the battlefield, pick a destroyed Big Waaagh! unit that started the battle with 3 or more models. Set up a replacement unit with half the number of models wholly within 12\" of your general and more than 9\" from all enemy units." },
  ],
  battleFormations: [],
  heroicTraits: [
    { id: "takin-names", name: "Takin' Names", source: "Army of Renown", points: 0, description: "If this unit destroys an enemy Hero, it gains Power of the Waaagh! for the rest of the battle." },
    { id: "a-proper-sneak", name: "A Proper Sneak", source: "Army of Renown", points: 0, description: "Once per battle, if this unit has Power of the Waaagh! and another Brutal Kunnin' ability has not been used this turn, Big Waaagh! units wholly within 12\" have Ward (5+) for the battle round." },
    { id: "da-old-one-two", name: "Da Old One-Two", source: "Army of Renown", points: 0, description: "Once per battle, if this unit has Power of the Waaagh! and another Brutal Kunnin' ability has not been used this turn, combat weapons used by Big Waaagh! units wholly within 12\" gain Crit (2 Hits) for the battle round." },
    { id: "get-krumpin", name: "Get Krumpin'!", source: "Army of Renown", points: 0, description: "Once per battle, if this unit has Power of the Waaagh! and another Brutal Kunnin' ability has not been used this turn, add 1 to wound rolls for combat attacks made by Big Waaagh! units wholly within 12\" for the battle round." },
  ],
  artefacts: [{ id: "da-sneaky-stab-slab", name: "Da Sneaky Stab-slab", source: "Army of Renown", points: 0, description: "Each unmodified save roll of 6 against a combat attack inflicts 1 mortal damage on the attacking unit after its Fight ability is resolved." }],
  spellLores: [{ id: "two-headz-as-one-lore", name: "Two Headz as One", spells: [{ id: "two-headz-as-one", name: "Two Headz as One", type: "Spell", castingValue: 7, phase: "Your Hero Phase", keywords: ["Spell", "Unlimited"], description: "Pick a friendly Infantry unit within 12\". If it is Ironjawz, add 3 to its control score while it is within 12\" of friendly Kruleboyz; if it is Kruleboyz, add 2\" to its Move while it is within 12\" of friendly Ironjawz, until the start of your next turn." }] }],
  prayerLores: [{ id: "unstoppable-waaagh-beats-lore", name: "Unstoppable Waaagh!-beats", prayers: [{ id: "unstoppable-waaagh-beats", name: "Unstoppable Waaagh!-beats", chantingValue: 4, phase: "Your Hero Phase", keywords: ["Prayer"], description: "A non-Hero Infantry unit in combat can use two Fight abilities this turn; after the first it has Strike-last. On a chanting roll of 10+, pick a second eligible target." }] }],
  manifestations: footOfGork,
  manifestationLores: [{ id: "big-waaagh-manifestations", name: "Foot of Gork", description: "The Big Waaagh! can summon the Foot of Gork.", manifestations: footOfGork }],
  terrain: [],
};

const bigWaaagh = {
  id: "big-waaagh",
  name: "Big Waaagh!",
  excludesRegimentsOfRenown: true,
  excludesFactionTerrain: true,
  rules: bigWaaaghRules,
  roster: ["Kruleboyz Heroes can only include Kruleboyz units in their regiment", "Ironjawz Heroes can only include Ironjawz units in their regiment", "The same number of regiments must be led by each warclan", "Kragnos can include units from one warclan or the other, but not both, and counts as a Hero from that warclan"],
  description: "A combined Ironjawz and Kruleboyz force with its own Waaagh! rules.",
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
