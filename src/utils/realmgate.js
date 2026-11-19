import rules from "../data/sigdexRules.generated.json" with { type: "json" };
import { getListUnitInstances } from "./listWarscrolls.js";
import { getEnhancementAbilities, getEnhancementTiming } from "./enhancementTiming.js";

const ENHANCEMENTS = ["artefact", "heroicTrait", "monstrousTrait", "allConsumingObsession", "moulderMutation", "mortisanRefinement", "originOfTerrifyingFolkTale", "visionOfFate", "specialKnickKnack", "flawlessManoeuvre", "plaguefathersPox", "decorationForValour", "ironweldInnovation", "accursedDevice", "brazenMutation", "brandOfDarkGod", "ensorcelledBanner", "boonOfShadow", "aqshyEnhancement"];
const key = (item) => item.sourceId ?? item.id ?? item.name;
const unique = (items) => [...new Map(items.filter(Boolean).map((item) => [key(item), item])).values()];

export function getRealmgateWarscrolls(list) {
  const kindOrder = { unit: 0, manifestation: 1, terrain: 2 };
  return [
    ...unique(getListUnitInstances(list).map(({ unit }) => unit)).map((unit) => ({ id: `unit-${key(unit)}`, item: unit, kind: "unit" })),
    ...(list?.terrain ? [{ id: `terrain-${key(list.terrain)}`, item: list.terrain, kind: "terrain" }] : []),
    ...unique(list?.manifestationLore?.manifestations ?? []).map((unit) => ({ id: `manifestation-${key(unit)}`, item: unit, kind: "manifestation" })),
  ].sort((left, right) => kindOrder[left.kind] - kindOrder[right.kind] || left.item.name.localeCompare(right.item.name));
}

export function getRealmgateEnhancements(list) {
  return unique(getListUnitInstances(list).flatMap(({ unit }) => [
    ...ENHANCEMENTS.map((field) => unit[field]),
    ...Object.values(unit.specialEnhancements ?? {}),
  ])).flatMap((enhancement) => {
    const abilities = getEnhancementAbilities(enhancement);
    return (abilities.length ? abilities : [{ ...enhancement, phase: getEnhancementTiming(enhancement) }])
      .map((ability, index) => ({ ...ability, points: index === 0 ? enhancement.points : 0 }));
  });
}

export function getRealmgateManifestationAbilities(manifestation) {
  return unique([
    manifestation.summonSpell,
    ...(manifestation.abilities ?? []).filter((ability) => !/^summon\b/i.test(ability.name) && !(ability.keywords ?? []).some((keyword) => /summon/i.test(keyword))),
  ]);
}

function extractAbilities(value, output) {
  if (!value || typeof value !== "object") return;
  if (value.ability) output.push(value.ability);
  for (const [field, nested] of Object.entries(value)) if (field !== "ability") extractAbilities(nested, output);
}

const extracted = [];
rules.documents.filter((document) => ["core", "ghb26-advanced"].includes(document.id)).forEach((document) => extractAbilities(document, extracted));
const normalized = [...new Map(extracted.map((ability) => {
  const id = ability.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const prayer = (ability.keywords ?? []).some((keyword) => keyword.toLowerCase() === "prayer");
  return [id, {
    id, name: ability.name, phase: ability.timing || "Passive", type: prayer ? "Prayer" : "Ability",
    phaseColor: ({ deploymentPhase: "black", startOfTurn: "black", heroPhase: "yellow", movementPhase: "gray", shootingPhase: "blue", chargePhase: "orange", combatPhase: "red", endOfTurn: "purple", defensive: "green" })[ability.phase],
    description: [ability.usedBy && `Used By: ${ability.usedBy}`, ability.declare && `Declare: ${ability.declare}`, ability.effect && `Effect: ${ability.effect}`].filter(Boolean).join("\n\n"),
    keywords: ability.keywords ?? [], commandPoints: prayer ? null : ability.cpCost,
    chantingValue: prayer ? ability.cpCost : null,
  }];
})).values()];

const commandIds = new Set(extracted.filter((ability) => ability.cpCost > 0).map((ability) => ability.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")));
const abilityOrder = ["activate-place-of-power", "deploy-faction-terrain", "deploy-regiment", "deploy-unit", "banish-manifestation", "musician", "unbind", "fly", "normal-move", "retreat", "run", "guarded-hero", "shoot", "charge", "champion", "fight", "standard-bearer", "ward-save"];
const commandOrder = ["magical-intervention", "rally", "sacred-rites", "at-the-double", "redeploy", "covering-fire", "counter-charge", "forward-to-victory", "all-out-attack", "power-through", "all-out-defence"];
export const realmgateUniversalAbilities = normalized.filter((ability) => !commandIds.has(ability.id)).sort((a, b) => abilityOrder.indexOf(a.id) - abilityOrder.indexOf(b.id));
export const realmgateUniversalCommands = normalized.filter((ability) => commandIds.has(ability.id)).sort((a, b) => commandOrder.indexOf(a.id) - commandOrder.indexOf(b.id));
