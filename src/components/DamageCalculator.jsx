import { useMemo, useState } from "react";

import {
  calculateExpectedDamage,
  getWeaponCritType,
  parseThreshold,
} from "../utils/damageCalculator";

const SAVES = [2, 3, 4, 5, 6];
const WARDS = [3, 4, 5, 6];
const CRITICALS = [
  ["none", "Sin crítico"],
  ["2-hits", "Crít. (2 impactos)"],
  ["auto-wound", "Crít. (Auto-herida)"],
  ["mortal", "Crít. (Mortal)"],
];

function DamageCalculator({ unit, models = 1, onClose }) {
  const [profiles, setProfiles] = useState(() => createProfiles(unit, models));
  const [ward, setWard] = useState(null);
  const [ethereal, setEthereal] = useState(false);

  const results = useMemo(
    () => SAVES.map((save) => {
      const weapons = profiles.map((profile) =>
        calculateExpectedDamage({ ...profile, save, ward, ethereal })
      );

      return {
        save,
        weapons,
        total: weapons.reduce((sum, value) => sum + value, 0),
      };
    }),
    [ethereal, profiles, ward]
  );

  function updateProfile(index, property, value) {
    setProfiles((current) => current.map((profile, profileIndex) =>
      profileIndex === index ? { ...profile, [property]: value } : profile
    ));
  }

  function resetProfiles() {
    setProfiles(createProfiles(unit, models));
    setWard(null);
    setEthereal(false);
  }

  return (
    <section className="aos-damage-calculator" aria-labelledby="damage-calculator-title">
      <header className="aos-damage-calculator__header">
        <div>
          <span>Promedio estadístico</span>
          <h2 id="damage-calculator-title">Calculadora de daño</h2>
          <p>Perfiles precargados desde el warscroll de {unit.name}.</p>
        </div>

        <button type="button" onClick={onClose} aria-label="Cerrar calculadora">
          ×
        </button>
      </header>

      <div className="aos-damage-calculator__targets">
        <fieldset>
          <legend>Ward del objetivo</legend>
          <div className="aos-damage-calculator__choice-row">
            <button
              type="button"
              className={ward === null ? "is-active" : ""}
              onClick={() => setWard(null)}
            >
              Sin ward
            </button>
            {WARDS.map((value) => (
              <button
                key={value}
                type="button"
                className={ward === value ? "is-active" : ""}
                onClick={() => setWard(value)}
              >
                {value}+
              </button>
            ))}
          </div>
        </fieldset>

        <label className="aos-damage-calculator__ethereal">
          <input
            type="checkbox"
            checked={ethereal}
            onChange={(event) => setEthereal(event.target.checked)}
          />
          <span>
            <strong>Etéreo</strong>
            Ignora el Rend al calcular la salvación.
          </span>
        </label>
      </div>

      <div className="aos-damage-calculator__results" aria-label="Daño medio por salvación">
        <header>
          <span>Salvación objetivo</span>
          <strong>Daño medio</strong>
        </header>
        <div className="aos-damage-calculator__result-list">
          {results.map((row) => (
            <article key={row.save} className="aos-damage-calculator__result-row">
              <div className="aos-damage-calculator__save">
                <small>Salv.</small>
                <strong>{row.save}+</strong>
              </div>
              <ul>
                {row.weapons.map((value, index) => (
                  <li key={`${row.save}-${profiles[index].name}-${index}`}>
                    <span>{profiles[index].name}</span>
                    <b>{value.toFixed(2)}</b>
                  </li>
                ))}
              </ul>
              <div className="aos-damage-calculator__total">
                <small>Total</small>
                <strong>{row.total.toFixed(2)}</strong>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="aos-damage-calculator__profiles">
        {profiles.map((profile, index) => (
          <WeaponCalculatorProfile
            key={`${profile.name}-${index}`}
            profile={profile}
            initiallyOpen={index === 0}
            onChange={(property, value) => updateProfile(index, property, value)}
          />
        ))}
      </div>

      <button
        type="button"
        className="aos-damage-calculator__reset"
        onClick={resetProfiles}
      >
        Restaurar perfil del warscroll
      </button>
    </section>
  );
}

function WeaponCalculatorProfile({ profile, initiallyOpen, onChange }) {
  const [open, setOpen] = useState(initiallyOpen);

  return (
    <section className={`aos-damage-profile${open ? " is-open" : ""}`}>
      <button
        type="button"
        className="aos-damage-profile__trigger"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span>
          <strong>{profile.name}</strong>
          <small>{profile.type === "Ranged" ? "A distancia" : "Combate"}</small>
        </span>
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="aos-damage-profile__content">
          <div className="aos-damage-profile__fields">
            <CalculatorField label="Miniaturas">
              <input
                type="number"
                min="0"
                value={profile.models}
                onChange={(event) => onChange("models", event.target.value)}
              />
            </CalculatorField>
            <CalculatorField label="Ataques">
              <input
                type="text"
                inputMode="text"
                value={profile.attacks}
                onChange={(event) => onChange("attacks", event.target.value)}
              />
            </CalculatorField>
            <CalculatorField label="Impactar">
              <ThresholdSelect
                value={profile.hit}
                onChange={(value) => onChange("hit", value)}
              />
            </CalculatorField>
            <CalculatorField label="Herir">
              <ThresholdSelect
                value={profile.wound}
                onChange={(value) => onChange("wound", value)}
              />
            </CalculatorField>
            <CalculatorField label="Rend">
              <input
                type="number"
                min="0"
                max="10"
                value={profile.rend}
                onChange={(event) => onChange("rend", event.target.value)}
              />
            </CalculatorField>
            <CalculatorField label="Daño">
              <input
                type="text"
                inputMode="text"
                value={profile.damage}
                onChange={(event) => onChange("damage", event.target.value)}
              />
            </CalculatorField>
          </div>

          <label className="aos-damage-profile__champion">
            <input
              type="checkbox"
              checked={profile.champion}
              onChange={(event) => onChange("champion", event.target.checked)}
            />
            Campeón (+1 ataque total)
          </label>

          <fieldset className="aos-damage-profile__criticals">
            <legend>Efecto crítico</legend>
            <div className="aos-damage-calculator__choice-row">
              {CRITICALS.map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className={profile.critType === value ? "is-active" : ""}
                  onClick={() => onChange("critType", value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          {profile.critType !== "none" && (
            <CalculatorField label="Crítico con">
              <select
                value={profile.critThreshold}
                onChange={(event) => onChange("critThreshold", Number(event.target.value))}
              >
                {[4, 5, 6].map((value) => (
                  <option value={value} key={value}>{value}+</option>
                ))}
              </select>
            </CalculatorField>
          )}
        </div>
      )}
    </section>
  );
}

function CalculatorField({ label, children }) {
  return (
    <label className="aos-damage-profile__field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function ThresholdSelect({ value, onChange }) {
  return (
    <select value={parseThreshold(value)} onChange={(event) => onChange(Number(event.target.value))}>
      {[2, 3, 4, 5, 6].map((threshold) => (
        <option value={threshold} key={threshold}>{threshold}+</option>
      ))}
    </select>
  );
}

function createProfiles(unit, models) {
  return (unit?.weapons ?? []).map((weapon) => ({
    name: `${weapon.name} · ${weapon.type === "Ranged" ? "Distancia" : "Combate"}`,
    type: weapon.type ?? "Melee",
    models,
    attacks: weapon.attacks ?? 0,
    champion: false,
    hit: parseThreshold(weapon.hit),
    wound: parseThreshold(weapon.wound),
    rend: Math.max(0, Number(weapon.rend) || 0),
    damage: weapon.damage ?? 0,
    critType: getWeaponCritType(weapon),
    critThreshold: 6,
  }));
}

export default DamageCalculator;
