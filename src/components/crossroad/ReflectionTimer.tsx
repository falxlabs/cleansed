import { useEffect, useState } from "react";
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
        description: "Your 5 minutes are up. Make your choice.",
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
    <Card className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm border-2 border-gray-200 shadow-lg">
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-2 sm:gap-3 text-gray-900">
          <h3 className="text-xl sm:text-2xl font-bold">The 5 Minute Rule</h3>
        </div>
        
        <div className="text-3xl sm:text-4xl font-bold text-center text-gray-900 font-mono tracking-wider">
          {formatTime(timeLeft)}
        </div>
        
        <Progress 
          value={progressPercentage} 
          className="h-2 sm:h-3 bg-gray-100" 
          indicatorClassName="bg-duo-500"
        />

        <SuggestionCarousel />
      </div>
    </Card>
  );
}