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
  const showIosInstall = isIosDevice() && !standalone;

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

  if (!installable && online && !showIosInstall) {
    return null;
  }

  return (
    <aside className="aos-pwa-controls" aria-live="polite">
      {!online && <span className="aos-pwa-controls__offline">Modo sin conexión</span>}

      {installable && (
        <button type="button" onClick={requestPwaInstall}>
          Instalar app
        </button>
      )}

      {showIosInstall && (
        <>
          <button type="button" onClick={() => setShowIosHelp((value) => !value)}>
            Instalar en iPhone
          </button>
          {showIosHelp && (
            <p>Pulsa Compartir en Safari y después «Añadir a pantalla de inicio».</p>
          )}
        </>
      )}
    </aside>
  );
}

export default PwaControls;
