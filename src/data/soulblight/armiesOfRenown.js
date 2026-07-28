const knightsRules = {
  battleTraits: [
    { id: "the-crimson-keep", name: "The Crimson Keep", phase: "Deployment Phase", description: "Pick an undeployed friendly Crimson Keep unit and place it in reserve. You cannot place more units in the keep than on the battlefield." },
    { id: "from-a-quarter-unseen", name: "From a Quarter Unseen", phase: "Any Movement Phase", type: "Once Per Battle (Army)", description: "Not in the first battle round. Set up every unit in the Crimson Keep wholly within 9\" of a battlefield edge and more than 9\" from enemies. If used in round 3+, Carve a Bloody Path costs no command point this turn." },
    { id: "carve-a-bloody-path", name: "Carve a Bloody Path", phase: "Your Charge Phase", description: "Pick friendly Blood Knights in combat. They can Charge even though they are in combat and even if they already charged this turn." },
    { id: "blood-rampage", name: "Blood Rampage", phase: "Any Combat Phase", type: "Once Per Turn (Army)", description: "Pick a friendly Crimson Keep Monster in combat that has not used a Rampage. It moves 2D6\" and must end in combat with a chosen enemy. If a die roll exceeds that enemy's Health, slay 1 model. This unit cannot use another Rampage this turn." },
  ],
  battleFormations: [],
  heroicTraits: [{ id: "immortal-dedication", name: "Immortal Dedication", points: 0, phase: "Any Combat Phase", description: "Gain D3 martial prowess tokens. Spend each to re-roll a hit, wound or save roll for this unit. Remove remaining tokens at the start of your next turn." }],
  artefacts: [{ id: "chalice-of-the-blood-dragon", name: "Chalice of the Blood Dragon", points: 0, phase: "End of Any Turn", type: "Once Per Battle", description: "Heal (3D3) this unit." }],
  spellLores: [{
    id: "crimson-keep-spell-lore",
    name: "Sorceries of the Crimson Keep",
    spells: [
      { id: "siphon-strength", name: "Siphon Strength", castingValue: 7, keywords: ["Unlimited"], description: "Inflict D3 mortal damage on a visible enemy within 18\" and add 1 to hit rolls for the caster's attacks for the rest of the turn." },
      { id: "awakened-fury", name: "Awakened Fury", castingValue: 7, description: "Add 1 to the Damage of Companion melee weapons used by a visible friendly Crimson Keep unit wholly within 12\" until your next turn." },
      { id: "deathly-gale", name: "Deathly Gale", castingValue: 7, description: "A visible friendly Crimson Keep unit wholly within 12\" rolls 1 extra die for charge rolls for the rest of the turn, to a maximum of 3 dice." },
    ],
  }],
  manifestationLores: [{ id: "crimson-keep-manifestations", name: "Unholy Reliquary", manifestations: ["unholy-reliquary"] }],
  terrain: [],
};

const barrowRules = {
  battleTraits: [
    { id: "the-royal-crypt", name: "The Royal Crypt", phase: "Deployment Phase", type: "Once Per Battle", description: "Instead of deploying faction terrain, set up 3 Cursed Sepulchres wholly in friendly territory, each within 1/2\" of the others and more than 3\" from objectives and terrain. They form one terrain feature with Health 24." },
    { id: "grave-sentinels", name: "Grave Sentinels", phase: null, type: "Passive", description: "Friendly Barrow Legion units' melee weapons have Anti-charge (+1 Rend) while wholly within 9\" of a friendly Cursed Sepulchre." },
    { id: "all-to-dust", name: "All to Dust", phase: null, type: "Passive", description: "From battle round 3 onward, while a friendly Cursed Sepulchre is on the battlefield, subtract 1 from enemy save rolls." },
    { id: "gifts-to-the-petty-kingdoms", name: "Gifts to the Petty Kingdoms", phase: "Deployment Phase", type: "Once Per Battle", description: "Pick up to 2 friendly non-Unique Barrow Legion Heroes without artefacts, including reserve units. Give each 1 artefact from this Army of Renown." },
    { id: "endless-legions-of-bone", name: "Endless Legions of Bone", phase: "Any Movement Phase", type: "Once Per Battle Round (Army)", description: "Replace a destroyed non-Unique Barrow Legion unit at half strength wholly within 12\" of a friendly Hero or within 6\" of a Cursed Sepulchre and more than 9\" from enemies. In your movement phase it can be set up more than 3\" away, but cannot charge if within 9\"." },
  ],
  battleFormations: [],
  heroicTraits: [
    { id: "restless-tyrant", name: "Restless Tyrant", points: 0, phase: "Your Movement Phase", description: "A friendly Barrow Legion unit wholly within 12\" adds 2\" Move for the rest of the turn." },
    { id: "spirit-eater", name: "Spirit-eater", points: 0, phase: "End of Any Turn", description: "If your general slew any models this turn, Heal (D6) it." },
    { id: "lord-of-the-arcane-aegis", name: "Lord of the Arcane Aegis", points: 0, phase: "Deployment Phase", description: "Choose Infantry, Cavalry, Monster or Beast. For the battle, unmodified save rolls of 4+ against attacks made by units with that keyword are always successful." },
  ],
  artefacts: [
    { id: "ring-of-stricken-souls", name: "Ring of Stricken Souls", points: 0, type: "Passive", description: "This unit has Ward (5+)." },
    { id: "crown-of-cold-command", name: "Crown of Cold Command", points: 0, phase: "Any Hero Phase", description: "Once per turn, pick a friendly Barrow Legion unit wholly within 12\". On a 3+, Heal (3) it if damaged; otherwise return slain models with combined Health up to 3." },
    { id: "crypt-dagger", name: "Crypt Dagger", points: 0, phase: "End of Any Turn", type: "Once Per Battle", description: "Pick an enemy Hero in combat and inflict D6 mortal damage." },
    { id: "grave-sand-pendant", name: "Grave-sand Pendant", points: 0, type: "Passive", description: "The first time this unit would be destroyed, on a 3+ it is not destroyed; ignore remaining damage and Heal (1). It cannot use this again." },
    { id: "amulet-of-nightmares", name: "Amulet of Nightmares", points: 0, phase: "Any Combat Phase", type: "Once Per Battle", description: "Pick an enemy within 9\". On a 2+, it has Strike-last this phase." },
  ],
  spellLores: [],
  manifestationLores: [],
};

const armiesOfRenown = [
  {
    id: "knights-of-the-crimson-keep",
    name: "Knights of the Crimson Keep",
    requiredUnits: [],
    excludesRegimentsOfRenown: true,
    excludesFactionTerrain: true,
    rules: knightsRules,
    roster: ["Prince Vhordrai (if included, must be general)", "Vampire Lord on Nightmare Steed", "Blood Knights", "Revenant Draconith"],
    description: "The mounted hosts and draconith horrors of the Crimson Keep.",
  },
  {
    id: "barrow-legion",
    name: "Barrow Legion",
    excludesRegimentsOfRenown: true,
    rules: barrowRules,
    roster: ["Any Deathrattle units"],
    description: "An army composed entirely of Deathrattle units. Wight Kings are Warmasters.",
  },
];

export default armiesOfRenown;
