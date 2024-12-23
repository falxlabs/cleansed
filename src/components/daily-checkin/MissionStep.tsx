import { Card } from "@/components/ui/card";

interface MissionStepProps {
  selectedStatement: string;
  onStatementChange: (value: string) => void;
}

export function MissionStep({
  selectedStatement,
  onStatementChange,
}: MissionStepProps) {
  // In a real app, this would come from the user's settings
  const userAffirmation = "I am a child of God, created for His purpose.";

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-primary">Daily Affirmation</h2>
      <p className="text-center text-muted-foreground">
        Take a moment to reflect on your daily affirmation
      </p>
      
      <Card className="p-6 bg-white/50 backdrop-blur-sm border-2 border-primary/20">
        <p className="text-lg font-medium text-center leading-relaxed">
          {userAffirmation}
        </p>
      </Card>
    </div>
  );
}