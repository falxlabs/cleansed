import { Button } from "@/components/ui/button";

interface NavigationButtonsProps {
  onNext: () => void;
  onSkip?: () => void;
  step: number;
  isNextDisabled: boolean;
}

export const NavigationButtons = ({
  onNext,
  onSkip,
  step,
  isNextDisabled,
}: NavigationButtonsProps) => {
  return (
    <div className="flex flex-col gap-2 pt-6">
      <Button onClick={onNext} disabled={isNextDisabled} className="w-full">
        {step === 4 ? "Complete" : "Next"}
      </Button>
      {step !== 1 && step !== 4 && (
        <Button variant="outline" onClick={onSkip} className="w-full">
          I don't know
        </Button>
      )}
    </div>
  );
};