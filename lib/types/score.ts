export interface Score {
  userId: string;
  timestamp: string;
  type: 'study' | 'pk';
  correct: number;
  total: number;
  details?: {
    wordIds: string[];
    timeSpent: number;
    difficulty: 'easy' | 'medium' | 'hard';
  };
}

export interface PKScore extends Score {
  type: 'pk';
  opponentId: string;
  playerScore: number;
  opponentScore: number;
}

export interface StudyScore extends Score {
  type: 'study';
  streakCount: number;
  masteryLevel: number;
}