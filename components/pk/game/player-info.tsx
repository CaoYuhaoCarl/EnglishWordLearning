"use client";

import { motion } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";
import type { Player } from "@/lib/types/pk-battle";

interface PlayerInfoProps {
  player: Player;
  score: number;
  isCurrentTurn: boolean;
}

export function PlayerInfo({ player, score, isCurrentTurn }: PlayerInfoProps) {
  return (
    <motion.div 
      className={`flex flex-col items-center ${isCurrentTurn ? 'scale-105' : 'opacity-80'}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: isCurrentTurn ? 1.05 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <Avatar className="w-12 h-12 mb-2">
        <img src={player.avatar} alt={player.name} className="object-cover" />
      </Avatar>
      <p className="font-semibold">{player.name}</p>
      <p className="text-2xl font-bold text-matcha-600">{score}</p>
      {isCurrentTurn && (
        <div className="mt-2 px-3 py-1 bg-matcha-100 rounded-full text-sm text-matcha-700">
          Current Turn
        </div>
      )}
    </motion.div>
  );
}