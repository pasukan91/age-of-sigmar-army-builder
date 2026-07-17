export function createRegiment(hero) {
    return {
        id: crypto.randomUUID(),

        hero,

        units: []
    };
}