import React, { useState, useEffect } from 'react';
import { Menu, X, CalendarCheck } from 'lucide-react';
import { weddingConfig } from '../wedding.config';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'The Couple', href: 'couple' },
  { label: 'Portrait', href: 'gallery' },
  { label: 'Events', href: 'events' },
  { label: 'Venue & Map', href: 'venue' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      // Check if doors are still locked
      const isLocked = document.body.classList.contains('doors-locked');
      const scrolled = window.scrollY > 120;

      // Show navbar if scrolled or if doors have been opened
      if (!isLocked || scrolled) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Track active section for indicator
      const sectionIds = ['couple', 'gallery', 'events', 'rsvp', 'venue'];
      const scrollPos = window.scrollY + 200;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    const interval = setInterval(handleScroll, 400);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <nav className="border-b border-gold/30 bg-[#FBF8F3]/90 backdrop-blur-md shadow-sm transition-all">
        {/* Full-width container: left items at left end, right items at right end */}
        <div className="w-full px-4 sm:px-8 lg:px-12 py-3 flex items-center justify-between">
          
          {/* Couple Names / Logo on Far Left */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 sm:gap-3 text-left group shrink-0"
          >
            <span className="font-display text-lg sm:text-2xl text-maroon-dark tracking-wide group-hover:text-gold transition-colors font-medium">
              Sreeja &amp; Nikhil
            </span>
            <span className="hidden sm:inline-block text-[0.62rem] uppercase tracking-[0.25em] text-gold font-title font-semibold pl-2 border-l border-gold/40">
              22 . 11 . 2026
            </span>
          </button>

          {/* Desktop Navigation Links on Far Right */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 shrink-0">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => handleNavClick(item.href)}
                  className={`relative font-title text-[0.72rem] uppercase tracking-[0.22em] transition-all py-1 ${
                    isActive
                      ? 'text-gold font-bold'
                      : 'text-foreground/80 hover:text-gold font-medium'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-[2px] bg-gold rounded-full" />
                  )}
                </button>
              );
            })}

            {/* RSVP Gold Pill Button */}
            <button
              type="button"
              onClick={() => handleNavClick('rsvp')}
              className="inline-flex items-center gap-1.5 rounded-full border border-gold bg-gold px-4 py-1.5 text-xs font-title font-bold uppercase tracking-wider text-maroon-dark shadow-sm hover:bg-gold/90 transition-all hover:scale-105 active:scale-95"
            >
              <CalendarCheck className="size-3.5" />
              RSVP
            </button>
          </div>

          {/* Mobile Right Controls on Far Right */}
          <div className="flex md:hidden items-center gap-2 shrink-0">
            {/* Quick RSVP Button */}
            <button
              type="button"
              onClick={() => handleNavClick('rsvp')}
              className="inline-flex items-center gap-1 rounded-full border border-gold bg-gold px-3 py-1 text-[0.68rem] font-title font-bold uppercase tracking-wider text-maroon-dark shadow-sm"
            >
              RSVP
            </button>

            {/* Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
              className="p-1.5 rounded-md text-foreground hover:text-gold transition-colors focus:outline-none"
            >
              {isOpen ? <X className="size-6 text-gold" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Dropdown Menu Sheet ── */}
        {isOpen && (
          <div className="md:hidden border-t border-gold/25 bg-[#FAF6F0]/95 backdrop-blur-lg px-6 py-5 shadow-xl animate-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col space-y-3.5">
              {navItems.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => handleNavClick(item.href)}
                    className={`flex items-center justify-between py-2 text-left font-title text-xs uppercase tracking-[0.24em] transition-colors border-b border-gold/10 ${
                      isActive ? 'text-gold font-bold' : 'text-foreground/80 hover:text-gold'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="size-1.5 rounded-full bg-gold" />}
                  </button>
                );
              })}

              {/* RSVP in Mobile Menu */}
              <button
                type="button"
                onClick={() => handleNavClick('rsvp')}
                className="mt-2 w-full flex items-center justify-center gap-2 rounded-full border border-gold bg-gold py-2.5 text-xs font-title font-bold uppercase tracking-wider text-maroon-dark shadow"
              >
                <CalendarCheck className="size-4" />
                RSVP to Celebrate
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
