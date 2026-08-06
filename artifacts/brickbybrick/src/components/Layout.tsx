import React from 'react';
import { Link, useLocation } from 'wouter';
import { MessageCircle, Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PHONE_DISPLAY = '074 775 6722';
const PHONE_HREF = 'tel:+27747756722';
const WHATSAPP_URL = "https://wa.me/27747756722?text=Hi,%20I'd%20like%20a%20free%20quote";
const EMAIL = 'brickbybrick.elevations@gmail.com';

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const links = [
    { href: '/', label: 'HOME' },
    { href: '/our-work', label: 'OUR WORK' },
    { href: '/contact', label: 'CONTACT' },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col font-sans bg-white">
      {/* Top Info Bar */}
      <div className="hidden md:block bg-gray-900 text-gray-300 text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href={PHONE_HREF} className="flex items-center gap-1.5 hover:text-[#F5A200] transition-colors font-medium">
              <Phone className="w-3.5 h-3.5" />
              {PHONE_DISPLAY}
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-1.5 hover:text-[#F5A200] transition-colors">
              <Mail className="w-3.5 h-3.5" />
              {EMAIL}
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <MapPin className="w-3.5 h-3.5" />
            <span>Vereeniging • Vanderbijlpark • Sasolburg & Surrounding Areas</span>
          </div>
        </div>
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full bg-white border-b-4 border-[#F5A200] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex-shrink-0" style={{ fontFamily: 'Oswald, sans-serif' }}>
            <span className="text-3xl font-bold tracking-widest uppercase text-gray-900">
              <span className="text-[#F5A200]">BRICK</span>BY<span className="text-[#F5A200]">BRICK</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-bold tracking-wider uppercase transition-colors hover:text-[#F5A200] ${
                  location === link.href ? 'text-[#F5A200]' : 'text-gray-800'
                }`}
                style={{ fontFamily: 'Oswald, sans-serif' }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded hover:bg-[#20bd5a] transition-colors font-bold tracking-wide uppercase text-sm shadow"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white p-2 rounded"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 hover:text-[#F5A200] focus:outline-none"
            >
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
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
            className="md:hidden overflow-hidden bg-white border-b-2 border-gray-100 shadow-lg z-40"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-4 text-xl font-bold tracking-wider uppercase border-b border-gray-100 ${
                    location === link.href ? 'text-[#F5A200]' : 'text-gray-800'
                  }`}
                  style={{ fontFamily: 'Oswald, sans-serif' }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 space-y-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-4 py-3 font-bold uppercase tracking-widest rounded"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp — {PHONE_DISPLAY}
                </a>
                <a
                  href={PHONE_HREF}
                  className="flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-3 font-bold uppercase tracking-widest rounded"
                >
                  <Phone className="w-5 h-5" />
                  Call — {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 w-full relative">
        {children}
      </main>

      {/* Full-Width WhatsApp CTA Bar */}
      <div className="bg-[#25D366] py-8 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="text-white font-bold text-2xl" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Get Your FREE Quote on WhatsApp
            </p>
            <p className="text-white/90 text-lg font-medium">{PHONE_DISPLAY}</p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white text-[#25D366] font-bold uppercase tracking-widest px-8 py-4 rounded hover:bg-gray-100 transition-colors shadow-lg text-lg whitespace-nowrap"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            <MessageCircle className="w-6 h-6" />
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-widest text-white uppercase mb-3" style={{ fontFamily: 'Oswald, sans-serif' }}>
                <span className="text-[#F5A200]">BRICK</span>BY<span className="text-[#F5A200]">BRICK</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                CIPC Registered building and renovation company. We build. We fix. We finish.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold uppercase tracking-wider mb-3 text-sm" style={{ fontFamily: 'Oswald, sans-serif' }}>Areas We Serve</h3>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>Vereeniging</li>
                <li>Vanderbijlpark</li>
                <li>Sasolburg</li>
                <li>Meyerton</li>
                <li>Three Rivers</li>
                <li>Surrounding Areas</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold uppercase tracking-wider mb-3 text-sm" style={{ fontFamily: 'Oswald, sans-serif' }}>Contact</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>
                  <a href={PHONE_HREF} className="hover:text-[#F5A200] transition-colors flex items-center gap-2">
                    <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${EMAIL}`} className="hover:text-[#F5A200] transition-colors flex items-center gap-2 break-all">
                    <Mail className="w-4 h-4" /> {EMAIL}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} BrickByBrick Elevations PTY LTD. All rights reserved.</p>
            <p className="mt-1">CIPC Registered: 2026/570477/07</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white shadow-2xl hover:bg-[#20bd5a] hover:scale-105 transition-all duration-200 group flex items-center gap-3 px-4 py-3 rounded-full"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 flex-shrink-0" />
        <div className="flex flex-col leading-tight">
          <span className="text-xs font-bold uppercase tracking-wide">WhatsApp Us</span>
          <span className="text-sm font-bold">{PHONE_DISPLAY}</span>
        </div>
      </a>
    </div>
  );
}
