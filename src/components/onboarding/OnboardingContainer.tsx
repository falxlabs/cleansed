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
        return "Let's start by understanding what you're struggling with.";
      case 2:
        return "This helps me understand your struggle level so I can provide appropriate support.";
      case 3:
        return "This affirmation will be shown to you daily to strengthen your resolve.";
      case 4:
        return "When would you like me to check in with you each day? I'll send you a gentle reminder to reflect on your journey.";
      case 5:
        return "What's your name and age? This helps me personalize your journey towards freedom.";
      case 6:
        return "Almost there! Sign up to save your progress and settings. We'll never share your email with anyone else.";
      case 7:
        return "Great! Check your email for the magic link to complete your signup.";
      default:
        return "I'm here to help you every step of the way. Take your time to answer honestly.";
    }
  };

  return (
    <div className="step-container">
      <div className="flex items-center gap-4">
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

      <Mascot message={getMascotMessage(currentStep)} />

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