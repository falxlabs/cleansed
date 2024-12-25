import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { SuggestionCarousel } from "./SuggestionCarousel";

const TIMER_DURATION = 300;
const UNLOCK_DURATION = 3; // Changed from 5 to 3 seconds

interface ReflectionTimerProps {
  onComplete?: () => void;
  onUnlockTimeChange: (time: number) => void;
}

export function ReflectionTimer({ onComplete, onUnlockTimeChange }: ReflectionTimerProps) {
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [unlockTime, setUnlockTime] = useState(UNLOCK_DURATION);
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

  useEffect(() => {
    if (unlockTime <= 0) return;

    const timer = setInterval(() => {
      setUnlockTime((prev) => {
        const newTime = prev - 1;
        onUnlockTimeChange(newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [unlockTime, onUnlockTimeChange]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((TIMER_DURATION - timeLeft) / TIMER_DURATION) * 100;

  return (
    <Card className="p-6 sm:p-8 bg-white/90 backdrop-blur-sm border-2 border-gray-200 shadow-lg">
      <div className="space-y-6 sm:space-y-8">
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-900">
            The 5 Minute Rule
          </h3>
          
          <div className="text-3xl sm:text-4xl font-bold text-center text-gray-900 font-mono tracking-wider">
            {formatTime(timeLeft)}
          </div>
        </div>
        
        <Progress 
          value={progressPercentage} 
          className="h-2.5 sm:h-3 bg-gray-100" 
          indicatorClassName="bg-duo-500"
        />

        <div className="pt-2">
          <SuggestionCarousel />
        </div>
      </div>
    </Card>
  );
}
