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
            className="w-full bg-duo-500 text-white hover:bg-duo-600 active:bg-duo-700 
                     px-6 py-3 text-lg font-bold rounded-2xl shadow-md 
                     hover:shadow-lg transition-all duration-200 hover:translate-y-[-2px]"
          >
            Continue
          </Button>
        ) : currentStep === totalSteps - 1 ? (
          <Button 
            onClick={onComplete}
            disabled={!isStepValid || loading}
            className="w-full bg-duo-500 text-white hover:bg-duo-600 active:bg-duo-700 
                     px-6 py-3 text-lg font-bold rounded-2xl shadow-md 
                     hover:shadow-lg transition-all duration-200 hover:translate-y-[-2px]"
          >
            {loading ? "Signing up..." : "Complete"}
          </Button>
        ) : null}
      </div>

      {currentStep < totalSteps && (
        <Button
          variant="ghost"
          className="w-full mt-4 text-gray-500 hover:text-gray-800 hover:underline hover:bg-transparent
                   px-6 py-3 text-lg font-bold rounded-2xl border-0
                   transition-colors duration-200"
          onClick={onSkip}
          disabled={loading}
        >
          Skip onboarding
        </Button>
      )}
    </>
  );
}