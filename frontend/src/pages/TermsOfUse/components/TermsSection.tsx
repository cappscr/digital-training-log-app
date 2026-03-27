import { type ReactNode } from 'react';

export const TermsSection = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <section className="py-8 sm:py-11 px-0 border-b border-rule last:border-b-0">
      <h2 className="font-display text-[1.2rem] font-bold tracking-[-0.01em] mb-4 text-ink">
        {title}
      </h2>
      {children}
    </section>
  );
};
