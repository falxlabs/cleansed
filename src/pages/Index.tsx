import { AlertCircle, Shield } from "lucide-react";
import { ActionButton } from "@/components/dashboard/ActionButton";
import { DailyVerse } from "@/components/dashboard/DailyVerse";
import { Mascot } from "@/components/dashboard/Mascot";
import { StreakDisplay } from "@/components/dashboard/StreakDisplay";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const currentStreak = 7;
  const welcomeMessage = "Welcome back! Remember, each day is a new opportunity to grow stronger in your faith.";
  const dailyVerse = {
    verse: "No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear.",
    reference: "1 Corinthians 10:13",
  };

  return (
    <div className={`min-h-screen bg-background p-4 sm:p-6 md:p-8 space-y-6 max-w-2xl mx-auto ${isMobile ? "pb-20" : ""}`}>
      <div className="flex justify-end">
        <StreakDisplay streak={currentStreak} />
      </div>

      <Mascot message={welcomeMessage} className="animate-fade-in" />

      <div className="grid gap-4">
        <ActionButton
          icon={AlertCircle}
          label="I'm Being Tempted"
          onClick={() => navigate('/reflection')}
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

      <DailyVerse verse={dailyVerse.verse} reference={dailyVerse.reference} />
    </div>
  );
};

export default Index;