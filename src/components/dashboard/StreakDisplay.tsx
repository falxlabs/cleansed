import { Card } from "@/components/ui/card";
import { Flame } from "lucide-react";

interface StreakDisplayProps {
  streak: number;
}

export function StreakDisplay({ streak }: StreakDisplayProps) {
  return (
    <Card className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10">
      <Flame className="w-5 h-5 text-primary animate-breathe" />
      <span className="font-semibold">{streak} Days</span>
    </Card>
  );
}