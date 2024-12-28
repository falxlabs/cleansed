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
            className="w-full text-base h-auto py-4 px-6 sm:text-lg sm:py-5 sm:px-8
                     rounded-2xl font-bold transition-all duration-300
                     shadow-md hover:shadow-lg active:scale-95
                     transform-gpu will-change-transform hover:translate-y-[-2px]
                     bg-duo-500 hover:bg-duo-600 active:bg-duo-700"
          >
            Continue
          </Button>
        ) : currentStep === totalSteps - 1 ? (
          <Button 
            onClick={onComplete}
            disabled={!isStepValid || loading}
            className="w-full text-base h-auto py-4 px-6 sm:text-lg sm:py-5 sm:px-8
                     rounded-2xl font-bold transition-all duration-300
                     shadow-md hover:shadow-lg active:scale-95
                     transform-gpu will-change-transform hover:translate-y-[-2px]
                     bg-duo-500 hover:bg-duo-600 active:bg-duo-700"
          >
            {loading ? "Signing up..." : "Complete"}
          </Button>
        ) : null}
      </div>

      {currentStep < totalSteps && (
        <Button
          variant="ghost"
          className="w-full mt-4 text-gray-500 hover:text-gray-800 hover:underline hover:bg-transparent
                   px-6 py-3 text-sm font-medium rounded-2xl border-0
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