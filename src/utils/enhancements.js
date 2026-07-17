import heroicTraits from "../data/enhancements/heroicTraits/kruleboyz";

import kruleArtefacts from "../data/enhancements/artefacts/kruleboyz";

import aqshyArtefacts from "../data/enhancements/artefacts/aqshy";

import monsterTraits from "../data/enhancements/monsterTraits/kruleboyz";

export function getHeroicTraits(unit) {

    if (!unit.rules.hero) return [];

    if (unit.rules.unique) return [];

    return heroicTraits;
}

export function getArtefacts(unit) {

    if (!unit.rules.hero) return [];

    if (unit.rules.unique) return [];

    return [

        ...kruleArtefacts,

        ...aqshyArtefacts

    ];
}

export function getMonsterTraits(unit) {

    if (!unit.rules.monster) return [];

    if (unit.rules.unique) return [];

    return monsterTraits;
}