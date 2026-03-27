import { type ReactNode } from 'react';
import { SectionWrapper } from './SectionWrapper';
import { SectionTypography } from './SectionTypography';

const Principle = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="border-t-2 border-accent pt-5">
      <h3 className="font-display text-[1.05rem] font-bold tracking-[-0.01em] mb-[0.6rem]">
        {title}
      </h3>
      <p className="text-[0.94rem] leading-[1.65] text-muted mb-0">
        {children}
      </p>
    </div>
  );
};

export const PhilosophySection = () => {
  return (
    <SectionWrapper
      animationDelay="0.2s"
      label="Philosophy"
      heading="What it is — and what it isn't"
    >
      <SectionTypography>
        Digital Training Log is a place to plan training, record what you
        actually did, and look back at the work over time. That's the whole
        idea.
      </SectionTypography>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-y-10 sm:gap-x-10 mt-10">
        <Principle title="Not a coaching platform">
          The app calculates volume and surfaces trends. It does not tell you
          what to do with them. Coaching is a human relationship. This is a
        </Principle>
        <Principle title="Not a social network">
          Training is private by default. There are no feeds, no followers, no
          public profiles. You can share your log with a coach if you choose —
          that's a deliberate act, not a default.
        </Principle>
        <Principle title="Not hardware-dependent">
          No GPS trace imports, no watch integrations, no device requirements.
          You can log a run from a dumbphone and a stopwatch. The app works the
          same either way.
        </Principle>
        <Principle title="Not algorithmic">
          Fitness is measurable. Training adaptation is not. Anyone who has
          studied exercise physiology knows how much individual variation hides
          beneath aggregate metrics. The app surfaces numbers — it doesn't
          interpret them for you. That's a feature, not a limitation.
        </Principle>
      </div>
    </SectionWrapper>
  );
};
