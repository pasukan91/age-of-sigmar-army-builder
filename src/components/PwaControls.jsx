import { useEffect, useState } from "react";
import {
  isIosDevice,
  isStandalonePwa,
  requestPwaInstall,
} from "../pwa/pwaClient";

function PwaControls() {
  const [installable, setInstallable] = useState(false);
  const [online, setOnline] = useState(() => navigator.onLine);
  const [showIosHelp, setShowIosHelp] = useState(false);
  const standalone = isStandalonePwa();
  const secureContext = window.isSecureContext;
  const showIosInstall = secureContext && isIosDevice() && !standalone;

  useEffect(() => {
    const handleInstallable = (event) => setInstallable(Boolean(event.detail));
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("storm-forge:installable", handleInstallable);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("storm-forge:installable", handleInstallable);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!installable && online && !showIosInstall && secureContext) {
    return null;
  }

  return (
    <aside className="aos-pwa-controls" aria-live="polite">
      {!online && <span className="aos-pwa-controls__offline">Modo sin conexión</span>}

      {!secureContext && (
        <span className="aos-pwa-controls__offline">
          Abre Storm Forge con HTTPS para instalarla y usarla sin conexión
        </span>
      )}

      {installable && (
        <button type="button" onClick={requestPwaInstall}>
          Instalar app
        </button>
      )}

      {showIosInstall && (
        <>
          <button type="button" onClick={() => setShowIosHelp((value) => !value)}>
            Instalar en iPhone/iPad
          </button>
          {showIosHelp && (
            <p>
              En Safari, pulsa Compartir, elige «Añadir a pantalla de inicio»
              y confirma con «Añadir». Después abre Storm Forge desde su nuevo
              icono, no desde la pestaña del navegador.
            </p>
          )}
        </>
      )}
    </aside>
  );
}

export default PwaControls;
