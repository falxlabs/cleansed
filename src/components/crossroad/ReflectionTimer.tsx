import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { SuggestionCarousel } from "./SuggestionCarousel";

const TIMER_DURATION = 300;
const UNLOCK_DURATION = 3;

interface ReflectionTimerProps {
  onComplete?: () => void;
  onUnlockTimeChange: (time: number) => void;
}

export function ReflectionTimer({ onComplete, onUnlockTimeChange }: ReflectionTimerProps) {
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [unlockTime, setUnlockTime] = useState(UNLOCK_DURATION);
  
  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

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

  return (
    <Card className="p-4 sm:p-6 bg-white/90 backdrop-blur-sm border-2 border-gray-200 shadow-lg">
      <div className="flex flex-col items-center gap-6">
        <div className="space-y-4 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
            The 5 Minute Rule
          </h3>
          <div className="text-3xl sm:text-4xl font-bold text-duo-500 font-mono">
            {formatTime(timeLeft)}
          </div>
        </div>
        
        <SuggestionCarousel />
      </div>
    </Card>
  );
}