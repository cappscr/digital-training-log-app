import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export const Hero = () => {
  return (
    <section className="max-w-215 mx-auto my-0 pt-12 px-5 pb-10 sm:pt-20 sm:px-8 sm:pb-16">
      <span className="text-xs font-medium tracking-[0.18em] uppercase text-accent mb-6 block">
        Your training journal, digitized
      </span>
      <h1 className="font-display font-normal text-[clamp(2.5rem,6vw,4rem)] leading-[1.15] text-ink mb-6 max-w-180">
        Built for athletes who are serious about their training —{' '}
        <em className="text-accent italic">not their data.</em>
      </h1>
      <p className="font-light max-w-135 text-[1.05rem] text-ink-muted leading-[1.7] mb-10">
        A flexible, private space to plan your sessions, record your workouts,
        and track your volume over time. No algorithms. No social feed. No GPS
        required.
      </p>
      <div className="flex items-center gap-6 flex-wrap">
        <Button
          size="xl"
          radius="none"
          uppercase
          disabled
          render={<Link to="/signup" />}
        >
          Coming soon
        </Button>
        <span className="text-[0.8rem] text-ink-faint tracking-[0.02em]">
          Free to use &nbsp;·&nbsp;No credit card
        </span>
      </div>
    </section>
  );
};
