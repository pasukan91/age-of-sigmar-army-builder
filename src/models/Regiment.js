import createId from "../utils/createId";

export function createRegiment(hero) {
    return {
        id: createId("regiment"),

        hero,

        units: []
    };
}
