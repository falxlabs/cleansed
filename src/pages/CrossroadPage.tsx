import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Mascot } from "@/components/dashboard/Mascot";
import { ActionButton } from "@/components/dashboard/ActionButton";
import { ArrowLeft, Sun, Skull, Timer, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const TIMER_DURATION = 300;

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
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8 space-y-6 max-w-2xl mx-auto">
      <Button 
        variant="ghost" 
        className="mb-4 -ml-2" 
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <div className="w-full max-w-sm mx-auto sm:max-w-md">
        <Mascot 
          message="Take a moment to breathe and pray. Remember, God is with you in this moment of temptation." 
          className="animate-fade-in"
        />
      </div>

      <Card className="p-6 sm:p-8 mt-6 bg-white/95 backdrop-blur-sm border-2 border-duo-200">
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-3 text-duo-700">
              <Heart className="h-8 w-8 animate-pulse text-duo-500" />
              <h2 className="text-2xl sm:text-3xl font-bold text-duo-800">
                Stay Strong in This Moment
              </h2>
            </div>
            
            <p className="text-duo-700 text-lg sm:text-xl max-w-md mx-auto">
              This urge is temporary, but your commitment to God is eternal. 
              Take these {Math.ceil(timeLeft / 60)} minutes to reconnect with His strength.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl sm:text-5xl font-bold text-duo-800 font-mono tracking-wider bg-white/80 px-6 py-2 rounded-full shadow-sm">
                {formatTime(timeLeft)}
              </div>
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-4 sm:h-5 bg-duo-100" 
            />
          </div>
          
          <div className="mt-8 space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold text-center text-duo-700">
              Ways to Strengthen Your Spirit:
            </h3>
            <Carousel className="w-full max-w-xs mx-auto" opts={{ loop: true }}>
              <CarouselContent>
                {SUGGESTIONS.map((suggestion, index) => (
                  <CarouselItem key={index}>
                    <div className="p-4 sm:p-6 rounded-xl bg-white/80 text-duo-800 text-base sm:text-lg text-center min-h-[100px] flex items-center justify-center shadow-md border border-duo-100">
                      {suggestion}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-2 sm:left-0" />
              <CarouselNext className="-right-2 sm:right-0" />
            </Carousel>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <ActionButton
          icon={Sun}
          label="Choose God"
          onClick={handleSubmitToGod}
          className="bg-duo-500 hover:bg-duo-600 text-white shadow-lg hover:shadow-xl transition-all duration-500 py-4 sm:py-6 text-lg sm:text-xl font-bold h-[200px] sm:h-[300px] hover:-translate-y-2 border-4 border-duo-700 px-4 sm:px-8 [&_svg]:w-8 [&_svg]:h-8 sm:[&_svg]:w-12 sm:[&_svg]:h-12"
        />
        
        <ActionButton
          icon={Skull}
          label="Give In"
          onClick={handleFallToSin}
          variant="destructive"
          className="h-[200px] sm:h-[300px] hover:-translate-y-2 transition-all duration-500 border-4 border-red-700 text-lg sm:text-xl px-4 sm:px-8 [&_svg]:w-8 [&_svg]:h-8 sm:[&_svg]:w-12 sm:[&_svg]:h-12"
          disabled={timeLeft > 0}
        />
      </div>
    </div>
  );
}