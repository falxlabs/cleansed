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
            className="w-full"
          >
            Continue
          </Button>
        ) : currentStep === totalSteps - 1 ? (
          <Button 
            onClick={onComplete}
            disabled={!isStepValid || loading}
            className="w-full"
          >
            {loading ? "Signing up..." : "Complete"}
          </Button>
        ) : null}
      </div>

      {currentStep === totalSteps - 1 && (
        <Button
          variant="ghost"
          className="w-full mt-4"
          onClick={onSkip}
          disabled={loading}
        >
          Skip without saving
        </Button>
      )}
    </>
  );
}