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
    color: 'from-blue-500 to-blue-600',
    type: 'Concept Project'
  },
  {
    title: 'Automation Scripts',
    description: 'A collection of custom scripts designed to automate repetitive tasks and enhance personal workflow efficiency.',
    image: 'https://picsum.photos/seed/automation/800/500',
    tags: ['Python', 'Automation', 'Efficiency'],
    github: '#',
    live: '#',
    color: 'from-emerald-500 to-teal-600',
    type: 'Private Project'
  },
  {
    title: 'Case Management System',
    description: 'A sophisticated system for organizing and managing complex cases with a focus on data integrity and user flow.',
    image: 'https://picsum.photos/seed/case/800/500',
    tags: ['React', 'MySQL', 'Architecture'],
    github: '#',
    live: '#',
    color: 'from-indigo-500 to-purple-600',
    type: 'Concept Project'
  },
];

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-black dark:text-white"
          >
            Featured <span className="text-ios-blue">Projects</span>
          </motion.h2>
          <div className="w-16 h-1.5 bg-ios-blue rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group ios-card !p-0 overflow-hidden hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="px-4 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-[10px] font-bold text-white border border-white/20">
                    {project.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg bg-ios-blue/10 text-ios-blue">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-black dark:text-white group-hover:text-ios-blue transition-colors">{project.title}</h3>
                <p className="text-ios-gray text-sm font-medium leading-relaxed mb-8">
                  {project.description}
                </p>
                
                <div className="flex items-center space-x-3 text-sm font-bold text-ios-gray/60 italic">
                  <Code size={18} />
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
