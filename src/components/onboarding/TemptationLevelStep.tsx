import { Slider } from "@/components/ui/slider";

const TEMPTATION_LEVELS = [
  "Low - I can resist easily",
  "Medium - It's challenging but manageable",
  "High - I struggle significantly",
  "Severe - Almost impossible to resist"
] as const;

interface TemptationLevelStepProps {
  sliderValue: number[];
  onSliderChange: (value: number[]) => void;
}

export function TemptationLevelStep({
  sliderValue,
  onSliderChange,
}: TemptationLevelStepProps) {
  const getTemptationLevelDescription = (value: number) => {
    if (value <= 25) return TEMPTATION_LEVELS[0];
    if (value <= 50) return TEMPTATION_LEVELS[1];
    if (value <= 75) return TEMPTATION_LEVELS[2];
    return TEMPTATION_LEVELS[3];
  };

  // Function to get the gradient color based on slider value
  const getSliderColor = (value: number) => {
    if (value <= 25) return 'bg-green-500';
    if (value <= 50) return 'bg-yellow-500';
    if (value <= 75) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const [levelText, description] = getTemptationLevelDescription(sliderValue[0]).split(' - ');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">How Strong is the Temptation?</h2>

      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-4xl mb-4 block">{
            sliderValue[0] <= 25 ? "🟢" :
            sliderValue[0] <= 50 ? "🟡" :
            sliderValue[0] <= 75 ? "🟠" : "🔴"
          }</span>
          <h3 className="text-xl font-semibold">{levelText}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="space-y-4">
          <Slider
            value={sliderValue}
            onValueChange={onSliderChange}
            max={100}
            step={1}
            className="w-full"
            sliderColor={getSliderColor(sliderValue[0])}
          />

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
            <span>Severe</span>
          </div>
        </div>
      </div>
    </div>
  );
}