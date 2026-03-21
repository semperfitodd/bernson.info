import { OPEN_SOURCE_PROJECTS } from '../constants'

export default function OpenSource() {
  return (
    <section id="opensource" className="section opensource" aria-labelledby="opensource-heading">
      <p className="section-label">Open Source</p>
      <h2 className="section-title" id="opensource-heading">Selected Projects</h2>
      <p className="section-body">
        GitHub is where I share experiments, working systems, and ideas in public across agentic AI, cloud infrastructure, MLOps, and full-stack applications.
      </p>
      <div className="opensource-grid">
        {OPEN_SOURCE_PROJECTS.map(({ name, description, topics, url }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="repo-card"
            aria-label={`View ${name} on GitHub`}
          >
            <span className="repo-name">{name}</span>
            <p className="repo-description">{description}</p>
            <div className="repo-topics">
              {topics.map((t) => (
                <span key={t} className="repo-topic">{t}</span>
              ))}
            </div>
          </a>
        ))}
      </div>
      <div className="opensource-footer">
        <a
          href="https://github.com/semperfitodd"
          target="_blank"
          rel="noopener noreferrer"
        >
          View all repositories on GitHub →
        </a>
      </div>
    </section>
  )
}
