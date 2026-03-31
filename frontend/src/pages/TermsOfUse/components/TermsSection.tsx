import { type ReactNode } from 'react';

export const TermsSection = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <section className="border-border border-b px-0 py-8 last:border-b-0 sm:py-11">
      <h2 className="font-display text-foreground mb-4 text-xl font-bold">
        {title}
      </h2>
      {children}
    </section>
  );
};
