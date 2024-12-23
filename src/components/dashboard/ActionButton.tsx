import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
  disabled?: boolean;
}

export function ActionButton({ 
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
        "flex items-center gap-3 text-lg h-auto py-6 px-8",
        "rounded-2xl font-bold transition-all duration-200",
        "shadow-md hover:shadow-lg active:scale-95",
        variant === "default" && "bg-duo-500 hover:bg-duo-600 active:bg-duo-700",
        className
      )}
      disabled={disabled}
    >
      <Icon className="w-6 h-6" />
      <span>{label}</span>
    </Button>
  );
}