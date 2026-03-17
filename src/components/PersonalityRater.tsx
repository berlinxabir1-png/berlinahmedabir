import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Star, Brain } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const PersonalityRater: React.FC = () => {
  const [input, setInput] = useState('');
  const [rating, setRating] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const ratePersonality = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Rate the personality of a person who says: "${input}". 
        Provide a fun, creative rating with:
        1. A personality type name (e.g., "The Chaotic Creative")
        2. A short description (max 2 sentences)
        3. Three stats (0-100): Logic, Creativity, and Energy.
        4. A "Vibe" score (1-10).`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              typeName: { type: Type.STRING },
              description: { type: Type.STRING },
              stats: {
                type: Type.OBJECT,
                properties: {
                  logic: { type: Type.NUMBER },
                  creativity: { type: Type.NUMBER },
                  energy: { type: Type.NUMBER }
                }
              },
              vibeScore: { type: Type.NUMBER }
            },
            required: ["typeName", "description", "stats", "vibeScore"]
          }
        }
      });

      const data = JSON.parse(response.text);
      setRating(data);
    } catch (error) {
      console.error("Error rating personality:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="personality-rater" className="py-24 px-6 bg-black/20">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
          >
            <div className="p-3 bg-neon-emerald/10 rounded-2xl text-neon-emerald mb-4">
              <Brain size={32} />
            </div>
            <h2 className="text-4xl font-bold mb-4">AI <span className="text-neon-emerald">Personality</span> Rater</h2>
            <p className="text-slate-400">Describe yourself in a few words and let AI analyze your vibe.</p>
          </motion.div>
        </div>

        <div className="glass p-8 rounded-3xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-col space-y-4">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., I love coding late at night with lo-fi beats..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-neon-emerald/50 transition-colors h-32 resize-none"
              />
              <button
                onClick={ratePersonality}
                disabled={loading || !input.trim()}
                className="w-full py-4 bg-neon-emerald text-black font-bold rounded-2xl hover:bg-emerald-400 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <RefreshCw className="animate-spin" size={20} />
                ) : (
                  <>
                    <span>Analyze My Vibe</span>
                    <Sparkles size={20} />
                  </>
                )}
              </button>
            </div>

            <AnimatePresence>
              {rating && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-12 pt-12 border-t border-white/10"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-neon-emerald mb-2">{rating.typeName}</h3>
                    <p className="text-slate-400">{rating.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="glass p-4 rounded-2xl text-center">
                      <div className="text-xs text-slate-500 uppercase mb-1">Logic</div>
                      <div className="text-2xl font-bold text-neon-cyan">{rating.stats.logic}%</div>
                    </div>
                    <div className="glass p-4 rounded-2xl text-center">
                      <div className="text-xs text-slate-500 uppercase mb-1">Creativity</div>
                      <div className="text-2xl font-bold text-neon-violet">{rating.stats.creativity}%</div>
                    </div>
                    <div className="glass p-4 rounded-2xl text-center">
                      <div className="text-xs text-slate-500 uppercase mb-1">Energy</div>
                      <div className="text-2xl font-bold text-neon-pink">{rating.stats.energy}%</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="text-xs text-slate-500 uppercase mb-2">Vibe Score</div>
                    <div className="flex items-center space-x-2">
                      {[...Array(10)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={i < rating.vibeScore ? "text-yellow-400 fill-yellow-400" : "text-white/10"}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
