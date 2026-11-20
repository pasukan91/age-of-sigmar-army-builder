import { mkdir, readFile, writeFile } from "node:fs/promises";

const sunday = "https://www.warhammer-community.com/en-gb/articles/pqgrrqqt/sunday-preview-the-khazalite-holds-prepare-to-march-out/";
const reveal = "https://www.warhammer-community.com/en-gb/articles/evmkzloa/the-big-autumn-preview-a-new-duardin-faction-revealed/";
const sundayRoot = "https://assets.warhammer-community.com/img/articles/0-2026/october/wc26-10/";
const revealRoot = "https://assets.warhammer-community.com/img/articles/0-2026/september/wc14-09/big-autumn-preview/";
const entries = [
  ["high-kyng-valankrom", "sundaypreview-nov01-aos_01-valenkrom-xiavyc8vvm"],
  ["thrynn", "sundaypreview-nov01-aos_02-thrynn-5mhb8i7j0d"],
  ["runewright", "sundaypreview-nov01-aos_03-runewright-ejqdlvldhu"],
  ["valayan-guardians-with-rune-axes-and-shields", "sundaypreview-nov01-aos_04-valayanguardians-vxde1ooeuo"],
  ["valayan-guardians-with-runic-halberds", "sundaypreview-nov01-aos_05-valayanguardiansalt-bmnvuwbapx"],
  ["clangunners-with-thrundok-rifles", "sundaypreview-nov01-aos_06-clangunners-olosrheabh"],
  ["clangunners-with-thrundrin-shotcannons", "sundaypreview-nov01-aos_07-clangunnersalt-jxchiydrdb"],
  ["ormyr-and-ashtongue", "sundaypreview-nov01-aos_08-ormyr-rnszhphrjm"],
  ["hjulda-drakkblud", "sundaypreview-nov01-aos_09-hjulda-x9vh0rbijy"],
  ["clanshields", "sundaypreview-nov01-aos_10-clanshields-qtstmnsi4z"],
  ["gholems-of-gazul", "sundaypreview-nov01-aos_12-gholems-g4mbd2z2cy"],
  ["gholems-of-valaya", "sundaypreview-nov01-aos_13-gholemsalt-u2gzoh6oao"],
  ["oathkeeper-cannon", "image2-08-oml964mfpj", revealRoot, reveal],
  ["stonebreaker-mortar", "image8-08-wuxzrj4s4l", revealRoot, reveal],
  ["thrynn-on-war-throne", "image6-08-q4wdrfhmny", revealRoot, reveal],
];

const images = {
  "gotrek-gurnisson": "/images/catalogue/4fd3aed7-d32f-4ab2-a97f-70577b3b559e.webp",
  "hearthguard-berzerkers": "/images/catalogue/87c8eb18-b5d3-4612-87ab-df89b1145b75.webp",
};
const sources = [];
await mkdir("public/images/units/fyreslayers", { recursive: true });
for (const [id, basename, root = sundayRoot, page = sunday] of entries) {
  const source = `${root}${basename}.jpg?format=webp&width=640`;
  const file = `/images/units/fyreslayers/${id}.webp`;
  let bytes;
  if (process.argv.includes("--from-cache")) {
    bytes = await readFile(`tmp/khazalite-units/${basename}.webp`);
  } else {
    const response = await fetch(source);
    if (!response.ok || !response.headers.get("content-type")?.startsWith("image/")) throw new Error(`Cannot download ${id}: ${response.status}`);
    bytes = Buffer.from(await response.arrayBuffer());
  }
  await writeFile(`public${file}`, bytes);
  images[id] = file;
  sources.push({ id, file, source, page });
}
await writeFile("src/data/khazaliteUnitImages.generated.json", JSON.stringify(images, null, 2) + "\n");
await writeFile("scripts/khazalite-unit-image-sources.json", JSON.stringify({ images: sources }, null, 2) + "\n");
console.log(`Assigned ${Object.keys(images).length} Khazalite unit photographs.`);
