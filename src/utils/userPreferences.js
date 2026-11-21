const KEY = "aos-user-preferences";
export function getUserPreferences() {
  try { return JSON.parse(globalThis.localStorage?.getItem(KEY) || "{}"); } catch { return {}; }
}
export function saveUserPreferences(value) {
  try { localStorage.setItem(KEY, JSON.stringify(value)); return true; } catch { return false; }
}
