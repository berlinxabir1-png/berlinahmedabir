import React from 'react';
import { motion } from 'framer-motion';
import { User, GraduationCap, Heart, MapPin, Coffee, Plane } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            About <span className="text-neon-emerald">Me</span>
          </motion.h2>
          <div className="w-20 h-1 bg-neon-emerald rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-white">
              I thrive at the intersection of logic and creativity.
            </h3>
            <p className="text-slate-400 leading-relaxed">
              I am deeply passionate about the art of coding, constantly pushing myself to build innovative solutions that challenge the status quo. I find immense satisfaction in dissecting complex problems and refining my technical craft every single day.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Beyond the terminal, I am a keen observer of history and politics, always seeking to understand the intricate systems and narratives that shape our modern world. This analytical mindset fuels both my personal growth and my professional approach to development.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="glass p-4 rounded-xl flex items-center space-x-3">
                <div className="p-2 bg-neon-emerald/10 rounded-lg text-neon-emerald">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase">Current City</div>
                  <div className="text-sm font-medium">Bhola, Bangladesh</div>
                </div>
              </div>
              <div className="glass p-4 rounded-xl flex items-center space-x-3">
                <div className="p-2 bg-neon-violet/10 rounded-lg text-neon-violet">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase">Current College</div>
                  <div className="text-sm font-medium">Naziur Rahman College, Bhola (12th Grade)</div>
                </div>
              </div>
              <div className="glass p-4 rounded-xl flex items-center space-x-3">
                <div className="p-2 bg-neon-pink/10 rounded-lg text-neon-pink">
                  <User size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase">Born Place</div>
                  <div className="text-sm font-medium">Dhaka, Bangladesh</div>
                </div>
              </div>
              <div className="glass p-4 rounded-xl flex items-center space-x-3">
                <div className="p-2 bg-neon-pink/10 rounded-lg text-neon-pink">
                  <Heart size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase">Relation Status</div>
                  <div className="text-sm font-medium">Taken</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass p-4 rounded-xl overflow-hidden group"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-neon-cyan/10 rounded-lg text-neon-cyan">
                    <Plane size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase">Recent Travel</div>
                    <div className="text-sm font-medium">Cox's Bazar, Bangladesh</div>
                  </div>
                </div>
                <div className="relative h-24 rounded-lg overflow-hidden">
                  <img 
                    src="https://picsum.photos/seed/coxsbazar/800/400" 
                    alt="Cox's Bazar" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-2">
                    <span className="text-[10px] text-white font-medium">World's longest sea beach</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass p-4 rounded-xl overflow-hidden group"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-neon-emerald/10 rounded-lg text-neon-emerald">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase">Next Destination</div>
                    <div className="text-sm font-medium">Cox's Bazar, Bangladesh</div>
                  </div>
                </div>
                <div className="relative h-24 rounded-lg overflow-hidden">
                  <img 
                    src="https://picsum.photos/seed/coxsbazar_next/800/400" 
                    alt="Cox's Bazar" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-2">
                    <span className="text-[10px] text-white font-medium">The world's longest natural sea beach</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
