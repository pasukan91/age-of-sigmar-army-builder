import OfficialIcon from "../OfficialIcon";
import { UnitCard } from "./RegimentSection";

function RenownSection({ selected = [], onRemove, onView, onViewUnit, onBrowse, canBrowse = true }) {
  return <section className="aos-renown-section" aria-label="Regimientos de renombre incluidos">
    {selected.map((regiment) => <article className="aos-official-regiment aos-official-renown" key={regiment.instanceId ?? regiment.id}>
      <header className="aos-official-regiment__header">
        <strong>{regiment.name}</strong><span>{regiment.points} Points</span>
        <details className="aos-official-action-menu"><summary aria-label={`Opciones de ${regiment.name}`}><OfficialIcon name="menu" size={24} /></summary><div>
          <button type="button" onClick={() => onView?.(regiment)}>View Rules</button>
          <button type="button" onClick={() => onRemove(regiment.instanceId)}>Remove Regiment</button>
        </div></details>
      </header>
      <button type="button" className="aos-renown-rules-link" onClick={() => onView?.(regiment)}><OfficialIcon name="reference" size={23} /><strong>Regiment Rules</strong><OfficialIcon name="chevronRight" size={20} /></button>
      {(regiment.resolvedUnits ?? []).map((unit, index) => <UnitCard key={`${unit.id}-${index}`} unit={unit} points={0} pointsLabel="Included" locked onView={() => onViewUnit?.(unit)} />)}
    </article>)}
    {selected.length === 0 && canBrowse && <div className="aos-renown-empty"><button type="button" className="aos-renown-browse" onClick={onBrowse}>ADD REGIMENT OF RENOWN</button></div>}
  </section>;
}
export default RenownSection;
