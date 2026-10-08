function WelcomeScreen({ quote, onBegin }) {
  return (
    <section className="welcome-screen" aria-labelledby="morning-title">
      <div className="sunrise-glow sunrise-glow-left" />
      <div className="sunrise-glow sunrise-glow-right" />
      <div className="welcome-content">
        <p className="brand-mark">CHRONA</p>
        <p className="eyebrow">A calmer start is waiting</p>
        <h1 id="morning-title">Good Morning</h1>
        <figure className="quote-card">
          <blockquote>“{quote.text}”</blockquote>
          <figcaption>— {quote.author}</figcaption>
        </figure>
        <button className="primary-button" type="button" onClick={onBegin}>
          Plan your day
          <span aria-hidden="true">→</span>
        </button>
      </div>
      <p className="welcome-footer">One thoughtful plan for your time, meals, and outfit.</p>
    </section>
  )
}

export default WelcomeScreen
