"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, BarChart3 } from "lucide-react";
import Link from 'next/link';
import type { PKBattleState } from "@/lib/types/pk-battle";

interface GameOverProps {
  battleState: PKBattleState;
  onRestart: () => void;
}

export function GameOver({ battleState, onRestart }: GameOverProps) {
  const { scores } = battleState;
  const playerWon = scores.player1 > scores.player2;
  const isDraw = scores.player1 === scores.player2;

  return (
    <Card className="p-8 text-center">
      <div className="mb-6">
        <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
        <h2 className="text-2xl font-bold mb-2">
          {isDraw ? "It's a Draw!" : playerWon ? "Victory!" : "Better Luck Next Time!"}
        </h2>
        <p className="text-muted-foreground mb-4">
          Final Score: {scores.player1} - {scores.player2}
        </p>
        <p className="text-sm text-muted-foreground">
          Your score has been recorded and added to your statistics!
        </p>
      </div>
      
      <div className="flex flex-col gap-4">
        <Button onClick={onRestart}>
          Play Again
        </Button>
        <Link href="/stats" className="w-full">
          <Button variant="outline" className="w-full">
            <BarChart3 className="w-4 h-4 mr-2" />
            View Statistics
          </Button>
        </Link>
      </div>
    </Card>
  );
}