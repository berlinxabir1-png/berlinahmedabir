import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Background base color is handled in App.tsx via theme classes */}
      
      {/* Animated Blobs - iOS Inspired Colors */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, 40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -top-[15%] -left-[10%] w-[60%] h-[60%] bg-ios-blue/10 rounded-full blur-[140px]"
      />
      
      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 80, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[15%] -right-[15%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[140px]"
      />
      
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -80, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -bottom-[15%] left-[15%] w-[55%] h-[55%] bg-purple-500/10 rounded-full blur-[140px]"
      />

      {/* Subtle Noise Texture Overlay for a premium feel */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};
