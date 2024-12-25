import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/dashboard/Mascot";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { DateTimeStep } from "@/components/past-temptation/DateTimeStep";
import { OutcomeStep } from "@/components/past-temptation/OutcomeStep";
import { ArrowLeft } from "lucide-react";

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

  const handleDateTimeContinue = () => {
    if (!date) {
      toast({
        title: "Please select a date",
        description: "Choose when this temptation occurred",
        variant: "destructive",
      });
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    if (step === 1) {
      navigate('/');
    } else {
      setStep(step - 1);
    }
  };

  const progress = (step / 2) * 100;

  return (
    <div className="container max-w-2xl mx-auto p-4 space-y-8">
      <Mascot 
        message={
          step === 1 
            ? "Select the date and time when this temptation occurred" 
            : "How did you handle this situation?"
        } 
      />

      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          className="-ml-2"
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Progress value={progress} className="flex-1" />
      </div>
      
      <div className="bg-card rounded-lg p-6 space-y-6">
        {step === 1 ? (
          <>
            <DateTimeStep
              date={date}
              timeValue={timeValue}
              onDateChange={setDate}
              onTimeChange={setTimeValue}
            />
            <Button 
              onClick={handleDateTimeContinue}
              className="w-full"
            >
              Continue
            </Button>
          </>
        ) : (
          <OutcomeStep
            outcome={outcome}
            onOutcomeChange={handleOutcomeChange}
          />
        )}
      </div>
    </div>
  );
}