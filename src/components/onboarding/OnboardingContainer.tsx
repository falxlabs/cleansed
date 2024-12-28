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
        return "Hi there, I'm Grace! Let's start by understanding what you're struggling with.";
      case 2:
        return "This helps me understand your struggle level so I can provide appropriate support.";
      case 3:
        return "This affirmation will be shown to you daily to strengthen your resolve.";
      case 7:
        return "Great! Check your email for the magic link to complete your signup.";
      case 6:
        return "Almost there! Sign up to save your progress and settings.";
      default:
        return "I'm here to help you every step of the way. Take your time to answer honestly.";
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