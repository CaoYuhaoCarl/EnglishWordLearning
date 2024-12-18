"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = {
  weeklyProgress: [
    { day: "Mon", words: 25 },
    { day: "Tue", words: 40 },
    { day: "Wed", words: 30 },
    { day: "Thu", words: 45 },
    { day: "Fri", words: 35 },
    { day: "Sat", words: 50 },
    { day: "Sun", words: 42 }
  ],
  stats: {
    totalWords: 267,
    accuracy: 85,
    streak: 7,
    pkWins: 12
  }
};

export default function StatsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Learning Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Words</h3>
          <p className="text-2xl font-bold">{mockData.stats.totalWords}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Accuracy</h3>
          <p className="text-2xl font-bold">{mockData.stats.accuracy}%</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Daily Streak</h3>
          <p className="text-2xl font-bold">{mockData.stats.streak} days</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">PK Wins</h3>
          <p className="text-2xl font-bold">{mockData.stats.pkWins}</p>
        </Card>
      </div>

      <Tabs defaultValue="progress" className="space-y-4">
        <TabsList>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
        </TabsList>
        <TabsContent value="progress" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Weekly Learning Progress</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData.weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="words" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="accuracy">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Learning Accuracy</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Study Mode</span>
                  <span>90%</span>
                </div>
                <Progress value={90} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>PK Mode</span>
                  <span>85%</span>
                </div>
                <Progress value={85} />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}