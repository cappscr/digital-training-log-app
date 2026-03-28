import { type ReactNode } from 'react';

export const SectionTypography = ({ children }: { children: ReactNode }) => {
  return <p className="text-foreground mb-5 text-base last:mb-0">{children}</p>;
};
