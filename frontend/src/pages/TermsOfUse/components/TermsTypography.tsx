import { type ReactNode } from 'react';

export const TermsTypography = ({ children }: { children: ReactNode }) => {
  return <p className="text-ink mb-4 text-base last:mb-0">{children}</p>;
};
