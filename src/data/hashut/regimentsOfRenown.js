const eligible = ["khorne", "tzeentch", "nurgle", "hedonites", "std", "skaven"];

export default [
  {
    id:"seeker-of-the-dread-dirge", name:"Seeker of the Dread Dirge", sourceFaction:"hashut",
    points:260, eligibleFactionIds:eligible, units:["ashen-elder","dominator-engine-bane-maces"],
    organisation:["1 Ashen Elder","1 Dominator Engine with Bane Maces"],
    unitIds:["ashen-elder","dominator-engine-bane-maces"],
    description:"Ashen Elder y Dominator Engine with Bane Maces.",
    abilities:[
      { id:"dirge-desolation", name:"Dirge of Desolation", phase:"Your Hero Phase", description:"CV 6. Elige un terreno o lugar de poder visible: con 3+, coloca una ficha de desolación; con 2-5, además D3 daños mortales a cada enemigo a 1\", y con 6+ elige un segundo objetivo." },
      { id:"all-consuming-search", name:"All-consuming Search", phase:"End of Any Turn", description:"El Ashen Elder elige un objetivo, lugar de poder o terreno que dispute y no tenga ficha de desolación amiga. Tira un dado por cada objetivo elegido; cada 5+ le da 1 punto ritual." },
    ],
  },
  {
    id:"curse-steel-battery", name:"Curse-Steel Battery", sourceFaction:"hashut",
    points:380, eligibleFactionIds:eligible, units:["daemonsmith","tormentor-bombard","deathshrieker-rocket-battery"],
    organisation:["1 Daemonsmith","1 Tormentor Bombard","1 Deathshrieker Rocket Battery"],
    unitIds:["daemonsmith","tormentor-bombard","deathshrieker-rocket-battery"],
    description:"Daemonsmith, Tormentor Bombard y Deathshrieker Rocket Battery.",
    abilities:[
      { id:"reinforce-daemonsteel", name:"Reinforce Daemonsteel", phase:"Your Hero Phase", description:"CV 7, Unlimited. Hasta tu siguiente turno, ignora el primer punto de daño asignado en cada fase a unidades del regimiento totalmente a 12\" del lanzador." },
      { id:"display-total-power", name:"Display of Total Power", phase:"Your Shooting Phase", description:"Cuesta 1 PC. Si ninguna War Machine fue destruida, elige un enemigo: ambas solo pueden dispararle este turno, cuentan como si tuvieran 3 DPP y la primera vez que usan un command este turno no cuesta PC.","type":"Once Per Turn (Army)" },
    ],
  },
];
