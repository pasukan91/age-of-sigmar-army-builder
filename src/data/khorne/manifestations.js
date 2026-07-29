const manifestations = [
  {
    id:"wrath-axe", name:"Wrath-axe", image:"/images/units/blades/wrath_axe.jpg", castingValue:4,
    profile:{move:'8"',health:7,control:"-",save:"5+",ward:"6+",banishment:"7+"},
    weapons:[{name:"Hatred's Edge",type:"Melee",attacks:4,hit:"4+",wound:"2+",rend:2,damage:3,abilities:[]}],
    abilities:[{name:"Hatred's Edge",phase:"Any Combat Phase",description:"If this manifestation charged this turn, pick an enemy unit in combat with it that has a starting size greater than 1. Roll 2D6. On an 8+, 1 model in that unit is slain."}],
    summonSpell:{name:"Summon Wrath-axe",type:"Prayer",phase:"Your Hero Phase",chantingValue:4,keywords:["Prayer","Summon"],description:"Set up a Wrath-axe wholly within 12\" of and visible to the chanter, and more than 9\" from all enemy units."},
    keywords:["Manifestation","Invocation","Fly","Ward (6+)","Chaos","Blades of Khorne"],
  },
  {
    id:"hexgorger-skulls", name:"Hexgorger Skulls", image:"/images/units/blades/hexgorger_skulls.jpg", castingValue:4,
    profile:{move:'8"',health:6,control:"-",save:"5+",ward:"6+",banishment:"7+"},
    weapons:[{name:"Stream of Molten Blood",type:"Melee",attacks:2,hit:"4+",wound:"3+",rend:0,damage:3,abilities:[]}],
    abilities:[{name:"Multiple Parts",phase:"Passive",description:"Both parts of this manifestation share one Health characteristic and must end each turn within 8\" of each other."},{name:"Hexgorgers",phase:"Passive",description:"Subtract 1 from casting rolls for enemy Wizards for each part of this manifestation within 8\" of them."}],
    summonSpell:{name:"Summon Hexgorger Skulls",type:"Prayer",phase:"Your Hero Phase",chantingValue:4,keywords:["Prayer","Summon"],description:"Set up the first part wholly within 12\" of and visible to the chanter, and more than 9\" from all enemy units. Then set up the second part wholly within 8\" of the first."},
    keywords:["Manifestation","Invocation","Fly","Ward (6+)","Chaos","Blades of Khorne"],
  },
  {
    id:"bleeding-icon", name:"Bleeding Icon", image:"/images/units/blades/blleding_icon.jpg", castingValue:4,
    profile:{move:"-",health:8,control:"-",save:"5+",ward:"6+",banishment:"7+"},
    weapons:[],
    abilities:[{name:"Sigil of Doom",phase:"Your Hero Phase",description:"Pick a friendly Blades of Khorne unit wholly within 8\" and visible to this manifestation, then pick a Blood Tithe ability that has not been unlocked. Roll a dice. If the roll equals or exceeds that ability's cost, the unit can use it until the start of your next turn as if it were unlocked.",type:"Once Per Turn"}],
    summonSpell:{name:"Summon Bleeding Icon",type:"Prayer",phase:"Your Hero Phase",chantingValue:4,keywords:["Prayer","Summon"],description:"Set up a Bleeding Icon wholly within 18\" of and visible to the chanter."},
    keywords:["Manifestation","Invocation","Fly","Ward (6+)","Chaos","Blades of Khorne"],
  },
];

export default manifestations;
