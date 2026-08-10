import test from "node:test";
import assert from "node:assert/strict";

import { summarizeBattleLog } from "./battleStatistics.js";

test("summarises both players independently for a selected round", () => {
  const entries = [
    { actor: "self", round: 1, actionId: "victory-points", values: { points: 5 } },
    { actor: "opponent", round: 1, actionId: "victory-points", values: { points: 3 } },
    { actor: "self", round: 1, actionId: "attack", values: { attacks: 10, hits: 7, wounds: 5, damage: 6 } },
    { actor: "self", round: 2, actionId: "damage", values: { damage: 4, mortalDamage: 2 } },
  ];

  const roundOne = summarizeBattleLog(entries, 1);
  assert.equal(roundOne.self.victoryPoints, 5);
  assert.equal(roundOne.opponent.victoryPoints, 3);
  assert.equal(roundOne.self.attacks, 10);
  assert.equal(roundOne.self.damage, 6);

  const total = summarizeBattleLog(entries);
  assert.equal(total.self.damage, 10);
  assert.equal(total.self.mortalDamage, 2);
});

test("tracks successes, failures and defence rolls", () => {
  const entries = [
    { actor: "opponent", round: 3, actionId: "charge", values: { roll: 9, status: "success" } },
    { actor: "opponent", round: 3, actionId: "cast", values: { roll: 8, status: "unbound" } },
    { actor: "opponent", round: 3, actionId: "battle-tactic", values: { status: "failed" } },
    { actor: "opponent", round: 3, actionId: "save-rolls", values: { attempts: 8, passed: 5 } },
  ];

  const summary = summarizeBattleLog(entries, 3).opponent;
  assert.equal(summary.chargeAttempts, 1);
  assert.equal(summary.successfulCharges, 1);
  assert.equal(summary.chargeDistance, 9);
  assert.equal(summary.castsAttempted, 1);
  assert.equal(summary.castsUnbound, 1);
  assert.equal(summary.battleTacticsFailed, 1);
  assert.equal(summary.saveAttempts, 8);
  assert.equal(summary.savesPassed, 5);
});

test("keeps legacy entries useful in the new statistics", () => {
  const summary = summarizeBattleLog([
    { label: "Redeploy", result: "4", round: 1 },
    { label: "Daño", result: "6", round: 1 },
  ]).self;

  assert.equal(summary.redeploys, 1);
  assert.equal(summary.redeployDistance, 4);
  assert.equal(summary.damage, 6);
});

test("attributes initiative wins and double turns to the correct player", () => {
  const summary = summarizeBattleLog([
    { actor: "opponent", round: 2, actionId: "priority", values: { selfRoll: 3, opponentRoll: 5, doubleTurn: "yes" } },
    { actor: "opponent", round: 2, actionId: "turn-start", values: {} },
  ], 2);

  assert.equal(summary.self.priorityWins, 0);
  assert.equal(summary.opponent.priorityWins, 1);
  assert.equal(summary.opponent.doubleTurns, 1);
  assert.equal(summary.opponent.turnsPlayed, 1);
});
