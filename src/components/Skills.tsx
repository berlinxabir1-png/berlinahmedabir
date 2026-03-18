import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Cpu, 
  Palette, 
  Database, 
  Terminal 
} from 'lucide-react';

const skills = [
  { name: 'HTML', icon: Code2, color: 'text-orange-500', bg: 'bg-orange-500/10', level: 98 },
  { name: 'CSS', icon: Palette, color: 'text-blue-500', bg: 'bg-blue-500/10', level: 95 },
  { name: 'JavaScript', icon: Terminal, color: 'text-yellow-500', bg: 'bg-yellow-500/10', level: 92 },
  { name: 'React', icon: Code2, color: 'text-ios-blue', bg: 'bg-ios-blue/10', level: 90 },
  { name: 'Python', icon: Cpu, color: 'text-indigo-500', bg: 'bg-indigo-500/10', level: 85 },
  { name: 'MySQL', icon: Database, color: 'text-emerald-500', bg: 'bg-emerald-500/10', level: 80 },
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-32 px-6 bg-white/5 dark:bg-black/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-black dark:text-white"
          >
            Technical <span className="text-ios-blue">Skills</span>
          </motion.h2>
          <div className="w-16 h-1.5 bg-ios-blue rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="ios-card flex flex-col group"
            >
              <div className="flex items-center space-x-5 mb-6">
                <div className={`p-4 ${skill.bg} ${skill.color} rounded-2xl transition-transform duration-300 group-hover:scale-110`}>
                  <skill.icon size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-black dark:text-white">{skill.name}</h3>
                  <span className="text-xs text-ios-gray font-bold uppercase tracking-widest">{skill.level}% Proficiency</span>
                </div>
              </div>
              
              {/* iOS Style Progress Bar */}
              <div className="w-full h-2.5 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                  className={`h-full ${skill.bg.replace('/10', '')} rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
