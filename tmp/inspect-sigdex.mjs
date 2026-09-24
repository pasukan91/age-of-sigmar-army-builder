import fs from 'node:fs';

const source = fs.readFileSync('tmp/sigdex-index.js', 'utf8');
const factions = JSON.parse(fs.readFileSync('tmp/sigdex-factions.json', 'utf8'));
const warscrolls = JSON.parse(fs.readFileSync('tmp/sigdex-warscrolls.json', 'utf8'));

const urls = [...new Set(source.match(/https?:[^"'`\\\s)]+/g) ?? [])].sort();
console.log('URLs');
console.log(urls.join('\n'));

console.log('\nFaction names matching new tomes');
console.log(factions.filter((f) => /khaz|seraph|behemat|kharad|fyre/i.test(`${f.name} ${f.parentName}`)).map((f) => ({
  name: f.name,
  parentName: f.parentName,
  armyOfRenown: f.armyOfRenown,
  keys: Object.keys(f),
}))); 

console.log('\nWarscrolls matching Khazalid clues');
console.log(warscrolls.filter((w) => (w.keywords ?? []).some((k) => /khazalid|fyreslayer|kharadron/i.test(String(k)))).slice(0, 80).map((w) => ({name:w.name, keywords:w.keywords, models:w.modelCount, reinforceable:w.reinforceable})));

const literals = [...source.matchAll(/["'`]([^"'`]{1,140}(?:\.json|manifest)[^"'`]{0,80})["'`]/gi)].map((m) => m[1]);
console.log('\nData literals');
console.log([...new Set(literals)].sort().join('\n'));
