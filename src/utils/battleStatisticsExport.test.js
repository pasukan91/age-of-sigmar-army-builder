import test from "node:test";
import assert from "node:assert/strict";

import {
  formatBattleStatisticsCsv,
  getBattleStatisticsFilename,
} from "./battleStatisticsExport.js";

test("exports a readable report with summary, rounds and chronology", () => {
  const csv = formatBattleStatisticsCsv([
    {
      actor: "self",
      round: 1,
      actionId: "victory-points",
      label: "Puntos de victoria",
      result: "5 PV",
      note: "Objetivo central",
      values: { points: 5 },
      createdAt: 1767225600000,
    },
    {
      actor: "opponent",
      round: 2,
      actionId: "damage",
      label: "Daño causado",
      values: { damage: 7 },
      createdAt: 1767225660000,
    },
  ], { listName: "Mis Ogors" });

  assert.match(csv, /^\uFEFFESTADÍSTICAS DE PARTIDA/);
  assert.match(csv, /Lista;Mis Ogors/);
  assert.match(csv, /RESUMEN GENERAL\r\nCategoría;Parámetro;Yo;Rival/);
  assert.match(csv, /Puntuación;PV;5;0/);
  assert.match(csv, /COMPARATIVA POR RONDA/);
  assert.match(csv, /Ronda 2;Rival;0;0;0\/0;7;0/);
  assert.match(csv, /DETALLE POR RONDA/);
  assert.match(csv, /Ronda 2;Combate;Daño;0;7/);
  assert.match(csv, /CRONOLOGÍA DE LA PARTIDA/);
  assert.match(csv, /1;Ronda 1;Yo;Puntos de victoria;5 PV;PV: 5;Objetivo central;/);
});

test("omits empty metrics from the per-round detail", () => {
  const csv = formatBattleStatisticsCsv([], { listName: "Partida vacía" });
  const detail = csv.split("DETALLE POR RONDA")[1].split("CRONOLOGÍA DE LA PARTIDA")[0];

  assert.doesNotMatch(detail, /Ronda 5;Porcentajes;Tácticas completadas/);
  assert.match(csv, /Sin eventos registrados/);
});

test("protects spreadsheet exports from formula injection", () => {
  const csv = formatBattleStatisticsCsv([
    { actor: "self", round: 1, actionId: "note", label: "Nota", note: "=1+1" },
  ]);

  assert.match(csv, /;'=1\+1;/);
});

test("creates a safe statistics filename", () => {
  assert.equal(getBattleStatisticsFilename("Ejército de Íñigo"), "ejercito-de-inigo-estadisticas.csv");
});
