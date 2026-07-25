const regimentsOfRenown = [
  {
    id: "the-shinestealaz",
    name: "The Shinestealaz",
    points: 500,
    sourceFaction: "gloomspite",
    eligibleFactionIds: ["ironjawz", "kruleboyz", "ogors", "behemat"],
    organisation: [
      "1 Snarlboss",
      "1 Wolfgit Retinue unit (2 models)",
      "2 Snarlpack Cavalry units (3 models each)",
      "1 Sunsteala Wheelas unit (2 models)",
    ],
    unitIds: ["snarlboss", "wolfgit-retinue", "snarlpack-cavalry", "snarlpack-cavalry", "sunsteala-wheelas"],
    abilities: [
      { name: "Sneaky Prowlin'", phase: "Deployment Phase", description: "Set all units in this regiment up in reserve prowlin' around." },
      { name: "Ambush Time!", phase: "Your Movement Phase", description: "Once per battle, set all prowlin' units up more than 9\" from enemies." },
    ],
  },
  {
    id: "skulkriks-loonladz",
    name: "Skulkrik's Loonladz",
    points: 310,
    sourceFaction: "gloomspite",
    eligibleFactionIds: ["ironjawz", "kruleboyz", "ogors", "behemat"],
    organisation: ["1 Loonboss", "1 Moonclan Stabbas unit (20 models)", "1 Loonsmasha Fanatics unit (5 models)"],
    unitIds: ["loonboss", "moonclan-stabbas", "loonsmasha-fanatics"],
    abilities: [
      { name: "On da Moon's Trail", phase: null, description: "Melee weapons in this regiment have Anti-charge (+1 Rend) while their unit contests an objective you control." },
    ],
  },
];

export default regimentsOfRenown;
