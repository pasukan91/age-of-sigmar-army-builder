import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { parse } from "acorn";

const bundlePath = process.argv[2];
const outputPath = process.argv[3] ?? "tmp/aos-community/catalogue.json";

if (!bundlePath) {
  throw new Error("Usage: node scripts/extract-aos-community-catalogue.mjs <bundle.js> [output.json]");
}

const source = readFileSync(bundlePath, "utf8");
console.log(`Parsing ${Buffer.byteLength(source).toLocaleString("en-US")} bytes...`);
const ast = parse(source, { ecmaVersion: "latest", sourceType: "script" });

function propertyName(property) {
  if (!property?.key) return null;
  if (!property.computed && property.key.type === "Identifier") return property.key.name;
  if (property.key.type === "Literal") return String(property.key.value);
  return null;
}

function literalValue(node) {
  if (!node) return null;
  if (node.type === "Literal") return node.value;
  if (node.type === "UnaryExpression" && node.operator === "-" && node.argument.type === "Literal") {
    return -node.argument.value;
  }
  if (node.type === "ArrayExpression") return node.elements.map(literalValue);
  if (node.type === "ObjectExpression") {
    return Object.fromEntries(node.properties
      .filter((property) => property.type === "Property")
      .map((property) => [propertyName(property), literalValue(property.value)]));
  }
  throw new Error(`Unsupported value in catalogue literal: ${node.type}`);
}

function classify(keys) {
  const has = (...required) => required.every((key) => keys.has(key));
  if (has("modelCount", "baseSize", "move", "save", "control", "health")) return "warscrolls";
  if (has("type", "attacks", "hit", "wound", "rend", "damage", "warscrollId")) return "weapons";
  if (has("phaseDetails", "phase", "declare", "effect", "abilityGroupId")) return "abilities";
  if (has("warscrollId", "abilityId")) return "warscrollAbilities";
  if (has("weaponId", "weaponAbilityId")) return "weaponAbilities";
  if (has("warscrollId", "factionId")) return "warscrollFactions";
  return null;
}

const candidates = [];
const embeddedCatalogues = [];
const largeArrays = [];
const datasets = {};
const stack = [ast];
while (stack.length) {
  const node = stack.pop();
  if (!node || typeof node !== "object") continue;
  if (
    node.type === "CallExpression" &&
    node.callee?.type === "MemberExpression" &&
    node.callee.object?.name === "JSON" &&
    node.callee.property?.name === "parse" &&
    node.arguments[0]?.type === "Literal" &&
    typeof node.arguments[0].value === "string" &&
    node.arguments[0].value.length > 100_000
  ) {
    embeddedCatalogues.push(JSON.parse(node.arguments[0].value));
  }
  if (node.type === "ArrayExpression" && node.elements.length && node.elements[0]?.type === "ObjectExpression") {
    const keys = new Set(node.elements[0].properties.map(propertyName).filter(Boolean));
    const kind = classify(keys);
    if (kind) candidates.push({ kind, node, keys: [...keys] });
  }
  if (node.type === "ArrayExpression" && node.end - node.start > 100_000) {
    largeArrays.push({ start: node.start, end: node.end, count: node.elements.length, first: node.elements[0]?.type });
  }
  for (const [key, value] of Object.entries(node)) {
    if (key === "start" || key === "end" || key === "loc") continue;
    if (Array.isArray(value)) {
      for (let index = value.length - 1; index >= 0; index -= 1) stack.push(value[index]);
    } else if (value && typeof value === "object") {
      stack.push(value);
    }
  }
}

for (const catalogue of embeddedCatalogues) {
  const data = catalogue.data ?? catalogue;
  console.log(`Embedded JSON data version: ${catalogue.metadata?.data_version ?? "unknown"}`);
  for (const [name, values] of Object.entries(data)) {
    if (!Array.isArray(values) || !values.length) continue;
    console.log(`${name}: ${values.length.toLocaleString("en-US")} rows`);
    datasets[name] = values;
  }
}

if (!candidates.length) {
  console.log("Largest array expressions:");
  for (const item of largeArrays.sort((left, right) => (right.end - right.start) - (left.end - left.start)).slice(0, 20)) {
    console.log(item);
  }
}

for (const candidate of candidates) {
  const values = candidate.node.elements.map(literalValue);
  if (!datasets[candidate.kind] || datasets[candidate.kind].length < values.length) {
    datasets[candidate.kind] = values;
  }
  console.log(`${candidate.kind}: ${values.length.toLocaleString("en-US")} rows (${candidate.keys.join(", ")})`);
}

for (const required of ["warscroll", "warscroll_weapon", "ability", "warscroll_ability"]) {
  if (!datasets[required]) throw new Error(`Could not find required ${required} dataset`);
}

const output = {
  extractedAt: new Date().toISOString(),
  source: "https://aos-telegram-app.onrender.com/",
  dataVersion: embeddedCatalogues[0]?.metadata?.data_version ?? null,
  datasets,
};
const absoluteOutput = resolve(outputPath);
mkdirSync(dirname(absoluteOutput), { recursive: true });
writeFileSync(absoluteOutput, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Wrote ${absoluteOutput}`);
