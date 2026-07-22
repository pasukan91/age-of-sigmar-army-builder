export function weapon(
  name,
  type,
  attacks,
  hit,
  wound,
  rend,
  damage,
  abilities = [],
  range = null
) {
  return {
    name,
    type,
    ...(range ? { range } : {}),
    attacks,
    hit,
    wound,
    rend,
    damage,
    abilities,
  };
}

export function ability(
  name,
  phase,
  description,
  type = "Ability",
  keywords = [],
  castingValue = null
) {
  return {
    name,
    phase,
    type,
    description,
    keywords,
    castingValue,
    lore: null,
  };
}

export function createOrrukUnit({
  faction,
  id,
  name,
  points,
  models = 1,
  move = '5"',
  health = 1,
  control = 1,
  save = "5+",
  ward = null,
  baseSize = null,
  keywords = [],
  weapons = [],
  abilities = [],
  regimentOptions = [],
  canJoinRegimentAs = [],
  notes = null,
  rules = {},
  imageAlias = null,
}) {
  const unitRules = {
    hero: false,
    unique: false,
    monster: false,
    wizard: 0,
    priest: 0,
    ward,
    warmaster: false,
    companion: false,
    canBeReinforced: true,
    ...rules,
  };

  return {
    id,
    name,
    image: `/images/units/${faction}/${imageAlias ?? id}.webp`,
    ...(imageAlias ? { imageAlias } : {}),
    points,
    profile: { move, health, control, save, ward },
    weapons,
    abilities,
    heroicTrait: null,
    monstrousTrait: null,
    artefact: null,
    details: {
      models,
      baseSize,
      regimentOptions,
      canJoinRegimentAs,
      notes,
    },
    keywords,
    rules: unitRules,
  };
}
