import { Slider } from "@/components/ui/slider";

interface TimeStepProps {
  timeValue: number[];
  onTimeChange: (value: number[]) => void;
}

export const TimeStep = ({ timeValue, onTimeChange }: TimeStepProps) => {
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
      <h2 className="text-2xl font-bold text-center">What time of day?</h2>
      
      <div className="space-y-4">
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