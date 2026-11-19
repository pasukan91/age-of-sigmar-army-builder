import AbilityCard from "../AbilityCard";
import UnitArtwork from "../UnitArtwork";
import OfficialIcon from "../OfficialIcon";
import { getRealmgateWarscrolls, getRealmgateEnhancements, getRealmgateManifestationAbilities, realmgateUniversalAbilities, realmgateUniversalCommands } from "../../utils/realmgate";

function Realmgate({ list, onViewUnit, onViewRule }) {
  const faction = { ...list.faction, ...(list.armyOfRenown?.rules ?? {}) };
  const warscrolls = getRealmgateWarscrolls(list);
  const enhancements = getRealmgateEnhancements(list);
  const formation = list.battleFormation;
  const lores = [list.spellLore, list.prayerLore, list.manifestationLore].filter(Boolean);
  const view = (entry) => entry.kind === "unit" ? onViewUnit?.(entry.item) : onViewRule?.({ kind: entry.kind, item: entry.item, sourceName: faction.name });

  return <div className="aos-realmgate">
    <RealmgateSection title="Warscrolls">
      <div className="aos-realmgate-warscrolls">{warscrolls.map((entry) => <button type="button" key={entry.id} onClick={() => view(entry)} aria-label={`Ver warscroll de ${entry.item.name}`}><UnitArtwork unit={entry.item} /><strong>{entry.item.name}</strong></button>)}</div>
      {warscrolls.length === 0 && <p className="aos-realmgate-empty">Añade unidades a la lista para consultar sus warscrolls.</p>}
    </RealmgateSection>
    {enhancements.length > 0 && <RealmgateSection title="Enhancements"><RealmgateAbilities abilities={enhancements} /></RealmgateSection>}
    {(faction.battleTraits ?? []).length > 0 && <RealmgateSection title="Battle Traits"><RealmgateAbilities abilities={faction.battleTraits} /></RealmgateSection>}
    {formation && <RealmgateSection title="Battle Formation"><RealmgateAbilities abilities={formation.abilities?.length ? formation.abilities : formation.ability ? [formation.ability] : [{ ...formation, phase: "Passive" }]} /></RealmgateSection>}
    {lores.length > 0 && <RealmgateSection title="Lores">{lores.map((lore) => <details className="aos-realmgate-lore" key={lore.sourceId ?? lore.id} open><summary><OfficialIcon name="chevronDown" size={18} /><strong>{lore.name}</strong></summary><RealmgateAbilities abilities={lore.spells ?? lore.prayers ?? []} />{(lore.manifestations ?? []).map((manifestation) => <details className="aos-realmgate-manifestation" key={manifestation.id}><summary><UnitArtwork unit={manifestation} /><strong>{manifestation.name}</strong><OfficialIcon name="chevronDown" size={18} /></summary><RealmgateAbilities abilities={getRealmgateManifestationAbilities(manifestation)} /><button type="button" className="aos-official-current-selection" onClick={() => onViewRule?.({ kind: "manifestation", item: manifestation, sourceName: lore.name })}>View Warscroll</button></details>)}</details>)}</RealmgateSection>}
    <RealmgateSection title="Universal Abilities"><RealmgateAbilities abilities={realmgateUniversalAbilities} /></RealmgateSection>
    <RealmgateSection title="Universal Commands"><RealmgateAbilities abilities={realmgateUniversalCommands} /></RealmgateSection>
  </div>;
}

function RealmgateSection({ title, children }) {
  return <details className="aos-realmgate-section" open><summary><strong>{title}</strong><OfficialIcon name="chevronDown" size={18} /></summary><div className="aos-realmgate-section__content">{children}</div></details>;
}

function RealmgateAbilities({ abilities }) {
  return <div className="aos-realmgate-abilities">{abilities.map((ability, index) => <AbilityCard key={ability.sourceId ?? ability.id ?? `${ability.name}-${index}`} ability={ability} variant="reference" />)}</div>;
}

export default Realmgate;
