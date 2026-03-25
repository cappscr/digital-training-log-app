import { type ReactNode } from 'react';

export const SectionTypography = ({ children }: { children: ReactNode }) => {
  return (
    <p className="text-body-text mb-5 text-[1.025rem] last:mb-0">{children}</p>
  );
};
