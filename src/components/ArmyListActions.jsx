import { useState } from "react";
import { formatArmyListText } from "../utils/armyExport";
import { getGeneralRegimentId } from "../utils/armyComposition";
import createId from "../utils/createId";

function duplicateArmyList(list) {
  const general = getGeneralRegimentId(list);
  const ids = new Map((list.regiments ?? []).map((r) => [r.id, createId("regiment")]));
  const copyUnit = (unit) => unit ? { ...unit, instanceId: createId("unit") } : null;
  return { ...list, id: createId("list"), name: `${list.name} (copia)`,
    createdAt: Date.now(), updatedAt: Date.now(), generalRegimentId: ids.get(general) ?? null,
    regiments: (list.regiments ?? []).map((r) => ({ ...r, id: ids.get(r.id), hero: copyUnit(r.hero), units: r.units.map(copyUnit) })),
    auxiliaries: (list.auxiliaries ?? []).map(copyUnit),
    regimentsOfRenown: (list.regimentsOfRenown ?? []).map((r) => ({ ...r, instanceId: createId("renown") })),
  };
}

export default function ArmyListActions({ list, onClose, onUpdate, onDuplicate, onDelete, onSettings }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(list.name);
  const [points, setPoints] = useState(list.pointsLimit ?? 2000);
  const [formationId, setFormationId] = useState(list.battleFormation?.id ?? "");
  const formations = list.armyOfRenown?.rules?.battleFormations ?? list.faction?.battleFormations ?? [];
  const [exportText, setExportText] = useState("");
  const [message, setMessage] = useState("");
  return <div className="aos-dialog-backdrop" onClick={onClose}>
    <section className="aos-action-dialog" role="dialog" aria-modal="true" aria-label={`Opciones de ${list.name}`} onClick={(event) => event.stopPropagation()}>
      <header><h2>{list.name}</h2><button type="button" aria-label="Cerrar" onClick={onClose}>×</button></header>
      {editing ? <form onSubmit={(event) => { event.preventDefault(); onUpdate({ ...list, name: name.trim() || "Unnamed Army", pointsLimit: Number(points), battleFormation: formations.find((formation) => formation.id === formationId) ?? null }); onClose(); }}>
        <label>Nombre<input autoFocus maxLength={80} value={name} onChange={(event) => setName(event.target.value)} /></label>
        <label>Límite de puntos<input type="number" min="1" max="100000" required value={points} onChange={(event) => setPoints(event.target.value)} /></label>
        {formations.length > 0 && <label>Battle Formation<select value={formationId} onChange={(event) => setFormationId(event.target.value)}><option value="">No Battle Formation</option>{formations.map((formation) => <option key={formation.id} value={formation.id}>{formation.name}</option>)}</select></label>}
        <button type="submit">Guardar cambios</button>
      </form> : exportText ? <>
        <label>Texto del ejército<textarea readOnly rows={14} value={exportText} onFocus={(event) => event.target.select()} /></label>
        <button type="button" onClick={async () => { try { await navigator.clipboard.writeText(exportText); setMessage("Lista copiada"); } catch { setMessage("Selecciona el texto para copiarlo"); } }}>Copiar lista</button>
        {message && <p role="status">{message}</p>}
      </> : <div className="aos-action-dialog__options">
        <button type="button" onClick={() => setEditing(true)}>Editar ejército</button>
        {onDuplicate && <button type="button" onClick={() => { onDuplicate(duplicateArmyList(list)); onClose(); }}>Duplicar ejército</button>}
        <button type="button" onClick={() => setExportText(formatArmyListText(list))}>Exportar ejército</button>
        {onSettings && <button type="button" onClick={() => { onClose(); onSettings(); }}>Preferencias</button>}
        {onDelete && <button type="button" onClick={() => { onDelete(list.id); onClose(); }}>Eliminar ejército</button>}
      </div>}
    </section>
  </div>;
}
