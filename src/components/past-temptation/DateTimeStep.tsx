import { Calendar } from "@/components/ui/calendar";
import { Slider } from "@/components/ui/slider";

interface DateTimeStepProps {
  date: Date | undefined;
  timeValue: number[];
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (value: number[]) => void;
}

export const DateTimeStep = ({ date, timeValue, onDateChange, onTimeChange }: DateTimeStepProps) => {
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

  const timeInfo = getTimeEmoji(Math.floor(timeValue[0]));

  return (
    <>
      <h2 className="text-2xl font-bold text-center">When did this happen?</h2>
      
      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
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
            onValueChange={onTimeChange}
            max={23.983333}
            step={0.016667}
            className="w-full"
          />
          <div className="text-center mt-2">
            <span className="text-muted-foreground">{formatTime(timeValue[0])}</span>
          </div>
        </div>
      </div>
    </>
  );
};