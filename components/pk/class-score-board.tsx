"use client";

import { Trophy, Timer, BookOpen } from "lucide-react";
import type { PKBattleState } from "@/lib/types/pk-battle";
import { studentsData } from "@/lib/data";

interface ClassScoreBoardProps {
  battleState: PKBattleState;
}

export function ClassScoreBoard({ battleState }: ClassScoreBoardProps) {
  const { scores, timeLeft, currentRound, totalRounds, players } = battleState;
  const player1Data = studentsData.find(s => s.id === players.player1.id);
  const player2Data = studentsData.find(s => s.id === players.player2.id);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-center flex flex-col items-center">
          <img
            src={players.player1.avatar}
            alt={players.player1.name}
            className="w-12 h-12 rounded-full mb-2"
          />
          <p className="text-lg font-semibold">{players.player1.name}</p>
          <p className="text-3xl font-bold">{scores.player1}</p>
          {player1Data && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
              <BookOpen className="w-4 h-4" />
              <span>{player1Data.progress.wordsLearned} words</span>
            </div>
          )}
        </div>
        
        <div className="bg-primary/10 px-6 py-3 rounded-full flex items-center">
          <Timer className="w-5 h-5 mr-2" />
          <span className="text-xl font-bold">{timeLeft}s</span>
        </div>
        
        <div className="text-center flex flex-col items-center">
          <img
            src={players.player2.avatar}
            alt={players.player2.name}
            className="w-12 h-12 rounded-full mb-2"
          />
          <p className="text-lg font-semibold">{players.player2.name}</p>
          <p className="text-3xl font-bold">{scores.player2}</p>
          {player2Data && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
              <BookOpen className="w-4 h-4" />
              <span>{player2Data.progress.wordsLearned} words</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="text-center text-muted-foreground">
        Round {currentRound} of {totalRounds}
      </div>
    </div>
  );
}