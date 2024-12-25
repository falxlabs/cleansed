import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Mascot } from "@/components/dashboard/Mascot";
import { ReflectionTimer } from "@/components/crossroad/ReflectionTimer";
import { ChoiceButtons } from "@/components/crossroad/ChoiceButtons";

export default function CrossroadPage() {
  const [isTimerComplete, setIsTimerComplete] = useState(false);
  const [unlockTime, setUnlockTime] = useState(3); // Changed from 5 to 3
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

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8 space-y-6">
      <Button 
        variant="ghost" 
        className="mb-4 -ml-2" 
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <div className="max-w-2xl mx-auto space-y-6">
        <Mascot 
          message="Take a moment to breathe and pray. Remember, God is with you in this moment of temptation." 
          className="animate-fade-in"
        />

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
    </div>
  );
}