const planningAreas = [
  {
    icon: '◷',
    title: 'Manage your schedule',
    description: 'Make time for what matters today.',
  },
  {
    icon: '◌',
    title: 'Plan your meals',
    description: 'Set out breakfast, lunch, and dinner.',
  },
  {
    icon: '✦',
    title: 'Plan your outfit',
    description: 'Bring your look together before you leave.',
  },
]

function PlanningHub({ mealCount, onChooseArea, onReturnHome, outfitCount, scheduleCount }) {
  return (
    <section className="planning-hub" aria-labelledby="plan-heading">
      <header className="hub-header">
        <button className="text-button" type="button" onClick={onReturnHome}>
          ← Morning greeting
        </button>
        <p className="brand-mark">CHRONA</p>
      </header>

      <div className="hub-intro">
        <p className="eyebrow">Your gentle daily reset</p>
        <h1 id="plan-heading">Kick start this day with a clear plan</h1>
        <p>Choose where to begin</p>
      </div>

      <div className="planning-grid">
        {planningAreas.map((area, index) => (
          <article className="planning-card" key={area.title}>
            <span className="planning-icon" aria-hidden="true">
              {area.icon}
            </span>
            <h2>{area.title}</h2>
            <p>{area.description}</p>
            {index === 0 ? (
              <button className="card-button" type="button" onClick={() => onChooseArea('schedule')}>
                {scheduleCount ? `${scheduleCount} plan${scheduleCount === 1 ? '' : 's'} set` : 'Start scheduling'}
                <span aria-hidden="true">→</span>
              </button>
            ) : index === 1 ? (
              <button className="card-button" type="button" onClick={() => onChooseArea('meals')}>
                {mealCount ? `${mealCount} meal${mealCount === 1 ? '' : 's'} set` : 'Plan my meals'}
                <span aria-hidden="true">→</span>
              </button>
            ) : (
              <button className="card-button" type="button" onClick={() => onChooseArea('outfit')}>
                {outfitCount ? `${outfitCount} piece${outfitCount === 1 ? '' : 's'} added` : 'Build my outfit'}
                <span aria-hidden="true">→</span>
              </button>
            )}
          </article>
        ))}
      </div>

      <aside className="hub-note">
        <span aria-hidden="true">✦</span>
        A good day does not need to be perfect. It just needs a thoughtful beginning.
      </aside>
    </section>
  )
}

export default PlanningHub
