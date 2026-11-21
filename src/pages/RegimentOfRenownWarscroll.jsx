import { useEffect, useState } from "react";
import Accordion from "../components/Accordion";
import AbilityCard from "../components/AbilityCard";
import FormattedRulesText from "../components/FormattedRulesText";
import MainNav from "../components/MainNav";
import OfficialIcon from "../components/OfficialIcon";
import UnitArtwork from "../components/UnitArtwork";
import { UnitCard } from "../components/armybuilder/RegimentSection";
import UnitWarscroll from "./unitWarscroll";
import { getRegimentEligibleFactionNames, getRegimentOrganisation } from "../utils/regimentOfRenownReferences";
import { getRegimentOfRenownAddError } from "../utils/armyComposition";

export default function RegimentOfRenownWarscroll({ regiment, onBack, onAdd, list, onRules, onLists, onSettings }) {
  const [selectedUnit, setSelectedUnit] = useState(null);
  useEffect(() => {
    const restoreUnit = (event) => setSelectedUnit(event.state?.renownUnit?.regimentId === regiment.id ? regiment.resolvedUnits?.[event.state.renownUnit.index] ?? null : null);
    window.addEventListener("popstate", restoreUnit);
    return () => window.removeEventListener("popstate", restoreUnit);
  }, [regiment]);
  function openUnit(unit, index) {
    window.history.pushState({ ...(window.history.state ?? {}), renownUnit: { regimentId: regiment.id, index } }, "", window.location.href);
    setSelectedUnit(unit);
  }
  function closeUnit() {
    if (window.history.state?.renownUnit) window.history.back();
    else setSelectedUnit(null);
  }
  const navigation = { onRules, onLists, onSettings };
  if (selectedUnit) return <UnitWarscroll unit={selectedUnit} onBack={closeUnit} navActive="storm-forge" {...navigation} />;
  const units = regiment.resolvedUnits ?? [];
  const reason = getRegimentOfRenownAddError(list, regiment);
  return <main className="aos-official-page aos-warscroll-page aos-renown-reference">
    <header className="aos-official-header"><button type="button" onClick={onBack} aria-label="Back"><OfficialIcon name="back" size={25} /></button><h1>{regiment.name}</h1><span /></header>
    <section className="aos-renown-reference__hero"><UnitArtwork unit={regiment} variant="warscroll" /><strong>{regiment.points} Points</strong></section>
    {onAdd && <section className="aos-renown-reference__add"><strong>{regiment.name}</strong><button type="button" onClick={() => onAdd(regiment)} disabled={Boolean(reason)} aria-label={`Añadir ${regiment.name}`} title={reason ?? "Añadir regimiento"}><OfficialIcon name="plus" size={29} /></button>{reason && <p role="status">{reason}</p>}</section>}
    <Accordion title="Regiment Details" defaultOpen>
      {regiment.description && <p><FormattedRulesText text={regiment.description} /></p>}
      <ul>{getRegimentOrganisation(regiment).map((entry, index) => <li key={index}><FormattedRulesText text={entry} /></li>)}</ul>
    </Accordion>
    <section aria-label="Unidades del regimiento">{units.map((unit, index) => <UnitCard key={`${unit.id}-${index}`} unit={unit} points={0} pointsLabel="Included" locked onView={() => openUnit(unit, index)} />)}</section>
    <Accordion title="Regiment Abilities" defaultOpen>
      {(regiment.abilities ?? []).map((ability, index) => <AbilityCard key={ability.id ?? index} ability={ability} variant="reference" />)}
      {!regiment.abilities?.length && <p><FormattedRulesText text={regiment.rulesText || "Usa las habilidades de los warscrolls incluidos."} /></p>}
    </Accordion>
    <Accordion title="Eligible Factions"><p>{getRegimentEligibleFactionNames(regiment).join(" · ")}</p></Accordion>
    <MainNav active="storm-forge" onReference={onRules ?? onBack} onStormForge={onLists ?? onBack} onProfile={onSettings ?? onBack} />
  </main>;
}
