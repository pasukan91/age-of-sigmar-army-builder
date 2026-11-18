import MainNav from "../components/MainNav";

function Settings({ onLists, onSettings, onRules }) {
  return (
    <main className="aos-official-page aos-profile-page">
      <header className="aos-official-header">
        <span aria-hidden="true" />
        <h1>PROFILE</h1>
        <span aria-hidden="true" />
      </header>

      <div className="aos-official-content aos-profile-content">
        <section className="aos-official-profile-card">
          <span className="aos-official-profile-avatar" aria-hidden="true">◎</span>
          <div>
            <h2>My Warhammer</h2>
            <p>Army data is stored on this device.</p>
          </div>
        </section>

        <section className="aos-official-link-list">
          <button type="button"><strong>Account</strong><span aria-hidden="true">›</span></button>
          <button type="button"><strong>Manage content</strong><span aria-hidden="true">›</span></button>
          <button type="button"><strong>Help</strong><span aria-hidden="true">›</span></button>
          <button type="button"><strong>Legal</strong><span aria-hidden="true">›</span></button>
        </section>
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
