"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PKLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentMode = pathname === "/pk/class" ? "class" : "ai";

  return (
    <div>
      <div className="container mx-auto px-4 pt-8">
        <Tabs value={currentMode} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="ai" asChild>
              <Link href="/pk">AI Opponent</Link>
            </TabsTrigger>
            <TabsTrigger value="class" asChild>
              <Link href="/pk/class">Class Battle</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {children}
    </div>
  );
}