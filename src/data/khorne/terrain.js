export default [{
  id:"skull-altar", name:"Skull Altar", image:"/images/units/blades/skull_altar.jpg",
  profile:{move:"-",health:10,control:"-",save:"4+",ward:null},
  terrainAbilities:["Cover","Impassable"],
  abilities:[
    {name:"Words of Hate",phase:"Passive",description:"While this terrain feature has an Invoker, add 1 to that Invoker's chanting rolls. The Invoker cannot use Move abilities. Measure range and visibility from the altar, which is allocated attacks that target the Invoker. If the altar is destroyed, the Invoker suffers D3 mortal damage and is set up within 3\" of it."},
    {name:"Ascend the Altar",phase:"Your Hero Phase",description:"If this terrain feature does not have an Invoker, place a friendly Blades of Khorne Priest Infantry Hero within 3\" of it and not in combat on it."},
    {name:"Hatred of Sorcery",phase:"Your Hero Phase",description:"If this terrain feature has an Invoker, make banishment rolls for up to D3 enemy Endless Spells within 18\". If any are banished, gain 1 blood tithe point.",type:"Once Per Turn"},
    {name:"Descend the Altar",phase:"Your Movement Phase",description:"If the Invoker was not placed on the altar this turn, set it up wholly within 6\" of the altar and not in combat."},
  ],
  keywords:["Faction Terrain","Chaos","Blades of Khorne"],
}];
