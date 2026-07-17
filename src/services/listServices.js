import { createArmyList } from "../models/ArmyList";

const armyLists = [];

export function createList(data) {
    const list = createArmyList(data);

    armyLists.push(list);

    return list;
}

export function getLists() {
    return armyLists;
}

export function getList(id) {
    return armyLists.find(list => list.id === id);
}