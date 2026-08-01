const SECTION_PATTERN = /\b(Declare|Declara|Effect|Efecto):\s*/gi;

export const ABILITY_PHASE_GROUPS = [
  { id: "passive", label: "Pasivas" },
  { id: "deployment", label: "Despliegue" },
  { id: "hero", label: "Fase de héroe" },
  { id: "movement", label: "Fase de movimiento" },
  { id: "shooting", label: "Fase de disparo" },
  { id: "charge", label: "Fase de carga" },
  { id: "combat", label: "Fase de combate" },
  { id: "turn", label: "Ronda y turno" },
  { id: "neutral", label: "Otras habilidades" },
];

export function getAbilityTiming(ability = {}) {
  return String(ability.phase ?? ability.type ?? "Pasiva").trim() || "Pasiva";
}

export function getAbilityPhaseTone(ability = {}) {
  const timing = getAbilityTiming(ability).toLowerCase();

  if (timing.includes("passive") || timing.includes("pasiva")) return "passive";
  if (timing.includes("deployment") || timing.includes("despliegue")) return "deployment";
  if (timing.includes("hero") || timing.includes("héroe") || timing.includes("heroe")) return "hero";
  if (timing.includes("movement") || timing.includes("movimiento")) return "movement";
  if (timing.includes("shooting") || timing.includes("disparo")) return "shooting";
  if (timing.includes("charge") || timing.includes("carga")) return "charge";
  if (timing.includes("combat") || timing.includes("fight") || timing.includes("combate")) return "combat";
  if (timing.includes("turn") || timing.includes("turno") || timing.includes("battle round") || timing.includes("ronda")) return "turn";

  return "neutral";
}

export function getAbilityPhaseIcon(ability = {}) {
  const suppliedIcon = String(ability.icon ?? "").toLowerCase();
  const icons = {
    skull: "☠",
    spell: "✦",
    prayer: "✦",
    movement: "➜",
    shooting: "◎",
    charge: "↗",
    combat: "⚔",
  };

  if (icons[suppliedIcon]) return icons[suppliedIcon];

  return {
    passive: "☠",
    deployment: "◈",
    hero: "✦",
    movement: "➜",
    shooting: "◎",
    charge: "↗",
    combat: "⚔",
    turn: "✺",
    neutral: "◆",
  }[getAbilityPhaseTone(ability)];
}

export function groupAbilitiesByPhase(items = [], getAbility = (item) => item) {
  const grouped = new Map(ABILITY_PHASE_GROUPS.map((group) => [group.id, []]));

  items.forEach((item) => {
    const groupId = getAbilityPhaseTone(getAbility(item));
    grouped.get(groupId)?.push(item);
  });

  return ABILITY_PHASE_GROUPS
    .map((group) => ({ ...group, items: grouped.get(group.id) ?? [] }))
    .filter((group) => group.items.length > 0);
}

export function parseAbilityDescription(description = "") {
  const text = String(description).trim();
  const matches = [...text.matchAll(SECTION_PATTERN)];

  if (matches.length === 0) {
    return { introduction: text, sections: [] };
  }

  const introduction = text.slice(0, matches[0].index).trim();
  const sections = matches.map((match, index) => {
    const start = match.index + match[0].length;
    const end = matches[index + 1]?.index ?? text.length;
    const sourceLabel = match[1].toLowerCase();

    return {
      title: sourceLabel === "declare" || sourceLabel === "declara"
        ? "Declarar"
        : "Efecto",
      text: text.slice(start, end).trim(),
    };
  });

  return { introduction, sections };
}

export function parseFormattedText(text = "") {
  const normalized = String(text).trim();
  const bulletParts = normalized.split(/(?:^|\n)\s*[•*-]\s+|\s+•\s+/);

  if (bulletParts.length === 1) {
    return { lead: normalized, bullets: [] };
  }

  return {
    lead: bulletParts.shift()?.trim() ?? "",
    bullets: bulletParts.map((part) => part.trim()).filter(Boolean),
  };
}
