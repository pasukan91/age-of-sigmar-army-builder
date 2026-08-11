import {
  BATTLE_STAT_GROUPS,
  getBattleEventDefinition,
  getBattleRateMetrics,
  summarizeBattleLog,
} from "./battleStatistics.js";

export function formatBattleStatisticsCsv(entries, { listName = "" } = {}) {
  const safeEntries = Array.isArray(entries) ? entries : [];
  const total = summarizeBattleLog(safeEntries, "all");
  const rows = [
    ["ESTADÍSTICAS DE PARTIDA"],
    ["Lista", listName || "Sin nombre"],
    ["Eventos registrados", safeEntries.length],
    [],
    ["RESUMEN GENERAL"],
    ["Categoría", "Parámetro", "Yo", "Rival"],
  ];

  appendSummaryRows(rows, total, { includeEmpty: true });

  rows.push(
    [],
    ["COMPARATIVA POR RONDA"],
    ["Ronda", "Jugador", "PV", "Objetivos", "Tácticas", "Daño total", "Unidades destruidas"]
  );

  for (const round of [1, 2, 3, 4, 5]) {
    const summary = summarizeBattleLog(safeEntries, round);
    rows.push(formatRoundOverviewRow(round, "Yo", summary.self));
    rows.push(formatRoundOverviewRow(round, "Rival", summary.opponent));
  }

  rows.push(
    [],
    ["DETALLE POR RONDA"],
    ["Ronda", "Categoría", "Parámetro", "Yo", "Rival"]
  );

  for (const round of [1, 2, 3, 4, 5]) {
    const summary = summarizeBattleLog(safeEntries, round);
    appendSummaryRows(rows, summary, { roundLabel: `Ronda ${round}`, includeEmpty: false });
  }

  rows.push(
    [],
    ["CRONOLOGÍA DE LA PARTIDA"],
    ["#", "Ronda", "Jugador", "Evento", "Resultado", "Datos", "Nota", "Hora"]
  );

  safeEntries.forEach((entry, index) => {
    rows.push([
      index + 1,
      `Ronda ${clampRound(entry?.round)}`,
      entry?.actor === "opponent" ? "Rival" : "Yo",
      entry?.label || getBattleEventDefinition(entry?.actionId).label,
      entry?.result || "",
      formatEventValues(entry),
      entry?.note || "",
      formatTimestamp(entry?.createdAt),
    ]);
  });

  if (safeEntries.length === 0) rows.push(["Sin eventos registrados"]);

  return `\uFEFF${rows.map((row) => row.map(escapeCsvCell).join(";")).join("\r\n")}`;
}

export function getBattleStatisticsFilename(listName) {
  const slug = String(listName || "partida")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${slug || "partida"}-estadisticas.csv`;
}

function appendSummaryRows(rows, summary, { roundLabel = "", includeEmpty }) {
  for (const group of BATTLE_STAT_GROUPS) {
    for (const [key, label] of group.metrics) {
      const own = summary.self[key];
      const opponent = summary.opponent[key];
      if (!includeEmpty && own === 0 && opponent === 0) continue;
      rows.push(roundLabel
        ? [roundLabel, group.label, label, own, opponent]
        : [group.label, label, own, opponent]);
    }
  }

  for (const [label, own, opponent] of getBattleRateMetrics(summary)) {
    if (!includeEmpty && own === "—" && opponent === "—") continue;
    rows.push(roundLabel
      ? [roundLabel, "Porcentajes", label, own, opponent]
      : ["Porcentajes", label, own, opponent]);
  }
}

function formatRoundOverviewRow(round, actorLabel, summary) {
  const tacticAttempts = summary.battleTacticsCompleted + summary.battleTacticsFailed;
  return [
    `Ronda ${round}`,
    actorLabel,
    summary.victoryPoints,
    summary.objectives,
    `${summary.battleTacticsCompleted}/${tacticAttempts}`,
    summary.damage + summary.mortalDamage,
    summary.unitsDestroyed,
  ];
}

function formatEventValues(entry) {
  const values = entry?.values && typeof entry.values === "object" ? entry.values : {};
  const definition = getBattleEventDefinition(entry?.actionId);
  const knownFields = new Set(definition.fields.map((field) => field.id));
  const parts = definition.fields.flatMap((field) => {
    const value = values[field.id];
    if (value === undefined || value === null || value === "") return [];
    const option = field.options?.find((item) => item.value === value);
    return [`${field.label}: ${option?.label ?? value}`];
  });

  for (const [key, value] of Object.entries(values)) {
    if (!knownFields.has(key) && value !== "") parts.push(`${key}: ${value}`);
  }

  return parts.join(" · ");
}

function formatTimestamp(value) {
  const date = new Date(Number(value));
  if (!Number.isFinite(date.getTime())) return "";
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function clampRound(value) {
  return Math.min(5, Math.max(1, Number(value) || 1));
}

function escapeCsvCell(value) {
  let text = String(value ?? "");
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return /[;"\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}
