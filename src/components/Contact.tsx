import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MessageSquare, User, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to send message. Please try again later.');
      }
    } catch (err) {
      console.error('Contact error:', err);
      alert('Failed to send message. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-black"
          >
            Get in <span className="text-ios-blue">Touch</span>
          </motion.h2>
          <div className="w-16 h-1.5 bg-ios-blue rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-black leading-tight">Let's collaborate on something amazing.</h3>
            <p className="text-ios-gray text-lg font-medium leading-relaxed">
              Whether you have a project in mind, want to discuss a potential partnership, or just want to say hi, I'm always open to new conversations.
            </p>

            <div className="space-y-8">
              <div className="flex items-center space-x-5 group">
                <div className="p-4 bg-ios-blue/10 rounded-2xl text-ios-blue group-hover:bg-ios-blue group-hover:text-white transition-all duration-300">
                  <Mail size={28} />
                </div>
                <div>
                  <div className="text-[10px] text-ios-gray font-bold uppercase tracking-widest">Email Me</div>
                  <div className="text-xl font-bold text-black">canikissyousuzu@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center space-x-5 group">
                <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                  <MessageSquare size={28} />
                </div>
                <div>
                  <div className="text-[10px] text-ios-gray font-bold uppercase tracking-widest">Socials</div>
                  <div className="flex space-x-4 mt-1">
                    <a href="https://www.facebook.com/abirahmedberlin/" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-black hover:text-ios-blue transition-colors">Facebook</a>
                    <span className="text-ios-gray/30 font-bold">/</span>
                    <a href="https://www.instagram.com/abirahmedberlin/" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-black hover:text-ios-blue transition-colors">Instagram</a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="ios-card relative overflow-hidden"
          >
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-16"
              >
                <div className="w-24 h-24 bg-ios-blue/10 text-ios-blue rounded-full flex items-center justify-center mb-8">
                  <CheckCircle2 size={48} />
                </div>
                <h4 className="text-3xl font-bold mb-3 text-black">Message Sent!</h4>
                <p className="text-ios-gray font-medium">Thanks for reaching out. I'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-ios-gray ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-ios-gray" size={20} />
                    <input 
                      required
                      type="text" 
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="ios-input py-5 pl-14"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-ios-gray ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-ios-gray" size={20} />
                    <input 
                      required
                      type="email" 
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="ios-input py-5 pl-14"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-ios-gray ml-1">Message</label>
                  <textarea 
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="ios-input py-5 px-6 resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="ios-button-primary w-full py-5 flex items-center justify-center space-x-3 text-lg disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  <Send size={20} />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
