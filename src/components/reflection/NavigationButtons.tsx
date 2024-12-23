import { Button } from "@/components/ui/button";

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
      <Button variant="outline" onClick={onBack}>
        Back
      </Button>
      <Button onClick={onNext}>
        {isLastStep ? "Complete" : "Next"}
      </Button>
    </div>
  );
};