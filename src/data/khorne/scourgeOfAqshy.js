import { ability as a, createUnit as u, weapon as w } from "./unitFactory";

export default [
  u({id:"scourge-bloodletters",name:"Scourge of Aqshy Bloodletters",points:150,models:10,health:2,control:1,save:"5+",ward:"6+",baseSize:"32mm",imageAlias:"bloodletters",source:"Scourge of Aqshy",
    keywords:["Infantry","Champion","Musician (1/10)","Standard Bearer (1/10)","Daemon","Ward (6+)"],
    weapons:[w("Hellblades","Melee",2,"3+","3+",1,1,["Blood-hungry","Crit (Mortal)"])],
    abilities:[a("Drawn to the Slaughter","Any Phase","Reacción cuando cualquier jugador declara Eruption of Fury a 12\": devuelve 1 miniatura; si la declaró el rival y la unidad que la usa está en combate con esta, devuelve 3.","Once Per Turn (Army), Reaction")],rules:{ward:"6+"}}),
  u({id:"scourge-blood-warriors",name:"Scourge of Aqshy Blood Warriors",points:190,models:10,health:2,control:1,save:"3+",baseSize:"32mm",imageAlias:"blood_warriors",source:"Scourge of Aqshy",
    keywords:["Infantry","Champion","Standard Bearer (1/10)","Bloodbound"],
    weapons:[w("Goreaxes and Gorefists","Melee",3,"4+","3+",1,1,["Blood-hungry","Crit (Auto-wound)"])],
    abilities:[a("Only the Worthy","Passive","Según miniaturas eliminadas por esta unidad durante la batalla: 1+ da +1 a cargar; 4+ da +1 a impactar en combate; 8+ da +1 a herir; 16+ duplica Ataques de combate y los críticos se activan con 5+.")]}),
];
