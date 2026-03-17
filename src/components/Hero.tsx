import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { ArrowRight, Download, Sparkles, Cake } from 'lucide-react';

const BirthdayCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let nextBirthday = new Date(currentYear, 0, 8); // January 8th

      if (now > nextBirthday) {
        nextBirthday = new Date(currentYear + 1, 0, 8);
      }

      const difference = nextBirthday.getTime() - now.getTime();

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex space-x-2 text-[10px] font-bold text-neon-emerald uppercase tracking-widest">
      <span>{timeLeft.days}d</span>
      <span>{timeLeft.hours}h</span>
      <span>{timeLeft.minutes}m</span>
      <span>{timeLeft.seconds}s</span>
    </div>
  );
};

export const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-neon-emerald/10 border border-neon-emerald/20 text-neon-emerald text-xs font-semibold mb-6">
            <Sparkles size={14} />
            <span>"My brain runs faster than a computer"</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            I'm <span className="text-gradient">Berlin Ahmed Abir</span>
            <br />
            <span className="text-3xl md:text-5xl text-slate-400">
              A{' '}
              <span className="text-white">
                <Typewriter
                  words={['Frontend Developer', 'React Enthusiast', 'Problem Solver']}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </span>
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-lg mb-10 leading-relaxed">
            Architecting high-performance digital solutions with a relentless focus on logic, efficiency, and creative problem-solving.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-neon-emerald text-black font-bold rounded-xl flex items-center space-x-2 hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              <span>View Projects</span>
              <ArrowRight size={18} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass border-white/10 text-white font-bold rounded-xl flex items-center space-x-2 hover:bg-white/10 transition-colors"
            >
              <Download size={18} />
              <span>Resume</span>
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Profile Image Container */}
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* Animated Rings */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-neon-emerald/30"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 rounded-full border border-neon-violet/20"
            />
            
            <div className="absolute inset-2 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=1000&auto=format&fit=crop" 
                alt="Profile" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Floating Badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 glass p-4 rounded-2xl shadow-xl z-20"
            >
              <div className="flex items-center space-x-2 mb-1">
                <Cake size={16} className="text-neon-emerald" />
                <div className="text-neon-emerald font-bold text-sm">Birthday</div>
              </div>
              <div className="text-[10px] text-slate-200 mb-1">Jan 08, 2005</div>
              <BirthdayCountdown />
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 glass p-4 rounded-2xl shadow-xl"
            >
              <div className="text-neon-pink font-bold text-xl">50+</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest">Projects</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
