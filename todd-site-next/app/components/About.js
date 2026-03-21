export default function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-heading">
      <div className="about-grid">
        <div className="about-text">
          <p className="section-label">About</p>
          <h2 className="section-title" id="about-heading">
            Chief AI Officer.<br />Builder mindset.
          </h2>
          <p>
            I&apos;m most energized when I&apos;m building at the edge of <strong>AI, cloud, and infrastructure</strong>, but my work has never just been about the technology. It&apos;s about creating real business impact, setting direction, and helping teams execute with clarity and confidence.
          </p>
          <p>
            I&apos;m an <strong>AWS Ambassador</strong> and three-time award winner, including Top Global Ambassador in 2023 and #1 in North America in both 2022 and 2024. I hold all 12 AWS certifications alongside credentials across Azure, Kubernetes, and GCP, totaling 30+.
          </p>
          <p>
            I love building teams just as much as I love building systems. I write and share openly about agentic AI, MLOps, cloud architecture, and the systems behind reliable software. I&apos;ve spoken at <strong>AWS Summits</strong> on topics ranging from mainframe modernization to real-time AI inference, and I maintain 50+ open source repositories on GitHub.
          </p>
          <p>
            Before tech, I served in the <strong>United States Marine Corps</strong>, earning two meritorious promotions. That discipline, ownership mindset, and bias for action still shape how I build, lead, and show up.
          </p>
        </div>
        <div className="about-sidebar">
          <div className="about-card highlight">
            <span className="about-card-label">Current Focus</span>
            <span className="about-card-value">Business impact through technology</span>
            <span className="about-card-sub">Building systems, teams, and momentum · Charlotte, NC</span>
          </div>
          <div className="about-card highlight">
            <span className="about-card-label">AWS Ambassador Awards</span>
            <span className="about-card-value">#1 North America 2022 &amp; 2024</span>
            <span className="about-card-sub">Top Global Ambassador 2023</span>
          </div>
          <div className="about-card">
            <span className="about-card-label">Certifications</span>
            <span className="about-card-value">30+ Cloud Certifications</span>
            <span className="about-card-sub">AWS (all 12) · Azure · Kubernetes · GCP</span>
          </div>
          <div className="about-card">
            <span className="about-card-label">Education</span>
            <span className="about-card-value">MBA · Winthrop University</span>
            <span className="about-card-sub">Bachelor of Science</span>
          </div>
          <div className="about-card">
            <span className="about-card-label">Military Service</span>
            <span className="about-card-value">US Marine Corps</span>
            <span className="about-card-sub">Two meritorious promotions · Red Cross Hero Award</span>
          </div>
        </div>
      </div>
    </section>
  )
}
