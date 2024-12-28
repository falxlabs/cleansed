import { FormBottomNav } from "@/components/navigation/FormBottomNav";

interface NavigationButtonsProps {
  onNext: () => void;
  step: number;
  isNextDisabled: boolean;
  outcome?: "resisted" | "gave-in";
}

export const NavigationButtons = ({
  onNext,
  step,
  isNextDisabled,
  outcome,
}: NavigationButtonsProps) => {
  const getNextLabel = () => {
    // Only show "Complete" on the final step when the outcome is "gave-in"
    if (outcome === "gave-in") {
      if (step === 3 || step === 4) return "Complete";
    }
    return "Continue";
  };

  return (
    <FormBottomNav
      onNext={onNext}
      nextLabel={getNextLabel()}
      isNextDisabled={isNextDisabled}
      showSkip={false}
    />
  );
};