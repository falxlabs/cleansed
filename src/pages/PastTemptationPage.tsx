import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/dashboard/Mascot";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function PastTemptationPage() {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleContinue = () => {
    if (!date) {
      toast({
        title: "Please select a date",
        description: "Choose when this temptation occurred",
        variant: "destructive",
      });
      return;
    }

    if (!time) {
      toast({
        title: "Please select a time",
        description: "Choose what time this temptation occurred",
        variant: "destructive",
      });
      return;
    }

    // Combine date and time
    const [hours, minutes] = time.split(":");
    const datetime = new Date(date);
    datetime.setHours(parseInt(hours), parseInt(minutes));

    // Store the selected datetime in sessionStorage
    sessionStorage.setItem('pastTemptationDate', datetime.toISOString());
    navigate('/reflection');
  };

  return (
    <div className="container max-w-2xl mx-auto p-4 space-y-8">
      <Mascot message="Select when this temptation occurred" />
      
      <div className="bg-card rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">When did this happen?</h2>
        
        <div className="flex flex-col items-center space-y-4">
          {date && (
            <p className="text-sm text-muted-foreground">
              Selected: {format(date, 'PPP')}
            </p>
          )}
          
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={{ after: new Date() }}
            className={cn(
              "rounded-md border",
              isMobile ? "w-full" : "w-auto"
            )}
            initialFocus
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full text-lg p-6"
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