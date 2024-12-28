import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface CheckInTimeStepProps {
  value: string;
  onChange: (value: string) => void;
}

export function CheckInTimeStep({ value, onChange }: CheckInTimeStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Daily check-in time</h2>
      
      <div className="space-y-4">
        <div className="relative">
          <Label 
            htmlFor="checkInTime" 
            className="absolute -top-2.5 left-4 px-2 bg-white text-sm text-muted-foreground"
          >
            Preferred Time
          </Label>
          <Input
            id="checkInTime"
            type="time"
            value={value || "20:00"}
            onChange={(e) => onChange(e.target.value)}
            className="h-14 text-lg text-center border-2 hover:border-duo-400 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}