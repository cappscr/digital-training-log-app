import { type ReactNode } from 'react';

export const TermsTypography = ({ children }: { children: ReactNode }) => {
  return (
    <p className="text=[0.97rem] text-body-text mb-4 last:mb-0">{children}</p>
  );
};
