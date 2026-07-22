import BackButton from "../components/BackButton";
import MainNav from "../components/MainNav";

function Settings({ onBack, onLists, onCreate, onSettings }) {
  return (
    <main className="aos-shell aos-page-with-main-nav">
      <header className="aos-screen-header">
        <BackButton onClick={onBack} light compact />
        <h1 className="aos-screen-header__title">Ajustes</h1>
        <span aria-hidden="true" />
      </header>

      <div className="aos-screen-content">
        <header className="aos-form-intro">
          <p className="aos-kicker">Storm Forge</p>
          <h2 className="aos-heading">Aplicación</h2>
        </header>

        <section className="aos-panel aos-settings-panel">
          <h3>Datos y funcionamiento</h3>
          <p>
            Tus listas y contadores se guardan automáticamente en este dispositivo.
            La aplicación puede seguir funcionando sin conexión cuando está instalada.
          </p>
        </section>

        <section className="aos-panel aos-settings-panel">
          <h3>Consejo de navegación</h3>
          <p>
            Puedes usar el gesto o botón Atrás del móvil. La app conserva la sección
            y la posición desde la que abriste una ficha.
          </p>
        </section>
      </div>

      <MainNav
        active="settings"
        onLists={onLists}
        onCreate={onCreate}
        onSettings={onSettings}
      />
    </main>
  );
}

export default Settings;
