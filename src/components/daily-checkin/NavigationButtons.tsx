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
    <div className="flex justify-end mt-6 pt-6 border-t">
      <Button 
        onClick={onNext} 
        disabled={isNextDisabled}
        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6"
      >
        {step === 4 ? "Complete" : "Continue"}
      </Button>
    </div>
  );
}