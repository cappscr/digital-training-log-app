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
      <h2 className="font-display text-xl font-bold mb-4 text-ink">{title}</h2>
      {children}
    </section>
  );
};
