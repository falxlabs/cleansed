import { Card } from "@/components/ui/card";
import { Flame } from "lucide-react";
import { calculateStreak } from "@/utils/journalEntries";

export default function AchievementsPage() {
  const streak = calculateStreak();
  const flameSize = Math.min(20 + streak * 2, 64); // Grows with streak but caps at 64px
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-primary/10 p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-900">Your Achievements</h1>
        
        <Card className="p-6 space-y-4">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Current Streak</h2>
            <div className="flex flex-col items-center gap-2">
              <Flame 
                className={`text-duo-500 animate-breathe`} 
                style={{ 
                  width: `${flameSize}px`, 
                  height: `${flameSize}px`,
                  transition: 'width 0.3s, height 0.3s'
                }}
              />
              <p className="text-lg font-medium text-gray-700">
                {streak === 1 ? "1 Day" : `${streak} Days`}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Streak Milestones</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[7, 30, 90, 180, 365].map((milestone) => (
                <Card 
                  key={milestone}
                  className={`p-4 ${streak >= milestone ? 'bg-duo-50 border-duo-200' : 'bg-gray-50 border-gray-200'}`}
                >
                  <div className="flex items-center gap-3">
                    <Flame className={`w-5 h-5 ${streak >= milestone ? 'text-duo-500' : 'text-gray-400'}`} />
                    <span className={`font-medium ${streak >= milestone ? 'text-duo-800' : 'text-gray-500'}`}>
                      {milestone} Days
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