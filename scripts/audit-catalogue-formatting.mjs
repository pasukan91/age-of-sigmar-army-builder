import { createServer } from "vite";

const server = await createServer({
  logLevel: "silent",
  server: { middlewareMode: true },
  appType: "custom",
});

const TEXT_FIELDS = new Set([
  "description",
  "lore",
  "rulesText",
  "restrictionText",
  "notes",
  "effect",
  "declare",
  "usedBy",
  "additionalRulesText",
]);

try {
  const { default: factions } = await server.ssrLoadModule("/src/data/factions.js");
  const { default: regiments } = await server.ssrLoadModule(
    "/src/data/regimentsOfRenown.js"
  );
  const { inspectInlineFormatting } = await server.ssrLoadModule(
    "/src/utils/abilityFormatting.js"
  );

  const texts = [];
  const visit = (value, path = "catalogue") => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => visit(item, `${path}[${index}]`));
      return;
    }
    if (!value || typeof value !== "object") return;
    for (const [key, nested] of Object.entries(value)) {
      const nestedPath = `${path}.${key}`;
      if (TEXT_FIELDS.has(key) && typeof nested === "string") {
        texts.push({ path: nestedPath, text: nested });
      } else {
        visit(nested, nestedPath);
      }
    }
  };
  visit(factions, "factions");
  visit(regiments, "regiments");

  const issues = [];
  let boldTexts = 0;
  let italicTexts = 0;
  for (const entry of texts) {
    const source = entry.text;
    const { tokens, balanced } = inspectInlineFormatting(source);
    if (!balanced) {
      issues.push({ path: entry.path, type: "unbalanced-emphasis", sample: source.slice(0, 180) });
    }
    if (/\uFFFD/.test(source)) {
      issues.push({ path: entry.path, type: "replacement-character", sample: source.slice(0, 180) });
    }
    if (/\*\*/.test(source)) {
      boldTexts += 1;
      if (!tokens.some((token) => token.strong)) {
        issues.push({ path: entry.path, type: "bold-not-parsed", sample: source.slice(0, 180) });
      }
    }
    if (/(^|[^*])\*[^*]/.test(source)) {
      italicTexts += 1;
      if (!tokens.some((token) => token.emphasis)) {
        issues.push({ path: entry.path, type: "italic-not-parsed", sample: source.slice(0, 180) });
      }
    }
  }

  console.log(JSON.stringify({
    textFields: texts.length,
    boldTexts,
    italicTexts,
    issues: issues.length,
    details: issues.slice(0, 100),
  }, null, 2));
  if (issues.length) process.exitCode = 1;
} finally {
  await server.close();
}
