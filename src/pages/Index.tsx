import { AlertCircle, Shield } from "lucide-react";
import { ActionButton } from "@/components/dashboard/ActionButton";
import { DailyVerse } from "@/components/dashboard/DailyVerse";
import { Mascot } from "@/components/dashboard/Mascot";
import { StreakDisplay } from "@/components/dashboard/StreakDisplay";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { calculateStreak } from "@/utils/journalEntries";

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const currentStreak = calculateStreak();
  const welcomeMessage = "Welcome back! Remember, each day is a new opportunity to grow stronger in your faith.";
  const dailyVerse = {
    verse: "No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear.",
    reference: "1 Corinthians 10:13",
  };

  return (
    <div className={`min-h-screen bg-background p-4 sm:p-6 md:p-8 space-y-6 ${isMobile ? "pb-20" : ""}`}>
      <div className="flex justify-end max-w-2xl mx-auto">
        <div onClick={() => navigate('/achievements')} className="cursor-pointer">
          <StreakDisplay streak={currentStreak} />
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-auto">
        <Mascot 
          message={welcomeMessage} 
          className="animate-fade-in" 
          onCheckIn={() => navigate('/daily-checkin')}
          showCheckInButton={true}
        />
      </div>

      <div className="grid gap-4 max-w-2xl mx-auto">
        <ActionButton
          icon={AlertCircle}
          label="I'm Being Tempted"
          onClick={() => navigate('/crossroad')}
          variant="destructive"
          className="w-full"
        />
        <ActionButton
          icon={Shield}
          label="Log Past Temptation"
          onClick={() => navigate('/past-temptation')}
          variant="outline"
          className="w-full"
        />
      </div>

      <div className="max-w-2xl mx-auto">
        <DailyVerse verse={dailyVerse.verse} reference={dailyVerse.reference} />
      </div>
    </div>
  );
};

export default Index;