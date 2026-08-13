import assert from "node:assert/strict";
import test from "node:test";

import {
  MAX_BATTLE_LOG_ENTRIES,
  MAX_BATTLE_LOG_TEXT_LENGTH,
  limitBattleLogEntries,
  truncateBattleLogText,
} from "./battleLogLimits.js";

test("keeps only the most recent battle log entries", () => {
  const entries = Array.from(
    { length: MAX_BATTLE_LOG_ENTRIES + 25 },
    (_, index) => ({ id: index })
  );

  const limited = limitBattleLogEntries(entries);

  assert.equal(limited.length, MAX_BATTLE_LOG_ENTRIES);
  assert.equal(limited[0].id, 25);
});

test("bounds user supplied battle log text", () => {
  const value = "x".repeat(MAX_BATTLE_LOG_TEXT_LENGTH + 20);
  assert.equal(truncateBattleLogText(value).length, MAX_BATTLE_LOG_TEXT_LENGTH);
});
