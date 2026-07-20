const regimentProfiles = {
  "shalaxi-helbane": { options: ["slaaneshi-beguiler", "any-hedonites"] },
  "keeper-of-secrets": { options: ["slaaneshi-beguiler", "any-hedonites"] },
  "dexcessa-the-talon-of-slaanesh": { options: ["synessa-the-voice-of-slaanesh", "slaaneshi-beguiler", "any-hedonites"], canJoinAs: ["dexcessa"] },
  "synessa-the-voice-of-slaanesh": { options: ["dexcessa-the-talon-of-slaanesh", "slaaneshi-beguiler", "any-hedonites"], canJoinAs: ["synessa"] },
  "the-masque": { options: ["any-daemon"], canJoinAs: ["slaaneshi-beguiler"] },
  "syllesske-the-vengeful-alliance": { options: ["slaaneshi-beguiler", "dark-egotist", "any-hedonites"] },
  "thricefold-discord": { options: ["slaaneshi-beguiler", "any-hedonites"] },
  "infernal-enrapturess": { options: ["any-daemon"], canJoinAs: ["slaaneshi-beguiler"] },
  "infernal-enrapturess-scourge-of-aqshy": { options: ["any-daemon"], canJoinAs: ["slaaneshi-beguiler"] },
  "contorted-epitome": { options: ["slaaneshi-beguiler", "any-daemon"] },
  "glutos-orscollion": { options: ["dark-egotist", "any-hedonites"] },
  "sigvald-prince-of-slaanesh": { options: ["dark-egotist", "any-hedonites"], canJoinAs: ["dark-egotist"] },
  "lord-of-hysteria": { options: ["any-sybarite"], canJoinAs: ["dark-egotist"] },
  "shardspeaker-of-slaanesh": { options: ["dark-egotist", "any-sybarite"] },
  "lord-of-pain": { options: ["any-sybarite"], canJoinAs: ["dark-egotist"] },
  "lord-of-hubris": { options: ["any-sybarite"], canJoinAs: ["dark-egotist"] },
};

export default regimentProfiles;
