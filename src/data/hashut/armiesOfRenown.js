const trait = (id,name,phase,description) => ({ id,name,phase,description,points:0 });

export default [
  {
    id:"taars-grand-forgehost", name:"Taar's Grand Forgehost",
    rosterRules:"Debes incluir a Urak Taar. Debes incluir un Daemonsmith o Ashen Elder. Puedes incluir unidades Infantry Helsmiths of Hashut que no sean Hobgrot y cualquier War Machine Helsmiths of Hashut. No puedes incluir Regiments of Renown.",
    battleTraits:[
      trait("rising-fire","Rising Fire","Passive","Efectos acumulativos por ronda: en la 2, Crit (2 Hits); en la 3, +1 a lanzar y cantar; en la 4, los ataques obtienen críticos con 5+ sin modificar; en la 5, +1 al nivel de poder de Wizards y Priests."),
      trait("masterful-daemonworks","Masterful Daemonworks","Passive","Las War Machines de la Grand Forgehost tienen Ward (6+)."),
      trait("ranks-unbroken","Dread Ranks Unbroken","Your Movement Phase","Elige una Infantry Grand Forgehost amiga destruida. Despliega una unidad de reemplazo con la mitad de miniaturas, totalmente a 6\" de un terreno y a más de 9\" del enemigo.","Once Per Turn (Army)"),
    ],
    heroicTraits:[trait("ruthless-overseer","Ruthless Overseer","Passive","Cada vez que una unidad Grand Forgehost amiga totalmente a 12\" usa Rally, puedes hacer 3 tiradas de rally adicionales.")],
    artefacts:[trait("talisman-obsidian","Talisman of Obsidian","Passive","Resta 1 a las tiradas de impacto de los ataques que tengan como objetivo al portador.")],
    spellLores:[{id:"reinforce-daemonsteel",name:"Reinforce Daemonsteel",castingValue:7,phase:"Your Hero Phase",description:"CV 7, Unlimited. Hasta tu siguiente turno, ignora el primer punto de daño asignado en cada fase a unidades Grand Forgehost totalmente a 12\" del lanzador."}],
    prayerLores:[
      {id:"grasp-stone",name:"Grasp of Stone",chantingValue:4,phase:"Your Hero Phase",description:"CV 4, Unlimited. Elige un punto visible a 18\": los enemigos totalmente a 6\" tienen -1 Ataques de combate hasta tu siguiente turno; con 8+, también Strike-last."},
      {id:"shackling-curse",name:"Shackling Curse",castingValue:6,phase:"Your Hero Phase",description:"CV 6. Enemigo visible a 18\": -1 Ataques de sus armas de combate hasta tu siguiente turno."},
      {id:"lava-storm",name:"Lava Storm",chantingValue:5,phase:"Your Hero Phase",description:"CV 5. Elige un punto visible a 18\" y tira un dado por cada enemigo totalmente a 6\"; cada resultado que cumpla el cántico inflige D3 daños mortales."},
    ],
  },
  {
    id:"ziggurat-stampede", name:"Ziggurat Stampede",
    rosterRules:"Debes incluir un Daemonsmith on Infernal Taurus. Puedes incluir cualquier Cavalry Helsmiths of Hashut y cualquier Automaton Helsmiths of Hashut. No puedes incluir Regiments of Renown.",
    battleTraits:[
      trait("let-realms-tremble","Let the Realms Tremble","Passive","Suma X a las tiradas de carga de la Ziggurat Stampede, donde X es el número de unidades amigas de la estampida que ya cargaron esta fase."),
      trait("break-them","Break Them, One and All...!","Passive","Cualquier número de unidades Ziggurat Stampede puede usar el command Power Through en el mismo turno."),
      trait("run-roughshod","Run Roughshod","Your Movement Phase","Elige una unidad Ziggurat Stampede amiga en combate. Este turno puede Shoot y Fight aunque use Retreat, y no sufre daño mortal por retirarse.","Once Per Turn (Army)"),
    ],
    heroicTraits:[trait("raging-animus","Raging Animus","Passive","Cada vez que obtenga un 1 sin modificar en una salvación contra un ataque de combate, la unidad atacante sufre D3 daños mortales tras resolver Fight.")],
    artefacts:[trait("visage-great-bull","Visage of the Great Bull","Passive","Durante la fase de carga, suma 1 al número de dados usados para las tiradas de carga del portador, hasta un máximo de 3.")],
    spellLores:[
      {id:"searing-detonation",name:"Searing Detonation",castingValue:6,phase:"Your Hero Phase",description:"CV 6, Unlimited. Elige cada enemigo en combate con el lanzador; tira D3 por objetivo y con 2+ inflige ese resultado en daños mortales."},
      {id:"flaming-weapons",name:"Flaming Weapons",castingValue:7,phase:"Your Hero Phase",description:"CV 7. Unidad Ziggurat Stampede amiga totalmente a 12\": +1 Rend en sus armas de combate hasta tu siguiente turno."},
      {id:"burn-to-ash",name:"Burn to Ash",castingValue:8,phase:"Your Hero Phase",description:"CV 8. Enemigo visible a 18\": inflige D3 daños mortales; si es destruido, el terreno que ocupaba queda oscurecido y recibe una ficha de desolación."},
    ],
  },
];
