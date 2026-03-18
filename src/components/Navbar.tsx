import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Facebook, Instagram } from 'lucide-react';
import { cn } from '../utils';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Vote', href: '#vote' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[90%] max-w-5xl rounded-3xl px-6 py-3',
        isScrolled 
          ? 'ios-glass shadow-lg py-2' 
          : 'bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/10'
      )}
    >
      <div className="flex items-center justify-between">
        <motion.a
          href="#home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-bold tracking-tight flex items-center space-x-2"
        >
          <div className="w-8 h-8 rounded-[22%] bg-ios-blue flex items-center justify-center text-white text-xs">B</div>
          <span className="text-black dark:text-white hidden sm:inline">Berlin Ahmed Abir</span>
        </motion.a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-ios-gray hover:text-ios-blue transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center space-x-4 ml-4 border-l border-black/5 dark:border-white/10 pl-6">
            <a href="https://www.facebook.com/abirahmedberlin/" target="_blank" rel="noopener noreferrer" className="text-ios-gray hover:text-ios-blue transition-colors"><Facebook size={18} /></a>
            <a href="https://www.instagram.com/abirahmedberlin/" target="_blank" rel="noopener noreferrer" className="text-ios-gray hover:text-ios-blue transition-colors"><Instagram size={18} /></a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-ios-blue p-2 active:scale-90 transition-transform"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden ios-glass mt-4 rounded-2xl overflow-hidden border-none"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-semibold text-black dark:text-white hover:text-ios-blue transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
