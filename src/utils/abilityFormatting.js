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
  const timing = String(ability.phase ?? ability.type ?? "Pasiva").trim() || "Pasiva";
  return translateAbilityTiming(timing);
}

function translateAbilityTiming(timing) {
  const exactTranslations = new Map([
    ["passive", "Pasiva"],
    ["deployment phase", "Fase de despliegue"],
    ["your hero phase", "Tu fase de héroe"],
    ["enemy hero phase", "Fase de héroe enemiga"],
    ["any hero phase", "Cualquier fase de héroe"],
    ["your movement phase", "Tu fase de movimiento"],
    ["enemy movement phase", "Fase de movimiento enemiga"],
    ["any movement phase", "Cualquier fase de movimiento"],
    ["your shooting phase", "Tu fase de disparo"],
    ["enemy shooting phase", "Fase de disparo enemiga"],
    ["any shooting phase", "Cualquier fase de disparo"],
    ["your charge phase", "Tu fase de carga"],
    ["enemy charge phase", "Fase de carga enemiga"],
    ["any charge phase", "Cualquier fase de carga"],
    ["your combat phase", "Tu fase de combate"],
    ["enemy combat phase", "Fase de combate enemiga"],
    ["any combat phase", "Cualquier fase de combate"],
    ["start of your turn", "Inicio de tu turno"],
    ["end of your turn", "Final de tu turno"],
    ["start of any turn", "Inicio de cualquier turno"],
    ["end of any turn", "Final de cualquier turno"],
    ["start of the battle round", "Inicio de la ronda de batalla"],
    ["end of the battle round", "Final de la ronda de batalla"],
  ]);

  return exactTranslations.get(timing.toLowerCase()) ?? timing;
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

export function parseInlineFormatting(text = "") {
  const source = repairInlineFormatting(String(text));
  const pattern = /\*\*\*([^*\n]+?)\*\*\*|\*\*([^*\n]+?)\*\*|\*([^*\n]+?)\*/g;
  const tokens = [];
  let cursor = 0;

  for (const match of source.matchAll(pattern)) {
    if (match.index > cursor) {
      tokens.push({
        text: removeFormattingMarkers(source.slice(cursor, match.index)),
        strong: false,
        emphasis: false,
      });
    }

    const value = match[1] ?? match[2] ?? match[3] ?? "";
    const strong = match[1] != null || match[2] != null;
    tokens.push({
      text: strong ? makeKeywordCaseReadable(value) : value,
      strong,
      emphasis: match[1] != null || match[3] != null,
    });
    cursor = match.index + match[0].length;
  }

  if (cursor < source.length) {
    tokens.push({
      text: removeFormattingMarkers(source.slice(cursor)),
      strong: false,
      emphasis: false,
    });
  }

  return tokens.filter((token) => token.text.length > 0);
}

function repairInlineFormatting(text) {
  return text.replace(/(\*\*[^*\n]+)\*\*\*(?=[;,.])/g, "$1**");
}

function removeFormattingMarkers(text) {
  return text.replace(/\*/g, "");
}

function makeKeywordCaseReadable(text) {
  return text.replace(/[A-Z][A-Z0-9'’‑-]*(?:\s+[A-Z][A-Z0-9'’‑-]*)*/g, (phrase) =>
    phrase
      .split(/(\s+|‑|-)/)
      .map((part) => {
        if (/^(?:\d*D\d+|DPP)$/i.test(part)) return part.toUpperCase();
        if (!/[A-Z]/.test(part)) return part;
        return `${part.charAt(0)}${part.slice(1).toLowerCase()}`;
      })
      .join("")
  );
}
