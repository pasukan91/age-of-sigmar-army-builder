const manifestations = [
  {
    id:"wrath-axe", name:"Wrath-axe", image:"/images/units/blades/wrath_axe.jpg", castingValue:4,
    profile:{move:'8"',health:7,control:"-",save:"5+",ward:"6+",banishment:"7+"},
    weapons:[{name:"Hatred's Edge",type:"Melee",attacks:4,hit:"4+",wound:"2+",rend:2,damage:3,abilities:[]}],
    abilities:[{name:"Hatred's Edge",phase:"Any Combat Phase",description:"Si cargó, elige un enemigo en combate con tamaño inicial mayor que 1. Tira 2D6; con 8+, elimina una miniatura."}],
    summonSpell:{name:"Summon Wrath-axe",type:"Prayer",phase:"Your Hero Phase",chantingValue:4,keywords:["Prayer","Summon"],description:"Despliega un Wrath-axe totalmente a 12\" del cantor, visible y a más de 9\" del enemigo."},
    keywords:["Manifestation","Invocation","Fly","Ward (6+)","Chaos","Blades of Khorne"],
  },
  {
    id:"hexgorger-skulls", name:"Hexgorger Skulls", image:"/images/units/blades/hexgorger_skulls.jpg", castingValue:4,
    profile:{move:'8"',health:6,control:"-",save:"5+",ward:"6+",banishment:"7+"},
    weapons:[{name:"Stream of Molten Blood",type:"Melee",attacks:2,hit:"4+",wound:"3+",rend:0,damage:3,abilities:[]}],
    abilities:[{name:"Multiple Parts",phase:"Passive",description:"Sus dos partes comparten Health y deben terminar cada turno a 8\" entre sí."},{name:"Hexgorgers",phase:"Passive",description:"Resta 1 a las tiradas de lanzamiento de Wizards enemigos por cada parte de esta manifestación a 8\"."}],
    summonSpell:{name:"Summon Hexgorger Skulls",type:"Prayer",phase:"Your Hero Phase",chantingValue:4,keywords:["Prayer","Summon"],description:"Despliega la primera parte totalmente a 12\" del cantor, visible y a más de 9\" del enemigo; la segunda totalmente a 8\" de la primera."},
    keywords:["Manifestation","Invocation","Fly","Ward (6+)","Chaos","Blades of Khorne"],
  },
  {
    id:"bleeding-icon", name:"Bleeding Icon", image:"/images/units/blades/blleding_icon.jpg", castingValue:4,
    profile:{move:"-",health:8,control:"-",save:"5+",ward:"6+",banishment:"7+"},
    weapons:[],
    abilities:[{name:"Sigil of Doom",phase:"Your Hero Phase",description:"Elige una unidad Blades of Khorne amiga visible totalmente a 8\" y una habilidad de tributo no desbloqueada. Tira un dado; si iguala o supera su coste, la unidad puede usarla hasta tu siguiente turno como si estuviera desbloqueada.","type":"Once Per Turn"}],
    summonSpell:{name:"Summon Bleeding Icon",type:"Prayer",phase:"Your Hero Phase",chantingValue:4,keywords:["Prayer","Summon"],description:"Despliega un Bleeding Icon totalmente a 18\" del cantor y visible."},
    keywords:["Manifestation","Invocation","Fly","Ward (6+)","Chaos","Blades of Khorne"],
  },
];

export default manifestations;
