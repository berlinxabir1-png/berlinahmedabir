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

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
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
                  <div className="text-sm font-medium">In a relation with (Fa****)</div>
                </div>
              </div>
            </div>

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
              <div className="relative h-32 rounded-lg overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/coxsbazar/800/400" 
                  alt="Cox's Bazar" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-3">
                  <span className="text-xs text-white font-medium">The world's longest natural sea beach</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="glass p-6 rounded-2xl h-40 flex flex-col justify-end group hover:bg-neon-emerald/5 transition-colors">
                <div className="text-3xl font-bold text-neon-emerald mb-1">99%</div>
                <div className="text-sm text-slate-400">Coffee Concentration</div>
              </div>
              <div className="glass p-6 rounded-2xl h-60 flex flex-col justify-end group hover:bg-neon-violet/5 transition-colors">
                <div className="text-3xl font-bold text-neon-violet mb-1">10k+</div>
                <div className="text-sm text-slate-400">Lines of Code Written</div>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="glass p-6 rounded-2xl h-60 flex flex-col justify-end group hover:bg-neon-cyan/5 transition-colors">
                <div className="text-3xl font-bold text-neon-cyan mb-1">24/7</div>
                <div className="text-sm text-slate-400">Creative Thinking</div>
              </div>
              <div className="glass p-6 rounded-2xl h-40 flex flex-col justify-end group hover:bg-neon-pink/5 transition-colors">
                <div className="text-3xl font-bold text-neon-pink mb-1">0</div>
                <div className="text-sm text-slate-400">Regrets (Mostly)</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
