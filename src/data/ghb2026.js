function createBattleplan(number, table, name, description) {
  return {
    id: `ghb-2026-battleplan-${number}`,
    name,
    number,
    table,
    season: "GHB 2026-27",
    description: `Battleplan ${number} - Tabla ${table}\n${description}`,
  };
}

function createBattleTacticsCard(number, name, introduction, tactics) {
  return {
    id: `ghb-2026-battle-tactics-card-${number}`,
    name,
    number,
    season: "GHB 2026-27",
    tactics,
    description: [
      `Carta de battle tactics ${number}`,
      introduction,
      ...tactics.map((tactic) => `\n${tactic.type}: ${tactic.name}\n${tactic.condition}`),
    ].join("\n"),
  };
}

export const ghb2026Battleplans = [
  createBattleplan(
    1,
    1,
    "In the Flames",
    "Los ejércitos obtienen Secure the Gate y el ejército del underdog recibe Determined Defenders. Puntúa por controlar uno, dos o más objetivos que el rival.",
  ),
  createBattleplan(
    2,
    1,
    "Bloody Ribs",
    "Desde la segunda ronda entran en juego Embershines y una mejora temporal de héroe. La puntuación cambia tras la primera ronda.",
  ),
  createBattleplan(
    3,
    1,
    "Ash Avalanche",
    "El underdog puede desestabilizar los puentes y retirar elementos de terreno. Incluye condiciones adicionales de puntuación ligadas al terreno de facción.",
  ),
  createBattleplan(
    4,
    1,
    "The Caverns of Massacre",
    "Los pasadizos ocultos permiten retirar y recolocar elementos de terreno. Puntúa por controlar uno, dos o más pares de objetivos que el rival.",
  ),
  createBattleplan(
    5,
    1,
    "What's Yours Is Us",
    "Cada ronda activa un par de objetivos deseados distinto. El underdog puede cambiar el par activo una vez por batalla.",
  ),
  createBattleplan(
    7,
    2,
    "Deformed Ruins",
    "El terreno neutral puede arder y dañar unidades cercanas. La habilidad disponible cambia según seas o no el underdog.",
  ),
  createBattleplan(
    8,
    2,
    "Curse of the Bitch",
    "Los Power Sites aumentan la inestabilidad de las unidades. El underdog puede elegir un objetivo y elevar la inestabilidad de quienes lo disputan.",
  ),
  createBattleplan(
    9,
    2,
    "Seize the Embers",
    "Las unidades buscan Emberstone Nuggets en los objetivos y deben devolverlos a su campamento base para obtener puntos adicionales.",
  ),
  createBattleplan(
    10,
    2,
    "Treacherous Terrain",
    "Los objetivos comienzan estables y pueden cambiar entre estables e inestables. La puntuación depende del control de objetivos estables.",
  ),
  createBattleplan(
    11,
    2,
    "Flee the Coast",
    "El underdog puede retirar del campo un objetivo Golden Lions o Soliphiles una vez por batalla.",
  ),
  createBattleplan(
    12,
    2,
    "The Might of Kingdoms",
    "El objetivo de Soliphiles es el principal y el resto son secundarios. El underdog puede destruir objetivos secundarios alineados con el principal.",
  ),
];

export const ghb2026BattleTacticsCards = [
  createBattleTacticsCard(1, "Flaming Assault", "La batalla por una guarida vital comienza entre fuego y humo.", [
    {
      type: "Brawl",
      name: "Master of Weapons",
      condition: "Una misma unidad enemiga ha sufrido al menos 1 punto de daño en 3 fases distintas durante este turno.",
    },
    {
      type: "Strike",
      name: "Break Their Defenses",
      condition: "Controlas la guarida enemiga al final de tu turno.",
    },
    {
      type: "Domination",
      name: "No Survivors",
      condition: "Al menos 2 unidades enemigas fueron destruidas este turno y controlas la guarida enemiga.",
    },
  ]),
  createBattleTacticsCard(2, "Siege of Ashes", "Mantén el fuerte que bloquea el avance enemigo.", [
    {
      type: "Rift",
      name: "Form a Bulwark",
      condition: "Al menos 2 unidades amigas están totalmente fuera del territorio amigo, a 6 pulgadas o menos de él y a 3 pulgadas o menos entre sí.",
    },
    {
      type: "Strike",
      name: "Supply",
      condition: "Controlas un objetivo en territorio enemigo disputado por una unidad amiga que no usó una habilidad Move y otra que cargó este turno.",
    },
    {
      type: "Domination",
      name: "Repel the Attackers",
      condition: "Al menos 3 unidades amigas están a 3 pulgadas o menos del centro del campo y no están en combate.",
    },
  ]),
  createBattleTacticsCard(3, "Surrounded by Fire", "Flanquea y rodea al enemigo hasta dejarlo sin escapatoria.", [
    {
      type: "Brawl",
      name: "Ambush",
      condition: "Controlas una combinación de 2 objetivos o elementos de terreno, disputados por unidades amigas distintas situadas totalmente a 6 pulgadas o menos del territorio amigo y no desplegadas este turno.",
    },
    {
      type: "Strike",
      name: "Surround the Enemy",
      condition: "Al menos 2 unidades amigas desplegadas este turno están cada una a 9 pulgadas o menos de una esquina distinta y totalmente fuera del territorio amigo.",
    },
    {
      type: "Domination",
      name: "Take What's Ours",
      condition: "Hay 3 o más unidades amigas en territorio enemigo y al menos un héroe amigo totalmente dentro de él.",
    },
  ]),
  createBattleTacticsCard(4, "Smokescreen", "Engaña al enemigo y oculta tus verdaderas fuerzas entre el humo.", [
    {
      type: "Chasing",
      name: "Keep the Enemy Close",
      condition: "Controlas un objetivo disputado por al menos 1 unidad enemiga.",
    },
    {
      type: "Strike",
      name: "Feign Weakness",
      condition: "Este turno se destruyeron más unidades amigas que unidades enemigas.",
    },
    {
      type: "Domination",
      name: "Execute the Plan",
      condition: "Controlas todos los objetivos situados en territorio enemigo.",
    },
  ]),
  createBattleTacticsCard(6, "Legend of the Arid", "Un héroe se alza para convertirse en leyenda mientras el fuego lo consume todo.", [
    {
      type: "Brawl",
      name: "Daring Rescue",
      condition: "Una unidad enemiga que estaba en combate al inicio del turno fue destruida por un ataque de combate de una unidad amiga que cargó este turno.",
    },
    {
      type: "Strike",
      name: "Commanding on the Front",
      condition: "Al menos 2 héroes amigos están en el campo, todos a 9 pulgadas o menos de una unidad enemiga visible, y ninguno murió este turno.",
    },
    {
      type: "Domination",
      name: "Legendary Hero",
      condition: "Controlas un objetivo totalmente fuera de tu territorio que no controlabas al inicio del turno y un héroe amigo lo disputa.",
    },
  ]),
];
