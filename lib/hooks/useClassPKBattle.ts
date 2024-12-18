"use client";

import { useState, useEffect, useCallback } from 'react';
import { useQuestionGenerator } from './useQuestionGenerator';
import { useScoreTracking } from './useScoreTracking';
import { studentsData } from '@/lib/data';
import type { PKBattleState, Player } from '@/lib/types/pk-battle';

export function useClassPKBattle(
  userId: string,
  opponentId: string | null,
  totalRounds: number = 10,
  timePerRound: number = 15
) {
  const { trackPKScore } = useScoreTracking(userId);
  const { generateQuestion } = useQuestionGenerator();

  const currentUser = studentsData.find(s => s.id === userId);
  const opponent = opponentId ? studentsData.find(s => s.id === opponentId) : null;

  const [battleState, setBattleState] = useState<PKBattleState>({
    currentRound: 1,
    totalRounds,
    timeLeft: timePerRound,
    scores: { player1: 0, player2: 0 },
    currentQuestion: null,
    selectedAnswer: null,
    isRoundComplete: false,
    gameStatus: 'waiting',
    currentTurn: 'player1',
    players: {
      player1: currentUser ? {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar
      } : { id: userId, name: 'You' },
      player2: opponent ? {
        id: opponent.id,
        name: opponent.name,
        avatar: opponent.avatar
      } : { id: 'opponent', name: 'Opponent' }
    },
    playedWords: []
  });

  const handleGameComplete = useCallback(() => {
    setBattleState(prev => ({
      ...prev,
      gameStatus: 'complete'
    }));

    if (opponent) {
      trackPKScore({
        userId,
        type: 'pk',
        opponentId: opponent.id,
        playerScore: battleState.scores.player1,
        opponentScore: battleState.scores.player2,
        correct: battleState.scores.player1,
        total: totalRounds,
        details: {
          wordIds: battleState.playedWords,
          timeSpent: (totalRounds - battleState.timeLeft) * timePerRound,
          difficulty: 'medium'
        }
      });
    }
  }, [userId, opponent, battleState.scores, battleState.playedWords, battleState.timeLeft, totalRounds, timePerRound, trackPKScore]);

  const startNewRound = useCallback(() => {
    if (battleState.currentRound > totalRounds) {
      handleGameComplete();
      return;
    }

    setBattleState(prev => ({
      ...prev,
      currentQuestion: generateQuestion(prev.playedWords),
      selectedAnswer: null,
      isRoundComplete: false,
      timeLeft: timePerRound,
      gameStatus: 'playing',
      currentTurn: 'player1'
    }));
  }, [battleState.currentRound, totalRounds, generateQuestion, timePerRound, handleGameComplete]);

  const selectAnswer = useCallback((index: number) => {
    if (battleState.selectedAnswer !== null || 
        battleState.isRoundComplete || 
        battleState.currentTurn !== 'player1') return;

    const isCorrect = index === battleState.currentQuestion?.correctIndex;

    setBattleState(prev => ({
      ...prev,
      selectedAnswer: index,
      scores: {
        ...prev.scores,
        player1: isCorrect ? prev.scores.player1 + 1 : prev.scores.player1
      },
      currentTurn: 'player2',
      playedWords: [...prev.playedWords, prev.currentQuestion?.word.id || '']
    }));

    // Simulate opponent's turn
    setTimeout(() => {
      const opponentCorrect = Math.random() > 0.3; // 70% chance to be correct
      const opponentAnswer = opponentCorrect 
        ? battleState.currentQuestion?.correctIndex 
        : Math.floor(Math.random() * 4);

      setBattleState(prev => ({
        ...prev,
        selectedAnswer: opponentAnswer,
        scores: {
          ...prev.scores,
          player2: opponentCorrect ? prev.scores.player2 + 1 : prev.scores.player2
        },
        isRoundComplete: true,
        currentRound: prev.currentRound + 1,
        currentTurn: 'player1'
      }));

      if (battleState.currentRound >= totalRounds) {
        handleGameComplete();
      } else {
        setTimeout(() => startNewRound(), 2000);
      }
    }, 1500);
  }, [battleState, handleGameComplete, startNewRound]);

  // Timer Effect
  useEffect(() => {
    if (battleState.gameStatus !== 'playing' || battleState.isRoundComplete) return;

    const timer = setInterval(() => {
      setBattleState(prev => {
        if (prev.timeLeft <= 1) {
          clearInterval(timer);
          if (prev.currentTurn === 'player1') {
            selectAnswer(-1); // Timeout for player
          }
          return {
            ...prev,
            timeLeft: 0,
            isRoundComplete: true,
            currentTurn: prev.currentTurn === 'player1' ? 'player2' : 'player1'
          };
        }
        return {
          ...prev,
          timeLeft: prev.timeLeft - 1
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [battleState.gameStatus, battleState.isRoundComplete, selectAnswer]);

  // Start game effect
  useEffect(() => {
    if (battleState.gameStatus === 'waiting' && opponent) {
      startNewRound();
    }
  }, [battleState.gameStatus, opponent, startNewRound]);

  return {
    battleState,
    actions: {
      startNewRound,
      selectAnswer,
    },
  };
}