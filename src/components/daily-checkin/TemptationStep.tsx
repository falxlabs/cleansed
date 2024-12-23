import { TemptationTypeSelector } from "@/components/reflection/TemptationTypeSelector";

interface TemptationStepProps {
  selectedTemptation: string;
  onTemptationChange: (value: string) => void;
}

export function TemptationStep({
  selectedTemptation,
  onTemptationChange,
}: TemptationStepProps) {
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