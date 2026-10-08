function CompletionPanel({ onReviewPlan }) {
  return (
    <section className="completion-panel" aria-labelledby="complete-heading">
      <span className="completion-spark" aria-hidden="true">✦</span>
      <p className="eyebrow">Your morning is ready</p>
      <h2 id="complete-heading">PERFECT</h2>
      <p>Hope your day goes as planned.</p>
      <button className="completion-link" type="button" onClick={onReviewPlan}>
        Review my plan <span aria-hidden="true">→</span>
      </button>
    </section>
  )
}

export default CompletionPanel
