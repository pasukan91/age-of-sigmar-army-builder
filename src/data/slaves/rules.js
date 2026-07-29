const rule = (
  id,
  name,
  phase,
  description,
  type = "Ability",
  points = 0,
  source = null
) => ({
  id,
  name,
  phase,
  description,
  type,
  points,
  ...(source ? { source } : {}),
});

export const battleTraits = [
  rule(
    "eye-of-the-gods",
    "Eye of the Gods",
    "Deployment Phase",
    "Una vez por batalla, elige un Hero Warriors of Chaos o Darkoath no Unique. Gana D3 puntos de Apoteosis cada vez que lucha y al final de tus turnos si disputa un objetivo totalmente fuera de territorio amigo."
  ),
  rule(
    "dark-apotheosis",
    "Dark Apotheosis",
    "Any Hero Phase",
    "Una vez por batalla, elige una unidad amiga con 8+ puntos de Apoteosis: puede curarse por completo y obtener Ward (5+) durante el resto de la batalla, o ser sustituida por un Daemon Prince que hereda general, mejoras y Pledge to Chaos. Retira las manifestaciones invocadas por el objetivo; si era tu general, el Daemon Prince pasa a serlo y se añade a su regimiento.",
    "Once Per Battle (Army)"
  ),
  rule(
    "pledge-to-chaos",
    "Pledge to Chaos",
    "Your Hero Phase",
    "Una vez por turno, una unidad Slaves to Darkness amiga no Unique que aún no tenga un juramento obtiene Pledged to Khorne, Tzeentch, Nurgle o Slaanesh durante el resto de la batalla.",
    "Once Per Turn (Army)"
  ),
  rule(
    "pledged-to-khorne",
    "Pledged to Khorne",
    "Passive",
    "Suma 1 a Ataques de las armas de combate de unidades amigas Pledged to Khorne."
  ),
  rule(
    "pledged-to-tzeentch",
    "Pledged to Tzeentch",
    "Your Movement Phase",
    "Una vez por turno, tira 2D6 y recoloca una unidad amiga Pledged to Tzeentch totalmente a 6\" de un punto dentro de esa distancia y a más de 9\" del enemigo.",
    "Once Per Turn (Army)"
  ),
  rule(
    "pledged-to-nurgle",
    "Pledged to Nurgle",
    "Passive",
    "Las unidades amigas Pledged to Nurgle tienen Ward (6+), o Ward (5+) si ya tenían Ward (6+)."
  ),
  rule(
    "pledged-to-slaanesh",
    "Pledged to Slaanesh",
    "Your Charge Phase",
    "Al cargar con una unidad amiga Pledged to Slaanesh, puedes tirar 1 dado adicional, hasta un máximo de 3; si lo haces, debes descartar 1 dado de tu elección."
  ),
];

export const battleFormations = [
  rule(
    "legion-of-chaos",
    "Legion of Chaos - United in Darkness",
    "Passive",
    "Mientras haya en el campo al menos 1 Hero Warriors of Chaos y otro Hero Daemon o Darkoath amigo, suma 2 al Control de unidades Slaves to Darkness amigas que disputen objetivos totalmente fuera de territorio amigo."
  ),
  rule(
    "godswrath-warband",
    "Godswrath Warband - Ironclad Onslaught",
    "End of Your Turn",
    "Elige un objetivo disputado por una unidad amiga y coloca una ficha profanada. Tira D3 por cada enemigo que dispute un objetivo profanado; con 2+, sufre esa cantidad de mortales.",
    "Once Per Turn (Army)"
  ),
  rule(
    "despoilers",
    "Despoilers - Feral Ruin",
    "End of Your Turn",
    "Elige un Daemon Prince amigo y una unidad Slaves to Darkness amiga visible, no Daemon ni Unique, totalmente a 12\". Retira sus keywords Pledge to Chaos y dale las que tenga el Daemon Prince.",
    "Once Per Turn (Army)"
  ),
  rule(
    "darkoath-horde",
    "Darkoath Horde - Rally the Tribes",
    "Your Movement Phase",
    "Gasta 1 PC. Si hay un Hero Darkoath amigo, elige una unidad Darkoath amiga no Hero ni Unique destruida. Con 3+, despliega una unidad de reemplazo con la mitad de miniaturas totalmente a 6\" del borde y a más de 3\" del enemigo.",
    "Once Per Turn (Army), Command"
  ),
];

export const heroicTraits = [
  rule(
    "favoured-of-the-pantheon",
    "Favoured of the Pantheon",
    "Passive",
    "Si esta unidad es el objetivo de Eye of the Gods, gana 3 puntos de Apoteosis."
  ),
  rule(
    "deathmonger",
    "Deathmonger",
    "Any Combat Phase",
    "Una vez por batalla, esta unidad puede luchar dos veces en esta fase; tras la primera vez obtiene Strike-last.",
    "Once Per Battle"
  ),
  rule(
    "radiance-of-dark-glory",
    "Radiance of Dark Glory",
    "Any Hero Phase",
    "Tira por cada unidad amiga dañada totalmente a 12\". Con 3+, Heal (1), o Heal (3) si es Monster.",
    "Ability",
    20
  ),
];

export const artefacts = [
  rule(
    "infernal-puppet",
    "Infernal Puppet",
    "Start of Any Turn",
    "Una vez por batalla, elige un Wizard enemigo visible a 24\". Durante este turno, cada vez que use un spell sufre D3 mortales; si muere, el spell no se resuelve.",
    "Once Per Battle"
  ),
  rule(
    "conquerors-crown",
    "The Conqueror's Crown",
    "Passive",
    "Resta 5 al Control de unidades Infantry enemigas en combate con el portador."
  ),
  rule(
    "realmwarpers-twist-rune",
    "Realmwarper's Twist-rune",
    "Your Hero Phase",
    "Una vez por batalla, un terreno a 12\" obtiene Obscuring hasta tu siguiente turno si no lo tenía. Tira por cada miniatura a 1\"; cada 5+ causa 1 mortal a su unidad.",
    "Once Per Battle"
  ),
];

export const aqshyArtefacts = [
  rule(
    "aelfskin-scroll",
    "Aelfskin Scroll",
    "Reaction: Opponent declared a Spell ability",
    "Una vez por batalla, elige un Wizard Slaves to Darkness amigo visible a 18\". Tras resolver el spell enemigo, puede usar un spell con la misma tirada de lanzamiento sin contar para su límite.",
    "Once Per Battle",
    0,
    "Aqshy"
  ),
  rule(
    "rune-of-murder",
    "Rune of Murder",
    "Any Combat Phase",
    "Una vez por batalla, elige un arma de combate: inflige 3 mortales al portador para duplicar sus Ataques este turno, o suma D6 a sus Ataques este turno.",
    "Once Per Battle",
    0,
    "Aqshy"
  ),
  rule(
    "darkflame-pendant",
    "Darkflame Pendant",
    "Passive",
    "Las armas usadas en ataques contra el portador tienen Damage máximo 1.",
    "Ability",
    0,
    "Aqshy"
  ),
];

export const brandsOfTheDarkGods = [
  rule(
    "brand-unbreakable-bonds",
    "Brand of Unbreakable Bonds",
    "Your Movement Phase",
    "Una vez por batalla, retira esta unidad y despliégala totalmente a 3\" de un objetivo que controles y fuera de combate. No puede cargar este turno.",
    "Once Per Battle",
    10,
    "Aqshy"
  ),
  rule(
    "brand-apoplexy",
    "Brand of Apoplexy",
    "Passive",
    "Mientras tu nivel de furia sea 7, suma 1 al Damage de las armas de esta unidad.",
    "Ability",
    10,
    "Aqshy"
  ),
  rule(
    "brand-unaligned",
    "Brand of the Unaligned",
    "Your Hero Phase",
    "Retira todos los Pledge to Chaos de esta unidad y elige uno que no haya tenido antes: Khorne, Tzeentch, Nurgle o Slaanesh. Lo conserva durante el resto de la batalla.",
    "Ability",
    20,
    "Aqshy"
  ),
];

export const ensorcelledBanners = [
  rule("dread-banner", "The Dread Banner", "Passive", "Mientras conserve un portaestandarte, los enemigos no pueden usar commands en combate con esta unidad."),
  rule("banner-rage", "The Banner of Rage", "Passive", "La unidad obtiene Pledged to Khorne y, mientras conserve un portaestandarte, suma 1 a herir con ataques de combate."),
  rule("blasted-standard", "The Blasted Standard", "Passive", "La unidad obtiene Pledged to Tzeentch y, mientras conserve un portaestandarte, tiene Ward (4+) contra daño de disparos."),
  rule("eroding-icon", "The Eroding Icon", "Passive", "La unidad obtiene Pledged to Nurgle y, mientras conserve un portaestandarte, los ataques contra ella no pueden conseguir críticos."),
  rule("banner-screaming-flesh", "The Banner of Screaming Flesh", "Passive", "La unidad obtiene Pledged to Slaanesh. Además, mientras incluya un portaestandarte, si cargó este turno, suma 1 a Ataques de sus armas de combate durante el resto del turno."),
];

export const spellLores = [{
  id: "lore-of-the-damned",
  name: "Lore of the Damned",
  spells: [
    {
      ...rule("spite-tongue-curse", "Spite-tongue Curse", "Your Hero Phase", "CV 5, Unlimited. Enemigo visible a 12\": sufre 3 mortales. Si falla o es disipado, el lanzador sufre D3 mortales."),
      castingValue: 5,
    },
    {
      ...rule("binding-damnation", "Binding Damnation", "Your Hero Phase", "CV 7. Enemigo visible a 12\": obtiene Strike-last hasta tu siguiente turno."),
      castingValue: 7,
    },
    {
      ...rule("daemonic-speed", "Daemonic Speed", "Your Hero Phase", "CV 7. Unidad Slaves to Darkness amiga visible totalmente a 12\": tira 1 dado adicional al cargar este turno, hasta un máximo de 3."),
      castingValue: 7,
    },
  ],
}];
