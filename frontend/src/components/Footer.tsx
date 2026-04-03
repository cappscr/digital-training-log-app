import { Link } from 'react-router';

export const Footer = () => {
  return (
    <footer className="border-t-solid border-t-border border-t px-8 py-6">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-muted-foreground text-xs tracking-wider">
          <span>© 2026 digitaltraininglog.com</span>
          <span className="hidden sm:inline">&nbsp;·&nbsp;</span>
          <span className="block sm:inline">
            Built for athletes, by an athlete
          </span>
        </p>
        <nav aria-label="Footer navigation" className="flex items-center gap-5">
          <Link
            to="/about"
            className="text-muted-foreground hover:text-foreground text-xs tracking-wider transition-colors duration-200"
          >
            About
          </Link>
          <Link
            to="/pace-calculator"
            className="text-muted-foreground hover:text-foreground text-xs tracking-wider transition-colors duration-200"
          >
            Pace Calculator
          </Link>
          <Link
            to="/terms"
            className="text-muted-foreground hover:text-foreground text-xs tracking-wider transition-colors duration-200"
          >
            Terms of Use
          </Link>
        </nav>
      </div>
    </footer>
  );
};
