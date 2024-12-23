import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

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
      <h2 className="text-2xl font-bold text-center text-primary">Today's Biggest Challenge</h2>
      
      <Card className="p-6 bg-white/50 backdrop-blur-sm border-2 border-primary/20">
        <div className="space-y-4">
          <RadioGroup
            value={selectedTemptation}
            onValueChange={onTemptationChange}
            className="grid grid-cols-2 gap-4"
          >
            {temptations.map((temptation) => (
              <div 
                key={temptation} 
                className={`flex items-center space-x-2 p-3 rounded-xl transition-colors ${
                  selectedTemptation === temptation 
                    ? 'bg-primary/10' 
                    : 'hover:bg-primary/5'
                }`}
              >
                <RadioGroupItem value={temptation} id={temptation} />
                <Label htmlFor={temptation} className="font-medium">{temptation}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </Card>

      <Card className="p-6 bg-white/50 backdrop-blur-sm border-2 border-primary/20">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary">Overall Temptation Level</h3>
          <Slider
            value={temptationLevel}
            onValueChange={onLevelChange}
            max={100}
            step={1}
            className="w-full"
            defaultValue={[Number(localStorage.getItem("defaultTemptationLevel")) || 50]}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
        </div>
      </Card>
    </div>
  );
}