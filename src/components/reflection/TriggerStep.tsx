import { Textarea } from "@/components/ui/textarea";

interface TriggerStepProps {
  trigger: string;
  onTriggerChange: (trigger: string) => void;
}

export const TriggerStep = ({ trigger, onTriggerChange }: TriggerStepProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">What triggered this temptation?</h2>
      <Textarea
        placeholder="Describe what led to this temptation (e.g., specific situations, emotions, or events)"
        value={trigger}
        onChange={(e) => onTriggerChange(e.target.value)}
        className="min-h-[150px]"
      />
    </div>
  );
};