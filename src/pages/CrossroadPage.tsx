import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Mascot } from "@/components/dashboard/Mascot";
import { ActionButton } from "@/components/dashboard/ActionButton";
import { Shield, Flame, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const TIMER_DURATION = 300; // 5 minutes in seconds

export default function CrossroadPage() {
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    if (timeLeft <= 0) {
      toast({
        title: "Time's up!",
        description: "Your breathing exercise is complete. Make your choice.",
      });
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, toast]);

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((TIMER_DURATION - timeLeft) / TIMER_DURATION) * 100;

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8 space-y-8 max-w-2xl mx-auto">
      <Button 
        variant="ghost" 
        className="mb-4 -ml-2" 
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <Mascot 
        message="Take a moment to breathe and pray. Remember, God is with you in this moment of temptation." 
        className="animate-fade-in"
      />

      <div className="grid gap-6 mt-8">
        <ActionButton
          icon={Shield}
          label="Submit to God"
          onClick={handleSubmitToGod}
          className="bg-sage-600 hover:bg-sage-700 text-white animate-fade-in"
        />
        
        <ActionButton
          icon={Flame}
          label="Fall to Sin"
          onClick={handleFallToSin}
          variant="destructive"
          className="animate-fade-in"
          disabled={timeLeft > 0}
        />
      </div>

      <Card className="p-6 mt-8 animate-fade-in">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-center">Breathing Exercise Timer</h3>
          <div className="text-3xl font-bold text-center">{formatTime(timeLeft)}</div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </Card>
    </div>
  );
}