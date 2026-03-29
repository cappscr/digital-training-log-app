import { type ReactNode, type CSSProperties } from 'react';

export const SectionWrapper = ({
  children,
  label,
  heading,
  animationDelay = '0.1s',
}: {
  children: ReactNode;
  animationDelay?: string;
  label: string;
  heading: string;
}) => {
  return (
    <section
      className="border-border animate-fade-up mx-auto my-0 max-w-225 border-b px-5 py-14 [animation-delay:var(--animation-delay)] sm:px-8 sm:py-20"
      style={{ '--animation-delay': animationDelay } as CSSProperties}
    >
      <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-[160px_1fr] sm:gap-12">
        <div className="pt-1">
          <span className="text-muted-foreground static top-[2rem] block text-xs font-semibold tracking-widest uppercase sm:sticky">
            {label}
          </span>
        </div>
        <div className="section-body">
          <h2 className="font-display mb-6 text-[clamp(1.6rem,3vw,2.25rem)] leading-tight font-bold tracking-tight">
            {heading}
          </h2>
          {children}
        </div>
      </div>
    </section>
  );
};
