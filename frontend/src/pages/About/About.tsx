// src/pages/About.tsx
// Route: /about
// Add to your router: <Route path="/about" element={<About />} />

import { Link } from 'react-router';
import { Hero } from './components/Hero';
import { OriginSection } from './components/OriginSection';

export default function About() {
  return (
    <main className="bg-background text-ink font-body text-[1rem] leading-[1.75] overflow-x-hidden">
      <Hero />
      <OriginSection />

      {/* ── Philosophy ───────────────────────────────────────────── */}
      <section className="section philosophy">
        <div className="section-inner">
          <div className="section-label">
            <span>Philosophy</span>
          </div>
          <div className="section-body">
            <h2>What it is — and what it isn't</h2>
            <p>
              Digital Training Log is a place to plan training, record what you
              actually did, and look back at the work over time. That's the
              whole idea.
            </p>

            <div className="principles">
              <div className="principle">
                <h3>Not a coaching platform</h3>
                <p>
                  The app calculates volume and surfaces trends. It does not
                  tell you what to do with them. Coaching is a human
                  relationship. This is a log.
                </p>
              </div>
              <div className="principle">
                <h3>Not a social network</h3>
                <p>
                  Training is private by default. There are no feeds, no
                  followers, no public profiles. You can share your log with a
                  coach if you choose — that's a deliberate act, not a default.
                </p>
              </div>
              <div className="principle">
                <h3>Not hardware-dependent</h3>
                <p>
                  No GPS trace imports, no watch integrations, no device
                  requirements. You can log a run from a dumbphone and a
                  stopwatch. The app works the same either way.
                </p>
              </div>
              <div className="principle">
                <h3>Not algorithmic</h3>
                <p>
                  Fitness is measurable. Training adaptation is not. Anyone who
                  has studied exercise physiology knows how much individual
                  variation hides beneath aggregate metrics. The app surfaces
                  numbers — it doesn't interpret them for you. That's a feature,
                  not a limitation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Builder ──────────────────────────────────────────────── */}
      <section className="section builder">
        <div className="section-inner">
          <div className="section-label">
            <span>The Builder</span>
          </div>
          <div className="section-body">
            <h2>Built by Christopher Capps</h2>
            <p>
              I'm a professional software developer. Digital Training Log is not
              a registered business and I have no plans to make it one. This
              project exists at the intersection of two things I care about:
              building good software and training seriously.
            </p>
            <p>
              My background is in Exercise Science — I hold a BS and MS in the
              field, and spent time as a graduate assistant with the Appalachian
              State University distance program. I've run cross country and
              track since high school, briefly as a walk-on at UNC Charlotte,
              and have since toed the line at Boston three times along with two
              other World Marathon Majors. Chicago is on the calendar for fall
              2026. I know this domain from both sides of the research.
            </p>
            <p>
              In many ways, this app is also a laboratory. I use it to
              experiment with technologies, architectures, and design patterns
              that interest me professionally — within a domain where I actually
              care about the outcome. The fact that it's useful is the point;
              the fact that it's mine makes the experimentation feel real.
            </p>
            <p>
              If you're an athlete or a coach who finds it useful, I'm genuinely
              glad. If you find something broken or missing, I want to know.
              This is not a side project I'm trying to monetize — it's a tool I
              use, maintained by someone who wants it to be good.
            </p>
            <a
              href="https://christophercapps.com"
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-link"
            >
              christophercapps.com
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
        </div>
      </section>

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
