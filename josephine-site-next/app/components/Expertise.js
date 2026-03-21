import './Expertise.css'

const EXPERTISE_AREAS = [
  'Revenue growth & go-to-market strategy',
  'Enterprise sales leadership',
  'Market expansion & scaling',
  'Executive operating models',
  'Customer-centric growth strategy',
  'Organizational transformation',
  'Leadership development',
]

export default function Expertise() {
  return (
    <section id="expertise">
      <h2>Revenue Leadership & Go-to-Market Strategy</h2>
      <div className="content-container">
        <ul className="expertise-list">
          {EXPERTISE_AREAS.map((area) => (
            <li key={area}>{area}</li>
          ))}
        </ul>
        <p className="expertise-note">Built through years of real-world execution at scale.</p>
      </div>
    </section>
  )
}
