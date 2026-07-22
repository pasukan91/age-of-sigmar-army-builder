import BackButton from "../components/BackButton";
import ChevronIcon from "../components/ChevronIcon";
import MainNav from "../components/MainNav";
import { calculateArmyPoints } from "../utils/armyPoints";

function MyLists({
  lists = [],
  onOpenList,
  onDeleteList,
  storageStatus = "saved",
  goBack,
  onLists,
  onCreate,
  onSettings,
  deletedList,
  onUndoDelete,
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

          <p className="aos-storage-note" role="status">
            {storageStatus === "error"
              ? "No se ha podido acceder al almacenamiento del dispositivo."
              : "Las listas se guardan automáticamente en este dispositivo y funcionan sin conexión."}
          </p>
        </header>

        {lists.length === 0 ? (
          <div className="aos-empty-message">
            Aún no tienes listas creadas.
          </div>
        ) : (
          <section className="aos-option-list">
            {[...lists]
              .sort(
                (left, right) =>
                  Number(right.updatedAt) - Number(left.updatedAt)
              )
              .map((list) => (
              <article
                key={list.id}
                className="aos-list-card"
              >
                <button
                  type="button"
                  onClick={() => onOpenList(list)}
                  className="aos-list-card__open"
                >
                  <span>
                    <small>
                      {list.faction?.name ?? "Age of Sigmar"}
                    </small>

                    <strong>{list.name}</strong>
                    <span className="aos-list-card__updated">
                      Actualizada {formatSavedDate(list.updatedAt)}
                    </span>
                  </span>

                  <span className="aos-list-card__points">
                    {calculateArmyPoints(list)} / {list.pointsLimit} pts
                  </span>

                  <span
                    className="aos-list-card__arrow"
                    aria-hidden="true"
                  >
                    <ChevronIcon direction="right" size={8} />
                  </span>
                </button>

                <button
                  type="button"
                  className="aos-list-card__delete"
                  onClick={() => onDeleteList(list.id)}
                >
                  Eliminar lista
                </button>
              </article>
            ))}
          </section>
        )}
      </div>

      {deletedList && (
        <div className="aos-undo-toast" role="status">
          <span>Lista “{deletedList.name}” eliminada</span>
          <button type="button" onClick={onUndoDelete}>Deshacer</button>
        </div>
      )}

      <MainNav
        active="lists"
        onLists={onLists}
        onCreate={onCreate}
        onSettings={onSettings}
      />
    </main>
  );
}

function formatSavedDate(value) {
  const date = new Date(Number(value));

  if (Number.isNaN(date.getTime())) {
    return "recientemente";
  }

  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default MyLists;
