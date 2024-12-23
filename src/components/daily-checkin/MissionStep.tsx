import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface MissionStepProps {
  selectedStatement: string;
  onStatementChange: (value: string) => void;
}

export function MissionStep({
  selectedStatement,
  onStatementChange,
}: MissionStepProps) {
  const [savedAffirmation, setSavedAffirmation] = useState<string>("");

  useEffect(() => {
    // Load the saved affirmation from localStorage
    const affirmationType = localStorage.getItem("affirmationType");
    const customAffirmation = localStorage.getItem("customAffirmation");
    const predefinedAffirmation = localStorage.getItem("selectedAffirmation");
    
    const affirmation = affirmationType === "custom" ? customAffirmation : predefinedAffirmation;
    if (affirmation) {
      setSavedAffirmation(affirmation);
      onStatementChange(affirmation);
    }
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-primary">Daily Affirmation</h2>
      <p className="text-center text-muted-foreground mb-6">
        Your chosen affirmation for today
      </p>
      
      <Card className="p-6">
        <p className="text-lg text-center font-medium">{savedAffirmation}</p>
      </Card>
    </div>
  );
}