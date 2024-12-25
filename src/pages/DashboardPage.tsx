import { useNavigate } from "react-router-dom";
import { ActionButton } from "@/components/dashboard/ActionButton";
import { DailyVerse } from "@/components/dashboard/DailyVerse";
import { Mascot } from "@/components/dashboard/Mascot";
import { StreakDisplay } from "@/components/dashboard/StreakDisplay";
import { useIsMobile } from "@/hooks/use-mobile";
import { useDailyVerse } from "@/hooks/useDailyVerse";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/providers/AuthProvider";
import { cn } from "@/lib/utils";

const DashboardPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const { data: verse, isLoading: isVerseLoading } = useDailyVerse();
  const welcomeMessage = "Welcome back! Remember, each day is a new opportunity to grow stronger in your faith.";

  return (
    <div className={cn(
      "min-h-screen bg-[#F5F5F5] space-y-4 p-4 pb-20 md:pb-6",
      !user && isMobile && "pt-16"
    )}>
      <div className="flex justify-end max-w-2xl mx-auto">
        <div onClick={() => navigate('/achievements')} className="cursor-pointer">
          <StreakDisplay />
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

      <div className="max-w-2xl mx-auto space-y-4">
        <ActionButton
          emoji="⚠️"
          label="I'm Being Tempted"
          onClick={() => navigate('/crossroad')}
          variant="destructive"
          className="w-full bg-red-500 hover:bg-red-600 active:bg-red-700 
                     transform transition-all duration-200 hover:scale-[1.02] 
                     shadow-lg hover:shadow-xl border-2 border-red-400"
        />
        <ActionButton
          emoji="📝"
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
        {isVerseLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ) : verse ? (
          <DailyVerse verse={verse.content_csb} reference={verse.reference} />
        ) : (
          <DailyVerse 
            verse="No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear." 
            reference="1 Corinthians 10:13" 
          />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;