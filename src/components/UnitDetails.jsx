import { formatRegimentOption } from "../utils/regimentRules";

function UnitDetails({ unit, models, points }) {
  const regimentOptions = (unit.details?.regimentOptions ?? [])
    .map(formatRegimentOption)
    .filter(Boolean);

  return (
    <div className="aos-official-unit-details">
      <p>• {models} {models === 1 ? "model" : "models"}</p>
      <p><strong>{points} Points</strong></p>
      {regimentOptions.length > 0 && (
        <>
          <strong>Regiment Options:</strong>
          {regimentOptions.map((option, index) => <p key={`${index}-${option}`}>• {option}</p>)}
        </>
      )}
    </div>
  );
}

export default UnitDetails;
