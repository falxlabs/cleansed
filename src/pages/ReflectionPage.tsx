import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Mascot } from "@/components/dashboard/Mascot";
import { TemptationTypeStep } from "@/components/reflection/TemptationTypeStep";
import { TemptationLevelStep } from "@/components/reflection/TemptationLevelStep";
import { TriggerStep } from "@/components/reflection/TriggerStep";
import { ResistanceStep } from "@/components/reflection/ResistanceStep";
import { NavigationButtons } from "@/components/reflection/NavigationButtons";

const TEMPTATION_LEVELS = [
  "Low - I can resist easily",
  "Medium - It's challenging but manageable",
  "High - I struggle significantly",
  "Severe - Almost impossible to resist"
] as const;

type TemptationLevel = typeof TEMPTATION_LEVELS[number];

export default function ReflectionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1);
  const [selectedSin, setSelectedSin] = useState<string>("");
  const [customNote, setCustomNote] = useState("");
  const defaultSliderValue = [0];
  const [sliderValue, setSliderValue] = useState(defaultSliderValue);
  const defaultLevelIndex = 0;
  const [temptationLevel, setTemptationLevel] = useState<TemptationLevel>(TEMPTATION_LEVELS[defaultLevelIndex]);
  const [trigger, setTrigger] = useState("");
  const [resistanceStrategy, setResistanceStrategy] = useState("");

  // Get the outcome from sessionStorage
  const temptationOutcome = sessionStorage.getItem('temptationOutcome');
  const wasResisted = temptationOutcome === 'resisted';

  // Calculate total steps based on outcome
  const totalSteps = wasResisted ? 4 : 3;
  const progress = (step / totalSteps) * 100;

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    const levelIndex = Math.floor((value[0] / 100) * TEMPTATION_LEVELS.length);
    setTemptationLevel(TEMPTATION_LEVELS[Math.min(levelIndex, TEMPTATION_LEVELS.length - 1)]);
  };

  const handleNext = () => {
    if (step === 1 && !selectedSin) {
      toast({
        title: "Please complete all required fields",
        description: "Select a type of temptation",
        variant: "destructive",
      });
      return;
    }
    if (step === 2 && !temptationLevel) {
      toast({
        title: "Please select a temptation level",
        description: "This helps us understand the intensity of the struggle",
        variant: "destructive",
      });
      return;
    }
    if (step === 3 && !trigger) {
      toast({
        title: "Please describe the trigger",
        description: "Understanding what triggers the temptation is important",
        variant: "destructive",
      });
      return;
    }
    if (step === totalSteps) {
      if (wasResisted && !resistanceStrategy) {
        toast({
          title: "Please share what helped you resist",
          description: "This insight can help in future situations",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Reflection completed",
        description: "Thank you for your honest reflection",
      });
      navigate("/");
    }
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      // Check if we came from the crossroad page
      if (location.state?.choice) {
        navigate("/crossroad");
      } else {
        const pastTemptationDate = sessionStorage.getItem('pastTemptationDate');
        if (pastTemptationDate) {
          navigate("/past-temptation");
        } else {
          navigate("/");
        }
      }
    }
  };

  return (
    <div className="container max-w-2xl mx-auto p-4 space-y-8">
      <Mascot message="Let's reflect on this temptation together" />
      <Progress value={progress} className="w-full" />

      <div className="space-y-6">
        {step === 1 && (
          <TemptationTypeStep
            selectedSin={selectedSin}
            customNote={customNote}
            onSinChange={setSelectedSin}
            onCustomNoteChange={setCustomNote}
          />
        )}

        {step === 2 && (
          <TemptationLevelStep
            sliderValue={sliderValue}
            temptationLevel={temptationLevel}
            onSliderChange={handleSliderChange}
          />
        )}

        {step === 3 && (
          <TriggerStep
            trigger={trigger}
            onTriggerChange={setTrigger}
          />
        )}

        {step === 4 && wasResisted && (
          <ResistanceStep
            resistanceStrategy={resistanceStrategy}
            onResistanceStrategyChange={setResistanceStrategy}
          />
        )}

        <NavigationButtons
          onBack={handleBack}
          onNext={handleNext}
          isLastStep={step === totalSteps}
        />
      </div>
    </div>
  );
}