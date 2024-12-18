"use client";

import { useState } from 'react';
import { useClassPKBattle } from '@/lib/hooks/useClassPKBattle';
import { ClassScoreBoard } from '@/components/pk/class-score-board';
import { BattleCard } from '@/components/pk/battle-card';
import { GameOver } from '@/components/pk/game-over';
import { TurnIndicator } from '@/components/pk/turn-indicator';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { studentsData } from '@/lib/data';

const MOCK_USER_ID = "s1"; // For demo purposes

export default function ClassPKPage() {
  const [selectedOpponentId, setSelectedOpponentId] = useState<string | null>(null);
  const { battleState, actions } = useClassPKBattle(MOCK_USER_ID, selectedOpponentId);

  if (!selectedOpponentId) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Class PK Mode</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {studentsData
            .filter(student => student.id !== MOCK_USER_ID)
            .map(student => (
              <Card key={student.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Level: {student.level}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                  <span>Words Learned: {student.progress.wordsLearned}</span>
                  <span>PK Wins: {student.progress.pkWins}</span>
                </div>
                <Button 
                  className="w-full"
                  onClick={() => setSelectedOpponentId(student.id)}
                >
                  Challenge
                </Button>
              </Card>
            ))}
        </div>
      </div>
    );
  }

  if (battleState.gameStatus === 'complete') {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <GameOver 
          battleState={battleState} 
          onRestart={() => setSelectedOpponentId(null)}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <ClassScoreBoard battleState={battleState} />
      <div className="my-8">
        <TurnIndicator battleState={battleState} />
        <BattleCard 
          battleState={battleState}
          onSelectAnswer={actions.selectAnswer}
        />
      </div>
    </div>
  );
}