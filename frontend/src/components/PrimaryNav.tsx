import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link, NavLink } from 'react-router';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [{ name: 'About', to: '/about' }];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors duration-200 ${
    isActive ? 'text-ink' : 'text-muted hover:text-ink'
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
      <nav className="flex items-center justify-between px-8 py-5 border-b border-border bg-cream">
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="font-display color-ink text-lg font-normal tracking-wide antialiased"
        >
          Digital<span className="text-accent">.</span>Training
          <span className="text-accent">.</span>Log
        </Link>
        <div className="hidden sm:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              {link.name}
            </NavLink>
          ))}
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
          className="sm:hidden flex items-center justify-center w-8 h-8 cursor-pointer bg-transparent border-none p-0 text-ink"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      <div
        className={`sm:hidden grid transition-all duration-300 ease-in-out bg-cream border-b border-border ${
          menuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col px-8 py-6 gap-6">
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
          className="sm:hidden fixed inset-0 top-[73px] bg-ink/20 z-[-1]"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
};
