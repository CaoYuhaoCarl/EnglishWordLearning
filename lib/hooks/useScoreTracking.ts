"use client";

import { useState, useCallback } from 'react';
import { Score, PKScore, StudyScore } from '@/lib/types/score';
import { saveScore, getScoreHistory } from '@/lib/services/score-service';

export function useScoreTracking(userId: string) {
  const [currentScore, setCurrentScore] = useState<Score | null>(null);
  const [scoreHistory, setScoreHistory] = useState<Score[]>([]);

  const trackStudyScore = useCallback(async (score: Omit<StudyScore, 'timestamp'>) => {
    const newScore: StudyScore = {
      ...score,
      timestamp: new Date().toISOString(),
    };
    
    await saveScore(newScore);
    setCurrentScore(newScore);
    setScoreHistory(prev => [newScore, ...prev]);
    
    return newScore;
  }, []);

  const trackPKScore = useCallback(async (score: Omit<PKScore, 'timestamp'>) => {
    const newScore: PKScore = {
      ...score,
      timestamp: new Date().toISOString(),
    };
    
    await saveScore(newScore);
    setCurrentScore(newScore);
    setScoreHistory(prev => [newScore, ...prev]);
    
    return newScore;
  }, []);

  const loadScoreHistory = useCallback(async () => {
    const history = await getScoreHistory(userId);
    setScoreHistory(history);
  }, [userId]);

  return {
    currentScore,
    scoreHistory,
    trackStudyScore,
    trackPKScore,
    loadScoreHistory,
  };
}