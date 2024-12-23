import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

const PRESET_AFFIRMATIONS = [
  "I am a child of God, created for His purpose.",
  "Through Christ who strengthens me, I can overcome any challenge.",
  "God's love guides and protects me in all that I do.",
  "I am fearfully and wonderfully made by God.",
];

interface AffirmationStepProps {
  value: string;
  onChange: (value: string) => void;
}

export function AffirmationStep({ value, onChange }: AffirmationStepProps) {
  const [type, setType] = useState<"preset" | "custom">("preset");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Choose Your Daily Affirmation</h2>
      <p className="text-center text-muted-foreground">
        This affirmation will be shown to you daily to strengthen your resolve
      </p>

      <RadioGroup
        value={type}
        onValueChange={(v) => setType(v as "preset" | "custom")}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="preset" id="preset" />
          <Label htmlFor="preset">Choose a preset affirmation</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="custom" id="custom" />
          <Label htmlFor="custom">Write your own</Label>
        </div>
      </RadioGroup>

      {type === "preset" ? (
        <RadioGroup
          value={value}
          onValueChange={onChange}
          className="space-y-4"
        >
          {PRESET_AFFIRMATIONS.map((affirmation, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={affirmation} id={`affirmation-${index}`} />
              <Label htmlFor={`affirmation-${index}`}>{affirmation}</Label>
            </div>
          ))}
        </RadioGroup>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="custom-affirmation">Write your affirmation</Label>
          <Textarea
            id="custom-affirmation"
            placeholder="Enter your personal daily affirmation"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      )}
    </div>
  );
}