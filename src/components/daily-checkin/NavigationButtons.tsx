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
    <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
      <Button 
        onClick={onNext} 
        disabled={isNextDisabled}
        className="w-full bg-duo-500 hover:bg-duo-600 text-white font-bold py-3 px-6 rounded-2xl
                 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
      >
        {step === 4 ? "Complete" : "Continue"}
      </Button>
    </div>
  );
}