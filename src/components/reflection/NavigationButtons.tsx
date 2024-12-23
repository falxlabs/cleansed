import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface NavigationButtonsProps {
  onBack: () => void;
  onNext: () => void;
  isLastStep: boolean;
}

export const NavigationButtons = ({
  onBack,
  onNext,
  isLastStep,
}: NavigationButtonsProps) => {
  return (
    <div className="flex justify-between pt-6">
      <Button variant="ghost" className="-ml-2" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <Button onClick={onNext}>
        {isLastStep ? "Complete" : "Next"}
      </Button>
    </div>
  );
};