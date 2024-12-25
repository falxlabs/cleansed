import { Progress } from "@/components/ui/progress";
import { Mascot } from "@/components/dashboard/Mascot";
import { TemptationTypeStep } from "@/components/reflection/TemptationTypeStep";
import { TemptationLevelStep } from "@/components/reflection/TemptationLevelStep";
import { TriggerStep } from "@/components/reflection/TriggerStep";
import { ResistanceStep } from "@/components/reflection/ResistanceStep";
import { NavigationButtons } from "@/components/reflection/NavigationButtons";
import { useReflectionState } from "@/hooks/useReflectionState";
import { useReflectionDatabase } from "@/hooks/useReflectionDatabase";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
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
    mascotMessage,
    setMascotMessage,
    handleSliderChange,
    navigate,
    location,
  } = useReflectionState();

  const { saveReflection } = useReflectionDatabase();

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

  const handleNext = async () => {
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
    if (step === 4 && isResisted && !resistanceStrategy) {
      setMascotMessage("Your strategies for resisting temptation can inspire others. Please share what helped you stay strong!");
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
        setMascotMessage("Thank you for your honest reflection! Remember, every step forward, no matter how small, is progress. Keep going!");
        navigate("/journal");
      }
      return;
    }
    
    if (step === 1) {
      setMascotMessage("Great choice! Now, let's understand how strong this temptation was.");
    } else if (step === 2) {
      setMascotMessage("You're doing great! Understanding what triggered this temptation will help you prepare better next time.");
    } else if (step === 3 && isResisted) {
      setMascotMessage("You showed real strength! What strategies helped you resist? Your experience could help others too!");
    }
    
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
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

  const handleSkip = async () => {
    if (step === 2) {
      handleSliderChange([50]);
      setStep(step + 1);
      setMascotMessage("You're doing great! Understanding what triggered this temptation will help you prepare better next time.");
    } else if (step === 3) {
      setTrigger("Not sure / Don't remember");
      if (!isResisted) {
        const success = await saveReflection({
          selectedSin,
          sliderValue,
          trigger: "Not sure / Don't remember",
          outcome: isResisted ? 'resisted' : 'gave-in',
          resistanceStrategy,
          customNote,
        });

        if (success) {
          setMascotMessage("Thank you for your honest reflection! Remember, every step forward, no matter how small, is progress. Keep going!");
          navigate("/journal");
        }
      } else {
        setStep(step + 1);
        setMascotMessage("You showed real strength! What strategies helped you resist? Your experience could help others too!");
      }
    }
  };

  return (
    <div className="container max-w-2xl mx-auto p-4 space-y-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          className="-ml-2"
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Progress value={progress} className="flex-1" />
      </div>

      <Mascot message={mascotMessage} />

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
          onSkip={handleSkip}
          step={step}
          isNextDisabled={false}
        />
      </div>
    </div>
  );
}
