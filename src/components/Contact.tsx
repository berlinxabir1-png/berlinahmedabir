import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MessageSquare, User, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Get in <span className="text-neon-emerald">Touch</span>
          </motion.h2>
          <div className="w-20 h-1 bg-neon-emerald rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-bold text-white">Let's collaborate on something amazing.</h3>
            <p className="text-slate-400 text-lg leading-relaxed">
              Whether you have a project in mind, want to discuss a potential partnership, or just want to say hi, I'm always open to new conversations.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 group">
                <div className="p-4 bg-white/5 rounded-2xl text-neon-emerald group-hover:bg-neon-emerald group-hover:text-black transition-all duration-300">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest">Email Me</div>
                  <div className="text-lg font-medium">berlin@abir.dev</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="p-4 bg-white/5 rounded-2xl text-neon-violet group-hover:bg-neon-violet group-hover:text-black transition-all duration-300">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest">Socials</div>
                  <div className="flex space-x-3 mt-1">
                    <a href="https://www.facebook.com/abirahmedberlin/" target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:text-neon-emerald transition-colors">Facebook</a>
                    <span className="text-slate-600">/</span>
                    <a href="https://www.instagram.com/abirahmedberlin/" target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:text-neon-emerald transition-colors">Instagram</a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-10 rounded-3xl border-white/5 relative overflow-hidden"
          >
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-20 h-20 bg-neon-emerald/20 text-neon-emerald rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h4 className="text-2xl font-bold mb-2">Message Sent!</h4>
                <p className="text-slate-400">Thanks for reaching out. I'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                      required
                      type="text" 
                      placeholder="Enter your name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-neon-emerald focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                      required
                      type="email" 
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-neon-emerald focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Message</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Tell me about your project..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-neon-emerald focus:bg-white/10 transition-all resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-neon-emerald text-black font-bold rounded-xl flex items-center justify-center space-x-2 hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                >
                  <span>Send Message</span>
                  <Send size={18} />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
