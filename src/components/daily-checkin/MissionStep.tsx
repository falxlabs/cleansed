import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface MissionStepProps {
  selectedStatement: string;
  onStatementChange: (value: string) => void;
}

export function MissionStep({
  selectedStatement,
  onStatementChange,
}: MissionStepProps) {
  const statements = [
    "I am a child of God, created for His purpose.",
    "My identity is in Christ, not in my struggles.",
    "Through Christ, I have the power to overcome.",
    "I choose purity because I love God.",
    "1 Corinthians 10:13 - God is faithful, and he will not let you be tempted beyond your ability."
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Daily Affirmation</h2>
      <p className="text-center text-muted-foreground">
        Choose a statement that resonates with you today
      </p>
      
      <RadioGroup
        value={selectedStatement}
        onValueChange={onStatementChange}
        className="space-y-4"
      >
        {statements.map((statement) => (
          <Card
            key={statement}
            className={`p-4 cursor-pointer transition-all ${
              selectedStatement === statement
                ? "border-duo-500 bg-duo-50"
                : "hover:border-duo-200"
            }`}
            onClick={() => onStatementChange(statement)}
          >
            <div className="flex items-start space-x-3">
              <RadioGroupItem value={statement} id={statement} />
              <Label htmlFor={statement} className="font-medium leading-relaxed">
                {statement}
              </Label>
            </div>
          </Card>
        ))}
      </RadioGroup>
    </div>
  );
}