"use client";

import { motion } from "framer-motion";

interface RoundIndicatorProps {
  currentRound: number;
  totalRounds: number;
}

export function RoundIndicator({ currentRound, totalRounds }: RoundIndicatorProps) {
  const progress = (currentRound / totalRounds) * 100;

  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between text-sm text-muted-foreground mb-2">
        <span>Round {currentRound} of {totalRounds}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-2 bg-matcha-100 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-matcha-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}