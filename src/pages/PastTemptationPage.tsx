import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/dashboard/Mascot";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { DateTimeStep } from "@/components/past-temptation/DateTimeStep";
import { OutcomeStep } from "@/components/past-temptation/OutcomeStep";
import { saveJournalEntry } from "@/utils/journalEntries";

export default function PastTemptationPage() {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const [timeValue, setTimeValue] = useState([12]); // Default to noon (12:00)
  const [outcome, setOutcome] = useState<"resisted" | "gave-in">();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    if (step === 1) {
      if (!date) {
        toast({
          title: "Please select a date",
          description: "Choose when this temptation occurred",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
    } else {
      if (!outcome) {
        toast({
          title: "Please select an outcome",
          description: "Choose whether you resisted or gave in to the temptation",
          variant: "destructive",
        });
        return;
      }

      // Create a new date with the selected time
      const selectedDate = new Date(date!);
      const hours = Math.floor(timeValue[0]);
      const minutes = Math.round((timeValue[0] - hours) * 60);
      selectedDate.setHours(hours, minutes);

      // Store the outcome in sessionStorage for the reflection page
      sessionStorage.setItem('pastTemptationOutcome', outcome);

      // Save entry with all required fields
      saveJournalEntry({
        date: selectedDate,
        type: "Past Temptation",
        resisted: outcome === 'resisted',
        level: "medium", // Default level
        trigger: "unspecified", // Default trigger
        notes: "Logged without reflection",
      });

      navigate('/reflection');
    }
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
      <Progress value={progress} className="w-full" />
      
      <Mascot 
        message={
          step === 1 
            ? "Select the date and time when this temptation occurred" 
            : "How did you handle this situation?"
        } 
      />
      
      <div className="bg-card rounded-lg p-6 space-y-6">
        {step === 1 ? (
          <DateTimeStep
            date={date}
            timeValue={timeValue}
            onDateChange={setDate}
            onTimeChange={setTimeValue}
          />
        ) : (
          <OutcomeStep
            outcome={outcome}
            onOutcomeChange={setOutcome}
          />
        )}

        <div className="flex justify-between pt-4">
          <Button 
            variant="outline" 
            onClick={handleBack}
          >
            Back
          </Button>
          <Button onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}