import { Textarea } from "@/components/ui/textarea";

interface TriggerStepProps {
  trigger: string;
  onTriggerChange: (trigger: string) => void;
  isResisted?: boolean;
}

export const TriggerStep = ({ trigger, onTriggerChange, isResisted = true }: TriggerStepProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        {isResisted 
          ? "What triggered this temptation?" 
          : "What led to giving in to this temptation?"}
      </h2>
      <Textarea
        placeholder={isResisted 
          ? "Describe what led to this temptation (e.g., specific situations, emotions, or events)"
          : "Describe what led to giving in (e.g., specific situations, emotions, or events that made resistance difficult)"}
        value={trigger}
        onChange={(e) => onTriggerChange(e.target.value)}
        className="min-h-[150px]"
      />
    </div>
  );
};