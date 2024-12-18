"use client";

import { motion } from "framer-motion";
import { PlayerInfo } from "./player-info";
import type { PKBattleState } from "@/lib/types/pk-battle";

interface ScoreDisplayProps {
  battleState: PKBattleState;
}

export function ScoreDisplay({ battleState }: ScoreDisplayProps) {
  const { players, scores, currentTurn } = battleState;

  return (
    <motion.div 
      className="flex justify-between items-center mb-8 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PlayerInfo 
        player={players.player1}
        score={scores.player1}
        isCurrentTurn={currentTurn === 'player1'}
      />
      <div className="text-2xl font-bold text-matcha-600">
        vs
      </div>
      <PlayerInfo 
        player={players.player2}
        score={scores.player2}
        isCurrentTurn={currentTurn === 'player2'}
      />
    </motion.div>
  );
}