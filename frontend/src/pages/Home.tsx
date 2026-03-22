import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export const HomePage = () => {
  return (
    <>
      <nav className="flex items-center justify-between px-8 py-5 border-b border-border bg-cream sticky top-0 z-[100]">
        <Link
          to="/"
          className="font-display color-ink text-[1.1em] font-normal tracking-[0.01em]"
        >
          Digital<span className="text-accent">.</span>Training
          <span className="text-accent">.</span>Log
        </Link>
        <Button uppercase radius="xs" render={<Link to="/signup" />}>
          Start for free
        </Button>
      </nav>

      <main className="bg-cream min-h-screen color-ink font-body leading-[1.6] antialiased">
        <section className="max-w-215 mx-auto my-0 pt-20 px-8 pb-16">
          <span className="text-xs font-medium tracking-[0.18em] uppercase text-accent mb-6 block">
            Your training journal, digitized
          </span>
          <h1 className="font-display font-normal text-[clamp(2.5rem,6vw,4rem)] leading-[1.15] text-ink mb-6 max-w-180">
            Built for athletes who are serious about their training —{' '}
            <em className="text-accent italic">not their data.</em>
          </h1>
          <p className="font-light max-w-135 text-[1.05rem] text-ink-muted leading-[1.7] mb-10">
            A flexible, private space to plan your sessions, record your
            workouts, and track volume over time. No algorithms. No social feed.
            No GPS required.
          </p>
          <div className="flex items-center gap-6 flex-nowrap">
            <Button
              size="xl"
              radius="none"
              uppercase
              render={<Link to="/signup" />}
            >
              Create your free account
            </Button>
            <span className="text-[0.8rem] text-ink-faint tracking-[0.02em]">
              Free to use &nbsp;·&nbsp;No credit card
            </span>
          </div>
        </section>

        <div className="border-y py-6 px-8 flex items-center justify-center gap-4 bg-background">
          <span className="font-display font-medium text-ink tracking-[0.08em]">
            Plan
          </span>
          <span className="bg-accent w-1 h-1 rounded-[50%] shrink-0"></span>
          <span className="font-display font-medium text-ink tracking-[0.08em]">
            Train
          </span>
          <span className="bg-accent w-1 h-1 rounded-[50%] shrink-0"></span>
          <span className="font-display font-medium text-ink tracking-[0.08em]">
            Log
          </span>
          <span className="bg-accent w-1 h-1 rounded-[50%] shrink-0"></span>
          <span className="font-display font-medium text-accent tracking-[0.08em]">
            All in one place.
          </span>
        </div>
      </main>
    </>
  );
};
