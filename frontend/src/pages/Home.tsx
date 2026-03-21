import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export const HomePage = () => {
  return (
    <body className="bg-cream min-h-screen color-ink font-body leading-[1.6]">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-border bg-cream sticky top-0 z-[100]">
        <Link
          to="/"
          className="font-display color-ink text-[1.1em] font-normal tracking-[0.01em]"
        >
          Digital<span className="color-accent">.</span>Training
          <span className="color-accent">.</span>Log
        </Link>
        <Button size="lg" render={<Link to="/signup" />}>
          Start for free
        </Button>
      </nav>
    </body>
  );
};
