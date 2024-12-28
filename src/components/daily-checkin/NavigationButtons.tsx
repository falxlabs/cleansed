import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
        className={cn(
          "w-full text-base h-auto py-4 px-6",
          "sm:text-lg sm:py-5 sm:px-8",
          "rounded-2xl font-bold transition-all duration-300",
          "shadow-md hover:shadow-lg active:scale-95",
          "transform-gpu will-change-transform hover:translate-y-[-2px]",
          "bg-duo-500 hover:bg-duo-600 active:bg-duo-700"
        )}
      >
        {step === 4 ? "Complete" : "Continue"}
      </Button>
    </div>
  );
}