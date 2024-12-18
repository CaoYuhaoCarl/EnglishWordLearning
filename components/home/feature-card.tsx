"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface FeatureCardProps {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export function FeatureCard({ href, icon: Icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <Link href={href} className="block">
      <motion.div
        className="group card-hover"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
      >
        <div className="bg-card p-8 rounded-2xl border border-border flex flex-col items-center gap-4">
          <div className="p-4 bg-matcha-100 rounded-full group-hover:bg-matcha-200 transition-colors">
            <Icon className="w-8 h-8 text-matcha-600" />
          </div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground text-center">
            {description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}