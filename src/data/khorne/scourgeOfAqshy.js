import { ability as a, createUnit as u, weapon as w } from "./unitFactory";

export default [
  u({id:"scourge-bloodletters",name:"Scourge of Aqshy Bloodletters",points:150,models:10,health:2,control:1,save:"5+",ward:"6+",baseSize:"32mm",imageAlias:"bloodletters",source:"Scourge of Aqshy",
    keywords:["Infantry","Champion","Musician (1/10)","Standard Bearer (1/10)","Daemon","Ward (6+)"],
    weapons:[w("Hellblades","Melee",2,"3+","3+",1,1,["Blood-hungry","Crit (Mortal)"])],
    abilities:[a("Drawn to the Slaughter","Any Phase","Reaction when either player declares Eruption of Fury for a unit within 12\": return 1 slain model to this unit. If your opponent declared the ability and the unit using it is in combat with this unit, return 3 slain models instead.","Once Per Turn (Army), Reaction")],rules:{ward:"6+"}}),
  u({id:"scourge-blood-warriors",name:"Scourge of Aqshy Blood Warriors",points:190,models:10,health:2,control:1,save:"3+",baseSize:"32mm",imageAlias:"blood_warriors",source:"Scourge of Aqshy",
    keywords:["Infantry","Champion","Standard Bearer (1/10)","Bloodbound"],
    weapons:[w("Goreaxes and Gorefists","Melee",3,"4+","3+",1,1,["Blood-hungry","Crit (Auto-wound)"])],
    abilities:[a("Only the Worthy","Passive","Based on the number of models slain by this unit during the battle: 1+ adds 1 to charge rolls; 4+ adds 1 to hit rolls for combat attacks; 8+ adds 1 to wound rolls; 16+ doubles the Attacks characteristic of its combat weapons and its critical hits are triggered on unmodified hit rolls of 5+.")]}),
];
