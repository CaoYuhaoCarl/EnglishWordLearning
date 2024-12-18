import { Score } from '@/lib/types/score';

// In-memory storage for demo purposes
let scoreStorage: Score[] = [];

export async function saveScore(score: Score): Promise<void> {
  scoreStorage = [score, ...scoreStorage];
}

export async function getScoreHistory(userId: string): Promise<Score[]> {
  return scoreStorage.filter(score => score.userId === userId);
}

export async function getScoreStats(userId: string) {
  const userScores = await getScoreHistory(userId);
  
  return {
    totalAttempts: userScores.length,
    totalCorrect: userScores.reduce((sum, score) => sum + score.correct, 0),
    averageAccuracy: userScores.length > 0
      ? (userScores.reduce((sum, score) => sum + (score.correct / score.total), 0) / userScores.length) * 100
      : 0,
    pkWinRate: calculatePKWinRate(userScores),
    studyStreak: calculateStudyStreak(userScores),
  };
}

function calculatePKWinRate(scores: Score[]): number {
  const pkScores = scores.filter(score => score.type === 'pk') as any[];
  if (pkScores.length === 0) return 0;
  
  const wins = pkScores.filter(score => score.playerScore > score.opponentScore).length;
  return (wins / pkScores.length) * 100;
}

function calculateStudyStreak(scores: Score[]): number {
  const studyScores = scores
    .filter(score => score.type === 'study')
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
  if (studyScores.length === 0) return 0;
  
  let streak = 0;
  let currentDate = new Date();
  
  for (const score of studyScores) {
    const scoreDate = new Date(score.timestamp);
    const diffDays = Math.floor((currentDate.getTime() - scoreDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === streak) {
      streak++;
      currentDate = scoreDate;
    } else {
      break;
    }
  }
  
  return streak;
}