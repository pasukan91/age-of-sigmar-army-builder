function Home({
  onNewList,
  onMyLists,
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
            onClick={onNewList}
            className="aos-primary-action"
          >
            <span aria-hidden="true">＋</span>
            Nueva lista
          </button>

          <button
            type="button"
            onClick={onMyLists}
            className="aos-secondary-action"
          >
            <span aria-hidden="true">▤</span>
            Mis listas
          </button>
        </div>

        <p className="aos-home__private-note">
          Herramienta privada y no oficial. Sin afiliación ni aprobación de Games Workshop.
        </p>
      </section>
    </main>
  );
}

export default Home;
