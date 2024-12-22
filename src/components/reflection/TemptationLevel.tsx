import { Slider } from "@/components/ui/slider";

const TEMPTATION_LEVELS = [
  "Low - I can resist easily",
  "Medium - It's challenging but manageable",
  "High - I struggle significantly",
  "Severe - Almost impossible to resist"
] as const;

type TemptationLevel = typeof TEMPTATION_LEVELS[number];

interface TemptationLevelProps {
  temptationLevel: TemptationLevel | "";
  setTemptationLevel: (level: TemptationLevel) => void;
  sliderValue: number[];
  setSliderValue: (value: number[]) => void;
}

export const TemptationLevel = ({
  temptationLevel,
  setTemptationLevel,
  sliderValue,
  setSliderValue
}: TemptationLevelProps) => {
  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    const levelIndex = Math.floor((value[0] / 100) * TEMPTATION_LEVELS.length);
    setTemptationLevel(TEMPTATION_LEVELS[Math.min(levelIndex, TEMPTATION_LEVELS.length - 1)]);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Temptation Level</h2>
      <div className="space-y-8">
        <div className="text-center">
          <span className="text-4xl mb-4 block">{temptationLevel ? "🟡" : "🔵"}</span>
          <h3 className="text-xl font-semibold mb-2">{temptationLevel || "Select level"}</h3>
          <p className="text-muted-foreground">
            {temptationLevel ? "This helps us understand your struggle" : "Move the slider to indicate intensity"}
          </p>
        </div>
        <Slider
          value={sliderValue}
          onValueChange={handleSliderChange}
          max={100}
          step={1}
          className="w-full"
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
