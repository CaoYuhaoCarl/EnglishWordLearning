export interface WordProgress {
  userId: string;
  wordId: string;
  status: 'new' | 'learning' | 'mastered';
  lastReviewed: string;
  timesReviewed: number;
  correctAttempts: number;
  incorrectAttempts: number;
}

export interface PKHistory {
  id: string;
  date: string;
  player1Id: string;
  player2Id: string;
  player1Score: number;
  player2Score: number;
  wordsPlayed: string[];
}

export const wordProgressData: WordProgress[] = [
  {
    userId: "s1",
    wordId: "w1",
    status: "mastered",
    lastReviewed: "2024-01-20",
    timesReviewed: 5,
    correctAttempts: 4,
    incorrectAttempts: 1
  },
  {
    userId: "s1",
    wordId: "w2",
    status: "learning",
    lastReviewed: "2024-01-19",
    timesReviewed: 3,
    correctAttempts: 2,
    incorrectAttempts: 1
  },
  // Add more progress data as needed...
];

export const pkHistoryData: PKHistory[] = [
  {
    id: "pk1",
    date: "2024-01-20",
    player1Id: "s1",
    player2Id: "s2",
    player1Score: 8,
    player2Score: 6,
    wordsPlayed: ["w1", "w2", "w3"]
  },
  {
    id: "pk2",
    date: "2024-01-19",
    player1Id: "s2",
    player2Id: "s1",
    player1Score: 7,
    player2Score: 9,
    wordsPlayed: ["w2", "w3", "w1"]
  },
  // Add more PK history as needed...
];