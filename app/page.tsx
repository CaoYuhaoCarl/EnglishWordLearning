"use client";

import { HeroSection } from "@/components/home/hero-section";
import { FeaturesGrid } from "@/components/home/features-grid";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-matcha-50/50">
      <div className="container mx-auto px-4 py-16">
        <HeroSection />
        <FeaturesGrid />
      </div>
    </main>
  );
}