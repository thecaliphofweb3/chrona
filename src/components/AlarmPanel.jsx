function AlarmPanel({ plan, onDismiss }) {
  return (
    <div className="alarm-backdrop" role="presentation">
      <section aria-labelledby="alarm-heading" aria-modal="true" className="alarm-panel" role="dialog">
        <p className="eyebrow">It is time</p>
        <h2 id="alarm-heading">{plan.description}</h2>
        <p>Your {plan.time} plan is ready for you.</p>
        <button className="primary-button" type="button" onClick={onDismiss}>
          I’m on it <span aria-hidden="true">✓</span>
        </button>
      </section>
    </div>
  )
}

export default AlarmPanel
