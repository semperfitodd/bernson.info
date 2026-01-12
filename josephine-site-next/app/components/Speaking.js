import './Speaking.css'

const TOPICS = [
  'Leading revenue teams through change',
  'Scaling growth without losing culture',
  'Executive decision-making in complex markets'
]

export default function Speaking() {
  return (
    <section id="speaking">
      <h2>Speaking & Advisory</h2>
      <div className="content-container speaking-content">
        <p>
          Josephine regularly engages with leadership teams, executive forums, and industry groups to share practical insights on growth, leadership, and execution.
        </p>
        <h3>Topics</h3>
        <ul className="topics-list">
          {TOPICS.map((topic, index) => (
            <li key={index}>{topic}</li>
          ))}
        </ul>
        <a
          href="#contact"
          className="button button-primary"
          aria-label="Speaking and Advisory Inquiries"
        >
          Speaking & Advisory Inquiries
        </a>
      </div>
    </section>
  )
}
