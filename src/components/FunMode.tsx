import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Music, Film, Camera, Bike, Pizza } from 'lucide-react';
import { cn } from '../utils';

const hobbies = [
  { name: 'Coding', icon: Gamepad2, color: 'text-red-400', desc: 'Building Logic' },
  { name: 'Reading', icon: Music, color: 'text-blue-400', desc: 'Expanding Horizons' },
  { name: 'Tech', icon: Film, color: 'text-yellow-400', desc: 'Exploring Trends' },
  { name: 'Politics', icon: Camera, color: 'text-purple-400', desc: 'Global Systems' },
  { name: 'History', icon: Bike, color: 'text-green-400', desc: 'Past Narratives' },
  { name: 'Learning', icon: Pizza, color: 'text-orange-400', desc: 'Daily Growth' },
];

export const FunMode: React.FC = () => {
  const [isFunMode, setIsFunMode] = useState(false);

  return (
    <section className={cn(
      "py-24 px-6 transition-colors duration-700",
      isFunMode ? "bg-neon-pink/5" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
              Beyond the <span className={isFunMode ? "text-neon-pink" : "text-neon-emerald"}>Code</span>
            </h2>
            
            <button
              onClick={() => setIsFunMode(!isFunMode)}
              className={cn(
                "relative inline-flex h-12 w-24 items-center rounded-full transition-colors duration-300 focus:outline-none",
                isFunMode ? "bg-neon-pink" : "bg-slate-700"
              )}
            >
              <span className="sr-only">Toggle Fun Mode</span>
              <motion.span
                animate={{ x: isFunMode ? 52 : 4 }}
                className="inline-block h-8 w-8 transform rounded-full bg-white shadow-lg transition-transform"
              />
              <span className="absolute left-2 text-[10px] font-bold text-white uppercase pointer-events-none">OFF</span>
              <span className="absolute right-2 text-[10px] font-bold text-white uppercase pointer-events-none">ON</span>
            </button>
            <p className="mt-4 text-slate-500 text-sm italic">
              {isFunMode ? "Fun Mode Activated! 🚀" : "Activate Fun Mode for a surprise"}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {hobbies.map((hobby, i) => (
            <motion.div
              key={hobby.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, rotate: isFunMode ? [0, -5, 5, 0] : 0 }}
              className={cn(
                "glass p-6 rounded-2xl flex flex-col items-center text-center transition-all duration-500",
                isFunMode ? "border-neon-pink/30 shadow-[0_0_15px_rgba(236,72,153,0.1)]" : "border-white/5"
              )}
            >
              <div className={cn(
                "p-4 rounded-xl mb-4 transition-colors duration-500",
                isFunMode ? "bg-neon-pink/10 text-neon-pink" : "bg-white/5 text-slate-400"
              )}>
                <hobby.icon size={28} />
              </div>
              <h3 className="font-bold text-sm mb-1">{hobby.name}</h3>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">{hobby.desc}</p>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {isFunMode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mt-16 flex justify-center"
            >
              <div className="glass p-8 rounded-3xl max-w-2xl w-full text-center relative overflow-hidden">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-20 -right-20 w-40 h-40 bg-neon-pink/20 rounded-full blur-3xl"
                />
                <h4 className="text-2xl font-bold mb-4 text-neon-pink">Favorite Movies 🎬</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <span className="text-sm">Money Heist</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4].map(i => (
                        <motion.div
                          key={i}
                          animate={{ height: [10, 20, 10] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                          className="w-1 bg-neon-pink rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <span className="text-sm">Lucky Bhaskar</span>
                    <span className="text-xs text-neon-pink font-bold">Must Watch</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <span className="text-sm">Dirty</span>
                    <span className="text-xs text-neon-pink font-bold">Classic</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
