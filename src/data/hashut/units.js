import { ability, createUnit, weapon } from "./unitFactory";

const resilience = ability("Daemonic Resilience", "Passive", "Con 1 DPP: Ward (6+). Con 2 DPP: Ward (5+). Con 3 DPP: Ward (4+) contra daño de spells, prayers y manifestations; Ward (5+) contra el resto.");
const crush = ability("Crush the Unworthy", "Passive", "Suma 1 a las tiradas de carga de esta unidad por cada DPP que tenga.");
const strength = ability("Daemonic Strength", "Passive", "Suma 1\" al Movimiento y 1 a Ataques de todas sus armas por cada DPP que tenga.");
const glaive = weapon("Glaive", "Melee", 3, "3+", "3+", 1, 2, ["Anti-Cavalry (+1 Rend)", "Charge (+1 Damage)"]);
const taurusWeapons = [
  weapon("Hurled Daemonfire", "Ranged", 3, "4+", "4+", 1, "D3", ["Crit (2 Hits)", "Shoot in Combat"], '18"'),
  weapon("Daemonsmith's Staff", "Melee", 3, "4+", "3+", 1, "D3"),
  weapon("Horns and Hooves", "Melee", 6, "4+", "2+", 2, 3, ["Charge (+1 Damage)", "Companion"]),
];

const units = [
  createUnit({ id:"urak-taar", name:"Urak Taar, the First Daemonsmith", points:340, move:'10"', health:16, control:5, save:"3+", baseSize:"130mm", imageAlias:"urak_taar",
    keywords:["Unique","Hero","Monster","War Machine","Wizard (2)","Fly","Warmaster","Duardin"], regimentOptions:["Any Hashutite Commander","Any Helsmiths of Hashut"],
    weapons:[weapon("Ruinous Torrents","Ranged",6,"4+","4+",1,"D3",["Crit (2 Hits)","Shoot in Combat"],'18"'),weapon("Dumakaz","Melee",4,"4+","3+",1,"D3"),weapon("Ghorrakos' Horns and Hooves","Melee",6,"4+","2+",2,3,["Charge (+1 Damage)","Companion"])],
    abilities:[
      ability("Peerless Among Daemonsmiths","Passive","Con 1 DPP: Ward (6+); con 2: +1 a lanzar y Ward (5+); con 3: +2 a lanzar y Ward (4+) contra spells/prayers/manifestations o Ward (5+) contra el resto."),
      ability("Battle Damaged","Passive","Con 10 o más puntos de daño, Ghorrakos' Horns and Hooves tiene Ataques 4."),
      ability("Curse of Stone","Your Hero Phase","CV 7. Traza dos segmentos de hasta 9\" desde el lanzador; cada enemigo atravesado sufre D3 daños mortales con 2+.","Spell"),
      ability("Pitiless Trampling","Any Charge Phase","Si cargó, elige un enemigo a 1\": inflige D3 daños mortales y mueve hasta 2D6\" atravesándolo, terminando en combate.","Once Per Turn (Army), Rampage"),
      ability("Master of Daemonic Power","Enemy Hero Phase","Mueve hasta 3 DPP entre unidades amigas totalmente a 18\", sin superar 3 por unidad."),
    ], rules:{hero:true,unique:true,monster:true,wizard:2,warmaster:true,canBeReinforced:false} }),
  createUnit({ id:"daemonsmith-infernal-taurus", name:"Daemonsmith on Infernal Taurus", points:290, move:'10"', health:15, control:5, save:"3+", baseSize:"130mm", imageAlias:"daemonsmith_infernal_taurus",
    keywords:["Hero","Monster","War Machine","Wizard (1)","Fly","Duardin"], regimentOptions:["0-1 Hashutite Commander","Any Helsmiths of Hashut"], weapons:taurusWeapons,
    abilities:[resilience,ability("Battle Damaged","Passive","Con 10 o más puntos de daño, Horns and Hooves tiene Ataques 4."),ability("Unholy Stampede","Passive","Cavalry Helsmiths of Hashut amigas totalmente a 12\" pueden Retreat y Charge en el mismo turno y no sufren daño por Retreat."),ability("Immolating Presence","End of Any Turn","Elige un enemigo en combate y tira un dado; si supera su Health, una miniatura de esa unidad es eliminada.","Once Per Turn (Army), Rampage")],
    rules:{hero:true,monster:true,wizard:1,canBeReinforced:false} }),
  createUnit({ id:"ashen-elder", name:"Ashen Elder", points:120, health:6, control:2, save:"4+", baseSize:"32mm", imageAlias:"ashen_elder", keywords:["Hero","Priest (1)","Infantry","Duardin"], regimentOptions:["0-1 Hashutite Commander","Any Helsmiths of Hashut"], weapons:[weapon("Black Hammer","Melee",3,"3+","4+",1,"D3")],
    abilities:[ability("Stoked Fanaticism","Passive","Ignora el primer punto de daño asignado en cada fase a unidades Helsmiths of Hashut amigas que no sean Hobgrot totalmente a 6\"; aumenta el alcance 6\" por cada DPP."),ability("Extract Power","End of Your Turn","Si disputa un objetivo, lugar de poder o terreno con ficha de desolación amiga, gana 1 punto ritual.")], rules:{hero:true,priest:1,canBeReinforced:false} }),
  createUnit({ id:"daemonsmith", name:"Daemonsmith", points:80, health:6, control:2, save:"4+", baseSize:"32mm", keywords:["Hero","Wizard (1)","Infantry","Duardin"], regimentOptions:["0-1 Hashutite Commander","Any Helsmiths of Hashut"],
    weapons:[weapon("Hurled Daemonfire","Ranged",3,"4+","4+",1,"D3",["Crit (2 Hits)","Shoot in Combat"],'18"'),weapon("Darkiron Talon","Melee",3,"3+","4+",1,"D3")],
    abilities:[ability("Molten Mending","Your Hero Phase","Elige una War Machine Helsmiths of Hashut amiga totalmente a 6\" (+6\" por DPP) y cú­rala D3 más sus DPP.","Once Per Turn (Army)")], rules:{hero:true,wizard:1,canBeReinforced:false} }),
  createUnit({ id:"war-despot", name:"War Despot", points:80, health:6, control:2, save:"3+", baseSize:"32mm", imageAlias:"war-despot", keywords:["Hero","Infantry","Duardin"], regimentOptions:["Any Helsmiths of Hashut"], canJoinRegimentAs:["hashutite-commander"],
    weapons:[weapon("Daemonflame Glaive","Melee",5,"3+","3+",1,2,["Crit (Mortal)"])],
    abilities:[ability("Black-hearted Conqueror","Passive","Mientras esta unidad tenga al menos 1 DPP, las unidades amigas totalmente a su alcance y visibles que tengan 0 DPP cuentan como si tuvieran 1. El alcance es 6\", más 3\" por cada DPP que tenga esta unidad."),ability("Fight, You Scum!","Any Combat Phase","Tras luchar, una Infantry Helsmiths of Hashut amiga no Hero dentro de su alcance de combate lucha inmediatamente y obtiene +1 Ataques de combate este turno.","Reaction")], rules:{hero:true,canBeReinforced:false} }),
  createUnit({ id:"anointed-sentinels", name:"Anointed Sentinels", points:130, models:3, move:'10"', health:4, save:"4+", baseSize:"75×42mm", imageAlias:"annointed_sentinels", keywords:["Cavalry","Champion","Duardin"], weapons:[glaive],
    abilities:[crush,ability("Zealous Counter-attack","Enemy Charge Phase","Tras usar Counter-charge, esta unidad tiene Strike-first durante el resto del turno.","Reaction")] }),
  createUnit({ id:"bull-centaurs", name:"Bull Centaurs", points:190, models:3, move:'10"', health:4, save:"4+", baseSize:"75×42mm", imageAlias:"bull_centaurs", keywords:["Cavalry","Champion","Duardin"],
    weapons:[weapon("Brazen Mauls","Melee",4,"3+","3+",1,2,["Charge (+1 Damage)","Crit (Mortal)"])],
    abilities:[crush,ability("Bull-charge","Any Charge Phase","Si cargó, elige un enemigo visible a 1\". Tira un dado por miniatura más un dado por DPP; cada 6+ inflige 1 daño mortal.")] }),
  createUnit({ id:"dominator-engine-bane-maces", name:"Dominator Engine with Bane Maces", points:150, move:'6"', health:10, control:2, save:"2+", baseSize:"80mm", imageAlias:"dominator_engine", keywords:["War Machine","Automaton"], weapons:[weapon("Bane Maces","Melee",4,"4+","2+",1,3,["Charge (+1 Damage)"])],
    abilities:[strength,ability("Engine of Domination","Any Combat Phase","Los Heroes enemigos en combate pueden luchar dos veces; tras la primera obtienen Strike-last y la segunda solo puede usarse si siguen en combate con esta unidad.","Once Per Turn (Army)")] }),
  createUnit({ id:"dominator-engine-immolation-cannons", name:"Dominator Engine with Immolation Cannons", points:160, move:'6"', health:10, control:2, save:"2+", baseSize:"80mm", imageAlias:"dominator_engine", keywords:["War Machine","Automaton","Reinforcements"],
    weapons:[weapon("Immolation Cannons","Ranged",8,"2+","4+",1,"D3",["Anti-Cavalry (+1 Rend)","Shoot in Combat"],'5"'),weapon("Horns and Pummelling Blows","Melee",3,"4+","3+",1,"D3",["Charge (+1 Damage)"])],
    abilities:[strength,ability("All Must Burn","Your Shooting Phase","Elige 2 o más enemigos a 8\": +2 Ataques de Immolation Cannons por objetivo, asignando al menos 3 ataques a cada uno.","Once Per Turn (Army)")] }),
  createUnit({ id:"deathshrieker-rocket-battery", name:"Deathshrieker Rocket Battery", points:140, health:8, control:2, save:"3+", baseSize:"100mm", imageAlias:"deathshrieker_rocket_battery", keywords:["War Machine"],
    weapons:[weapon("Deathshrieker Rockets","Ranged",3,"4+","2+",2,"D3+2",["Anti-Monster (+1 Rend)","Anti-War Machine (+1 Rend)"],'24"'),weapon("Artillerists' Tools","Melee",3,"4+","4+",0,1)],
    abilities:[ability("Hungering Flames","Your Shooting Phase","Sus cohetes tienen Damage 5 contra Monsters y War Machines este turno.","Once Per Turn (Army)"),ability("Watch Them Burn","Your Shooting Phase","Tras disparar al mismo objetivo, por cada otro enemigo en su alcance de combate tira tantos dados como DPP tenga; cada 3+ causa 1 daño mortal.","Reaction")] }),
  createUnit({ id:"tormentor-bombard", name:"Tormentor Bombard", points:130, health:8, control:2, save:"3+", baseSize:"100mm", imageAlias:"tormentor_bombard", keywords:["War Machine"],
    weapons:[weapon("Tormentor Torrent","Ranged",4,"3+","3+",1,"D3",["Anti-Cavalry (+1 Rend)","Anti-Infantry (+1 Rend)"],'30"'),weapon("Artillerists' Tools","Melee",3,"4+","4+",0,1)],
    abilities:[ability("Calculated Trajectory","Passive","+1 a impactar al disparar contra unidades de 5+ miniaturas a más de 12\"."),ability("Ruinous Bombardment","Your Shooting Phase","Tras disparar al mismo objetivo, elige otros enemigos a 6\" hasta los DPP de esta unidad; con 3+, no pueden usar commands hasta tu siguiente turno.","Once Per Turn (Army)")] }),
  createUnit({ id:"razers-blunderbusses", name:"Infernal Razers with Blunderbusses", points:110, models:5, health:1, save:"4+", baseSize:"28.5mm", imageAlias:"infernal_razers", keywords:["Infantry","Champion","Duardin"],
    weapons:[weapon("Blunderbusses","Ranged",1,"3+","2+",0,2,[],'18"'),weapon("Weapon Butts","Melee",1,"4+","4+",0,1)],
    abilities:[ability("Manglers of Metal","Passive","+1 Rend de sus armas a distancia por DPP."),ability("Hateful Hail","Your Shooting Phase","Si todos dispararon al mismo objetivo, tira un dado y suma las miniaturas eliminadas; con 6+, el objetivo tiene Strike-last este turno.","Once Per Turn (Army)")] }),
  createUnit({ id:"razers-flamehurlers", name:"Infernal Razers with Flamehurlers", points:90, models:5, health:1, save:"4+", baseSize:"28.5mm", imageAlias:"infernal_razers", keywords:["Infantry","Champion","Duardin"],
    weapons:[weapon("Flamehurlers","Ranged",3,"2+","4+",0,1,["Shoot in Combat"],'12"'),weapon("Weapon Butts","Melee",1,"4+","4+",0,1)],
    abilities:[ability("Manglers of Metal","Passive","+1 Rend de sus armas a distancia por DPP."),ability("Scorched Remains","Your Shooting Phase","Si todos dispararon al mismo objetivo Infantry, tira un dado; con 3+, réstale ese resultado a Control hasta tu siguiente turno.","Once Per Turn (Army)")] }),
  createUnit({ id:"infernal-cohort-blades", name:"Infernal Cohort with Hashutite Blades", points:90, models:10, health:1, save:"3+", baseSize:"28.5mm", imageAlias:"infernal_cohort", keywords:["Infantry","Champion","Musician (1/10)","Standard Bearer (1/10)","Duardin"],
    weapons:[weapon("Infernal Blades","Melee",2,"3+","4+",0,1,["Anti-Infantry (+1 Rend)"])],
    abilities:[resilience,ability("Disciplined March","Passive","Al usar Run, una tirada de 1-3 cuenta como 4."),ability("Sacred Gongs","Any Hero Phase","Al usar Rally, puedes retirar una ficha de gong para hacer una tirada de rally adicional.","Reaction")] }),
  createUnit({ id:"infernal-cohort-spears", name:"Infernal Cohort with Hashutite Spears", points:90, models:10, health:1, save:"3+", baseSize:"28.5mm", imageAlias:"infernal_cohort", keywords:["Infantry","Champion","Musician (1/10)","Standard Bearer (1/10)","Duardin"],
    weapons:[weapon("Infernal Spears","Melee",2,"3+","4+",0,1,["Anti-Cavalry (+1 Rend)","Anti-Charge (+1 Rend)"])],
    abilities:[resilience,ability("Conquered Lands","Your Hero Phase","Por cada objetivo que controles disputado por esta unidad, con 3+ da 1 DPP a una unidad Helsmiths of Hashut amiga que no sea Hobgrot totalmente a 12\"."),ability("Sacred Gongs","Any Hero Phase","Al usar Rally, puedes retirar una ficha de gong para hacer una tirada de rally adicional.","Reaction")] }),
  createUnit({ id:"hobgrot-vandalz", name:"Hobgrot Vandalz", points:70, models:10, move:'5"', health:1, save:"5+", baseSize:"25mm", imageAlias:"hobgrot_vandalz", keywords:["Infantry","Champion","Musician (1/10)","Standard Bearer (1/10)","Hobgrot"],
    weapons:[weapon("Scavenged Weapons","Melee",2,"4+","5+",0,1)], abilities:[ability("Disposable Lackeys","Deployment Phase","Esta unidad puede realizar inmediatamente una habilidad Normal Move.")] }),
];

export default units;
