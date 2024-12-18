"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export function HeroSection() {
  return (
    <motion.div 
      className="text-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="inline-flex items-center justify-center p-4 mb-6 rounded-full bg-matcha-100">
        <BookOpen className="w-8 h-8 text-matcha-600" />
      </div>
      <h1 className="text-4xl font-bold mb-4">English Vocabulary PK</h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Challenge yourself and compete with others to master English vocabulary
      </p>
    </motion.div>
  );
}