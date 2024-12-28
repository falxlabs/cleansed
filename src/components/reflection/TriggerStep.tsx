import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface TriggerStepProps {
  trigger: string;
  onTriggerChange: (trigger: string) => void;
  isResisted?: boolean;
}

export const TriggerStep = ({ trigger, onTriggerChange, isResisted = true }: TriggerStepProps) => {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isResisted 
            ? "What triggered this temptation?" 
            : "What led to giving in to this temptation?"}
        </h2>
        <Textarea
          placeholder="Describe what led to this temptation (e.g., specific situations, emotions, or events)"
          value={trigger}
          onChange={(e) => onTriggerChange(e.target.value)}
          className="min-h-[150px]"
        />
      </Card>
    </div>
  );
};