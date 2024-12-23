import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Mascot } from "@/components/dashboard/Mascot";
import { TemptationTypeStep } from "@/components/reflection/TemptationTypeStep";
import { TemptationLevelStep } from "@/components/reflection/TemptationLevelStep";
import { TriggerStep } from "@/components/reflection/TriggerStep";
import { ResistanceStep } from "@/components/reflection/ResistanceStep";
import { NavigationButtons } from "@/components/reflection/NavigationButtons";
import { saveJournalEntry } from "@/utils/journalEntries";

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
  const [outcome, setOutcome] = useState<string>("");

  useEffect(() => {
    const storedOutcome = sessionStorage.getItem('pastTemptationOutcome');
    if (storedOutcome) {
      setOutcome(storedOutcome);
    }
  }, []);

  const totalSteps = outcome === 'gave-in' ? 3 : 4;
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
      if (outcome === 'resisted' && !resistanceStrategy) {
        toast({
          title: "Please share what helped you resist",
          description: "This insight can help in future situations",
          variant: "destructive",
        });
        return;
      }
      
      // Save the reflection entry
      saveJournalEntry({
        date: new Date(),
        type: selectedSin,
        resisted: outcome === 'resisted',
        level: temptationLevel,
        trigger: trigger,
        notes: outcome === 'resisted' ? resistanceStrategy : '',
      });

      toast({
        title: "Reflection completed",
        description: "Thank you for your honest reflection",
      });
      navigate("/");
      return;
    }
    
    // Skip resistance strategy step if gave in
    if (step === 3 && outcome === 'gave-in') {
      setStep(totalSteps);
    } else {
      setStep(step + 1);
    }
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

  const isNextDisabled = (
    (step === 1 && !selectedSin) ||
    (step === 2 && !temptationLevel) ||
    (step === 3 && !trigger) ||
    (step === totalSteps && outcome === 'resisted' && !resistanceStrategy)
  );

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

        {step === 4 && outcome === 'resisted' && (
          <ResistanceStep
            resistanceStrategy={resistanceStrategy}
            onResistanceStrategyChange={setResistanceStrategy}
          />
        )}

        <NavigationButtons
          step={step}
          isNextDisabled={isNextDisabled}
          onBack={handleBack}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}