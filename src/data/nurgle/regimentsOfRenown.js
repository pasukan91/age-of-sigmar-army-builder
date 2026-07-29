const eligible = ["khorne", "tzeentch", "hedonites", "skaven", "std", "hashut"];

export default [{
  id: "diseased-revellers",
  name: "Diseased Revellers",
  points: 310,
  sourceFaction: "nurgle",
  eligibleFactionIds: eligible,
  organisation: ["1 Sloppity Bilepiper, Herald of Nurgle", "1 Beast of Nurgle", "1 Beast of Nurgle"],
  unitIds: ["sloppity-bilepiper", "beast-of-nurgle", "beast-of-nurgle"],
  abilities: [{
    id: "the-pipers-infectious-melodies", name: "The Piper's Infectious Melodies",
    phase: "Passive", type: "Ability",
    description: "While a Beast of Nurgle in this Regiment of Renown is within 3\" of this Regiment of Renown's Sloppity Bilepiper, it can use the Attention Seekers ability even if the other Beast of Nurgle in this Regiment of Renown has already used it this turn.",
  }],
}, {
  id: "the-pustules", name: "The Pustules", points: 200, sourceFaction: "nurgle",
  eligibleFactionIds: eligible,
  organisation: ["1 Spoilpox Scrivener, Herald of Nurgle", "1 Plaguebearers unit with 10 models", "1 Feculent Gnarlmaw"],
  unitIds: ["spoilpox-scrivener", "plaguebearers", "feculent-gnarlmaw"],
  abilities: [{
    id: "blighted-growth", name: "Blighted Growth", phase: "Deployment Phase",
    type: "Ability", keywords: ["Deploy Terrain"],
    description: "Set up this Regiment of Renown's Feculent Gnarlmaw wholly within friendly territory and more than 3\" from all objectives and other terrain features. It has then been deployed.",
  }, {
    id: "multitudinous-diseases", name: "Multitudinous Diseases",
    phase: "Once Per Turn (Army), End of Any Turn", type: "Ability",
    description: "If this Regiment of Renown's Plaguebearers unit is wholly within 12\" of this Regiment of Renown's Feculent Gnarlmaw, Heal (1) that Plaguebearers unit. If it is contesting an objective, you can also return 1 slain model to it.",
  }],
}];
