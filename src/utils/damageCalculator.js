const CRIT_TYPES = {
  "2-hits": "crit (2 hits)",
  "auto-wound": "crit (auto-wound)",
  mortal: "crit (mortal)",
};

export function averageDiceExpression(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? Math.max(0, value) : 0;
  }

  const expression = String(value ?? "")
    .trim()
    .toUpperCase()
    .replaceAll(" ", "");

  if (!expression) return 0;

  const terms = expression.match(/[+-]?[^+-]+/g);
  if (!terms) return 0;

  let total = 0;

  for (const term of terms) {
    const sign = term.startsWith("-") ? -1 : 1;
    const unsigned = term.replace(/^[+-]/, "");
    const dice = unsigned.match(/^(\d*)D(\d+)$/);

    if (dice) {
      const count = Number(dice[1] || 1);
      const sides = Number(dice[2]);
      if (count < 0 || sides < 1) return 0;
      total += sign * count * ((sides + 1) / 2);
      continue;
    }

    const number = Number(unsigned);
    if (!Number.isFinite(number)) return 0;
    total += sign * number;
  }

  return Math.max(0, total);
}

export function getWeaponCritType(weapon) {
  const abilities = (weapon?.abilities ?? []).map((ability) =>
    String(ability).trim().toLowerCase()
  );

  return Object.entries(CRIT_TYPES).find(([, ability]) =>
    abilities.some((candidate) => candidate.includes(ability))
  )?.[0] ?? "none";
}

export function calculateExpectedDamage({
  attacks,
  models = 1,
  champion = false,
  hit,
  wound,
  rend = 0,
  damage,
  critType = "none",
  critThreshold = 6,
  save = 4,
  ward = null,
  ethereal = false,
}) {
  const attacksPerModel = averageDiceExpression(attacks);
  const modelCount = Math.max(0, Number(models) || 0);
  const totalAttacks = attacksPerModel * modelCount + (champion ? 1 : 0);
  const woundChance = successChance(parseThreshold(wound, 7));
  const averageDamage = averageDiceExpression(damage);
  const effectiveRend = ethereal ? 0 : Math.max(0, Number(rend) || 0);
  const saveChance = successChance(
    Math.max(2, parseThreshold(save, 7) + effectiveRend)
  );
  const failedSaveChance = 1 - saveChance;
  const wardMultiplier = ward
    ? 1 - successChance(parseThreshold(ward, 7))
    : 1;
  const hitThreshold = parseThreshold(hit, 7);
  const activeCritThreshold = Math.min(
    6,
    Math.max(2, Number(critThreshold) || 6)
  );

  let damagePerAttack = 0;

  for (let roll = 1; roll <= 6; roll += 1) {
    const isCrit = critType !== "none" && roll >= activeCritThreshold;
    const isHit = roll >= hitThreshold;

    if (isCrit) {
      if (critType === "mortal") {
        damagePerAttack += averageDamage / 6;
      } else if (critType === "auto-wound") {
        damagePerAttack += failedSaveChance * averageDamage / 6;
      } else if (critType === "2-hits") {
        damagePerAttack += 2 * woundChance * failedSaveChance * averageDamage / 6;
      }
    } else if (isHit) {
      damagePerAttack += woundChance * failedSaveChance * averageDamage / 6;
    }
  }

  return totalAttacks * damagePerAttack * wardMultiplier;
}

export function parseThreshold(value, fallback = 7) {
  const parsed = Number.parseInt(String(value ?? "").replace("+", ""), 10);
  return Number.isFinite(parsed) ? Math.min(7, Math.max(2, parsed)) : fallback;
}

function successChance(threshold) {
  return threshold > 6 ? 0 : (7 - threshold) / 6;
}
