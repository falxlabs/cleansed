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
    // Show "Complete" on step 4 (resistance strategy) since it's only shown when user resisted
    if (step === 4) return "Complete";
    // Show "Complete" on step 3 only when user gave in
    if (step === 3 && outcome === "gave-in") return "Complete";
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