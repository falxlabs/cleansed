import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const DAILY_STATEMENTS = [
  "I am strong and capable of overcoming any challenge.",
  "Today, I choose peace and self-control.",
  "I am growing stronger each day.",
  "My well-being is worth more than temporary pleasure.",
  "I trust in God's plan for my life.",
] as const;

interface MissionStepProps {
  selectedStatement: string;
  onStatementChange: (value: string) => void;
}

export function MissionStep({
  selectedStatement,
  onStatementChange,
}: MissionStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-primary">Daily Affirmation</h2>
      <p className="text-center text-muted-foreground mb-6">
        Choose an affirmation to carry with you today
      </p>
      
      <Card className="p-6">
        <RadioGroup
          value={selectedStatement}
          onValueChange={onStatementChange}
          className="space-y-4"
        >
          {DAILY_STATEMENTS.map((statement) => (
            <div key={statement} className="flex items-center space-x-3">
              <RadioGroupItem value={statement} id={statement} />
              <Label htmlFor={statement} className="text-sm leading-relaxed">
                {statement}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </Card>
    </div>
  );
}