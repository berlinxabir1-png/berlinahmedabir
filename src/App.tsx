import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { FunMode } from './components/FunMode';
import { VoteSystem } from './components/VoteSystem';
import { Contact } from './components/Contact';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Sparkles, Moon, Sun } from 'lucide-react';

const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="fixed inset-0 z-[9999] bg-ios-bg-light dark:bg-ios-bg-dark flex flex-col items-center justify-center"
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative"
    >
      <div className="w-20 h-20 rounded-[22%] bg-ios-blue flex items-center justify-center shadow-lg">
        <Sparkles className="text-white" size={40} />
      </div>
    </motion.div>
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-8 text-2xl font-bold tracking-tight text-black dark:text-white"
    >
      Berlin Ahmed Abir
    </motion.div>
  </motion.div>
);

const Footer = () => (
  <footer className="py-16 px-6 border-t border-black/5 dark:border-white/5 bg-white/30 dark:bg-black/30 backdrop-blur-md">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="text-2xl font-bold tracking-tight">
        <span className="text-ios-blue">Berlin</span>
        <span className="text-black dark:text-white"> Ahmed Abir</span>
      </div>
      <p className="text-ios-gray text-sm font-medium">
        © {new Date().getFullYear()} Berlin Ahmed Abir. Designed with iOS aesthetics.
      </p>
      <div className="flex items-center space-x-8">
        <a href="https://www.facebook.com/abirahmedberlin/" target="_blank" rel="noopener noreferrer" className="text-ios-gray hover:text-ios-blue transition-colors font-medium">Facebook</a>
        <a href="https://www.instagram.com/abirahmedberlin/" target="_blank" rel="noopener noreferrer" className="text-ios-gray hover:text-ios-blue transition-colors font-medium">Instagram</a>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    // Ensure light mode is active
    document.documentElement.classList.remove('dark');

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-ios-blue/20 selection:text-ios-blue">
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <AnimatedBackground />
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <FunMode />
        <VoteSystem />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
