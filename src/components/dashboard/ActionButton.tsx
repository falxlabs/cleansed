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
      className={cn("flex items-center gap-2 text-lg h-auto py-6 px-6 transition-all duration-300", className)}
      disabled={disabled}
    >
      <Icon className="w-6 h-6" />
      <span>{label}</span>
    </Button>
  );
}