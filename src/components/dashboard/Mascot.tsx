import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MascotProps {
  message: string;
  className?: string;
  onCheckIn?: () => void;
}

export function Mascot({ message, className, onCheckIn }: MascotProps) {
  return (
    <Card className={cn(
      "p-6 relative overflow-hidden",
      "bg-white rounded-3xl border-2 border-gray-200 shadow-lg",
      className
    )}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-duo-100 animate-bounce flex items-center justify-center">
            <span className="text-3xl">🕊️</span>
          </div>
          <p className="text-lg font-bold leading-relaxed text-gray-800">{message}</p>
        </div>
        <Button
          onClick={onCheckIn}
          className="bg-duo-100 text-duo-800 hover:bg-duo-200 w-full"
        >
          Daily Check-in
        </Button>
      </div>
    </Card>
  );
}