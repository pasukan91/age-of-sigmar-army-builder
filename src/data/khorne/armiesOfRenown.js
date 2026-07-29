const r = (id,name,phase,description,type="Ability") => ({id,name,phase,description,type,points:0});

const gorechosenRules = {
  battleTraits:[
    r("murder-won-trophies","Murder-won Trophies","Deployment Phase","Pick a friendly Gorechosen Champions Hero and give it an artefact of power from this Army of Renown.","Once Per Battle (Army)"),
    r("brutal-lashmaster","Brutal Lashmaster","Passive","When a Bloodstoker uses Whipped to Fury, it can pick another Gorechosen Champions Hero within its combat range instead of a non-Hero Bloodbound unit."),
    r("legendary-slayers","Legendary Slayers","Passive","Blood-hungry weapons used by friendly Gorechosen Champions units have Crit (Mortal)."),
    r("red-gods-eye","The Red God's Eye","Passive","Friendly Gorechosen Champions units have Ward (6+)."),
    r("hate-fuelled-killers","Hate-fuelled Killers","Passive","When a friendly unit would be destroyed, on a 5+, it is not destroyed, any remaining damage points have no effect and it can Heal (1)."),
  ],
  heroicTraits:[r("crowned-in-butchery","Crowned in Butchery","Passive","Add 20 to the bearer's control score while it is in combat.")],
  artefacts:[
    r("warmongers-icon","Warmonger's Icon","Any Combat Phase","Once per battle, the bearer and up to D3 friendly Gorechosen Champions units within its combat range have Strike-first this turn.","Once Per Battle"),
    r("scarring-blade","The Scarring Blade","Any Combat Phase","Allocate D3 damage points to the bearer; ward rolls cannot be made for those damage points. This turn, add that amount to the Attacks characteristic of combat weapons used by friendly Gorechosen Champions units. The bearer cannot use Hate-fuelled Killers and cannot be healed for the rest of the battle."),
    r("bloodmist-skull","Bloodmist Skull","Passive","The bearer has Ward (3+) against damage points inflicted by shooting attacks."),
  ],
  prayerLores:[{id:"gorechosen-prayers",name:"Prayers of the Gorechosen",prayers:[
    {...r("skin-of-brass","Skin of Brass","Your Hero Phase","Chanting value 4, Unlimited. Until the start of your next turn, subtract 1 from the Rend characteristic of attacks that target a friendly unit wholly within 12\". If the chanting roll was 8+, pick a second target."),chantingValue:4},
    {...r("cowed-and-broken","Cowed and Broken","Your Hero Phase","Chanting value 4. Roll 8 dice for an enemy unit within 12\" that is in combat. For each 4+, inflict 1 mortal damage, adding 1 to each roll if the chanting roll was 8+."),chantingValue:4},
    {...r("eruption-apoplexy","Eruption of Apoplexy","Your Hero Phase","Chanting value 4. An enemy unit within 12\" that is in combat suffers D6 mortal damage. If it is destroyed, before removing its last model, each unit within 6\" suffers D3 mortal damage, or D6 if the chanting roll was 8+."),chantingValue:4},
  ]}],
  manifestationLores:[{id:"gorechosen-manifestations",name:"Manifestations of the Gorechosen",manifestations:["wrath-axe"]}],
};

const balefulRules = {
  battleTraits:[
    r("born-of-butchery","Born of Butchery","Your Movement Phase","Pick a friendly non-Unique Baleful Lords unit that has been destroyed. Roll a number of dice equal to the current battle round plus the number of friendly and enemy units that have been destroyed. If 8 or more rolls are 3+, set up an identical replacement unit wholly within 7\" of a battlefield edge and more than 9\" from all enemy units.","Once Per Turn"),
    r("bellow-of-hatred","Bellow of Hatred","Any Combat Phase","Pick a Baleful Lord that has not used a Rampage ability this turn. Enemy units in combat with it cannot use commands this turn, and it cannot use any other Rampage abilities this turn.","Once Per Turn (Army), Rampage"),
    r("mage-eaters","Mage-eaters","Reaction: Opponent declared a Spell ability","Reaction to a spell ability that targets this unit: on a 3+, the spell is unbound. If the roll was 5+, the caster also suffers D3 mortal damage.","Once Per Turn (Army), Reaction"),
    r("first-in-his-sight","First in His Sight","End of Enemy Turn","Each friendly Baleful Lords Hero that is in combat can Heal (D3).","Once Per Turn (Army)"),
    r("drawn-by-blood","Drawn by Blood","End of Your Turn","Pick a unit that has not used a Rampage ability this turn. It can move D6\" and can only end that move in combat with enemy units it was in combat with at the start of the phase. If it destroyed a unit this turn, it can move 2D6\" instead and can end that move in combat with any enemy unit damaged this turn.","Rampage"),
    r("price-of-mercy","The Price of Mercy","End of Your Turn","You must pick each Baleful Lord that did not charge or fight this turn. For each one, on a 2+, inflict 1 mortal damage on it.","Once Per Turn (Army)"),
    r("sunder-sorcerous","Sunder the Sorcerous","End of Any Turn","Make a 2D6 banishment roll for each enemy manifestation within 3\". If a manifestation is banished, its summoner suffers D3 mortal damage.","Once Per Turn (Army)"),
  ],
  heroicTraits:[r("unrivalled-battlelust","Unrivalled Battlelust","Any Combat Phase","Add 1 to the Attacks characteristic of combat weapons used by friendly Baleful Lords units wholly within 12\" this turn.","Once Per Battle (Army)")],
  artefacts:[r("crown-slaughterborn","Crown of the Slaughterborn","Passive","Enemy units within 12\" cannot be healed and slain models cannot be returned to them.")],
};

export default [
  {id:"gorechosen-champions",name:"Gorechosen Champions",excludesRegimentsOfRenown:true,roster:["0-1 Mighty Lord of Khorne (must be the general)","Slaughterpriests","Bloodsecrators","Bloodstokers","Realmgore Ritualists","Skullgrinders","Deathbringers"],rules:gorechosenRules},
  {id:"the-baleful-lords",name:"The Baleful Lords",excludesRegimentsOfRenown:true,roster:["Any Monster Hero Daemon units"],rules:balefulRules},
];
