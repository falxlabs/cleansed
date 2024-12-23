import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface NavigationButtonsProps {
  onBack: () => void;
  onNext: () => void;
  step: number;
  isNextDisabled: boolean;
}

export const NavigationButtons = ({
  onBack,
  onNext,
  step,
  isNextDisabled,
}: NavigationButtonsProps) => {
  return (
    <div className="flex justify-between pt-6">
      <Button variant="ghost" className="-ml-2" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        {step === 1 ? "Cancel" : "Back"}
      </Button>
      <Button onClick={onNext} disabled={isNextDisabled}>
        {step === 4 ? "Complete" : "Next"}
      </Button>
    </div>
  );
};