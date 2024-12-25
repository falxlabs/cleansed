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

const getUserFirstName = async (userId: string) => {
  const { data: profile } = await supabase
    .from('profiles')
    .select('first_name')
    .eq('id', userId)
    .single();
  
  return profile?.first_name || "";
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
  const [firstName, setFirstName] = useState("");
  const [hasCompletedCheckIn, setHasCompletedCheckIn] = useState(false);
  
  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        const name = await getUserFirstName(user.id);
        setFirstName(name);
      }
    };
    loadUserData();
  }, [user]);

  useEffect(() => {
    const checkExistingCheckIn = async () => {
      if (!user) {
        setHasCompletedCheckIn(false);
        return;
      }

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

  const displayMessage = isDashboard 
    ? (shouldShow && !hasCompletedCheckIn)
      ? firstName
        ? `${firstName}, time for your daily moment of reflection.`
        : "Time for your daily moment of reflection."
      : hasCompletedCheckIn
        ? firstName
          ? `${firstName}, thank you for taking time to reflect today. Keep growing stronger! 🌱`
          : "Thank you for taking time to reflect today. Keep growing stronger! 🌱"
        : message
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
        
        {showCheckInButton && isDashboard && shouldShow && !hasCompletedCheckIn && onCheckIn && (
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