import { Button } from "@/components/ui/button";

interface NavigationButtonsProps {
  step: number;
  isNextDisabled: boolean;
  onBack: () => void;
  onNext: () => void;
}

export function NavigationButtons({ 
  step, 
  isNextDisabled, 
  onBack, 
  onNext 
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between mt-6 pt-6 border-t border-primary/20">
      <Button
        variant="outline"
        onClick={onBack}
        className="bg-white/50 hover:bg-white/80"
      >
        {step === 1 ? "Cancel" : "Back"}
      </Button>
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