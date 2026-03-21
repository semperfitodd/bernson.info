import { EXPERTISE_AREAS } from '../constants'

export default function Expertise() {
  return (
    <section id="expertise" className="section expertise" aria-labelledby="expertise-heading">
      <p className="section-label">Expertise</p>
      <h2 className="section-title" id="expertise-heading">
        Technology leadership grounded in<br />AI, cloud, and execution.
      </h2>
      <div className="expertise-grid">
        {EXPERTISE_AREAS.map(({ category, items }) => (
          <div key={category} className="expertise-card">
            <h3 className="expertise-category">{category}</h3>
            <ul className="expertise-items">
              {items.map((item) => (
                <li key={item} className="expertise-item">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
