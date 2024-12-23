import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Mascot } from "@/components/dashboard/Mascot";
import { ActionButton } from "@/components/dashboard/ActionButton";
import { Shield, Flame, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const TIMER_DURATION = 300; // 5 minutes in seconds

const SUGGESTIONS = [
  "Take a quiet walk and reflect",
  "Pray for strength and guidance",
  "Practice deep breathing exercises",
  "Read a Bible verse about overcoming temptation",
  "Call a trusted friend or accountability partner",
  "Write down your thoughts in a journal",
];

export default function CrossroadPage() {
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    if (timeLeft <= 0) {
      toast({
        title: "Time's up",
        description: "You've taken time to reflect. Remember, you're stronger than you think.",
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
      title: "A Wise Choice! 🙏",
      description: "You're growing stronger every day. God is proud of you!",
    });
    navigate("/reflection", { state: { choice: "submitted" } });
  };

  const handleFallToSin = () => {
    toast({
      title: "Don't Lose Hope ❤️",
      description: "Remember, every moment is a new chance to start again. You are loved.",
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
    <div className="min-h-screen bg-gradient-to-b from-white to-duo-50 p-4 sm:p-6 md:p-8 space-y-8 max-w-2xl mx-auto">
      <Button 
        variant="ghost" 
        className="mb-4 -ml-2 text-duo-700 hover:text-duo-800 hover:bg-duo-100" 
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <Mascot 
        message="You're not alone in this moment. Take a deep breath, and remember that God's strength is with you." 
        className="animate-float"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        <ActionButton
          icon={Shield}
          label="Choose God's Path"
          onClick={handleSubmitToGod}
          className="bg-duo-500 hover:bg-duo-600 text-white shadow-lg hover:shadow-xl transition-all duration-500 py-6 text-base sm:text-lg font-bold h-[200px] sm:h-[250px] hover:-translate-y-2 border-4 border-duo-700 px-4 sm:px-8 rounded-3xl"
        />
        
        <ActionButton
          icon={Flame}
          label="Need More Time"
          onClick={handleFallToSin}
          variant="destructive"
          className="bg-white hover:bg-gray-50 text-gray-700 h-[200px] sm:h-[250px] hover:-translate-y-2 transition-all duration-500 border-4 border-gray-300 text-base sm:text-lg px-4 sm:px-8 rounded-3xl"
          disabled={timeLeft > 0}
        />
      </div>

      <Card className="p-6 sm:p-8 mt-8 bg-white/80 backdrop-blur-sm border-duo-100">
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-center text-duo-700">Moment of Reflection</h3>
          <div className="text-4xl font-bold text-center text-duo-600">{formatTime(timeLeft)}</div>
          <Progress value={progressPercentage} className="h-3 bg-duo-100" />
          
          <div className="mt-8 space-y-4">
            <h4 className="text-lg font-medium text-center text-duo-600">Activities That Can Help You</h4>
            <Carousel className="w-full max-w-xs mx-auto" opts={{ loop: true }}>
              <CarouselContent>
                {SUGGESTIONS.map((suggestion, index) => (
                  <CarouselItem key={index}>
                    <div className="p-6 rounded-xl bg-white shadow-md border border-duo-100 text-base text-center min-h-[120px] flex items-center justify-center text-duo-800">
                      {suggestion}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 bg-white hover:bg-duo-50 border-duo-200" />
              <CarouselNext className="right-0 bg-white hover:bg-duo-50 border-duo-200" />
            </Carousel>
          </div>
        </div>
      </Card>
    </div>
  );
}