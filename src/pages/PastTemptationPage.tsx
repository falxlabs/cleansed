import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/dashboard/Mascot";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { DateTimePicker } from "@/components/ui/datetime";

export default function PastTemptationPage() {
  const [date, setDate] = useState<Date>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleContinue = () => {
    if (!date) {
      toast({
        title: "Please select a date and time",
        description: "Choose when this temptation occurred",
        variant: "destructive",
      });
      return;
    }

    // Store the selected datetime in sessionStorage
    sessionStorage.setItem('pastTemptationDate', date.toISOString());
    navigate('/reflection');
  };

  return (
    <div className="container max-w-2xl mx-auto p-4 space-y-8">
      <Mascot message="Select when this temptation occurred" />
      
      <div className="bg-card rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">When did this happen?</h2>
        
        <div className="flex flex-col items-center space-y-4">
          <DateTimePicker date={date} setDate={setDate} />
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