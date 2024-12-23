import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface CheckInTimeStepProps {
  value: string;
  onChange: (value: string) => void;
}

export function CheckInTimeStep({ value, onChange }: CheckInTimeStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Daily Check-in Time</h2>
      <p className="text-center text-muted-foreground">
        When would you like to receive your daily check-in reminder?
      </p>
      
      <div className="space-y-2">
        <Label htmlFor="checkInTime">Preferred Time</Label>
        <Input
          id="checkInTime"
          type="time"
          value={value || "20:00"}
          onChange={(e) => onChange(e.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          We recommend setting this to your last phone check before bed (default 8:00 PM) - 
          this helps you reflect on your day and prepare for tomorrow with a clear mind.
        </p>
      </div>
    </div>
  );
}