"use client";

import { motion } from "framer-motion";
import { Swords } from "lucide-react";

export function PKHeader() {
  return (
    <motion.div 
      className="text-center mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-matcha-100">
        <Swords className="w-6 h-6 text-matcha-600" />
      </div>
      <h1 className="text-3xl font-bold mb-2">Vocabulary Battle</h1>
      <p className="text-muted-foreground">Challenge yourself and compete with others</p>
    </motion.div>
  );
}