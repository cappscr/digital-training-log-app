import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export const PrimaryNav = () => {
  return (
    <header>
      <nav className="flex items-center justify-between px-8 py-5 border-b border-border bg-cream sticky top-0 z-[100]">
        <Link
          to="/"
          className="font-display color-ink text-[1.1em] font-normal tracking-[0.01em]"
        >
          Digital<span className="text-accent">.</span>Training
          <span className="text-accent">.</span>Log
        </Link>
        <Button uppercase radius="xs" render={<Link to="/signup" />}>
          Start for free
        </Button>
      </nav>
    </header>
  );
};
