const regimentsOfRenown = [
  {
    id: "krittoks-clawpack",
    name: "Krittok's Clawpack",
    points: 380,
    sourceFaction: "skaven",
    eligibleFactionIds: ["khorne", "tzeentch", "nurgle", "hedonites", "std"],
    organisation: ["1 Krittok Foulblade", "1 Stormvermin unit (10 models)", "1 Doom-Flayers unit (2 models)"],
    unitIds: ["krittok-foulblade", "stormvermin", "doom-flayers"],
    abilities: [
      { name: "Fickle Motives", phase: "Passive", description: "Add 1 Attack to melee weapons while ahead on victory points; subtract 3 from control scores while behind." },
      { name: "Always Three Clawsteps Ahead", phase: "Enemy Hero Phase", description: "One unit in the regiment that is not in combat can make a Normal Move." },
      { name: "Skryre Payloads", phase: "Passive", description: "Doom-Flayers have Ward (5+) while in the combat range of the regiment's Stormvermin." },
    ],
  },
  {
    id: "volt-klaws-enginecoven",
    name: "Volt-Klaw's Enginecoven",
    points: 410,
    sourceFaction: "skaven",
    eligibleFactionIds: ["khorne", "tzeentch", "nurgle", "hedonites", "std"],
    organisation: ["1 Warlock Galvaneer", "1 Warpvolt Scourgers unit (3 models)", "1 Ratling Warpblaster"],
    unitIds: ["warlock-galvaneer", "warpvolt-scourgers", "ratling-warpblaster"],
    abilities: [
      { name: "Behold My Genius!", phase: "Your Shooting Phase", description: "Once per battle, add 1 to hit rolls for shooting attacks and 3\" Range to the regiment's ranged weapons until your next turn." },
      { name: "Hide-shelter!", phase: "Passive", description: "The regiment's Infantry is not visible beyond 13\" while in the Ratling Warpblaster's combat range." },
    ],
  },
];

export default regimentsOfRenown;
