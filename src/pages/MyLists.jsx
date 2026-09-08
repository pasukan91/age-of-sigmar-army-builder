import { useState } from "react";
import BackButton from "../components/BackButton";
import ChevronIcon from "../components/ChevronIcon";
import MainNav from "../components/MainNav";
import TrashIcon from "../components/TrashIcon";
import { calculateArmyPoints } from "../utils/armyPoints";
import { validateArmyList } from "../utils/armyValidation";
import {
  getFactionArtwork,
  getFactionArtworkPosition,
} from "../utils/factionArtwork";

function MyLists({
  lists = [],
  onOpenList,
  onDeleteList,
  storageStatus = "saved",
  goBack,
  onLists,
  onCreate,
  onCreatePredefined,
  onImportList,
  onSettings,
  deletedList,
  onUndoDelete,
}) {
  const [showImporter, setShowImporter] = useState(false);
  const [importText, setImportText] = useState("");
  const [importResult, setImportResult] = useState(null);
  const [importError, setImportError] = useState("");

  function handleImport() {
    setImportError("");
    setImportResult(null);

    try {
      const result = onImportList(importText);
      setImportResult(result);
      setImportText("");
    } catch (error) {
      setImportError(error?.message ?? "No se ha podido importar la lista.");
    }
  }

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

          {(storageStatus === "error" || storageStatus === "recovered") && (
            <p className="aos-storage-note" role="alert">
              {storageStatus === "error"
                ? "No se ha podido guardar. La copia anterior se ha protegido para evitar perder datos."
                : "Se han aislado datos dañados. Revisa las listas recuperadas antes de continuar."}
            </p>
          )}
        </header>

        <section className="aos-list-import">
          <button
            type="button"
            className="aos-secondary-action aos-list-import__toggle"
            onClick={() => {
              setShowImporter((visible) => !visible);
              setImportError("");
              setImportResult(null);
            }}
            aria-expanded={showImporter}
            aria-controls="official-list-import"
          >
            Importar desde AoS App
          </button>

          {showImporter && (
            <div id="official-list-import" className="aos-list-import__panel">
              <label htmlFor="official-list-text">Lista exportada</label>
              <textarea
                id="official-list-text"
                value={importText}
                onChange={(event) => setImportText(event.target.value)}
                placeholder="Pega aquí el texto completo de la app oficial…"
                rows={10}
                maxLength={60000}
                autoFocus
              />

              {importError && (
                <p className="aos-list-import__message is-error" role="alert">
                  {importError}
                </p>
              )}

              {importResult && (
                <div className="aos-list-import__message is-success" role="status">
                  <strong>“{importResult.list.name}” importada.</strong>
                  {importResult.warnings.length > 0 && (
                    <>
                      <span>Revisa estos avisos:</span>
                      <ul>
                        {importResult.warnings.map((warning) => (
                          <li key={warning}>{warning}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}

              <div className="aos-list-import__actions">
                <button
                  type="button"
                  className="aos-secondary-action"
                  onClick={() => setShowImporter(false)}
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  className="aos-primary-action"
                  onClick={handleImport}
                  disabled={!importText.trim()}
                >
                  Importar lista
                </button>
              </div>
            </div>
          )}
        </section>

        {lists.length === 0 ? (
          <div className="aos-empty-message aos-empty-message--actionable">
            <strong>Empieza tu primer ejército</strong>
            <button type="button" className="aos-primary-action" onClick={onCreatePredefined}>
              Crear lista predefinida
            </button>
            <button type="button" className="aos-secondary-action" onClick={onCreate}>
              Empezar desde cero
            </button>
          </div>
        ) : (
          <section className="aos-option-list">
            {[...lists]
              .sort(
                (left, right) =>
                  Number(right.updatedAt) - Number(left.updatedAt)
              )
              .map((list) => {
                const artwork = getFactionArtwork(list.faction);
                const validation = validateArmyList(list);
                const unitCount = (list.regiments ?? []).reduce(
                  (total, regiment) => total + 1 + (regiment.units?.length ?? 0),
                  0
                ) + (list.regimentsOfRenown ?? []).reduce(
                  (total, regiment) => total + (regiment.organisation?.length ?? 0),
                  0
                );
                const regimentCount = (list.regiments?.length ?? 0)
                  + (list.regimentsOfRenown?.length ?? 0);

                return (
                  <article
                    key={list.id}
                    className={`aos-list-card${artwork ? " aos-list-card--with-artwork" : ""}`}
                    style={artwork
                      ? {
                          "--aos-list-card-image": `url("${artwork}")`,
                          "--aos-list-card-position":
                            getFactionArtworkPosition(list.faction, "list") ??
                            list.faction?.imagePosition ??
                            "center",
                        }
                      : undefined}
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
                        <span className="aos-list-card__meta">
                          <span className={`aos-list-status${validation.errors.length > 0 ? " is-error" : validation.warnings.length > 0 ? " is-warning" : " is-valid"}`}>
                            {validation.errors.length > 0
                              ? `${validation.errors.length} ${validation.errors.length === 1 ? "error" : "errores"}`
                              : validation.warnings.length > 0
                                ? `${validation.warnings.length} ${validation.warnings.length === 1 ? "pendiente" : "pendientes"}`
                                : "Lista legal"}
                          </span>
                          <span>{regimentCount} reg. · {unitCount} unidades</span>
                          {list.preset?.name && <span>Plantilla {list.preset.name}</span>}
                        </span>
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
                      aria-label={`Eliminar la lista ${list.name}`}
                      title="Eliminar lista"
                    >
                      <TrashIcon />
                    </button>
                  </article>
                );
              })}
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
