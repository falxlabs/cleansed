import { Check, X, Minus } from "lucide-react";

interface StatusIconProps {
  isCheckIn: boolean;
  resisted?: boolean;
}

export const StatusIcon = ({ isCheckIn, resisted }: StatusIconProps) => {
  if (isCheckIn) {
    return <Minus className="inline h-5 w-5 text-muted-foreground" />;
  }
  
  return resisted ? (
    <Check className="inline h-5 w-5 text-green-500" />
  ) : (
    <X className="inline h-5 w-5 text-red-500" />
  );
};