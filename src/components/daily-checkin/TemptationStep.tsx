import { TemptationTypeSelector } from "@/components/reflection/TemptationTypeSelector";
import { TemptationType } from "@/types/database";

interface TemptationStepProps {
  selectedTemptation: TemptationType | "";
  onTemptationChange: (value: TemptationType | "") => void;
}

export function TemptationStep({
  selectedTemptation,
  onTemptationChange,
}: TemptationStepProps) {
  console.log("TemptationStep - Current selectedTemptation:", selectedTemptation);
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-primary">Today's Biggest Challenge</h2>
      <p className="text-center text-muted-foreground mb-6">
        What type of temptation are you struggling with the most today?
      </p>
      <TemptationTypeSelector
        value={selectedTemptation}
        onChange={onTemptationChange}
      />
    </div>
  );
}