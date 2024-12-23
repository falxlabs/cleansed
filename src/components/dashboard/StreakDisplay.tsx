import { Card } from "@/components/ui/card";
import { Flame } from "lucide-react";

interface StreakDisplayProps {
  streak: number;
}

export function StreakDisplay({ streak }: StreakDisplayProps) {
  return (
    <Card className="inline-flex items-center gap-3 px-6 py-3 bg-duo-50 rounded-2xl border-2 border-duo-200">
      <Flame className="w-6 h-6 text-duo-500 animate-breathe" />
      <span className="font-bold text-duo-800">{streak} Days</span>
    </Card>
  );
}