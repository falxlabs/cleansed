import { TemptationTypeSelector } from "@/components/reflection/TemptationTypeSelector";

interface TemptationTypeStepProps {
  value: string;
  onChange: (value: string) => void;
}

export function TemptationTypeStep({ value, onChange }: TemptationTypeStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">What's your main struggle?</h2>
      <p className="text-center text-muted-foreground">
        Understanding your primary challenge helps us provide better support
      </p>
      <TemptationTypeSelector value={value} onChange={onChange} showText={true} />
    </div>
  );
}