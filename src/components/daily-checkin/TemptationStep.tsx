import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface TemptationStepProps {
  selectedTemptation: string;
  temptationLevel: number[];
  onTemptationChange: (value: string) => void;
  onLevelChange: (value: number[]) => void;
}

export function TemptationStep({
  selectedTemptation,
  temptationLevel,
  onTemptationChange,
  onLevelChange,
}: TemptationStepProps) {
  const temptations = [
    "Lust",
    "Pride",
    "Anger",
    "Envy",
    "Greed",
    "Other"
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Today's Biggest Challenge</h2>
      
      <div className="space-y-4">
        <RadioGroup
          value={selectedTemptation}
          onValueChange={onTemptationChange}
          className="grid grid-cols-2 gap-4"
        >
          {temptations.map((temptation) => (
            <div key={temptation} className="flex items-center space-x-2">
              <RadioGroupItem value={temptation} id={temptation} />
              <Label htmlFor={temptation}>{temptation}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Overall Temptation Level</h3>
        <Slider
          value={temptationLevel}
          onValueChange={onLevelChange}
          max={100}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Low</span>
          <span>Medium</span>
          <span>High</span>
        </div>
      </div>
    </div>
  );
}