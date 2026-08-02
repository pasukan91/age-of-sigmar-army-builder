import { readFileSync } from "node:fs";

const bundlePath = process.argv[2];

if (!bundlePath) {
  throw new Error("Usage: node scripts/inspect-aos-community-bundle.mjs <bundle.js> [search term]");
}

const source = readFileSync(bundlePath, "utf8");
const endpoints = [...source.matchAll(/https:\/\/aoscom\.online[^"'`\s)]+/g)]
  .map((match) => match[0]);

console.log("Bundle bytes:", Buffer.byteLength(source));
console.log("Source map:", source.match(/sourceMappingURL=([^\s]+)/)?.[1] ?? "none");
console.log("Endpoints:");
console.log([...new Set(endpoints)].join("\n"));

if (process.argv.includes("--map")) {
  const sourceMap = JSON.parse(readFileSync(`${bundlePath}.map`, "utf8"));
  const interestingSources = sourceMap.sources
    .map((name, index) => ({ name, index, content: sourceMap.sourcesContent?.[index] ?? "" }))
    .filter(({ name, content }) =>
      /warscroll|ability|weapon|faction|rule/i.test(name) ||
      /Beast-skewer Killbow/.test(content)
    );
  console.log("\nInteresting source-map files:");
  for (const item of interestingSources) {
    console.log(`${item.index}\t${item.content.length}\t${item.name}`);
  }
  console.log("\nLargest source-map files:");
  for (const item of sourceMap.sources
    .map((name, index) => ({ name, index, length: sourceMap.sourcesContent?.[index]?.length ?? 0 }))
    .sort((left, right) => right.length - left.length)
    .slice(0, 30)) {
    console.log(`${item.index}\t${item.length}\t${item.name}`);
  }
}

const searchTerm = process.argv[3];
if (searchTerm) {
  let offset = 0;
  let occurrence = 0;
  while ((offset = source.indexOf(searchTerm, offset)) >= 0 && occurrence < 10) {
    occurrence += 1;
    console.log(`\n--- ${searchTerm} occurrence ${occurrence} at ${offset} ---`);
    const arrayStart = source.lastIndexOf("=[", offset);
    console.log(`Nearest array assignment at ${arrayStart}:`, source.slice(Math.max(0, arrayStart - 80), arrayStart + 80));
    for (const marker of ["[{\"id\"", "JSON.parse(", "`", "'", "\""]) {
      const markerOffset = source.lastIndexOf(marker, offset);
      console.log(`Nearest ${JSON.stringify(marker)} at ${markerOffset}:`, source.slice(Math.max(0, markerOffset - 100), markerOffset + 160));
    }
    console.log(source.slice(Math.max(0, offset - 700), offset + searchTerm.length + 1500));
    offset += searchTerm.length;
  }
}
