import MainNav from "../components/MainNav";

function Home({
  onPredefinedLists,
  onNewList,
  onMyLists,
  onSettings,
}) {
  return (
    <main className="aos-home">
      <header className="aos-home__masthead">
        <div
          className="aos-home__mark"
          aria-hidden="true"
        >
          Σ
        </div>

        <p className="aos-home__brand">
          Warhammer Age of Sigmar
        </p>
      </header>

      <section className="aos-home__content">
        <p className="aos-home__eyebrow">
          Storm Forge
        </p>

        <h1 className="aos-home__title">
          Forja tu ejército
        </h1>

        <p className="aos-home__copy">
          Reúne tus regimientos, consulta sus
          warscrolls y controla cada punto de
          tu fuerza desde un único lugar.
        </p>

        <div className="aos-home__actions">
          <button
            type="button"
            onClick={onPredefinedLists}
            className="aos-primary-action"
          >
            <span aria-hidden="true">★</span>
            Crear lista predefinida
          </button>
        </div>

        <ul className="aos-home__benefits" aria-label="Ventajas de las listas predefinidas">
          <li><span aria-hidden="true">✓</span> Completa y legal</li>
          <li><span aria-hidden="true">✎</span> Totalmente editable</li>
          <li><span aria-hidden="true">●</span> Guardado automático</li>
        </ul>

        <p className="aos-home__manual-note">
          ¿Prefieres empezar desde cero? Usa <strong>Nueva lista</strong> en la barra inferior.
        </p>

        <p className="aos-home__private-note">
          Herramienta privada y no oficial. Sin afiliación ni aprobación de Games Workshop.
        </p>
      </section>

      <MainNav
        active={null}
        onLists={onMyLists}
        onCreate={onNewList}
        onSettings={onSettings}
      />
    </main>
  );
}

export default Home;
