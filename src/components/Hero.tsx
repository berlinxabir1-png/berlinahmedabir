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
    <div className="flex space-x-2 text-[10px] font-bold text-ios-blue uppercase tracking-widest">
      <span>{timeLeft.days}d</span>
      <span>{timeLeft.hours}h</span>
      <span>{timeLeft.minutes}m</span>
      <span>{timeLeft.seconds}s</span>
    </div>
  );
};

export const Hero: React.FC = () => {
  const name = "Berlin Ahmed Abir";
  
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-ios-blue/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white/40 backdrop-blur-md border border-white/20 text-ios-blue text-xs font-bold mb-10 shadow-sm"
          >
            <Sparkles size={14} className="animate-spin-slow" />
            <span className="tracking-tight">"My brain runs faster than a computer"</span>
          </motion.div>
          
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-black mb-4">
              <span className="block opacity-50 text-4xl md:text-5xl font-bold mb-2">I'm</span>
              <div className="flex flex-wrap">
                {name.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.4 + (i * 0.1),
                      ease: [0.2, 0.65, 0.3, 0.9]
                    }}
                    className={i === 0 ? "text-ios-blue mr-4" : "text-black mr-4"}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </h1>
            
            <div className="h-12 flex items-center">
              <span className="text-2xl md:text-4xl text-ios-gray font-semibold">
                A{' '}
                <span className="text-black border-b-4 border-ios-blue/30 pb-1">
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
            </div>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl text-ios-gray max-w-lg mb-12 leading-relaxed font-medium"
          >
            Architecting high-performance digital solutions with a relentless focus on logic, efficiency, and creative problem-solving.
          </motion.p>
          
          <div className="flex flex-wrap gap-6">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="ios-button-primary flex items-center space-x-3 px-8 py-5 text-lg shadow-xl shadow-ios-blue/20"
            >
              <span className="font-bold">View Projects</span>
              <ArrowRight size={20} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="ios-button-secondary flex items-center space-x-3 px-8 py-5 text-lg"
            >
              <Download size={20} />
              <span className="font-bold">Resume</span>
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Main Image Container */}
          <div className="relative group">
            {/* Animated Glow Background */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-ios-blue/30 via-indigo-500/20 to-ios-blue/30 rounded-[30%] blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700 animate-spin-slow" />
            
            <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] rounded-[24%] overflow-hidden border-[12px] border-white shadow-2xl transform transition-transform duration-700 group-hover:scale-[1.02] group-hover:rotate-1">
              <img 
                src="https://img.freepik.com/premium-vector/vector-teenager-wearing-cool-outfit_1310295-648.jpg?semt=ais_hybrid&w=740&q=80" 
                alt="Profile" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            {/* Floating Badges - iOS Style */}
            <motion.div
              animate={{ y: [0, -12, 0], x: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 ios-glass p-6 rounded-[2rem] shadow-2xl z-20 border-white/40 min-w-[180px]"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-ios-blue/10 rounded-xl">
                  <Cake size={20} className="text-ios-blue" />
                </div>
                <div className="text-ios-blue font-extrabold text-sm tracking-tight">Birthday</div>
              </div>
              <div className="text-xs text-ios-gray font-bold mb-3 opacity-70">Jan 08, 1947</div>
              <BirthdayCountdown />
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 12, 0], x: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-12 ios-glass p-6 rounded-[2rem] shadow-2xl border-white/40"
            >
              <div className="flex flex-col">
                <span className="text-ios-blue font-black text-4xl leading-none">50+</span>
                <span className="text-[10px] text-ios-gray font-black uppercase tracking-[0.2em] mt-1">Projects Done</span>
              </div>
            </motion.div>

            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-10 -right-6 ios-glass py-3 px-5 rounded-2xl shadow-xl border-white/40 flex items-center space-x-3"
            >
              <div className="relative">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping absolute inset-0" />
                <div className="w-3 h-3 bg-emerald-500 rounded-full relative" />
              </div>
              <span className="text-xs font-bold text-black tracking-tight">Available for Work</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
