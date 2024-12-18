"use client";

import { useCallback } from 'react';
import { vocabularyData } from '@/lib/data';
import type { PKQuestion } from '@/lib/types/pk-battle';

export function useQuestionGenerator() {
  const generateQuestion = useCallback((playedWords: string[]): PKQuestion => {
    // Filter out already played words
    const availableWords = vocabularyData.filter(w => !playedWords.includes(w.id));
    
    // If all words have been played, reset the pool
    const words = availableWords.length > 0 ? availableWords : vocabularyData;
    
    // Select a random word
    const correctWord = words[Math.floor(Math.random() * words.length)];
    
    // Get other words for incorrect options
    const otherWords = vocabularyData
      .filter(w => w.id !== correctWord.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    // Randomly place correct answer
    const correctIndex = Math.floor(Math.random() * 4);
    const options = otherWords.map(w => w.meaning);
    options.splice(correctIndex, 0, correctWord.meaning);

    return {
      word: correctWord,
      options,
      correctIndex,
    };
  }, []);

  return { generateQuestion };
}