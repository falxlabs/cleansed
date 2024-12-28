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
    <div className="bg-white rounded-3xl p-6 shadow-xl">
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