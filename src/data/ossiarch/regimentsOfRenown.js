const regimentsOfRenown = [
  {
    id: "heralds-of-the-bone-tithe",
    name: "Heralds of the Bone-tithe",
    points: 510,
    sourceFaction: "ossiarch",
    eligibleFactionIds: ["flesheater", "nighthaunt", "soulblight"],
    organisation: [
      "Vokmortian, Master of the Bone-tithe",
      "3 Immortis Guard",
      "10 Mortek Guard",
    ],
    unitIds: ["vokmortian", "immortis-guard", "mortek-guard"],
    abilities: [
      {
        name: "The Decree of Nagash",
        phase: "Your Hero Phase",
        description:
          "Spell (7): pick an enemy within 12\" of Vokmortian. For the turn, whenever it declares a Fight ability, that ability has no effect unless the opponent spends 1 command point as a reaction.",
      },
    ],
  },
  {
    id: "karahtets-siege-breaker",
    name: "Karahtet's Siege Breaker",
    points: 360,
    sourceFaction: "ossiarch",
    eligibleFactionIds: ["flesheater", "nighthaunt", "soulblight"],
    organisation: ["1 Mortisan Ossifector", "1 Mortek Crawler"],
    unitIds: ["mortisan-ossifector", "mortek-crawler"],
    abilities: [
      {
        name: "Reinforce Pavise",
        phase: "Your Hero Phase",
        description:
          "Spell (5): if the Mortek Crawler is wholly within 12\" and visible to the Ossifector, it has Ward (5+) until your next turn.",
      },
    ],
  },
];

export default regimentsOfRenown;
