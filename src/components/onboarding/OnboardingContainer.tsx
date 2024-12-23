import { Progress } from "@/components/ui/progress";
import { Mascot } from "@/components/dashboard/Mascot";
import { OnboardingStepManager } from "./OnboardingStepManager";
import { OnboardingNavigation } from "./OnboardingNavigation";
import { useOnboarding } from "@/hooks/useOnboarding";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function OnboardingContainer() {
  const navigate = useNavigate();
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

  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <Mascot
        message={
          currentStep === 1
            ? "Hi there, I'm Grace! Let's start by understanding what you're struggling with."
            : currentStep === 7
            ? "Great! Check your email for the magic link to complete your signup."
            : "I'm here to help you every step of the way. Take your time to answer honestly."
        }
      />

      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          className="-ml-2"
          onClick={handleNavigateBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
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