const r = (id,name,phase,description,type="Ability") => ({id,name,phase,description,type,points:0});

const gorechosenRules = {
  battleTraits:[
    r("murder-won-trophies","Murder-won Trophies","Deployment Phase","Elige un Hero Gorechosen Champions amigo y dale un artefacto de este ejército de renombre.","Once Per Battle (Army)"),
    r("brutal-lashmaster","Brutal Lashmaster","Passive","Cuando Bloodstoker use Whipped to Fury, puede elegir otro Hero Gorechosen Champions dentro de su alcance en vez de una unidad Bloodbound no Hero."),
    r("legendary-slayers","Legendary Slayers","Passive","Las armas Blood-hungry de unidades Gorechosen Champions amigas tienen Crit (Mortal)."),
    r("red-gods-eye","The Red God's Eye","Passive","Las unidades Gorechosen Champions amigas tienen Ward (4+)."),
    r("hate-fuelled-killers","Hate-fuelled Killers","Passive","Cuando una unidad fuera a ser destruida, con 5+ no lo es, ignora el daño restante y Heal (1)."),
  ],
  heroicTraits:[r("crowned-in-butchery","Crowned in Butchery","Passive","+20 al Control del portador mientras está en combate.")],
  artefacts:[
    r("warmongers-icon","Warmonger's Icon","Any Combat Phase","Una vez por batalla, el portador y hasta D3 unidades Gorechosen Champions amigas en su alcance obtienen Strike-first este turno.","Once Per Battle"),
    r("scarring-blade","The Scarring Blade","Any Combat Phase","Inflige D3 mortales al portador. Este turno suma esa cantidad a Ataques de las armas de combate Gorechosen Champions amigas. El portador no puede usar Hate-fuelled Killers ni curarse durante el resto de la batalla."),
    r("bloodmist-skull","Bloodmist Skull","Passive","Ward (3+) contra daño de ataques de disparo."),
  ],
  prayerLores:[{id:"gorechosen-prayers",name:"Prayers of the Gorechosen",prayers:[
    {...r("skin-of-brass","Skin of Brass","Your Hero Phase","CV 4, Unlimited. Hasta tu siguiente turno resta 1 al Rend de ataques contra una unidad amiga totalmente a 12\"; con 8+, elige un segundo objetivo."),chantingValue:4},
    {...r("cowed-and-broken","Cowed and Broken","Your Hero Phase","CV 4. Tira 8 dados contra un enemigo a 12\" que esté en combate; cada 4+ causa 1 mortal, sumando 1 a cada dado con 8+."),chantingValue:4},
    {...r("eruption-apoplexy","Eruption of Apoplexy","Your Hero Phase","CV 4. Un enemigo a 12\" en combate sufre D6 mortales. Si es destruido, antes de retirar la última miniatura, cada unidad a 6\" sufre D3 mortales, o D6 con 8+."),chantingValue:4},
  ]}],
  manifestationLores:[{id:"gorechosen-manifestations",name:"Manifestations of the Gorechosen",manifestations:["wrath-axe"]}],
};

const balefulRules = {
  battleTraits:[
    r("born-of-butchery","Born of Butchery","Your Movement Phase","Elige una unidad Baleful Lords amiga destruida. Tira un dado por cada unidad destruida en la batalla; con 8 o más resultados de 4+, despliega una unidad de reemplazo idéntica a más de 9\" del enemigo.","Once Per Turn"),
    r("bellow-of-hatred","Bellow of Hatred","Any Combat Phase","Un Baleful Lord que no usó Rampage impide que enemigos en combate usen commands; él tampoco puede usar más Rampage este turno.","Once Per Turn (Army), Rampage"),
    r("mage-eaters","Mage-eaters","Any Hero Phase","Reacción a un spell que tenga como objetivo esta unidad: con 3+ se disipa; si la tirada fue 5+, el lanzador sufre D3 mortales.","Reaction"),
    r("first-in-his-sight","First in His Sight","End of Enemy Turn","Heal (D3) cada Hero Baleful Lords amigo en combate.","Once Per Turn (Army)"),
    r("drawn-by-blood","Drawn by Blood","End of Your Turn","Una unidad que no usó Rampage mueve D6\" y solo puede acabar en combate con enemigos con los que empezó la fase; si destruyó una unidad, mueve 2D6\" y puede acabar con cualquier enemigo dañado este turno.","Rampage"),
    r("price-of-mercy","The Price of Mercy","End of Your Turn","Debes elegir cada Baleful Lord que no cargó ni luchó. Por cada uno, con 2+ sufre 1 mortal.","Once Per Turn (Army)"),
    r("sunder-sorcerous","Sunder the Sorcerous","End of Any Turn","Cada manifestación enemiga a 3\" es objetivo de una tirada de destierro 2D6; si se destierra, su invocador sufre D3 mortales.","Once Per Turn (Army)"),
  ],
  heroicTraits:[r("unrivalled-battlelust","Unrivalled Battlelust","Any Combat Phase","+1 Ataques para unidades Baleful Lords amigas totalmente a 12\" este turno.","Once Per Battle (Army)")],
  artefacts:[r("crown-slaughterborn","Crown of the Slaughterborn","Passive","Los enemigos a 12\" no pueden curarse ni devolver miniaturas eliminadas.")],
};

export default [
  {id:"gorechosen-champions",name:"Gorechosen Champions",excludesRegimentsOfRenown:true,roster:["0-1 Mighty Lord of Khorne (debe ser general)","Slaughterpriests","Bloodsecrators","Bloodstokers","Realmgore Ritualists","Skullgrinders","Deathbringers"],rules:gorechosenRules},
  {id:"the-baleful-lords",name:"The Baleful Lords",excludesRegimentsOfRenown:true,roster:["Any Monster Hero Daemon units"],rules:balefulRules},
];
