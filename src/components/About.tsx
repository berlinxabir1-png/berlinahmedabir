import React from 'react';
import { motion } from 'framer-motion';
import { User, GraduationCap, Heart, MapPin, Coffee, Plane } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-black dark:text-white"
          >
            About <span className="text-ios-blue">Me</span>
          </motion.h2>
          <div className="w-16 h-1.5 bg-ios-blue rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white leading-tight">
              I thrive at the intersection of logic and creativity.
            </h3>
            <div className="space-y-6 text-lg text-ios-gray font-medium leading-relaxed">
              <p>
                I am deeply passionate about the art of coding, constantly pushing myself to build innovative solutions that challenge the status quo. I find immense satisfaction in dissecting complex problems and refining my technical craft every single day.
              </p>
              <p>
                Beyond the terminal, I am a keen observer of history and politics, always seeking to understand the intricate systems and narratives that shape our modern world. This analytical mindset fuels both my personal growth and my professional approach to development.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
              <div className="ios-card flex items-center space-x-4">
                <div className="p-3 bg-ios-blue/10 rounded-2xl text-ios-blue">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="text-[11px] text-ios-gray font-bold uppercase tracking-widest mb-0.5">Current City</div>
                  <div className="text-base font-semibold text-black dark:text-white">Bhola, Bangladesh</div>
                </div>
              </div>
              <div className="ios-card flex items-center space-x-4">
                <div className="p-3 bg-ios-blue/10 rounded-2xl text-ios-blue">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <div className="text-[11px] text-ios-gray font-bold uppercase tracking-widest mb-0.5">Current College</div>
                  <div className="text-base font-semibold text-black dark:text-white">Naziur Rahman College (12th)</div>
                </div>
              </div>
              <div className="ios-card flex items-center space-x-4">
                <div className="p-3 bg-ios-blue/10 rounded-2xl text-ios-blue">
                  <User size={24} />
                </div>
                <div>
                  <div className="text-[11px] text-ios-gray font-bold uppercase tracking-widest mb-0.5">Born Place</div>
                  <div className="text-base font-semibold text-black dark:text-white">Dhaka, Bangladesh</div>
                </div>
              </div>
              <div className="ios-card flex items-center space-x-4">
                <div className="p-3 bg-ios-blue/10 rounded-2xl text-ios-blue">
                  <Heart size={24} />
                </div>
                <div>
                  <div className="text-[11px] text-ios-gray font-bold uppercase tracking-widest mb-0.5">Relation Status</div>
                  <div className="text-base font-semibold text-black dark:text-white">Taken</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              {[
                { label: 'Recent Travel', value: "Cox's Bazar", desc: "World's longest sea beach", seed: 'coxsbazar' },
                { label: 'Next Destination', value: "Cox's Bazar", desc: "The world's longest natural sea beach", seed: 'coxsbazar_next' },
                { label: 'Next Destination', value: "Bandarban", desc: "The queen of hills", seed: 'bandarban' }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="ios-card !p-0 overflow-hidden group"
                >
                  <div className="p-5 flex items-center space-x-4">
                    <div className="p-2.5 bg-ios-blue/10 rounded-xl text-ios-blue">
                      {i === 0 ? <Plane size={20} /> : <MapPin size={20} />}
                    </div>
                    <div>
                      <div className="text-[10px] text-ios-gray font-bold uppercase tracking-widest mb-0.5">{item.label}</div>
                      <div className="text-sm font-semibold text-black dark:text-white">{item.value}</div>
                    </div>
                  </div>
                  <div className="relative h-32 overflow-hidden">
                    <img 
                      src={`https://picsum.photos/seed/${item.seed}/800/400`} 
                      alt={item.value} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <span className="text-xs text-white font-medium">{item.desc}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
