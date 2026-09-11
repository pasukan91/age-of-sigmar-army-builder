// Keep the full catalogue keywords for eligibility checks, but show a role
// only once when a more precise version (Wizard (2), Musician (1/20)) exists.
export function getDisplayKeywords(keywords = []) {
  const normalized = (value) => value.trim().replace(/\s+/g, " ").toLowerCase();
  const entries = [...new Map(keywords.filter((value) => typeof value === "string" && value.trim())
    .map((value) => [normalized(value), value.trim()])).values()];
  const qualified = new Set(entries.flatMap((value) => {
    const match = value.match(/^(.+?)\s*\([^)]+\)$/);
    return match ? [normalized(match[1])] : [];
  }));
  return entries.filter((value) => !qualified.has(normalized(value)));
}
