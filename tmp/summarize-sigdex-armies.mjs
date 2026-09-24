import fs from 'node:fs';
const data = JSON.parse(fs.readFileSync('tmp/sigdex-api-main.json', 'utf8'));
const summarize = (value, depth = 0) => {
  if (depth > 4) return Array.isArray(value) ? `[${value.length}]` : typeof value;
  if (Array.isArray(value)) return { length: value.length, sample: value.slice(0, 2).map((item) => summarize(item, depth + 1)) };
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, summarize(item, depth + 1)]));
};
for (const name of ['Gloomspite Gitz', 'Seraphon', 'Sons of Behemat', "Sons of Behemat - Matriarch's Mob"]) {
  const army = data.armies[name];
  console.log(`\n===== ${name} =====`);
  console.log(JSON.stringify(summarize(army), null, 2));
}
