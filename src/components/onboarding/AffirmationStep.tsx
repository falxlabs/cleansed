import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

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
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Choose your daily affirmation</h2>

      <div className="grid gap-4">
        {PRESET_AFFIRMATIONS.map((affirmation, index) => (
          <Card
            key={index}
            className={cn(
              "p-4 cursor-pointer transition-all duration-200 hover:border-duo-500",
              "relative flex items-center",
              value === affirmation ? "border-duo-500 bg-duo-50" : "border-border"
            )}
            onClick={() => onChange(affirmation)}
          >
            <div className="flex-1">
              <p className="text-sm font-medium">{affirmation}</p>
            </div>
            {value === affirmation && (
              <div className="absolute right-4">
                <Check className="h-5 w-5 text-duo-500" />
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="space-y-2 pt-6 border-t">
        <Label htmlFor="custom-affirmation">Write your own affirmation</Label>
        <Textarea
          id="custom-affirmation"
          placeholder="Enter your personal daily affirmation"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[100px]"
        />
        <p className="text-sm text-muted-foreground">
          Write an affirmation that resonates with your faith journey
        </p>
      </div>
    </div>
  );
}