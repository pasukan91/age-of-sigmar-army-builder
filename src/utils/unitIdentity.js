export function isUniqueUnit(unit) {
  return unit?.rules?.unique === true ||
    (unit?.keywords ?? []).some(
      (keyword) =>
        String(keyword).trim().toLowerCase() === "unique"
    );
}
