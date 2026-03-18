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
      if (data && !data.error) {
        setVotes(data);
      }
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
      if (data && !data.error) {
        setVotes(data);
        setUserVote(type);
      }
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
      if (data && !data.error) {
        setVotes(data);
        setUserRating(rating);
      }
    } catch (err) {
      console.error('Rating failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const ratings = votes?.ratings || [];
  const averageRating = ratings.length > 0
    ? (ratings.reduce((acc: number, curr: any) => acc + (curr.value || 0), 0) / ratings.length).toFixed(1)
    : '0';

  return (
    <section id="vote" className="py-32 px-6 relative overflow-hidden bg-white/5 dark:bg-black/20">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-black dark:text-white"
          >
            Rate My <span className="text-ios-blue">Portfolio</span>
          </motion.h2>
          <p className="text-ios-gray max-w-lg font-medium">
            Your feedback helps me grow. Let me know what you think of my work!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Like/Dislike Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="ios-card flex flex-col items-center justify-center space-y-10"
          >
            <h3 className="text-xl font-bold flex items-center space-x-3 text-black dark:text-white">
              <MessageSquare className="text-ios-blue" size={24} />
              <span>Quick Vote</span>
            </h3>
            
            <div className="flex items-center space-x-16">
              <div className="flex flex-col items-center space-y-4">
                <button
                  onClick={() => handleVote('like')}
                  disabled={!!userVote || loading}
                  className={cn(
                    "p-6 rounded-3xl transition-all duration-300 transform hover:scale-110 shadow-lg",
                    userVote === 'like' ? "bg-ios-blue text-white" : "bg-black/5 dark:bg-white/5 text-ios-gray hover:bg-ios-blue/10 hover:text-ios-blue"
                  )}
                >
                  <ThumbsUp size={32} />
                </button>
                <div className="text-center">
                  <span className="block text-3xl font-bold text-black dark:text-white">{votes.likes}</span>
                  <span className="text-[10px] text-ios-gray font-bold uppercase tracking-widest">Likes</span>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <button
                  onClick={() => handleVote('dislike')}
                  disabled={!!userVote || loading}
                  className={cn(
                    "p-6 rounded-3xl transition-all duration-300 transform hover:scale-110 shadow-lg",
                    userVote === 'dislike' ? "bg-red-500 text-white" : "bg-black/5 dark:bg-white/5 text-ios-gray hover:bg-red-500/10 hover:text-red-500"
                  )}
                >
                  <ThumbsDown size={32} />
                </button>
                <div className="text-center">
                  <span className="block text-3xl font-bold text-black dark:text-white">{votes.dislikes}</span>
                  <span className="text-[10px] text-ios-gray font-bold uppercase tracking-widest">Dislikes</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Star Rating Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="ios-card flex flex-col items-center justify-center space-y-10"
          >
            <h3 className="text-xl font-bold flex items-center space-x-3 text-black dark:text-white">
              <Star className="text-yellow-500" size={24} />
              <span>Star Rating</span>
            </h3>

            <div className="text-center w-full">
              <div className="text-6xl font-bold text-black dark:text-white mb-2 tracking-tighter">{averageRating}</div>
              <div className="text-[10px] text-ios-gray font-bold uppercase tracking-widest mb-10">Average from {ratings.length} reviews</div>
              
              <div className="flex items-center justify-center space-x-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRate(star)}
                    disabled={!!userRating || loading}
                    className={cn(
                      "p-2.5 transition-all duration-300 transform hover:scale-125",
                      (userRating && star <= userRating) ? "text-yellow-500" : "text-black/10 dark:text-white/10 hover:text-yellow-500/50"
                    )}
                  >
                    <Star size={36} fill={(userRating && star <= userRating) ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
              <AnimatePresence>
                {userRating && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 text-sm text-ios-blue font-bold tracking-wide"
                  >
                    Thanks for rating!
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
