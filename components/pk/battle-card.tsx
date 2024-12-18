"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PKBattleState } from "@/lib/types/pk-battle";
import { motion } from "framer-motion";

interface BattleCardProps {
  battleState: PKBattleState;
  onSelectAnswer: (index: number) => void;
}

export function BattleCard({ battleState, onSelectAnswer }: BattleCardProps) {
  const { currentQuestion, selectedAnswer } = battleState;
  if (!currentQuestion) return null;

  return (
    <Card className="p-8 backdrop-blur-sm bg-white/80 dark:bg-black/80">
      <motion.h2 
        className="text-3xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {currentQuestion.word.word}
      </motion.h2>
      <p className="text-muted-foreground text-center mb-8">
        {currentQuestion.word.pronunciation}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === currentQuestion.correctIndex;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Button
                variant={
                  selectedAnswer !== null
                    ? isCorrect
                      ? "default"
                      : isSelected
                      ? "destructive"
                      : "outline"
                    : "outline"
                }
                className={cn(
                  "w-full p-6 h-auto text-left transition-all text-base",
                  isSelected && isCorrect && "bg-green-500 hover:bg-green-600",
                  isSelected && !isCorrect && "bg-red-500 hover:bg-red-600",
                  !selectedAnswer && "hover:bg-matcha-50 hover:border-matcha-400"
                )}
                onClick={() => onSelectAnswer(index)}
                disabled={selectedAnswer !== null}
              >
                {option}
              </Button>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}