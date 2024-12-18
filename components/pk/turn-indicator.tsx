"use client";

import { cn } from "@/lib/utils";
import { PKBattleState } from "@/lib/types/pk-battle";

interface TurnIndicatorProps {
  battleState: PKBattleState;
}

export function TurnIndicator({ battleState }: TurnIndicatorProps) {
  const { currentTurn, players } = battleState;
  const currentPlayer = currentTurn === 'player1' ? players.player1 : players.player2;

  return (
    <div className="flex items-center justify-center mb-4">
      <div className="bg-primary/10 px-6 py-3 rounded-full">
        <div className="flex items-center gap-3">
          <img
            src={currentPlayer.avatar}
            alt={currentPlayer.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="font-semibold">
            {currentPlayer.name}'s Turn
          </span>
        </div>
      </div>
    </div>
  );
}