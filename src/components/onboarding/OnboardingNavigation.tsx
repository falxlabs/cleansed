import { Button } from "@/components/ui/button";

interface OnboardingNavigationProps {
  currentStep: number;
  totalSteps: number;
  loading: boolean;
  isStepValid: boolean;
  onNext: () => void;
  onSkip: () => void;
  onComplete: () => void;
}

export function OnboardingNavigation({
  currentStep,
  totalSteps,
  loading,
  isStepValid,
  onNext,
  onSkip,
  onComplete,
}: OnboardingNavigationProps) {
  return (
    <>
      <div className="flex justify-end pt-4">
        {currentStep < totalSteps - 1 ? (
          <Button 
            onClick={onNext}
            disabled={!isStepValid}
            className="w-full duo-button"
          >
            Continue
          </Button>
        ) : currentStep === totalSteps - 1 ? (
          <Button 
            onClick={onComplete}
            disabled={!isStepValid || loading}
            className="w-full duo-button"
          >
            {loading ? "Signing up..." : "Complete"}
          </Button>
        ) : null}
      </div>

      {currentStep < totalSteps && (
        <Button
          variant="outline"
          className="w-full mt-4 bg-white text-gray-700 hover:bg-[#F2FCE2] hover:text-gray-700 hover:shadow-xl border-0 hover:border-0"
          onClick={onSkip}
          disabled={loading}
        >
          Skip onboarding
        </Button>
      )}
    </>
  );
}