import { Slider } from "@/components/ui/slider";

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
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-primary">Intensity Level</h2>
      <p className="text-center text-muted-foreground mb-6">
        How strong is this temptation?
      </p>
      
      <div className="space-y-8">
        <div className="text-center">
          <span className="text-6xl mb-4 block animate-breathe">{
            sliderValue[0] <= 25 ? "🟢" :
            sliderValue[0] <= 50 ? "🟡" :
            sliderValue[0] <= 75 ? "🟠" : "🔴"
          }</span>
          <p className="text-muted-foreground">{temptationLevel}</p>
        </div>

        <Slider
          value={sliderValue}
          onValueChange={onSliderChange}
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