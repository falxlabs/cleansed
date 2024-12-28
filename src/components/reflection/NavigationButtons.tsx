import { FormBottomNav } from "@/components/navigation/FormBottomNav";

interface NavigationButtonsProps {
  onNext: () => void;
  step: number;
  isNextDisabled: boolean;
}

export const NavigationButtons = ({
  onNext,
  step,
  isNextDisabled,
}: NavigationButtonsProps) => {
  return (
    <FormBottomNav
      onNext={onNext}
      nextLabel={step === 4 ? "Complete" : "Continue"}
      isNextDisabled={isNextDisabled}
      showSkip={false}
    />
  );
};