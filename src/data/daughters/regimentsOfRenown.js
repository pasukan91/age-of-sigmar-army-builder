const eligibleOrder = ["cities", "fyreslayers", "idoneth", "kharadron", "lumineth", "seraphon", "stormcast", "sylvaneth"];

const regimentsOfRenown = [
  {
    id: "the-crimson-lash",
    name: "The Crimson Lash",
    points: 220,
    sourceFaction: "daughters",
    eligibleFactionIds: eligibleOrder,
    organisation: ["1 High Gladiatrix", "1 Sisters of Slaughter unit with 10 models"],
    unitIds: ["high-gladiatrix", "sisters-of-slaughter"],
    abilities: [
      { name: "Site of Slaughter", phase: "Deployment Phase", description: "Once per battle for the army, pick an objective wholly outside friendly territory. You consider it to be the amphitheatre." },
      { name: "Finishing Moves", phase: null, description: "While every model in a unit from this regiment contests the amphitheatre, its melee weapons have Crit (Mortal). If you control it, unmodified hit or wound rolls of 1-4 for attacks targeting that unit fail." },
    ],
  },
  {
    id: "khinerai-death-flight",
    name: "Khinerai Death Flight",
    points: 240,
    sourceFaction: "daughters",
    eligibleFactionIds: eligibleOrder,
    organisation: ["1 Khinerai Heartrenders unit with 5 models", "1 Khinerai Lifetakers unit with 5 models"],
    unitIds: ["khinerai-heartrenders", "khinerai-lifetakers"],
    abilities: [{ name: "Fierce Competition", phase: null, description: "When either unit slays enemy models with an ability, it becomes pre-eminent and the other becomes overlooked. Weapons used by an overlooked unit have Crit (Auto-wound)." }],
  },
];

export default regimentsOfRenown;
