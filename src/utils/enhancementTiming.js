const TIMING_PATTERN =
  /phase|passive|reaction|deployment|start of|end of|once per|battle round/i;

export function getEnhancementTiming(enhancement) {
  const phase = String(enhancement?.phase ?? "").trim();

  if (phase) {
    return phase;
  }

  const type = String(enhancement?.type ?? "").trim();

  if (type && TIMING_PATTERN.test(type)) {
    return type;
  }

  const description = String(enhancement?.description ?? "").trim();

  if (/^any hero phase:/i.test(description)) {
    return "Any Hero Phase";
  }

  if (/^in any combat phase\b/i.test(description)) {
    return "Any Combat Phase";
  }

  if (/^once per battle at the end of any turn\b/i.test(description)) {
    return "Once Per Battle, End of Any Turn";
  }

  if (/^once per battle in any hero phase\b/i.test(description)) {
    return "Once Per Battle, Any Hero Phase";
  }

  if (/^at the end of any turn\b/i.test(description)) {
    return "End of Any Turn";
  }

  if (/^at the start of any turn\b/i.test(description)) {
    return "Start of Any Turn";
  }

  if (/^after this unit resolves Eruption of Fury\b/i.test(description)) {
    return "Reaction: This unit resolved Eruption of Fury";
  }

  return "Passive";
}

export function withEnhancementTiming(enhancement) {
  return {
    ...enhancement,
    phase: getEnhancementTiming(enhancement),
  };
}
