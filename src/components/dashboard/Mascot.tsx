import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { shouldShowCheckIn } from "@/utils/checkInUtils";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";

interface MascotProps {
  message: string;
  className?: string;
  onCheckIn?: () => void;
  showCheckInButton?: boolean;
}

const getUserFirstName = () => {
  return localStorage.getItem("userFirstName") || "";
};

export function Mascot({ 
  message, 
  className, 
  onCheckIn, 
  showCheckInButton = false 
}: MascotProps) {
  const location = useLocation();
  const { user } = useAuth();
  const isDashboard = location.pathname === "/dashboard";
  const shouldShow = shouldShowCheckIn();
  const firstName = getUserFirstName();
  const personalizedGreeting = firstName ? `Hey ${firstName}! ` : "Hey! ";
  
  const displayMessage = (isDashboard && shouldShow && user)
    ? `${personalizedGreeting}It's time for your daily check-in.`
    : message;

  return (
    <Card className={cn(
      "p-6 relative overflow-hidden",
      "bg-white rounded-3xl border-2 border-gray-200 shadow-lg",
      className
    )}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-duo-100 flex items-center justify-center">
            <span className="text-3xl animate-bounce">🕊️</span>
          </div>
          <p className="text-lg font-bold leading-relaxed text-gray-800">
            {displayMessage}
          </p>
        </div>
        
        {showCheckInButton && isDashboard && shouldShow && user && onCheckIn && (
          <Button
            onClick={onCheckIn}
            className="bg-duo-100 text-duo-800 hover:bg-duo-200 w-full"
          >
            Daily Check-in
          </Button>
        )}
      </div>
    </Card>
  );
}