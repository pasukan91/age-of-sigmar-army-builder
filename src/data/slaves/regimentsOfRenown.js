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
      description: "+1 a save para unidades del regimiento mientras disputen un objetivo que controlas; +1 a herir mientras disputen uno que no controlas.",
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
        description: "El Daemon Prince obtiene la keyword de la facción del ejército y Gifts of Chaos.",
      },
      {
        name: "Gifts of Chaos",
        phase: "Passive",
        description: "Khorne: +1 Ataques y Blood-hungry para Hellforged Weapons. Tzeentch: Wizard (1). Nurgle: Ward (5+). Slaanesh: +1 a correr y cargar.",
      },
    ],
  },
];
