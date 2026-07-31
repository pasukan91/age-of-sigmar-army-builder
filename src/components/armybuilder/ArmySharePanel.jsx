import { useState } from "react";
import {
  createArmyPrintHtml,
  formatArmyListText,
  getArmyDrops,
} from "../../utils/armyExport";

function ArmySharePanel({ list }) {
  const [status, setStatus] = useState("");
  const text = formatArmyListText(list);

  async function copyList() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Lista copiada al portapapeles.");
    } catch {
      setStatus("No se pudo copiar automáticamente. Usa Compartir o Descargar.");
    }
  }

  async function shareList() {
    if (!navigator.share) {
      await copyList();
      return;
    }

    try {
      await navigator.share({ title: list.name, text });
      setStatus("Lista compartida.");
    } catch (error) {
      if (error?.name !== "AbortError") setStatus("No se pudo abrir el menú de compartir.");
    }
  }

  function downloadList() {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${slugify(list.name)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setStatus("Archivo de texto descargado.");
  }

  function printList() {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      setStatus("El navegador ha bloqueado la ventana de impresión.");
      return;
    }
    printWindow.opener = null;
    printWindow.document.write(createArmyPrintHtml(list));
    printWindow.document.close();
    setStatus("Vista de impresión preparada. También puedes guardarla como PDF.");
  }

  return (
    <section className="aos-share-panel" aria-labelledby="share-panel-title">
      <header>
        <div>
          <span className="aos-eyebrow">Preparada para el torneo</span>
          <h2 id="share-panel-title">Compartir y exportar</h2>
        </div>
        <span className="aos-share-panel__drops">{getArmyDrops(list)} drops</span>
      </header>

      <p>Genera un resumen compacto con regimientos, mejoras, puntos y estado de legalidad.</p>

      <div className="aos-share-panel__actions">
        <button type="button" className="is-primary" onClick={shareList}>Compartir</button>
        <button type="button" onClick={copyList}>Copiar texto</button>
        <button type="button" onClick={downloadList}>Descargar .txt</button>
        <button type="button" onClick={printList}>Imprimir / PDF</button>
      </div>

      {status && <p className="aos-share-panel__status" role="status">{status}</p>}
    </section>
  );
}

function slugify(value) {
  return String(value || "lista")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "lista";
}

export default ArmySharePanel;
