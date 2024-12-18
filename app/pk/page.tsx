"use client";

import { usePKBattle } from "@/lib/hooks/usePKBattle";
import { PKHeader } from "@/components/pk/layout/pk-header";
import { Timer } from "@/components/pk/game/timer";
import { ScoreDisplay } from "@/components/pk/game/score-display";
import { RoundIndicator } from "@/components/pk/game/round-indicator";
import { BattleCard } from "@/components/pk/battle-card";
import { GameOver } from "@/components/pk/game-over";

const MOCK_USER_ID = "user-1";
const TIME_PER_ROUND = 15;

export default function PKPage() {
  const { battleState, actions } = usePKBattle(MOCK_USER_ID);

  if (battleState.gameStatus === 'complete') {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <GameOver 
          battleState={battleState} 
          onRestart={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <PKHeader />
      
      <div className="space-y-6">
        <ScoreDisplay battleState={battleState} />
        
        <div className="bg-white/50 dark:bg-black/50 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
          <RoundIndicator 
            currentRound={battleState.currentRound} 
            totalRounds={battleState.totalRounds} 
          />
          
          <Timer 
            timeLeft={battleState.timeLeft} 
            totalTime={TIME_PER_ROUND} 
          />
          
          <BattleCard 
            battleState={battleState}
            onSelectAnswer={actions.selectAnswer}
          />
        </div>
      </div>
    </div>
  );
}