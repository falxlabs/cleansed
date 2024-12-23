import { Progress } from "@/components/ui/progress";

interface CheckInProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function CheckInProgress({ currentStep, totalSteps }: CheckInProgressProps) {
  return (
    <Progress 
      value={(currentStep / totalSteps) * 100} 
      className="w-full" 
    />
  );
}