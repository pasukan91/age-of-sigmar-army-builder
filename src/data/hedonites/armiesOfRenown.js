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
    description: "An army led by Sigvald and formed around mortal Sybarites, with limited daemonic support.",
  },
  {
    id: "court-of-the-godlings",
    name: "Court of the Godlings",
    requiredUnits: ["dexcessa-the-talon-of-slaanesh", "synessa-the-voice-of-slaanesh"],
    excludesRegimentsOfRenown: true,
    roster: ["Dexcessa", "Synessa", "Any non-Unique Hedonites of Slaanesh Daemon units"],
    restrictions: ["Dexcessa and Synessa cannot be in the same regiment"],
    description: "The divine twins command a court composed exclusively of non-Unique daemons.",
  },
];

export default armiesOfRenown;
