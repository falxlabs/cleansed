import { Card } from "@/components/ui/card";
import { Flame, Loader2 } from "lucide-react";
import { useUserProgress } from "@/hooks/useUserProgress";

export function StreakDisplay() {
  const { currentStreak, isLoading } = useUserProgress();
  const streakText = currentStreak === 1 ? "1 Day" : `${currentStreak} Days`;
  
  return (
    <Card className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 
                    bg-white hover:bg-[#F2FCE2] transition-colors duration-200 
                    rounded-2xl border-2 border-duo-200">
      {isLoading ? (
        <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-duo-500" />
      ) : (
        <>
          <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-duo-500 animate-breathe" />
          <span className="text-sm sm:text-base font-bold text-black">{streakText}</span>
        </>
      )}
    </Card>
  );
}