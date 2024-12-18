"use client";

import { useState, useEffect, useCallback } from 'react';
import { useAIOpponent } from './useAIOpponent';
import { useQuestionGenerator } from './useQuestionGenerator';
import { useScoreTracking } from './useScoreTracking';
import type { PKBattleState, Player } from '@/lib/types/pk-battle';

const MOCK_PLAYER: Player = {
  id: "user-1",
  name: "You",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=player1"
};

const AI_OPPONENT: Player = {
  id: "ai-1",
  name: "AI Opponent",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ai",
  isAI: true
};

export function usePKBattle(
  userId: string, 
  totalRounds: number = 10, 
  timePerRound: number = 15,
  aiDifficulty: 'easy' | 'medium' | 'hard' = 'medium'
) {
  const { trackPKScore } = useScoreTracking(userId);
  const { getAIAnswer } = useAIOpponent(aiDifficulty);
  const { generateQuestion } = useQuestionGenerator();
  
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
      player1: MOCK_PLAYER,
      player2: AI_OPPONENT
    },
    playedWords: []
  });

  const handleGameComplete = useCallback(() => {
    setBattleState(prev => ({
      ...prev,
      gameStatus: 'complete'
    }));

    trackPKScore({
      userId,
      type: 'pk',
      opponentId: AI_OPPONENT.id,
      playerScore: battleState.scores.player1,
      opponentScore: battleState.scores.player2,
      correct: battleState.scores.player1,
      total: totalRounds,
      details: {
        wordIds: battleState.playedWords,
        timeSpent: (totalRounds - battleState.timeLeft) * timePerRound,
        difficulty: aiDifficulty
      }
    });
  }, [userId, battleState.scores, battleState.playedWords, battleState.timeLeft, totalRounds, timePerRound, trackPKScore, aiDifficulty]);

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
  }, [battleState.selectedAnswer, battleState.isRoundComplete, battleState.currentTurn, battleState.currentQuestion]);

  // Handle AI Turn
  useEffect(() => {
    if (battleState.gameStatus === 'playing' && 
        battleState.currentTurn === 'player2' && 
        battleState.players.player2.isAI &&
        battleState.currentQuestion) {
      
      getAIAnswer(battleState.currentQuestion).then(aiAnswer => {
        const isCorrect = aiAnswer === battleState.currentQuestion?.correctIndex;
        
        setBattleState(prev => ({
          ...prev,
          selectedAnswer: aiAnswer,
          scores: {
            ...prev.scores,
            player2: isCorrect ? prev.scores.player2 + 1 : prev.scores.player2
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
      });
    }
  }, [battleState, getAIAnswer, totalRounds, handleGameComplete, startNewRound]);

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
    if (battleState.gameStatus === 'waiting') {
      startNewRound();
    }
  }, [battleState.gameStatus, startNewRound]);

  return {
    battleState,
    actions: {
      startNewRound,
      selectAnswer,
    },
  };
}