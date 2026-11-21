import OfficialIcon from "./OfficialIcon";
import UnitArtwork from "./UnitArtwork";
import { createRegimentOfRenownReference } from "../utils/regimentOfRenownReferences";
import { getRegimentOfRenownAddError } from "../utils/armyComposition";

export default function RenownOptions({ options, list, onView, onAdd }) {
  return <section className="aos-renown-options" aria-label="Regimientos de renombre disponibles">
    {[...options].sort((left, right) => left.name.localeCompare(right.name)).map((regiment) => {
      const selected = (list?.regimentsOfRenown ?? []).some((item) => item.id === regiment.id);
      const reason = getRegimentOfRenownAddError(list, regiment);
      return <article className="aos-renown-option" key={regiment.id}>
        <button type="button" className="aos-renown-option__view" onClick={() => onView?.(createRegimentOfRenownReference(regiment))} aria-label={`Ver ${regiment.name}: unidades y reglas`}>
          <UnitArtwork unit={regiment} variant="thumbnail" />
          <span><strong>{regiment.name}</strong>{selected && <small>In Army</small>}</span>
        </button>
        <button type="button" className="aos-renown-option__add" onClick={() => onAdd(regiment)} disabled={Boolean(reason)} title={reason ?? `Añadir ${regiment.name}`} aria-label={selected ? `${regiment.name} ya incluido` : `Añadir ${regiment.name}`}>
          {selected ? "✓" : <OfficialIcon name="plus" size={29} strokeWidth={3} />}
        </button>
        <span className="aos-renown-option__points">{regiment.points}pts</span>
      </article>;
    })}
  </section>;
}
