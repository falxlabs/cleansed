import { Slider } from "@/components/ui/slider";

const TEMPTATION_LEVELS = [
  "Low - I can resist easily",
  "Medium - It's challenging but manageable",
  "High - I struggle significantly",
  "Severe - Almost impossible to resist"
] as const;

interface TemptationLevelStepProps {
  sliderValue: number[];
  temptationLevel: string;
  onSliderChange: (value: number[]) => void;
}

export const TemptationLevelStep = ({
  sliderValue,
  temptationLevel,
  onSliderChange,
}: TemptationLevelStepProps) => {
  const getTemptationEmoji = () => {
    if (sliderValue[0] <= 25) return "🟢";
    if (sliderValue[0] <= 50) return "🟡";
    if (sliderValue[0] <= 75) return "🟠";
    return "🔴";
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Temptation Level</h2>
      <div className="space-y-8">
        <div className="text-center">
          <span className="text-4xl mb-4 block">{getTemptationEmoji()}</span>
          <h3 className="text-xl font-semibold mb-2">{temptationLevel || "Select level"}</h3>
          <p className="text-muted-foreground">
            {temptationLevel ? "This helps us understand your struggle" : "Move the slider to indicate intensity"}
          </p>
        </div>
        <Slider
          value={sliderValue}
          onValueChange={onSliderChange}
          max={100}
          step={1}
          className="w-full"
          defaultValue={[Number(localStorage.getItem("defaultTemptationLevel")) || 50]}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Low</span>
          <span>Medium</span>
          <span>High</span>
          <span>Severe</span>
        </div>
      </div>
    </div>
  );
};