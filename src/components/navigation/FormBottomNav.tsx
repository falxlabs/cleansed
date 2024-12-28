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
          className="flex-1 md:flex-none"
        >
          Skip
        </Button>
      )}
      <Button
        onClick={onNext}
        disabled={isNextDisabled}
        className="flex-1 md:flex-none"
      >
        {nextLabel}
      </Button>
    </div>
  );
}