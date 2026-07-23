const formation = (id, name, abilityName, type, phase, description) => ({
  id,
  name,
  description,
  ability: { name: abilityName, type, phase, keywords: [], description },
});

export const battleTraits = [
  { id: "creeping-overgrowth", name: "Creeping Overgrowth", type: "Passive", phase: null, keywords: [], description: "The range of the creeping overgrowth is 6\" with 0-2 friendly overgrown tokens, 9\" with 3-5, 12\" with 6-8, and the whole battlefield with 9 or more." },
  { id: "endless-growth", name: "Endless Growth", type: "Once Per Turn (Army)", phase: "End of Any Turn", keywords: [], description: "Pick each friendly Sylvaneth unit wholly within the creeping overgrowth. Roll a D3 for each: Heal (X) that unit or return slain models with a combined Health characteristic of up to X. Monsters instead Heal (3) while using the Lords of the Clan formation." },
  { id: "reclaimed-by-nature", name: "Reclaimed by Nature", type: "Once Per Turn (Army)", phase: "Your Hero Phase", keywords: [], description: "If there are fewer than 3 friendly Awakened Wyldwoods, set one up more than 3\" from objectives and enemies, more than 12\" from other friendly Awakened Wyldwoods and more than 1\" from other terrain." },
  { id: "fury-of-the-forest", name: "Fury of the Forest", type: "Once Per Turn (Army)", phase: "Enemy Combat Phase", keywords: [], description: "Pick a friendly Sylvaneth unit wholly within the creeping overgrowth and in combat with only 1 enemy unit. It has Strike-first for the turn." },
  { id: "creeping-dread", name: "Creeping Dread", type: "Once Per Turn (Army)", phase: "Start of Any Turn", keywords: [], description: "Pick an enemy unit within the creeping overgrowth. Until the end of the turn, the first command it receives while not wholly within 12\" of a friendly Hero costs 1 additional command point; if it cannot be paid, the command has no effect but still counts as used and its command point is lost." },
  { id: "the-land-awakens", name: "The Land Awakens", type: "Once Per Turn (Army)", phase: "End of Your Turn", keywords: [], description: "Pick a destroyed friendly non-Hero Revenant Infantry or Dryads unit. Set up a replacement with half its starting models, rounding up, wholly within the creeping overgrowth and more than 9\" from enemies." },
];

export const battleFormations = [
  formation("followers-of-kurnoth", "Followers of Kurnoth", "Sacred Quarry", "Once Per Turn (Army)", "Any Hero Phase", "Pick a friendly Sylvaneth unit. Until your next turn, add 1 to its hit rolls while it is wholly within 12\" of the enemy general or an enemy Warmaster."),
  formation("glade-defenders", "Glade Defenders", "Memories of the Fallen", "Once Per Turn (Army)", "Your Hero Phase", "For each friendly Sylvaneth unit or Awakened Wyldwood destroyed in the previous turn, pick a different friendly Sylvaneth unit. Add 1 to the Attacks characteristic of its melee weapons for the rest of the turn."),
  formation("lords-of-the-clan", "Lords of the Clan", "Nature's Titans", "Passive", null, "When a friendly Monster is a target of Endless Growth, Heal (3) it instead of rolling a D3."),
  formation("outcasts", "Outcasts", "Fear of the Deepwoods", "Passive", null, "For Creeping Dread, the target must be wholly within 6\" of a friendly Hero instead of 12\" to avoid the additional command point cost."),
];

export const heroicTraits = [
  { id: "realmroot-guide", name: "Realmroot Guide", points: 0, source: "Battletome", phase: "Your Movement Phase", description: "Once per battle, if this unit is wholly within the creeping overgrowth, pick it and one friendly unit in combat range. Remove both and set them up wholly within the creeping overgrowth and more than 9\" from enemies." },
  { id: "spellsinger", name: "Spellsinger", points: 0, source: "Battletome", phase: null, description: "If this unit is a Wizard, add 1 to its casting rolls. Otherwise, it can use Unbind as if it had Wizard (1)." },
  { id: "spirit-of-the-dark-forest", name: "Spirit of the Dark Forest", points: 0, source: "Battletome", phase: "Enemy Hero Phase", description: "Once per battle, pick a visible enemy Hero. Halve its Move characteristic for the rest of the turn." },
];

export const artefacts = [
  { id: "amberglade-nectar", name: "Amberglade Nectar", points: 0, source: "Battletome", phase: "Any Combat Phase", description: "Once per battle, pick an enemy within 6\". Add 1 to the Damage characteristic of Companion weapons used by friendly Sylvaneth units against it for the rest of the turn." },
  { id: "seed-of-rebirth", name: "Seed of Rebirth", points: 0, source: "Battletome", phase: null, description: "The first time this unit would be destroyed, roll a dice. On a 3+, it is not destroyed and Heal (D3) it." },
  { id: "wychwood-glaive", name: "Wychwood Glaive", points: 0, source: "Battletome", phase: "End of Any Turn", description: "Pick an enemy damaged by this unit's combat attacks this turn. Subtract 1 from its save rolls for the rest of the battle. This ability can be used even if the bearer was destroyed." },
];

export const aqshyArtefacts = [
  { id: "dancing-mystiflies", name: "Dancing Mystiflies", points: 0, source: "Aqshy", phase: "Reaction: Opponent declared a Spell ability", description: "If the caster is within 30\", a non-Wizard bearer can Unbind as Wizard (1), or a Wizard bearer can make an additional unbinding roll. If successful and the caster is within the creeping overgrowth, inflict mortal damage equal to the difference between the rolls, to a maximum of 6." },
  { id: "glamourweave", name: "Glamourweave", points: 20, source: "Aqshy", phase: null, description: "In each phase, you can re-roll 1 hit roll, 1 wound roll and 1 save roll for this unit." },
  { id: "amulet-of-resonance", name: "Amulet of Resonance", points: 0, source: "Aqshy", phase: "End of Any Turn", description: "If this unit used Eruption of Fury or spent rage dice on Fight Through the Pain this turn, give 1 ritual point to each visible friendly Sylvaneth Priest wholly within 12\"." },
];

export const monsterTraits = [
  { id: "harvestboon", name: "Harvestboon", points: 10, source: "Aqshy", phase: null, description: "Add 2\" to this unit's Move characteristic while it is wholly within the creeping overgrowth." },
  { id: "heartwood", name: "Heartwood", points: 10, source: "Aqshy", phase: "Reaction: Endless Growth", description: "Once per battle, targets wholly within 12\" of this unit roll a D6 instead of a D3 (or Heal 6 instead of 3). Kurnothi targets can return 1 slain model instead." },
  { id: "ironbark", name: "Ironbark", points: 10, source: "Aqshy", phase: null, description: "When this unit spends rage dice on Fight Through the Pain, re-roll the dice that determine how much damage is removed from the pool. If the re-rolled total is 10 or more, this ability cannot be used again." },
];

export const spellLores = [{
  id: "lore-of-the-deepwood",
  name: "Lore of the Deepwood",
  spells: [
    { id: "jade-thorns", name: "Jade Thorns", castingValue: 6, type: "Spell", phase: "Your Hero Phase", keywords: ["Spell", "Unlimited"], description: "Pick a visible friendly unit wholly within 12\". Add 1 to wound rolls for its combat attacks, including Companion attacks, for the rest of the turn." },
    { id: "zephyrspite-rush", name: "Zephyrspite Rush", castingValue: 6, type: "Spell", phase: "Your Hero Phase", keywords: ["Spell"], description: "Pick a visible friendly unit wholly within 12\". It can use Charge abilities this turn even if it used a Run ability." },
    { id: "grasping-roots", name: "Grasping Roots", castingValue: 5, type: "Spell", phase: "Your Hero Phase", keywords: ["Spell"], description: "Pick a visible enemy within 18\". It cannot use Run abilities and subtract 1 from its charge rolls until your next turn." },
  ],
}];

export const prayerLores = [{
  id: "lore-of-the-spirit-song",
  name: "Lore of the Spirit-song",
  prayers: [
    { id: "song-of-the-lost", name: "Song of the Lost", chantingValue: 4, type: "Prayer", phase: "Your Hero Phase", keywords: ["Prayer", "Unlimited"], description: "Pick a friendly unit wholly within the creeping overgrowth or visible and wholly within 12\". Subtract 1 from wound rolls for attacks targeting it until your next turn. On an 8+, Monsters also Heal (3); other units ignore positive and negative save modifiers." },
    { id: "song-of-war", name: "Song of War", chantingValue: 5, type: "Prayer", phase: "Your Hero Phase", keywords: ["Prayer"], description: "Pick a friendly unit wholly within the creeping overgrowth or visible and wholly within 12\"; on a 10+, pick a second. Add 1 to the Rend of their melee weapons until your next turn." },
    { id: "song-of-dread", name: "Song of Dread", chantingValue: 4, type: "Prayer", phase: "Your Hero Phase", keywords: ["Prayer"], description: "Pick an enemy wholly within the creeping overgrowth or visible and within 18\"; on an 8+, pick a second. Until your next turn, each time a target ends a Move within the creeping overgrowth, inflict D3 mortal damage on it." },
  ],
}];

export const manifestationLores = [{
  id: "manifestations-of-the-deepwood",
  name: "Manifestations of the Deepwood",
  description: "Sylvaneth Wizards can summon the Gladewyrm, Vengeful Skullroot and Spiteswarm Hive.",
  manifestations: ["gladewyrm", "vengeful-skullroot", "spiteswarm-hive"],
}];
