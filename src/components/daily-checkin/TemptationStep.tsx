import { useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

const TEMPTATION_LEVELS = [
  "Low - I can resist easily",
  "Medium - It's challenging but manageable",
  "High - I struggle significantly",
  "Severe - Almost impossible to resist"
] as const;

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
  useEffect(() => {
    const savedTemptation = localStorage.getItem("defaultTemptation");
    const savedLevel = localStorage.getItem("defaultTemptationLevel");
    
    if (savedTemptation && !selectedTemptation) {
      onTemptationChange(savedTemptation);
    }
    if (savedLevel && temptationLevel[0] === 0) {
      onLevelChange([parseInt(savedLevel)]);
    }
  }, []);

  const getTemptationLevelDescription = (value: number) => {
    if (value <= 25) return TEMPTATION_LEVELS[0];
    if (value <= 50) return TEMPTATION_LEVELS[1];
    if (value <= 75) return TEMPTATION_LEVELS[2];
    return TEMPTATION_LEVELS[3];
  };

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
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-primary">
              {getTemptationLevelDescription(temptationLevel[0])}
            </h3>
          </div>
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
            <span>Severe</span>
          </div>
        </div>
      </Card>
    </div>
  );
}