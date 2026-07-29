const eligible = ["khorne", "tzeentch", "nurgle", "hedonites", "hashut", "skaven"];

export default [
  {
    id: "lord-skaldiors-chosen",
    name: "Lord Skaldior's Chosen",
    points: 530,
    sourceFaction: "std",
    eligibleFactionIds: eligible,
    organisation: ["1 Chaos Lord on Daemonic Mount", "5 Chaos Knights", "10 Chaos Warriors"],
    unitIds: ["chaos-lord-on-daemonic-mount", "chaos-knights", "chaos-warriors"],
    abilities: [{
      name: "Ironclad Despoilers",
      phase: "Passive",
      description: "Add 1 to save rolls for units in this regiment while they are contesting an objective you control; add 1 to wound rolls while they are contesting an objective you do not control.",
    }],
  },
  {
    id: "godmarked-ascendant",
    name: "Godmarked Ascendant",
    points: 260,
    sourceFaction: "std",
    eligibleFactionIds: ["khorne", "tzeentch", "nurgle", "hedonites"],
    organisation: ["1 Daemon Prince"],
    unitIds: ["daemon-prince"],
    abilities: [
      {
        name: "Godmarked Legion",
        phase: "Passive",
        description: "The Daemon Prince gains the army faction keyword and Gifts of Chaos.",
      },
      {
        name: "Gifts of Chaos",
        phase: "Passive",
        description: "Khorne: +1 Attacks and Blood-hungry for Hellforged Weapons. Tzeentch: Wizard (1). Nurgle: Ward (5+). Slaanesh: +1 to run and charge rolls.",
      },
    ],
  },
];
