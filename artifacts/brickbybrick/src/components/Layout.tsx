import React from 'react';
import { Link, useLocation } from 'wouter';
import { MessageCircle, Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const WHATSAPP_URL = "https://wa.me/27000000000?text=Hi,%20I'd%20like%20a%20free%20quote";

  const links = [
    { href: '/', label: 'HOME' },
    { href: '/our-work', label: 'OUR WORK' },
    { href: '/contact', label: 'CONTACT' },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col font-sans">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full bg-brand-black/95 backdrop-blur-md border-b-4 border-brand-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-display text-3xl font-bold tracking-widest text-white uppercase flex items-center gap-2">
              <span className="text-brand-orange">BRICK</span>BY<span className="text-brand-orange">BRICK</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display text-lg tracking-wider font-semibold transition-colors hover:text-brand-orange ${
                  location === link.href ? 'text-brand-orange' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:+27000000000"
              className="flex items-center gap-2 bg-transparent border-2 border-white text-white px-4 py-2 hover:bg-white hover:text-black transition-colors font-bold tracking-widest uppercase text-sm"
            >
              <Phone className="w-4 h-4" />
              000 000 0000
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-brand-orange focus:outline-none"
            >
              {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-brand-gray border-b border-brand-border"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-4 font-display text-xl tracking-wider font-semibold uppercase ${
                    location === link.href ? 'text-brand-orange' : 'text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:+27000000000"
                className="block mt-4 text-center bg-brand-orange text-black px-4 py-3 font-bold uppercase tracking-widest"
              >
                Call Us Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 w-full relative">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brand-black border-t border-brand-border py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left md:flex justify-between items-center">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-widest text-white uppercase mb-2">
              <span className="text-brand-orange">BRICK</span>BY<span className="text-brand-orange">BRICK</span>
            </h2>
            <p className="text-brand-white/70 text-sm max-w-sm">
              CIPC Registered building and renovation company serving the Vaal Triangle. We build. We fix. We finish.
            </p>
          </div>
          <div className="mt-8 md:mt-0 space-y-2 text-sm text-brand-white/70">
            <p>Vereeniging • Vanderbijlpark • Sasolburg</p>
            <p>© {new Date().getFullYear()} BrickByBrick Elevations PTY LTD. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:bg-[#20bd5a] hover:scale-110 transition-all duration-200 group flex items-center justify-center"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute right-full mr-4 bg-black text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-wide">
          Free Quote
        </span>
      </a>
    </div>
  );
}
