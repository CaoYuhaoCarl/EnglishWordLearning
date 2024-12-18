"use client";

import { useCallback } from 'react';
import type { PKQuestion } from '@/lib/types/pk-battle';

// AI difficulty levels
export type AIDifficulty = 'easy' | 'medium' | 'hard';

interface AIConfig {
  difficulty: AIDifficulty;
  baseAccuracy: number;
  minDelay: number;
  maxDelay: number;
}

const AI_CONFIGS: Record<AIDifficulty, AIConfig> = {
  easy: {
    difficulty: 'easy',
    baseAccuracy: 0.5, // 50% accuracy
    minDelay: 2000,
    maxDelay: 4000
  },
  medium: {
    difficulty: 'medium',
    baseAccuracy: 0.7, // 70% accuracy
    minDelay: 1500,
    maxDelay: 3000
  },
  hard: {
    difficulty: 'hard',
    baseAccuracy: 0.85, // 85% accuracy
    minDelay: 1000,
    maxDelay: 2000
  }
};

export function useAIOpponent(difficulty: AIDifficulty = 'medium') {
  const config = AI_CONFIGS[difficulty];

  const getAIAnswer = useCallback((question: PKQuestion): Promise<number> => {
    return new Promise((resolve) => {
      // Determine if AI will answer correctly based on difficulty
      const willAnswerCorrectly = Math.random() < config.baseAccuracy;
      
      // If answering correctly, use correct index
      // If not, choose a random wrong answer
      let answerIndex: number;
      if (willAnswerCorrectly) {
        answerIndex = question.correctIndex;
      } else {
        const wrongIndices = [0, 1, 2, 3].filter(i => i !== question.correctIndex);
        answerIndex = wrongIndices[Math.floor(Math.random() * wrongIndices.length)];
      }

      // Add random delay based on difficulty
      const delay = Math.random() * (config.maxDelay - config.minDelay) + config.minDelay;
      setTimeout(() => resolve(answerIndex), delay);
    });
  }, [config]);

  return {
    getAIAnswer,
    config
  };
}