import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/dashboard/Mascot";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { DateStep } from "@/components/past-temptation/DateStep";
import { TimeStep } from "@/components/past-temptation/TimeStep";
import { OutcomeStep } from "@/components/past-temptation/OutcomeStep";
import { ArrowLeft } from "lucide-react";
import { FormBottomNav } from "@/components/navigation/FormBottomNav";

export default function PastTemptationPage() {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>(new Date());
  const [timeValue, setTimeValue] = useState([12]); // Default to noon (12:00)
  const [outcome, setOutcome] = useState<"resisted" | "gave-in">();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleOutcomeChange = (newOutcome: "resisted" | "gave-in") => {
    // Create a new date with the selected time
    const selectedDate = new Date(date!);
    const hours = Math.floor(timeValue[0]);
    const minutes = Math.round((timeValue[0] - hours) * 60);
    selectedDate.setHours(hours, minutes);

    // Store the outcome and date in sessionStorage for the reflection page
    sessionStorage.setItem('pastTemptationOutcome', newOutcome);
    sessionStorage.setItem('pastTemptationDate', selectedDate.toISOString());
    
    setOutcome(newOutcome);
  };

  const handleNext = () => {
    if (!date && step === 1) {
      toast({
        title: "Please select a date",
        description: "Choose when this temptation occurred",
        variant: "destructive",
      });
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      navigate('/');
    } else {
      setStep(step - 1);
    }
  };

  const getMascotMessage = () => {
    switch (step) {
      case 1:
        return "Thank you for taking the time to reflect. Recording past experiences helps us learn and grow stronger. When did this happen?";
      case 2:
        return "Understanding the timing helps identify patterns. What time of day was it?";
      case 3:
        return "Every experience is a chance to learn, whether we succeeded or stumbled. Let's record what happened.";
      default:
        return "Let's reflect on this experience together. Your honesty helps build a stronger foundation.";
    }
  };

  const progress = (step / 3) * 100;

  return (
    <div className="container max-w-2xl mx-auto p-4 space-y-4 pb-24 md:pb-6">
      <Mascot message={getMascotMessage()} />

      <Button
        variant="ghost"
        className="-ml-2 mb-2"
        onClick={() => step === 1 ? navigate('/') : setStep(step - 1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {step === 1 ? 'Back to Dashboard' : 'Back'}
      </Button>

      <Progress value={progress} className="flex-1" />
      
      <div className="bg-card rounded-lg p-6 space-y-6">
        {step === 1 && (
          <DateStep
            date={date}
            onDateChange={setDate}
          />
        )}
        {step === 2 && (
          <TimeStep
            timeValue={timeValue}
            onTimeChange={setTimeValue}
          />
        )}
        {step === 3 && (
          <OutcomeStep
            outcome={outcome}
            onOutcomeChange={handleOutcomeChange}
          />
        )}
      </div>

      {step !== 3 && (
        <FormBottomNav
          onNext={handleNext}
          nextLabel="Continue"
          isNextDisabled={step === 1 && !date}
        />
      )}
    </div>
  );
}