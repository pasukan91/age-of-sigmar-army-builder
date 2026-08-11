import {
  BATTLE_STAT_GROUPS,
  getBattleRateMetrics,
  summarizeBattleLog,
} from "./battleStatistics.js";

export function formatBattleStatisticsCsv(entries) {
  const rows = [["Ronda", "Grupo", "Parámetro", "Yo", "Rival"]];

  for (const round of ["all", 1, 2, 3, 4, 5]) {
    const summary = summarizeBattleLog(entries, round);
    const roundLabel = round === "all" ? "Total" : `Ronda ${round}`;

    for (const group of BATTLE_STAT_GROUPS) {
      for (const [key, label] of group.metrics) {
        rows.push([roundLabel, group.label, label, summary.self[key], summary.opponent[key]]);
      }
    }

    for (const [label, own, opponent] of getBattleRateMetrics(summary)) {
      rows.push([roundLabel, "Porcentajes", label, own, opponent]);
    }
  }

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

function escapeCsvCell(value) {
  const text = String(value ?? "");
  return /[;"\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}
