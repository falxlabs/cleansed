import { Button } from "@/components/ui/button";

interface NavigationButtonsProps {
  step: number;
  totalSteps: number;
  handleBack: () => void;
  handleNext: () => void;
}

export const NavigationButtons = ({
  step,
  totalSteps,
  handleBack,
  handleNext,
}: NavigationButtonsProps) => {
  return (
    <div className="flex justify-between pt-6">
      <Button variant="ghost" onClick={handleBack}>
        {step === 1 ? "Cancel" : "Back"}
      </Button>
      <Button onClick={handleNext}>
        {step === totalSteps ? "Create Account" : "Next"}
      </Button>
    </div>
  );
};