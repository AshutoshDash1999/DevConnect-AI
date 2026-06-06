import Link from "next/link";
import CodeReview from "../components/CodeReview";
import AnimatedStats from "../components/AnimatedStats";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div id="landing-page-view" suppressHydrationWarning>
      <div className="glow-blob glow-blob-1"></div>
      <div className="glow-blob glow-blob-2"></div>
      <div className="glow-blob glow-blob-3"></div>

      <Navbar variant="landing" />

      {/* ── Hero ── */}
      <header className="hero-brutalist">
        {/* Left Column (Mascot Developer) */}
        <div className="hero-col-left">
          <div className="mascot-container">
            <img src="/images/mascot_developer.png" className="mascot-img" alt="Developer Mascot" />
            <div className="badge-brutalist-green" style={{ position: 'absolute', top: '-15px', right: '-10px', transform: 'rotate(6deg)', zIndex: 5 }}>
              STATE: CODING
            </div>
          </div>
        </div>

        {/* Center Column (Text & CTAs) */}
        <div className="hero-col-center">
          <div className="badge-brutalist-green" style={{ marginBottom: '24px', background: '#00875A', color: 'white' }}>
            AI-POWERED DEV COMMUNITY
          </div>

          <div className="hero-title-container">
            <h1 className="hero-heading">
              READY<br />BUILD
            </h1>
            <span className="hero-script-overlay">to</span>
          </div>

          <p className="hero-subtext">
            A developer platform solving fragmented learning and real-time collaboration.
          </p>

          <div className="hero-actions-container">
            <Link href="/dashboard" className="btn-brutalist-primary">
              Launch Community Feed
            </Link>
            <a href="#features" className="btn-brutalist-secondary">
              Explore AI Showcase
            </a>
          </div>
        </div>

        {/* Right Column (Mascot AI Assistant) */}
        <div className="hero-col-right">
          <div className="mascot-container">
            <img src="/images/mascot_ai.png" className="mascot-img" alt="AI Mascot" />
            <div className="stamp-badge" style={{ top: '-25px', left: '-15px' }}>
              AI<br />Approved
            </div>
          </div>
        </div>
      </header>

      {/* ── Features ── */}
      <section className="section" id="features">
        <div className="section-title">
          <h2>AI Features <span>Showcase</span></h2>
          <p>
            DevConnect features custom LLM orchestration running locally in your
            workspace to automate tedious code tasks.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card feature-card-ai">
            <h3>Auto Code Reviewer</h3>
            <p>
              Scans snippets posted in conversations, verifying memory safety,
              performance leaks, and logic regressions automatically.
            </p>
          </div>

          <div className="feature-card">
            <h3>Intelligent Composer</h3>
            <p>
              Helps with formatting code blocks, picking hashtags, and polishing
              technical explanations.
            </p>
          </div>

          <div className="feature-card">
            <h3>Smart Query Classifier</h3>
            <p>
              Categorizes discussions and routes questions to relevant topic
              maintainers and collaborators.
            </p>
          </div>
        </div>
      </section>

      {/* ── AI Code Review Assistant ── */}
      <CodeReview />

      {/* ── Workflow ── */}
      <section className="section" id="workflow">
        <div className="section-title">
          <h2>How <span>DevConnect</span> Works</h2>
          <p>
            A step-by-step tour of building projects on our interactive
            collaboration timeline.
          </p>
        </div>

        <div className="workflow-container">
          <div className="workflow-step active">
            <div className="workflow-num">01</div>
            <div className="workflow-card">
              <h3>Compose Your Discussion</h3>
              <p>
                Draft coding questions, share logs, or start a repository
                collaboration using markdown, tags, and code blocks.
              </p>
            </div>
          </div>

          <div className="workflow-step">
            <div className="workflow-num">02</div>
            <div className="workflow-card">
              <h3>AI Copilot Evaluates</h3>
              <p>
                DevConnect AI suggests corrections, hashtags, and code-review
                improvements before you post.
              </p>
            </div>
          </div>

          <div className="workflow-step">
            <div className="workflow-num">03</div>
            <div className="workflow-card">
              <h3>Community Code Verification</h3>
              <p>
                Get responses from developers, resolve comments, and improve
                your projects faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="section" id="stats">
        <div className="section-title">
          <h2>Community <span>Statistics</span> Dashboard</h2>
          <p>Review dashboard data tracking community health and AI performance.</p>
        </div>

        <AnimatedStats />
      </section>

      {/* ── Waitlist ── */}
      <section className="waitlist-section" id="waitlist">
        <h3>Join the <span>DevConnect Waitlist</span></h3>
        <p>
          Be the first to know when registration opens for public access and
          early beta features.
        </p>
        <form className="waitlist-form">
          <input
            type="email"
            className="waitlist-input"
            placeholder="Enter your developer email..."
            required
          />
          <button type="submit" className="btn-brutalist-green">
            Get Early Access
          </button>
        </form>
      </section>

      {/* ── CTA ── */}
      <section className="cta">
        <h2>Ready to Accelerate Your Journey?</h2>
        <p>
          Join the next generation of developer workspaces powered by local code
          reviews.
        </p>
        <Link href="/dashboard" className="btn-brutalist-primary">
          Launch Community Feed
        </Link>
      </section>

      {/* ── Footer ── */}
      <footer>
        <p>© 2026 DevConnect AI • Built for Modern Engineering Teams</p>
      </footer>
    </div>
  );
}