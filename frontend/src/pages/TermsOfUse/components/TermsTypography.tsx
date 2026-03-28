import { type ReactNode } from 'react';

export const TermsTypography = ({ children }: { children: ReactNode }) => {
  return <p className="text-base text-foreground mb-4 last:mb-0">{children}</p>;
};
