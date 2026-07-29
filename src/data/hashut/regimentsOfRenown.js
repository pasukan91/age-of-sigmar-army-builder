const eligible = ["khorne", "tzeentch", "nurgle", "hedonites", "std", "skaven"];

export default [
  {
    id: "seeker-of-the-dread-dirge",
    name: "Seeker of the Dread Dirge",
    sourceFaction: "hashut",
    points: 260,
    eligibleFactionIds: eligible,
    units: ["ashen-elder", "dominator-engine-bane-maces"],
    organisation: ["1 Ashen Elder", "1 Dominator Engine with Bane Maces"],
    unitIds: ["ashen-elder", "dominator-engine-bane-maces"],
    description: "An Ashen Elder and a Dominator Engine with Bane Maces.",
    abilities: [
      { id: "dirge-desolation", name: "Dirge of Desolation", phase: "Your Hero Phase", description: "Casting value 6. Pick a visible terrain feature or Place of Power. On a 3+, place a desolation token on it. On a 2-5, also inflict D3 mortal damage on each enemy unit within 1\"; on a 6+, pick a second target." },
      { id: "all-consuming-search", name: "All-consuming Search", phase: "End of Any Turn", description: "Pick an objective or Place of Power contested by the Ashen Elder that has not been picked for this ability this battle. Roll a dice; on a 5+, give the Ashen Elder 1 ritual point." },
    ],
  },
  {
    id: "curse-steel-battery",
    name: "The Curse-Steel Battery",
    sourceFaction: "hashut",
    points: 380,
    eligibleFactionIds: eligible,
    units: ["daemonsmith", "tormentor-bombard", "deathshrieker-rocket-battery"],
    organisation: ["1 Daemonsmith", "1 Tormentor Bombard", "1 Deathshrieker Rocket Battery"],
    unitIds: ["daemonsmith", "tormentor-bombard", "deathshrieker-rocket-battery"],
    description: "A Daemonsmith, Tormentor Bombard and Deathshrieker Rocket Battery.",
    abilities: [
      { id: "reinforce-daemonsteel", name: "Reinforce Daemonsteel", phase: "Your Hero Phase", description: "Casting value 7, Unlimited. Until your next turn, ignore the first damage point allocated in each phase to units in this Regiment of Renown wholly within 12\" of the caster." },
      { id: "display-total-power", name: "Display of Total Power", phase: "Your Shooting Phase", description: "Costs 1 command point. If neither War Machine has been destroyed, pick an enemy unit. Both War Machines can only shoot that target this turn, count as having 3 DPP and the first command used by each this turn costs no command points.", type: "Once Per Turn (Army)" },
    ],
  },
];
