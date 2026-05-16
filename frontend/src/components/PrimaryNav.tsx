import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ModeToggle';
import { Link, NavLink } from 'react-router';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Login', to: '/login' },
  { name: 'About', to: '/about' },
  { name: 'Pace Calculator', to: '/pace-calculator' },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors duration-200 ${
    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
  }`;

export const PrimaryNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-[100]">
      <nav className="border-border bg-background flex items-center justify-between border-b px-8 py-5">
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="font-display text-foreground hover:bg-muted p-2 text-lg font-normal tracking-wide antialiased"
        >
          Digital<span className="text-primary">.</span>Training
          <span className="text-primary">.</span>Log
        </Link>
        <div className="hidden items-center gap-6 sm:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              {link.name}
            </NavLink>
          ))}
          <ModeToggle />
          <Button
            uppercase
            disabled
            radius="xs"
            nativeButton={false}
            render={<Link to="/signup" />}
          >
            Coming soon
          </Button>
        </div>
        <button
          className="text-foreground flex h-8 w-8 cursor-pointer items-center justify-center border-none bg-transparent p-0 sm:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      <div
        className={`bg-background border-border grid border-b transition-all duration-300 ease-in-out sm:hidden ${
          menuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-6 px-8 py-6">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            <ModeToggle />
            <Button
              uppercase
              disabled
              radius="xs"
              nativeButton={false}
              render={<Link to="/signup" />}
            >
              Coming soon
            </Button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="bg-foreground/20 fixed inset-0 top-[73px] z-[-1] sm:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
};
