import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Mascot } from "@/components/dashboard/Mascot";
import { Progress } from "@/components/ui/progress";
import { TemptationTypeStep } from "@/components/reflection/TemptationTypeStep";
import { TemptationLevelStep } from "@/components/reflection/TemptationLevelStep";
import { TriggerStep } from "@/components/reflection/TriggerStep";
import { ResistanceStep } from "@/components/reflection/ResistanceStep";
import { NavigationButtons } from "@/components/reflection/NavigationButtons";
import { useReflectionState } from "@/hooks/useReflectionState";

export default function ReflectionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { state, dispatch } = useReflectionState();
  const outcome = location.state?.choice === "submitted" ? "resisted" : "gave-in";

  const handleNext = () => {
    setStep(step + 1);
  };

  const getMascotMessage = () => {
    switch (step) {
      case 1:
        return "Let's reflect on the temptation you faced.";
      case 2:
        return "What level of intensity did you feel during this temptation?";
      case 3:
        return "What triggered this temptation?";
      case 4:
        return "What strategy did you use to resist the temptation?";
      default:
        return "Let's reflect on this experience together. Your honesty helps build a stronger foundation.";
    }
  };

  const isNextDisabled = () => {
    if (step === 1 && !state.temptationType) return true;
    if (step === 2 && !state.intensityLevel) return true;
    if (step === 3 && !state.trigger) return true;
    if (step === 4 && outcome === "resisted" && !state.resistanceStrategy) return true;
    return false;
  };

  const progress = (step / (outcome === "resisted" ? 4 : 3)) * 100;

  return (
    <div className="container max-w-2xl mx-auto p-4 space-y-4 pb-24 md:pb-6">
      <Mascot message={getMascotMessage()} />

      <Button
        variant="ghost"
        className="-ml-2 mb-2"
        onClick={() => step === 1 ? navigate('/dashboard') : setStep(step - 1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {step === 1 ? 'Back to Dashboard' : 'Back'}
      </Button>

      <Progress value={progress} className="flex-1" />

      <div className="bg-card rounded-lg p-6 space-y-6">
        {step === 1 && (
          <TemptationTypeStep
            selectedType={state.temptationType}
            onTypeSelect={(type) => dispatch({ type: 'SET_TEMPTATION_TYPE', payload: type })}
          />
        )}
        {step === 2 && (
          <TemptationLevelStep
            selectedLevel={state.intensityLevel}
            onLevelSelect={(level) => dispatch({ type: 'SET_INTENSITY_LEVEL', payload: level })}
          />
        )}
        {step === 3 && (
          <TriggerStep
            trigger={state.trigger}
            onTriggerChange={(trigger) => dispatch({ type: 'SET_TRIGGER', payload: trigger })}
          />
        )}
        {step === 4 && outcome === "resisted" && (
          <ResistanceStep
            strategy={state.resistanceStrategy}
            onStrategyChange={(strategy) => dispatch({ type: 'SET_RESISTANCE_STRATEGY', payload: strategy })}
          />
        )}

        <NavigationButtons
          onNext={handleNext}
          step={step}
          isNextDisabled={isNextDisabled()}
          outcome={outcome}
        />
      </div>
    </div>
  );
}
