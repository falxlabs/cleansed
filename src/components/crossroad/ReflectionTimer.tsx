import { useEffect, useState } from "react";
import { Timer } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const TIMER_DURATION = 300;

interface ReflectionTimerProps {
  onComplete?: () => void;
}

export function ReflectionTimer({ onComplete }: ReflectionTimerProps) {
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const { toast } = useToast();
  
  useEffect(() => {
    if (timeLeft <= 0) {
      toast({
        title: "Time's up!",
        description: "Your breathing exercise is complete. Make your choice.",
      });
      onComplete?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, toast, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((TIMER_DURATION - timeLeft) / TIMER_DURATION) * 100;

  return (
    <Card className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm border-2 border-purple-100/50 shadow-lg">
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center justify-center gap-2 sm:gap-3 text-purple-700">
          <Timer className="h-6 w-6 sm:h-8 sm:w-8 animate-pulse" />
          <h3 className="text-xl sm:text-2xl font-bold">Reflection Timer</h3>
        </div>
        
        <div className="text-3xl sm:text-4xl font-bold text-center text-purple-800 font-mono tracking-wider">
          {formatTime(timeLeft)}
        </div>
        
        <Progress 
          value={progressPercentage} 
          className="h-2 sm:h-3 bg-purple-100" 
          indicatorClassName="bg-purple-500"
        />
      </div>
    </Card>
  );
}