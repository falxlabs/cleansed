import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const SINS = [
  { name: "Pride", emoji: "👑", description: "Excessive belief in own abilities", level: "≥8" },
  { name: "Greed", emoji: "💰", description: "Desire for material possessions", level: "7" },
  { name: "Lust", emoji: "💝", description: "Intense or uncontrolled desires", level: "6" },
  { name: "Envy", emoji: "👀", description: "Desire for others' traits or possessions", level: "5" },
  { name: "Gluttony", emoji: "🍽️", description: "Overindulgence or overconsumption", level: "4" },
  { name: "Wrath", emoji: "😠", description: "Uncontrolled feelings of anger", level: "3" },
  { name: "Sloth", emoji: "🦥", description: "Failure to act and utilize talents", level: "2" }
] as const;

type SinType = typeof SINS[number]["name"];

interface TemptationTypeProps {
  selectedSin: SinType | "";
  setSelectedSin: (sin: SinType) => void;
  customNote: string;
  setCustomNote: (note: string) => void;
}

export const TemptationType = ({
  selectedSin,
  setSelectedSin,
  customNote,
  setCustomNote
}: TemptationTypeProps) => {
  const [sliderValue, setSliderValue] = useState([3]);
  
  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    const index = Math.min(Math.floor(value[0]), SINS.length - 1);
    setSelectedSin(SINS[index].name);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Type of Temptation</h2>
      
      <div className="relative py-10">
        <div className="flex justify-between mb-8">
          {SINS.map(({ emoji, name, level }, index) => (
            <div
              key={name}
              className={`flex flex-col items-center transition-all duration-300 ${
                selectedSin === name ? 'scale-110 text-primary' : 'opacity-50'
              }`}
            >
              <span className="text-3xl mb-2">{emoji}</span>
              <span className="text-sm font-medium">{level}</span>
              <span className="text-xs">{name}</span>
            </div>
          ))}
        </div>
        
        <Slider
          value={sliderValue}
          onValueChange={handleSliderChange}
          max={SINS.length - 1}
          step={1}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="customNote">Describe the specific temptation</Label>
        <textarea
          id="customNote"
          placeholder="What exactly are you struggling with?"
          value={customNote}
          onChange={(e) => setCustomNote(e.target.value)}
          className="w-full min-h-[100px] p-3 rounded-md border"
        />
      </div>
    </div>
  );
};