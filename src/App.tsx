import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { FunMode } from './components/FunMode';
import { Contact } from './components/Contact';
import { CustomCursor } from './components/CustomCursor';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Sparkles } from 'lucide-react';

const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="fixed inset-0 z-[9999] bg-[#030712] flex flex-col items-center justify-center"
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-24 h-24 rounded-full border-t-2 border-r-2 border-neon-emerald"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Sparkles className="text-neon-emerald animate-pulse" size={32} />
      </div>
    </motion.div>
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-8 text-xl font-bold tracking-[0.2em] text-white"
    >
      BERLIN<span className="text-neon-emerald"> ABIR</span>
    </motion.div>
  </motion.div>
);

const Footer = () => (
  <footer className="py-12 px-6 border-t border-white/5 bg-black/40">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="text-xl font-bold tracking-tighter">
        <span className="text-neon-emerald">BERLIN</span>
        <span className="text-white"> ABIR</span>
      </div>
      <p className="text-slate-500 text-sm">
        © {new Date().getFullYear()} Berlin Ahmed Abir. Built with React & Framer Motion.
      </p>
      <div className="flex items-center space-x-6">
        <a href="#" className="text-slate-400 hover:text-white transition-colors">Facebook</a>
        <a href="#" className="text-slate-400 hover:text-white transition-colors">Instagram</a>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.classList.add('custom-cursor-active');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-neon-emerald/30 selection:text-emerald-400">
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <CustomCursor />
      <AnimatedBackground />
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <FunMode />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
