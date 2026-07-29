export default [{
  id:"skull-altar", name:"Skull Altar", image:"/images/units/blades/skull_altar.jpg",
  profile:{move:"-",health:10,control:"-",save:"4+",ward:null},
  terrainAbilities:["Cover","Impassable"],
  abilities:[
    {name:"Words of Hate",phase:"Passive",description:"Mientras tenga Invoker, suma 1 a sus cánticos; no puede usar Move; mide alcance y visibilidad desde el altar, que recibe sus ataques. Si el altar es destruido, el Invoker sufre D3 mortales y se despliega a 3\"."},
    {name:"Ascend the Altar",phase:"Your Hero Phase",description:"Si no tiene Invoker, coloca sobre él un Priest Infantry Blades of Khorne amigo a 3\" y fuera de combate."},
    {name:"Hatred of Sorcery",phase:"Your Hero Phase",description:"Con Invoker, intenta desterrar hasta D3 Endless Spells enemigos a 18\". Si alguno es desterrado, gana 1 punto de tributo de sangre.","type":"Once Per Turn"},
    {name:"Descend the Altar",phase:"Your Movement Phase",description:"Si el Invoker no fue colocado este turno, desplíegalo totalmente a 6\" y fuera de combate."},
  ],
  keywords:["Faction Terrain","Chaos","Blades of Khorne"],
}];
