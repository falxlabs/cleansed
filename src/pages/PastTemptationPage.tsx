import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/dashboard/Mascot";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Shield, ThumbsUp, ThumbsDown } from "lucide-react";

export default function PastTemptationPage() {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const [timeValue, setTimeValue] = useState([12]); // Default to noon (12:00)
  const [outcome, setOutcome] = useState<"resisted" | "gave-in">();
  const navigate = useNavigate();
  const { toast } = useToast();

  const formatTime = (value: number) => {
    const hours = Math.floor(value);
    const minutes = Math.round((value - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const getTimeEmoji = (hour: number) => {
    if (hour >= 5 && hour < 12) return { emoji: "🌅", description: "Morning" };
    if (hour >= 12 && hour < 17) return { emoji: "☀️", description: "Afternoon" };
    if (hour >= 17 && hour < 21) return { emoji: "🌆", description: "Evening" };
    return { emoji: "🌙", description: "Night" };
  };

  const handleContinue = () => {
    if (step === 1) {
      if (!date) {
        toast({
          title: "Please select a date",
          description: "Choose when this temptation occurred",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
    } else {
      if (!outcome) {
        toast({
          title: "Please select an outcome",
          description: "Choose whether you resisted or gave in to the temptation",
          variant: "destructive",
        });
        return;
      }

      // Create a new date with the selected time
      const selectedDate = new Date(date!);
      const hours = Math.floor(timeValue[0]);
      const minutes = Math.round((timeValue[0] - hours) * 60);
      selectedDate.setHours(hours, minutes);

      // Store the selected date and outcome in sessionStorage
      sessionStorage.setItem('pastTemptationDate', selectedDate.toISOString());
      sessionStorage.setItem('pastTemptationOutcome', outcome);

      // Navigate based on outcome
      if (outcome === "resisted") {
        navigate('/reflection');
      } else {
        navigate('/');
        toast({
          title: "Entry recorded",
          description: "Your past temptation has been logged",
        });
      }
    }
  };

  const handleSkipReflection = () => {
    if (!date || !outcome) return;
    
    const selectedDate = new Date(date);
    const hours = Math.floor(timeValue[0]);
    const minutes = Math.round((timeValue[0] - hours) * 60);
    selectedDate.setHours(hours, minutes);

    sessionStorage.setItem('pastTemptationDate', selectedDate.toISOString());
    sessionStorage.setItem('pastTemptationOutcome', outcome);

    navigate('/');
    toast({
      title: "Entry recorded",
      description: "Your past temptation has been logged without reflection",
    });
  };

  const timeInfo = getTimeEmoji(Math.floor(timeValue[0]));
  const progress = (step / 2) * 100;

  return (
    <div className="container max-w-2xl mx-auto p-4 space-y-8">
      <Progress value={progress} className="w-full" />
      
      <Mascot 
        message={
          step === 1 
            ? "Select the date and time when this temptation occurred" 
            : "How did you handle this situation?"
        } 
      />
      
      <div className="bg-card rounded-lg p-6 space-y-6">
        {step === 1 ? (
          <>
            <h2 className="text-2xl font-bold text-center">When did this happen?</h2>
            
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={{ after: new Date() }}
                className="rounded-md border"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center">Time of day</h3>
              <div className="px-4">
                <div className="text-center mb-4">
                  <span className="text-2xl">{timeInfo.emoji}</span>
                  <span className="ml-2 text-muted-foreground">{timeInfo.description}</span>
                </div>
                <Slider
                  value={timeValue}
                  onValueChange={setTimeValue}
                  max={23.983333}
                  step={0.016667}
                  className="w-full"
                />
                <div className="text-center mt-2">
                  <span className="text-muted-foreground">{formatTime(timeValue[0])}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setOutcome("resisted")}
                className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all ${
                  outcome === "resisted"
                    ? "border-duo-500 bg-duo-50"
                    : "border-gray-200 hover:border-duo-300"
                }`}
              >
                <div className="rounded-full bg-duo-100 p-4 mb-3">
                  <ThumbsUp className={`w-8 h-8 ${
                    outcome === "resisted" ? "text-duo-600" : "text-duo-400"
                  }`} />
                </div>
                <span className="font-semibold text-lg">I Resisted</span>
                <span className="text-sm text-muted-foreground mt-1">
                  Stayed strong against temptation
                </span>
              </button>

              <button
                onClick={() => setOutcome("gave-in")}
                className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all ${
                  outcome === "gave-in"
                    ? "border-destructive bg-destructive/10"
                    : "border-gray-200 hover:border-destructive/50"
                }`}
              >
                <div className="rounded-full bg-destructive/20 p-4 mb-3">
                  <ThumbsDown className={`w-8 h-8 ${
                    outcome === "gave-in" ? "text-destructive" : "text-destructive/60"
                  }`} />
                </div>
                <span className="font-semibold text-lg">I Gave In</span>
                <span className="text-sm text-muted-foreground mt-1">
                  Struggled with the challenge
                </span>
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <Button 
            variant="outline" 
            onClick={() => step === 1 ? navigate('/') : setStep(1)}
          >
            Back
          </Button>
          <div className="space-x-2">
            {step === 2 && (
              <Button
                variant="outline"
                className="text-muted-foreground"
                onClick={handleSkipReflection}
                disabled={!outcome}
              >
                Skip Reflection
              </Button>
            )}
            <Button onClick={handleContinue}>
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}