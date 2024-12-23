import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface NavigationButtonsProps {
  onBack: () => void;
  onNext: () => void;
  onSkip?: () => void;
  step: number;
  isNextDisabled: boolean;
}

export const NavigationButtons = ({
  onBack,
  onNext,
  onSkip,
  step,
  isNextDisabled,
}: NavigationButtonsProps) => {
  return (
    <div className="flex justify-between items-center pt-6">
      <Button variant="ghost" className="-ml-2" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        {step === 1 ? "Cancel" : "Back"}
      </Button>
      <div className="flex gap-2">
        {step !== 1 && step !== 4 && (
          <Button variant="outline" onClick={onSkip}>
            I don't know
          </Button>
        )}
        <Button onClick={onNext} disabled={isNextDisabled}>
          {step === 4 ? "Complete" : "Next"}
        </Button>
      </div>
    </div>
  );
};