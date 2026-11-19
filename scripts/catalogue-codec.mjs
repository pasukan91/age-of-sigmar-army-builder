// Children precede their parents. Identical rules are stored once, including
// units repeated in armies of renown and universal manifestation lores.
export function packCatalogue(value) {
  const nodes = [];
  const indexes = new Map();
  function encode(item) {
    if (!item || typeof item !== "object") return item;
    const array = Array.isArray(item);
    const entries = array
      ? item.map(encode)
      : Object.entries(item).filter(([, entry]) => entry !== undefined).map(([key, entry]) => {
          // Source filters have already produced army.rules.units. They are
          // build-time helpers, never consulted by the application.
          if (typeof entry === "function") {
            if (key === "unitFilter") return null;
            throw new Error(`Cannot compile catalogue function: ${key}`);
          }
          return [key, encode(entry)];
        }).filter(Boolean);
    const node = [array ? 1 : 0, entries];
    const signature = JSON.stringify(node);
    if (!indexes.has(signature)) {
      indexes.set(signature, nodes.length);
      nodes.push(node);
    }
    return [indexes.get(signature)];
  }
  const root = encode(value);
  return { nodes, root };
}

export function unpackCatalogue({ nodes, root }) {
  const decoded = [];
  const decode = (value) => Array.isArray(value) ? decoded[value[0]] : value;
  for (const [array, entries] of nodes) {
    decoded.push(array
      ? entries.map(decode)
      : Object.fromEntries(entries.map(([key, value]) => [key, decode(value)])));
  }
  return decode(root);
}
