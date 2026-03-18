import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Music, Film, Camera, Bike, Pizza } from 'lucide-react';
import { cn } from '../utils';

const hobbies = [
  { name: 'Coding', icon: Gamepad2, color: 'text-red-500', desc: 'Building Logic' },
  { name: 'Reading', icon: Music, color: 'text-blue-500', desc: 'Expanding Horizons' },
  { name: 'Tech', icon: Film, color: 'text-yellow-500', desc: 'Exploring Trends' },
  { name: 'Politics', icon: Camera, color: 'text-purple-500', desc: 'Global Systems' },
  { name: 'History', icon: Bike, color: 'text-green-500', desc: 'Past Narratives' },
  { name: 'Learning', icon: Pizza, color: 'text-orange-500', desc: 'Daily Growth' },
];

export const FunMode: React.FC = () => {
  const [isFunMode, setIsFunMode] = useState(false);

  return (
    <section className={cn(
      "py-32 px-6 transition-colors duration-700",
      isFunMode ? "bg-ios-blue/5" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center tracking-tight text-black dark:text-white">
              Beyond the <span className={isFunMode ? "text-ios-blue" : "text-ios-gray"}>Code</span>
            </h2>
            
            {/* iOS Style Switch */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-bold text-ios-gray uppercase tracking-widest">Off</span>
              <button
                onClick={() => setIsFunMode(!isFunMode)}
                className={cn(
                  "ios-switch",
                  isFunMode && "active"
                )}
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="ios-switch-thumb"
                />
              </button>
              <span className="text-sm font-bold text-ios-blue uppercase tracking-widest">On</span>
            </div>

            <p className="mt-6 text-ios-gray text-sm font-medium italic">
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
              whileHover={{ scale: 1.05, rotate: isFunMode ? [0, -2, 2, 0] : 0 }}
              className={cn(
                "ios-card flex flex-col items-center text-center transition-all duration-500",
                isFunMode ? "border-ios-blue/30 shadow-lg" : ""
              )}
            >
              <div className={cn(
                "p-4 rounded-2xl mb-4 transition-colors duration-500",
                isFunMode ? "bg-ios-blue/10 text-ios-blue" : "bg-black/5 dark:bg-white/5 text-ios-gray"
              )}>
                <hobby.icon size={28} />
              </div>
              <h3 className="font-bold text-base mb-1 text-black dark:text-white">{hobby.name}</h3>
              <p className="text-[10px] text-ios-gray font-bold uppercase tracking-widest">{hobby.desc}</p>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {isFunMode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="mt-20 flex justify-center"
            >
              <div className="ios-card max-w-2xl w-full text-center relative overflow-hidden">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-20 -right-20 w-40 h-40 bg-ios-blue/10 rounded-full blur-3xl"
                />
                <h4 className="text-2xl font-bold mb-8 text-ios-blue">Favorite Movies 🎬</h4>
                <div className="space-y-4">
                  {[
                    { title: 'Money Heist', badge: 'Series', extra: true },
                    { title: 'Lucky Bhaskar', badge: 'Must Watch' },
                    { title: 'Dirty', badge: 'Classic' }
                  ].map((movie, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-black/5 dark:bg-white/5 rounded-2xl">
                      <span className="text-base font-bold text-black dark:text-white">{movie.title}</span>
                      <div className="flex items-center space-x-3">
                        {movie.extra && (
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4].map(i => (
                              <motion.div
                                key={i}
                                animate={{ height: [8, 16, 8] }}
                                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                className="w-1 bg-ios-blue rounded-full"
                              />
                            ))}
                          </div>
                        )}
                        <span className="text-xs text-ios-blue font-bold uppercase tracking-widest">{movie.badge}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
