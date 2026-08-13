function StepProgress({ steps, current, variant = "light" }) {
  const activeIndex = Math.max(0, Math.min(steps.length - 1, current - 1));

  return (
    <nav
      className={`aos-step-progress aos-step-progress--${variant}`}
      aria-label={`Progreso: paso ${activeIndex + 1} de ${steps.length}`}
      style={{ "--step-count": steps.length }}
    >
      <ol>
        {steps.map((step, index) => {
          const isComplete = index < activeIndex;
          const isCurrent = index === activeIndex;

          return (
            <li
              key={step}
              className={isCurrent ? "is-current" : isComplete ? "is-complete" : ""}
              aria-current={isCurrent ? "step" : undefined}
            >
              <span className="aos-step-progress__number" aria-hidden="true">
                {isComplete ? "✓" : index + 1}
              </span>
              <span className="aos-step-progress__label">{step}</span>
            </li>
          );
        })}
      </ol>
      <p>
        Paso {activeIndex + 1} de {steps.length}: <strong>{steps[activeIndex]}</strong>
      </p>
    </nav>
  );
}

export default StepProgress;
