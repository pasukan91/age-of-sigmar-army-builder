import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import {
  ghb2026Battleplans,
  ghb2026BattleTactics,
  ghb2026BattleTacticsCards,
} from "./ghb2026.js";

test("contains the unique battleplans supplied in the GHB 2026-27 PDF", () => {
  assert.equal(ghb2026Battleplans.length, 12);
  assert.equal(new Set(ghb2026Battleplans.map((item) => item.id)).size, 12);
  assert.deepEqual(
    ghb2026Battleplans.map((item) => item.number),
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  );
  ghb2026Battleplans.forEach((battleplan) => {
    assert.ok(battleplan.description.includes("Tabla"));
    assert.ok(battleplan.sections.length > 0);
    assert.ok(battleplan.scoring.length > 0);
    assert.match(battleplan.description, /Cada jugador obtiene puntos de victoria/);
    assert.ok(existsSync(`public${battleplan.image}`), `Missing map for ${battleplan.name}`);
  });
});

test("contains three tactics for each unique battle tactics card", () => {
  assert.equal(ghb2026BattleTacticsCards.length, 6);
  assert.equal(ghb2026BattleTactics.length, 18);
  assert.equal(new Set(ghb2026BattleTactics.map((item) => item.id)).size, 18);
  assert.equal(new Set(ghb2026BattleTacticsCards.map((item) => item.id)).size, 6);
  ghb2026BattleTacticsCards.forEach((card) => {
    assert.equal(card.tactics.length, 3);
    card.tactics.forEach((tactic) => {
      assert.equal(tactic.points, 5);
      assert.ok(tactic.flavour);
      assert.match(tactic.condition, /Completas esta táctica de batalla/);
    });
  });
  assert.equal(
    ghb2026BattleTacticsCards.find((card) => card.number === 3)
      .tactics.find((tactic) => tactic.type === "Dominio").name,
    "Reclama lo que es tuyo",
  );
});
