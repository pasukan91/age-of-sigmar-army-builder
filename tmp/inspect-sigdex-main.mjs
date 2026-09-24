import fs from 'node:fs';
const manifest = JSON.parse(fs.readFileSync('tmp/sigdex-api-manifest.json', 'utf8'));
const data = JSON.parse(fs.readFileSync('tmp/sigdex-api-main.json', 'utf8'));
console.log('manifest', manifest);
console.log('root keys', Object.keys(data));
for (const [key, value] of Object.entries(data)) {
  const kind = Array.isArray(value) ? `array ${value.length}` : value && typeof value === 'object' ? `object ${Object.keys(value).length}` : typeof value;
  console.log(key, kind, Array.isArray(value) ? Object.keys(value[0] ?? {}) : Object.keys(value ?? {}).slice(0, 30));
}
for (const query of ['Khazalid', 'Khazalite', 'Hjulda', 'Valayan', 'Oathkeeper', 'Seraphon', 'Sons of Behemat', 'Ma Maegran', 'Boss-Stompers', 'Rock-hurlers']) {
  const found = [];
  function visit(value, path = '') {
    if (found.length >= 30) return;
    if (typeof value === 'string' && value.toLowerCase().includes(query.toLowerCase())) found.push({ path, value: value.slice(0, 240) });
    else if (Array.isArray(value)) value.forEach((item, index) => visit(item, `${path}[${index}]`));
    else if (value && typeof value === 'object') Object.entries(value).forEach(([key, item]) => visit(item, `${path}.${key}`));
  }
  visit(data);
  console.log(`\n${query}: ${found.length}`, found);
}
