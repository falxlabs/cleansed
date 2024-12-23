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
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          Choose a time when you're usually free and can reflect on your day
        </p>
      </div>
    </div>
  );
}