import { type CSSProperties } from 'react';
import { Button } from '@/components/ui/button';

export const CtaSection = () => {
  return (
    <section
      className="pt-14 px-5 pb-32 sm:pt-20 sm:px-8 max-w-225 my-0 mx-auto animate-fade-up [animation-delay:var(--animation-delay)]"
      style={{ '--animation-delay': '0.35s' } as CSSProperties}
    >
      <div className="py-9 px-6 sm:p-12 bg-ink text-cream rounded-sm">
        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.015em] leading-[1.2] mb-4 text-cream">
          Get in touch or support the work
        </h2>
        <p className="text-[1rem] leading-[1.7] text-[oklch(0.72_0.01_84.59)] max-w-135 mb-9">
          Have a question, found a bug, or just want to say something? I read
          every message. If you find Digital Training Log valuable and want to
          support its continued development, contributions are always welcome.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch items-center gap-4">
          <Button
            variant="accent"
            radius="xs"
            size="xl"
            render={
              <a
                href="mailto:capps.christopher@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            Send a message
          </Button>
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
          <a href="/terms" className="terms-link">
            Terms of Use
          </a>
          .
        </div>
      </div>
    </section>
  );
};
