import { Card } from "@/components/ui/card";
import { Flame, Loader2 } from "lucide-react";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useAuth } from "@/providers/AuthProvider";
import { SampleDataAlert } from "@/components/auth/SampleDataAlert";

export function StreakDisplay() {
  const { currentStreak, isLoading } = useUserProgress();
  const { user } = useAuth();
  const streakText = currentStreak === 1 ? "1 Day" : `${currentStreak} Days`;
  
  return (
    <div className="flex items-center gap-2">
      <Card className="inline-flex items-center gap-3 px-6 py-3 bg-duo-50 rounded-2xl border-2 border-duo-200">
        {isLoading ? (
          <Loader2 className="w-6 h-6 animate-spin text-duo-500" />
        ) : (
          <>
            <Flame className="w-6 h-6 text-duo-500 animate-breathe" />
            <span className="font-bold text-duo-800">{streakText}</span>
          </>
        )}
      </Card>
      {!user && <div className="md:hidden"><SampleDataAlert /></div>}
    </div>
  );
}