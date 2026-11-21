import { useEffect, useState } from "react";
import { canRequestPwaInstall, isIosDevice, isStandalonePwa, requestPwaInstall } from "../pwa/pwaClient";

export default function PwaInstall({ banner = false }) {
  const [installed, setInstalled] = useState(isStandalonePwa);
  const [installable, setInstallable] = useState(canRequestPwaInstall);
  const [expanded, setExpanded] = useState(false);
  const [message, setMessage] = useState("");
  const [dismissed, setDismissed] = useState(() => {
    try { return sessionStorage.getItem("storm-forge.install-dismissed") === "yes"; } catch { return false; }
  });
  useEffect(() => {
    const availabilityChanged = (event) => setInstallable(Boolean(event.detail));
    const installedApp = () => { setInstalled(true); setMessage(""); };
    window.addEventListener("storm-forge:installable", availabilityChanged);
    window.addEventListener("appinstalled", installedApp);
    return () => {
      window.removeEventListener("storm-forge:installable", availabilityChanged);
      window.removeEventListener("appinstalled", installedApp);
    };
  }, []);
  if (installed || (banner && dismissed)) return null;
  const ios = isIosDevice();
  async function install() {
    setMessage("");
    if (!canRequestPwaInstall()) { setExpanded(true); return; }
    try {
      const accepted = await requestPwaInstall();
      setMessage(accepted ? "Instalación solicitada. Confirma los pasos que muestre tu navegador." : "Instalación cancelada. También puedes instalarla desde el menú del navegador.");
      if (!accepted) setExpanded(true);
    } catch {
      setMessage("El navegador no ha podido abrir el instalador. Sigue estos pasos.");
      setExpanded(true);
    }
  }
  return <section className={`aos-install-card${banner ? " aos-install-card--banner" : ""}`} aria-label="Instalar Storm Forge">
    <div className="aos-install-card__heading"><strong>Instala Storm Forge</strong>{banner && <button type="button" aria-label="Ocultar aviso de instalación" onClick={() => { setDismissed(true); try { sessionStorage.setItem("storm-forge.install-dismissed", "yes"); } catch { /* optional */ } }}>×</button>}</div>
    <p>Crea el icono en tu móvil y abre la app a pantalla completa. La instalación requiere tu confirmación.</p>
    <button type="button" className="aos-install-card__action" onClick={install}>{installable ? "Instalar app" : "Cómo instalar la app"}</button>
    {message && <p role="status">{message}</p>}
    {expanded && <div className="aos-install-card__instructions">
      {ios ? <ol><li>Abre esta URL en Safari e inicia sesión con tu correo admitido.</li><li>Pulsa Compartir y busca «Añadir a pantalla de inicio».</li><li>Activa «Abrir como app web» si aparece y pulsa «Añadir».</li></ol> : <ol><li>Abre esta URL en Chrome o Edge e inicia sesión con tu correo admitido.</li><li>Abre el menú ⋮ o … del navegador.</li><li>Pulsa «Instalar app» o «Añadir a pantalla de inicio» y confirma.</li></ol>}
      <p>Si abriste el enlace dentro de WhatsApp, Gmail u otra app, usa «Abrir en el navegador». Si no ves la opción, evita el modo incógnito y prueba el navegador habitual del móvil.</p>
      <a href={window.location.origin}>Abrir Storm Forge</a>
    </div>}
  </section>;
}
