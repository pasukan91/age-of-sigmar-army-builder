export function getUniqueListUnits(list) {
  const seenWarscrolls = new Set();

  return (list?.regiments ?? []).flatMap((regiment) => [
    regiment.hero,
    ...(regiment.units ?? []),
  ]).filter((unit) => {
    if (!unit) return false;

    const warscrollKey = String(unit.id ?? unit.name ?? "").trim().toLowerCase();

    if (!warscrollKey || seenWarscrolls.has(warscrollKey)) return false;

    seenWarscrolls.add(warscrollKey);
    return true;
  });
}
