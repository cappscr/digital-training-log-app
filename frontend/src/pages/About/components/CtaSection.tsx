import { type CSSProperties } from 'react';
import { Button } from '@/components/ui/button';
import { ComingSoonBadge } from '@/components/ComingSoonBadge';
import { Link } from 'react-router';

export const CtaSection = () => {
  return (
    <section
      className="animate-fade-up mx-auto my-0 max-w-225 px-5 pt-14 pb-32 [animation-delay:var(--animation-delay)] sm:px-8 sm:pt-20"
      style={{ '--animation-delay': '0.35s' } as CSSProperties}
    >
      <div className="bg-emphasis text-primary-foreground rounded-sm px-6 py-9 sm:p-12">
        <h2 className="font-display text-emphasis-heading mb-4 text-[clamp(1.5rem,3vw,2rem)] leading-tight font-bold tracking-tight">
          Get in touch or support the work
        </h2>
        <p className="text-muted-foreground mb-9 max-w-135 text-base/[1.7]">
          Have a question, found a bug, or just want to say something? I read
          every message. If you find Digital Training Log valuable and want to
          support its continued development, contributions are always welcome.
        </p>
        <div className="flex flex-col flex-wrap items-center items-stretch gap-4 sm:flex-row">
          <Button
            radius="xs"
            size="xl"
            nativeButton={false}
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
          <Button
            variant="ghost"
            disabled
            size="xl"
            radius="xs"
            className="border-border-emphasis text-muted-foreground gap-2 border border-solid data-[disabled]:opacity-100"
            aria-label="Contribution link coming soon"
          >
            Support the project
            <ComingSoonBadge />
          </Button>
        </div>
        <div className="border-border-emphasis text-muted-foreground mt-8 border-t pt-8 text-sm">
          By using Digital Training Log you agree to our{' '}
          <Link
            to="/terms"
            className="text-accent hover:text-muted whitespace-nowrap underline underline-offset-2"
          >
            Terms of Use
          </Link>
          .
        </div>
      </div>
    </section>
  );
};
