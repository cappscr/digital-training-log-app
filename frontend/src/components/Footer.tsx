import { Link } from 'react-router';

export const Footer = () => {
  return (
    <footer className="py-6 px-8 border-t border-t-solid border-t-border">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-ink-faint tracking-wider">
          <span>© 2026 digitaltraininglog.com</span>
          <span className="hidden sm:inline">&nbsp;·&nbsp;</span>
          <span className="block sm:inline">
            Built for athletes, by an athlete
          </span>
        </p>
        <nav aria-label="Footer navigation" className="flex items-center gap-5">
          <Link
            to="/about"
            className="text-xs text-ink-faint tracking-wider hover:text-ink transition-colors duration-200"
          >
            About
          </Link>
          <Link
            to="/terms"
            className="text-xs text-ink-faint tracking-wider hover:text-ink transition-colors duration-200"
          >
            Terms of Use
          </Link>
        </nav>
      </div>
    </footer>
  );
};
