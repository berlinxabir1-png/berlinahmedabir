import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Layers, 
  Cpu, 
  Globe, 
  Smartphone, 
  Palette, 
  Database, 
  Terminal 
} from 'lucide-react';

const skills = [
  { name: 'HTML', icon: Code2, color: 'text-orange-500', bg: 'bg-orange-500/10', level: 98 },
  { name: 'CSS', icon: Palette, color: 'text-blue-500', bg: 'bg-blue-500/10', level: 95 },
  { name: 'JavaScript', icon: Terminal, color: 'text-yellow-400', bg: 'bg-yellow-400/10', level: 92 },
  { name: 'React', icon: Code2, color: 'text-neon-cyan', bg: 'bg-neon-cyan/10', level: 90 },
  { name: 'Python', icon: Cpu, color: 'text-blue-400', bg: 'bg-blue-400/10', level: 85 },
  { name: 'MySQL', icon: Database, color: 'text-neon-emerald', bg: 'bg-neon-emerald/10', level: 80 },
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-6 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Technical <span className="text-neon-violet">Skills</span>
          </motion.h2>
          <div className="w-20 h-1 bg-neon-violet rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass p-6 rounded-2xl flex flex-col items-center text-center group cursor-default"
            >
              <div className={`p-4 ${skill.bg} ${skill.color} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <skill.icon size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">{skill.name}</h3>
              
              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-2">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-full ${skill.bg.replace('/10', '')}`}
                />
              </div>
              <span className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest">{skill.level}% Proficiency</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
