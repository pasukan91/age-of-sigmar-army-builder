const regimentsOfRenown = [
  {
    id: "the-beast-of-castle-sternieste",
    name: "The Beast of Castle Sternieste",
    points: 190,
    sourceFaction: "soulblight",
    eligibleFactionIds: ["flesheater", "nighthaunt", "ossiarch"],
    organisation: ["1 Revenant Draconith"],
    unitIds: ["revenant-draconith"],
    abilities: [{ name: "Deathless Monstrosity", phase: "Your Hero Phase", description: "Once per turn (Army). Heal (3) this unit." }],
  },
  {
    id: "blades-of-the-hollow-king",
    name: "Blades of the Hollow King",
    points: 260,
    sourceFaction: "soulblight",
    eligibleFactionIds: ["flesheater", "nighthaunt", "ossiarch"],
    organisation: ["The Blades of the Hollow King"],
    unitIds: ["the-blades-of-the-hollow-king"],
    abilities: [{ name: "The Hunger", phase: "End of Any Turn", description: "Once per turn (Army). If this unit fought, Heal (D3), or Heal (2D3) if it destroyed an enemy with Fight." }],
  },
];

export default regimentsOfRenown;
