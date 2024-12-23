import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface MascotProps {
  message: string;
  className?: string;
}

export function Mascot({ message, className }: MascotProps) {
  return (
    <Card className={cn(
      "p-6 relative overflow-hidden",
      "bg-white rounded-3xl border-2 border-gray-200 shadow-lg",
      className
    )}>
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-duo-100 animate-bounce flex items-center justify-center">
          <span className="text-3xl">🕊️</span>
        </div>
        <p className="text-lg font-bold leading-relaxed text-gray-800">{message}</p>
      </div>
    </Card>
  );
}