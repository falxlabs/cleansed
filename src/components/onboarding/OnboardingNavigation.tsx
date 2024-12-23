import { Button } from "@/components/ui/button";

interface OnboardingNavigationProps {
  currentStep: number;
  totalSteps: number;
  loading: boolean;
  isStepValid: boolean;
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
  onComplete: () => void;
}

export function OnboardingNavigation({
  currentStep,
  totalSteps,
  loading,
  isStepValid,
  onBack,
  onNext,
  onSkip,
  onComplete,
}: OnboardingNavigationProps) {
  return (
    <>
      <div className="flex justify-between pt-4">
        {currentStep > 1 && currentStep < totalSteps ? (
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
        ) : (
          <div />
        )}
        
        {currentStep < totalSteps - 1 ? (
          <Button 
            onClick={onNext}
            disabled={!isStepValid}
          >
            Continue
          </Button>
        ) : currentStep === totalSteps - 1 ? (
          <Button 
            onClick={onComplete}
            disabled={!isStepValid || loading}
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