import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code } from 'lucide-react';

const projects = [
  {
    title: 'Study Tracker',
    description: 'A comprehensive tool for managing study time, tracking tasks, and optimizing academic productivity.',
    image: 'https://picsum.photos/seed/study/800/500',
    tags: ['React', 'Logic', 'Productivity'],
    github: '#',
    live: '#',
    color: 'from-neon-cyan to-blue-600',
    type: 'Concept Project'
  },
  {
    title: 'Automation Scripts',
    description: 'A collection of custom scripts designed to automate repetitive tasks and enhance personal workflow efficiency.',
    image: 'https://picsum.photos/seed/automation/800/500',
    tags: ['Python', 'Automation', 'Efficiency'],
    github: '#',
    live: '#',
    color: 'from-neon-emerald to-teal-600',
    type: 'Private Project'
  },
  {
    title: 'Case Management System',
    description: 'A sophisticated system for organizing and managing complex cases with a focus on data integrity and user flow.',
    image: 'https://picsum.photos/seed/case/800/500',
    tags: ['React', 'MySQL', 'Architecture'],
    github: '#',
    live: '#',
    color: 'from-neon-violet to-purple-600',
    type: 'Concept Project'
  },
];

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Featured <span className="text-neon-cyan">Projects</span>
          </motion.h2>
          <div className="w-20 h-1 bg-neon-cyan rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group relative glass rounded-3xl overflow-hidden border-white/5 hover:border-white/20 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500 z-10`} />
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-neon-cyan border border-neon-cyan/30">
                    {project.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md bg-white/5 text-slate-400">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-neon-cyan transition-colors">{project.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
                
                <div className="flex items-center space-x-2 text-sm font-bold text-slate-500 italic">
                  <Code size={16} />
                  <span>Internal Development</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
