import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMascotStore } from "@/components/dashboard/Mascot";
import { useNavigate } from "react-router-dom";

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
  onNext,
}: NavigationButtonsProps) {
  const { setMessage } = useMascotStore();
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 5) {
      setMessage("Thank you for your reflection. Every moment of awareness helps you grow stronger!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
    onNext();
  };

  return (
    <div className="flex justify-between mt-8">
      {step > 1 ? (
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      ) : (
        <div></div>
      )}
      <Button
        onClick={handleNext}
        disabled={isNextDisabled}
        className="flex items-center gap-2"
      >
        {step === 5 ? "Complete" : "Next"}
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
}