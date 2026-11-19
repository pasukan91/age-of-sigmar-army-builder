import { mkdirSync, writeFileSync } from "node:fs";

const base = "https://sigdex-storage.nyc3.digitaloceanspaces.com";
const sources = [
  ["https://api.sigdex.io/blob?name=main", "tmp/sigdex-api-main.json", (data) => data.armies && data.version],
  ...["core_rules", "ghb26_advanced_rules", "ghb26_battle_pack", "ghb26_battleplans"].map((name) => [
    `${base}/aos-data/${name}.json`, `tmp/sigdex-${name}.json`, (data) => Array.isArray(data.sections),
  ]),
  [`${base}/aos-pdf-data/data/faq.json`, "tmp/sigdex-faq.json", (data) => Array.isArray(data.data)],
];
const results = await Promise.all(sources.map(async ([url, path, validate]) => {
  const response = await fetch(url, { signal: AbortSignal.timeout(60_000), cache: "no-store" });
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  const data = await response.json();
  if (!validate(data)) throw new Error(`${url}: unexpected data structure`);
  return { url, path, data };
}));
mkdirSync("tmp", { recursive: true });
for (const { url, path, data } of results) {
  writeFileSync(path, `${JSON.stringify(data, null, path.endsWith("api-main.json") ? 0 : 2)}\n`);
  console.log(`${url} -> ${path}`);
}
