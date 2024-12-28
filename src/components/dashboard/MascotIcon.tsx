import { cn } from "@/lib/utils";

interface MascotIconProps {
  className?: string;
}

export function MascotIcon({ className }: MascotIconProps) {
  return (
    <div className={cn(
      "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16",
      "rounded-2xl bg-duo-100 flex items-center justify-center shrink-0",
      className
    )}>
      <span className="text-xl sm:text-2xl md:text-3xl animate-bounce">🕊️</span>
    </div>
  );
}