import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
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
  const [mascotMessage, setMascotMessage] = useState("Let's reflect on this temptation together. I'm here to help you through this process.");

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
      setMascotMessage("Please select a type of temptation first. This helps us understand your struggle better.");
      return;
    }
    if (step === 2 && !temptationLevel) {
      setMascotMessage("Could you help me understand how intense this temptation was? This information is really important for tracking your progress.");
      return;
    }
    if (step === 3 && !trigger) {
      setMascotMessage("Understanding what triggered this temptation will help you recognize and handle similar situations in the future. Could you share what happened?");
      return;
    }
    if (step === totalSteps) {
      if (outcome === 'resisted' && !resistanceStrategy) {
        setMascotMessage("Your strategies for resisting temptation can inspire others. Please share what helped you stay strong!");
        return;
      }
      
      saveJournalEntry({
        date: new Date(),
        type: selectedSin,
        resisted: outcome === 'resisted',
        level: temptationLevel,
        trigger: trigger,
        notes: outcome === 'resisted' ? resistanceStrategy : '',
      });

      setMascotMessage("Thank you for your honest reflection! Remember, every step forward, no matter how small, is progress. Keep going!");
      navigate("/");
      return;
    }
    
    // Update mascot message based on the next step
    if (step === 1) {
      setMascotMessage("Great choice! Now, let's understand how strong this temptation was.");
    } else if (step === 2) {
      setMascotMessage("You're doing great! Understanding what triggered this temptation will help you prepare better next time.");
    } else if (step === 3 && outcome === 'resisted') {
      setMascotMessage("You showed real strength! What strategies helped you resist? Your experience could help others too!");
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
      // Update mascot message when going back
      if (step === 2) {
        setMascotMessage("Let's reflect on this temptation together. I'm here to help you through this process.");
      } else if (step === 3) {
        setMascotMessage("Let's review how strong this temptation was.");
      } else if (step === 4) {
        setMascotMessage("Let's look back at what triggered this situation.");
      }
    } else {
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
      <Mascot message={mascotMessage} />
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
          onBack={handleBack}
          onNext={handleNext}
          step={step}
          isNextDisabled={false}
        />
      </div>
    </div>
  );
}