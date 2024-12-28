import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SINS = [
  { name: "Pride", emoji: "👑", description: "Excessive self-focus and validation seeking" },
  { name: "Greed", emoji: "💵", description: "Desire for material possessions" },
  { name: "Lust", emoji: "👄", description: "Struggles with sexual immorality and impure thoughts" },
  { name: "Envy", emoji: "👀", description: "Desire for others' traits or possessions" },
  { name: "Gluttony", emoji: "🍽️", description: "Overindulgence or overconsumption" },
  { name: "Wrath", emoji: "🤬", description: "Uncontrolled feelings of anger" },
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
        <span className="text-6xl mb-4 block animate-breathe">{selectedSin.emoji}</span>
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
              "h-auto aspect-square flex flex-col items-center justify-center gap-2 p-2 transition-all hover:bg-primary/10",
              value.toLowerCase() === sin.name.toLowerCase() && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
            )}
          >
            <span className="text-2xl">{sin.emoji}</span>
            <span className="text-xs font-medium line-clamp-1">{sin.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};