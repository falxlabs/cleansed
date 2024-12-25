import { Mascot } from "@/components/dashboard/Mascot";
import { TemptationTypeStep } from "@/components/reflection/TemptationTypeStep";
import { TemptationLevelStep } from "@/components/reflection/TemptationLevelStep";
import { TriggerStep } from "@/components/reflection/TriggerStep";
import { ResistanceStep } from "@/components/reflection/ResistanceStep";
import { NavigationButtons } from "@/components/reflection/NavigationButtons";
import { ReflectionNavigation } from "@/components/reflection/ReflectionNavigation";
import { useReflectionState } from "@/hooks/useReflectionState";
import { useReflectionDatabase } from "@/hooks/useReflectionDatabase";
import { useReflectionValidation } from "@/hooks/useReflectionValidation";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function ReflectionPage() {
  const { toast } = useToast();
  const {
    step,
    setStep,
    selectedSin,
    setSelectedSin,
    customNote,
    setCustomNote,
    sliderValue,
    temptationLevel,
    trigger,
    setTrigger,
    resistanceStrategy,
    setResistanceStrategy,
    outcome,
    setMascotMessage,
    handleSliderChange,
    navigate,
    location,
  } = useReflectionState();

  const { saveReflection } = useReflectionDatabase();
  const { getValidationMessage, isStepValid } = useReflectionValidation();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Sign in required",
          description: "Please go to Settings to sign in or create an account to save your reflections.",
          variant: "destructive",
        });
      }
    };

    checkAuthStatus();
  }, [toast]);

  const isResisted = location.state?.choice === "submitted" || outcome === "resisted";
  const totalSteps = isResisted ? 4 : 3;
  const progress = (step / totalSteps) * 100;

  const getStepMessage = () => {
    const validationMessage = getValidationMessage();
    if (validationMessage) return validationMessage;

    switch (step) {
      case 2:
        return "Let's understand how strong this temptation was.";
      case 3:
        return "Understanding what triggered this temptation will help you prepare better next time.";
      case 4:
        return "What strategies helped you resist?";
      default:
        return "Let's reflect on this temptation together.";
    }
  };

  const handleNext = async () => {
    if (!isStepValid()) {
      setMascotMessage(getValidationMessage());
      return;
    }
    
    const isLastStep = step === totalSteps;
    if (isLastStep) {
      const success = await saveReflection({
        selectedSin,
        sliderValue,
        trigger,
        outcome: isResisted ? 'resisted' : 'gave-in',
        resistanceStrategy,
        customNote,
      });

      if (success) {
        navigate("/journal");
      }
      return;
    }
    
    setStep(step + 1);
    setMascotMessage(getStepMessage());
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setMascotMessage(getStepMessage());
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
      <ReflectionNavigation progress={progress} onBack={handleBack} />
      <Mascot message={getStepMessage()} />

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

        {step === 4 && isResisted && (
          <ResistanceStep
            resistanceStrategy={resistanceStrategy}
            onResistanceStrategyChange={setResistanceStrategy}
          />
        )}

        <NavigationButtons
          onNext={handleNext}
          step={step}
          isNextDisabled={false}
        />
      </div>
    </div>
  );
}