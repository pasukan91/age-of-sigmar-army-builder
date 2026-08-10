export const BATTLE_ACTORS = [
  { id: "self", label: "Yo" },
  { id: "opponent", label: "Rival" },
];

export const BATTLE_EVENT_DEFINITIONS = [
  { id: "turn-start", label: "Inicio de turno", group: "Ronda", fields: [] },
  { id: "priority", label: "Tirada de iniciativa", group: "Ronda", fields: [numberField("selfRoll", "Mi tirada"), numberField("opponentRoll", "Tirada rival"), choiceField("doubleTurn", "Doble turno", [["no", "No"], ["yes", "Sí"]])] },
  { id: "victory-points", label: "Puntos de victoria", group: "Puntuación", fields: [numberField("points", "PV")] },
  { id: "objectives", label: "Objetivos controlados", group: "Puntuación", fields: [numberField("controlled", "Objetivos")] },
  { id: "battle-tactic", label: "Táctica de batalla", group: "Puntuación", fields: [choiceField("status", "Resultado", [["completed", "Completada"], ["failed", "Fallida"]])] },
  { id: "command-points", label: "Puntos de mando", group: "Recursos", fields: [numberField("gained", "Ganados"), numberField("spent", "Gastados")] },
  { id: "fury", label: "Furia", group: "Recursos", fields: [numberField("gained", "Ganada"), numberField("spent", "Gastada")] },
  { id: "redeploy", label: "Redeploy", group: "Movimiento", quickDice: 6, fields: [numberField("roll", "Tirada")] },
  { id: "run", label: "Correr", group: "Movimiento", quickDice: 6, fields: [numberField("roll", "Tirada")] },
  { id: "charge", label: "Carga", group: "Movimiento", fields: [numberField("roll", "Tirada"), choiceField("status", "Resultado", [["success", "Exitosa"], ["failed", "Fallida"]])] },
  { id: "cast", label: "Lanzamiento", group: "Magia y plegarias", fields: [numberField("roll", "Tirada"), choiceField("status", "Resultado", [["success", "Exitoso"], ["failed", "Fallido"], ["unbound", "Dispersado"]])] },
  { id: "unbind", label: "Dispersión", group: "Magia y plegarias", fields: [numberField("roll", "Tirada"), choiceField("status", "Resultado", [["success", "Exitosa"], ["failed", "Fallida"]])] },
  { id: "chant", label: "Canto", group: "Magia y plegarias", fields: [numberField("roll", "Tirada"), choiceField("status", "Resultado", [["success", "Exitoso"], ["failed", "Fallido"]])] },
  { id: "banish", label: "Destierro", group: "Magia y plegarias", fields: [numberField("roll", "Tirada"), choiceField("status", "Resultado", [["success", "Exitoso"], ["failed", "Fallido"]])] },
  { id: "attack", label: "Secuencia de ataque", group: "Combate", fields: [
    numberField("attacks", "Ataques"),
    numberField("hits", "Impactos"),
    numberField("wounds", "Heridas"),
    numberField("failedSaves", "Salvaciones fallidas"),
    numberField("failedWards", "Ward fallidas"),
    numberField("damage", "Daño"),
    numberField("mortalDamage", "Daño mortal"),
  ] },
  { id: "damage", label: "Daño causado", group: "Combate", fields: [numberField("damage", "Daño"), numberField("mortalDamage", "Daño mortal")] },
  { id: "healing", label: "Curación y retorno", group: "Combate", fields: [numberField("healing", "Heridas curadas"), numberField("modelsReturned", "Modelos devueltos")] },
  { id: "casualties", label: "Bajas causadas", group: "Combate", fields: [numberField("modelsSlain", "Modelos"), numberField("unitsDestroyed", "Unidades")] },
  { id: "save-rolls", label: "Salvaciones", group: "Defensa", fields: [numberField("attempts", "Tiradas"), numberField("passed", "Superadas")] },
  { id: "ward-rolls", label: "Ward", group: "Defensa", fields: [numberField("attempts", "Tiradas"), numberField("passed", "Superadas")] },
  { id: "roll", label: "Tirada genérica", group: "Otros", fields: [numberField("roll", "Resultado")] },
  { id: "note", label: "Nota", group: "Otros", fields: [] },
];

export const BATTLE_STAT_GROUPS = [
  {
    id: "score",
    label: "Puntuación",
    metrics: [
      ["victoryPoints", "PV"],
      ["objectives", "Objetivos"],
      ["battleTacticsCompleted", "Tácticas completadas"],
      ["battleTacticsFailed", "Tácticas fallidas"],
      ["priorityWins", "Iniciativas ganadas"],
      ["turnsPlayed", "Turnos iniciados"],
      ["doubleTurns", "Dobles turnos"],
      ["commandPointsGained", "PC ganados"],
      ["commandPointsSpent", "PC gastados"],
      ["furyGained", "Furia ganada"],
      ["furySpent", "Furia gastada"],
    ],
  },
  {
    id: "movement",
    label: "Movimiento",
    metrics: [
      ["redeploys", "Redeploys"],
      ["redeployDistance", "Total Redeploy"],
      ["runs", "Carreras"],
      ["runDistance", "Total correr"],
      ["chargeAttempts", "Cargas intentadas"],
      ["successfulCharges", "Cargas exitosas"],
      ["chargeDistance", "Distancia de carga"],
    ],
  },
  {
    id: "magic",
    label: "Magia y plegarias",
    metrics: [
      ["castsAttempted", "Lanzamientos"],
      ["castsSuccessful", "Lanzamientos exitosos"],
      ["castsUnbound", "Lanzamientos dispersados"],
      ["unbindsAttempted", "Dispersiones"],
      ["unbindsSuccessful", "Dispersiones exitosas"],
      ["chantsAttempted", "Cantos"],
      ["chantsSuccessful", "Cantos exitosos"],
      ["banishmentsAttempted", "Destierros"],
      ["banishmentsSuccessful", "Destierros exitosos"],
    ],
  },
  {
    id: "combat",
    label: "Combate",
    metrics: [
      ["attacks", "Ataques"],
      ["hits", "Impactos"],
      ["wounds", "Heridas"],
      ["failedSaves", "Salvaciones fallidas"],
      ["failedWards", "Ward fallidas"],
      ["damage", "Daño"],
      ["mortalDamage", "Daño mortal"],
      ["healing", "Curación"],
      ["modelsReturned", "Modelos devueltos"],
      ["modelsSlain", "Modelos eliminados"],
      ["unitsDestroyed", "Unidades destruidas"],
    ],
  },
  {
    id: "defence",
    label: "Defensa",
    metrics: [
      ["saveAttempts", "Salvaciones tiradas"],
      ["savesPassed", "Salvaciones superadas"],
      ["wardAttempts", "Ward tiradas"],
      ["wardsPassed", "Ward superadas"],
    ],
  },
  {
    id: "other",
    label: "Otros",
    metrics: [
      ["genericRolls", "Tiradas registradas"],
      ["genericRollTotal", "Suma de tiradas"],
    ],
  },
];

export function getBattleEventDefinition(actionId) {
  return BATTLE_EVENT_DEFINITIONS.find((item) => item.id === actionId) ?? BATTLE_EVENT_DEFINITIONS.at(-1);
}

export function summarizeBattleLog(entries, selectedRound = "all") {
  const summary = { self: createEmptySummary(), opponent: createEmptySummary() };

  for (const entry of Array.isArray(entries) ? entries : []) {
    const round = clampRound(entry?.round);
    if (selectedRound !== "all" && Number(selectedRound) !== round) continue;

    const actor = entry?.actor === "opponent" ? "opponent" : "self";
    applyEntry(summary[actor], entry);
  }

  return summary;
}

function applyEntry(summary, entry) {
  const values = entry?.values && typeof entry.values === "object" ? entry.values : {};
  const actionId = entry?.actionId || legacyActionId(entry?.label);
  const number = (key, fallback = 0) => numeric(values[key] ?? fallback);
  const legacyResult = numeric(entry?.result);

  switch (actionId) {
    case "turn-start":
      summary.turnsPlayed += 1;
      break;
    case "priority":
      summary.priorityWins += 1;
      if (values.doubleTurn === "yes") summary.doubleTurns += 1;
      break;
    case "victory-points":
      summary.victoryPoints += number("points", legacyResult);
      break;
    case "objectives":
      summary.objectives += number("controlled", legacyResult);
      break;
    case "battle-tactic":
      if (values.status === "failed") summary.battleTacticsFailed += 1;
      else summary.battleTacticsCompleted += 1;
      break;
    case "command-points":
      summary.commandPointsGained += number("gained");
      summary.commandPointsSpent += number("spent");
      break;
    case "fury":
      summary.furyGained += number("gained");
      summary.furySpent += number("spent");
      break;
    case "redeploy":
      summary.redeploys += 1;
      summary.redeployDistance += number("roll", legacyResult);
      break;
    case "run":
      summary.runs += 1;
      summary.runDistance += number("roll", legacyResult);
      break;
    case "charge":
      summary.chargeAttempts += 1;
      summary.chargeDistance += number("roll", legacyResult);
      if (values.status !== "failed") summary.successfulCharges += 1;
      break;
    case "cast":
      summary.castsAttempted += 1;
      if (values.status === "success") summary.castsSuccessful += 1;
      if (values.status === "unbound") summary.castsUnbound += 1;
      break;
    case "unbind":
      summary.unbindsAttempted += 1;
      if (values.status === "success") summary.unbindsSuccessful += 1;
      break;
    case "chant":
      summary.chantsAttempted += 1;
      if (values.status === "success") summary.chantsSuccessful += 1;
      break;
    case "banish":
      summary.banishmentsAttempted += 1;
      if (values.status === "success") summary.banishmentsSuccessful += 1;
      break;
    case "attack":
      for (const key of ["attacks", "hits", "wounds", "failedSaves", "failedWards", "damage", "mortalDamage"]) {
        summary[key] += number(key);
      }
      break;
    case "damage":
      summary.damage += number("damage", legacyResult);
      summary.mortalDamage += number("mortalDamage");
      break;
    case "healing":
      summary.healing += number("healing", legacyResult);
      summary.modelsReturned += number("modelsReturned");
      break;
    case "casualties":
      summary.modelsSlain += number("modelsSlain");
      summary.unitsDestroyed += number("unitsDestroyed");
      break;
    case "save-rolls":
      summary.saveAttempts += number("attempts");
      summary.savesPassed += number("passed");
      break;
    case "ward-rolls":
      summary.wardAttempts += number("attempts");
      summary.wardsPassed += number("passed");
      break;
    case "roll":
      summary.genericRolls += 1;
      summary.genericRollTotal += number("roll", legacyResult);
      break;
    default:
      break;
  }
}

function createEmptySummary() {
  return Object.fromEntries(
    BATTLE_STAT_GROUPS.flatMap((group) => group.metrics.map(([key]) => [key, 0]))
  );
}

function legacyActionId(label) {
  const normalized = String(label ?? "").toLowerCase();
  if (normalized.includes("redeploy")) return "redeploy";
  if (normalized.includes("daño")) return "damage";
  if (normalized.includes("curación")) return "healing";
  if (normalized.includes("mando")) return "command-points";
  if (normalized.includes("táctica")) return "battle-tactic";
  return "note";
}

function numberField(id, label) {
  return { id, label, type: "number" };
}

function choiceField(id, label, options) {
  return { id, label, type: "choice", options: options.map(([value, optionLabel]) => ({ value, label: optionLabel })) };
}

function numeric(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(0, number) : 0;
}

function clampRound(value) {
  return Math.min(5, Math.max(1, Number(value) || 1));
}
