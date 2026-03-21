import { SPEAKING_TALKS } from '../constants'

export default function Speaking() {
  return (
    <section id="speaking" className="section speaking" aria-labelledby="speaking-heading">
      <p className="section-label">Speaking</p>
      <h2 className="section-title" id="speaking-heading">AWS Summits</h2>
      <p className="section-body">
        I speak at AWS Summits about AI, infrastructure modernization, and MLOps, usually through the lens of lessons learned building real systems.
      </p>
      <ol className="speaking-list" aria-label="Conference talks">
        {SPEAKING_TALKS.map(({ event, title }) => (
          <li key={title} className="speaking-item">
            <span className="speaking-event">{event}</span>
            <span className="speaking-title">{title}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
