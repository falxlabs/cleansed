import { ReactNode } from "react";
import { CheckInProgress } from "./CheckInProgress";
import { NavigationButtons } from "./NavigationButtons";

interface CheckInContainerProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  isNextDisabled: boolean;
  onBack: () => void;
  onNext: () => void;
}

export function CheckInContainer({
  children,
  currentStep,
  totalSteps,
  isNextDisabled,
  onNext,
}: CheckInContainerProps) {
  return (
    <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-2 border-primary/20">
      <CheckInProgress currentStep={currentStep} totalSteps={totalSteps} />
      
      <div className="space-y-6 mt-6">
        {children}
      </div>

      <NavigationButtons
        step={currentStep}
        isNextDisabled={isNextDisabled}
        onNext={onNext}
      />
    </div>
  );
}