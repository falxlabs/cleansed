import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface MascotProps {
  message: string;
  className?: string;
}

export function Mascot({ message, className }: MascotProps) {
  return (
    <Card className={cn("p-6 relative overflow-hidden", className)}>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-sage-100 animate-float flex items-center justify-center">
          <span className="text-2xl">🕊️</span>
        </div>
        <p className="text-lg font-medium leading-relaxed">{message}</p>
      </div>
    </Card>
  );
}