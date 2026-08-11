import test from "node:test";
import assert from "node:assert/strict";

import {
  formatBattleStatisticsCsv,
  getBattleStatisticsFilename,
} from "./battleStatisticsExport.js";

test("exports totals and every battle round for both players", () => {
  const csv = formatBattleStatisticsCsv([
    { actor: "self", round: 1, actionId: "victory-points", values: { points: 5 } },
    { actor: "opponent", round: 2, actionId: "damage", values: { damage: 7 } },
  ]);

  assert.match(csv, /^\uFEFFRonda;Grupo;Parámetro;Yo;Rival/);
  assert.match(csv, /Total;Puntuación;PV;5;0/);
  assert.match(csv, /Ronda 1;Puntuación;PV;5;0/);
  assert.match(csv, /Ronda 2;Combate;Daño;0;7/);
  assert.match(csv, /Ronda 5;Porcentajes;Tácticas completadas;—;—/);
});

test("creates a safe statistics filename", () => {
  assert.equal(getBattleStatisticsFilename("Ejército de Íñigo"), "ejercito-de-inigo-estadisticas.csv");
});
