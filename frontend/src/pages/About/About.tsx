// src/pages/About.tsx
// Route: /about
// Add to your router: <Route path="/about" element={<About />} />

import { Link } from 'react-router';
import { Hero } from './components/Hero';
import { OriginSection } from './components/OriginSection';
import { PhilosophySection } from './components/PhilosophySection';
import { BuilderSection } from './components/BuilderSection';

export default function About() {
  return (
    <main className="bg-cream text-ink font-body text-[1rem] leading-[1.75] overflow-x-hidden">
      <Hero />
      <OriginSection />
      <PhilosophySection />
      <BuilderSection />

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="section cta-section">
        <div className="cta-inner">
          <h2>Get in touch or support the work</h2>
          <p>
            Have a question, found a bug, or just want to say something? I read
            every message. If you find Digital Training Log valuable and want to
            support its continued development, contributions are always welcome.
          </p>
          <div className="cta-buttons">
            <a
              href="mailto:hello@digitaltraininglog.com"
              className="btn btn-primary"
            >
              Send a message
            </a>
            {/* TODO: wire up contribution link (e.g. Ko-fi, GitHub Sponsors, etc.) */}
            <button
              className="btn btn-secondary"
              disabled
              aria-label="Contribution link coming soon"
            >
              Support the project
              <span className="coming-soon-badge">Soon</span>
            </button>
          </div>
          <div className="terms-note">
            By using Digital Training Log you agree to our{' '}
            <Link to="/terms" className="terms-link">
              Terms of Use
            </Link>
            .
          </div>
        </div>
      </section>
    </main>
  );
}
