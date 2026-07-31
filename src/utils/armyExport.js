import { calculateArmyPoints } from "./armyPoints.js";
import { validateArmyList } from "./armyValidation.js";

const ENHANCEMENTS = [
  ["heroicTrait", "Rasgo heroico"],
  ["monstrousTrait", "Rasgo monstruoso"],
  ["artefact", "Artefacto"],
  ["allConsumingObsession", "Obsesión"],
  ["moulderMutation", "Mutación"],
  ["mortisanRefinement", "Refinamiento"],
  ["originOfTerrifyingFolkTale", "Origen"],
  ["visionOfFate", "Visión"],
  ["specialKnickKnack", "Objeto"],
  ["flawlessManoeuvre", "Maniobra"],
  ["plaguefathersPox", "Plaga"],
  ["decorationForValour", "Condecoración"],
  ["ironweldInnovation", "Innovación"],
  ["accursedDevice", "Dispositivo"],
  ["brazenMutation", "Mutación"],
  ["brandOfDarkGod", "Marca"],
  ["ensorcelledBanner", "Estandarte"],
];

function unitPoints(unit) {
  const base = Number(unit?.points) || 0;
  const enhancementPoints = ENHANCEMENTS.reduce(
    (total, [field]) => total + (Number(unit?.[field]?.points) || 0),
    0
  );
  return base * (unit?.reinforced ? 2 : 1) + enhancementPoints;
}

function formatUnit(unit, prefix = "- ") {
  const lines = [`${prefix}${unit.name} (${unitPoints(unit)})${unit.reinforced ? " [Reforzada]" : ""}`];
  ENHANCEMENTS.forEach(([field, label]) => {
    if (unit?.[field]?.name) lines.push(`  · ${label}: ${unit[field].name}`);
  });
  return lines;
}

export function getArmyDrops(list) {
  return (list?.regiments ?? []).length + (list?.regimentsOfRenown ?? []).length;
}

export function formatArmyListText(list) {
  const validation = validateArmyList(list);
  const lines = [
    String(list?.name ?? "Lista sin nombre"),
    `${list?.faction?.name ?? "Age of Sigmar"}${list?.armyOfRenown?.name ? ` — ${list.armyOfRenown.name}` : ""}`,
    `${calculateArmyPoints(list)}/${Number(list?.pointsLimit ?? list?.points) || 0} pts · ${getArmyDrops(list)} drops · ${validation.isValid ? "Lista válida" : `${validation.errors.length} errores`}`,
    "",
  ];

  if (list?.battleFormation?.name) lines.push(`Formación: ${list.battleFormation.name}`);
  if (list?.spellLore?.name) lines.push(`Hechizos: ${list.spellLore.name}`);
  if (list?.prayerLore?.name) lines.push(`Plegarias: ${list.prayerLore.name}`);
  if (list?.manifestationLore?.name) lines.push(`Manifestaciones: ${list.manifestationLore.name}`);
  if (list?.terrain?.name) lines.push(`Terreno: ${list.terrain.name}`);
  if (lines.at(-1) !== "") lines.push("");

  (list?.regiments ?? []).forEach((regiment, index) => {
    lines.push(`REGIMIENTO ${index + 1}${index === 0 ? " — GENERAL" : ""}`);
    if (regiment.hero) lines.push(...formatUnit(regiment.hero));
    (regiment.units ?? []).forEach((unit) => lines.push(...formatUnit(unit)));
    lines.push("");
  });

  (list?.regimentsOfRenown ?? []).forEach((regiment) => {
    lines.push(`REGIMIENTO DE RENOMBRE — ${regiment.name} (${regiment.points ?? 0})`);
    (regiment.organisation ?? []).forEach((entry) => lines.push(`- ${entry}`));
    lines.push("");
  });

  if (!validation.isValid) {
    lines.push("ERRORES DE LEGALIDAD");
    validation.errors.forEach((item) => lines.push(`- ${item.title}: ${item.message}`));
    lines.push("");
  }

  lines.push("Creada con Storm Forge");
  return lines.join("\n").trim();
}

export function createArmyPrintHtml(list) {
  const text = formatArmyListText(list);
  const escaped = escapeHtml(text);
  const title = escapeHtml(String(list?.name ?? "Lista"));

  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${title}</title><style>body{font:15px/1.45 system-ui,sans-serif;max-width:760px;margin:40px auto;padding:0 24px;color:#181512}h1{font-family:Georgia,serif;color:#741b15}pre{white-space:pre-wrap;font:inherit}footer{margin-top:30px;border-top:1px solid #aaa;padding-top:10px;color:#666}@media print{body{margin:0;max-width:none}}</style></head><body><h1>${title}</h1><pre>${escaped}</pre><footer>Storm Forge · ${new Date().toLocaleDateString("es-ES")}</footer><script>window.addEventListener('load',()=>window.print())</script></body></html>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
