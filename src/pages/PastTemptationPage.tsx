import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/dashboard/Mascot";
import { useToast } from "@/hooks/use-toast";
import { DateSelectionStep } from "@/components/past-temptation/DateSelectionStep";
import { TimeSelectionStep } from "@/components/past-temptation/TimeSelectionStep";
import { OutcomeSelectionStep } from "@/components/past-temptation/OutcomeSelectionStep";

export default function PastTemptationPage() {
  const [date, setDate] = useState<Date>();
  const [timeValue, setTimeValue] = useState([12]); // Default to noon (12:00)
  const [resisted, setResisted] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    if (!date) {
      toast({
        title: "Please select a date",
        description: "Choose when this temptation occurred",
        variant: "destructive",
      });
      return;
    }

    if (resisted === null) {
      toast({
        title: "Please select an outcome",
        description: "Did you resist or give in to the temptation?",
        variant: "destructive",
      });
      return;
    }

    // Create a new date with the selected time
    const selectedDate = new Date(date);
    const hours = Math.floor(timeValue[0]);
    const minutes = Math.round((timeValue[0] - hours) * 60);
    selectedDate.setHours(hours, minutes);

    // Store the selected date and resistance status in sessionStorage
    sessionStorage.setItem('pastTemptationDate', selectedDate.toISOString());
    sessionStorage.setItem('pastTemptationResisted', String(resisted));

    // Add console.log to debug the values being stored
    console.log('Stored date:', selectedDate.toISOString());
    console.log('Stored resisted status:', resisted);

    navigate('/reflection');
  };

  return (
    <div className="container max-w-2xl mx-auto p-4 space-y-8">
      <Mascot message="Let's record what happened. First, select when this temptation occurred." />
      
      <div className="bg-card rounded-lg p-6 space-y-8">
        <h2 className="text-2xl font-bold text-center">When did this happen?</h2>
        
        <DateSelectionStep date={date} onDateSelect={setDate} />
        <TimeSelectionStep timeValue={timeValue} onTimeChange={setTimeValue} />
        <OutcomeSelectionStep resisted={resisted} onOutcomeSelect={setResisted} />

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => navigate('/')}>
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