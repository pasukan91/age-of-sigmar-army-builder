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

export function getListUnitInstances(list) {
  const instances = [];

  (list?.regiments ?? []).forEach((regiment, regimentIndex) => {
    const regimentUnits = [regiment?.hero, ...(regiment?.units ?? [])];

    regimentUnits.forEach((unit, unitIndex) => {
      if (!unit) return;

      instances.push({
        key: getInstanceKey(unit, `regiment-${regiment?.id ?? regimentIndex}-${unitIndex}`),
        unit,
        groupLabel: `Regimiento ${regimentIndex + 1}`,
        roleLabel: unitIndex === 0 ? "Líder" : "Unidad",
      });
    });
  });

  (list?.auxiliaries ?? []).forEach((unit, unitIndex) => {
    if (!unit) return;

    instances.push({
      key: getInstanceKey(unit, `auxiliary-${unitIndex}`),
      unit,
      groupLabel: "Auxiliares",
      roleLabel: "Unidad",
    });
  });

  (list?.regimentsOfRenown ?? []).forEach((regiment, regimentIndex) => {
    const units = Array.isArray(regiment?.resolvedUnits)
      ? regiment.resolvedUnits
      : Array.isArray(regiment?.units) && regiment.units.every((unit) => unit && typeof unit === "object")
        ? regiment.units
        : [];

    units.forEach((unit, unitIndex) => {
      instances.push({
        key: getInstanceKey(
          unit,
          `renown-${regiment?.instanceId ?? regiment?.id ?? regimentIndex}-${unitIndex}`,
        ),
        unit,
        groupLabel: regiment?.name ?? `Regimiento de renombre ${regimentIndex + 1}`,
        roleLabel: "Renombre",
      });
    });
  });

  const totals = new Map();
  instances.forEach(({ unit }) => {
    const warscrollKey = getWarscrollKey(unit);
    totals.set(warscrollKey, (totals.get(warscrollKey) ?? 0) + 1);
  });

  const positions = new Map();
  return instances.map((instance) => {
    const warscrollKey = getWarscrollKey(instance.unit);
    const copyIndex = (positions.get(warscrollKey) ?? 0) + 1;
    positions.set(warscrollKey, copyIndex);

    return {
      ...instance,
      copyIndex,
      copyCount: totals.get(warscrollKey) ?? 1,
    };
  });
}

function getInstanceKey(unit, fallback) {
  const instanceId = String(unit?.instanceId ?? "").trim();
  return instanceId || fallback;
}

function getWarscrollKey(unit) {
  return String(unit?.id ?? unit?.name ?? "unknown").trim().toLowerCase();
}
