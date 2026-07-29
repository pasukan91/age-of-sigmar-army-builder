const eligible = ["tzeentch","nurgle","hedonites","skaven","std"];

export default [
  {
    id:"the-exiled-one",name:"The Exiled One",points:390,sourceFaction:"khorne",
    eligibleFactionIds:eligible,organisation:["1 Skarbrand"],unitIds:["skarbrand"],
    abilities:[{name:"Hatred for All",phase:"Any Combat Phase",description:"If Skarbrand is not in combat and there is another friendly unit visible to and within his combat range, you must pick one and resolve Skarbrand's combat attacks against it."}],
  },
  {
    id:"the-red-revelation",name:"The Red Revelation",points:380,sourceFaction:"khorne",
    eligibleFactionIds:eligible,organisation:["1 Slaughterpriest","10 Bloodreavers","5 Skullreapers"],unitIds:["slaughterpriest","bloodreavers","skullreapers"],
    abilities:[
      {name:"Frenzied Violence",phase:"Your Hero Phase",description:"Prayer (4): pick a unit in this regiment wholly within 12\". It has Ward (5+) while every model in it is within an enemy unit's combat range. If the chanting roll was 10+, pick a second target."},
      {name:"Glimpse the God",phase:"End of Any Turn",description:"For each unit in this regiment that fought, if it damaged an enemy unit that was destroyed this turn and no friendly unit outside this regiment damaged that enemy unit with combat attacks, add 2 to the Attacks characteristic of that unit's Blood-hungry weapons for the rest of the battle."},
    ],
  },
];
