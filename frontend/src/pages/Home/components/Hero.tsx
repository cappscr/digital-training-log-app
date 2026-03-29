import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export const Hero = () => {
  return (
    <section className="mx-auto my-0 max-w-215 px-5 pt-12 pb-10 sm:px-8 sm:pt-20 sm:pb-16">
      <span className="text-primary mb-6 block text-xs font-medium tracking-[0.18em] uppercase">
        Your training journal, digitized
      </span>
      <h1 className="font-display text-ink mb-6 max-w-180 text-[clamp(2.5rem,6vw,4rem)] leading-tight font-normal">
        Built for athletes who are serious about their training —{' '}
        <em className="text-primary italic">not their data.</em>
      </h1>
      <p className="text-muted-foreground mb-10 max-w-135 text-base/[1.7] font-light">
        A flexible, private space to plan your sessions, record your workouts,
        and track your volume over time. No algorithms. No social feed. No GPS
        required.
      </p>
      <div className="flex flex-wrap items-center gap-6">
        <Button
          size="xl"
          radius="none"
          uppercase
          disabled
          nativeButton={false}
          render={<Link to="/signup" />}
        >
          Coming soon
        </Button>
        <span className="text-ink-faint text-sm tracking-wide">
          Free to use &nbsp;·&nbsp;No credit card
        </span>
      </div>
    </section>
  );
};
