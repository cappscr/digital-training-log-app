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
      className="py-14 px-5 sm:py-20 sm:px-8 max-w-225 my-0 mx-auto border-b border-rule animate-fade-up [animation-delay:var(--animation-delay)]"
      style={{ '--animation-delay': animationDelay } as CSSProperties}
    >
      <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-4 sm:gap-12 items-start">
        <div className="pt-[0.35rem]">
          <span className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-muted block static sm:sticky top-[2rem]">
            {label}
          </span>
        </div>
        <div className="section-body">
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.25rem)] font-bold leading-[1.2] tracking-[-0.015em] mb-6">
            {heading}
          </h2>
          {children}
        </div>
      </div>
    </section>
  );
};
