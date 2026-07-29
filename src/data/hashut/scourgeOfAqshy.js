import { ability, createUnit, weapon } from "./unitFactory";

const resilience = ability("Daemonic Resilience", "Passive", "Con 1 DPP: Ward (6+). Con 2 DPP: Ward (5+). Con 3 DPP: Ward (4+) contra spells, prayers y manifestations; Ward (5+) contra el resto.");

export default [
  createUnit({
    id:"scourge-daemonsmith-infernal-taurus", name:"Scourge of Aqshy Daemonsmith on Infernal Taurus", points:350,
    source:"Scourge of Aqshy", move:'10"', health:15, control:5, save:"3+", baseSize:"130mm",
    imageAlias:"daemonsmith_infernal_taurus", keywords:["Hero","Monster","War Machine","Wizard (1)","Fly","Duardin"],
    regimentOptions:["0-1 Hashutite Commander","Any Helsmiths of Hashut"],
    weapons:[
      weapon("Hurled Daemonfire","Ranged",3,"4+","4+",1,"D3",["Crit (2 Hits)","Shoot in Combat"],'18"'),
      weapon("Daemonsmith's Staff","Melee",3,"4+","3+",1,"D3"),
      weapon("Horns and Hooves","Melee",6,"4+","2+",2,3,["Charge (+1 Damage)","Companion"]),
    ],
    abilities:[
      resilience,
      ability("Battle Damaged","Passive","Con 10 o más puntos de daño, Horns and Hooves tiene Ataques 4."),
      ability("Leech Realm-magic","Your Hero Phase","+1 a lanzar y disipar hasta tu siguiente turno. Puedes consumir una ficha de desolación amiga en un objetivo o terreno que disputes para aumentar permanentemente su poder en 1.","Once Per Turn (Army)"),
      ability("Calamitous Shockwave","Any Combat Phase","Elige hasta 3 enemigos en combate y tira por cada uno. Si el resultado es menor que tu furia, no puede usar Eruption of Fury ni gastar furia en Fight Through Pain y los ataques contra él tienen +1 Rend este turno.","Once Per Turn (Army), Rampage"),
    ], rules:{hero:true,monster:true,wizard:1,canBeReinforced:false},
  }),
  createUnit({
    id:"scourge-anointed-sentinels", name:"Scourge of Aqshy Anointed Sentinels", points:170, models:3,
    source:"Scourge of Aqshy", move:'10"', health:4, save:"4+", baseSize:"75×42mm",
    imageAlias:"annointed_sentinels", keywords:["Cavalry","Champion","Duardin"],
    weapons:[weapon("Glaive","Melee",3,"3+","3+",1,2,["Anti-Cavalry (+1 Rend)","Charge (+1 Damage)"])],
    abilities:[
      resilience,
      ability("Zealous Acolytes","Passive","+1 Ataques mientras disputa un objetivo que no controlas; +10 Control mientras disputa un objetivo que controlas."),
    ],
  }),
];
