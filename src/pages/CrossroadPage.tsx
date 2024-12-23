import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Mascot } from "@/components/dashboard/Mascot";
import { ActionButton } from "@/components/dashboard/ActionButton";
import { ArrowLeft, Heart, Skull, Timer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CrossroadPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [progress, setProgress] = useState(13);
  const [showTimer, setShowTimer] = useState(false);
  const [timer, setTimer] = useState(0);
  const TIMER_SECONDS = 10;

  const handleSubmitToGod = () => {
    setShowTimer(true);
    toast({
      title: "You chose God!",
      description: "Keep moving forward in faith.",
    });
  };

  const handleGiveIn = () => {
    setShowTimer(true);
    toast({
      title: "You gave in.",
      description: "Remember, tomorrow is a new day.",
    });
  };

  useEffect(() => {
    if (showTimer) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev < TIMER_SECONDS) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setShowTimer(false);
            navigate("/reflection");
            return 0;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showTimer, navigate]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Button
        variant="ghost"
        className="mb-8"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Progress value={progress} className="mb-8" />

      <Mascot
        message="You're at a crossroads. Take a moment to breathe and make your choice."
        className="mb-8"
      />

      <div className="space-y-8">
        <Carousel className="w-full max-w-xl mx-auto">
          <CarouselContent>
            <CarouselItem>
              <div className="p-6 text-center space-y-4">
                <h2 className="text-2xl font-bold">Remember Your Worth</h2>
                <p>You are stronger than this temptation. Your faith gives you strength.</p>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-6 text-center space-y-4">
                <h2 className="text-2xl font-bold">Take a Moment</h2>
                <p>Breathe deeply and focus on your commitment to growth.</p>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-6 text-center space-y-4">
                <h2 className="text-2xl font-bold">You're Not Alone</h2>
                <p>Others have faced this challenge and emerged stronger.</p>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>

        <div className="grid grid-cols-2 gap-4">
          <ActionButton
            icon={Heart}
            label="Choose God"
            onClick={handleSubmitToGod}
            className="bg-duo-500 hover:bg-duo-600 text-white shadow-lg hover:shadow-xl transition-all duration-500 py-6 text-lg sm:text-xl font-bold h-[300px] hover:-translate-y-2 border-4 border-duo-700 px-4 sm:px-8 [&_svg]:w-12 [&_svg]:h-12"
          />
          <ActionButton
            icon={Skull}
            label="Give In"
            onClick={handleGiveIn}
            variant="destructive"
            className="shadow-lg hover:shadow-xl transition-all duration-500 py-6 text-lg sm:text-xl font-bold h-[300px] hover:-translate-y-2 border-4 border-red-700 px-4 sm:px-8 [&_svg]:w-12 [&_svg]:h-12"
          />
        </div>
      </div>

      {showTimer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl shadow-2xl space-y-6 max-w-md mx-4">
            <Timer className="w-12 h-12 mx-auto text-duo-500" />
            <h2 className="text-2xl font-bold text-center">Take a Moment</h2>
            <p className="text-center">
              Use these {TIMER_SECONDS} seconds to breathe and reflect on your choice.
            </p>
            <div className="flex justify-center">
              <Progress value={(timer / TIMER_SECONDS) * 100} className="w-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}