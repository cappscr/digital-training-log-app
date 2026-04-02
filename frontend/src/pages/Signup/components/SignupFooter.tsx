import { type ReactNode } from 'react';
import { Link } from 'react-router';

const FooterTypography = ({ children }: { children: ReactNode }) => (
  <p className="text-muted-foreground text-sm leading-relaxed font-light">
    {children}
  </p>
);

const FooterLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link
    to={to}
    className="text-foreground text-decoration-border hover:text-primary hover:text-decoration-primary underline underline-offset-2"
  >
    {children}
  </Link>
);

export const SignupFooter = () => {
  return (
    <footer className="border-border mt-8 flex flex-col gap-3 border-t border-solid pt-6">
      <FooterTypography>
        Already have an account? <FooterLink to="/login">Sign in</FooterLink>
      </FooterTypography>
      <FooterTypography>
        By creating an account you agree to our{' '}
        <FooterLink to="/terms">terms of service</FooterLink>. Your training
        data is private by default.
      </FooterTypography>
    </footer>
  );
};
