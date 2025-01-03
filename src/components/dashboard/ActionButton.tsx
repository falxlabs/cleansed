import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ActionButtonProps {
  emoji?: string;
  icon?: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
  disabled?: boolean;
}

export function ActionButton({ 
  emoji,
  icon: Icon, 
  label, 
  onClick, 
  variant = "default", 
  className,
  disabled 
}: ActionButtonProps) {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      className={cn(
        "flex flex-row items-center gap-3 text-base h-auto py-4 px-6",
        "sm:text-lg sm:py-5 sm:px-8",
        "rounded-2xl font-bold transition-all duration-300",
        "shadow-md hover:shadow-lg active:scale-95",
        "transform-gpu will-change-transform hover:translate-y-[-2px]",
        variant === "default" && "bg-duo-500 hover:bg-duo-600 active:bg-duo-700",
        variant === "outline" && "bg-white text-gray-700 hover:bg-[#F2FCE2] hover:text-gray-700 hover:shadow-xl hover:translate-y-[-2px] hover:!bg-[#F2FCE2] border-0 hover:border-0",
        className
      )}
      disabled={disabled}
    >
      <div className="flex items-center gap-3">
        {emoji ? (
          <span className="text-2xl sm:text-3xl">{emoji}</span>
        ) : Icon && (
          <Icon className="w-6 h-6 sm:w-7 sm:h-7 shrink-0" />
        )}
        <span>{label}</span>
      </div>
    </Button>
  );
}