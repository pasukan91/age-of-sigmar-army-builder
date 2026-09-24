import { readFileSync, writeFileSync } from "node:fs";

const documents = [
  ["core", "tmp/sigdex-core_rules.json"],
  ["ghb26-advanced", "tmp/sigdex-ghb26_advanced_rules.json"],
  ["ghb26-battlepack", "tmp/sigdex-ghb26_battle_pack.json"],
].map(([id, path]) => ({ id, ...JSON.parse(readFileSync(path, "utf8")) }));
const faq = JSON.parse(readFileSync("tmp/sigdex-faq.json", "utf8"));

writeFileSync("src/data/sigdexRules.generated.json", `${JSON.stringify({
  metadata: {
    source: "https://sigdex.io/",
    rulesSource: "https://sigdex-storage.nyc3.digitaloceanspaces.com/aos-data",
    faqPublishedDate: faq.publishedDate,
    generatedAt: new Date().toISOString(),
  },
  documents,
  faq: faq.data,
}, null, 2)}\n`);
console.log(`Wrote SigDex rules: ${documents.reduce((sum, document) => sum + document.sections.length, 0)} sections, ${faq.data.length} FAQ groups`);
