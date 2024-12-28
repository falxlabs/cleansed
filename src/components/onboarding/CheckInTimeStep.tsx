import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CheckInTimeStepProps {
  value: string;
  onChange: (value: string) => void;
}

export function CheckInTimeStep({ value, onChange }: CheckInTimeStepProps) {
  // Generate time options in 30-minute intervals
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const label = new Date(`2000-01-01T${time}`).toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        options.push({ value: time, label });
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Daily check-in time</h2>
      
      <div className="space-y-6">
        <div className="flex justify-center mb-6">
          <span className="text-6xl" role="img" aria-label="alarm clock">⏰</span>
        </div>

        <div className="relative max-w-xs mx-auto">
          <Label 
            htmlFor="checkInTime" 
            className="absolute -top-2.5 left-4 px-2 bg-white text-sm text-muted-foreground"
          >
            Select your preferred time
          </Label>
          <Select
            value={value || "20:00"}
            onValueChange={onChange}
          >
            <SelectTrigger className="w-full h-14 text-lg text-center border-2 hover:border-duo-400 transition-colors">
              <SelectValue placeholder="Select a time" />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map(({ value: timeValue, label }) => (
                <SelectItem 
                  key={timeValue} 
                  value={timeValue}
                  className="cursor-pointer"
                >
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <p className="text-sm text-muted-foreground text-center mt-4">
          Choose a time when you're likely to have a quiet moment for reflection
        </p>
      </div>
    </div>
  );
}