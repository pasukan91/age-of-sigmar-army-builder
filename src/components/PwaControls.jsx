import { useEffect, useState } from "react";
import {
  activatePwaUpdate,
  isIosDevice,
  isStandalonePwa,
  requestPwaInstall,
} from "../pwa/pwaClient";

function PwaControls() {
  const [installable, setInstallable] = useState(false);
  const [updateRegistration, setUpdateRegistration] = useState(null);
  const [online, setOnline] = useState(() => navigator.onLine);
  const [showIosHelp, setShowIosHelp] = useState(false);
  const standalone = isStandalonePwa();
  const showIosInstall = isIosDevice() && !standalone;

  useEffect(() => {
    const handleInstallable = (event) => setInstallable(Boolean(event.detail));
    const handleUpdate = (event) => setUpdateRegistration(event.detail);
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("storm-forge:installable", handleInstallable);
    window.addEventListener("storm-forge:update", handleUpdate);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("storm-forge:installable", handleInstallable);
      window.removeEventListener("storm-forge:update", handleUpdate);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!installable && !updateRegistration && online && !showIosInstall) {
    return null;
  }

  return (
    <aside className="aos-pwa-controls" aria-live="polite">
      {!online && <span className="aos-pwa-controls__offline">Modo sin conexión</span>}

      {updateRegistration && (
        <button type="button" onClick={() => activatePwaUpdate(updateRegistration)}>
          Actualizar app
        </button>
      )}

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
