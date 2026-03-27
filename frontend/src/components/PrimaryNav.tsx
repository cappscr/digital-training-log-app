import { Button } from '@/components/ui/button';
import { Link, NavLink } from 'react-router';

export const PrimaryNav = () => {
  return (
    <header>
      <nav className="flex items-center justify-between px-8 py-5 border-b border-border bg-cream sticky top-0 z-[100]">
        <Link
          to="/"
          className="font-display color-ink text-[1.1em] font-normal tracking-[0.01em] antialiased"
        >
          Digital<span className="text-accent">.</span>Training
          <span className="text-accent">.</span>Log
        </Link>
        <div className="flex items-center gap-6">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors duration-200 ${
                isActive ? 'text-ink' : 'text-muted hover:text-ink'
              }`
            }
          >
            About
          </NavLink>
          <Button uppercase disabled radius="xs" render={<Link to="/signup" />}>
            Coming soon
          </Button>
        </div>
      </nav>
    </header>
  );
};
