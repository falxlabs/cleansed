import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/dashboard/Mascot";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";
import { format } from "date-fns";

export default function PastTemptationPage() {
  const [date, setDate] = useState<Date>();
  const [timeValue, setTimeValue] = useState([12]); // Default to noon (12:00)
  const navigate = useNavigate();
  const { toast } = useToast();

  const formatTime = (value: number) => {
    const hours = Math.floor(value);
    const minutes = Math.round((value - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const getTimeEmoji = (hour: number) => {
    if (hour >= 5 && hour < 12) return { emoji: "🌅", description: "Morning" };
    if (hour >= 12 && hour < 17) return { emoji: "☀️", description: "Afternoon" };
    if (hour >= 17 && hour < 21) return { emoji: "🌆", description: "Evening" };
    return { emoji: "🌙", description: "Night" };
  };

  const handleContinue = () => {
    if (!date) {
      toast({
        title: "Please select a date",
        description: "Choose when this temptation occurred",
        variant: "destructive",
      });
      return;
    }

    // Create a new date with the selected time
    const selectedDate = new Date(date);
    const hours = Math.floor(timeValue[0]);
    const minutes = Math.round((timeValue[0] - hours) * 60);
    selectedDate.setHours(hours, minutes);

    // Store the selected date in sessionStorage to access it in the reflection page
    sessionStorage.setItem('pastTemptationDate', selectedDate.toISOString());
    navigate('/reflection');
  };

  const timeInfo = getTimeEmoji(Math.floor(timeValue[0]));

  return (
    <div className="container max-w-2xl mx-auto p-4 space-y-8">
      <Mascot message="Select the date and time when this temptation occurred" />
      
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

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-center">Time of day</h3>
          <div className="px-4">
            <div className="text-center mb-4">
              <span className="text-2xl">{timeInfo.emoji}</span>
              <span className="ml-2 text-muted-foreground">{timeInfo.description}</span>
            </div>
            <Slider
              value={timeValue}
              onValueChange={setTimeValue}
              max={23.983333}
              step={0.016667}
              className="w-full"
            />
            <div className="text-center mt-2">
              <span className="text-muted-foreground">{formatTime(timeValue[0])}</span>
            </div>
          </div>
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