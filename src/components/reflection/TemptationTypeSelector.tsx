import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SINS = [
  { name: "Pride", emoji: "👑", description: "Excessive self-focus and validation seeking" },
  { name: "Greed", emoji: "💵", description: "Desire for material possessions" },
  { name: "Lust", emoji: "👄", description: "Sexual immorality and impure thoughts" },
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
      <div className="text-center space-y-2">
        <span className="text-6xl mb-4 block animate-breathe">{selectedSin.emoji}</span>
        <span className="text-lg font-medium block">{selectedSin.name}</span>
        {showText && selectedSin.description && (
          <p className="text-muted-foreground">{selectedSin.description}</p>
        )}
      </div>
      
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2 md:gap-3">
        {SINS.map((sin) => (
          <Button
            key={sin.name}
            variant="outline"
            onClick={() => onChange(sin.name.toLowerCase())}
            className={cn(
              "h-auto aspect-square flex flex-col items-center justify-center",
              "p-0.5 xs:p-1 sm:p-2 transition-all hover:bg-primary/10",
              "min-w-0 overflow-hidden",
              value.toLowerCase() === sin.name.toLowerCase() && 
              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
            )}
          >
            <span className="text-sm xs:text-base sm:text-xl md:text-2xl mb-0.5 sm:mb-1">
              {sin.emoji}
            </span>
            <span className="text-[0.5rem] xs:text-[0.6rem] sm:text-xs font-medium line-clamp-1 px-0.5">
              {sin.name}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};