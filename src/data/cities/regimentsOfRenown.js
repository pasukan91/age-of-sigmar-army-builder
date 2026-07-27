const broadEligibility = [
  "khorne",
  "daughters",
  "tzeentch",
  "flesheater",
  "fyreslayers",
  "gloomspite",
  "hedonites",
  "hashut",
  "idoneth",
  "ironjawz",
  "kharadron",
  "kruleboyz",
  "lumineth",
  "nurgle",
  "nighthaunt",
  "ogors",
  "ossiarch",
  "seraphon",
  "skaven",
  "std",
  "behemat",
  "soulblight",
  "stormcast",
  "sylvaneth",
];

const orderEligibility = [
  "daughters",
  "fyreslayers",
  "idoneth",
  "kharadron",
  "lumineth",
  "seraphon",
  "stormcast",
  "sylvaneth",
];

const regimentsOfRenown = [
  {
    id: "rogue-engine",
    name: "Rogue Engine",
    points: 470,
    sourceFaction: "cities",
    eligibleFactionIds: broadEligibility,
    organisation: ["1 Outlaw Cannonade Cogfort"],
    unitIds: ["outlaw-cannonade-cogfort"],
    abilities: [
      {
        name: "Mercenary Attitudes",
        phase: "Your Hero Phase",
        description:
          "Pick a friendly non-Unique unit wholly within 12\". Until the start of your next turn, while it remains wholly within 12\", choose one: re-roll its run rolls; add 1 to its charge rolls; it cannot be targeted by shooting attacks; add 1 to wound rolls for its combat attacks; or add 10 to its control score.",
      },
    ],
  },
  {
    id: "cogfort-raiders",
    name: "Cogfort Raiders",
    points: 450,
    sourceFaction: "cities",
    eligibleFactionIds: broadEligibility,
    organisation: ["1 Outlaw Conqueror Cogfort"],
    unitIds: ["outlaw-conqueror-cogfort"],
    abilities: [
      {
        name: "Everyone Aboard!",
        phase: "Deployment Phase",
        description:
          "Pick up to 1 friendly Infantry Hero and up to 1 friendly non-reinforced, non-Hero Infantry unit that have not been deployed. Set them up in reserve as this unit's passengers.",
      },
      {
        name: "This Is Your Stop, Maggots!",
        phase: "Once Per Battle, Any Charge Phase",
        description:
          "Set up each passenger wholly within 6\" of the Cogfort and more than 9\" from all enemies. The passengers' melee weapons have Charge (+1 Damage) for the rest of the turn.",
      },
    ],
  },
  {
    id: "ven-densts-hounds",
    name: "Ven Denst's Hounds",
    points: 230,
    sourceFaction: "cities",
    eligibleFactionIds: orderEligibility,
    organisation: [
      "Galen and Doralia ven Denst",
      "11 Wildercorps Hunters",
    ],
    unitIds: ["galen-and-doralia-ven-denst", "wildercorps-hunters"],
    abilities: [
      {
        name: "Spell Hunters",
        phase: "Passive",
        description:
          "While both units in this Regiment of Renown are within each other's combat range, enemy Manifestations cannot be set up within 12\" of either unit.",
      },
    ],
  },
  {
    id: "reinholts-sharpshooters",
    name: "Reinholt's Sharpshooters",
    points: 400,
    sourceFaction: "cities",
    eligibleFactionIds: orderEligibility,
    organisation: [
      "1 Fusil-Major on Ogor Warhulk",
      "1 Ironweld Great Cannon",
      "10 Freeguild Fusiliers",
    ],
    unitIds: [
      "fusil-major-on-ogor-warhulk",
      "ironweld-great-cannon",
      "freeguild-fusiliers",
    ],
    abilities: [
      {
        name: "Friendly Competition",
        phase: "Passive",
        description:
          "Add 1 to hit rolls for shooting attacks made by non-Hero units in this regiment if any enemy models were slain by shooting attacks made by its non-Hero units in the same turn.",
      },
      {
        name: "Castle Up!",
        phase: "Passive",
        description:
          "While a non-Hero unit in this regiment is within the combat range of and visible to the regiment's Hero, those units are under orders.",
      },
    ],
  },
];

export default regimentsOfRenown;
