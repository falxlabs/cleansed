import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SINS = [
  { name: "Pride", emoji: "👑", description: "Excessive belief in own abilities" },
  { name: "Greed", emoji: "💰", description: "Desire for material possessions" },
  { name: "Lust", emoji: "👄", description: "Struggles with sexual immorality and impure thoughts" },
  { name: "Envy", emoji: "👀", description: "Desire for others' traits or possessions" },
  { name: "Gluttony", emoji: "🍽️", description: "Overindulgence or overconsumption" },
  { name: "Wrath", emoji: "😠", description: "Uncontrolled feelings of anger" },
  { name: "Sloth", emoji: "🦥", description: "Failure to act and utilize talents" }
] as const;

interface TemptationTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  showText?: boolean;
}

export const TemptationTypeSelector = ({ value, onChange, showText = true }: TemptationTypeSelectorProps) => {
  console.log("TemptationTypeSelector - Received value:", value);
  
  const selectedSin = SINS.find(sin => sin.name.toLowerCase() === value.toLowerCase()) || SINS[0];
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <span className="text-4xl mb-4 block animate-breathe">{selectedSin.emoji}</span>
        {showText && (
          <h3 className="text-xl font-semibold mb-2">{selectedSin.name}</h3>
        )}
        {showText && selectedSin.description && (
          <p className="text-muted-foreground">{selectedSin.description}</p>
        )}
      </div>
      
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
        {SINS.map((sin) => (
          <Button
            key={sin.name}
            variant="outline"
            onClick={() => onChange(sin.name.toLowerCase())}
            className={cn(
              "h-auto aspect-square flex flex-col items-center justify-center gap-2 p-2 transition-all",
              value.toLowerCase() === sin.name.toLowerCase() && "bg-primary text-primary-foreground"
            )}
          >
            <span className="text-2xl">{sin.emoji}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};