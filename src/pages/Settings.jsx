import MainNav from "../components/MainNav";
import OfficialIcon from "../components/OfficialIcon";

const PROFILE_LINKS = [
  ["subscriptions", "View Subscriptions"],
  ["settings", "User Preferences"],
  ["document", "Terms & Conditions"],
  ["lock", "Privacy Policy"],
  ["report", "Report A Problem"],
  ["deleteUser", "Delete my account"],
  ["logout", "Logout"],
];

function Settings({ onLists, onSettings, onRules }) {
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
            <button key={label} type="button">
              <OfficialIcon name={icon} size={21} strokeWidth={1.8} />
              <strong>{label}</strong>
              <OfficialIcon name="chevronRight" size={22} strokeWidth={3} />
            </button>
          ))}
        </section>

        <div className="aos-profile-version">
          <p>App Version: v1.39.0 (89)</p>
          <p>Data Version: v488</p>
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
