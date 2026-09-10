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
  return tokenizeInlineFormatting(text).tokens;
}

export function inspectInlineFormatting(text = "") {
  return tokenizeInlineFormatting(text);
}

function tokenizeInlineFormatting(text) {
  const source = decodeNumericEntities(String(text));
  const parsed = tokenizeInlineSource(source);
  return parsed.balanced
    ? parsed
    : tokenizeInlineSource(repairInlineFormatting(source));
}

function tokenizeInlineSource(source) {
  const tokens = [];
  let strong = false;
  let emphasis = false;
  let buffer = "";

  const flush = () => {
    if (!buffer) return;
    const previous = tokens.at(-1);
    if (previous?.strong === strong && previous?.emphasis === emphasis) {
      previous.text += buffer;
    } else {
      tokens.push({ text: buffer, strong, emphasis });
    }
    buffer = "";
  };

  for (let index = 0; index < source.length;) {
    if (source[index] !== "*") {
      buffer += source[index];
      index += 1;
      continue;
    }

    flush();
    const run = source.slice(index).match(/^\*+/)?.[0].length ?? 1;
    let remaining = run;
    while (remaining > 0) {
      if (remaining >= 3) {
        strong = !strong;
        emphasis = !emphasis;
        remaining -= 3;
      } else if (remaining === 2) {
        strong = !strong;
        remaining = 0;
      } else {
        emphasis = !emphasis;
        remaining = 0;
      }
    }
    index += run;
  }
  flush();

  return {
    tokens: tokens.filter((token) => token.text.length > 0),
    balanced: !strong && !emphasis,
  };
}

function repairInlineFormatting(text) {
  return text.replace(/(\*\*[^*\n]+)\*\*\*(?=[;,.])/g, "$1**");
}

function decodeNumericEntities(text) {
  return text.replace(/&#(x[0-9a-f]+|\d+);/gi, (_, encoded) => {
    const hexadecimal = encoded[0].toLowerCase() === "x";
    const value = Number.parseInt(hexadecimal ? encoded.slice(1) : encoded, hexadecimal ? 16 : 10);
    return Number.isFinite(value) ? String.fromCodePoint(value) : "";
  });
}
