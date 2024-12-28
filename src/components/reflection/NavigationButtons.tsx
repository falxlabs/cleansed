import { FormBottomNav } from "@/components/navigation/FormBottomNav";

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
    <FormBottomNav
      onNext={onNext}
      nextLabel={step === 4 ? "Complete" : "Next"}
      isNextDisabled={isNextDisabled}
      showSkip={!!onSkip}
      onSkip={onSkip}
    />
  );
};