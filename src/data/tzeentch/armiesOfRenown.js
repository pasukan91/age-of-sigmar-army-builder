const shiftingManifestations = {
  id: "shifting-manifestations", name: "Shifting Manifestations", castingValue: 6,
  description: "Pick an unfielded Burning Sigil, Daemonic Simulacrum or Tome of Eyes. Banish any currently fielded manifestation from this list, then set up the chosen one within 1\" of the caster and visible.",
};

const changeCultRules = {
  battleTraits: [
    { id: "cult-silver-simulacrum", name: "Silver Simulacrum", type: "Once Per Battle (Army)", phase: "Deployment Phase", description: "Set up an additional Argent Shard wholly within friendly territory, more than 3\" from objectives and other terrain." },
    { id: "illusory-infiltration", name: "Illusory Infiltration", type: "Once Per Battle (Army)", phase: "Deployment Phase", description: "Remove up to 3 friendly non-reinforced Change-cult Kairic Acolyte units and set them up wholly within 3\" of terrain and out of combat." },
    { id: "puppet-on-a-string", name: "Puppet on a String", type: "Once Per Turn (Army)", phase: "Any Hero Phase", description: "Pick an enemy Hero within 24\" and visible to a friendly Change-cult Hero. Each time it uses a Core ability this turn, gain 1 fate point." },
    { id: "overtaken-by-events", name: "Overtaken by Events", type: "Once Per Turn (Army)", phase: "Any Hero Phase", description: "Spend 1 fate point. An enemy within 24\" and visible to a friendly Change-cult Hero cannot use commands for the rest of the turn." },
    { id: "seeds-of-discord", name: "Seeds of Discord", type: "Once Per Turn (Army)", phase: "End of Any Turn", description: "Spend 1 fate point. Pick an enemy model within 24\" and visible to a friendly Change-cult Hero, then immediately resolve one of its melee weapons against another enemy in its combat range." },
  ],
  battleFormations: [],
  heroicTraits: [{ id: "call-of-anarchy", name: "Call of Anarchy", points: 0, source: "Army of Renown", description: "Set up a masked friendly non-Hero Change-cult unit near terrain and more than 6\" from enemies, or return a destroyed one at half strength in that position." }],
  artefacts: [{ id: "spell-eater-pendant", name: "Spell-eater Pendant", points: 0, source: "Army of Renown", description: "Each time this unit unbinds a spell or banishes an enemy Manifestation, gain 1 fate point." }],
  spellLores: [{ id: "change-cult-lore", name: "Eldritch Strength", spells: [{ id: "eldritch-strength", name: "Eldritch Strength", castingValue: 6, keywords: ["Unlimited"], description: "A visible friendly Change-cult unit wholly within 12\" adds 1 to wound rolls for its attacks until your next turn." }] }],
  manifestationLores: [{ id: "change-cult-manifestations", name: "Shifting Manifestations", manifestations: [], description: shiftingManifestations.description }],
  terrain: [],
};

const oraclesRules = {
  battleTraits: [
    { id: "masters-of-destiny", name: "Masters of Destiny", type: "Deployment Phase", phase: "Deployment Phase", description: "Roll 9 destiny dice. Spend them instead of eligible casting, unbinding, banishment, run, charge, hit, wound and save rolls; spend the required number of dice for multi-die rolls." },
    { id: "ninefold-blessings", name: "Ninefold Blessings", type: "Once Per Battle Round", phase: "Start of Your Turn", description: "If the total of your unspent destiny dice is exactly 9, re-roll all of them. Until your next turn, friendly Oracles have Ward (5+) and enemy units subtract 1 from save rolls." },
  ],
  battleFormations: [],
  heroicTraits: [{ id: "nexus-of-fate", name: "Nexus of Fate", points: 0, source: "Army of Renown", description: "Roll a die. If you already have 9 destiny dice, replace one; otherwise add the roll as a destiny die." }],
  artefacts: [{ id: "corrupted-leystone", name: "Corrupted Leystone", points: 0, source: "Army of Renown", description: "If contesting an objective, reposition this unit contesting another objective and more than 7\" from enemies." }],
  spellLores: [{ id: "oracles-lore", name: "Fateweaver's Gift", spells: [{ id: "fateweavers-gift", name: "Fateweaver's Gift", castingValue: 6, description: "Choose: mortal damage against an enemy in combat; +1 run and charge for nearby friendly Oracles; or roll and replace a destiny die." }] }],
  manifestationLores: [{ id: "oracles-manifestations", name: "Shifting Manifestations", manifestations: [], description: shiftingManifestations.description }],
  terrain: [],
};

const armiesOfRenown = [
  {
    id: "change-cult-uprising", name: "Change-cult Uprising", requiredUnits: [], excludesRegimentsOfRenown: true,
    rules: changeCultRules, roster: ["Any non-Warflock Arcanite units"],
    description: "Una insurrección de cultistas Arcanite no Warflock que sustituye las reglas normales de facción.",
  },
  {
    id: "the-oracles-of-fate", name: "The Oracles of Fate", requiredUnits: ["kairos-fateweaver"], excludesRegimentsOfRenown: true, excludesFactionTerrain: true,
    rules: oraclesRules, roster: ["Kairos Fateweaver", "Any Disciples of Tzeentch Daemon units"],
    description: "Kairos conduce un ejército exclusivamente daemónico basado en nueve dados de destino.",
  },
];

export default armiesOfRenown;
