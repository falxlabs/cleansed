import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TriggerDescriptionProps {
  trigger: string;
  setTrigger: (trigger: string) => void;
}

export const TriggerDescription = ({
  trigger,
  setTrigger
}: TriggerDescriptionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">What triggered this temptation?</h2>
      <Textarea
        placeholder="Describe what led to this temptation (e.g., specific situations, emotions, or events)"
        value={trigger}
        onChange={(e) => setTrigger(e.target.value)}
        className="min-h-[150px]"
      />
    </div>
  );
};