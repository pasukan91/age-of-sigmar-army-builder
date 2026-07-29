export const weapon = (name, type, attacks, hit, wound, rend, damage, abilities = [], range = null) => ({
  name, type, ...(range ? { range } : {}), attacks, hit, wound, rend, damage, abilities,
});

export const ability = (name, phase, description, type = "Ability", keywords = []) => ({
  name, phase, type, description, keywords, castingValue: null, lore: null,
});

export function createUnit({
  id, name, points, models = 1, move = '4"', health = 1, control = 1, save = "5+",
  ward = null, baseSize = null, keywords = [], weapons = [], abilities = [],
  regimentOptions = [], canJoinRegimentAs = [], notes = null, rules = {},
  imageAlias = null, source = "Battletome",
}) {
  const unitRules = {
    hero: false, unique: false, monster: false, wizard: 0, priest: 0,
    ward: null, warmaster: false, companion: false, canBeReinforced: true, ...rules,
  };

  return {
    id, name, image: `/images/units/maggotkin/${imageAlias ?? id.replaceAll("-", "_")}.jpg`,
    points, source, profile: { move, health, control, save, ward }, weapons, abilities,
    heroicTrait: null, monstrousTrait: null, artefact: null,
    details: { models, baseSize, regimentOptions, canJoinRegimentAs, notes },
    keywords: [...keywords, "Chaos", "Maggotkin of Nurgle"], rules: unitRules,
  };
}
