import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import {
  ghb2026Battleplans,
  ghb2026BattleTacticsCards,
} from "./ghb2026.js";

test("contains the unique battleplans supplied in the GHB 2026-27 PDF", () => {
  assert.equal(ghb2026Battleplans.length, 11);
  assert.equal(new Set(ghb2026Battleplans.map((item) => item.id)).size, 11);
  assert.deepEqual(
    ghb2026Battleplans.map((item) => item.number),
    [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12],
  );
  ghb2026Battleplans.forEach((battleplan) => {
    assert.ok(battleplan.description.includes("Table"));
    assert.ok(existsSync(`public${battleplan.image}`), `Missing map for ${battleplan.name}`);
  });
});

test("contains three tactics for each unique battle tactics card", () => {
  assert.equal(ghb2026BattleTacticsCards.length, 5);
  assert.equal(new Set(ghb2026BattleTacticsCards.map((item) => item.id)).size, 5);
  ghb2026BattleTacticsCards.forEach((card) => assert.equal(card.tactics.length, 3));
});
