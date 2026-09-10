import { Button } from '@/components/ui/button';
import { Eyebrow } from '@/components/Eyebrow';
import { Link } from 'react-router';

export const Hero = () => {
  return (
    <section className="mx-auto my-0 max-w-215 px-5 pt-12 pb-10 sm:px-8 sm:pt-20 sm:pb-16">
      <Eyebrow
        text="Your training journal, digitized"
        variant="emphasized"
        className="mb-6"
      />
      <h1 className="font-heading text-foreground mb-6 max-w-180 text-[clamp(2.5rem,6vw,4rem)] font-medium tracking-tight">
        Built for athletes who are serious about their training —{' '}
        <span className="text-primary">not their data.</span>
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
        <span className="text-muted-foreground text-sm tracking-wide">
          Free to use &nbsp;·&nbsp;No credit card
        </span>
      </div>
    </section>
  );
};
