import fs from 'node:fs';

const source = fs.readFileSync('tmp/sigdex-index.js', 'utf8');
const marker = 'class gk';
const start = source.indexOf(marker);
if (start < 0) throw new Error(`${marker} not found`);

const braceStart = source.indexOf('{', start);
let depth = 0;
let quote = null;
let escaped = false;
let end = -1;
for (let i = braceStart; i < source.length; i += 1) {
  const char = source[i];
  if (quote) {
    if (escaped) escaped = false;
    else if (char === '\\') escaped = true;
    else if (char === quote) quote = null;
    continue;
  }
  if (char === '"' || char === "'" || char === '`') {
    quote = char;
  } else if (char === '{') {
    depth += 1;
  } else if (char === '}') {
    depth -= 1;
    if (depth === 0) {
      end = i + 1;
      break;
    }
  }
}

if (end < 0) throw new Error('class end not found');
fs.writeFileSync('tmp/sigdex-api-class.js', source.slice(start, end));
console.log({ start, end, length: end - start });
