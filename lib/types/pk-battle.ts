export interface Player {
  id: string;
  name: string;
  avatar?: string;
  isAI?: boolean;
}

export interface PKQuestion {
  word: Word;
  options: string[];
  correctIndex: number;
}

export interface PKBattleState {
  currentRound: number;
  totalRounds: number;
  timeLeft: number;
  scores: {
    player1: number;
    player2: number;
  };
  currentQuestion: PKQuestion | null;
  selectedAnswer: number | null;
  isRoundComplete: boolean;
  gameStatus: 'waiting' | 'playing' | 'complete';
  currentTurn: 'player1' | 'player2';
  players: {
    player1: Player;
    player2: Player;
  };
  playedWords: string[]; // Track played word IDs
}