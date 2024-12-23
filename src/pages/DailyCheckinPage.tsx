import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MoodStep } from "@/components/daily-checkin/MoodStep";
import { TemptationStep } from "@/components/daily-checkin/TemptationStep";
import { MissionStep } from "@/components/daily-checkin/MissionStep";
import { useToast } from "@/hooks/use-toast";

export default function DailyCheckinPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState<number[]>([50]);
  const [description, setDescription] = useState("");
  const [selectedTemptation, setSelectedTemptation] = useState("");
  const [temptationLevel, setTemptationLevel] = useState<number[]>([50]);
  const [selectedStatement, setSelectedStatement] = useState("");

  const handleNext = () => {
    if (step === 3) {
      // Submit the check-in
      toast({
        title: "Check-in Complete!",
        description: "Thank you for your daily check-in.",
      });
      navigate('/');
    } else {
      setStep(step + 1);
    }
  };

  const isNextDisabled = () => {
    if (step === 2) return !selectedTemptation;
    if (step === 3) return !selectedStatement;
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-primary/10 p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6 bg-white/40 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-2 border-primary/20">
        <div className="space-y-6">
          {step === 1 && (
            <MoodStep
              mood={mood}
              description={description}
              onMoodChange={setMood}
              onDescriptionChange={setDescription}
            />
          )}
          {step === 2 && (
            <TemptationStep
              selectedTemptation={selectedTemptation}
              temptationLevel={temptationLevel}
              onTemptationChange={setSelectedTemptation}
              onLevelChange={setTemptationLevel}
            />
          )}
          {step === 3 && (
            <MissionStep
              selectedStatement={selectedStatement}
              onStatementChange={setSelectedStatement}
            />
          )}
        </div>

        <div className="flex justify-between mt-6 pt-6 border-t border-primary/20">
          <Button
            variant="outline"
            onClick={() => (step === 1 ? navigate('/') : setStep(step - 1))}
            className="bg-white/50 hover:bg-white/80"
          >
            {step === 1 ? "Cancel" : "Back"}
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={isNextDisabled()}
            className="bg-primary hover:bg-primary/90"
          >
            {step === 3 ? "Complete" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}