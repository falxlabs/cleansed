import { Progress } from "@/components/ui/progress";
import { Mascot } from "@/components/dashboard/Mascot";
import { OnboardingStepManager } from "./OnboardingStepManager";
import { OnboardingNavigation } from "./OnboardingNavigation";
import { useOnboarding } from "@/hooks/useOnboarding";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function OnboardingContainer() {
  const {
    currentStep,
    formData,
    loading,
    progress,
    totalSteps,
    handleFormDataChange,
    handleNext,
    handleBack,
    handleSkip,
    handleComplete,
    isCurrentStepValid,
  } = useOnboarding();

  const getMascotMessage = (step: number) => {
    switch (step) {
      case 1:
        return "Welcome! I'm Grace, your companion on this journey. Let's start by understanding what you're facing so I can better support you.";
      case 2:
        return "Understanding the intensity of your struggle helps me provide more personalized guidance and support for your journey.";
      case 3:
        return "Let's choose a powerful affirmation that will strengthen your spirit daily and remind you of God's presence in your life.";
      case 4:
        return "When would you like your daily reflection time? This quiet moment will help you stay focused on your path to freedom.";
      case 7:
        return "Perfect! Check your email for the magic link to begin your journey toward freedom and growth.";
      case 6:
        return "You're almost ready to begin! Let's create your secure account to keep track of your progress. Your information stays private.";
      default:
        return "Take your time to reflect honestly. Every step forward, no matter how small, is progress toward freedom.";
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <Mascot message={getMascotMessage(currentStep)} />

      <div className="flex items-center gap-4 mb-6">
        {currentStep > 1 && (
          <Button
            variant="ghost"
            className="-ml-2"
            onClick={handleBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}
        <Progress value={progress} className="flex-1" />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <OnboardingStepManager
          currentStep={currentStep}
          formData={formData}
          onFormDataChange={handleFormDataChange}
        />
        
        <OnboardingNavigation
          currentStep={currentStep}
          totalSteps={totalSteps}
          loading={loading}
          isStepValid={isCurrentStepValid()}
          onNext={handleNext}
          onSkip={handleSkip}
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
}