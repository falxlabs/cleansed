import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/dashboard/Mascot";
import { useToast } from "@/hooks/use-toast";

export default function PastTemptationPage() {
  const [date, setDate] = useState<Date>();
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

    // Store the selected date in sessionStorage to access it in the reflection page
    sessionStorage.setItem('pastTemptationDate', date.toISOString());
    navigate('/reflection');
  };

  return (
    <div className="container max-w-2xl mx-auto p-4 space-y-8">
      <Mascot message="Select the date when this temptation occurred" />
      
      <div className="bg-card rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">When did this happen?</h2>
        
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={{ after: new Date() }}
            className="rounded-md border"
          />
        </div>

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