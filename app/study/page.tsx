"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { VolumeUp, Check, X, ArrowRight } from "lucide-react";

const mockWords = [
  { id: 1, word: "ephemeral", meaning: "lasting for a very short time", pronunciation: "/ɪˈfem(ə)rəl/" },
  { id: 2, word: "ubiquitous", meaning: "present, appearing, or found everywhere", pronunciation: "/juːˈbɪkwɪtəs/" },
  { id: 3, word: "serendipity", meaning: "the occurrence of finding pleasant things by chance", pronunciation: "/ˌserənˈdɪpɪti/" },
];

export default function StudyPage() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentWord = mockWords[currentWordIndex];

  const handleNext = () => {
    if (currentWordIndex < mockWords.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
      setShowMeaning(false);
      setProgress((currentWordIndex + 1) * (100 / mockWords.length));
    }
  };

  const handleReveal = () => {
    setShowMeaning(true);
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Study Mode</h1>
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2">
          {currentWordIndex + 1} of {mockWords.length} words
        </p>
      </div>

      <Card className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{currentWord.word}</h2>
          <Button variant="ghost" size="icon">
            <VolumeUp className="h-5 w-5" />
          </Button>
        </div>

        <p className="text-muted-foreground mb-4">{currentWord.pronunciation}</p>

        {showMeaning ? (
          <div className="space-y-6">
            <p className="text-lg">{currentWord.meaning}</p>
            <div className="flex gap-4">
              <Button onClick={handleNext} className="w-full">
                Next Word <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <Button onClick={handleReveal} variant="outline" className="w-full">
            Reveal Meaning
          </Button>
        )}
      </Card>
    </div>
  );
}