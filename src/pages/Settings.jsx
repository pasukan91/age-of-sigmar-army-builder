import { useState } from "react";
import MainNav from "../components/MainNav";
import OfficialIcon from "../components/OfficialIcon";
import { getUserPreferences, saveUserPreferences } from "../utils/userPreferences";

const PROFILE_LINKS = [
  ["settings", "User Preferences"],
  ["lock", "Privacidad y datos"],
  ["report", "Report A Problem"],
];

function Settings({ onLists, onSettings, onRules }) {
  const [view, setView] = useState(null);
  const [preferences, setPreferences] = useState(getUserPreferences);
  const [message, setMessage] = useState("");
  function toggle(key, checked) {
    const next = { ...preferences, [key]: checked };
    setPreferences(next);
    setMessage(saveUserPreferences(next) ? "" : "No se han podido guardar las preferencias en este navegador.");
  }
  return (
    <main className="aos-official-page aos-profile-page">
      <header className="aos-official-header aos-official-header--root">
        <span aria-hidden="true" />
        <h1>PROFILE</h1>
        <span aria-hidden="true" />
      </header>

      <div className="aos-official-content aos-profile-content">
        <section className="aos-official-link-list aos-profile-links">
          {PROFILE_LINKS.map(([icon, label]) => (
            <button key={label} type="button" onClick={() => { setView(view === icon ? null : icon); setMessage(""); }} aria-expanded={view === icon}>
              <OfficialIcon name={icon} size={21} strokeWidth={1.8} />
              <strong>{label}</strong>
              <OfficialIcon name="chevronRight" size={22} strokeWidth={3} />
            </button>
          ))}
          <a href="/cdn-cgi/access/logout"><OfficialIcon name="logout" size={21} /><strong>Logout</strong><OfficialIcon name="chevronRight" size={22} /></a>
        </section>

        {view === "settings" && <section className="aos-preferences-panel"><h2>User Preferences</h2>
          <label><span>Expandir secciones de warscrolls automáticamente</span><input type="checkbox" checked={preferences.expandSections ?? false} onChange={(event) => toggle("expandSections", event.target.checked)} /></label>
          <label><span>Expandir habilidades y comandos automáticamente</span><input type="checkbox" checked={preferences.expandAbilities ?? false} onChange={(event) => toggle("expandAbilities", event.target.checked)} /></label>
          <p>Las secciones abiertas o cerradas manualmente conservan su estado. Storm Forge incluye el catálogo disponible para juego equilibrado.</p>
        </section>}
        {view === "lock" && <section className="aos-preferences-panel"><h2>Privacidad y datos</h2><p>Tus ejércitos y preferencias se guardan en este navegador. Exporta las listas desde su menú antes de borrar los datos del navegador o cambiar de dispositivo.</p><p>El acceso está protegido por Cloudflare Access. Para modificar los correos admitidos, contacta con el administrador. Esta aplicación no gestiona cuentas ni suscripciones de Warhammer.</p></section>}
        {view === "report" && <section className="aos-preferences-panel"><h2>Reportar un problema</h2><p>Comparte con el administrador la pantalla, el ejército y los pasos para reproducir el fallo. Puedes añadir una captura, evitando incluir códigos de acceso.</p><button type="button" onClick={async () => { const details = `Almogàvers AoS\nRuta: ${location.pathname}\nNavegador: ${navigator.userAgent}`; try { await navigator.clipboard.writeText(details); setMessage("Información técnica copiada"); } catch { setMessage(details); } }}>Copiar información técnica</button></section>}
        {message && <p role="status">{message}</p>}

        <div className="aos-profile-version">
          <p>Almogàvers · Age of Sigmar</p>
          <p>Catálogo sincronizado: 19/11/2026</p>
        </div>
      </div>

      <MainNav
        active="profile"
        onReference={onRules}
        onStormForge={onLists}
        onProfile={onSettings}
      />
    </main>
  );
}

export default Settings;
