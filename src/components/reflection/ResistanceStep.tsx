import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface ResistanceStepProps {
  resistanceStrategy: string;
  onResistanceStrategyChange: (strategy: string) => void;
}

export const ResistanceStep = ({
  resistanceStrategy,
  onResistanceStrategyChange,
}: ResistanceStepProps) => {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">What helped you resist?</h2>
        <p className="text-muted-foreground mb-4">
          Share the strategies, thoughts, or support that helped you overcome this temptation
        </p>
        <Textarea
          placeholder="Example: Prayer, calling a friend, removing myself from the situation, etc."
          value={resistanceStrategy}
          onChange={(e) => onResistanceStrategyChange(e.target.value)}
          className="min-h-[150px]"
        />
      </Card>
    </div>
  );
};