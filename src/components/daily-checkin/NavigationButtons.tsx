import { Button } from "@/components/ui/button";

interface NavigationButtonsProps {
  step: number;
  isNextDisabled: boolean;
  onNext: () => void;
}

export function NavigationButtons({ 
  step, 
  isNextDisabled, 
  onNext 
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-end mt-6 pt-6 border-t border-primary/20">
      <Button 
        onClick={onNext} 
        disabled={isNextDisabled}
        className="bg-primary hover:bg-primary/90"
      >
        {step === 4 ? "Complete" : "Next"}
      </Button>
    </div>
  );
}