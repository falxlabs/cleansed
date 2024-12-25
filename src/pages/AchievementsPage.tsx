import { Card } from "@/components/ui/card";
import { Flame, ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUserProgress } from "@/hooks/useUserProgress";

export default function AchievementsPage() {
  const navigate = useNavigate();
  const { currentStreak, longestStreak, isLoading, error } = useUserProgress();
  const flameSize = Math.min(20 + currentStreak * 2, 64);
  
  if (error) {
    console.error('Error loading user progress:', error);
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-primary/10 p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Your Journey</h1>
        </div>

        <Card className="p-4 sm:p-6 bg-white/50 backdrop-blur-sm border-primary/20">
          <div className="prose prose-green max-w-none">
            <h2 className="text-lg sm:text-xl font-semibold text-primary mb-2 sm:mb-4">Focus on Progress</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Every check-in counts. Your daily commitment to reflection and growth matters more than perfection.
            </p>
          </div>
        </Card>
        
        <Card className="p-4 sm:p-6 space-y-4">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Current Streak</h2>
            <div className="flex flex-col items-center gap-2">
              {isLoading ? (
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              ) : (
                <>
                  <Flame 
                    className="text-primary animate-breathe"
                    style={{ 
                      width: `${flameSize}px`, 
                      height: `${flameSize}px`,
                      transition: 'width 0.3s, height 0.3s'
                    }}
                  />
                  <p className="text-lg font-medium text-gray-700">
                    {currentStreak === 1 ? "1 Day" : `${currentStreak} Days`}
                  </p>
                  {longestStreak > currentStreak && (
                    <p className="text-sm text-gray-500">
                      Longest streak: {longestStreak} days
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Check-in Milestones</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[7, 30, 90, 180, 365].map((milestone) => (
                <Card 
                  key={milestone}
                  className={`p-3 sm:p-4 ${currentStreak >= milestone ? 'bg-primary/10 border-primary/20' : 'bg-gray-50 border-gray-200'}`}
                >
                  <div className="flex items-center gap-3">
                    <Flame className={`w-5 h-5 ${currentStreak >= milestone ? 'text-primary' : 'text-gray-400'}`} />
                    <span className={`font-medium ${currentStreak >= milestone ? 'text-primary-foreground' : 'text-gray-500'}`}>
                      {milestone} Days of Growth
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}