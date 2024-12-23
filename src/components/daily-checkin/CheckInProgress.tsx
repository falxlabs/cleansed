import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CheckInProgressProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function CheckInProgress({ currentStep, totalSteps, className }: CheckInProgressProps) {
  return (
    <Progress 
      value={(currentStep / totalSteps) * 100} 
      className={cn("w-full", className)} 
    />
  );
}