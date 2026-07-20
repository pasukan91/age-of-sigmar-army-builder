const regimentsOfRenown = [
  {
    id: "mist-clad-revellers",
    name: "Mist-clad Revellers",
    points: 260,
    sourceFaction: "hedonites",
    eligibleFactionIds: ["tzeentch", "hashut", "nurgle", "skaven", "std"],
    organisation: ["1 Shardspeaker of Slaanesh", "1 Blissbarb Archers unit (10 models)"],
    unitIds: ["shardspeaker-of-slaanesh", "blissbarb-archers"],
    abilities: [
      { name: "Lurking Threat", phase: "Deployment Phase", description: "If neither unit has been deployed, set both up in reserve, lurking in the mists." },
      { name: "The Mists Part", phase: "Your Movement Phase", description: "Set up the Shardspeaker wholly within 9\" of a battlefield edge and more than 9\" from enemies, then set up the Blissbarb Archers wholly within 6\" of it, wholly within 9\" of an edge and more than 9\" from enemies." },
    ],
  },
  {
    id: "the-accursed-reflection",
    name: "The Accursed Reflection",
    points: 150,
    sourceFaction: "hedonites",
    eligibleFactionIds: ["tzeentch", "hashut", "nurgle", "skaven", "std"],
    organisation: ["1 Contorted Epitome", "1 Wheels of Excruciation", "1 Mesmerising Mirror", "1 Dreadful Visage"],
    unitIds: ["contorted-epitome"],
    manifestationIds: ["wheels-of-excruciation", "mesmerising-mirror", "dreadful-visage"],
    abilities: [{ name: "Spew Forth Sin", phase: "Your Hero Phase", castingValue: 6, description: "The Contorted Epitome can summon one of this regiment's manifestations that is not on the battlefield and was not removed this turn, following its warscroll placement restrictions." }],
  },
];

export default regimentsOfRenown;
