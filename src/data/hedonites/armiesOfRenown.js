const armiesOfRenown = [
  {
    id: "the-decadent-host",
    name: "The Decadent Host",
    requiredUnits: ["sigvald-prince-of-slaanesh"],
    excludesRegimentsOfRenown: true,
    roster: [
      "Sigvald",
      "Any non-War Machine Sybarite units",
      "Up to 1 Daemonettes unit",
      "Up to 1 Contorted Epitome",
    ],
    description: "Un ejército liderado por Sigvald y formado alrededor de Sybarites mortales, con apoyo demoníaco limitado.",
  },
  {
    id: "court-of-the-godlings",
    name: "Court of the Godlings",
    requiredUnits: ["dexcessa-the-talon-of-slaanesh", "synessa-the-voice-of-slaanesh"],
    excludesRegimentsOfRenown: true,
    roster: ["Dexcessa", "Synessa", "Any non-Unique Hedonites of Slaanesh Daemon units"],
    restrictions: ["Dexcessa and Synessa cannot be in the same regiment"],
    description: "Los gemelos divinos dirigen una corte compuesta exclusivamente por demonios no Únicos.",
  },
];

export default armiesOfRenown;
