import { ReactNode } from "react";
import { NavigationButtons } from "./NavigationButtons";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CheckInContainerProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  isNextDisabled: boolean;
  onNext: () => void;
}

export function CheckInContainer({
  children,
  currentStep,
  totalSteps,
  isNextDisabled,
  onNext,
}: CheckInContainerProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-2 border-primary/20">
        <div className="space-y-6">
          {children}
        </div>

        <NavigationButtons
          step={currentStep}
          isNextDisabled={isNextDisabled}
          onNext={onNext}
        />
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          className="-ml-2"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
    </div>
  );
}