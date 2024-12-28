import { ReactNode } from "react";
import { NavigationButtons } from "./NavigationButtons";

interface CheckInContainerProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  isNextDisabled: boolean;
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
      <div className="space-y-6">
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