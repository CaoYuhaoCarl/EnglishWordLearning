"use client";

import { motion } from "framer-motion";
import { Timer as TimerIcon } from "lucide-react";

interface TimerProps {
  timeLeft: number;
  totalTime: number;
}

export function Timer({ timeLeft, totalTime }: TimerProps) {
  const progress = (timeLeft / totalTime) * 100;
  
  return (
    <motion.div 
      className="flex items-center justify-center mb-6"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative inline-flex items-center px-6 py-3 rounded-full bg-matcha-50">
        <TimerIcon className="w-5 h-5 text-matcha-600 mr-2" />
        <span className="font-semibold">{timeLeft}s</span>
        <div 
          className="absolute bottom-0 left-0 h-1 bg-matcha-400 rounded-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
}