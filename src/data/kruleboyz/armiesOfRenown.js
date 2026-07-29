import { manifestations } from "../orrukWarclans/shared";

const footOfGork = manifestations.filter((item) => item.id === "foot-of-gork");

const menagerieRules = {
  battleTraits: [
    { id: "crawly-swarm", name: "Crawly Swarm", type: "Passive", description: "Subtract 1 from hit rolls for combat attacks that target Menagerie units wholly within 12\" of a friendly Menagerie Monster that did not charge this turn." },
    { id: "propa-grisly", name: "Propa Grisly", type: "Once Per Turn (Army)", phase: "Any Combat Phase", description: "Pick a Menagerie Monster that has not used a Rampage ability and an enemy unit in combat with it. Roll a number of dice equal to the Monster's Health characteristic; each 6+ inflicts 1 mortal damage. It cannot use any other Rampage abilities this turn." },
    { id: "after-it-ladz", name: "After It, Ladz!", type: "Once Per Turn (Army)", phase: "Your Movement Phase", description: "A Menagerie Monster that was not set up this turn can move up to 3\" and enter combat; if it was already in combat, it must end that move in combat." },
  ],
  battleFormations: [],
  heroicTraits: [{ id: "grim-diet", name: "Grim Diet", source: "Army of Renown", points: 0, description: "This unit has Ward (5+)." }],
  artefacts: [{ id: "skinwriggla-larvae", name: "Skinwriggla Larvae", source: "Army of Renown", points: 0, description: "Once per battle, infest an objective within 6\". Enemy units contesting it have -3 Control and ignore positive modifiers to their control scores." }],
  spellLores: [{ id: "morkish-mist-lore", name: "Morkish Mist", spells: [{ id: "morkish-mist", name: "Morkish Mist", type: "Spell", castingValue: 7, phase: "Your Hero Phase", keywords: ["Spell", "Unlimited"], description: "A visible Menagerie Infantry unit wholly within 12\" has Ward (5+) until the start of your next turn." }] }],
  prayerLores: [],
  manifestations: footOfGork,
  manifestationLores: [{ id: "menagerie-manifestations", name: "Foot of Gork", description: "Murkvast Menagerie can summon the Foot of Gork.", manifestations: footOfGork }],
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
    description: "Skumdrekk leads a collection of swamp monsters and their Kruleboyz handlers.",
  },
];

export default armiesOfRenown;
