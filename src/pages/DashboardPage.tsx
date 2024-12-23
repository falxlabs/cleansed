import { AlertCircle, FileText } from "lucide-react";
import { ActionButton } from "@/components/dashboard/ActionButton";
import { DailyVerse } from "@/components/dashboard/DailyVerse";
import { Mascot } from "@/components/dashboard/Mascot";
import { StreakDisplay } from "@/components/dashboard/StreakDisplay";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { calculateStreak } from "@/utils/journalEntries";

const DashboardPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const currentStreak = calculateStreak();
  const welcomeMessage = "Welcome back! Remember, each day is a new opportunity to grow stronger in your faith.";
  const dailyVerse = {
    verse: "No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear.",
    reference: "1 Corinthians 10:13",
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] space-y-4 p-4 pb-20 md:pb-6">
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

      <div className="grid gap-4 max-w-2xl mx-auto bg-white rounded-3xl shadow-md p-6">
        <ActionButton
          icon={AlertCircle}
          label="I'm Being Tempted"
          onClick={() => navigate('/crossroad')}
          variant="destructive"
          className="w-full bg-red-500 hover:bg-red-600 active:bg-red-700 
                     transform transition-all duration-200 hover:scale-[1.02] 
                     shadow-lg hover:shadow-xl border-2 border-red-400"
        />
        <ActionButton
          icon={FileText}
          label="Log Past Temptation"
          onClick={() => navigate('/past-temptation')}
          variant="outline"
          className="w-full bg-white hover:bg-gray-50 active:bg-gray-100 
                     border-2 border-gray-300 hover:border-gray-400
                     transform transition-all duration-200 hover:scale-[1.02] 
                     shadow-md hover:shadow-lg text-gray-700"
        />
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-md p-6">
        <DailyVerse verse={dailyVerse.verse} reference={dailyVerse.reference} />
      </div>
    </div>
  );
};

export default DashboardPage;