import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Landmark, Scale, Users } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';

interface SubjectInfo {
  favorite_subject: string;
  subject_description: string;
  tags: string[];
  cards: { title: string; icon: string; desc: string }[];
}

const iconMap: Record<string, any> = { Landmark, Scale, Users };

const defaultSubject: SubjectInfo = {
  favorite_subject: "Civics",
  subject_description: "My interest in Civics stems from a deep curiosity about how societies organize themselves, the principles of governance, and the rights and responsibilities of citizens. I believe understanding our political and social systems is crucial for meaningful contribution to the world.",
  tags: ["Justice", "Governance", "Community"],
  cards: [
    { title: 'Rights', icon: 'Scale', description: 'Understanding individual liberties' },
    { title: 'Policy', icon: 'Landmark', description: 'Analyzing social structures' }
  ]
};

export const FavoriteSubject: React.FC = () => {
  const { data: subject } = usePortfolioData<SubjectInfo>('profile', {
    ...defaultSubject as any
  });

  return (
    <section id="favorite-subject" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="ios-card bg-gradient-to-br from-ios-blue/5 to-indigo-500/5 border-ios-blue/10 p-12 relative overflow-hidden group"
        >
          {/* Decorative background icon */}
          <div className="absolute -right-20 -bottom-20 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-700">
            <Landmark size={400} />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-ios-blue/10 text-ios-blue text-[10px] font-bold uppercase tracking-widest mb-6">
                <BookOpen size={14} />
                <span>Academic Passion</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-black mb-6 leading-tight">
                Favorite Subject: <span className="text-ios-blue">{subject.favorite_subject}</span>
              </h2>
              
              <p className="text-ios-gray text-lg font-medium leading-relaxed mb-8">
                {subject.subject_description}
              </p>

              <div className="flex flex-wrap gap-4">
                {subject.tags.map(tag => {
                  const Icon = iconMap[tag] || Scale;
                  return (
                    <div key={tag} className="flex items-center space-x-2 px-4 py-2 bg-white/50 rounded-xl border border-black/5 shadow-sm">
                      <Icon size={18} className="text-ios-blue" />
                      <span className="text-sm font-bold text-black">{tag}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {subject.cards.map((card, i) => {
                const Icon = iconMap[card.icon] || Scale;
                return (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="ios-card bg-white/80 p-6 flex flex-col items-center text-center space-y-3"
                  >
                    <div className="w-12 h-12 bg-ios-blue/10 rounded-2xl flex items-center justify-center text-ios-blue">
                      <Icon size={24} />
                    </div>
                    <h4 className="font-bold text-black">{card.title}</h4>
                    <p className="text-[10px] text-ios-gray font-medium">{card.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
