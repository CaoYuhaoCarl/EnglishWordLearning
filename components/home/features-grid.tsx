"use client";

import { BookOpen, Swords, BarChart3 } from "lucide-react";
import { FeatureCard } from "./feature-card";

const features = [
  {
    href: "/study",
    icon: BookOpen,
    title: "Study Mode",
    description: "Learn and memorize new vocabulary through intensive training"
  },
  {
    href: "/pk",
    icon: Swords,
    title: "PK Mode",
    description: "Challenge other learners in real-time vocabulary battles"
  },
  {
    href: "/stats",
    icon: BarChart3,
    title: "Statistics",
    description: "Track your progress and view detailed learning analytics"
  }
];

export function FeaturesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      {features.map((feature, index) => (
        <FeatureCard
          key={feature.href}
          {...feature}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
}