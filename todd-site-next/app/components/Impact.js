import { IMPACT_STATS } from '../constants'

export default function Impact() {
  return (
    <div className="impact" role="region" aria-label="Career highlights">
      <div className="impact-inner">
        <p className="section-label">By the Numbers</p>
        <div className="impact-grid">
          {IMPACT_STATS.map(({ value, label }) => (
            <div key={label} className="impact-stat">
              <div className="impact-value">{value}</div>
              <div className="impact-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
