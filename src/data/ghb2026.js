function section(label, text, title = null, timing = null) {
  return { label, title, timing, text };
}

function createBattleplan(number, table, name, sections, scoring) {
  const sectionText = sections.map((item) => [
    item.label,
    item.timing,
    item.title,
    item.text,
  ].filter(Boolean).join("\n"));

  return {
    id: `ghb-2026-battleplan-${number}`,
    name,
    number,
    table,
    season: "GHB 2026-27",
    image: `/images/battleplans/ghb-2026/battleplan-${number}.${number === 6 ? "jpeg" : "webp"}`,
    sections,
    scoring,
    description: [
      `Plan de batalla ${number} (Tabla ${table})`,
      ...sectionText,
      "Cada jugador obtiene puntos de victoria al final de cada uno de sus turnos del siguiente modo:",
      ...scoring,
    ].join("\n\n"),
  };
}

function createBattleTacticsCard(number, name, introduction, setup, tactics) {
  const identifiedTactics = tactics.map((tactic, index) => ({
    ...tactic,
    id: `ghb-2026-battle-tactics-card-${number}-tactic-${index + 1}`,
    cardNumber: number,
    cardName: name,
    season: "GHB 2026-27",
  }));

  return {
    id: `ghb-2026-battle-tactics-card-${number}`,
    name,
    number,
    season: "GHB 2026-27",
    introduction,
    setup,
    tactics: identifiedTactics,
    description: [
      `Carta de táctica ${number}`,
      introduction,
      setup,
      ...identifiedTactics.map((tactic) => [
        `${tactic.type}: ${tactic.name}`,
        tactic.flavour,
        tactic.condition,
        `${tactic.points} puntos de victoria`,
      ].filter(Boolean).join("\n")),
    ].filter(Boolean).join("\n\n"),
  };
}

export const ghb2026Battleplans = [
  createBattleplan(1, 1, "Al fuego", [
    section("GIRO", "Los ejércitos de ambos jugadores tienen la habilidad «Asegurar el paso». Mientras seas el jugador en desventaja, tu ejército tiene la habilidad «Defensores aguerridos»."),
    section("HABILIDAD", "Efecto: Mientras controles el Lugar de poder completamente en territorio amigo, las armas de combate de las unidades amigas tienen Anti-Carga (+1 Perforar) mientras disputen un objetivo que controles.", "ASEGURAR EL PASO", "Pasiva"),
    section("HABILIDAD", "Efecto: Suma 3 a las puntuaciones de control de las unidades amigas que estén completamente fuera de territorio enemigo.", "DEFENSORES AGUERRIDOS", "Pasiva"),
  ], [
    "Obtienes 3 puntos de victoria si controlas al menos 1 objetivo.",
    "Obtienes 3 puntos de victoria si controlas 2 o más objetivos.",
    "Obtienes 4 puntos de victoria si controlas más objetivos que tu oponente.",
  ]),

  createBattleplan(2, 1, "Costas salpicadas de sangre", [
    section("GIRO", "Desde la segunda ronda de batalla en adelante, ambos jugadores pueden usar estas habilidades:"),
    section("HABILIDAD", "Declara: Toma como blanco una unidad amiga que haya cargado en este turno y tenga alguna esquirla de piedrascua.\n\nEfecto: Designa 1 de los efectos siguientes y aplícalo durante el resto del turno:\n\n• Suma 1 a las tiradas para impactar de los ataques de combate del blanco.\n• Suma 1 a las tiradas para herir de los ataques de combate del blanco.\n\nA continuación, si eres el jugador en desventaja, retira todas las esquirlas de piedrascua del blanco. Si no lo eres, retira todas las esquirlas de piedrascua de cada unidad amiga.", "ARMAS MEJORADAS CON PIEDRASCUA", "Cualquier fase de combate"),
    section("HABILIDAD", "Declara: Toma como blanco una unidad amiga que dispute un objetivo que controles.\n\nEfecto: Dale al blanco una esquirla de piedrascua.", "RESERVA DE PIEDRASCUA", "Una vez por turno (Ejército), Tu fase de héroe"),
  ], [
    "Obtienes 3 puntos de victoria si controlas al menos 1 objetivo.",
    "Obtienes 3 puntos de victoria si controlas 2 o más objetivos.",
    "En la primera ronda de batalla, obtienes 4 puntos de victoria si controlas más objetivos que tu oponente.",
    "Desde la segunda ronda de batalla en adelante, obtienes 4 puntos de victoria si controlas algún objetivo que controlaba el oponente al inicio del turno.",
  ]),

  createBattleplan(3, 1, "Avalancha de cenizas", [
    section("GIRO", "Si eres el jugador en desventaja, debes usar esta habilidad:"),
    section("HABILIDAD", "Declara: Toma como blancos cada objetivo. A continuación, designa 1 de ellos como el foco.\n\nEfecto: Tira 1D6 por cada blanco. Suma 1 al resultado por cada unidad (amiga y enemiga) que esté disputándolo. Si el blanco es el foco, puedes sumar o restar 3 al resultado. Con 8+, retira el blanco del campo de batalla.", "EL PASO COLAPSA", "Una vez por ronda de batalla, Inicio de la ronda de batalla"),
  ], [
    "Obtienes 3 puntos de victoria si controlas al menos 1 objetivo.",
    "Obtienes 3 puntos de victoria si controlas 2 o más objetivos.",
    "Obtienes 4 puntos de victoria si controlas más objetivos que tu oponente.",
    "Obtienes 3 puntos de victoria si solo hay 1 objetivo en el campo de batalla y controlas en territorio enemigo un elemento de terreno que no es TERRENO DE FACCIÓN.",
    "Obtienes 7 puntos de victoria si no hay objetivos en el campo de batalla y controlas más elementos de terreno que no son TERRENO DE FACCIÓN que tu oponente.",
  ]),

  createBattleplan(4, 1, "Cavernas de la matanza", [
    section("GIRO", "Si eres el jugador en desventaja, puedes usar la habilidad «Pasadizos cambiantes». Ambos jugadores pueden usar la habilidad «Ir por los túneles»."),
    section("HABILIDAD", "Declara: Toma como blancos 2 elementos de terreno que no sean TERRENO DE FACCIÓN.\n\nEfecto: Retira todas las fichas de pasadizo secreto del campo de batalla (si las hay). A continuación, asigna una ficha de pasadizo secreto a cada blanco.", "PASADIZOS CAMBIANTES", "Una vez por ronda de batalla, Inicio de la ronda de batalla"),
    section("HABILIDAD", "Declara: Toma como blanco una unidad amiga completamente a 6\" o menos de un elemento de terreno que tenga una ficha de pasadizo secreto.\n\nEfecto: Retira el blanco del campo de batalla y sitúalo de nuevo completamente a 6\" o menos de otro elemento de terreno que tenga una ficha de pasadizo secreto y a más de 9\" de toda unidad enemiga.", "IR POR LOS TÚNELES", "Una vez por turno (Ejército), Tu fase de movimiento"),
  ], [
    "Obtienes 3 puntos de victoria si controlas al menos 1 objetivo.",
    "Obtienes 3 puntos de victoria si controlas 2 o más objetivos.",
    "Obtienes 4 puntos de victoria si controlas alguna pareja de objetivos.",
  ]),

  createBattleplan(5, 1, "Lo vuestro es nuestro", [
    section("GIRO", "Mientras el número de la ronda de batalla sea impar, la pareja de objetivos de los Leones Dorados es la pareja de objetivos codiciada.\n\nMientras el número de la ronda de batalla sea par, la pareja de objetivos de los Buscasoles es la pareja de objetivos codiciada.\n\nSi eres el jugador en desventaja, puedes usar esta habilidad:"),
    section("HABILIDAD", "Declara: Toma como blanco una pareja de objetivos.\n\nEfecto: Durante el resto de la ronda de batalla, el blanco es la pareja de objetivos codiciada en lugar de la otra pareja de objetivos.", "TODA LA RABIA", "Una vez por ronda de batalla, Inicio de la ronda de batalla"),
  ], [
    "Obtienes 3 puntos de victoria si controlas al menos 1 objetivo.",
    "Obtienes 3 puntos de victoria si controlas la pareja de objetivos codiciada.",
    "Obtienes 4 puntos de victoria si controlas más objetivos que tu oponente.",
  ]),

  createBattleplan(6, 1, "Ocultos bajo nubes de cenizas", [
    section("GIRO", "Al inicio de cada ronda de batalla, el jugador en desventaja debe decidir si las nubes de ceniza están bajas o no. Si no hay jugador en desventaja, las nubes de ceniza están bajas.\n\nLa siguiente habilidad pasiva se aplica en esta batalla:"),
    section("HABILIDAD", "Efecto: Mientras las nubes de ceniza estén bajas:\n\n• No se pueden situar, en territorio neutral, ni unidades ni MANIFESTACIONES.\n• Ni unidades ni MANIFESTACIONES pueden terminar un movimiento en territorio neutral salvo si empezaron ese movimiento completamente dentro de terreno neutral.\n• Las MINIATURAS y MANIFESTACIONES solo son visibles para otras miniaturas a más de 3\" si se puede trazar una línea recta entre algún punto de sus peanas sin cruzar territorio neutral.", "NUBES DE CENIZA POR DOQUIER", "Pasiva"),
  ], [
    "Obtienes 3 puntos de victoria si controlas al menos 1 objetivo.",
    "Obtienes 3 puntos de victoria si controlas 2 o más objetivos.",
    "Obtienes 4 puntos de victoria si controlas más objetivos que tu oponente.",
  ]),

  createBattleplan(7, 2, "Ruinas brujas", [
    section("DESPLIEGUE", "Cada elemento de terreno que no sea TERRENO DE FACCIÓN debe situarse a 12\" o menos de al menos otro elemento de terreno que no sea TERRENO DE FACCIÓN."),
    section("GIRO", "Si eres el jugador en desventaja, debes usar esta habilidad:"),
    section("HABILIDAD", "Declara: Si no hay elementos de terreno ardiendo en el campo de batalla, toma como blanco un elemento de terreno que no sea TERRENO DE FACCIÓN. Si los hay, toma como blanco un elemento de terreno que no sea TERRENO DE FACCIÓN que no esté ardiendo y que esté a 12\" o menos de un elemento de terreno ardiendo.\n\nEfecto: El blanco está ardiendo durante el resto de la batalla. A continuación, inflige 1D3 daños mortales a cada unidad (amiga o enemiga) a 6\" o menos de algún elemento de terreno ardiendo.", "SE EXTIENDE EL FUEGO DISFORME", "Una vez por ronda de batalla, Inicio de la ronda de batalla"),
  ], [
    "Obtienes 3 puntos de victoria si controlas al menos 1 objetivo.",
    "Obtienes 3 puntos de victoria si controlas alguna pareja de objetivos.",
    "Obtienes 4 puntos de victoria si controlas más objetivos que tu oponente.",
  ]),

  createBattleplan(8, 2, "Maldición del Roer", [
    section("GIRO", "Al inicio de la batalla, el nivel de inestabilidad es 1. Suma 1 al nivel de inestabilidad, hasta un máximo de 6, siempre que algún jugador use la habilidad «Activar Lugar de poder».\n\nTras decidir quién tendrá el primer turno, el jugador en desventaja puede usar esta habilidad:"),
    section("HABILIDAD", "Declara: Toma como blanco un objetivo.\n\nEfecto: Inflige una cantidad de daños mortales a cada unidad (amiga o enemiga) que dispute el blanco igual al nivel de inestabilidad. A continuación, el nivel de inestabilidad vuelve a ser 1.", "ECOS DE PLAGÓPOLIS", "Una vez por ronda de batalla, Inicio de la ronda de batalla"),
  ], [
    "Obtienes 3 puntos de victoria si controlas el objetivo Leones Dorados.",
    "Obtienes 3 puntos de victoria si controlas el objetivo Buscasoles.",
    "Obtienes 4 puntos de victoria si controlas más objetivos que tu oponente.",
  ]),

  createBattleplan(9, 2, "Conseguir las ascuas", [
    section("GIRO", "Ambos jugadores pueden usar estas habilidades:"),
    section("HABILIDAD", "Declara: Toma como blanco una unidad amiga que no tenga pedazos de piedrascua y que dispute un objetivo de Buscasoles.\n\nEfecto: Asigna al blanco 1 pedazo de piedrascua. Si eres el jugador en desventaja, el blanco puede, inmediatamente, mover 6\" pero no puede terminar dicho movimiento trabado. El blanco no puede usar las habilidades «De vuelta al campo base» o «Arrollar» durante el resto del turno.", "INSPECCIONAR LAS RUINAS", "Final de tu turno"),
    section("HABILIDAD", "Declara: Toma como blanco una unidad amiga que tenga algún pedazo de piedrascua, que no fuera situada este turno y que dispute un objetivo de Leones Dorados.\n\nEfecto: Retira al blanco su pedazo de piedrascua.", "DE VUELTA AL CAMPO BASE", "Una vez por turno (Ejército), Final de tu turno"),
  ], [
    "Obtienes 3 puntos de victoria si controlas al menos 1 objetivo.",
    "En la primera ronda de batalla, obtienes 3 puntos de victoria si controlas 2 o más objetivos.",
    "Desde la segunda ronda de batalla en adelante, obtienes 3 puntos de victoria si usaste la habilidad «De vuelta al campo base» en este turno.",
    "Obtienes 4 puntos de victoria si controlas más objetivos que tu oponente.",
  ]),

  createBattleplan(10, 2, "Suelo traicionero", [
    section("GIRO", "Al inicio de la batalla, todos los objetivos están estables.\n\nAmbos jugadores deben usar la habilidad «Pasito a pasito». A continuación, desde la segunda ronda de batalla en adelante, si eres el jugador en desventaja, puedes usar la habilidad «Temblor violento»."),
    section("HABILIDAD", "Declara: Toma como blanco un objetivo en territorio amigo.\n\nEfecto: El blanco deja de estar estable.", "PASITO A PASITO", "Una vez por batalla (Ejército), Inicio de la primera ronda de batalla"),
    section("HABILIDAD", "Declara: Toma como blancos una pareja de objetivos.\n\nEfecto: El objetivo estable blanco deja de estar estable. El otro objetivo blanco pasa a estar estable en su lugar.", "TEMBLOR VIOLENTO", "Una vez por ronda de batalla, Inicio de la ronda de batalla"),
  ], [
    "Obtienes 3 puntos de victoria si controlas al menos 1 objetivo estable.",
    "Obtienes 3 puntos de victoria si controlas 2 o más objetivos estables.",
    "Obtienes 4 puntos de victoria si controlas más objetivos estables que tu oponente.",
  ]),

  createBattleplan(11, 2, "Escapar de la costa", [
    section("GIRO", "Si eres el jugador en desventaja, puedes usar esta habilidad:"),
    section("HABILIDAD", "Declara: Toma como blanco un objetivo Protectores de Helden o Buscasoles.\n\nEfecto: retira el blanco del campo de batalla.", "¡A LAS NAVES!", "Una vez por ronda de batalla, Inicio de la ronda de batalla"),
  ], [
    "Obtienes 3 puntos de victoria si controlas al menos 1 objetivo.",
    "Obtienes 3 puntos de victoria si controlas 2 o más objetivos.",
    "Obtienes 4 puntos de victoria si controlas más objetivos que tu oponente.",
  ]),

  createBattleplan(12, 2, "Poder de los reinos", [
    section("GIRO", "Al inicio de la batalla, el objetivo Buscasoles es el objetivo primario y el resto son objetivos secundarios.\n\nSi eres el jugador en desventaja, puedes usar esta habilidad:"),
    section("HABILIDAD", "Declara: Toma como blanco un Lugar de poder que controles.\n\nEfecto: Traza una línea recta desde el centro del objetivo primario al blanco. Si esa línea toca cualquier objetivo secundario, el primer objetivo secundario tocado por la línea pasa a ser el objetivo primario y el resto de objetivos son ahora secundarios.", "CARGA ARCANA", "Una vez por ronda de batalla, Inicio de la ronda de batalla"),
  ], [
    "Obtienes 3 puntos de victoria si controlas el objetivo primario.",
    "Obtienes 3 puntos de victoria si controlas 2 o más objetivos secundarios.",
    "Obtienes 4 puntos de victoria si controlas más objetivos que tu oponente.",
  ]),
];

export const ghb2026BattleTacticsCards = [
  createBattleTacticsCard(
    1,
    "Ataque ardiente",
    "Entre humo y fuego, comienza la batalla por el control de un bastión vital.",
    "Al inicio de la batalla, después de usar todas las habilidades Fase de despliegue pero antes de determinar qué jugador tendrá el primer turno, tu oponente debe elegir 1 elemento de terreno que no sea TERRENO DE FACCIÓN y esté en su territorio para que sea su escondite. El escondite no se puede retirar del campo de batalla en ningún momento durante la batalla.",
    [
      { type: "Altercado", name: "Maestro de armas", flavour: "Una invasión exitosa requiere habilidad en todos los aspectos de la guerra.", condition: "Completas esta táctica de batalla al final de tu turno si, durante este turno, se le ha asignado a la misma unidad enemiga al menos 1 daño en 3 fases diferentes.", points: 5 },
      { type: "Golpe", name: "Rompe sus defensas", flavour: "El enemigo no se podrá esconder más...", condition: "Completas esta táctica de batalla al final de tu turno si controlas el escondite enemigo.", points: 5 },
      { type: "Dominio", name: "Sin supervivientes", flavour: "Asegúrate de que lo único que se cuente de esta batalla sea cómo la ganaste.", condition: "Completas esta táctica de batalla al final de tu turno si se han eliminado 2 o más unidades enemigas en este turno y controlas el escondite enemigo.", points: 5 },
    ],
  ),
  createBattleTacticsCard(
    2,
    "Asedio y cenizas",
    "Has ocupado una fortaleza que bloquea el paso del enemigo y la defenderás hasta la muerte.",
    null,
    [
      { type: "Altercado", name: "Forma un muro", flavour: "Una buena defensa necesita unos cimientos sólidos.", condition: "Completas esta táctica de batalla al final de tu turno si 2 o más unidades amigas están completamente fuera de territorio amigo, completamente a 6\" o menos de territorio amigo, y a 3\" o menos entre sí.", points: 5 },
      { type: "Golpe", name: "Resuministra el campamento", flavour: "Un general debe ser preciso en cuanto a dónde y cuándo asignar refuerzos.", condition: "Completas esta táctica de batalla al final de tu turno si controlas algún objetivo en territorio enemigo y dicho objetivo está disputado por:\n\n• Al menos 1 unidad amiga que no usó habilidades MOVIMIENTO en este turno.\n• Al menos 1 unidad amiga diferente que cargó en este turno.", points: 5 },
      { type: "Dominio", name: "Rechazar a los atacantes", flavour: "Desata tu furia y expulsa a tus enemigos.", condition: "Completas esta táctica de batalla al final de tu turno si hay 3 o más unidades amigas que no estén trabadas a 3\" o menos del centro del campo de batalla.", points: 5 },
    ],
  ),
  createBattleTacticsCard(
    3,
    "Atormenta los flancos",
    "El plan es simple: flanquear y rodear al enemigo, y asegurarse de que ninguno escape con vida.",
    null,
    [
      { type: "Altercado", name: "Emboscada", flavour: "Envía hostigadores para acechar al enemigo.", condition: "Completas esta táctica de batalla al final de tu turno si 2 o más objetivos o elementos de terreno que controles en cualquier combinación, los disputan, cada uno, unidades amigas diferentes que estén a más de 6\" del territorio amigo y que no se situaron en este turno.", points: 5 },
      { type: "Golpe", name: "Rodea al enemigo", flavour: "Rodea al enemigo como las llamas de una conflagración rodean a los condenados.", condition: "Completas esta táctica de batalla al final de tu turno si 2 o más unidades amigas que no se situaron en este turno están, cada una, a 9\" o menos de una esquina distinta del campo de batalla y completamente fuera de territorio amigo.", points: 5 },
      { type: "Dominio", name: "Reclama lo que es tuyo", flavour: "Estas tierras son tuyas, expulsa de ellas a tu oponente.", condition: "Completas esta táctica de batalla al final de tu turno si hay más unidades amigas en territorio enemigo que unidades enemigas y hay 1 o más HÉROES amigos completamente en territorio enemigo.", points: 5 },
    ],
  ),
  createBattleTacticsCard(
    4,
    "Pantalla de humo",
    "Atrae al enemigo fingiendo debilidad, y oculta tu verdadera fuerza entre el humo de la batalla hasta el momento oportuno.",
    null,
    [
      { type: "Altercado", name: "Mantén a tus enemigos cerca", flavour: "Mantén tus motivos ocultos y al enemigo inconsciente de su papel en tus planes.", condition: "Completas esta táctica de batalla al final de tu turno si controlas algún objetivo disputado por alguna unidad enemiga.", points: 5 },
      { type: "Golpe", name: "Finge debilidad", flavour: "Permitir que el enemigo obtenga pequeñas victorias lo distrae de la tarea en cuestión.", condition: "Completas esta táctica de batalla al final de tu turno si se han eliminado más unidades amigas que enemigas en este turno.", points: 5 },
      { type: "Dominio", name: "Ejecuta el plan", flavour: "Lleva a cabo tu plan y observa cómo el ejército enemigo arde en llamas.", condition: "Completas esta táctica de batalla al final de tu turno si controlas cada objetivo en territorio enemigo.", points: 5 },
    ],
  ),
  createBattleTacticsCard(
    5,
    "Ardiendo en deseos de venganza",
    "Las atrocidades del enemigo merecen un castigo brutal. Rastréalo y derrótalo.",
    "Al inicio de la batalla, después de usar todas las habilidades Fase de despliegue, pero antes de determinar qué jugador jugará el primer turno, elige un HÉROE enemigo en el campo de batalla o en reserva. Ese es el fugitivo durante el resto de la batalla.",
    [
      { type: "Altercado", name: "Inspecciona cada rincón", flavour: "Campo de lava, llanura de ceniza, o jungla húmeda, da igual, no dejes rincones sin explorar.", condition: "Completas esta táctica de batalla al final de tu turno si hay una unidad amiga diferente completamente dentro de cada cuadrante grande del campo de batalla, si esas unidades amigas están a más de 9\" del centro del campo de batalla, y si no se ha situado más de 1 de esas unidades amigas en este turno.", points: 5 },
      { type: "Golpe", name: "Persecución rápida", flavour: "Tras ser detectado, el tiempo se agota para el fugitivo.", condition: "Completas esta táctica de batalla al final de tu turno si se cumple alguna de estas condiciones:\n\n• Hay 3 o más unidades amigas, ninguna de ellas trabada, a 12\" o menos del fugitivo enemigo.\n• No hay fugitivo enemigo en el campo de batalla.", points: 5 },
      { type: "Dominio", name: "Captúradlo", flavour: "Vivo o muerto, el fugitivo pagará por sus actos.", condition: "Completas esta táctica de batalla al final de tu turno si se cumple alguna de estas condiciones:\n\n• Hay 3 o más unidades amigas trabadas con el fugitivo enemigo.\n• No hay fugitivo enemigo en el campo de batalla y 3 o más unidades amigas disputan un mismo objetivo, el cual está completamente fuera de territorio amigo.", points: 5 },
    ],
  ),
  createBattleTacticsCard(
    6,
    "Leyenda del erial",
    "Cuando el fuego y la muerte amenazan con consumirlo todo, surgirá un héroe y nacerá una leyenda.",
    null,
    [
      { type: "Altercado", name: "Rescate temerario", flavour: "Los guerreros más respetados son los que ayudan voluntariamente a sus aliados.", condition: "Completas esta táctica de batalla al final de tu turno si se eliminó alguna unidad enemiga que estuviese trabada al inicio del turno con ataques de combate de una unidad amiga que cargó en este turno.", points: 5 },
      { type: "Golpe", name: "Lidera desde el frente", flavour: "Los comandantes deben trabajar en equipo para impulsar la maquinaria de guerra.", condition: "Completas esta táctica de batalla al final de tu turno si hay 2 o más HÉROES amigos en el campo de batalla, si todos los HÉROES amigos están a 9\" o menos de alguna unidad enemiga visible para alguno de ellos, y si ningún HÉROE amigo murió en este turno.", points: 5 },
      { type: "Dominio", name: "Héroe de leyenda", flavour: "Completar una gran misión es ver tu nombre pasar a la historia.", condition: "Completas esta táctica de batalla al final de tu turno si controlas un objetivo completamente fuera de tu territorio que no controlabas al inicio del turno y algún HÉROE amigo está disputando ese objetivo.", points: 5 },
    ],
  ),
];

export const ghb2026BattleTactics = ghb2026BattleTacticsCards.flatMap(
  (card) => card.tactics
);
