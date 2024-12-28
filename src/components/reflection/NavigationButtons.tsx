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
    if (step === 3 && outcome === "gave-in") return "Complete";
    if (step === 4 && outcome === "gave-in") return "Complete";
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