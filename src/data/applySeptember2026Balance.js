import balance from "./september2026Balance.generated.json" with { type: "json" };
import { applySeptember2026Rules } from "./september2026Rules";

export const september2026BalanceMetadata = balance.metadata;

export function applySeptember2026Balance(faction) {
  const patch = balance.factions[faction?.id];
  if (!patch) {
    const updated = applySeptember2026Rules(faction);
    return updated ? { ...updated, balancePublicationDate: balance.metadata.publicationDate } : updated;
  }

  const patchUnits = (items = []) => items.map((unit) => {
    const unitPatch = patch.units[unit.id];
    if (!unitPatch) return unit;
    return {
      ...unit,
      points: unitPatch.points,
      balanceSource: balance.metadata.publicationDate,
      details: {
        ...unit.details,
        regimentOptions: unitPatch.regimentOptions,
        canJoinRegimentAs: unitPatch.canJoinRegimentAs ?? unit.details?.canJoinRegimentAs ?? [],
      },
      rules: {
        ...unit.rules,
        canBeReinforced: unitPatch.canBeReinforced,
      },
    };
  });

  const patchCollection = (field, items = []) => items.map((item) => {
    const itemPatch = Object.values(patch.collections).find((candidate) =>
      candidate.field === field &&
      (candidate.id ? candidate.id === item.id : normalizedName(candidate.name) === normalizedName(item.name))
    );
    return itemPatch
      ? { ...item, points: itemPatch.points, balanceSource: balance.metadata.publicationDate }
      : item;
  });

  return applySeptember2026Rules({
    ...faction,
    ...Object.fromEntries(
      Object.keys(faction)
        .filter((field) => Array.isArray(faction[field]))
        .map((field) => [
          field,
          field === "units"
            ? patchUnits(faction[field])
            : field === "armiesOfRenown"
              ? faction[field].map((army) => ({
                  ...army,
                  rules: {
                    ...army.rules,
                    units: patchUnits(army.rules?.units),
                  },
                }))
              : patchCollection(field, faction[field]),
        ]),
    ),
    balancePublicationDate: balance.metadata.publicationDate,
  });
}

function normalizedName(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[‘’‛`´]/g, "'")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}
