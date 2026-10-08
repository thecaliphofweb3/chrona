import { getDailyWellnessTip } from '../data/wellnessTips.js'

function WellnessTip() {
  const tip = getDailyWellnessTip(new Date())

  return (
    <aside className="wellness-tip">
      <div className="wellness-icon" aria-hidden="true">✦</div>
      <div>
        <p className="eyebrow">A gentle daily note</p>
        <p>{tip.text}</p>
        <a href={tip.sourceUrl} rel="noreferrer" target="_blank">
          Source: {tip.sourceLabel} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </aside>
  )
}

export default WellnessTip
