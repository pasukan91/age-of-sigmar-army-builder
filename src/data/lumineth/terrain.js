const terrain = [{
  id: "shrine-luminor",
  name: "Shrine Luminor",
  image: "/images/units/lumineth/ShrineLuminor.jpg",
  points: 0,
  profile: {
    move: "-",
    health: 12,
    control: "-",
    save: "3+",
    ward: null,
  },
  universalAbilities: ["Cover", "Impassable"],
  abilities: [
    {
      name: "Enter the Shrine",
      type: "Ability",
      phase: "Your Hero Phase",
      description: "If this terrain has no Shrine Guardian, pick a friendly Lumineth Realm-lords Infantry Hero within 3\" and not in combat. Place it on this terrain; it becomes the Shrine Guardian.",
    },
    {
      name: "Exit the Shrine",
      type: "Ability",
      phase: "Your Movement Phase",
      description: "If the Shrine Guardian was not placed this turn, set it up wholly within 6\" and not in combat; it is no longer the Shrine Guardian.",
    },
    {
      name: "Shrine Guardian",
      type: "Passive",
      phase: null,
      description: "While this terrain has a Shrine Guardian, it has Move 6\" and can use non-command, non-Charge Move abilities as if it were a unit, but cannot end a Move in combat. The Guardian cannot use Move abilities and remains on this terrain. Measure range and visibility to and from the Guardian using this terrain, and attacks that would target the Guardian target this terrain instead. If the terrain is destroyed, inflict D3 mortal damage on the Guardian and set it up wholly within 3\" and not in combat, or slay it if impossible.",
    },
    {
      name: "Cleansing Rituals",
      type: "Once Per Turn",
      phase: "Reaction: You declared a Spell ability",
      description: "For a Lumineth Realm-lords unit wholly within 12\", while this terrain has a Shrine Guardian, re-roll the casting roll.",
    },
  ],
  details: { models: 1, baseSize: "Faction terrain" },
  keywords: ["Faction Terrain", "Fly", "Order", "Lumineth Realm-lords"],
}];

export default terrain;
