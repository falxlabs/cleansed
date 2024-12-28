import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Mascot } from "@/components/dashboard/Mascot";
import { ReflectionTimer } from "@/components/crossroad/ReflectionTimer";
import { ChoiceButtons } from "@/components/crossroad/ChoiceButtons";
import { PageContainer } from "@/components/layout/PageContainer";
import { ContentSection } from "@/components/layout/ContentSection";

export default function CrossroadPage() {
  const [isTimerComplete, setIsTimerComplete] = useState(false);
  const [unlockTime, setUnlockTime] = useState(3);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmitToGod = () => {
    toast({
      title: "Praise God!",
      description: "You've chosen the path of righteousness.",
    });
    navigate("/reflection", { state: { choice: "submitted" } });
  };

  const handleFallToSin = () => {
    toast({
      title: "Don't give up!",
      description: "Remember, God's grace is sufficient for you.",
    });
    navigate("/reflection", { state: { choice: "fell" } });
  };

  const mascotMessage = isTimerComplete
    ? "Great job! You've waited 5 minutes - that's strength! Keep going, you're doing great. God is with you in this moment."
    : "Try an activity below to help overcome temptation. God is with you in this moment.";

  return (
    <PageContainer fullHeight className="flex flex-col h-full">
      <Button 
        variant="ghost" 
        className="mb-2 -ml-2" 
        onClick={() => navigate('/dashboard')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <ContentSection className="flex-1 flex flex-col gap-4 sm:gap-6">
        <Mascot 
          message={mascotMessage}
          className="animate-fade-in"
        />

        <div className="flex-1 flex flex-col justify-center gap-4 sm:gap-6">
          <ChoiceButtons
            onSubmitToGod={handleSubmitToGod}
            onFallToSin={handleFallToSin}
            isTimerComplete={isTimerComplete}
            unlockTime={unlockTime}
          />

          <ReflectionTimer 
            onComplete={() => setIsTimerComplete(true)} 
            onUnlockTimeChange={setUnlockTime}
          />
        </div>
      </ContentSection>
    </PageContainer>
  );
}