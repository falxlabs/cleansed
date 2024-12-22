import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";

const SINS = [
  { name: "Pride", emoji: "👑", description: "Excessive belief in own abilities", value: 0 },
  { name: "Greed", emoji: "💰", description: "Desire for material possessions", value: 1 },
  { name: "Lust", emoji: "💝", description: "Intense or uncontrolled desires", value: 2 },
  { name: "Envy", emoji: "👀", description: "Desire for others' traits or possessions", value: 3 },
  { name: "Gluttony", emoji: "🍽️", description: "Overindulgence or overconsumption", value: 4 },
  { name: "Wrath", emoji: "😠", description: "Uncontrolled feelings of anger", value: 5 },
  { name: "Sloth", emoji: "🦥", description: "Failure to act and utilize talents", value: 6 }
] as const;

interface TemptationTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  showText?: boolean;
}

export const TemptationTypeSelector = ({ value, onChange, showText = true }: TemptationTypeSelectorProps) => {
  const [sliderValue, setSliderValue] = useState([SINS.findIndex(sin => sin.name === value) || 0]);
  
  const handleSliderChange = (newValue: number[]) => {
    setSliderValue(newValue);
    const selectedSin = SINS[newValue[0]];
    onChange(selectedSin.name);
  };

  const selectedSin = SINS[sliderValue[0]];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <span className="text-4xl mb-4 block animate-breathe">{selectedSin.emoji}</span>
        {showText && (
          <>
            <h3 className="text-xl font-semibold mb-2">{selectedSin.name}</h3>
            <p className="text-muted-foreground">{selectedSin.description}</p>
          </>
        )}
      </div>
      
      <div className="px-4">
        <Slider
          value={sliderValue}
          onValueChange={handleSliderChange}
          max={SINS.length - 1}
          step={1}
          className="w-full"
        />
        
        <div className="flex justify-between mt-4">
          {SINS.map((sin) => (
            <div
              key={sin.name}
              className={`text-center transition-all ${
                sliderValue[0] === sin.value ? 'scale-125' : 'opacity-50'
              }`}
            >
              <span className="text-2xl">{sin.emoji}</span>
              {showText && (
                <div className="text-xs mt-1 text-muted-foreground">
                  {sin.name}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};