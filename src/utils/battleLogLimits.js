export const MAX_BATTLE_LOG_ENTRIES = 1000;
export const MAX_BATTLE_LOG_TEXT_LENGTH = 500;

export function truncateBattleLogText(value) {
  return String(value ?? "").slice(0, MAX_BATTLE_LOG_TEXT_LENGTH);
}

export function limitBattleLogEntries(entries) {
  const safeEntries = Array.isArray(entries) ? entries : [];
  return safeEntries.slice(-MAX_BATTLE_LOG_ENTRIES);
}
