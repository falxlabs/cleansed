import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { shouldShowCheckIn } from "@/utils/checkInUtils";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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
  const [hasCompletedCheckIn, setHasCompletedCheckIn] = useState(false);
  
  useEffect(() => {
    const checkExistingCheckIn = async () => {
      if (!user) return;

      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

      const { data: existingCheckIn } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('entry_type', 'check-in')
        .gte('created_at', startOfDay.toISOString())
        .lt('created_at', endOfDay.toISOString())
        .maybeSingle();

      setHasCompletedCheckIn(!!existingCheckIn);
    };

    checkExistingCheckIn();
  }, [user]);

  const displayMessage = (isDashboard && shouldShow && user && !hasCompletedCheckIn)
    ? `${personalizedGreeting}It's time for your daily check-in.`
    : hasCompletedCheckIn
    ? `${personalizedGreeting}You've completed your daily check-in. Great job!`
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
        
        {showCheckInButton && isDashboard && shouldShow && user && !hasCompletedCheckIn && onCheckIn && (
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