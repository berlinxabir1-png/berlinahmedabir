import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, ThumbsDown, Star, MessageSquare } from 'lucide-react';
import { cn } from '../utils';

export const VoteSystem: React.FC = () => {
  const [votes, setVotes] = useState({ likes: 0, dislikes: 0, ratings: [] as any[] });
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVotes();
  }, []);

  const fetchVotes = async () => {
    try {
      const res = await fetch('/api/votes');
      const data = await res.json();
      setVotes(data);
    } catch (err) {
      console.error('Failed to fetch votes:', err);
    }
  };

  const handleVote = async (type: 'like' | 'dislike') => {
    if (userVote || loading) return;
    setLoading(true);
    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });
      const data = await res.json();
      setVotes(data);
      setUserVote(type);
    } catch (err) {
      console.error('Vote failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRate = async (rating: number) => {
    if (userRating || loading) return;
    setLoading(true);
    try {
      const res = await fetch('/api/rate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating }),
      });
      const data = await res.json();
      setVotes(data);
      setUserRating(rating);
    } catch (err) {
      console.error('Rating failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const averageRating = votes.ratings.length > 0
    ? (votes.ratings.reduce((acc, curr) => acc + curr.value, 0) / votes.ratings.length).toFixed(1)
    : '0';

  return (
    <section id="vote" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Rate My <span className="text-neon-emerald">Portfolio</span>
          </motion.h2>
          <p className="text-slate-400 max-w-lg">
            Your feedback helps me grow. Let me know what you think of my work!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Like/Dislike Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-3xl flex flex-col items-center justify-center space-y-8"
          >
            <h3 className="text-xl font-bold flex items-center space-x-2">
              <MessageSquare className="text-neon-emerald" size={20} />
              <span>Quick Vote</span>
            </h3>
            
            <div className="flex items-center space-x-12">
              <div className="flex flex-col items-center space-y-4">
                <button
                  onClick={() => handleVote('like')}
                  disabled={!!userVote || loading}
                  className={cn(
                    "p-6 rounded-2xl transition-all duration-300 transform hover:scale-110",
                    userVote === 'like' ? "bg-neon-emerald text-black" : "bg-white/5 text-slate-400 hover:bg-neon-emerald/20 hover:text-neon-emerald"
                  )}
                >
                  <ThumbsUp size={32} />
                </button>
                <span className="text-2xl font-bold">{votes.likes}</span>
                <span className="text-xs text-slate-500 uppercase">Likes</span>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <button
                  onClick={() => handleVote('dislike')}
                  disabled={!!userVote || loading}
                  className={cn(
                    "p-6 rounded-2xl transition-all duration-300 transform hover:scale-110",
                    userVote === 'dislike' ? "bg-neon-pink text-black" : "bg-white/5 text-slate-400 hover:bg-neon-pink/20 hover:text-neon-pink"
                  )}
                >
                  <ThumbsDown size={32} />
                </button>
                <span className="text-2xl font-bold">{votes.dislikes}</span>
                <span className="text-xs text-slate-500 uppercase">Dislikes</span>
              </div>
            </div>
          </motion.div>

          {/* Star Rating Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-3xl flex flex-col items-center justify-center space-y-8"
          >
            <h3 className="text-xl font-bold flex items-center space-x-2">
              <Star className="text-yellow-400" size={20} />
              <span>Star Rating</span>
            </h3>

            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">{averageRating}</div>
              <div className="text-xs text-slate-500 uppercase mb-6">Average from {votes.ratings.length} reviews</div>
              
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRate(star)}
                    disabled={!!userRating || loading}
                    className={cn(
                      "p-2 transition-all duration-300 transform hover:scale-125",
                      (userRating && star <= userRating) ? "text-yellow-400" : "text-white/10 hover:text-yellow-400/50"
                    )}
                  >
                    <Star size={32} fill={(userRating && star <= userRating) ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
              {userRating && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-sm text-neon-emerald font-medium"
                >
                  Thanks for rating!
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
