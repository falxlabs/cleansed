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
                     hover:shadow-lg transition-all duration-200"
          >
            Continue
          </Button>
        ) : currentStep === totalSteps - 1 ? (
          <Button 
            onClick={onComplete}
            disabled={!isStepValid || loading}
            className="w-full bg-duo-500 text-white hover:bg-duo-600 active:bg-duo-700 
                     px-6 py-3 text-lg font-bold rounded-2xl shadow-md 
                     hover:shadow-lg transition-all duration-200"
          >
            {loading ? "Signing up..." : "Complete"}
          </Button>
        ) : null}
      </div>

      {currentStep < totalSteps && (
        <Button
          variant="outline"
          className="w-full mt-4 bg-white text-gray-700 hover:bg-[#F2FCE2] hover:text-gray-700 
                   hover:shadow-xl hover:translate-y-[-2px] border-0 hover:border-0
                   px-6 py-3 text-lg font-bold rounded-2xl shadow-md 
                   transition-all duration-200"
          onClick={onSkip}
          disabled={loading}
        >
          Skip onboarding
        </Button>
      )}
    </>
  );
}