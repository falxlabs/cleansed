import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FormBottomNavProps {
  onNext: () => void;
  nextLabel?: string;
  isNextDisabled?: boolean;
  showSkip?: boolean;
  onSkip?: () => void;
  className?: string;
}

export function FormBottomNav({
  onNext,
  nextLabel = "Continue",
  isNextDisabled = false,
  showSkip = false,
  onSkip,
  className
}: FormBottomNavProps) {
  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:relative md:border-t-0 md:p-0 md:mt-6",
      "flex gap-3 z-10",
      className
    )}>
      {showSkip && onSkip && (
        <Button
          variant="outline"
          onClick={onSkip}
          className={cn(
            "flex-1 text-base h-auto py-4 px-6",
            "sm:text-lg sm:py-5 sm:px-8",
            "rounded-2xl font-bold transition-all duration-300",
            "shadow-md hover:shadow-lg active:scale-95",
            "transform-gpu will-change-transform hover:translate-y-[-2px]",
            "bg-white text-gray-700 hover:bg-[#F2FCE2] hover:text-gray-700 hover:shadow-xl border-0 hover:border-0"
          )}
        >
          Skip
        </Button>
      )}
      <Button
        onClick={onNext}
        disabled={isNextDisabled}
        className={cn(
          "flex-1 text-base h-auto py-4 px-6",
          "sm:text-lg sm:py-5 sm:px-8",
          "rounded-2xl font-bold transition-all duration-300",
          "shadow-md hover:shadow-lg active:scale-95",
          "transform-gpu will-change-transform hover:translate-y-[-2px]",
          "bg-duo-500 hover:bg-duo-600 active:bg-duo-700"
        )}
      >
        {nextLabel}
      </Button>
    </div>
  );
}