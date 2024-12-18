"use client";

import { Trophy, Timer } from "lucide-react";
import type { PKBattleState } from "@/lib/types/pk-battle";

interface ScoreBoardProps {
  battleState: PKBattleState;
}

export function ScoreBoard({ battleState }: ScoreBoardProps) {
  const { scores, timeLeft, currentRound, totalRounds, players } = battleState;

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
        </div>
      </div>
      
      <div className="text-center text-muted-foreground">
        Round {currentRound} of {totalRounds}
      </div>
    </div>
  );
}