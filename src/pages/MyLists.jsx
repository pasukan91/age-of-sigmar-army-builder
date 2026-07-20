import BackButton from "../components/BackButton";

function MyLists({
  lists = [],
  onOpenList,
  goBack,
}) {
  return (
    <main className="aos-shell">
      <header className="aos-screen-header">
        <BackButton
          onClick={goBack}
          light
          compact
        />

        <h1 className="aos-screen-header__title">
          Mis listas
        </h1>

        <span aria-hidden="true" />
      </header>

      <div className="aos-screen-content">
        <header className="aos-form-intro">
          <p className="aos-kicker">
            Storm Forge
          </p>

          <h2 className="aos-heading">
            Tus ejércitos
          </h2>
        </header>

        {lists.length === 0 ? (
          <div className="aos-empty-message">
            Aún no tienes listas creadas.
          </div>
        ) : (
          <section className="aos-option-list">
            {lists.map((list) => (
              <button
                key={list.id}
                type="button"
                onClick={() =>
                  onOpenList(list)
                }
                className="aos-list-card"
              >
                <span>
                  <small>
                    {list.faction?.name ??
                      "Age of Sigmar"}
                  </small>

                  <strong>{list.name}</strong>
                </span>

                <span className="aos-list-card__points">
                  {list.pointsLimit} pts
                </span>

                <span
                  className="aos-list-card__arrow"
                  aria-hidden="true"
                >
                  ›
                </span>
              </button>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

export default MyLists;
